import { NextResponse } from "next/server";
import { visitorIpFromRequest } from "@/lib/api/client-ip";
import { fetchContactCaptchaFromLaravel } from "@/lib/api/laravel";
import { consumeSharedRateLimit, rateLimitDeniedResponse } from "@/lib/api/rate-limit";
import { localizeBffMessage, resolveBffLocale } from "@/lib/i18n/bff-messages";
import { X_EN_LOCALE_HEADER } from "@/lib/i18n/constants";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const locale = resolveBffLocale(request.headers.get(X_EN_LOCALE_HEADER));
  const t = createTranslator(getMessages(locale));
  const visitorIp = visitorIpFromRequest(request);
  const limited = await consumeSharedRateLimit("marketing_bff_captcha", visitorIp, 60, 60_000);
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

  const result = await fetchContactCaptchaFromLaravel(visitorIp);
  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        message:
          result.status === 503 ? t("forms.bff.contactUnavailable") : t("forms.bff.captchaLoadFailed"),
      },
      {
        status: result.status === 429 ? 429 : 502,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate, private" },
      },
    );
  }

  return NextResponse.json(
    { success: true, data: result.data },
    { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, private" } },
  );
}
