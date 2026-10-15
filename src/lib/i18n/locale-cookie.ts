import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, type AppLocale, isAppLocale } from "@/lib/i18n/locale";

export function persistLocalePreference(locale: AppLocale): void {
  if (typeof document === "undefined") return;
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secure ? "; Secure" : ""}`;
}

export function readLocaleCookie(): AppLocale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  if (!match?.[1]) return null;
  try {
    const decoded = decodeURIComponent(match[1]);
    return isAppLocale(decoded) ? decoded : null;
  } catch {
    return null;
  }
}
