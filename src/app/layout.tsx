import type { Metadata } from "next";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Ga4Loader } from "@/components/marketing/ga4-loader";
import { StructuredData } from "@/components/marketing/structured-data";
import { getMarketingContentAsync } from "@/lib/marketing/get-content";
import { buildRootLayoutMetadata } from "@/lib/marketing/seo-metadata";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMarketingContentAsync();
  return buildRootLayoutMetadata(content);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getMarketingContentAsync();
  const pathname = (await headers()).get("x-en-pathname") ?? "";
  const isPreview = pathname.startsWith("/preview");

  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className={`${jakarta.className} flex min-h-full flex-col antialiased`}>
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:shadow"
        >
          Skip to content
        </a>
        {isPreview ? null : <StructuredData content={content} />}
        {isPreview ? null : <Ga4Loader content={content} />}
        {children}
      </body>
    </html>
  );
}
