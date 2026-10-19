import { HashScrollOnLoad } from "@/components/hash-scroll-on-load";
import { MockupContact } from "@/components/mockup/contact";
import { MockupCta } from "@/components/mockup/cta";
import { MockupFeatures } from "@/components/mockup/features";
import { MockupFooter } from "@/components/mockup/footer";
import { MockupHeader } from "@/components/mockup/header";
import { MockupHero } from "@/components/mockup/hero";
import { MockupHomeIntro } from "@/components/mockup/home-intro";
import { MockupPricing } from "@/components/mockup/pricing";
import { MockupSlider } from "@/components/mockup/slider";
import { MockupTech } from "@/components/mockup/tech";
import { MockupTestimonialsRow } from "@/components/mockup/testimonials";
import { MockupTrust } from "@/components/mockup/trust";
import { headers } from "next/headers";
import { fetchPublishedSubscriptionPlans } from "@/lib/api/subscription-plans";
import {
  buildCardNamesByPlanId,
  buildCardPricesByPlanId,
  logMarketingPricingDiagnostics,
  pickHomepagePricingPlans,
  pricingCatalogStateFromFetch,
} from "@/lib/pricing/select-marketing-price";
import {
  marketingCurrencyForRequest,
  visitorCountryForPricing,
} from "@/lib/pricing/resolve-pricing-market";
export async function MockupPage() {
  const headerList = await headers();
  const visitorCountry = visitorCountryForPricing(headerList);
  const currency = marketingCurrencyForRequest(headerList);
  const plansResult = await fetchPublishedSubscriptionPlans();
  const pricingPlans = plansResult.ok ? pickHomepagePricingPlans(plansResult.plans) : [];
  const pricesByPlanId = plansResult.ok
    ? buildCardPricesByPlanId(pricingPlans, currency)
    : { seed: null, growth: null, summit: null };
  const namesByPlanId = plansResult.ok
    ? buildCardNamesByPlanId(pricingPlans)
    : { seed: null, growth: null, summit: null };
  const catalogState = pricingCatalogStateFromFetch(plansResult);

  logMarketingPricingDiagnostics(plansResult, pricesByPlanId, currency, visitorCountry);

  return (
    <>
      <HashScrollOnLoad />
      <MockupHeader />
      <main>
        <MockupHero />
        <MockupHomeIntro />
        <MockupTrust />
        <MockupFeatures />
        <MockupSlider />
        <MockupTech />
        <MockupTestimonialsRow />
        <MockupPricing
          key={currency}
          currencyCode={currency}
          catalogState={catalogState}
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
