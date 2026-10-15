import {
  DEFAULT_PRICING_MARKET,
  isPricingMarket,
  type PricingMarket,
} from "@/data/regional-pricing";

export const PRICING_MARKET_COOKIE = "pricing_market";
export const PRICING_MARKET_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

export function parsePricingMarketCookie(value: string | null | undefined): PricingMarket {
  if (!value) {
    return DEFAULT_PRICING_MARKET;
  }
  return isPricingMarket(value.trim()) ? value.trim() as PricingMarket : DEFAULT_PRICING_MARKET;
}
