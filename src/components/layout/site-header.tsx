"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { NavItem } from "@/types/marketing";
import { trackEvent } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { sectionIdFromHref, useActiveSection } from "@/hooks/use-active-section";
import { handleAnchorNav } from "@/lib/section-navigation";

type SiteHeaderProps = {
  navigation: NavItem[];
};

export function SiteHeader({ navigation }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ${
        scrolled
          ? "border-[var(--border-subtle)] bg-white/95 shadow-sm backdrop-blur-md"
          : "border-transparent bg-white/80 backdrop-blur-sm"
      }`}
    >
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-3">
        <Link
          href="/#home"
          className="flex min-w-0 shrink items-center gap-2"
          onClick={(e) => handleAnchorNav(e, "/#home", () => setOpen(false))}
        >
          <Image
            src="/logos/ekklesiasoft-horizontal.png"
            alt="EkklesiaNexus"
            width={180}
            height={40}
            className="h-8 w-auto max-w-[min(100%,11rem)] sm:h-9 md:h-10"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8" aria-label="Primary">
          {navigation.map((item) => {
            const id = sectionIdFromHref(item.href);
            const isActive = id === activeSection;
            return (
              <Link
                key={item.href}
                href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                aria-current={isActive ? "true" : undefined}
                className={`whitespace-nowrap text-sm font-medium transition-colors ${
                  isActive ? "text-brand-navy" : "text-[var(--text-secondary)] hover:text-brand-navy"
                }`}
                onClick={(e) => handleAnchorNav(e, item.href.startsWith("#") ? `/${item.href}` : item.href)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink
            label="Request a Demo"
            href="/#contact"
            variant="primary"
            onClick={() => trackEvent("cta_click", { label: "header_demo" })}
          />
        </div>

        <button
          type="button"
          className="relative z-[60] inline-flex h-11 w-11 items-center justify-center rounded-md p-2 text-brand-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="max-h-[min(70dvh,calc(100dvh-var(--header-offset)))] overflow-y-auto border-t border-[var(--border-subtle)] bg-white lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                className="rounded-md px-2 py-3 text-base font-medium text-brand-navy"
                onClick={(e) => {
                  handleAnchorNav(e, item.href.startsWith("#") ? `/${item.href}` : item.href, () => setOpen(false));
                  setOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              label="Request a Demo"
              href="/#contact"
              variant="primary"
              onClick={() => {
                setOpen(false);
                trackEvent("cta_click", { label: "mobile_header_demo" });
              }}
            />
          </Container>
        </div>
      ) : null}
    </header>
  );
}
