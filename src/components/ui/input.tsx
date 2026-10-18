import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BoxedFieldProps = {
  /** When false, the caller supplies the full className (legacy demo-form CAPTCHA). */
  boxed?: boolean;
};

function fieldClass(kind: "input" | "textarea", className?: string) {
  return ["en-field", kind === "input" ? "en-field--input" : "en-field--textarea", className ?? ""]
    .filter(Boolean)
    .join(" ");
}

export function TextInput({
  className,
  boxed = true,
  "aria-invalid": ariaInvalid,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & BoxedFieldProps) {
  return (
    <input
      className={boxed ? fieldClass("input", className) : className}
      aria-invalid={ariaInvalid}
      {...props}
    />
  );
}

export function TextArea({
  className,
  "aria-invalid": ariaInvalid,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea className={fieldClass("textarea", className)} aria-invalid={ariaInvalid} {...props} />
  );
}
