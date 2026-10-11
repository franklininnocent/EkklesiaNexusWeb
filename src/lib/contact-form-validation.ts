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

/** E.164-style: leading +, then 8–15 digits (country code + subscriber number). */
function validatePhoneWithCountryCode(phone: string): string | undefined {
  const trimmed = phone.trim();
  if (!trimmed) return "Please enter your phone number.";
  if (!trimmed.startsWith("+")) {
    return "Include your country code, starting with + (e.g. +91).";
  }
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) {
    return "Enter a valid phone number with country code.";
  }
  return undefined;
}

export function validateContactField(
  field: ContactFormField,
  values: ContactFormValues,
): string | undefined {
  switch (field) {
    case "name": {
      if (!values.name.trim()) return "Please enter your name.";
      return undefined;
    }
    case "email": {
      const trimmed = values.email.trim();
      if (!trimmed) return "Please enter your email address.";
      if (!EMAIL_PATTERN.test(trimmed)) return "Enter a valid email address.";
      return undefined;
    }
    case "phone":
      return validatePhoneWithCountryCode(values.phone);
    case "message": {
      if (!values.message.trim()) return "Please enter your message.";
      return undefined;
    }
    case "captcha_response": {
      if (!values.captcha_response.trim()) return "Please enter the security check characters.";
      return undefined;
    }
    default:
      return undefined;
  }
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const fields: ContactFormField[] = ["name", "email", "phone", "message", "captcha_response"];
  const errors: ContactFormErrors = {};
  for (const field of fields) {
    const message = validateContactField(field, values);
    if (message) errors[field] = message;
  }
  return errors;
}

export function contactFormHasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
