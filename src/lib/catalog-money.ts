import type { AppLocale } from "@/lib/i18n/locale";

function intlLocale(locale: AppLocale): string {
  return locale === "pt-BR" ? "pt-BR" : "en-US";
}

/** Format a SaaS catalog amount from the record `currency_code`. No parish/country FX. */
export function formatCatalogMoney(
  amount: string | undefined,
  currencyCode: string | undefined,
  fractionDigits = 0,
  locale: AppLocale = "en-US",
): string {
  if (!amount || !currencyCode) {
    return "";
  }

  try {
    return new Intl.NumberFormat(intlLocale(locale), {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "code",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(Number(amount.replace(/,/g, "")));
  } catch {
    const plain = new Intl.NumberFormat(intlLocale(locale), {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(Number(amount.replace(/,/g, "")));
    return `${currencyCode.toUpperCase()} ${plain}`;
  }
}
