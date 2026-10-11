import { PlanComparison } from "@/components/pricing/plan-comparison";
import { PricingSection } from "@/components/pricing/pricing-section";
import { buildTaxDisclaimer, mapPublicPlansToView } from "@/lib/pricing/map-public-plans";
import type { PublicPlanCard } from "@/types/subscription-plans";

type CatalogPricingProps = {
  title: string;
  plans: PublicPlanCard[];
  previewBanner?: boolean;
  errorMessage?: string | null;
};

export function CatalogPricing({ title, plans, previewBanner = false, errorMessage = null }: CatalogPricingProps) {
  const viewPlans = mapPublicPlansToView(plans);
  const taxDisclaimer = buildTaxDisclaimer(plans);

  return (
    <>
      <PricingSection
        title={title}
        plans={viewPlans}
        taxDisclaimer={taxDisclaimer}
        previewBanner={previewBanner}
        errorMessage={errorMessage}
      />
      {!errorMessage && plans.length > 0 ? <PlanComparison plans={plans} /> : null}
    </>
  );
}
