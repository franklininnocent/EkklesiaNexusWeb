import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/marketing/breadcrumb-json-ld";
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { MockupContainer } from "@/components/mockup/container";
import {
  FEATURE_LANDING_SPECS,
  FEATURE_SLUGS,
  featureItemsForSlug,
  isFeatureSlug,
} from "@/lib/marketing/feature-slugs";
import { metadataForStaticPath } from "@/lib/marketing/static-page-metadata";

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FEATURE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!isFeatureSlug(slug)) {
    return { title: "Page not found — EkklesiaNexus", robots: { index: false, follow: false } };
  }
  return metadataForStaticPath(FEATURE_LANDING_SPECS[slug].path);
}

export default async function FeatureDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isFeatureSlug(slug)) {
    notFound();
  }

  const spec = FEATURE_LANDING_SPECS[slug];
  const items = featureItemsForSlug(slug);

  return (
    <MarketingPageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: spec.h1, path: spec.path },
        ]}
      />
      <MockupContainer className="py-12 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{spec.h1}</h1>
        <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-slate-600">{spec.intro}</p>
        <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50/80 px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Scope and limits</h2>
          <p className="mt-2 max-w-3xl text-pretty text-sm leading-relaxed text-slate-600">{spec.limitations}</p>
        </section>
        <div className="mt-10 space-y-8">
          {items.map((item) => (
            <section key={item.id}>
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 max-w-3xl text-pretty text-sm leading-relaxed text-slate-600">{item.description}</p>
            </section>
          ))}
        </div>
        {spec.relatedSlugs.length > 0 ? (
          <section className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Related capabilities</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {spec.relatedSlugs.map((related) => (
                <li key={related}>
                  <Link
                    href={FEATURE_LANDING_SPECS[related].path}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  >
                    {FEATURE_LANDING_SPECS[related].h1}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <p className="mt-10 text-sm text-slate-500">
          <Link href="/contact" className="font-medium text-brand-blue hover:underline">
            Request a conversation
          </Link>
          {" · "}
          <Link href="/#pricing" className="font-medium text-brand-blue hover:underline">
            Homepage pricing overview
          </Link>
        </p>
      </MockupContainer>
    </MarketingPageShell>
  );
}
