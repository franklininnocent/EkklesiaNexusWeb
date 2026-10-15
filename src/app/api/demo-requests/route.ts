import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { visitorIpFromRequest } from "@/lib/api/client-ip";
import { submitDemoRequestToLaravel } from "@/lib/api/laravel";
import { consumeSharedRateLimit, rateLimitDeniedResponse } from "@/lib/api/rate-limit";
import {
  localizeBffMessage,
  localizeDemoFieldError,
  resolveBffLocale,
} from "@/lib/i18n/bff-messages";
import { X_EN_LOCALE_HEADER } from "@/lib/i18n/constants";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";

const MAX_BODY_BYTES = 16_384;

type DemoBody = {
  name?: string;
  church_parish?: string;
  diocese_organization?: string;
  country?: string;
  email?: string;
  phone?: string;
  role?: string;
  message?: string;
  captcha_challenge_id?: string;
  captcha_response?: string;
  company_website?: string;
};

function fieldErrors(body: DemoBody, locale: ReturnType<typeof resolveBffLocale>): Record<string, string> {
  const t = createTranslator(getMessages(locale));
  const errors: Record<string, string> = {};
  if (!body.name?.trim()) errors.name = t("forms.demo.validation.nameRequired");
  if (!body.church_parish?.trim()) errors.church_parish = t("forms.demo.validation.churchParishRequired");
  if (!body.country?.trim()) errors.country = t("forms.demo.validation.countryRequired");
  if (!body.email?.trim()) errors.email = t("forms.demo.validation.emailRequired");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    errors.email = t("forms.demo.validation.emailInvalid");
  }
  if (!body.role?.trim()) errors.role = t("forms.demo.validation.roleRequired");
  if (!body.message?.trim()) errors.message = t("forms.demo.validation.messageRequired");
  if (!body.captcha_challenge_id?.trim() || !body.captcha_response?.trim()) {
    errors.captcha_response = t("forms.demo.validation.captchaIncomplete");
  }
  if (body.company_website?.trim()) errors.company_website = t("forms.demo.validation.honeypot");
  return errors;
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

  let body: DemoBody;
  try {
    body = JSON.parse(raw) as DemoBody;
  } catch {
    return NextResponse.json(
      { success: false, message: t("forms.bff.invalidRequest"), errors: {} },
      { status: 400 },
    );
  }

  const clientErrors = fieldErrors(body, locale);
  if (Object.keys(clientErrors).length > 0) {
    return NextResponse.json(
      { success: false, message: t("forms.demo.validation.checkForm"), errors: clientErrors },
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

  const result = await submitDemoRequestToLaravel(
    {
      name: body.name!.trim().slice(0, 120),
      church_parish: body.church_parish!.trim().slice(0, 200),
      diocese_organization: body.diocese_organization?.trim().slice(0, 200) || undefined,
      country: body.country!.trim().slice(0, 120),
      email: body.email!.trim().slice(0, 255),
      phone: body.phone?.trim().slice(0, 40) || undefined,
      role: body.role!.trim().slice(0, 120),
      message: body.message!.trim().slice(0, 5000),
      captcha_challenge_id: body.captcha_challenge_id!.trim(),
      captcha_response: body.captcha_response!.trim(),
      company_website: "",
    },
    correlationId,
    visitorIp,
  );

  if (result.ok) {
    return NextResponse.json({
      success: true,
      message: t("forms.demo.successDefault"),
    });
  }

  if (result.status === 422 && result.body?.errors) {
    const mapped: Record<string, string> = {};
    for (const [key, messages] of Object.entries(result.body.errors)) {
      mapped[key] = localizeDemoFieldError(
        locale,
        key,
        Array.isArray(messages) ? messages[0] : (messages as string),
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: localizeBffMessage(locale, result.body.message, "forms.demo.validation.checkForm"),
        errors: mapped,
      },
      { status: 422 },
    );
  }

  if (result.status === 429) {
    return NextResponse.json(
      {
        success: false,
        message: t("forms.bff.rateLimited"),
        errors: {},
      },
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
