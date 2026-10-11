"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { handleAnchorNav } from "@/lib/section-navigation";

const variants = {
  primary:
    "bg-brand-blue text-white shadow-lg shadow-blue-600/25 hover:bg-[var(--brand-blue-hover)]",
  pill: "bg-brand-blue text-white rounded-full px-5 py-2 shadow-md shadow-blue-600/20 hover:bg-[var(--brand-blue-hover)]",
  outline:
    "bg-transparent text-brand-blue border-2 border-brand-blue hover:bg-blue-50",
  white:
    "bg-white text-slate-800 shadow-md hover:bg-slate-50",
  ghost:
    "bg-white/80 text-slate-700 border border-slate-200 hover:border-brand-blue/40",
} as const;

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

const base =
  "inline-flex items-center justify-center rounded-2xl px-6 py-2.5 text-sm font-semibold transition-all duration-300";

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        onClick={(e) => {
          handleAnchorNav(e, href);
          onClick?.(e);
        }}
      >
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
