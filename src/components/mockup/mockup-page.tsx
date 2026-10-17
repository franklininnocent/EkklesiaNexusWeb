import { HashScrollOnLoad } from "@/components/hash-scroll-on-load";
import { MockupContact } from "@/components/mockup/contact";
import { MockupCta } from "@/components/mockup/cta";
import { MockupFeatures } from "@/components/mockup/features";
import { MockupFooter } from "@/components/mockup/footer";
import { MockupHeader } from "@/components/mockup/header";
import { MockupHero } from "@/components/mockup/hero";
import { MockupPricing } from "@/components/mockup/pricing";
import { MockupSlider } from "@/components/mockup/slider";
import { MockupTech } from "@/components/mockup/tech";
import { MockupTestimonialsRow } from "@/components/mockup/testimonials";
import { MockupTrust } from "@/components/mockup/trust";
import { headers } from "next/headers";
import { fetchPublishedSubscriptionPlans } from "@/lib/api/subscription-plans";
import {
  PLAN_CODE_BY_CARD_ID,
  buildCardNamesByPlanId,
  buildCardPricesByPlanId,
  logMissingMarketingListPrice,
} from "@/lib/pricing/select-marketing-price";
import { marketingCurrencyForRequest } from "@/lib/pricing/resolve-pricing-market";
import type { PricingPlanId } from "@/data/regional-pricing";

export async function MockupPage() {
  const headerList = await headers();
  const currency = marketingCurrencyForRequest(headerList);
  const plansResult = await fetchPublishedSubscriptionPlans();
  const pricesByPlanId = plansResult.ok
    ? buildCardPricesByPlanId(plansResult.plans, currency)
    : { seed: null, growth: null, summit: null };
  const namesByPlanId = plansResult.ok
    ? buildCardNamesByPlanId(plansResult.plans)
    : { seed: null, growth: null, summit: null };

  if (!plansResult.ok) {
    console.info("marketing.pricing.catalog_unavailable", { status: plansResult.status });
  } else {
    for (const planId of Object.keys(PLAN_CODE_BY_CARD_ID) as PricingPlanId[]) {
      if (pricesByPlanId[planId]?.monthly == null) {
        logMissingMarketingListPrice(PLAN_CODE_BY_CARD_ID[planId], currency);
      }
    }
  }

  return (
    <>
      <HashScrollOnLoad />
      <MockupHeader />
      <main>
        <MockupHero />
        <MockupTrust />
        <MockupFeatures />
        <MockupSlider />
        <MockupTech />
        <MockupTestimonialsRow />
        <MockupPricing
          key={currency}
          currencyCode={currency}
          pricesByPlanId={pricesByPlanId}
          namesByPlanId={namesByPlanId}
        />
        <MockupCta />
        <MockupContact />
      </main>
      <MockupFooter />
    </>
  );
}
