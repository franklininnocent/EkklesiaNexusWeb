import type { AppLocale } from "@/lib/i18n/locale";
import enUS from "@/messages/en-US.json";
import ptBR from "@/messages/pt-BR.json";

export type Messages = typeof enUS;

const catalogs: Record<AppLocale, Messages> = {
  "en-US": enUS,
  "pt-BR": ptBR,
};

export function getMessages(locale: AppLocale): Messages {
  return catalogs[locale];
}
