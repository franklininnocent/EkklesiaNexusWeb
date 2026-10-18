import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { officialBrand } from "@/config/brand";

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function normalizeHostHeader(value: string): string {
  const trimmed = value.split(",")[0]?.trim().toLowerCase() ?? "";
  if (!trimmed) return "";
  if (trimmed === "::1" || trimmed.startsWith("[::1")) return "::1";
  const bracketEnd = trimmed.indexOf("]");
  if (trimmed.startsWith("[") && bracketEnd > 0) {
    return trimmed.slice(1, bracketEnd);
  }
  const lastColon = trimmed.lastIndexOf(":");
  if (lastColon > 0 && trimmed.includes(".")) {
    return trimmed.slice(0, lastColon);
  }
  return trimmed;
}

export function isLoopbackMarketingHost(host: string): boolean {
  return LOOPBACK_HOSTS.has(host);
}

/**
 * Hostname used for allowlist, www redirect, and apex HTTP redirect.
 * Public Host wins unless the connection is loopback (local reverse proxy).
 */
export function effectiveMarketingHostFromHeaders(
  hostHeader: string | null | undefined,
  xForwardedHost: string | null | undefined,
): string {
  const directHost = normalizeHostHeader(hostHeader ?? "");
  if (directHost && !isLoopbackMarketingHost(directHost)) {
    return directHost;
  }
  const forwarded = xForwardedHost?.trim();
  if (forwarded) {
    return normalizeHostHeader(forwarded);
  }
  return directHost;
}

export function effectiveMarketingRequestHost(request: NextRequest): string {
  return effectiveMarketingHostFromHeaders(
    request.headers.get("host"),
    request.headers.get("x-forwarded-host"),
  );
}

/** @deprecated Use effectiveMarketingRequestHost — kept for callers migrating to the Host-authoritative rule. */
export function parseMarketingRequestHost(request: NextRequest): string {
  return effectiveMarketingRequestHost(request);
}

export function parseForwardedProto(request: NextRequest): string | undefined {
  return request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim().toLowerCase();
}

/**
 * Hosts that may receive marketing responses in production.
 * www is included because it is normalized via 301 before content is served.
 */
export function isProductionMarketingRequestHost(host: string): boolean {
  const apex = officialBrand.rootDomain;
  if (host === apex || host === `www.${apex}`) {
    return true;
  }
  if (isLoopbackMarketingHost(host)) {
    return true;
  }
  return false;
}

export function shouldRejectUnauthorizedMarketingHost(host: string): boolean {
  if (process.env.NODE_ENV !== "production") {
    return false;
  }
  return !isProductionMarketingRequestHost(host);
}

export function unauthorizedMarketingHostResponse(): NextResponse {
  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "Cache-Control": "no-store",
    },
  });
}

export function isWwwMarketingHost(host: string): boolean {
  return host === `www.${officialBrand.rootDomain}`;
}

export function isApexHttpMarketingHost(host: string, forwardedProto: string | undefined): boolean {
  return host === officialBrand.rootDomain && forwardedProto === "http";
}
