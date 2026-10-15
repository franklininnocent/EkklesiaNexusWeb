import assert from "node:assert/strict";
import {
  contactFormHasErrors,
  validateContactField,
  validateContactForm,
} from "./contact-form-validation";

const empty: Parameters<typeof validateContactForm>[0] = {
  name: "",
  email: "",
  phone: "",
  organisation: "",
  message: "",
  captcha_response: "",
};

assert.equal(validateContactField("name", { ...empty, name: "" }), "Please enter your name.");
assert.equal(validateContactField("name", { ...empty, name: "A" }), undefined);
assert.equal(validateContactField("name", { ...empty, name: "Jane Doe" }), undefined);

assert.equal(validateContactField("email", { ...empty, email: "" }), "Please enter your email address.");
assert.equal(validateContactField("email", { ...empty, email: "not-an-email" }), "Enter a valid email address.");
assert.equal(validateContactField("email", { ...empty, email: "user@example.com" }), undefined);

assert.equal(validateContactField("phone", { ...empty, phone: "" }), "Please enter your phone number.");
assert.equal(
  validateContactField("phone", { ...empty, phone: "9442466036" }),
  "Include your country code, starting with + (e.g. +91).",
);
assert.equal(validateContactField("phone", { ...empty, phone: "+123" }), "Enter a valid phone number with country code.");
assert.equal(validateContactField("phone", { ...empty, phone: "+91 94424 66036" }), undefined);

assert.equal(validateContactField("message", { ...empty, message: "" }), "Please enter your message.");
assert.equal(validateContactField("message", { ...empty, message: "Hi" }), undefined);

const allErrors = validateContactForm(empty);
assert.equal(contactFormHasErrors(allErrors), true);
assert.equal(allErrors.name, "Please enter your name.");
assert.equal(allErrors.email, "Please enter your email address.");
assert.equal(allErrors.phone, "Please enter your phone number.");
assert.equal(allErrors.message, "Please enter your message.");
assert.equal(allErrors.captcha_response, "Please enter the security check characters.");

const ptCaptcha = validateContactField("captcha_response", empty, "pt-BR");
assert.equal(ptCaptcha, "Digite os caracteres da verificação de segurança.");

const valid = validateContactForm({
  name: "Jane Doe",
  email: "jane@parish.org",
  phone: "+91 9442466036",
  organisation: "St. Mary's",
  message: "We would like to learn more about EkklesiaNexus.",
  captcha_response: "AB3DK",
});
assert.equal(contactFormHasErrors(valid), false);

console.log("contact-form-validation.test.ts passed");
