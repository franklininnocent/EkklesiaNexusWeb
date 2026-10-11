import { siteConfig } from "@/config/site";
import type { MarketingContent } from "@/types/marketing";

const TIMEOUT_MS = 15_000;

type ApiEnvelope = {
  success?: boolean;
  message?: string;
  data?: MarketingContent;
};

export type MarketingContentApiResult =
  | { ok: true; content: MarketingContent }
  | { ok: false; status: number; message: string };

export async function fetchMarketingContentFromApi(
  apiPath = "/api/public/marketing-content",
): Promise<MarketingContentApiResult> {
  const base = siteConfig.laravelApiUrl.replace(/\/$/, "");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${base}${apiPath}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    const text = await response.text();
    let body: ApiEnvelope | null = null;
    if (text) {
      try {
        body = JSON.parse(text) as ApiEnvelope;
      } catch {
        body = null;
      }
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        message: body?.message ?? `Marketing content API returned ${response.status}`,
      };
    }

    if (!body?.success || !body.data) {
      return {
        ok: false,
        status: response.status,
        message: body?.message ?? "Marketing content API returned an invalid payload.",
      };
    }

    return { ok: true, content: body.data };
  } catch {
    return { ok: false, status: 503, message: "Marketing content API is unreachable." };
  } finally {
    clearTimeout(timeout);
  }
}
