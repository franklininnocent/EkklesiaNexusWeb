import { DemoForm } from "@/components/contact/demo-form";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import type { MarketingContent } from "@/types/marketing";

type HomeSectionsProps = {
  content: MarketingContent;
};

export function HomeSectionsBeforeProduct({ content }: HomeSectionsProps) {
  return (
    <>
      <section id="why" className="py-16 md:py-20">
        <Container>
          <SectionHeader
            title={content.why.title}
            subtitle="Parish information should feel connected—not scattered across notebooks and spreadsheets."
          />
          <div className="grid min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.why.paragraphs.map((p, i) => (
              <p key={i} className="text-[var(--text-secondary)] leading-relaxed">{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <SectionHeader
            title={content.church360.title}
            subtitle={content.church360.subtitle}
            align="center"
          />
          <ul className="flex flex-wrap justify-center gap-3">
            {content.church360.areas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-page)] px-4 py-2 text-sm font-medium text-brand-navy"
              >
                {area}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="features" className="py-16 md:py-24">
        <Container>
          <SectionHeader
            title="Feature ecosystem"
            subtitle="Organized capabilities for people, pastoral life, stewardship, administration, and insights."
            align="center"
          />
          <div className="space-y-12">
            {content.featureCategories.map((cat) => (
              <div key={cat.id}>
                <h3 className="text-lg font-semibold text-brand-navy">{cat.title}</h3>
                <ul className="mt-6 grid min-w-0 gap-6 sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-card)]"
                    >
                      <h4 className="font-semibold text-brand-navy">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export function HomeSectionsAfterProduct({ content }: HomeSectionsProps) {
  return (
    <>
      <section id="solutions" className="bg-white py-16 md:py-24">
        <Container>
          <SectionHeader
            title="Core solutions"
            subtitle="Connected parish workflows across families, sacraments, stewardship, communities, leadership, and worship."
            align="center"
          />
          <div className="grid min-w-0 gap-6 sm:grid-cols-2">
            {content.solutions.map((sol) => (
              <article
                key={sol.id}
                className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] p-6"
              >
                <h3 className="text-lg font-semibold text-brand-navy">{sol.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {sol.description}
                </p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
                  {sol.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="benefits" className="py-16 md:py-24">
        <Container>
          <SectionHeader title={content.reports.title} subtitle={content.reports.purpose} />
          <div className="grid min-w-0 gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-brand-navy">What it tells you</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
                  {content.reports.whatItTellsYou.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-brand-navy">When to use it</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
                  {content.reports.whenToUse.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-brand-navy">How to use it</h3>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
                  {content.reports.howToUseSteps.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="space-y-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-card)]">
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {content.reports.practicalAdvantages}
              </p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {content.reports.administratorUse}
              </p>
              <p className="text-sm font-medium text-brand-navy">{content.reports.whyThisHelps}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-white py-16">
        <Container>
          <SectionHeader title={content.workflow.title} align="center" />
          <ol className="mx-auto flex max-w-3xl flex-col gap-3">
            {content.workflow.steps.map((step, index) => (
              <li
                key={step.id}
                className="flex items-center gap-4 rounded-[var(--radius-md)] border border-[var(--border-subtle)] px-4 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span className="font-medium text-brand-navy">{step.label}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeader
            title="Key advantages for the church"
            align="center"
          />
          <ul className="grid min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.advantages.map((adv) => (
              <li
                key={adv.id}
                className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-white p-6"
              >
                <h3 className="font-semibold text-brand-navy">{adv.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {adv.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <SectionHeader
            title="Who EkklesiaNexus is for"
            align="center"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.audiences.map((aud) => (
              <li key={aud.id} className="rounded-[var(--radius-md)] bg-[var(--surface-page)] p-5">
                <h3 className="font-semibold text-brand-navy">{aud.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{aud.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-brand-navy py-14 text-white">
        <Container className="text-center">
          <h2 className="font-display text-[clamp(1.5rem,3vw+0.8rem,1.875rem)] font-semibold text-balance">{content.finalCta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-slate-300">{content.finalCta.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {content.finalCta.ctas.map((cta) => (
              <ButtonLink key={cta.label} {...cta} onDark />
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="py-16 md:py-24">
        <Container>
          <div className="grid min-w-0 gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                title="Request a demo"
                subtitle="Tell us about your parish. We will follow up to schedule a conversation."
              />
              {(content.site.contactEmail || content.site.contactPhone || content.site.contactAddress) && (
                <dl className="mt-6 space-y-3 text-sm text-[var(--text-secondary)]">
                  {content.site.contactEmail ? (
                    <div>
                      <dt className="font-medium text-brand-navy">Email</dt>
                      <dd>{content.site.contactEmail}</dd>
                    </div>
                  ) : null}
                  {content.site.contactPhone ? (
                    <div>
                      <dt className="font-medium text-brand-navy">Phone</dt>
                      <dd>{content.site.contactPhone}</dd>
                    </div>
                  ) : null}
                  {content.site.contactAddress ? (
                    <div>
                      <dt className="font-medium text-brand-navy">Address</dt>
                      <dd>{content.site.contactAddress}</dd>
                    </div>
                  ) : null}
                </dl>
              )}
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-card)]">
              <DemoForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
