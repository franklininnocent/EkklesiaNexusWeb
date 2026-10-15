import type { Metadata } from "next";
import { officialBrand } from "@/config/brand";
import { siteConfig } from "@/config/site";
import type { AppLocale } from "@/lib/i18n/locale";
import { localizedAlternates, structuredDataLanguageFields } from "@/lib/marketing/localized-metadata";
import type { MarketingContent, MarketingSeoConfig, PublicPageSeo } from "@/types/marketing";
import { createDefaultMarketingSeo } from "@/lib/marketing/seo-defaults";
import { ogLocaleTag } from "@/lib/i18n/locale";

function siteBaseUrl(): string {
  return siteConfig.url.replace(/\/$/, "");
}

export function resolveMarketingSeo(content: MarketingContent): MarketingSeoConfig {
  return content.seo ?? createDefaultMarketingSeo();
}

export function getHomePageSeo(content: MarketingContent): PublicPageSeo {
  const seo = resolveMarketingSeo(content);
  const home = seo.pages.home;
  return {
    ...home,
    seoTitle: home.seoTitle || content.site.seoTitle,
    seoDescription: home.seoDescription || content.site.seoDescription,
  };
}

export function buildPageMetadata(
  page: PublicPageSeo,
  seo: MarketingSeoConfig,
  options?: { pathOverride?: string; locale?: AppLocale },
): Metadata {
  const base = siteBaseUrl();
  const path = options?.pathOverride ?? page.path;
  const locale = options?.locale ?? "en-US";
  const canonical = path === "/" ? `${base}/` : `${base}${path}`;
  const alternates =
    page.id === "home"
      ? {
          ...localizedAlternates("home"),
          canonical,
        }
      : { canonical };
  const ogImage = page.ogImage ?? seo.defaultOgImage;
  const ogTitle = page.ogTitle ?? page.seoTitle;
  const ogDescription = page.ogDescription ?? page.seoDescription;
  const absoluteOg = ogImage.startsWith("http") ? ogImage : `${base}${ogImage}`;

  const metadata: Metadata = {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates,
    robots: {
      index: page.robotsIndex,
      follow: page.robotsFollow,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: ogTitle,
      description: ogDescription,
      siteName: seo.organizationName,
      locale: locale === "pt-BR" ? ogLocaleTag("pt-BR") : seo.ogLocale,
      images: [
        {
          url: absoluteOg,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [absoluteOg],
    },
  };

  if (seo.verification?.google) {
    metadata.verification = { ...(metadata.verification ?? {}), google: seo.verification.google };
  }
  if (seo.verification?.bing) {
    metadata.verification = {
      ...(metadata.verification ?? {}),
      other: { "msvalidate.01": seo.verification.bing },
    };
  }

  return metadata;
}

export function buildRootLayoutMetadata(content: MarketingContent): Metadata {
  const home = getHomePageSeo(content);
  const seo = resolveMarketingSeo(content);
  const base = siteBaseUrl();

  const pageMeta = buildPageMetadata(home, seo);
  return {
    metadataBase: new URL(base),
    applicationName: officialBrand.productName,
    authors: [{ name: officialBrand.productName, url: officialBrand.websiteUrl }],
    creator: officialBrand.productName,
    publisher: officialBrand.productName,
    ...pageMeta,
    icons: {
      icon: [
        { url: "/favicon/circular-badge-blue-gold.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/favicon.ico" },
      ],
      apple: [{ url: "/logos/ekklesiasoft-mark.png" }],
    },
  };
}

function publisherEmail(content: MarketingContent): string {
  const fromContent = content.site.contactEmail?.trim();
  return fromContent || officialBrand.contactEmail;
}

export function buildStructuredDataGraph(
  content: MarketingContent,
  locale: AppLocale = "en-US",
): Record<string, unknown> {
  const seo = resolveMarketingSeo(content);
  const base = siteBaseUrl();
  const home = getHomePageSeo(content);
  const language = structuredDataLanguageFields(locale);
  const logo = `${base}/logos/ekklesiasoft-mark.png`;
  const email = publisherEmail(content);
  const organizationId = `${base}/#organization`;
  const organizationName = seo.organizationName || officialBrand.productName;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: organizationName,
        url: base,
        logo,
        email,
        description: seo.organizationDescription,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email,
          url: `${base}/#contact`,
          availableLanguage: language.availableLanguage,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: organizationName,
        url: base,
        inLanguage: language.inLanguage,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "SoftwareApplication",
        name: officialBrand.productName,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: base,
        description: home.seoDescription,
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export function indexableSitemapEntries(content: MarketingContent): { url: string; lastModified?: Date }[] {
  const seo = resolveMarketingSeo(content);
  const base = siteBaseUrl();
  const entries: { url: string; lastModified?: Date }[] = [];

  for (const page of Object.values(seo.pages)) {
    if (!page.robotsIndex) {
      continue;
    }
    const url = page.path === "/" ? `${base}/` : `${base}${page.path}`;
    const lastModified = seo.publishedAt ? new Date(seo.publishedAt) : undefined;
    entries.push({ url, lastModified });
  }

  return entries;
}

const GA4_MEASUREMENT_ID = /^(G|GT)-[A-Z0-9]+$/;

export function ga4MeasurementIdFromContent(content: MarketingContent): string | undefined {
  const id = content.seo?.analytics?.ga4MeasurementId?.trim();
  if (!id || !GA4_MEASUREMENT_ID.test(id)) {
    return undefined;
  }
  return id;
}
