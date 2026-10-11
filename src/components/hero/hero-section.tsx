import Image from "next/image";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { HeroCtas } from "@/components/hero/hero-ctas";
import { Container } from "@/components/ui/container";
import type { MarketingContent } from "@/types/marketing";

type HeroSectionProps = {
  content: MarketingContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  const { hero } = content;

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-[calc(var(--header-height)+2rem)] pb-16 md:pb-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(37,99,235,0.08),transparent_55%),radial-gradient(ellipse_60%_50%_at_0%_40%,rgba(0,48,112,0.06),transparent_50%)]"
        aria-hidden
      />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedReveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
              {hero.supportingLine}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-brand-navy md:text-5xl lg:text-[3.25rem]">
              {hero.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              {hero.description}
            </p>
            <HeroCtas ctas={hero.ctas} />
          </AnimatedReveal>

          <AnimatedReveal delay={0.08} className="relative">
            <div
              className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-slate-100 p-2 shadow-[var(--shadow-card)]"
              role="img"
              aria-label="Product preview frame"
            >
              <div className="flex items-center gap-1.5 border-b border-[var(--border-subtle)] px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="overflow-hidden rounded-b-[calc(var(--radius-lg)-4px)] bg-white">
                <Image
                  src={hero.image}
                  alt={hero.imageAlt}
                  width={1200}
                  height={750}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </Container>
    </section>
  );
}
