import type { AppLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";

const KNOWN_LARAVEL_MESSAGES: Record<string, string> = {
  "The contact form is temporarily unavailable.": "forms.bff.contactUnavailable",
  "The security check was incorrect or has expired. Please try again.": "forms.bff.captchaIncorrect",
  "Thank you for contacting EkklesiaNexus. Your enquiry has been received successfully, and our team will be in touch.":
    "forms.contact.successDefault",
  "Your demo request has been received.": "forms.bff.demoSuccess",
  "Thank you. Your demo request has been received.": "forms.demo.successDefault",
  "Please wait a moment and try again.": "forms.bff.rateLimited",
  "Include your country code, starting with +.": "forms.contact.validation.phoneCountryCode",
  "Unable to submit.": "forms.contact.validation.honeypot",
  "Please complete the security check.": "forms.contact.validation.captchaIncomplete",
  "Please enter the security check characters.": "forms.contact.validation.captchaRequired",
};

const FIELD_ERROR_KEYS: Record<string, string> = {
  name: "forms.contact.validation.nameRequired",
  email: "forms.contact.validation.emailRequired",
  phone: "forms.contact.validation.phoneRequired",
  message: "forms.contact.validation.messageRequired",
  captcha_response: "forms.contact.validation.captchaRequired",
};

const DEMO_FIELD_ERROR_KEYS: Record<string, string> = {
  name: "forms.demo.validation.nameRequired",
  church_parish: "forms.demo.validation.churchParishRequired",
  country: "forms.demo.validation.countryRequired",
  email: "forms.demo.validation.emailRequired",
  role: "forms.demo.validation.roleRequired",
  message: "forms.demo.validation.messageRequired",
  captcha_response: "forms.demo.validation.captchaIncomplete",
  company_website: "forms.demo.validation.honeypot",
};

export function resolveBffLocale(headerValue: string | null): AppLocale {
  const trimmed = headerValue?.trim();
  return trimmed === "pt-BR" ? "pt-BR" : "en-US";
}

export function localizeBffMessage(locale: AppLocale, message: string | undefined, fallbackKey: string): string {
  const t = createTranslator(getMessages(locale));
  if (!message?.trim()) {
    return t(fallbackKey);
  }
  const key = KNOWN_LARAVEL_MESSAGES[message.trim()];
  if (key) {
    return t(key);
  }
  return t(fallbackKey);
}

export function localizeFieldError(locale: AppLocale, field: string, serverMessage?: string): string {
  const t = createTranslator(getMessages(locale));
  if (serverMessage?.trim()) {
    const known = KNOWN_LARAVEL_MESSAGES[serverMessage.trim()];
    if (known) return t(known);
  }
  const key = FIELD_ERROR_KEYS[field];
  return key ? t(key) : t("forms.contact.validation.checkField");
}

export function localizeDemoFieldError(locale: AppLocale, field: string, serverMessage?: string): string {
  const t = createTranslator(getMessages(locale));
  if (serverMessage?.trim()) {
    const known = KNOWN_LARAVEL_MESSAGES[serverMessage.trim()];
    if (known) return t(known);
    if (field === "email" && serverMessage.includes("valid email")) {
      return t("forms.demo.validation.emailInvalid");
    }
  }
  const key = DEMO_FIELD_ERROR_KEYS[field];
  return key ? t(key) : t("forms.demo.validation.checkField");
}
