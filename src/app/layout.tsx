import type { Metadata } from "next";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Ga4Loader } from "@/components/marketing/ga4-loader";
import { StructuredData } from "@/components/marketing/structured-data";
import { I18nProvider } from "@/lib/i18n/i18n-provider";
import { htmlLangAttribute } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/i18n/server";
import { getMarketingContentAsync } from "@/lib/marketing/get-content";
import { officialBrand } from "@/config/brand";
import { buildLocalizedHomeMetadata } from "@/lib/marketing/localized-metadata";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMarketingContentAsync();
  const locale = await getRequestLocale();
  const localized = buildLocalizedHomeMetadata(content, locale);
  return {
    ...localized,
    applicationName: officialBrand.productName,
    authors: [{ name: officialBrand.productName, url: officialBrand.websiteUrl }],
    creator: officialBrand.productName,
    publisher: officialBrand.productName,
    icons: {
      icon: [
        { url: "/favicon/circular-badge-blue-gold.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/favicon.ico" },
      ],
      apple: [{ url: "/logos/ekklesiasoft-mark.png" }],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getMarketingContentAsync();
  const locale = await getRequestLocale();
  const messages = getMessages(locale);
  const pathname = (await headers()).get("x-en-pathname") ?? "";
  const isPreview = pathname.startsWith("/preview");

  return (
    <html lang={htmlLangAttribute(locale)} className={`${jakarta.variable} h-full`}>
      <body className={`${jakarta.className} flex min-h-full flex-col antialiased`}>
        <I18nProvider locale={locale} messages={messages}>
          <a
            href={locale === "pt-BR" ? "/pt-br#home" : "/#home"}
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:shadow"
          >
            {messages.a11y.skipToContent}
          </a>
          {isPreview ? null : <StructuredData content={content} locale={locale} />}
          {isPreview ? null : <Ga4Loader content={content} />}
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
