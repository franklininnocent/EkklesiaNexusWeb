import { siteConfig } from "@/config/site";
import type { PublicPlanCard } from "@/types/subscription-plans";

const TIMEOUT_MS = 15_000;

type ApiEnvelope = {
  success?: boolean;
  message?: string;
  data?: PublicPlanCard[];
};

export type FetchPublicPlansResult =
  | { ok: true; plans: PublicPlanCard[] }
  | { ok: false; status: number; message: string };

function isValidPlanRow(value: unknown): value is PublicPlanCard {
  if (!value || typeof value !== "object") {
    return false;
  }
  const row = value as PublicPlanCard;

  return typeof row.code === "string" && typeof row.name === "string" && typeof row.pricing_type === "string";
}

function parseEnvelope(body: ApiEnvelope | null, status: number): FetchPublicPlansResult {
  if (!body?.success || !Array.isArray(body.data)) {
    return {
      ok: false,
      status,
      message: body?.message ?? "Subscription plans API returned an invalid payload.",
    };
  }

  if (!body.data.every(isValidPlanRow)) {
    return { ok: false, status: 502, message: "Subscription plans API returned malformed plan data." };
  }

  return { ok: true, plans: body.data };
}

async function fetchPlansFromPath(path: string, revalidate: number | false): Promise<FetchPublicPlansResult> {
  const base = siteConfig.laravelApiUrl.replace(/\/$/, "");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${base}${path}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      ...(revalidate === false ? { cache: "no-store" as const } : { next: { revalidate } }),
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
        message: body?.message ?? `Subscription plans API returned ${response.status}`,
      };
    }

    return parseEnvelope(body, response.status);
  } catch {
    return { ok: false, status: 503, message: "Subscription plans API is unreachable." };
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchPublishedSubscriptionPlans(): Promise<FetchPublicPlansResult> {
  return fetchPlansFromPath("/api/public/subscription-plans", 60);
}

export type PreviewExchangeResult =
  | { ok: true; plans: PublicPlanCard[]; session: string; expiresIn: number }
  | { ok: false; status: number; message: string };

export async function exchangePreviewToken(token: string): Promise<PreviewExchangeResult> {
  const encoded = encodeURIComponent(token);
  const base = siteConfig.laravelApiUrl.replace(/\/$/, "");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${base}/api/public/marketing-plan-catalog/preview?token=${encoded}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      cache: "no-store",
    });
    const body = (await response.json()) as {
      success?: boolean;
      data?: PublicPlanCard[];
      session?: string;
      expires_in?: number;
    };
    if (!response.ok || !body.success || !body.session || !Array.isArray(body.data) || !body.data.every(isValidPlanRow)) {
      return { ok: false, status: response.status || 403, message: "This preview is unavailable or has expired." };
    }
    return {
      ok: true,
      plans: body.data,
      session: body.session,
      expiresIn: typeof body.expires_in === "number" ? body.expires_in : 120,
    };
  } catch {
    return { ok: false, status: 503, message: "This preview is unavailable or has expired." };
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchPreviewSession(session: string): Promise<FetchPublicPlansResult> {
  const encoded = encodeURIComponent(session);

  return fetchPlansFromPath(`/api/public/marketing-plan-catalog/preview?session=${encoded}`, false);
}
