import Link from "next/link";
import type { CtaLink } from "@/types/marketing";

const variants: Record<NonNullable<CtaLink["variant"]>, string> = {
  primary:
    "bg-brand-blue text-white hover:bg-[var(--brand-blue-hover)] border border-transparent shadow-sm",
  secondary:
    "bg-white text-brand-navy border border-[var(--border-subtle)] hover:border-brand-blue/30 hover:text-brand-blue",
  ghost: "bg-transparent text-brand-navy hover:text-brand-blue border border-transparent",
};

const onDarkVariants: Partial<Record<NonNullable<CtaLink["variant"]>, string>> = {
  primary: "bg-white text-brand-navy hover:bg-slate-100 border border-transparent shadow-sm",
  secondary:
    "bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white/60",
  ghost: "text-white hover:text-slate-200 border border-transparent",
};

type ButtonLinkProps = CtaLink & {
  onDark?: boolean;
  onClick?: () => void;
};

export function ButtonLink({
  label,
  href,
  variant = "primary",
  onDark = false,
  onClick,
}: ButtonLinkProps) {
  const isExternal = href.startsWith("http");
  const style = onDark ? (onDarkVariants[variant] ?? variants[variant]) : variants[variant];
  const className = `inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] px-5 py-2.5 text-sm font-semibold transition-colors ${style}`;

  if (isExternal) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {label}
    </Link>
  );
}
