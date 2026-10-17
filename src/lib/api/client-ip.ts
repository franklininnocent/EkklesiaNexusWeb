import { isIP } from "node:net";

/**
 * Visitor IP for abuse controls.
 *
 * Forwarded headers are trusted when MARKETING_TRUST_PROXY=true, and also
 * when that variable is unset in production. The marketing site runs behind
 * a reverse proxy; ignoring those headers made every visitor "unknown" and
 * the CAPTCHA fail closed. Set MARKETING_TRUST_PROXY=false only when clients
 * can reach the Node port directly.
 */
export function visitorIpFromRequest(request: Request): string {
  if (!trustForwardedClientIp()) {
    return "unknown";
  }

  const candidates: string[] = [];
  pushHeader(candidates, request.headers.get("cf-connecting-ip"));
  pushHeader(candidates, request.headers.get("x-real-ip"));

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    for (const part of forwardedFor.split(",")) {
      candidates.push(part);
    }
  }

  const forwarded = request.headers.get("forwarded");
  if (forwarded) {
    const match = forwarded.match(/for=(?:"\[([^\]]+)\]"|([^;,\s"]+))/i);
    if (match?.[1] || match?.[2]) {
      candidates.push(match[1] || match[2]);
    }
  }

  for (const candidate of candidates) {
    const ip = normalizeIpToken(candidate);
    if (ip) {
      return ip;
    }
  }

  return "unknown";
}

function trustForwardedClientIp(): boolean {
  const flag = process.env.MARKETING_TRUST_PROXY?.trim().toLowerCase();
  if (flag === "true" || flag === "1" || flag === "yes") {
    return true;
  }
  if (flag === "false" || flag === "0" || flag === "no") {
    return false;
  }

  return process.env.NODE_ENV === "production";
}

function pushHeader(candidates: string[], value: string | null): void {
  const trimmed = value?.trim();
  if (trimmed) {
    candidates.push(trimmed);
  }
}

/** Accepts proxy forms such as `203.0.113.9:443`, `[2001:db8::1]`, and `::ffff:203.0.113.9`. */
export function normalizeIpToken(raw: string): string | null {
  let token = raw.trim();
  if (!token || token.toLowerCase() === "unknown") {
    return null;
  }

  if (token.startsWith("[")) {
    const end = token.indexOf("]");
    token = end > 1 ? token.slice(1, end) : token;
  } else if (/^\d{1,3}(?:\.\d{1,3}){3}:\d+$/.test(token)) {
    token = token.slice(0, token.lastIndexOf(":"));
  }

  const mapped = token.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
  if (mapped?.[1]) {
    token = mapped[1];
  }

  return isIP(token) === 0 ? null : token;
}
