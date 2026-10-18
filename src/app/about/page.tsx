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
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-slate-600">
          Evaluating software for a Catholic parish? Read the{" "}
          <Link href="/solutions/catholic-parishes" className="font-medium text-brand-blue hover:underline">
            Catholic parish management overview
          </Link>
          , browse{" "}
          <Link href="/features" className="font-medium text-brand-blue hover:underline">church management features</Link>
          , or{" "}
          <Link href="/contact" className="font-medium text-brand-blue hover:underline">contact our team</Link>
          . Subscription plans on the homepage use country-aware pricing from the public catalog—not fixed figures in marketing copy.
        </p>
        <p className="mt-4 text-sm text-slate-500">
          <StaffAppLink href={officialBrand.applicationUrl} className="font-medium text-brand-blue hover:underline">
            Open Application (staff sign-in)
          </StaffAppLink>
        </p>
      </MockupContainer>
    </MarketingPageShell>
  );
}
