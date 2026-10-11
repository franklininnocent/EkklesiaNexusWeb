import type { MetadataRoute } from "next";
import { getMarketingContentAsync } from "@/lib/marketing/get-content";
import { indexableLocalizedSitemapEntries } from "@/lib/marketing/localized-metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getMarketingContentAsync();
  const entries = indexableLocalizedSitemapEntries(content);

  return entries.map((entry) => ({
    url: entry.url,
    ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
  }));
}
