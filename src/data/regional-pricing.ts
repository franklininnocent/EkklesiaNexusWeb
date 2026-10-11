/** Approved public marketing prices (pre-tax). Not tenant billing or API catalog. */

export const PRICING_MARKETS = ["IN", "US", "BR"] as const;
export type PricingMarket = (typeof PRICING_MARKETS)[number];

export const DEFAULT_PRICING_MARKET: PricingMarket = "IN";

export const PRICING_PLAN_IDS = ["seed", "growth", "summit"] as const;
export type PricingPlanId = (typeof PRICING_PLAN_IDS)[number];

export type RegionalPlanPrice = {
  planId: PricingPlanId;
  monthlyAmount: number;
  annualAmount: number;
};

export type RegionalMarketCatalog = {
  market: PricingMarket;
  currencyCode: string;
  plans: Record<PricingPlanId, RegionalPlanPrice>;
};

const CATALOG: Record<PricingMarket, RegionalMarketCatalog> = {
  IN: {
    market: "IN",
    currencyCode: "INR",
    plans: {
      seed: { planId: "seed", monthlyAmount: 1499, annualAmount: 14990 },
      growth: { planId: "growth", monthlyAmount: 2999, annualAmount: 29990 },
      summit: { planId: "summit", monthlyAmount: 4999, annualAmount: 49990 },
    },
  },
  US: {
    market: "US",
    currencyCode: "USD",
    plans: {
      seed: { planId: "seed", monthlyAmount: 39, annualAmount: 390 },
      growth: { planId: "growth", monthlyAmount: 59, annualAmount: 590 },
      summit: { planId: "summit", monthlyAmount: 89, annualAmount: 890 },
    },
  },
  BR: {
    market: "BR",
    currencyCode: "BRL",
    plans: {
      seed: { planId: "seed", monthlyAmount: 99, annualAmount: 990 },
      growth: { planId: "growth", monthlyAmount: 199, annualAmount: 1990 },
      summit: { planId: "summit", monthlyAmount: 399, annualAmount: 3990 },
    },
  },
};

export function isPricingMarket(value: string | null | undefined): value is PricingMarket {
  return value === "IN" || value === "US" || value === "BR";
}

export function getMarketCatalog(market: PricingMarket): RegionalMarketCatalog {
  return CATALOG[market];
}

export function getPlanPrice(
  market: PricingMarket,
  planId: PricingPlanId,
): RegionalPlanPrice | null {
  const catalog = CATALOG[market];
  const plan = catalog.plans[planId];
  return plan ?? null;
}

export function resolvePricingMarket(stored: string | null | undefined): PricingMarket {
  return isPricingMarket(stored) ? stored : DEFAULT_PRICING_MARKET;
}

/** Free months when annual is less than 12× monthly; null if not a whole number of months. */
export function derivedFreeMonths(monthlyAmount: number, annualAmount: number): number | null {
  if (monthlyAmount <= 0) {
    return null;
  }
  const yearlyAtMonthly = monthlyAmount * 12;
  if (annualAmount >= yearlyAtMonthly) {
    return null;
  }
  const free = yearlyAtMonthly - annualAmount;
  if (free % monthlyAmount !== 0) {
    return null;
  }
  const months = free / monthlyAmount;
  return months > 0 && Number.isInteger(months) ? months : null;
}

export function referenceFreeMonthsForMarket(market: PricingMarket): number | null {
  const sample = CATALOG[market].plans.seed;
  return derivedFreeMonths(sample.monthlyAmount, sample.annualAmount);
}
