"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { mockupNav } from "@/data/mockup-page";
import { Button } from "@/components/ui/button";
import { MockupContainer } from "@/components/mockup/container";
import { MockupLogo } from "@/components/mockup/logo";
import { useActiveSection } from "@/hooks/use-active-section";
import { handleAnchorNav, sectionIdFromHref } from "@/lib/section-navigation";

export function MockupHeader() {
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
      <MockupContainer className="grid h-[var(--header-height)] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-4">
        <Link
          href="/#home"
          className="inline-flex min-w-0 items-center justify-self-start"
          aria-label="EkklesiaNexus home"
          onClick={(e) => handleAnchorNav(e, "/#home", () => setOpen(false))}
        >
          <MockupLogo size="nav" priority />
        </Link>

        <nav
          className="hidden items-center justify-center gap-5 lg:flex xl:gap-8"
          aria-label="Primary"
        >
          {mockupNav.map((item) => {
            const id = sectionIdFromHref(item.href);
            const isActive = id === activeSection;
            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => handleAnchorNav(e, item.href)}
                className={`whitespace-nowrap text-[13px] font-medium transition-colors ${
                  isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden justify-self-end lg:block">
          <Button href="/#demo" variant="pill" className="px-5 py-1.5 text-[13px] font-semibold">
            Get Started
          </Button>
        </div>

        <button
          type="button"
          className="relative z-[60] inline-flex h-11 w-11 items-center justify-center justify-self-end rounded-xl text-slate-700 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </MockupContainer>

      {open ? (
        <div
          id="mobile-nav"
          className="max-h-[min(70dvh,calc(100dvh-var(--header-offset)))] overflow-y-auto border-t border-slate-100 bg-white/95 lg:hidden"
        >
          <MockupContainer className="flex flex-col gap-1 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {mockupNav.map((item) => (
              <Link
                key={`m-${item.label}`}
                href={item.href}
                className="rounded-xl px-2 py-3 text-base font-medium text-slate-800"
                onClick={(e) => handleAnchorNav(e, item.href, () => setOpen(false))}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/#demo" variant="pill" className="mt-2 min-h-11" onClick={() => setOpen(false)}>
              Get Started
            </Button>
          </MockupContainer>
        </div>
      ) : null}
    </header>
  );
}
