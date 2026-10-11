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
  const title = seo.pages.terms.seoTitle || "Terms — EkklesiaNexus";
  return legalPageMetadata("/terms", title);
}

export default async function TermsPage() {
  const content = await getMarketingContentAsync();

  return (
    <MarketingContentProvider content={content}>
      <MockupHeader />
      <main id="home" className="flex-1 pb-16 pt-[calc(var(--header-offset)+2rem)]">
        <MockupContainer className="max-w-3xl">
          <h1 className="text-3xl font-semibold text-slate-900">Terms</h1>
          <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
            Placeholder pending legal review. Do not rely on this page for contractual terms.
          </p>
          <p className="mt-6 text-slate-600">
            Official terms of service for EkklesiaNexus customers will be published here. The marketing
            website is provided for product information and demo requests only.
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
