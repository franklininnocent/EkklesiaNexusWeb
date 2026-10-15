import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { visitorIpFromRequest } from "@/lib/api/client-ip";
import { submitContactEnquiryToLaravel } from "@/lib/api/laravel";
import { consumeSharedRateLimit, rateLimitDeniedResponse } from "@/lib/api/rate-limit";
import {
  localizeBffMessage,
  localizeFieldError,
  resolveBffLocale,
} from "@/lib/i18n/bff-messages";
import { X_EN_LOCALE_HEADER } from "@/lib/i18n/constants";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";
import {
  validateContactForm,
  type ContactFormField,
  type ContactFormValues,
} from "@/lib/contact-form-validation";

const MAX_BODY_BYTES = 16_384;

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  organisation?: string;
  message?: string;
  captcha_challenge_id?: string;
  captcha_response?: string;
  website?: string;
};

function fieldErrors(body: ContactBody, locale: ReturnType<typeof resolveBffLocale>): Record<string, string> {
  const t = createTranslator(getMessages(locale));
  const values: ContactFormValues = {
    name: body.name ?? "",
    email: body.email ?? "",
    phone: body.phone ?? "",
    organisation: body.organisation ?? "",
    message: body.message ?? "",
    captcha_response: body.captcha_response ?? "",
  };
  const errors = validateContactForm(values, locale);
  const mapped: Record<string, string> = { ...errors };
  if (!body.captcha_challenge_id?.trim() && !mapped.captcha_response) {
    mapped.captcha_response = t("forms.contact.validation.captchaIncomplete");
  }
  if (body.website?.trim()) {
    mapped.website = t("forms.contact.validation.honeypot");
  }
  return mapped;
}

export async function POST(request: Request) {
  const locale = resolveBffLocale(request.headers.get(X_EN_LOCALE_HEADER));
  const t = createTranslator(getMessages(locale));
  const visitorIp = visitorIpFromRequest(request);
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { success: false, message: t("forms.bff.invalidRequest"), errors: {} },
      { status: 415 },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, message: t("forms.bff.requestTooLarge"), errors: {} },
      { status: 413 },
    );
  }

  let body: ContactBody;
  try {
    body = JSON.parse(raw) as ContactBody;
  } catch {
    return NextResponse.json(
      { success: false, message: t("forms.bff.invalidRequest"), errors: {} },
      { status: 400 },
    );
  }

  const clientErrors = fieldErrors(body, locale);
  if (Object.keys(clientErrors).length > 0) {
    return NextResponse.json(
      { success: false, message: t("forms.contact.validation.checkForm"), errors: clientErrors },
      { status: 422 },
    );
  }

  const limited = await consumeSharedRateLimit("marketing_bff_forms", visitorIp, 5, 60_000);
  if (!limited.allowed) {
    const denied = rateLimitDeniedResponse(limited);
    return NextResponse.json(
      {
        ...denied.body,
        message: localizeBffMessage(locale, denied.body.message, "forms.bff.rateLimited"),
      },
      { status: denied.status, headers: denied.headers },
    );
  }

  const correlationId = randomUUID();
  const result = await submitContactEnquiryToLaravel(
    {
      name: body.name!.trim().slice(0, 120),
      email: body.email!.trim().slice(0, 255),
      phone: body.phone!.trim().slice(0, 40),
      organisation: body.organisation?.trim().slice(0, 200) || undefined,
      message: body.message!.trim().slice(0, 5000),
      captcha_challenge_id: body.captcha_challenge_id!.trim(),
      captcha_response: body.captcha_response!.trim(),
      website: "",
    },
    correlationId,
    visitorIp,
  );

  if (result.ok) {
    return NextResponse.json({
      success: true,
      message: localizeBffMessage(locale, result.message, "forms.contact.successDefault"),
    });
  }

  if (result.status === 422 && result.body?.errors) {
    const mapped: Record<string, string> = {};
    for (const [key, messages] of Object.entries(result.body.errors)) {
      const field = key as ContactFormField | string;
      mapped[key] = localizeFieldError(
        locale,
        field,
        Array.isArray(messages) ? messages[0] : (messages as string),
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: localizeBffMessage(locale, result.body.message, "forms.contact.validation.checkForm"),
        errors: mapped,
      },
      { status: 422 },
    );
  }

  if (result.status === 429) {
    return NextResponse.json(
      { success: false, message: t("forms.bff.rateLimited"), errors: {} },
      { status: 429 },
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: t("forms.bff.requestFailed"),
      errors: {},
    },
    { status: 502 },
  );
}
