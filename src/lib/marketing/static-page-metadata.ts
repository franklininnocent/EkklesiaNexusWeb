import type { Metadata } from "next";
import { getMarketingContentAsync } from "@/lib/marketing/get-content";
import { buildStaticPageMetadata } from "@/lib/marketing/marketing-static-pages";

export async function metadataForStaticPath(path: string): Promise<Metadata> {
  const content = await getMarketingContentAsync();
  const metadata = buildStaticPageMetadata(content, path);
  if (!metadata) {
    return { title: "EkklesiaNexus" };
  }
  return metadata;
}
