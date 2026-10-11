import Link from "next/link";
import type { Metadata } from "next";
import { MockupFooter } from "@/components/mockup/footer";
import { MockupHeader } from "@/components/mockup/header";
import { MockupContainer } from "@/components/mockup/container";
import { getMarketingContentAsync } from "@/lib/marketing/get-content";
import { legalPageMetadata } from "@/lib/marketing/legal-metadata";
import { MarketingContentProvider } from "@/lib/marketing/marketing-content-context";
import { resolveMarketingSeo } from "@/lib/marketing/seo-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMarketingContentAsync();
  const seo = resolveMarketingSeo(content);
  const title = seo.pages.privacy.seoTitle || "Privacy — EkklesiaNexus";
  return legalPageMetadata("/privacy", title);
}

export default async function PrivacyPage() {
  const content = await getMarketingContentAsync();

  return (
    <MarketingContentProvider content={content}>
      <MockupHeader />
      <main id="home" className="flex-1 pb-16 pt-[calc(var(--header-offset)+2rem)]">
        <MockupContainer className="max-w-3xl">
          <h1 className="text-3xl font-semibold text-slate-900">Privacy</h1>
          <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
            Placeholder pending legal review. Do not rely on this page for compliance decisions.
          </p>
          <p className="mt-6 text-slate-600">
            This page will describe how EkklesiaNexus handles information submitted through the
            marketing website and related contact requests. For product privacy practices within the
            parish application, refer to your parish agreement and official policies when published.
          </p>
          <Link href="/" className="mt-8 inline-block text-brand-blue hover:underline">
            Return to homepage
          </Link>
        </MockupContainer>
      </main>
      <MockupFooter />
    </MarketingContentProvider>
  );
}
