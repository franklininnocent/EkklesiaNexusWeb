/**
 * Official EkklesiaNexus brand and domains.
 * Keep in sync with EkklesiaNexusApi/config/brand.php and
 * EkklesiaNexusUi/src/app/core/config/official-brand.ts.
 */
export const officialBrand = {
  productName: "EkklesiaNexus",
  rootDomain: "ekklesianexus.com",
  websiteUrl: "https://ekklesianexus.com",
  applicationUrl: "https://app.ekklesianexus.com",
  apiUrl: "https://api.ekklesianexus.com",
  contactEmail: "contact@ekklesianexus.com",
} as const;

export function marketingCopyrightNotice(year = new Date().getFullYear()): string {
  return `All rights reserved © ${officialBrand.productName} ${year}`;
}
