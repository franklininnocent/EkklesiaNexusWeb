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

  const imageReady = Boolean(captchaImage) || captchaLoading;
  const imageRegion = (
    <div
      className={
        variant === "mockup"
          ? imageReady
            ? "flex h-16 w-full max-w-[220px] shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-md)] border border-slate-300 bg-slate-50"
            : "flex min-h-16 w-full items-center justify-center rounded-[var(--radius-md)] border border-rose-200 bg-rose-50 px-3 py-2.5"
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
        <div className="px-2.5 text-center text-xs leading-snug break-words text-rose-700" role="alert">
          <p>{captchaError ?? t("common.states.unavailable")}</p>
          {captchaError ? (
            <button
              type="button"
              className="mt-1 inline-flex min-h-11 items-center font-medium text-slate-700 underline underline-offset-2"
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
          ? "inline-flex h-11 min-h-11 shrink-0 items-center gap-1.5 rounded-[var(--radius-md)] border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 transition-colors duration-150 hover:border-slate-400 hover:bg-slate-50"
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
    <div>
      <div
        className={
          variant === "mockup"
            ? "flex min-w-0 flex-wrap items-center gap-2.5"
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
        boxed={variant === "mockup"}
        required={variant === "mockup"}
        aria-required={variant === "mockup" ? true : undefined}
        className={variant === "mockup" ? "mt-2.5" : fieldClassStacked}
        aria-describedby={[helpId, describedBy].filter(Boolean).join(" ") || undefined}
        aria-invalid={invalid}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onBlur={onBlur}
      />
      <p id={helpId} className={variant === "mockup" ? "mt-1.5 text-xs leading-5 text-slate-500" : "mt-1 text-[12px] text-slate-500"}>
        {t("forms.contact.captchaHelp")}
      </p>
    </div>
  );
}

const fieldClassStacked = "mt-2 w-full rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white px-3 py-2.5 text-sm";
