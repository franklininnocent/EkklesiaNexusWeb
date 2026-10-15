"use client";

import { RefreshCw } from "lucide-react";
import { TextInput } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n/i18n-provider";
import type { ContactCaptchaState } from "@/hooks/use-contact-captcha";

type ContactCaptchaFieldProps = {
  captcha: ContactCaptchaState;
  inputId: string;
  helpId: string;
  describedBy?: string;
  value: string;
  invalid?: boolean;
  onValueChange: (value: string) => void;
  onBlur: () => void;
  /** Compact layout for legacy demo form */
  variant?: "mockup" | "stacked";
};

export function ContactCaptchaField({
  captcha,
  inputId,
  helpId,
  describedBy,
  value,
  invalid,
  onValueChange,
  onBlur,
  variant = "mockup",
}: ContactCaptchaFieldProps) {
  const { t } = useI18n();
  const { captchaImage, captchaLoading, captchaError, loadCaptcha } = captcha;

  const imageRegion = (
    <div
      className={
        variant === "mockup"
          ? "flex h-16 w-full max-w-[220px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
          : "flex h-16 min-w-[220px] flex-1 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-slate-50"
      }
    >
      {captchaLoading ? (
        <span className="text-xs text-slate-500" role="status" aria-live="polite">
          {t("common.states.loadingCheck")}
        </span>
      ) : captchaImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={captchaImage}
          alt={t("forms.contact.captcha.imageAlt")}
          width={220}
          height={64}
          className="h-16 w-full max-w-[220px] object-contain"
        />
      ) : (
        <div className="px-2 text-center text-xs text-rose-700" role="alert">
          <p>{captchaError ?? t("common.states.unavailable")}</p>
          {captchaError ? (
            <button
              type="button"
              className="mt-2 font-medium text-slate-700 underline underline-offset-2"
              onClick={() => void loadCaptcha()}
            >
              {t("common.actions.tryAgain")}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );

  const refreshButton = (
    <button
      type="button"
      className={
        variant === "mockup"
          ? "inline-flex h-11 min-h-11 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 hover:bg-slate-50"
          : "rounded-[var(--radius-md)] border border-[var(--border-subtle)] px-3 py-2 text-sm"
      }
      onClick={() => void loadCaptcha()}
      aria-label={t("a11y.refreshCaptcha")}
    >
      <RefreshCw className="h-4 w-4" aria-hidden="true" />
      {t("common.actions.refresh")}
    </button>
  );

  return (
    <div className={variant === "mockup" ? "min-h-[104px]" : undefined}>
      <div
        className={
          variant === "mockup"
            ? "flex min-w-0 flex-wrap items-start gap-3"
            : "mt-1 flex flex-wrap items-center gap-2"
        }
      >
        {imageRegion}
        {refreshButton}
      </div>
      <TextInput
        id={inputId}
        name="captcha_response"
        autoComplete="off"
        spellCheck={false}
        placeholder={t("forms.contact.captcha.placeholder")}
        className={variant === "mockup" ? "mt-2" : fieldClassStacked}
        aria-describedby={[helpId, describedBy].filter(Boolean).join(" ") || undefined}
        aria-invalid={invalid}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onBlur={onBlur}
      />
      <p id={helpId} className="mt-1 text-[12px] text-slate-500">
        {t("forms.contact.captchaHelp")}
      </p>
    </div>
  );
}

const fieldClassStacked = "mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white px-3 py-2.5 text-sm";
