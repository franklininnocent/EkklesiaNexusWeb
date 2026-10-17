import type { MarketingCurrency } from "@/lib/pricing/marketing-currency";
import { currencyForVisitorCountry } from "@/lib/pricing/marketing-currency";

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

/**
 * Visitor country for marketing pricing: trusted geo headers (nginx + secret), else dev env override.
 */
export function visitorCountryForPricing(headerSource: Headers): string | null {
  const trusted = trustedCountryFromGeoHeaders(headerSource);
  if (trusted) {
    return trusted;
  }
  return countryFromEnvOverride();
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
