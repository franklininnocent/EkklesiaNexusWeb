/** Homepage pricing card ids (visual chrome only — amounts come from the API). */

export const PRICING_PLAN_IDS = ["seed", "growth", "summit"] as const;
export type PricingPlanId = (typeof PRICING_PLAN_IDS)[number];

/** Legacy cookie market codes (not used for live geo pricing). */
export const PRICING_MARKETS = ["IN", "US", "BR"] as const;
export type PricingMarket = (typeof PRICING_MARKETS)[number];
export const DEFAULT_PRICING_MARKET: PricingMarket = "IN";

export function isPricingMarket(value: string | null | undefined): value is PricingMarket {
  return value === "IN" || value === "US" || value === "BR";
}
