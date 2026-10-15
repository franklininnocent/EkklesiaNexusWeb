"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALE_DISPLAY,
  LOCALE_SWITCHER_LABEL,
  switchLocalePath,
  type AppLocale,
} from "@/lib/i18n/locale";
import { persistLocalePreference } from "@/lib/i18n/locale-cookie";
import { useI18n } from "@/lib/i18n/i18n-provider";

const ORDER: AppLocale[] = ["en-US", "pt-BR"];

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const { locale, t } = useI18n();

  return (
    <div className={className} role="navigation" aria-label={t("a11y.languageSwitcher")}>
      <ul className="flex shrink-0 items-center gap-0.5 rounded-full border border-slate-200 bg-white/80 p-0.5 text-[11px] font-semibold sm:text-[12px]">
        {ORDER.map((target) => {
          const isCurrent = locale === target;
          const href = switchLocalePath(pathname, target);
          const fullLabel = LOCALE_DISPLAY[target];
          return (
            <li key={target}>
              <Link
                href={href}
                hrefLang={target === "pt-BR" ? "pt-BR" : "en-US"}
                aria-current={isCurrent ? "true" : undefined}
                aria-label={fullLabel}
                title={fullLabel}
                onClick={() => persistLocalePreference(target)}
                className={`block min-w-[2.25rem] rounded-full px-2 py-1 text-center leading-none transition-colors sm:min-w-[2.5rem] ${
                  isCurrent ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {LOCALE_SWITCHER_LABEL[target]}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
