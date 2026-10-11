import type { AppLocale } from "@/lib/i18n/locale";

function intlLocale(locale: AppLocale): string {
  return locale === "pt-BR" ? "pt-BR" : "en-US";
}

/** Format approved marketing catalog amounts (symbol display). Currency from catalog, not locale. */
export function formatMarketingMoney(
  amount: number,
  currencyCode: string,
  locale: AppLocale = "en-US",
): string {
  if (!Number.isFinite(amount) || !currencyCode) {
    return "";
  }

  try {
    return new Intl.NumberFormat(intlLocale(locale), {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "symbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    const plain = new Intl.NumberFormat(intlLocale(locale), {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return `${currencyCode.toUpperCase()} ${plain}`;
  }
}
