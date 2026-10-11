/** Format a SaaS catalog amount from the record `currency_code`. No parish/country FX. */
export function formatCatalogMoney(
  amount: string | undefined,
  currencyCode: string | undefined,
  fractionDigits = 0,
): string {
  if (!amount || !currencyCode) {
    return "";
  }

  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "code",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(Number(amount.replace(/,/g, "")));
  } catch {
    const plain = new Intl.NumberFormat("en", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(Number(amount.replace(/,/g, "")));
    return `${currencyCode.toUpperCase()} ${plain}`;
  }
}
