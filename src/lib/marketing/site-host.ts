import { officialBrand } from "@/config/brand";
import { siteConfig } from "@/config/site";

/** True when the configured public site URL is the official marketing domain (indexable). */
export function isProductionMarketingHost(): boolean {
  const base = siteConfig.url.replace(/\/$/, "");
  return base === officialBrand.websiteUrl.replace(/\/$/, "");
}
