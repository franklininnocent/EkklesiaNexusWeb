"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertCircle } from "lucide-react";
import { FormEvent, useCallback, useId, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextArea, TextInput } from "@/components/ui/input";
import { MockupContainer, SectionHeading } from "@/components/mockup/container";
import { ContactCaptchaField } from "@/components/contact/contact-captcha-field";
import { useContactCaptcha } from "@/hooks/use-contact-captcha";
import { X_EN_LOCALE_HEADER } from "@/lib/i18n/constants";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { trackEvent } from "@/lib/analytics";
import {
  type ContactFormErrors,
  type ContactFormField,
  type ContactFormValues,
  contactFormHasErrors,
  validateContactField,
  validateContactForm,
} from "@/lib/contact-form-validation";

type FieldErrorProps = {
  id: string;
  message: string;
};

function FieldError({ id, message }: FieldErrorProps) {
  return (
    <motion.p
      id={id}
      role="alert"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -2 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="motion-reduce:transition-none"
    >
      <span className="mt-1.5 flex items-start gap-1.5 text-[12px] leading-snug text-rose-700">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
        <span>{message}</span>
      </span>
    </motion.p>
  );
}

type ContactFieldRowProps = {
  label: string;
  labelFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

function ContactFieldRow({ label, labelFor, error, required, children }: ContactFieldRowProps) {
  const hasError = Boolean(error);
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label
        htmlFor={labelFor}
        className={`text-sm font-medium leading-5 ${hasError ? "text-rose-800" : "text-brand-navy"}`}
      >
        {label}
        {required ? (
          <span className="ml-0.5 text-rose-600" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  organisation: "",
  message: "",
  captcha_response: "",
};

const VALIDATED_CONTACT_FIELDS: ContactFormField[] = [
  "name",
  "email",
  "phone",
  "message",
  "captcha_response",
];

export function MockupContact() {
  const { locale, t } = useI18n();
  const formInstanceId = useId();
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactFormField, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(() => t("forms.contact.successDefault"));
  const captcha = useContactCaptcha(() => {
    setValues((prev) => ({ ...prev, captcha_response: "" }));
  });
  const { captchaId, loadCaptcha } = captcha;

  const displayErrors = useMemo(
    () => (contactFormHasErrors(errors) ? validateContactForm(values, locale) : errors),
    [errors, values, locale],
  );

  const fieldIds = {
    name: `${formInstanceId}-name`,
    email: `${formInstanceId}-email`,
    phone: `${formInstanceId}-phone`,
    organisation: `${formInstanceId}-organisation`,
    message: `${formInstanceId}-message`,
    captcha: `${formInstanceId}-captcha`,
  };

  const errorIds = {
    name: `${formInstanceId}-name-error`,
    email: `${formInstanceId}-email-error`,
    phone: `${formInstanceId}-phone-error`,
    message: `${formInstanceId}-message-error`,
    captcha_response: `${formInstanceId}-captcha-error`,
  };

  const shouldShowError = useCallback(
    (field: ContactFormField) => {
      const message = displayErrors[field];
      if (!message) return false;
      return Boolean(touched[field] || submitAttempted);
    },
    [displayErrors, touched, submitAttempted],
  );

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "organisation") return next;
      const contactField = field as ContactFormField;
      if (touched[contactField] || submitAttempted) {
        const fieldError = validateContactField(contactField, next, locale);
        setErrors((prevErrors) => {
          const nextErrors = { ...prevErrors };
          if (fieldError) nextErrors[contactField] = fieldError;
          else delete nextErrors[contactField];
          return nextErrors;
        });
      }
      return next;
    });
  };

  const blurField = (field: ContactFormField, fieldValue: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setValues((prev) => {
      const next = { ...prev, [field]: fieldValue };
      const fieldError = validateContactField(field, next, locale);
      setErrors((prevErrors) => {
        const nextErrors = { ...prevErrors };
        if (fieldError) nextErrors[field] = fieldError;
        else delete nextErrors[field];
        return nextErrors;
      });
      return next;
    });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitAttempted(true);
    setFormError(null);
    const nextErrors = validateContactForm(values, locale);
    if (!captchaId) {
      nextErrors.captcha_response = t("forms.contact.validation.captchaIncomplete");
    }
    setTouched({ name: true, email: true, phone: true, message: true, captcha_response: true });
    if (contactFormHasErrors(nextErrors)) {
      setErrors(nextErrors);
      const firstInvalid = VALIDATED_CONTACT_FIELDS.find((f) => nextErrors[f]);
      if (firstInvalid) {
        const id = firstInvalid === "captcha_response" ? fieldIds.captcha : fieldIds[firstInvalid];
        requestAnimationFrame(() => {
          document.getElementById(id)?.focus();
        });
      }
      return;
    }

    setSubmitting(true);
    const websiteHoneypot = String(new FormData(e.currentTarget).get("website") ?? "");
    try {
      const res = await fetch("/api/contact-enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json", [X_EN_LOCALE_HEADER]: locale },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          organisation: values.organisation,
          message: values.message,
          captcha_challenge_id: captchaId,
          captcha_response: values.captcha_response,
          website: websiteHoneypot,
        }),
      });
      const json = (await res.json()) as {
        success?: boolean;
        message?: string;
        errors?: Record<string, string>;
      };
      if (res.ok && json.success) {
        setSuccessMessage(json.message ?? t("forms.contact.successDefault"));
        setSent(true);
        trackEvent("contact_form_submit");
        return;
      }
      if (json.errors) {
        const mapped: ContactFormErrors = {};
        (Object.keys(json.errors) as string[]).forEach((key) => {
          if (key === "name" || key === "email" || key === "phone" || key === "message" || key === "captcha_response") {
            mapped[key] = json.errors![key];
          }
        });
        setErrors((prev) => ({ ...prev, ...mapped }));
      }
      setFormError(json.message ?? t("forms.contact.submitFailed"));
      void loadCaptcha();
    } catch {
      setFormError(t("forms.contact.submitFailedShort"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20">
      <MockupContainer>
        <SectionHeading title={t("home.contact.title")} subtitle={t("home.contact.subtitle")} />
        <div className="mx-auto max-w-2xl">
          <Card className="rounded-[1.6rem] p-6 sm:p-8">
            {sent ? (
              <p className="py-10 text-center text-sm font-medium text-slate-600" role="status" aria-live="polite">
                {successMessage}
              </p>
            ) : (
              <form
                method="post"
                action="#contact"
                onSubmit={onSubmit}
                className="flex flex-col gap-4"
                noValidate
                aria-label={t("a11y.contactForm")}
              >
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor={`${formInstanceId}-website`}>{t("forms.contact.labels.websiteHoneypot")}</label>
                  <input id={`${formInstanceId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <ContactFieldRow
                  label={t("forms.contact.labels.name")}
                  labelFor={fieldIds.name}
                  required
                  error={shouldShowError("name") ? displayErrors.name : undefined}
                >
                  <TextInput
                    id={fieldIds.name}
                    name="name"
                    autoComplete="name"
                    placeholder=""
                    required
                    aria-required="true"
                    value={values.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    onBlur={(e) => blurField("name", e.target.value)}
                    aria-invalid={shouldShowError("name")}
                    aria-describedby={shouldShowError("name") ? errorIds.name : undefined}
                  />
                  <AnimatePresence initial={false}>
                    {shouldShowError("name") && displayErrors.name ? (
                      <FieldError key="name-error" id={errorIds.name} message={displayErrors.name} />
                    ) : null}
                  </AnimatePresence>
                </ContactFieldRow>

                <ContactFieldRow
                  label={t("forms.contact.labels.email")}
                  labelFor={fieldIds.email}
                  required
                  error={shouldShowError("email") ? displayErrors.email : undefined}
                >
                  <TextInput
                    id={fieldIds.email}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    aria-required="true"
                    value={values.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    onBlur={(e) => blurField("email", e.target.value)}
                    aria-invalid={shouldShowError("email")}
                    aria-describedby={shouldShowError("email") ? errorIds.email : undefined}
                  />
                  <AnimatePresence initial={false}>
                    {shouldShowError("email") && displayErrors.email ? (
                      <FieldError key="email-error" id={errorIds.email} message={displayErrors.email} />
                    ) : null}
                  </AnimatePresence>
                </ContactFieldRow>

                <ContactFieldRow
                  label={t("forms.contact.labels.phone")}
                  labelFor={fieldIds.phone}
                  required
                  error={shouldShowError("phone") ? displayErrors.phone : undefined}
                >
                  <TextInput
                    id={fieldIds.phone}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder=""
                    required
                    aria-required="true"
                    value={values.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    onBlur={(e) => blurField("phone", e.target.value)}
                    aria-invalid={shouldShowError("phone")}
                    aria-describedby={shouldShowError("phone") ? errorIds.phone : undefined}
                  />
                  <AnimatePresence initial={false}>
                    {shouldShowError("phone") && displayErrors.phone ? (
                      <FieldError key="phone-error" id={errorIds.phone} message={displayErrors.phone} />
                    ) : null}
                  </AnimatePresence>
                </ContactFieldRow>

                <ContactFieldRow label={t("forms.contact.labels.organisation")} labelFor={fieldIds.organisation}>
                  <TextInput
                    id={fieldIds.organisation}
                    name="organisation"
                    autoComplete="organization"
                    value={values.organisation}
                    onChange={(e) => updateField("organisation", e.target.value)}
                  />
                </ContactFieldRow>

                <ContactFieldRow
                  label={t("forms.contact.labels.message")}
                  labelFor={fieldIds.message}
                  required
                  error={shouldShowError("message") ? displayErrors.message : undefined}
                >
                  <TextArea
                    id={fieldIds.message}
                    name="message"
                    rows={4}
                    required
                    aria-required="true"
                    value={values.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    onBlur={(e) => blurField("message", e.target.value)}
                    aria-invalid={shouldShowError("message")}
                    aria-describedby={shouldShowError("message") ? errorIds.message : undefined}
                  />
                  <AnimatePresence initial={false}>
                    {shouldShowError("message") && displayErrors.message ? (
                      <FieldError key="message-error" id={errorIds.message} message={displayErrors.message} />
                    ) : null}
                  </AnimatePresence>
                </ContactFieldRow>

                <ContactFieldRow
                  label={t("forms.contact.labels.securityCheck")}
                  labelFor={fieldIds.captcha}
                  required
                  error={shouldShowError("captcha_response") ? displayErrors.captcha_response : undefined}
                >
                  <ContactCaptchaField
                    captcha={captcha}
                    inputId={fieldIds.captcha}
                    helpId={`${formInstanceId}-captcha-help`}
                    describedBy={shouldShowError("captcha_response") ? errorIds.captcha_response : undefined}
                    value={values.captcha_response}
                    invalid={shouldShowError("captcha_response")}
                    onValueChange={(v) => updateField("captcha_response", v)}
                    onBlur={() => blurField("captcha_response", values.captcha_response)}
                  />
                  <AnimatePresence initial={false}>
                    {shouldShowError("captcha_response") && displayErrors.captcha_response ? (
                      <FieldError
                        key="captcha-error"
                        id={errorIds.captcha_response}
                        message={displayErrors.captcha_response}
                      />
                    ) : null}
                  </AnimatePresence>
                </ContactFieldRow>

                {formError ? (
                  <p
                    className="rounded-[var(--radius-md)] border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm leading-5 text-rose-800"
                    role="alert"
                  >
                    {formError}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  className="mt-1 w-full py-3 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? t("common.actions.sending") : t("common.actions.sendMessage")}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </MockupContainer>
    </section>
  );
}
