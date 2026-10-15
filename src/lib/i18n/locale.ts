import { isEnglishOnlyMarketingPath } from "@/lib/marketing/marketing-static-pages";

export const SUPPORTED_LOCALES = ["en-US", "pt-BR"] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en-US";
export const LOCALE_COOKIE = "en_locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

export const LOCALE_DISPLAY: Record<AppLocale, string> = {
  "en-US": "English",
  "pt-BR": "Português (Brasil)",
};

/** Compact header switcher labels (full locale name in `aria-label`). */
export const LOCALE_SWITCHER_LABEL: Record<AppLocale, string> = {
  "en-US": "EN",
  "pt-BR": "PT",
};

const PT_BR_PREFIX = "/pt-br";

export function isAppLocale(value: string | null | undefined): value is AppLocale {
  return value === "en-US" || value === "pt-BR";
}

/** BCP 47 tag for the document `lang` attribute. */
export function htmlLangAttribute(locale: AppLocale): string {
  return locale === "pt-BR" ? "pt-BR" : "en";
}

export function ogLocaleTag(locale: AppLocale): string {
  return locale === "pt-BR" ? "pt_BR" : "en_US";
}

export function localeFromPathname(pathname: string): AppLocale {
  const normalized = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (normalized === PT_BR_PREFIX || normalized.startsWith(`${PT_BR_PREFIX}/`)) {
    return "pt-BR";
  }
  return DEFAULT_LOCALE;
}

export type PublicPageId = "home" | "privacy" | "terms";

const PAGE_PATHS: Record<PublicPageId, { en: string; pt: string }> = {
  home: { en: "/", pt: "/pt-br" },
  privacy: { en: "/privacy", pt: "/pt-br/privacy" },
  terms: { en: "/terms", pt: "/pt-br/terms" },
};

export function publicPagePath(locale: AppLocale, page: PublicPageId): string {
  return locale === "pt-BR" ? PAGE_PATHS[page].pt : PAGE_PATHS[page].en;
}

export function sectionAnchorHref(locale: AppLocale, sectionId: string): string {
  const base = locale === "pt-BR" ? "/pt-br" : "/";
  return sectionId === "home" ? `${base}#home` : `${base}#${sectionId}`;
}

export function localizedFooterHref(locale: AppLocale, path: "/privacy" | "/terms"): string {
  if (locale === "pt-BR") {
    return path === "/privacy" ? "/pt-br/privacy" : "/pt-br/terms";
  }
  return path;
}

export function publicPageIdFromPath(pathname: string): PublicPageId | null {
  const normalized = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (normalized === "/" || normalized === "/pt-br") return "home";
  if (normalized === "/privacy" || normalized === "/pt-br/privacy") return "privacy";
  if (normalized === "/terms" || normalized === "/pt-br/terms") return "terms";
  return null;
}

export function switchLocalePath(pathname: string, targetLocale: AppLocale): string {
  const normalized = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (isEnglishOnlyMarketingPath(normalized)) {
    return pathname;
  }

  const page = publicPageIdFromPath(pathname);
  const hash = pathname.includes("#") ? `#${pathname.split("#")[1]}` : "";
  const safeHash =
    hash && ["#home", "#features", "#solutions", "#pricing", "#demo", "#contact"].includes(hash)
      ? hash
      : "";
  if (page) {
    return `${publicPagePath(targetLocale, page)}${safeHash}`;
  }
  return publicPagePath(targetLocale, "home");
}
