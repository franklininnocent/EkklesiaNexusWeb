"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { FormEvent, useCallback, useEffect, useId, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextArea, TextInput } from "@/components/ui/input";
import { MockupContainer, SectionHeading } from "@/components/mockup/container";
import { mockupContact } from "@/data/mockup-page";
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
  alignTop?: boolean;
  children: ReactNode;
};

function ContactFieldRow({ label, labelFor, error, alignTop, children }: ContactFieldRowProps) {
  const hasError = Boolean(error);
  return (
    <div
      className={`flex flex-col gap-1.5 border-b py-3 transition-colors duration-200 sm:flex-row sm:gap-4 ${
        hasError ? "border-rose-200/80" : "border-slate-100"
      } ${alignTop ? "sm:items-start" : "sm:items-center"}`}
    >
      <label
        htmlFor={labelFor}
        className={`text-sm sm:w-28 sm:shrink-0 ${hasError ? "text-rose-800/90" : "text-slate-500"} ${alignTop ? "sm:pt-2" : ""}`}
      >
        {label}
      </label>
      <div className="min-w-0 flex-1">{children}</div>
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
  const formInstanceId = useId();
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactFormField, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(
    "Thank you for contacting EkklesiaNexus. Your enquiry has been received successfully, and our team will be in touch.",
  );
  const [captchaId, setCaptchaId] = useState<string | null>(null);
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const [captchaError, setCaptchaError] = useState<string | null>(null);

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

  const loadCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    setCaptchaError(null);
    try {
      const res = await fetch("/api/contact-captcha", { cache: "no-store" });
      const json = (await res.json()) as {
        success?: boolean;
        message?: string;
        data?: { challenge_id: string; image: string };
      };
      if (!res.ok || !json.success || !json.data) {
        setCaptchaId(null);
        setCaptchaImage(null);
        setCaptchaError(json.message ?? "Unable to load the security check.");
        return;
      }
      setCaptchaId(json.data.challenge_id);
      setCaptchaImage(json.data.image);
      setValues((prev) => ({ ...prev, captcha_response: "" }));
    } catch {
      setCaptchaError("Unable to load the security check.");
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialCaptcha() {
      try {
        const res = await fetch("/api/contact-captcha", { cache: "no-store" });
        const json = (await res.json()) as {
          success?: boolean;
          message?: string;
          data?: { challenge_id: string; image: string };
        };
        if (cancelled) return;
        if (!res.ok || !json.success || !json.data) {
          setCaptchaId(null);
          setCaptchaImage(null);
          setCaptchaError(json.message ?? "Unable to load the security check.");
          return;
        }
        setCaptchaId(json.data.challenge_id);
        setCaptchaImage(json.data.image);
      } catch {
        if (!cancelled) setCaptchaError("Unable to load the security check.");
      } finally {
        if (!cancelled) setCaptchaLoading(false);
      }
    }

    void loadInitialCaptcha();
    return () => {
      cancelled = true;
    };
  }, []);

  const shouldShowError = useCallback(
    (field: ContactFormField) => {
      const message = errors[field];
      if (!message) return false;
      return Boolean(touched[field] || submitAttempted);
    },
    [errors, touched, submitAttempted],
  );

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "organisation") return next;
      const contactField = field as ContactFormField;
      if (touched[contactField] || submitAttempted) {
        const fieldError = validateContactField(contactField, next);
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
      const fieldError = validateContactField(field, next);
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
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, message: true, captcha_response: true });
    if (contactFormHasErrors(nextErrors) || !captchaId) {
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
    try {
      const res = await fetch("/api/contact-enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          organisation: values.organisation,
          message: values.message,
          captcha_challenge_id: captchaId,
          captcha_response: values.captcha_response,
          website: "",
        }),
      });
      const json = (await res.json()) as {
        success?: boolean;
        message?: string;
        errors?: Record<string, string>;
      };
      if (res.ok && json.success) {
        setSuccessMessage(
          json.message ??
            "Thank you for contacting EkklesiaNexus. Your enquiry has been received successfully, and our team will be in touch.",
        );
        setSent(true);
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
      setFormError(json.message ?? "We couldn't send your message right now. Please try again.");
      void loadCaptcha();
    } catch {
      setFormError("We couldn't send your message right now. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20">
      <MockupContainer>
        <SectionHeading title={mockupContact.title} subtitle={mockupContact.subtitle} />
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
                className="space-y-0"
                noValidate
                aria-label="Contact form"
              >
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor={`${formInstanceId}-website`}>Website</label>
                  <input id={`${formInstanceId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <ContactFieldRow
                  label="Name"
                  labelFor={fieldIds.name}
                  error={shouldShowError("name") ? errors.name : undefined}
                >
                  <TextInput
                    id={fieldIds.name}
                    name="name"
                    autoComplete="name"
                    placeholder=""
                    value={values.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    onBlur={(e) => blurField("name", e.target.value)}
                    aria-invalid={shouldShowError("name")}
                    aria-describedby={shouldShowError("name") ? errorIds.name : undefined}
                  />
                  <AnimatePresence initial={false}>
                    {shouldShowError("name") && errors.name ? (
                      <FieldError key="name-error" id={errorIds.name} message={errors.name} />
                    ) : null}
                  </AnimatePresence>
                </ContactFieldRow>

                <ContactFieldRow
                  label="Email"
                  labelFor={fieldIds.email}
                  error={shouldShowError("email") ? errors.email : undefined}
                >
                  <TextInput
                    id={fieldIds.email}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={values.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    onBlur={(e) => blurField("email", e.target.value)}
                    aria-invalid={shouldShowError("email")}
                    aria-describedby={shouldShowError("email") ? errorIds.email : undefined}
                  />
                  <AnimatePresence initial={false}>
                    {shouldShowError("email") && errors.email ? (
                      <FieldError key="email-error" id={errorIds.email} message={errors.email} />
                    ) : null}
                  </AnimatePresence>
                </ContactFieldRow>

                <ContactFieldRow
                  label="Phone"
                  labelFor={fieldIds.phone}
                  error={shouldShowError("phone") ? errors.phone : undefined}
                >
                  <TextInput
                    id={fieldIds.phone}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder=""
                    value={values.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    onBlur={(e) => blurField("phone", e.target.value)}
                    aria-invalid={shouldShowError("phone")}
                    aria-describedby={shouldShowError("phone") ? errorIds.phone : undefined}
                  />
                  <AnimatePresence initial={false}>
                    {shouldShowError("phone") && errors.phone ? (
                      <FieldError key="phone-error" id={errorIds.phone} message={errors.phone} />
                    ) : null}
                  </AnimatePresence>
                </ContactFieldRow>

                <ContactFieldRow label="Organisation" labelFor={fieldIds.organisation}>
                  <TextInput
                    id={fieldIds.organisation}
                    name="organisation"
                    autoComplete="organization"
                    value={values.organisation}
                    onChange={(e) => updateField("organisation", e.target.value)}
                  />
                </ContactFieldRow>

                <ContactFieldRow
                  label="Message"
                  labelFor={fieldIds.message}
                  error={shouldShowError("message") ? errors.message : undefined}
                  alignTop
                >
                  <TextArea
                    id={fieldIds.message}
                    name="message"
                    value={values.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    onBlur={(e) => blurField("message", e.target.value)}
                    aria-invalid={shouldShowError("message")}
                    aria-describedby={shouldShowError("message") ? errorIds.message : undefined}
                  />
                  <AnimatePresence initial={false}>
                    {shouldShowError("message") && errors.message ? (
                      <FieldError key="message-error" id={errorIds.message} message={errors.message} />
                    ) : null}
                  </AnimatePresence>
                </ContactFieldRow>

                <ContactFieldRow
                  label="Security check"
                  labelFor={fieldIds.captcha}
                  error={shouldShowError("captcha_response") ? errors.captcha_response : undefined}
                  alignTop
                >
                  <div className="min-h-[104px]">
                    <div className="flex min-w-0 flex-wrap items-start gap-3">
                      <div className="flex h-16 w-full max-w-[220px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                        {captchaLoading ? (
                          <span className="text-xs text-slate-500">Loading check…</span>
                        ) : captchaImage ? (
                          // Dynamic data-URI challenge; Next/Image is not used for ephemeral captcha bytes.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={captchaImage}
                            alt=""
                            width={220}
                            height={64}
                            className="h-16 w-full max-w-[220px] object-contain"
                          />
                        ) : (
                          <span className="px-2 text-center text-xs text-rose-700">
                            {captchaError ?? "Unavailable"}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="inline-flex h-11 min-h-11 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => void loadCaptcha()}
                        aria-label="Refresh security check"
                      >
                        <RefreshCw className="h-4 w-4" aria-hidden="true" />
                        Refresh
                      </button>
                    </div>
                    <TextInput
                      id={fieldIds.captcha}
                      name="captcha_response"
                      autoComplete="off"
                      spellCheck={false}
                      className="mt-2"
                      aria-describedby={`${formInstanceId}-captcha-help ${shouldShowError("captcha_response") ? errorIds.captcha_response : ""}`.trim()}
                      aria-invalid={shouldShowError("captcha_response")}
                      value={values.captcha_response}
                      onChange={(e) => updateField("captcha_response", e.target.value)}
                      onBlur={(e) => blurField("captcha_response", e.target.value)}
                    />
                    <p id={`${formInstanceId}-captcha-help`} className="mt-1 text-[12px] text-slate-500">
                      Enter the characters shown. Letters are case-insensitive.
                    </p>
                    <AnimatePresence initial={false}>
                      {shouldShowError("captcha_response") && errors.captcha_response ? (
                        <FieldError
                          key="captcha-error"
                          id={errorIds.captcha_response}
                          message={errors.captcha_response}
                        />
                      ) : null}
                    </AnimatePresence>
                  </div>
                </ContactFieldRow>

                {formError ? (
                  <p className="mt-3 text-sm text-rose-700" role="alert">
                    {formError}
                  </p>
                ) : null}

                <Button type="submit" className="mt-4 w-full rounded-xl py-3" disabled={submitting}>
                  {submitting ? "Sending…" : "Send Message"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </MockupContainer>
    </section>
  );
}
