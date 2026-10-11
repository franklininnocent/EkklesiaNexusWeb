export type MarketingContentSource = "file" | "api";

export function resolveMarketingContentSource(): MarketingContentSource {
  const raw = process.env.MARKETING_CONTENT_SOURCE?.trim().toLowerCase();
  if (raw === "api") return "api";
  return "file";
}

export function marketingContentApiPath(): string {
  const path = process.env.MARKETING_CONTENT_API_PATH?.trim();
  return path && path.startsWith("/") ? path : "/api/public/marketing-content";
}

/** When true with MARKETING_CONTENT_SOURCE=api, do not fall back to file-based content on API errors. */
export function isMarketingContentStrict(): boolean {
  return process.env.MARKETING_CONTENT_STRICT === "true";
}
