"use client";

import { useCallback, useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { COUNTRIES } from "@/lib/countries";

type FormState = "idle" | "submitting" | "success" | "error";

export function DemoForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [captchaId, setCaptchaId] = useState<string | null>(null);
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(true);

  const loadCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    try {
      const res = await fetch("/api/contact-captcha", { cache: "no-store" });
      const json = (await res.json()) as {
        success?: boolean;
        data?: { challenge_id: string; image: string };
      };
      if (!res.ok || !json.success || !json.data) {
        setCaptchaId(null);
        setCaptchaImage(null);
        return;
      }
      setCaptchaId(json.data.challenge_id);
      setCaptchaImage(json.data.image);
    } catch {
      setCaptchaId(null);
      setCaptchaImage(null);
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  useEffect(() => {
    trackEvent("demo_form_open");
    let cancelled = false;

    async function loadInitialCaptcha() {
      try {
        const res = await fetch("/api/contact-captcha", { cache: "no-store" });
        const json = (await res.json()) as {
          success?: boolean;
          data?: { challenge_id: string; image: string };
        };
        if (cancelled) return;
        if (!res.ok || !json.success || !json.data) {
          setCaptchaId(null);
          setCaptchaImage(null);
          return;
        }
        setCaptchaId(json.data.challenge_id);
        setCaptchaImage(json.data.image);
      } catch {
        if (!cancelled) {
          setCaptchaId(null);
          setCaptchaImage(null);
        }
      } finally {
        if (!cancelled) setCaptchaLoading(false);
      }
    }

    void loadInitialCaptcha();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;

    setState("submitting");
    setErrors({});
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      church_parish: String(data.get("church_parish") ?? ""),
      diocese_organization: String(data.get("diocese_organization") ?? ""),
      country: String(data.get("country") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      role: String(data.get("role") ?? ""),
      message: String(data.get("message") ?? ""),
      captcha_challenge_id: captchaId ?? "",
      captcha_response: String(data.get("captcha_response") ?? ""),
      company_website: String(data.get("company_website") ?? ""),
    };

    try {
      const res = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        success?: boolean;
        message?: string;
        errors?: Record<string, string>;
      };

      if (res.ok && json.success) {
        setState("success");
        trackEvent("demo_form_submit");
        setMessage(json.message ?? "Thank you. Your demo request has been received.");
        form.reset();
        void loadCaptcha();
        return;
      }

      setState("error");
      setMessage(json.message ?? "Something went wrong. Please try again.");
      if (json.errors) setErrors(json.errors);
      void loadCaptcha();
    } catch {
      setState("error");
      setMessage("We couldn't complete your request right now. Please try again shortly.");
      void loadCaptcha();
    }
  }

  const fieldClass =
    "mt-1 w-full rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white px-3 py-2.5 text-sm text-[var(--text-primary)] shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";

  return (
    <form method="post" action="#contact" onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="company_website">Website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-brand-navy">Name *</label>
          <input id="name" name="name" required className={fieldClass} aria-invalid={!!errors.name} />
          {errors.name ? <p className="mt-1 text-xs text-red-700" role="alert">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="church_parish" className="text-sm font-medium text-brand-navy">Church / Parish *</label>
          <input id="church_parish" name="church_parish" required className={fieldClass} aria-invalid={!!errors.church_parish} />
          {errors.church_parish ? <p className="mt-1 text-xs text-red-700" role="alert">{errors.church_parish}</p> : null}
        </div>
      </div>

      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="diocese_organization" className="text-sm font-medium text-brand-navy">Diocese / Organization</label>
          <input id="diocese_organization" name="diocese_organization" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="country" className="text-sm font-medium text-brand-navy">Country *</label>
          <select id="country" name="country" required className={fieldClass} defaultValue="">
            <option value="" disabled>Select country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country ? <p className="mt-1 text-xs text-red-700" role="alert">{errors.country}</p> : null}
        </div>
      </div>

      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-brand-navy">Email *</label>
          <input id="email" name="email" type="email" required className={fieldClass} aria-invalid={!!errors.email} />
          {errors.email ? <p className="mt-1 text-xs text-red-700" role="alert">{errors.email}</p> : null}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-brand-navy">Phone</label>
          <input id="phone" name="phone" type="tel" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="role" className="text-sm font-medium text-brand-navy">Role *</label>
        <input id="role" name="role" required className={fieldClass} aria-invalid={!!errors.role} />
        {errors.role ? <p className="mt-1 text-xs text-red-700" role="alert">{errors.role}</p> : null}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-brand-navy">Message *</label>
        <textarea id="message" name="message" required rows={5} className={fieldClass} aria-invalid={!!errors.message} />
        {errors.message ? <p className="mt-1 text-xs text-red-700" role="alert">{errors.message}</p> : null}
      </div>

      <div>
        <label htmlFor="captcha_response" className="text-sm font-medium text-brand-navy">Security check *</label>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <div className="flex h-16 min-w-[220px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-slate-50">
            {captchaLoading ? (
              <span className="text-xs text-slate-500">Loading check…</span>
            ) : captchaImage ? (
              <img src={captchaImage} alt="" width={220} height={64} className="h-16 w-full max-w-[220px] object-contain" />
            ) : (
              <span className="px-2 text-center text-xs text-red-700">Unavailable</span>
            )}
          </div>
          <button
            type="button"
            className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] px-3 py-2 text-sm"
            onClick={() => void loadCaptcha()}
            aria-label="Refresh security check"
          >
            Refresh
          </button>
        </div>
        <input
          id="captcha_response"
          name="captcha_response"
          autoComplete="off"
          spellCheck={false}
          className={fieldClass}
          aria-invalid={!!errors.captcha_response}
        />
        {errors.captcha_response ? (
          <p className="mt-1 text-xs text-red-700" role="alert">{errors.captcha_response}</p>
        ) : null}
      </div>

      {message ? (
        <p
          className={`rounded-md px-3 py-2 text-sm ${state === "success" ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}
          role={state === "success" ? "status" : "alert"}
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-[var(--radius-md)] bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)] disabled:opacity-60 sm:w-auto"
      >
        {state === "submitting" ? "Sending…" : "Request a Demo"}
      </button>
    </form>
  );
}
