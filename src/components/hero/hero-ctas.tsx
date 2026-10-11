"use client";

import { ButtonLink } from "@/components/ui/button-link";
import { trackEvent } from "@/lib/analytics";
import type { CtaLink } from "@/types/marketing";

type HeroCtasProps = {
  ctas: CtaLink[];
};

export function HeroCtas({ ctas }: HeroCtasProps) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {ctas.map((cta) => (
        <ButtonLink
          key={cta.label}
          {...cta}
          onClick={() => trackEvent("cta_click", { label: `hero_${cta.label}` })}
        />
      ))}
    </div>
  );
}
