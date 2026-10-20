import { siteConfig } from "@/config/site";

export type DemoRequestPayload = {
  name: string;
  church_parish: string;
  diocese_organization?: string;
  country: string;
  email: string;
  phone?: string;
  role: string;
  message: string;
  captcha_challenge_id: string;
  captcha_response: string;
  company_website?: string;
  correlation_id?: string;
};

export type LaravelValidationError = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

const TIMEOUT_MS = 25_000;

function marketingProxyHeaders(clientIp?: string): Record<string, string> {
  const secret = process.env.MARKETING_BFF_SECRET?.trim();
  if (!secret || !clientIp || clientIp === "unknown") {
    return {};
  }
  return {
    "X-Marketing-Proxy-Secret": secret,
    "X-Marketing-Client-Ip": clientIp,
  };
}

export type ContactEnquiryPayload = {
  name: string;
  email: string;
  phone: string;
  organisation?: string;
  message: string;
  captcha_challenge_id: string;
  captcha_response: string;
  website?: string;
  correlation_id?: string;
};

export type ContactCaptchaPayload = {
  challenge_id: string;
  image: string;
  expires_in: number;
};

async function postLaravelJson<TBody extends Record<string, unknown>>(
  path: string,
  payload: TBody,
  correlationId?: string,
  clientIp?: string,
): Promise<{ ok: true; body: LaravelValidationError | null } | { ok: false; status: number; body: LaravelValidationError | null }> {
  const base = siteConfig.laravelApiUrl.replace(/\/$/, "");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${base}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(correlationId ? { "X-Correlation-Id": correlationId } : {}),
        ...marketingProxyHeaders(clientIp),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const text = await response.text();
    let body: LaravelValidationError | null = null;
    if (text) {
      try {
        body = JSON.parse(text) as LaravelValidationError;
      } catch {
        body = null;
      }
    }

    if (!response.ok) {
      return { ok: false, status: response.status, body };
    }

    return { ok: true, body };
  } catch {
    return { ok: false, status: 503, body: null };
  } finally {
    clearTimeout(timeout);
  }
}

export async function submitDemoRequestToLaravel(
  payload: DemoRequestPayload,
  correlationId: string,
  clientIp?: string,
): Promise<{ ok: true } | { ok: false; status: number; body: LaravelValidationError | null }> {
  const result = await postLaravelJson(
    "/api/public/demo-requests",
    { ...payload, correlation_id: correlationId },
    correlationId,
    clientIp,
  );
  return result.ok ? { ok: true } : result;
}

export async function fetchContactCaptchaFromLaravel(
  clientIp?: string,
): Promise<
  { ok: true; data: ContactCaptchaPayload } | { ok: false; status: number }
> {
  const base = siteConfig.laravelApiUrl.replace(/\/$/, "");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${base}/api/public/contact-captcha`, {
      method: "GET",
      headers: { Accept: "application/json", ...marketingProxyHeaders(clientIp) },
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) {
      return { ok: false, status: response.status };
    }
    const json = (await response.json()) as { success?: boolean; data?: ContactCaptchaPayload };
    if (!json.success || !json.data?.challenge_id || !json.data.image) {
      return { ok: false, status: 502 };
    }
    return { ok: true, data: json.data };
  } catch {
    return { ok: false, status: 503 };
  } finally {
    clearTimeout(timeout);
  }
}

export async function submitContactEnquiryToLaravel(
  payload: ContactEnquiryPayload,
  correlationId: string,
  clientIp?: string,
): Promise<{ ok: true; message?: string } | { ok: false; status: number; body: LaravelValidationError | null }> {
  const result = await postLaravelJson(
    "/api/public/contact-enquiries",
    { ...payload, correlation_id: correlationId },
    correlationId,
    clientIp,
  );
  if (result.ok) {
    return { ok: true, message: result.body?.message };
  }
  return result;
}
