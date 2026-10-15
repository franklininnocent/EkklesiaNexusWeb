import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/marketing/breadcrumb-json-ld";
import { MockupContact } from "@/components/mockup/contact";
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { MockupContainer } from "@/components/mockup/container";
import { metadataForStaticPath } from "@/lib/marketing/static-page-metadata";

export const revalidate = 60;

export async function generateMetadata() {
  return metadataForStaticPath("/contact");
}

export default function ContactPage() {
  return (
    <MarketingPageShell>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <MockupContainer className="border-b border-slate-100 py-10 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Contact EkklesiaNexus</h1>
        <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-slate-600">
          Parish priests, secretaries, treasurers, and diocesan evaluators can use this form for product questions or to
          request a guided conversation. We respond using the contact details you provide—never passwords or parish
          records through this public form.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Already a parish user?{" "}
          <Link href="/#demo" className="font-medium text-brand-blue hover:underline">
            Request a demo from the homepage
          </Link>
          .
        </p>
      </MockupContainer>
      <MockupContact />
    </MarketingPageShell>
  );
}
