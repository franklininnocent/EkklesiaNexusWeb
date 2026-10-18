"use client";

import Link from "next/link";
import { MockupContainer } from "@/components/mockup/container";
import { MockupLogo } from "@/components/mockup/logo";
import { localizedFooterHref } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/i18n-provider";

export function MockupFooter() {
  const { locale, t } = useI18n();
  const year = new Date().getFullYear();

  const footerLinks =
    locale === "en-US"
      ? [
          { href: "/features", label: t("footer.features") },
          { href: "/solutions/catholic-parishes", label: t("footer.catholicParishes") },
          { href: "/about", label: t("footer.about") },
          { href: "/contact", label: t("footer.contact") },
          { href: "/privacy", label: t("footer.privacy") },
          { href: "/terms", label: t("footer.terms") },
        ]
      : [
          { href: localizedFooterHref(locale, "/privacy"), label: t("footer.privacy") },
          { href: localizedFooterHref(locale, "/terms"), label: t("footer.terms") },
          { href: "/contact", label: t("footer.contact") },
        ];

  return (
    <footer className="border-t border-slate-100 bg-white/70 py-8">
      <MockupContainer className="flex flex-col items-center justify-center">
        <MockupLogo size="footer" />
      </MockupContainer>
      <MockupContainer className="mt-6">
        <nav aria-label={t("a11y.footerNav")} className="mb-4">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-600">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-medium text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-center text-xs text-slate-500">{t("footer.copyright", { year })}</p>
      </MockupContainer>
    </footer>
  );
}
