import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/marketing/breadcrumb-json-ld";
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { MockupContainer } from "@/components/mockup/container";
import { catholicParishFaq } from "@/content/catholic-parish-faq";
import { solutionsContent } from "@/content/solutions";
import { FEATURE_LANDING_SPECS } from "@/lib/marketing/feature-slugs";
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
          Catholic parish management software for parish office teams
        </h1>
        <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-slate-600">
          EkklesiaNexus is church management software built for Catholic parish administration—household registers,
          sacramental books, Mass intentions, Life Groups / Basic Christian Communities (BCCs), and stewardship
          records—without advertising attendance apps, volunteer scheduling suites, or parishioner mobile-giving
          gateways the product does not include.
        </p>
        <p className="mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-slate-600">
          Explore{" "}
          <Link href={FEATURE_LANDING_SPECS["sacramental-registers"].path} className="font-medium text-brand-blue hover:underline">
            sacramental registers
          </Link>
          ,{" "}
          <Link href={FEATURE_LANDING_SPECS["family-management"].path} className="font-medium text-brand-blue hover:underline">
            family records
          </Link>
          , and{" "}
          <Link href={FEATURE_LANDING_SPECS["stewardship-and-finance"].path} className="font-medium text-brand-blue hover:underline">
            stewardship records
          </Link>{" "}
          in more detail, or{" "}
          <Link href="/contact" className="font-medium text-brand-blue hover:underline">
            request a conversation
          </Link>{" "}
          with our team.
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
        <section className="mt-14 border-t border-slate-200 pt-10" aria-labelledby="catholic-faq-heading">
          <h2 id="catholic-faq-heading" className="text-2xl font-semibold text-slate-900">
            Questions parish teams ask during evaluation
          </h2>
          <dl className="mt-6 space-y-6">
            {catholicParishFaq.map((item) => (
              <div key={item.id}>
                <dt className="text-base font-semibold text-slate-900">{item.question}</dt>
                <dd className="mt-2 max-w-3xl text-pretty text-sm leading-relaxed text-slate-600">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
        <p className="mt-12 text-sm text-slate-500">
          <Link href="/features" className="font-medium text-brand-blue hover:underline">Browse all features</Link>
          {" · "}
          <Link href="/contact" className="font-medium text-brand-blue hover:underline">Contact us</Link>
        </p>
      </MockupContainer>
    </MarketingPageShell>
  );
}
