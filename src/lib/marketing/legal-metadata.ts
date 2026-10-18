import type { Metadata } from "next";
import type { AppLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { ogLocaleTag } from "@/lib/i18n/locale";
import { createTranslator } from "@/lib/i18n/translate";
import { localizedLanguageAlternates } from "@/lib/marketing/localized-metadata";
import { siteConfig } from "@/config/site";

type LegalPath = "/privacy" | "/terms";

export function legalPageMetadata(
  path: LegalPath,
  title: string,
  options?: { locale?: AppLocale; description?: string },
): Metadata {
  const locale = options?.locale ?? "en-US";
  const base = siteConfig.url.replace(/\/$/, "");
  const localizedPath = locale === "pt-BR" ? `/pt-br${path}` : path;
  const pageId = path === "/privacy" ? "privacy" : "terms";
  const description =
    options?.description ??
    createTranslator(getMessages(locale))(
      pageId === "privacy" ? "seo.privacyDescription" : "seo.termsDescription",
    );

  return {
    title,
    description,
    alternates: {
      canonical: `${base}${localizedPath}`,
      languages: localizedLanguageAlternates(pageId),
    },
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: `${base}${localizedPath}`,
      type: "website",
      locale: ogLocaleTag(locale),
    },
  };
}

export function legalPageMetadataForLocale(
  path: LegalPath,
  locale: AppLocale,
  cmsTitle?: string,
): Metadata {
  const t = createTranslator(getMessages(locale));
  const title =
    locale === "pt-BR"
      ? t(path === "/privacy" ? "seo.privacyTitle" : "seo.termsTitle")
      : cmsTitle ?? t(path === "/privacy" ? "seo.privacyTitle" : "seo.termsTitle");
  return legalPageMetadata(path, title, { locale });
}
