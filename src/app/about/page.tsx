import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/marketing/breadcrumb-json-ld";
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { StaffAppLink } from "@/components/marketing/staff-app-link";
import { MockupContainer } from "@/components/mockup/container";
import { officialBrand } from "@/config/brand";
import { aboutPageCopy } from "@/lib/marketing/marketing-static-pages";
import { metadataForStaticPath } from "@/lib/marketing/static-page-metadata";

export const revalidate = 60;

export async function generateMetadata() {
  return metadataForStaticPath("/about");
}

export default function AboutPage() {
  const copy = aboutPageCopy();

  return (
    <MarketingPageShell>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <MockupContainer className="py-12 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{copy.h1}</h1>
        <div className="mt-6 max-w-3xl space-y-4 text-pretty text-base leading-relaxed text-slate-600">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-10 text-sm text-slate-500">
          <Link href="/contact" className="font-medium text-brand-blue hover:underline">Contact us</Link>
          {" · "}
          <StaffAppLink href={officialBrand.applicationUrl} className="font-medium text-brand-blue hover:underline">
            Open Application (staff sign-in)
          </StaffAppLink>
        </p>
      </MockupContainer>
    </MarketingPageShell>
  );
}
