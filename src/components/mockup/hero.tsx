"use client";

import { Button } from "@/components/ui/button";
import { MockupContainer } from "@/components/mockup/container";
import { HeroDevices } from "@/components/mockup/devices";
import { MockupLogo } from "@/components/mockup/logo";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { sectionAnchorHref } from "@/lib/i18n/locale";

function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-sparkle ${className ?? ""}`}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2 L13.8 9.2 L21 12 L13.8 14.8 L12 22 L10.2 14.8 L3 12 L10.2 9.2 Z"
        fill="#67e8f9"
      />
    </svg>
  );
}

export function MockupHero() {
  const { locale, t } = useI18n();
  const subtitle = t("home.hero.subtitle");

  return (
    <section id="home" className="relative overflow-hidden pb-4 pt-[calc(var(--header-offset)+2.25rem)] sm:pb-8 sm:pt-[calc(var(--header-offset)+3.25rem)]">
      <div className="pointer-events-none absolute left-8 top-32 hidden h-[4.5rem] w-[4.5rem] rotate-[18deg] rounded-2xl bg-emerald-300/70 sm:block" />
      <div className="pointer-events-none absolute right-[42%] top-24 hidden h-7 w-7 -rotate-12 rounded-md bg-sky-300/80 sm:block" />

      <MockupContainer>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-4">
          <div className="relative min-w-0">
            <Sparkle className="absolute -left-3 top-1 hidden sm:block" />
            <h1 className="sr-only">
              {t("home.hero.titleLead")}. {subtitle}
            </h1>
            <MockupLogo size="hero" priority />
            <p className="mt-4 max-w-[26rem] text-pretty text-[15px] leading-relaxed text-slate-600 sm:text-base">
              {subtitle}
            </p>
            <div className="mt-7">
              <Button
                href={sectionAnchorHref(locale, "demo")}
                className="min-h-11 whitespace-normal rounded-xl px-6 py-2.5 text-sm shadow-lg shadow-blue-600/25"
              >
                {t("home.hero.primaryCta")}
              </Button>
            </div>
          </div>
          <div className="min-w-0">
            <HeroDevices />
          </div>
        </div>
      </MockupContainer>
    </section>
  );
}
