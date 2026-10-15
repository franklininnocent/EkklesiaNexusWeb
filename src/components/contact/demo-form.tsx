"use client";

import { useEffect, useId, useState } from "react";
import { ContactCaptchaField } from "@/components/contact/contact-captcha-field";
import { trackEvent } from "@/lib/analytics";
import { COUNTRIES } from "@/lib/countries";
import { useContactCaptcha } from "@/hooks/use-contact-captcha";
import { useTranslations, useI18n } from "@/lib/i18n/i18n-provider";
import { X_EN_LOCALE_HEADER } from "@/lib/i18n/constants";

type FormState = "idle" | "submitting" | "success" | "error";

export function DemoForm() {
  const { locale } = useI18n();
  const t = useTranslations();
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const formId = useId();
  const [captchaResponse, setCaptchaResponse] = useState("");
  const captcha = useContactCaptcha(() => setCaptchaResponse(""));
  const { captchaId, loadCaptcha } = captcha;

  useEffect(() => {
    trackEvent("demo_form_open");
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
      captcha_response: captchaResponse,
      company_website: String(data.get("company_website") ?? ""),
    };

    try {
      const res = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json", [X_EN_LOCALE_HEADER]: locale },
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
        setMessage(json.message ?? t("forms.demo.successDefault"));
        form.reset();
        void loadCaptcha();
        return;
      }

      setState("error");
      setMessage(json.message ?? t("forms.bff.requestFailed"));
      if (json.errors) setErrors(json.errors);
      void loadCaptcha();
    } catch {
      setState("error");
      setMessage(t("forms.bff.requestFailed"));
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
        <label htmlFor={`${formId}-captcha`} className="text-sm font-medium text-brand-navy">
          {t("forms.contact.labels.securityCheck")} *
        </label>
        <ContactCaptchaField
          variant="stacked"
          captcha={captcha}
          inputId={`${formId}-captcha`}
          helpId={`${formId}-captcha-help`}
          describedBy={errors.captcha_response ? `${formId}-captcha-error` : undefined}
          value={captchaResponse}
          invalid={!!errors.captcha_response}
          onValueChange={setCaptchaResponse}
          onBlur={() => undefined}
        />
        {errors.captcha_response ? (
          <p id={`${formId}-captcha-error`} className="mt-1 text-xs text-red-700" role="alert">
            {errors.captcha_response}
          </p>
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
