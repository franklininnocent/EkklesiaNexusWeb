"use client";

import { MockupContainer } from "@/components/mockup/container";
import { useTranslations } from "@/lib/i18n/i18n-provider";

/**
 * Platform summary below the hero slogan — copy from `home.intro.lead` (i18n).
 * Layout mirrors MockupHero column widths on large screens.
 */
export function MockupHomeIntro() {
  const t = useTranslations();

  return (
    <section className="pb-9 sm:pb-11">
      <MockupContainer>
        <div
          className="border-t border-slate-200/90 pt-7 sm:pt-8 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-4 lg:pt-9"
        >
          <div className="min-w-0">
            <p
              className="max-w-[34rem] border-l-[3px] border-brand-gold/75 py-0.5 pl-4 text-pretty text-[15px] leading-[1.7] text-slate-500 sm:max-w-[36rem] sm:pl-5 sm:text-base lg:max-w-[38rem]"
            >
              {t("home.intro.lead")}
            </p>
          </div>
          <div className="hidden min-w-0 lg:block" aria-hidden="true" />
        </div>
      </MockupContainer>
    </section>
  );
}
