import type { MetadataRoute } from "next";
import { getMarketingContentAsync } from "@/lib/marketing/get-content";
import { indexableSitemapEntries } from "@/lib/marketing/seo-metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getMarketingContentAsync();
  const entries = indexableSitemapEntries(content);

  return entries.map((entry) => ({
    url: entry.url,
    ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
  }));
}
