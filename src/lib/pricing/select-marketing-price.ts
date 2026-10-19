import type { PricingPlanId } from "@/data/regional-pricing";
import type { MarketingCurrency } from "@/lib/pricing/marketing-currency";
import type { FetchPublicPlansResult } from "@/lib/api/subscription-plans";
import type { PublicPlanCard, RegionalPriceEntry } from "@/types/subscription-plans";

export type PricingCatalogState = "ready" | "unpublished" | "unavailable";

export function pricingCatalogStateFromFetch(result: FetchPublicPlansResult): PricingCatalogState {
  if (!result.ok) {
    return "unavailable";
  }
  if (result.plans.length === 0) {
    return "unpublished";
  }
  return "ready";
}

export const PLAN_CODE_BY_CARD_ID: Record<PricingPlanId, string> = {
  seed: "STARTER",
  growth: "STANDARD",
  summit: "PROFESSIONAL",
};

/** Homepage #pricing only needs names and regional list prices — not entitlements/features. */
export type HomepagePricingPlanCard = {
  code: string;
  name: string;
  pricing_type: string;
  currency_code?: string | null;
  monthly_price?: string | null;
  annual_price?: string | null;
  regional_prices?: PublicPlanCard["regional_prices"];
};

export function pickHomepagePricingPlans(plans: PublicPlanCard[]): HomepagePricingPlanCard[] {
  return plans.map((plan) => ({
    code: plan.code,
    name: plan.name,
    pricing_type: plan.pricing_type,
    currency_code: plan.currency_code,
    monthly_price: plan.monthly_price,
    annual_price: plan.annual_price,
    regional_prices: plan.regional_prices,
  }));
}

export type SelectedMarketingPrice = {
  monthly: string | null;
  annual: string | null;
  currencyCode: MarketingCurrency;
};

export function selectMarketingPrice(
  plan: HomepagePricingPlanCard | PublicPlanCard,
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
  plans: HomepagePricingPlanCard[],
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

export function buildCardNamesByPlanId(plans: HomepagePricingPlanCard[]): Record<PricingPlanId, string | null> {
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

export function logMarketingPricingDiagnostics(
  plansResult: FetchPublicPlansResult,
  pricesByPlanId: Record<PricingPlanId, SelectedMarketingPrice | null>,
  currency: MarketingCurrency,
  visitorCountry: string | null = null,
): void {
  if (!plansResult.ok) {
    console.info("marketing.pricing.catalog_unavailable", { status: plansResult.status });
    return;
  }
  if (plansResult.plans.length === 0) {
    console.info("marketing.pricing.catalog_unpublished");
    return;
  }
  console.info("marketing.pricing.resolved", {
    visitor_country: visitorCountry,
    currency,
  });
  for (const planId of Object.keys(PLAN_CODE_BY_CARD_ID) as PricingPlanId[]) {
    if (pricesByPlanId[planId]?.monthly == null) {
      logMissingMarketingListPrice(PLAN_CODE_BY_CARD_ID[planId], currency);
    }
  }
}
