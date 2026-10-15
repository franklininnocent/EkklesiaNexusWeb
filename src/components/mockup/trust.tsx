"use client";

import { MockupContainer } from "@/components/mockup/container";
import { useTranslations } from "@/lib/i18n/i18n-provider";

const icons = [
  function Church(props: { className?: string }) {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={props.className} aria-hidden="true">
        <path d="M24 6 L24 14 M20 10 H28" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M24 14 L10 24 V40 H38 V24 Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M20 40 V30 H28 V40" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="24" cy="22" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  },
  function People(props: { className?: string }) {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={props.className} aria-hidden="true">
        <circle cx="18" cy="16" r="5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="30" cy="16" r="5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 38 C8 30 13 26 18 26 C23 26 28 30 28 38" stroke="currentColor" strokeWidth="1.7" />
        <path d="M20 38 C20 30 25 26 30 26 C35 26 40 30 40 38" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  },
  function Building(props: { className?: string }) {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={props.className} aria-hidden="true">
        <path d="M10 40 V16 L24 8 L38 16 V40 Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M21 40 V30 H27 V40" stroke="currentColor" strokeWidth="1.7" />
        <path d="M16 22 H20 M28 22 H32 M16 28 H20 M28 28 H32" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  },
  function Chapel(props: { className?: string }) {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={props.className} aria-hidden="true">
        <path d="M8 40 V22 H18 V14 L24 8 L30 14 V22 H40 V40 Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M24 8 V4 M21 6 H27" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M22 40 V32 H26 V40" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  },
  function Community(props: { className?: string }) {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={props.className} aria-hidden="true">
        <circle cx="24" cy="14" r="5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="18" r="4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="36" cy="18" r="4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M10 38 C10 30 16 26 24 26 C32 26 38 30 38 38" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  },
];

export function MockupTrust() {
  const t = useTranslations();

  return (
    <section className="py-10 sm:py-14">
      <MockupContainer>
        <p className="text-center text-sm font-semibold text-slate-700">{t("home.trust.title")}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-10 text-slate-400 sm:gap-16">
          {icons.map((Icon, i) => (
            <Icon key={i} className="h-11 w-11" />
          ))}
        </div>
      </MockupContainer>
    </section>
  );
}
