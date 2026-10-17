export type MarketingCurrency = "INR" | "USD" | "BRL";

/** ISO country from trusted geo → billed marketing currency (no locale). */
export function currencyForVisitorCountry(countryCode: string | null | undefined): MarketingCurrency {
  const country = countryCode?.trim().toUpperCase() ?? null;
  if (country === "IN") {
    return "INR";
  }
  if (country === "BR") {
    return "BRL";
  }
  return "USD";
}
