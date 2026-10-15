import type { PricingMarket } from "@/data/regional-pricing";
import { PRICING_MARKET_COOKIE, PRICING_MARKET_COOKIE_MAX_AGE } from "@/lib/pricing/market-preference";

export function persistPricingMarketPreference(market: PricingMarket): void {
  if (typeof document === "undefined") return;
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = `${PRICING_MARKET_COOKIE}=${encodeURIComponent(market)}; Path=/; Max-Age=${PRICING_MARKET_COOKIE_MAX_AGE}; SameSite=Lax${secure ? "; Secure" : ""}`;
}
