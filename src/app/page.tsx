import type { Metadata } from "next";
import { MockupPage } from "@/components/mockup/mockup-page";
import { getMarketingContentAsync } from "@/lib/marketing/get-content";
import { buildLocalizedHomeMetadata } from "@/lib/marketing/localized-metadata";
import { getRequestLocale } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMarketingContentAsync();
  const locale = await getRequestLocale();
  return buildLocalizedHomeMetadata(content, locale);
}

export default function HomePage() {
  return <MockupPage />;
}
