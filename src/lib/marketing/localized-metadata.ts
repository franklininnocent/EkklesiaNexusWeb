import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getMessages } from "@/lib/i18n/messages";
import { htmlLangAttribute, publicPagePath, type AppLocale, type PublicPageId } from "@/lib/i18n/locale";
import { createTranslator } from "@/lib/i18n/translate";
import type { MarketingContent, PublicPageSeo } from "@/types/marketing";
import { allStaticPageDefaults } from "@/lib/marketing/marketing-static-pages";
import { isProductionMarketingHost } from "@/lib/marketing/site-host";
import { buildPageMetadata, getHomePageSeo, resolveMarketingSeo } from "@/lib/marketing/seo-metadata";

function siteBaseUrl(): string {
  return siteConfig.url.replace(/\/$/, "");
}

export function localizedLanguageAlternates(page: PublicPageId): Record<string, string> {
  const base = siteBaseUrl();
  const enPath = publicPagePath("en-US", page);
  const ptPath = publicPagePath("pt-BR", page);
  const enUrl = enPath === "/" ? `${base}/` : `${base}${enPath}`;
  const ptUrl = `${base}${ptPath}`;
  return {
    "en-US": enUrl,
    "pt-BR": ptUrl,
    "x-default": enUrl,
  };
}

export function localizedAlternates(
  page: PublicPageId,
  canonicalLocale: AppLocale = "en-US",
): Metadata["alternates"] {
  const languages = localizedLanguageAlternates(page);
  const canonical: string =
    canonicalLocale === "pt-BR" ? languages["pt-BR"] : languages["en-US"];

  return {
    canonical,
    languages,
  };
}

export function buildLocalizedHomeMetadata(
  content: MarketingContent,
  locale: AppLocale,
): Metadata {
  const seo = resolveMarketingSeo(content);
  const t = createTranslator(getMessages(locale));
  const base = siteBaseUrl();

  if (locale === "pt-BR") {
    const page: PublicPageSeo = {
      ...seo.pages.home,
      seoTitle: t("seo.homeTitle"),
      seoDescription: t("seo.homeDescription"),
      path: "/pt-br",
    };
    return {
      metadataBase: new URL(base),
      ...buildPageMetadata(page, seo, {
        pathOverride: "/pt-br",
        locale: "pt-BR",
      }),
    };
  }

  const home = getHomePageSeo(content);
  return {
    metadataBase: new URL(base),
    ...buildPageMetadata(home, seo, { locale: "en-US" }),
  };
}

export function indexableLocalizedSitemapEntries(
  content: MarketingContent,
): { url: string; lastModified?: Date }[] {
  const seo = resolveMarketingSeo(content);
  const base = siteBaseUrl();
  const entries: { url: string; lastModified?: Date }[] = [];
  const lastModified = seo.publishedAt ? new Date(seo.publishedAt) : undefined;

  for (const page of Object.values(seo.pages)) {
    if (!page?.robotsIndex) continue;
    const enUrl = page.path === "/" ? `${base}/` : `${base}${page.path}`;
    entries.push({ url: enUrl, lastModified });
    if (page.id === "home") {
      entries.push({ url: `${base}/pt-br`, lastModified });
    }
  }

  if (isProductionMarketingHost()) {
    const seen = new Set(entries.map((entry) => entry.url));
    for (const page of allStaticPageDefaults()) {
      if (!page.robotsIndex) continue;
      const url = `${base}${page.path}`;
      if (seen.has(url)) continue;
      entries.push({ url, lastModified });
      seen.add(url);
    }
  }

  return entries;
}

export function structuredDataLanguageFields(locale: AppLocale): {
  inLanguage: string;
  availableLanguage: string[];
} {
  return {
    inLanguage: htmlLangAttribute(locale),
    availableLanguage: locale === "pt-BR" ? ["English", "Portuguese"] : ["English", "Portuguese"],
  };
}
