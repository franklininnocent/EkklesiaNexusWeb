import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/legal-document-page";
import { getMarketingContentAsync } from "@/lib/marketing/get-content";
import { legalPageMetadataForLocale } from "@/lib/marketing/legal-metadata";
import { getRequestLocale } from "@/lib/i18n/server";
import { resolveMarketingSeo } from "@/lib/marketing/seo-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMarketingContentAsync();
  const locale = await getRequestLocale();
  const seo = resolveMarketingSeo(content);
  const cmsTitle = seo.pages.privacy.seoTitle || undefined;
  return legalPageMetadataForLocale("/privacy", locale, cmsTitle);
}

export default function PrivacyPage() {
  return <LegalDocumentPage kind="privacy" />;
}
