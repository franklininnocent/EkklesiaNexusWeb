import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { Card } from "@/components/ui/card";
import { MockupContainer, SectionHeading } from "@/components/mockup/container";
import { FeatureArt } from "@/components/mockup/feature-art";
import { mockupFeatures } from "@/data/mockup-page";

export function MockupFeatures() {
  return (
    <section id="features" className="py-12 sm:py-16">
      <MockupContainer>
        <SectionHeading title={mockupFeatures.title} subtitle={mockupFeatures.subtitle} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockupFeatures.items.map((item, i) => (
            <AnimatedReveal key={item.id} delay={i * 0.05} className="h-full">
              <Card lift className="h-full min-w-0 rounded-[1.75rem] px-6 pb-7 pt-5">
                <FeatureArt id={item.id} tone={item.tone} />
                <h3 className="mt-1 text-[1.05rem] font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{item.body}</p>
              </Card>
            </AnimatedReveal>
          ))}
        </div>
      </MockupContainer>
    </section>
  );
}
