const IP_PATTERN =
  /^(?:\d{1,3}\.){3}\d{1,3}$|^\[?[A-F0-9:]+\]?$/i;

/**
 * Visitor IP for abuse controls. Forwarded headers are used only when
 * MARKETING_TRUST_PROXY=true (set behind a reverse proxy that overwrites them).
 */
export function visitorIpFromRequest(request: Request): string {
  if (process.env.MARKETING_TRUST_PROXY !== "true") {
    return "unknown";
  }

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const realIp = request.headers.get("x-real-ip")?.trim() ?? "";
  const candidate = forwarded || realIp;

  if (candidate && IP_PATTERN.test(candidate) && !candidate.includes(" ")) {
    return candidate.replace(/^\[|\]$/g, "");
  }

  return "unknown";
}
