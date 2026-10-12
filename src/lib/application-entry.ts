import { officialBrand } from "@/config/brand";
import { siteConfig } from "@/config/site";

const PRODUCTION_APP_ORIGIN = new URL(officialBrand.applicationUrl).origin;

function developmentApplicationOrigin(): string {
  return "http://localhost:4200";
}

/** Resolved parish application origin (no trailing slash). */
export function resolveApplicationOrigin(): string {
  const configured = siteConfig.applicationUrl?.replace(/\/$/, "");
  if (configured) {
    return configured;
  }
  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_APP_ORIGIN;
  }
  return developmentApplicationOrigin();
}

function isAllowedApplicationOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }
    if (origin === PRODUCTION_APP_ORIGIN) {
      return true;
    }
    if (process.env.NODE_ENV !== "production") {
      return url.hostname === "localhost" || url.hostname === "127.0.0.1";
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Guarded Angular entry: `/dashboard` uses auth guards and post-login routing.
 * Unauthenticated visitors are sent to `/auth/login` by the app (with returnUrl).
 */
export function applicationEntryHref(): string {
  const origin = resolveApplicationOrigin();
  const safeOrigin = isAllowedApplicationOrigin(origin) ? origin : PRODUCTION_APP_ORIGIN;
  return `${safeOrigin}/dashboard`;
}
