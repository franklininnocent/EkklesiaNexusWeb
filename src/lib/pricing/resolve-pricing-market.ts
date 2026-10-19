import { normalizeIpToken, trustForwardedClientIp } from "@/lib/api/client-ip";
import type { MarketingCurrency } from "@/lib/pricing/marketing-currency";
import { currencyForVisitorCountry } from "@/lib/pricing/marketing-currency";
import { countryForIp } from "@/lib/pricing/ip-country";

const GEO_COUNTRY_HEADER = "x-en-geo-country";
const GEO_TOKEN_HEADER = "x-en-geo-token";

function geoHeaderSecret(): string {
  return process.env.MARKETING_GEO_HEADER_SECRET?.trim() ?? "";
}

function isValidCountryCode(code: string): boolean {
  return /^[A-Z]{2}$/.test(code) && code !== "XX" && code !== "T1";
}

function trustedCountryFromGeoHeaders(headerSource: Headers): string | null {
  const rawCountry = headerSource.get(GEO_COUNTRY_HEADER)?.trim().toUpperCase();
  if (!rawCountry || !isValidCountryCode(rawCountry)) {
    return null;
  }

  const secret = geoHeaderSecret();
  if (secret === "") {
    return null;
  }

  const token = headerSource.get(GEO_TOKEN_HEADER)?.trim() ?? "";
  if (token !== secret) {
    return null;
  }

  return rawCountry;
}

function countryFromEnvOverride(): string | null {
  const raw = process.env.MARKETING_VISITOR_COUNTRY?.trim().toUpperCase();
  if (!raw || !isValidCountryCode(raw)) {
    return null;
  }
  return raw;
}

function isPublicIp(ip: string): boolean {
  if (ip.includes(":")) {
    const lower = ip.toLowerCase();
    if (lower === "::1" || lower.startsWith("fe80:") || lower.startsWith("fc") || lower.startsWith("fd")) {
      return false;
    }
    return true;
  }
  const value = ip.split(".").map((part) => Number(part));
  if (value.length !== 4 || value.some((octet) => !Number.isInteger(octet) || octet < 0 || octet > 255)) {
    return false;
  }
  const [a, b] = value as [number, number, number, number];
  if (a === 0 || a === 10 || a === 127 || a >= 224) {
    return false;
  }
  if (a === 169 && b === 254) {
    return false;
  }
  if (a === 172 && b >= 16 && b <= 31) {
    return false;
  }
  if (a === 192 && b === 168) {
    return false;
  }
  return true;
}

/**
 * Rightmost public address in X-Forwarded-For (the hop Apache appended), else X-Real-IP.
 * Client-supplied addresses further left are ignored so a spoofed country cannot win.
 */
export function pricingVisitorIp(headerSource: Headers): string | null {
  if (!trustForwardedClientIp()) {
    return null;
  }
  const forwarded = headerSource.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",");
    for (let i = parts.length - 1; i >= 0; i -= 1) {
      const ip = normalizeIpToken(parts[i] ?? "");
      if (ip && isPublicIp(ip)) {
        return ip;
      }
    }
  }
  const realIp = normalizeIpToken(headerSource.get("x-real-ip") ?? "");
  if (realIp && isPublicIp(realIp)) {
    return realIp;
  }
  return null;
}

function countryFromVisitorIp(headerSource: Headers): string | null {
  const ip = pricingVisitorIp(headerSource);
  if (!ip) {
    return null;
  }
  return countryForIp(ip);
}

/**
 * Visitor country for marketing pricing: trusted geo headers, else dev env override,
 * else the public client IP behind the reverse proxy.
 */
export function visitorCountryForPricing(headerSource: Headers): string | null {
  const trusted = trustedCountryFromGeoHeaders(headerSource);
  if (trusted) {
    return trusted;
  }
  const override = countryFromEnvOverride();
  if (override) {
    return override;
  }
  return countryFromVisitorIp(headerSource);
}

/** @deprecated Use currencyForVisitorCountry(visitorCountryForPricing(...)) */
export function visitorCountryFromRequestHeaders(_headerSource: Headers): string | null {
  return null;
}

/** @deprecated Use currencyForVisitorCountry */
export function resolvePricingMarketFromContext(
  countryCode: string | null | undefined,
  _locale: unknown,
): MarketingCurrency {
  return currencyForVisitorCountry(countryCode);
}

export function marketingCurrencyForRequest(headerSource: Headers): MarketingCurrency {
  return currencyForVisitorCountry(visitorCountryForPricing(headerSource));
}
