"use client";

import { Button } from "@/components/ui/button";
import { MockupContainer } from "@/components/mockup/container";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { sectionAnchorHref } from "@/lib/i18n/locale";

export function MockupCta() {
  const { locale, t } = useI18n();

  return (
    <section id="demo" className="py-6 sm:py-8">
      <MockupContainer>
        <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 px-5 py-8 text-center text-white shadow-xl shadow-blue-400/25 sm:rounded-[2.75rem] sm:px-16 sm:py-11">
          <div className="pointer-events-none absolute -left-8 top-0 h-32 w-32 rounded-full bg-white/20" />
          <div className="pointer-events-none absolute -right-6 bottom-0 h-36 w-36 rounded-full bg-white/15" />
          <h2 className="text-balance text-[clamp(1.35rem,4.5vw+0.6rem,2.05rem)] font-bold tracking-tight">
            {t("home.cta.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/90">
            {t("home.cta.subtitle")}
          </p>
          <div className="mt-5">
            <Button
              href={sectionAnchorHref(locale, "contact")}
              variant="white"
              className="min-h-11 whitespace-normal rounded-full px-8 py-2.5 text-sm"
            >
              {t("home.cta.button")}
            </Button>
          </div>
        </div>
      </MockupContainer>
    </section>
  );
}
