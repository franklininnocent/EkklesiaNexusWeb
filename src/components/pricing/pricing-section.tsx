"use client";

import { Check, Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { Button } from "@/components/ui/button";
import { MockupContainer, SectionHeading } from "@/components/mockup/container";
import { formatCatalogMoney } from "@/lib/catalog-money";
import { isPlanPriceExpanded, planPricePanelId, toggleExpandedPlanId } from "@/lib/pricing-expand";
import type { PricingViewPlan } from "@/types/subscription-plans";

const tones: Record<PricingViewPlan["tone"], string> = {
  seed: "bg-[#fff7e0]",
  growth: "bg-[#e8f1ff] ring-2 ring-[#2563eb]",
  summit: "bg-[#fde8f1]",
  neutral: "bg-slate-50",
};

type PricingSectionProps = {
  title: string;
  plans: PricingViewPlan[];
  taxDisclaimer: string | null;
  previewBanner?: boolean;
  emptyMessage?: string;
  errorMessage?: string | null;
};

function gridClass(count: number): string {
  if (count <= 1) {
    return "grid-cols-1";
  }
  if (count === 2) {
    return "grid-cols-1 md:grid-cols-2";
  }
  if (count === 3) {
    return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3";
  }

  return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";
}

type PricingPlanCardProps = {
  plan: PricingViewPlan;
  expanded: boolean;
  onToggle: (planId: string) => void;
};

function PricingPlanCard({ plan, expanded, onToggle }: PricingPlanCardProps) {
  const pricePanelId = planPricePanelId(plan.id);
  const hasLimits = Boolean(plan.limits?.length);
  const monthly = formatCatalogMoney(plan.monthly_price ?? undefined, plan.currency_code ?? undefined);
  const annual = formatCatalogMoney(plan.annual_price ?? undefined, plan.currency_code ?? undefined);
  const includesLabel = plan.includes_label ?? (hasLimits ? "Includes" : null);
  const canRevealPrice = plan.showPriceToggle && Boolean(monthly);
  const panelTransition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <article className={`card-lift flex h-full min-w-0 flex-col rounded-[1.75rem] px-5 py-7 sm:px-7 ${tones[plan.tone]}`}>
      <div className="text-center">
        {plan.badge ? (
          <p className="mb-2 inline-flex rounded-full bg-brand-blue px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            {plan.badge}
          </p>
        ) : null}
        <h3 className="text-[1.35rem] font-bold text-slate-900">{plan.name}</h3>
        {plan.tagline ? (
          <p className="mx-auto mt-2 max-w-[17rem] text-[13px] leading-relaxed text-slate-600">{plan.tagline}</p>
        ) : null}
        {plan.customPricingLabel ? (
          <p className="mt-4 text-sm font-semibold text-slate-800">{plan.customPricingLabel}</p>
        ) : null}
      </div>

      {canRevealPrice ? (
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key={pricePanelId}
              id={pricePanelId}
              role="region"
              aria-label={`${plan.name} pricing`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={panelTransition}
              className="overflow-hidden motion-reduce:transition-none"
            >
              <motion.div
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 6, opacity: 0 }}
                transition={{ duration: 0.26, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 rounded-2xl bg-white/80 px-4 py-4 text-center shadow-[0_4px_14px_rgba(15,23,42,0.04)] motion-reduce:transition-none"
              >
                <p className="text-[1.45rem] font-bold tracking-tight text-slate-900">
                  {monthly} <span className="text-sm font-semibold text-slate-500">/ month</span>
                </p>
                {annual ? (
                  <p className="mt-1 text-[13px] text-slate-600">
                    or {annual} <span className="text-slate-500">/ year</span>
                  </p>
                ) : null}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}

      <div className="mt-5 flex-1">
        {hasLimits ? (
          <div className="grid grid-cols-3 gap-2">
            {plan.limits?.map((limit) => (
              <div
                key={limit.label}
                className="min-w-0 rounded-2xl bg-white/80 px-1.5 py-3 text-center shadow-[0_4px_14px_rgba(15,23,42,0.04)] sm:px-2"
              >
                <p className="break-words text-base font-bold tracking-tight text-slate-900 sm:text-lg">{limit.value}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">{limit.label}</p>
              </div>
            ))}
          </div>
        ) : null}

        {includesLabel ? (
          <p
            className={
              plan.includes_label
                ? "mt-5 mb-2.5 text-[13px] font-semibold text-slate-800"
                : "mt-5 mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500"
            }
          >
            {includesLabel}
          </p>
        ) : null}

        <ul className={hasLimits ? "grid grid-cols-1 gap-x-3 gap-y-2 xl:grid-cols-2" : "space-y-2.5"}>
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-[13px] text-slate-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={2.5} />
              <span className="break-words">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {canRevealPrice ? (
        <Button
          type="button"
          variant={plan.featured ? "primary" : "outline"}
          aria-expanded={expanded}
          aria-controls={pricePanelId}
          onClick={() => onToggle(plan.id)}
          className={`mt-7 w-full gap-2 rounded-full py-2.5 text-sm transition-transform duration-200 active:scale-[0.98] motion-reduce:transform-none ${
            plan.featured ? "shadow-md" : "bg-white"
          }`}
        >
          {expanded ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
          {expanded ? "Hide Price" : "Show Price"}
        </Button>
      ) : plan.customPricingLabel ? (
        <Button href="/#contact" variant="outline" className="mt-7 w-full rounded-full bg-white py-2.5 text-sm">
          Talk to us
        </Button>
      ) : null}
    </article>
  );
}

export function PricingSection({
  title,
  plans,
  taxDisclaimer,
  previewBanner = false,
  emptyMessage = "Plans will be published here when they are available.",
  errorMessage = null,
}: PricingSectionProps) {
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);
  const onTogglePlan = useCallback((planId: string) => {
    setExpandedPlanId((current) => toggleExpandedPlanId(current, planId));
  }, []);

  return (
    <section id="pricing" className="py-14 sm:py-16">
      <MockupContainer>
        {previewBanner ? (
          <p
            className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-center text-sm font-semibold text-amber-900"
            role="status"
          >
            PREVIEW — NOT PUBLISHED
          </p>
        ) : null}
        <SectionHeading title={title} />
        {errorMessage ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center" role="alert">
            <p className="text-sm text-slate-600">{errorMessage}</p>
          </div>
        ) : plans.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center">
            <p className="text-sm text-slate-600">{emptyMessage}</p>
          </div>
        ) : (
          <div className={`grid items-stretch gap-5 ${gridClass(plans.length)}`}>
            {plans.map((plan, i) => (
              <AnimatedReveal key={plan.id} delay={i * 0.07} className="h-full">
                <PricingPlanCard
                  plan={plan}
                  expanded={isPlanPriceExpanded(expandedPlanId, plan.id)}
                  onToggle={onTogglePlan}
                />
              </AnimatedReveal>
            ))}
          </div>
        )}
        {taxDisclaimer && plans.length > 0 && !errorMessage ? (
          <p className="mt-6 text-left text-[12px] leading-relaxed text-slate-400 sm:text-right">{taxDisclaimer}</p>
        ) : null}
      </MockupContainer>
    </section>
  );
}
