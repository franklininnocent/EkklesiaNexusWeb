/** Free months when annual is less than 12× monthly; null if not a whole number of months. */
export function derivedFreeMonthsFromDecimalStrings(monthly: string, annual: string): number | null {
  const monthlyMinor = toMinorUnits(monthly);
  const annualMinor = toMinorUnits(annual);
  if (monthlyMinor === null || annualMinor === null || monthlyMinor <= 0) {
    return null;
  }
  const yearlyAtMonthly = monthlyMinor * 12;
  if (annualMinor >= yearlyAtMonthly) {
    return null;
  }
  const free = yearlyAtMonthly - annualMinor;
  if (free % monthlyMinor !== 0) {
    return null;
  }
  const months = free / monthlyMinor;
  return months > 0 && Number.isInteger(months) ? months : null;
}

function toMinorUnits(value: string): number | null {
  const normalized = value.replace(/,/g, "").trim();
  if (!/^-?\d+(\.\d{1,2})?$/.test(normalized)) {
    return null;
  }
  const [whole, frac = ""] = normalized.split(".");
  const padded = (frac + "00").slice(0, 2);
  const sign = whole.startsWith("-") ? -1 : 1;
  const absWhole = whole.replace(/^-/, "");
  const minor = Number(absWhole) * 100 + Number(padded.padEnd(2, "0").slice(0, 2));
  if (!Number.isFinite(minor)) {
    return null;
  }
  return sign * minor;
}
