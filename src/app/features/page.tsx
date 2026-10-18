import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/marketing/breadcrumb-json-ld";
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { MockupContainer } from "@/components/mockup/container";
import { FEATURE_LANDING_SPECS, FEATURE_SLUGS } from "@/lib/marketing/feature-slugs";
import { metadataForStaticPath } from "@/lib/marketing/static-page-metadata";

export const revalidate = 60;

export async function generateMetadata() {
  return metadataForStaticPath("/features");
}

export default function FeaturesHubPage() {
  return (
    <MarketingPageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
        ]}
      />
      <MockupContainer className="py-12 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Church management features</h1>
        <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-slate-600">
          Explore verified EkklesiaNexus capabilities for parish office work. These pages describe modules in the
          application—not every card on the homepage showcase. Catholic parishes can start with our{" "}
          <Link href="/solutions/catholic-parishes" className="font-medium text-brand-blue hover:underline">
            Catholic parish management overview
          </Link>
          .
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {FEATURE_SLUGS.map((slug) => {
            const spec = FEATURE_LANDING_SPECS[slug];
            return (
              <li key={slug}>
                <Link
                  href={spec.path}
                  className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                >
                  <h2 className="text-lg font-semibold text-slate-900">{spec.h1}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{spec.seoDescription}</p>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-10 text-sm text-slate-500">
          <Link href="/#pricing" className="font-medium text-brand-blue hover:underline">
            View demonstration pricing on the homepage
          </Link>
          {" · "}
          <Link href="/contact" className="font-medium text-brand-blue hover:underline">
            Contact us
          </Link>
        </p>
      </MockupContainer>
    </MarketingPageShell>
  );
}
