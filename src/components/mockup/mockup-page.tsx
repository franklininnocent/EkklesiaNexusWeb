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
import { getRequestLocale } from "@/lib/i18n/server";
import {
  resolvePricingMarketFromContext,
  visitorCountryForPricing,
} from "@/lib/pricing/resolve-pricing-market";

export async function MockupPage() {
  const headerList = await headers();
  const locale = await getRequestLocale();
  const country = visitorCountryForPricing(headerList);
  const market = resolvePricingMarketFromContext(country, locale);

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
        <MockupPricing key={`${market}-${locale}`} market={market} />
        <MockupCta />
        <MockupContact />
      </main>
      <MockupFooter />
    </>
  );
}
