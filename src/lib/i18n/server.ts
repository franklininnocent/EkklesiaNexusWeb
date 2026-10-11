import { headers } from "next/headers";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";
import { localeFromPathname, type AppLocale } from "@/lib/i18n/locale";

export async function getRequestPathname(): Promise<string> {
  return (await headers()).get("x-en-pathname") ?? "/";
}

export async function getRequestLocale(): Promise<AppLocale> {
  return localeFromPathname(await getRequestPathname());
}

export async function getRequestI18n() {
  const locale = await getRequestLocale();
  const messages = getMessages(locale);
  return { locale, messages, t: createTranslator(messages) };
}
