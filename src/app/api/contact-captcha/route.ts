import { NextResponse } from "next/server";
import { visitorIpFromRequest } from "@/lib/api/client-ip";
import { fetchContactCaptchaFromLaravel } from "@/lib/api/laravel";
import { consumeSharedRateLimit, rateLimitDeniedResponse } from "@/lib/api/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const visitorIp = visitorIpFromRequest(request);
  const limited = await consumeSharedRateLimit("marketing_bff_captcha", visitorIp, 20, 60_000);
  if (!limited.allowed) {
    const denied = rateLimitDeniedResponse(limited);
    return NextResponse.json(denied.body, { status: denied.status, headers: denied.headers });
  }

  const result = await fetchContactCaptchaFromLaravel(visitorIp);
  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        message:
          result.status === 503
            ? "The security check is temporarily unavailable. Please try again."
            : "Unable to load the security check.",
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
