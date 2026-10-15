import { advantagesContent } from "@/content/advantages";
import { audiencesContent } from "@/content/audiences";
import {
  church360Content,
  finalCtaContent,
  footerContent,
  whyContent,
} from "@/content/cta";
import { featureCategoriesContent } from "@/content/features";
import { heroContent } from "@/content/hero";
import { navigationContent } from "@/content/navigation";
import { reportsContent } from "@/content/reports";
import { screenshotsContent } from "@/content/screenshots";
import { siteContent } from "@/content/site";
import { solutionsContent } from "@/content/solutions";
import { valueStripContent } from "@/content/trust";
import { workflowContent } from "@/content/workflow";
import { siteConfig } from "@/config/site";
import { createDefaultMarketingSeo } from "@/lib/marketing/seo-defaults";
import type { MarketingContent } from "@/types/marketing";

/** V1 default: typed modules under `src/content/`. */
export function getFileMarketingContent(): MarketingContent {
  const site = {
    ...siteContent,
    contactEmail: siteConfig.contactEmail,
    contactPhone: siteConfig.contactPhone,
    contactAddress: siteConfig.contactAddress,
  };

  return {
    site,
    navigation: navigationContent,
    hero: heroContent,
    valueStrip: valueStripContent,
    why: whyContent,
    church360: church360Content,
    featureCategories: featureCategoriesContent,
    solutions: solutionsContent,
    reports: reportsContent,
    workflow: workflowContent,
    advantages: advantagesContent,
    audiences: audiencesContent,
    finalCta: finalCtaContent,
    screenshots: screenshotsContent
      .filter((s) => s.active)
      .sort((a, b) => a.displayOrder - b.displayOrder),
    footer: footerContent,
    seo: createDefaultMarketingSeo(),
  };
}
