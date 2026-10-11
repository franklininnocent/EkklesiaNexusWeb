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

export async function MockupPage() {
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
        <MockupPricing />
        <MockupCta />
        <MockupContact />
      </main>
      <MockupFooter />
    </>
  );
}
