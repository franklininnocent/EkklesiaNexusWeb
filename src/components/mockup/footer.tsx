"use client";

import Link from "next/link";
import type { SVGProps } from "react";
import { MockupContainer } from "@/components/mockup/container";
import { MockupLogo } from "@/components/mockup/logo";
import { FOOTER_LINKS } from "@/data/mockup-structure";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { localizedFooterHref, publicPagePath } from "@/lib/i18n/locale";

function IconFacebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function IconX(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 4h4.3l5 6.6L17.8 4H21l-7.2 8.7L21 20h-4.3l-5.3-7L6.2 20H3l7.5-9.1L3 4Z" />
    </svg>
  );
}

function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedIn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.5 9H4V20h2.5V9ZM5.25 4C4.42 4 3.8 4.63 3.8 5.4c0 .76.61 1.4 1.47 1.4.87 0 1.48-.64 1.48-1.4C6.73 4.63 6.12 4 5.25 4ZM20 20h-2.5v-5.6c0-1.33-.48-2.24-1.68-2.24-.92 0-1.46.62-1.7 1.22-.09.21-.11.5-.11.8V20H11.5s.03-9.7 0-10.7H14v1.52c.33-.52 1.17-1.26 2.85-1.26 2.08 0 3.15 1.36 3.15 4.28V20Z" />
    </svg>
  );
}

const socialKeys = [
  { key: "socialFacebook", href: "#facebook", Icon: IconFacebook },
  { key: "socialTwitter", href: "#twitter", Icon: IconX },
  { key: "socialInstagram", href: "#instagram", Icon: IconInstagram },
  { key: "socialLinkedIn", href: "#linkedin", Icon: IconLinkedIn },
] as const;

export function MockupFooter() {
  const { locale, t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-white/70 py-8">
      <MockupContainer className="flex flex-col items-center justify-between gap-6 md:flex-row md:flex-wrap">
        <MockupLogo size="footer" />
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500"
          aria-label={t("a11y.footerNav")}
        >
          {FOOTER_LINKS.map((link) => {
            const href =
              "path" in link ? localizedFooterHref(locale, link.path) : `${publicPagePath(locale, "home")}${link.hash}`;
            return (
              <Link key={link.key} href={href} className="hover:text-slate-800">
                {t(`footer.${link.key}`)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          {socialKeys.map(({ key, href, Icon }) => (
            <a
              key={key}
              href={href}
              aria-label={t(`footer.${key}`)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 sm:h-8 sm:w-8"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </MockupContainer>
      <MockupContainer className="mt-6">
        <p className="text-center text-xs text-slate-500">{t("footer.copyright", { year })}</p>
      </MockupContainer>
    </footer>
  );
}
