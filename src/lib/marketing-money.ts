import type { AppLocale } from "@/lib/i18n/locale";

function intlLocale(locale: AppLocale): string {
  return locale === "pt-BR" ? "pt-BR" : "en-US";
}

function fractionDigitsForDecimalString(amount: string): { minimumFractionDigits: number; maximumFractionDigits: number } {
  const normalized = amount.replace(/,/g, "").trim();
  const fraction = normalized.includes(".") ? normalized.split(".")[1] ?? "" : "";
  if (fraction === "" || /^0+$/.test(fraction)) {
    return { minimumFractionDigits: 0, maximumFractionDigits: 0 };
  }
  return { minimumFractionDigits: 2, maximumFractionDigits: 2 };
}

function parseDecimalAmount(amount: string): number | null {
  const normalized = amount.replace(/,/g, "").trim();
  if (!/^-?\d+(\.\d+)?$/.test(normalized)) {
    return null;
  }
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

/** Format API decimal string amounts (symbol display). Preserves non-zero fractional digits. */
export function formatMarketingMoneyFromDecimal(
  amount: string,
  currencyCode: string,
  locale: AppLocale = "en-US",
): string {
  if (!amount || !currencyCode) {
    return "";
  }
  const numeric = parseDecimalAmount(amount);
  if (numeric === null) {
    return "";
  }
  const digits = fractionDigitsForDecimalString(amount);

  try {
    return new Intl.NumberFormat(intlLocale(locale), {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "symbol",
      ...digits,
    }).format(numeric);
  } catch {
    const plain = new Intl.NumberFormat(intlLocale(locale), digits).format(numeric);
    return `${currencyCode.toUpperCase()} ${plain}`;
  }
}

/** @deprecated Prefer formatMarketingMoneyFromDecimal with API strings. */
export function formatMarketingMoney(
  amount: number,
  currencyCode: string,
  locale: AppLocale = "en-US",
): string {
  if (!Number.isFinite(amount) || !currencyCode) {
    return "";
  }
  const asString = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  return formatMarketingMoneyFromDecimal(asString, currencyCode, locale);
}
