import type { MarketingSeoConfig, PublicPageSeo } from "@/types/marketing";
import { officialBrand } from "@/config/brand";
import { siteContent } from "@/content/site";

export const PRODUCTION_CANONICAL_ORIGIN = officialBrand.websiteUrl;

export const SEO_PAGE_REGISTRY: Record<string, { path: string; name: string; indexLockedNo: boolean }> = {
  home: { path: "/", name: "Homepage", indexLockedNo: false },
  privacy: { path: "/privacy", name: "Privacy", indexLockedNo: true },
  terms: { path: "/terms", name: "Terms", indexLockedNo: true },
};

function pageSeo(
  id: keyof typeof SEO_PAGE_REGISTRY,
  seoTitle: string,
  seoDescription: string,
  robotsIndex: boolean,
): PublicPageSeo {
  const meta = SEO_PAGE_REGISTRY[id];
  return {
    id,
    name: meta.name,
    path: meta.path,
    seoTitle,
    seoDescription,
    robotsIndex,
    robotsFollow: robotsIndex,
  };
}

/** Default SEO block for file provider and CMS export baseline. */
export function createDefaultMarketingSeo(): MarketingSeoConfig {
  const title = siteContent.seoTitle;
  const description = siteContent.seoDescription;

  return {
    schemaVersion: 1,
    canonicalOrigin: PRODUCTION_CANONICAL_ORIGIN,
    defaultLocale: "en",
    ogLocale: "en_US",
    defaultOgImage: "/images/og/og-preview.png",
    organizationName: officialBrand.productName,
    organizationDescription: description,
    robots: { allowRoot: true },
    pages: {
      home: pageSeo("home", title, description, true),
      privacy: pageSeo(
        "privacy",
        "Privacy — EkklesiaNexus",
        "Privacy information for the EkklesiaNexus marketing website.",
        false,
      ),
      terms: pageSeo(
        "terms",
        "Terms — EkklesiaNexus",
        "Terms of use for the EkklesiaNexus marketing website.",
        false,
      ),
    },
  };
}
