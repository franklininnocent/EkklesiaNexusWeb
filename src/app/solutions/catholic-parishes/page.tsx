import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/marketing/breadcrumb-json-ld";
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { MockupContainer } from "@/components/mockup/container";
import { solutionsContent } from "@/content/solutions";
import { metadataForStaticPath } from "@/lib/marketing/static-page-metadata";

export const revalidate = 60;

export async function generateMetadata() {
  return metadataForStaticPath("/solutions/catholic-parishes");
}

export default function CatholicParishesSolutionPage() {
  return (
    <MarketingPageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Catholic parishes", path: "/solutions/catholic-parishes" },
        ]}
      />
      <MockupContainer className="py-12 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Catholic parish administration in one connected system
        </h1>
        <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-slate-600">
          EkklesiaNexus is built for parish office workflows—household registers, sacramental books, Mass intentions,
          Life Groups / Basic Christian Communities (BCCs), and stewardship records—without advertising attendance
          apps, volunteer scheduling suites, or features the product does not include.
        </p>
        <div className="mt-12 space-y-10">
          {solutionsContent.map((block) => (
            <section key={block.id}>
              <h2 className="text-xl font-semibold text-slate-900">{block.title}</h2>
              <p className="mt-2 max-w-3xl text-pretty text-sm leading-relaxed text-slate-600">{block.description}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {block.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-12 text-sm text-slate-500">
          <Link href="/features" className="font-medium text-brand-blue hover:underline">Browse features</Link>
          {" · "}
          <Link href="/contact" className="font-medium text-brand-blue hover:underline">Contact us</Link>
        </p>
      </MockupContainer>
    </MarketingPageShell>
  );
}
