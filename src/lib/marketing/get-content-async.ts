import {
  isMarketingContentStrict,
  marketingContentApiPath,
  resolveMarketingContentSource,
} from "@/lib/marketing/content-source";
import { fetchMarketingContentFromApi } from "@/lib/marketing/providers/api-provider";
import { getFileMarketingContent } from "@/lib/marketing/providers/file-provider";
import { validateMarketingContentPayload } from "@/lib/marketing/validate-payload";
import type { MarketingContent } from "@/types/marketing";

/**
 * V2 entry: when MARKETING_CONTENT_SOURCE=api, load from Laravel CMS (with file fallback until CMS ships).
 */
export async function getMarketingContentAsync(): Promise<MarketingContent> {
  if (resolveMarketingContentSource() !== "api") {
    return getFileMarketingContent();
  }

  const result = await fetchMarketingContentFromApi(marketingContentApiPath());
  if (result.ok) {
    const payloadErrors = validateMarketingContentPayload(result.content);
    if (payloadErrors.length === 0) {
      return result.content as MarketingContent;
    }
    console.error("marketing.content.api_invalid", { errors: payloadErrors });
    if (isMarketingContentStrict()) {
      throw new Error(`Marketing CMS payload invalid: ${payloadErrors.join("; ")}`);
    }
  } else {
    console.error("marketing.content.api_failed", {
      status: result.status,
      message: result.message,
    });
    if (isMarketingContentStrict()) {
      throw new Error(`Marketing CMS API failed: ${result.message}`);
    }
  }

  return getFileMarketingContent();
}
