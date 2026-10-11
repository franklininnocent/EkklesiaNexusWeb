import { type PricingMarket } from "@/data/regional-pricing";
import type { AppLocale } from "@/lib/i18n/locale";

const COUNTRY_HEADER_KEYS = [
  "x-en-country",
  "cf-ipcountry",
  "x-vercel-ip-country",
  "cloudfront-viewer-country",
  "x-country-code",
] as const;

/** ISO 3166-1 alpha-2 from CDN/proxy headers when present. */
export function visitorCountryFromRequestHeaders(headerSource: Headers): string | null {
  for (const key of COUNTRY_HEADER_KEYS) {
    const raw = headerSource.get(key)?.trim();
    if (!raw || raw.length !== 2) {
      continue;
    }
    const code = raw.toUpperCase();
    if (/^[A-Z]{2}$/.test(code) && code !== "XX" && code !== "T1") {
      return code;
    }
  }
  return null;
}

function countryFromEnvOverride(): string | null {
  const raw = process.env.MARKETING_VISITOR_COUNTRY?.trim().toUpperCase();
  if (!raw || raw.length !== 2 || !/^[A-Z]{2}$/.test(raw)) {
    return null;
  }
  return raw;
}

/**
 * Country for pricing: CDN/proxy headers, then optional `MARKETING_VISITOR_COUNTRY` (e.g. localhost in India).
 */
export function visitorCountryForPricing(headerSource: Headers): string | null {
  const fromHeader = visitorCountryFromRequestHeaders(headerSource);
  if (fromHeader) {
    return fromHeader;
  }
  return countryFromEnvOverride();
}

/**
 * Marketing price list from visitor country and interface locale.
 * Brazil or Portuguese → BRL; India with English → INR; otherwise English → USD.
 */
export function resolvePricingMarketFromContext(
  countryCode: string | null | undefined,
  locale: AppLocale,
): PricingMarket {
  const country = countryCode?.trim().toUpperCase() ?? null;
  if (country === "BR" || locale === "pt-BR") {
    return "BR";
  }
  if (country === "IN" && locale === "en-US") {
    return "IN";
  }
  return "US";
}
