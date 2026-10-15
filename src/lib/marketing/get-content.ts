import { getFileMarketingContent } from "@/lib/marketing/providers/file-provider";
import type { MarketingContent } from "@/types/marketing";

/** Synchronous V1 loader (file-based). Metadata and build-time paths use this. */
export function getMarketingContent(): MarketingContent {
  return getFileMarketingContent();
}

export { getMarketingContentAsync } from "@/lib/marketing/get-content-async";
