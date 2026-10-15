import { officialBrand } from "@/config/brand";

function configuredUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim().replace(/\/$/, "");
  return trimmed || undefined;
}

/**
 * Public website origin used for canonical URLs, Open Graph, sitemap, and robots.
 * Production falls back to the official website when the env var is unset.
 * Local development stays on the Next.js dev server.
 */
function resolvePublicSiteUrl(): string {
  const configured = configuredUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (configured) {
    return configured;
  }
  if (process.env.NODE_ENV === "production") {
    return officialBrand.websiteUrl;
  }
  return "http://localhost:3010";
}

function resolveContactEmail(): string | undefined {
  const configured = process.env.MARKETING_CONTACT_EMAIL?.trim();
  if (configured) {
    return configured;
  }
  if (process.env.NODE_ENV === "production") {
    return officialBrand.contactEmail;
  }
  return undefined;
}

export const siteConfig = {
  url: resolvePublicSiteUrl(),
  laravelApiUrl: configuredUrl(process.env.LARAVEL_API_URL) ?? "http://127.0.0.1:8000",
  contactEmail: resolveContactEmail(),
  contactPhone: process.env.MARKETING_CONTACT_PHONE?.trim() || undefined,
  contactAddress: process.env.MARKETING_CONTACT_ADDRESS?.trim() || undefined,
  analyticsEnabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
  /** Parish application origin. Dev defaults to local Angular; production falls back to the official app host. */
  applicationUrl:
    configuredUrl(process.env.NEXT_PUBLIC_APPLICATION_URL) ??
    (process.env.NODE_ENV === "production"
      ? officialBrand.applicationUrl
      : "http://localhost:4200"),
};
