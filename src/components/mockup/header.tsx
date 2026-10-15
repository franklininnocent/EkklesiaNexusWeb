"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_SECTION_IDS } from "@/data/mockup-structure";
import { Button } from "@/components/ui/button";
import { MockupContainer } from "@/components/mockup/container";
import { LanguageSwitcher } from "@/components/mockup/language-switcher";
import { MockupLogo } from "@/components/mockup/logo";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { sectionAnchorHref } from "@/lib/i18n/locale";
import { useActiveSection } from "@/hooks/use-active-section";
import { handleAnchorNav, sectionIdFromHref } from "@/lib/section-navigation";

export function MockupHeader() {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();
  const homeHref = sectionAnchorHref(locale, "home");

  const navItems = NAV_SECTION_IDS.map((id) => ({
    id,
    label: t(`navigation.${id}`),
    href: sectionAnchorHref(locale, id),
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const closeWhenDesktop = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", closeWhenDesktop);
    return () => mq.removeEventListener("change", closeWhenDesktop);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ${
        scrolled
          ? "bg-white/85 shadow-sm shadow-slate-200/60 backdrop-blur-md"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <MockupContainer className="grid min-h-[var(--header-height)] grid-cols-[minmax(0,1fr)_auto] items-center gap-1.5 sm:gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:gap-2 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:gap-3">
        <Link
          href={homeHref}
          className="inline-flex min-w-0 items-center justify-self-start"
          aria-label={t("a11y.homeLogo")}
          onClick={(e) => handleAnchorNav(e, homeHref, () => setOpen(false))}
        >
          <MockupLogo size="nav" priority />
        </Link>

        <nav
          className="hidden min-w-0 items-center justify-center gap-2 lg:flex xl:gap-5"
          aria-label={t("a11y.primaryNav")}
        >
          {navItems.map((item) => {
            const id = sectionIdFromHref(item.href);
            const isActive = id === activeSection;
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => handleAnchorNav(e, item.href)}
                className={`whitespace-nowrap text-[11px] font-medium transition-colors xl:text-[13px] ${
                  isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex min-w-0 shrink-0 items-center justify-end gap-1.5 sm:gap-2 justify-self-end lg:col-start-3">
          <LanguageSwitcher />
          <Button
            href={sectionAnchorHref(locale, "demo")}
            variant="pill"
            className="hidden shrink-0 whitespace-nowrap px-3 py-1.5 text-[11px] font-semibold leading-tight lg:inline-flex xl:px-4 xl:text-[13px]"
          >
            {t("common.actions.getStartedHeader")}
          </Button>
          <button
            type="button"
            className="relative z-[60] inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-700 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("a11y.closeMenu") : t("a11y.openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </MockupContainer>

      {open ? (
        <div
          id="mobile-nav"
          className="max-h-[min(70dvh,calc(100dvh-var(--header-offset)))] overflow-y-auto border-t border-slate-100 bg-white/95 lg:hidden"
        >
          <MockupContainer className="flex flex-col gap-1 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {navItems.map((item) => (
              <Link
                key={`m-${item.id}`}
                href={item.href}
                className="rounded-xl px-2 py-3 text-base font-medium text-slate-800"
                onClick={(e) => handleAnchorNav(e, item.href, () => setOpen(false))}
              >
                {item.label}
              </Link>
            ))}
            <Button
              href={sectionAnchorHref(locale, "demo")}
              variant="pill"
              className="mt-2 min-h-11 whitespace-normal"
              onClick={() => setOpen(false)}
            >
              {t("common.actions.getStarted")}
            </Button>
          </MockupContainer>
        </div>
      ) : null}
    </header>
  );
}
