import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { officialBrand } from "@/config/brand";
import {
  isApexHttpMarketingHost,
  isWwwMarketingHost,
  parseForwardedProto,
  effectiveMarketingRequestHost,
  shouldRejectUnauthorizedMarketingHost,
  unauthorizedMarketingHostResponse,
} from "@/lib/marketing/marketing-request-host";
import { PREVIEW_COOKIE, previewCookieOptions } from "@/lib/preview/preview-cookie";

/**
 * Canonical host for the public website: https://ekklesianexus.com.
 * www and plain HTTP on that host redirect permanently. In production, unrecognized
 * hosts (duplicate DNS, raw IP, third-party domains) receive 404 without marketing HTML.
 */
export async function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-en-pathname", request.nextUrl.pathname);

  const host = effectiveMarketingRequestHost(request);
  const forwardedProto = parseForwardedProto(request);

  if (shouldRejectUnauthorizedMarketingHost(host)) {
    return unauthorizedMarketingHostResponse();
  }

  if (request.nextUrl.pathname.startsWith("/preview/plans")) {
    const token = request.nextUrl.searchParams.get("token")?.trim();
    if (token) {
      return exchangePreviewToken(request, token);
    }
  }

  const apexHost = officialBrand.rootDomain;
  const isWww = isWwwMarketingHost(host);
  const isApexHttp = isApexHttpMarketingHost(host, forwardedProto);

  if (!isWww && !isApexHttp) {
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    if (request.nextUrl.pathname.startsWith("/preview")) {
      response.headers.set("Referrer-Policy", "no-referrer");
      response.headers.set("Cache-Control", "no-store");
    }
    return response;
  }

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.hostname = apexHost;
  url.port = "";

  return NextResponse.redirect(url, 301);
}

async function exchangePreviewToken(request: NextRequest, token: string): Promise<NextResponse> {
  const clean = request.nextUrl.clone();
  clean.searchParams.delete("token");
  clean.pathname = "/preview/plans";

  const fail = NextResponse.redirect(clean, 303);
  fail.headers.set("Referrer-Policy", "no-referrer");
  fail.headers.set("Cache-Control", "no-store");

  const base = process.env.LARAVEL_API_URL?.trim().replace(/\/$/, "") ?? "";
  if (!base || token.length > 128) {
    return fail;
  }

  try {
    const response = await fetch(
      `${base}/api/public/marketing-plan-catalog/preview?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      },
    );
    const body = (await response.json()) as { success?: boolean; session?: string; expires_in?: number };
    if (!response.ok || !body.success || typeof body.session !== "string" || body.session === "") {
      return fail;
    }

    const secure = process.env.NODE_ENV === "production";
    const out = NextResponse.redirect(clean, 303);
    out.cookies.set(
      PREVIEW_COOKIE,
      body.session,
      previewCookieOptions(typeof body.expires_in === "number" ? body.expires_in : 120, secure),
    );
    out.headers.set("Referrer-Policy", "no-referrer");
    out.headers.set("Cache-Control", "no-store");
    return out;
  } catch {
    return fail;
  }
}
