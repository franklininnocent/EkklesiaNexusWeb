import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldBase =
  "w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-[box-shadow,background-color] duration-200 ease-out";

const fieldInvalid =
  "rounded-lg px-2.5 py-1.5 -mx-0.5 bg-rose-50/50 ring-1 ring-inset ring-rose-300/80 focus:ring-2 focus:ring-rose-400/25";

function isAriaInvalid(invalid?: boolean | "true" | "false" | "grammar" | "spelling"): boolean {
  return invalid === true || invalid === "true";
}

function mergeFieldClass(invalid?: boolean | "true" | "false" | "grammar" | "spelling", className?: string) {
  const parts = [fieldBase, isAriaInvalid(invalid) ? fieldInvalid : "", className ?? ""];
  return parts.filter(Boolean).join(" ");
}

export function TextInput({ className, "aria-invalid": ariaInvalid, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={mergeFieldClass(ariaInvalid, className)} aria-invalid={ariaInvalid} {...props} />;
}

export function TextArea({
  className,
  "aria-invalid": ariaInvalid,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`${mergeFieldClass(ariaInvalid, className)} min-h-[88px] resize-none`}
      aria-invalid={ariaInvalid}
      {...props}
    />
  );
}
