type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult =
  | { allowed: true; remaining: number; limit: number; retryAfterSeconds: number }
  | { allowed: false; remaining: 0; limit: number; retryAfterSeconds: number };

export type BffThrottleBucket = "marketing_bff_forms" | "marketing_bff_captcha";

function prune(now: number): void {
  if (buckets.size < 2_000) {
    return;
  }
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

/** In-process limiter used only in non-production when Laravel is not configured. */
export function consumeMemoryRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  prune(now);
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: Math.max(0, limit - 1), limit, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      limit,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, limit - existing.count),
    limit,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export const consumeRateLimit = consumeMemoryRateLimit;

function failClosed(limit: number): RateLimitResult {
  return { allowed: false, remaining: 0, limit, retryAfterSeconds: 30 };
}

export async function consumeSharedRateLimit(
  bucket: BffThrottleBucket,
  clientIp: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const secret = process.env.MARKETING_BFF_SECRET?.trim();
  const base = process.env.LARAVEL_API_URL?.trim().replace(/\/$/, "");
  const production = process.env.NODE_ENV === "production";

  if (!secret || !base) {
    if (production) {
      return failClosed(limit);
    }
    return consumeMemoryRateLimit(`${bucket}:${clientIp}`, limit, windowMs);
  }

  if (clientIp === "unknown") {
    return { allowed: true, remaining: limit, limit, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4_000);
  try {
    const response = await fetch(`${base}/api/public/marketing-bff-throttle`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Marketing-Proxy-Secret": secret,
      },
      body: JSON.stringify({ bucket, client_ip: clientIp }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (response.status === 429) {
      const retry = Number(response.headers.get("Retry-After") ?? "60");
      return {
        allowed: false,
        remaining: 0,
        limit,
        retryAfterSeconds: Number.isFinite(retry) && retry > 0 ? retry : 60,
      };
    }

    if (!response.ok) {
      return failClosed(limit);
    }

    const json = (await response.json()) as { remaining?: number; limit?: number };
    return {
      allowed: true,
      remaining: typeof json.remaining === "number" ? json.remaining : 0,
      limit: typeof json.limit === "number" ? json.limit : limit,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  } catch {
    return failClosed(limit);
  } finally {
    clearTimeout(timeout);
  }
}

export function rateLimitDeniedResponse(result: Extract<RateLimitResult, { allowed: false }>) {
  return {
    status: 429 as const,
    headers: {
      "Retry-After": String(result.retryAfterSeconds),
      "X-RateLimit-Limit": String(result.limit),
      "X-RateLimit-Remaining": "0",
      "Cache-Control": "no-store",
    },
    body: {
      success: false,
      message: "Please wait a moment and try again.",
      errors: {},
    },
  };
}
