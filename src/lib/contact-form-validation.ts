import type { AppLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";

export type ContactFormField = "name" | "email" | "phone" | "message" | "captcha_response";

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  message: string;
  captcha_response: string;
};

export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function messagesFor(locale: AppLocale) {
  return createTranslator(getMessages(locale));
}

function validatePhoneWithCountryCode(phone: string, t: ReturnType<typeof createTranslator>): string | undefined {
  const trimmed = phone.trim();
  if (!trimmed) return t("forms.contact.validation.phoneRequired");
  if (!trimmed.startsWith("+")) {
    return t("forms.contact.validation.phoneCountryCode");
  }
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) {
    return t("forms.contact.validation.phoneInvalid");
  }
  return undefined;
}

export function validateContactField(
  field: ContactFormField,
  values: ContactFormValues,
  locale: AppLocale = "en-US",
): string | undefined {
  const t = messagesFor(locale);
  switch (field) {
    case "name": {
      if (!values.name.trim()) return t("forms.contact.validation.nameRequired");
      return undefined;
    }
    case "email": {
      const trimmed = values.email.trim();
      if (!trimmed) return t("forms.contact.validation.emailRequired");
      if (!EMAIL_PATTERN.test(trimmed)) return t("forms.contact.validation.emailInvalid");
      return undefined;
    }
    case "phone":
      return validatePhoneWithCountryCode(values.phone, t);
    case "message": {
      if (!values.message.trim()) return t("forms.contact.validation.messageRequired");
      return undefined;
    }
    case "captcha_response": {
      if (!values.captcha_response.trim()) return t("forms.contact.validation.captchaRequired");
      return undefined;
    }
    default:
      return undefined;
  }
}

export function validateContactForm(values: ContactFormValues, locale: AppLocale = "en-US"): ContactFormErrors {
  const fields: ContactFormField[] = ["name", "email", "phone", "message", "captcha_response"];
  const errors: ContactFormErrors = {};
  for (const field of fields) {
    const message = validateContactField(field, values, locale);
    if (message) errors[field] = message;
  }
  return errors;
}

export function contactFormHasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
