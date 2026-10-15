"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo } from "react";
import { htmlLangAttribute, localeFromPathname, type AppLocale } from "@/lib/i18n/locale";
import { getMessages, type Messages } from "@/lib/i18n/messages";
import { createTranslator, type Translator } from "@/lib/i18n/translate";

type I18nContextValue = {
  locale: AppLocale;
  messages: Messages;
  t: Translator;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale: serverLocale,
  messages: _serverMessages,
  children,
}: {
  locale: AppLocale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = pathname !== null ? localeFromPathname(pathname) : serverLocale;
  const messages = useMemo(() => getMessages(locale), [locale]);

  useEffect(() => {
    document.documentElement.lang = htmlLangAttribute(locale);
  }, [locale]);

  const value = useMemo(() => {
    const t = createTranslator(messages);
    return { locale, messages, t };
  }, [locale, messages]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}

export function useTranslations(): Translator {
  return useI18n().t;
}
