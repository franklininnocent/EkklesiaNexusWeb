import type { PricingPlanId } from "@/data/regional-pricing";
import type { MarketingCurrency } from "@/lib/pricing/marketing-currency";
import type { PublicPlanCard, RegionalPriceEntry } from "@/types/subscription-plans";

export const PLAN_CODE_BY_CARD_ID: Record<PricingPlanId, string> = {
  seed: "STARTER",
  growth: "STANDARD",
  summit: "PROFESSIONAL",
};

export type SelectedMarketingPrice = {
  monthly: string | null;
  annual: string | null;
  currencyCode: MarketingCurrency;
};

export function selectMarketingPrice(
  plan: PublicPlanCard,
  currency: MarketingCurrency,
): SelectedMarketingPrice | null {
  const fromRegional = pickRegionalEntry(plan.regional_prices?.[currency]);
  if (fromRegional) {
    return { ...fromRegional, currencyCode: currency };
  }

  if (currency === "INR" && plan.currency_code?.toUpperCase() === "INR") {
    const monthly = plan.monthly_price ?? null;
    const annual = plan.annual_price ?? null;
    if (monthly === null && annual === null) {
      return null;
    }
    return { monthly, annual, currencyCode: "INR" };
  }

  return null;
}

function pickRegionalEntry(entry: RegionalPriceEntry | undefined): { monthly: string | null; annual: string | null } | null {
  if (!entry) {
    return null;
  }
  const monthly = entry.monthly_price ?? null;
  const annual = entry.annual_price ?? null;
  if (monthly === null && annual === null) {
    return null;
  }
  return { monthly, annual };
}

export function buildCardPricesByPlanId(
  plans: PublicPlanCard[],
  currency: MarketingCurrency,
): Record<PricingPlanId, SelectedMarketingPrice | null> {
  const byCode = new Map(plans.map((p) => [p.code, p]));
  const out: Record<PricingPlanId, SelectedMarketingPrice | null> = {
    seed: null,
    growth: null,
    summit: null,
  };

  for (const [planId, code] of Object.entries(PLAN_CODE_BY_CARD_ID) as [PricingPlanId, string][]) {
    const plan = byCode.get(code);
    out[planId] = plan ? selectMarketingPrice(plan, currency) : null;
  }

  return out;
}

export function buildCardNamesByPlanId(plans: PublicPlanCard[]): Record<PricingPlanId, string | null> {
  const byCode = new Map(plans.map((p) => [p.code, p]));
  return {
    seed: byCode.get("STARTER")?.name?.trim() || null,
    growth: byCode.get("STANDARD")?.name?.trim() || null,
    summit: byCode.get("PROFESSIONAL")?.name?.trim() || null,
  };
}

export function logMissingMarketingListPrice(planCode: string, currency: MarketingCurrency): void {
  console.info("marketing.pricing.missing_list_price", { plan_code: planCode, currency });
}
