import type { Metadata } from "next";
import type { MarketingContent, PublicPageSeo } from "@/types/marketing";
import { FEATURE_LANDING_SPECS, FEATURE_SLUGS, type FeatureSlug } from "@/lib/marketing/feature-slugs";
import { buildPageMetadata, resolveMarketingSeo } from "@/lib/marketing/seo-metadata";
import { officialBrand } from "@/config/brand";
import { siteContent } from "@/content/site";

export type StaticMarketingPageId =
  | "features"
  | "about"
  | "contact"
  | "solutionsCatholicParishes"
  | FeatureSlug;

export type StaticPageSeoDefaults = {
  id: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  robotsIndex: boolean;
};

const FEATURES_HUB: StaticPageSeoDefaults = {
  id: "features",
  path: "/features",
  seoTitle: "Church management features — EkklesiaNexus",
  seoDescription:
    "Explore verified EkklesiaNexus capabilities for families, sacramental registers, Mass intentions, ministries, stewardship, and parish reports.",
  robotsIndex: true,
};

const ABOUT_PAGE: StaticPageSeoDefaults = {
  id: "about",
  path: "/about",
  seoTitle: "About EkklesiaNexus",
  seoDescription:
    "EkklesiaNexus is a church management system for parish staff—families, sacraments, stewardship, and administration in one connected experience.",
  robotsIndex: true,
};

const CONTACT_PAGE: StaticPageSeoDefaults = {
  id: "contact",
  path: "/contact",
  seoTitle: "Contact EkklesiaNexus",
  seoDescription:
    "Reach the EkklesiaNexus team about parish software for your church. Request a conversation or send a message through our secure form.",
  robotsIndex: true,
};

const CATHOLIC_SOLUTIONS: StaticPageSeoDefaults = {
  id: "solutionsCatholicParishes",
  path: "/solutions/catholic-parishes",
  seoTitle: "Catholic parish management software — EkklesiaNexus",
  seoDescription:
    "Catholic parish administration with family registers, sacramental records, Mass intentions, Life Groups / BCCs, and stewardship—built for parish office workflows.",
  robotsIndex: true,
};

export const ENGLISH_ONLY_MARKETING_PREFIXES = [
  "/features",
  "/about",
  "/contact",
  "/solutions/",
] as const;

export function isEnglishOnlyMarketingPath(pathname: string): boolean {
  const normalized = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (normalized.startsWith("/pt-br/")) {
    return false;
  }
  return ENGLISH_ONLY_MARKETING_PREFIXES.some((prefix) =>
    normalized === prefix || normalized.startsWith(prefix),
  );
}

function toPublicPageSeo(defaults: StaticPageSeoDefaults): PublicPageSeo {
  return {
    id: defaults.id,
    name: defaults.seoTitle,
    path: defaults.path,
    seoTitle: defaults.seoTitle,
    seoDescription: defaults.seoDescription,
    robotsIndex: defaults.robotsIndex,
    robotsFollow: defaults.robotsIndex,
  };
}

export function allStaticPageDefaults(): StaticPageSeoDefaults[] {
  const featurePages = FEATURE_SLUGS.map((slug) => {
    const spec = FEATURE_LANDING_SPECS[slug];
    return {
      id: slug,
      path: spec.path,
      seoTitle: spec.seoTitle,
      seoDescription: spec.seoDescription,
      robotsIndex: true,
    };
  });
  return [FEATURES_HUB, CATHOLIC_SOLUTIONS, ABOUT_PAGE, CONTACT_PAGE, ...featurePages];
}

export function staticPageDefaultsByPath(path: string): StaticPageSeoDefaults | null {
  const normalized = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  return allStaticPageDefaults().find((page) => page.path === normalized) ?? null;
}

function cmsOverrideForStaticPage(
  seo: ReturnType<typeof resolveMarketingSeo>,
  defaults: StaticPageSeoDefaults,
): PublicPageSeo {
  const page = toPublicPageSeo(defaults);
  const cms = seo.pages[defaults.id as keyof typeof seo.pages];
  if (!cms || typeof cms !== "object") {
    return page;
  }
  return {
    ...page,
    seoTitle: cms.seoTitle?.trim() ? cms.seoTitle : page.seoTitle,
    seoDescription: cms.seoDescription?.trim() ? cms.seoDescription : page.seoDescription,
    ogTitle: cms.ogTitle,
    ogDescription: cms.ogDescription,
    ogImage: cms.ogImage,
    robotsIndex: cms.robotsIndex ?? page.robotsIndex,
    robotsFollow: cms.robotsFollow ?? page.robotsFollow,
  };
}

export function buildStaticPageMetadata(
  content: MarketingContent,
  path: string,
): Metadata | null {
  const defaults = staticPageDefaultsByPath(path);
  if (!defaults) {
    return null;
  }

  const seo = resolveMarketingSeo(content);
  const page = cmsOverrideForStaticPage(seo, defaults);
  return buildPageMetadata(page, seo);
}

export function aboutPageCopy() {
  return {
    h1: `About ${officialBrand.productName}`,
    paragraphs: [
      `${officialBrand.productName} is a church management system for parish priests, secretaries, treasurers, and other authorized church staff.`,
      siteContent.supportingLine,
      siteContent.slogan,
      `For product questions or a guided conversation, use the contact form or email ${officialBrand.contactEmail}. Staff sign-in for parishes is at ${officialBrand.applicationUrl}.`,
    ],
  };
}
