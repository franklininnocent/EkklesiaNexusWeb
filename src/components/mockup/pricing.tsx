"use client";

import { Check, Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { Button } from "@/components/ui/button";
import { MockupContainer, SectionHeading } from "@/components/mockup/container";
import { PRICING_PLANS } from "@/data/mockup-structure";
import type { PricingPlanId } from "@/data/regional-pricing";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { formatMarketingMoneyFromDecimal } from "@/lib/marketing-money";
import type { MarketingCurrency } from "@/lib/pricing/marketing-currency";
import { derivedFreeMonthsFromDecimalStrings } from "@/lib/pricing/marketing-pricing-math";
import type { SelectedMarketingPrice } from "@/lib/pricing/select-marketing-price";
import { isPlanPriceExpanded, planPricePanelId, toggleExpandedPlanId } from "@/lib/pricing-expand";

const tones = {
  seed: "bg-[#fff7e0]",
  growth: "bg-[#e8f1ff] ring-2 ring-[#2563eb]",
  summit: "bg-[#fde8f1]",
};

type PricingPlan = (typeof PRICING_PLANS)[number];

type PricingPlanCardProps = {
  plan: PricingPlan;
  priceRow: SelectedMarketingPrice | null;
  expanded: boolean;
  onToggle: (planId: string) => void;
};

function PricingPlanCard({ plan, priceRow, expanded, onToggle }: PricingPlanCardProps) {
  const { locale, t } = useI18n();
  const pricePanelId = planPricePanelId(plan.id);
  const hasLimits = Boolean(plan.limits?.length);
  const currencyCode = priceRow?.currencyCode ?? "USD";
  const monthly =
    priceRow?.monthly != null ? formatMarketingMoneyFromDecimal(priceRow.monthly, currencyCode, locale) : "";
  const annual =
    priceRow?.annual != null ? formatMarketingMoneyFromDecimal(priceRow.annual, currencyCode, locale) : "";
  const freeMonths =
    priceRow?.monthly != null && priceRow.annual != null
      ? derivedFreeMonthsFromDecimalStrings(priceRow.monthly, priceRow.annual)
      : null;
  const includesKey = "includesKey" in plan ? plan.includesKey : undefined;
  const includesLabel = includesKey
    ? t(`home.pricing.${includesKey}`)
    : hasLimits
      ? t("common.pricing.includes")
      : null;
  const canRevealPrice = Boolean(monthly);
  const panelTransition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };
  const tagline = t(`home.pricing.plans.${plan.id}.tagline`);

  return (
    <article className={`card-lift flex h-full min-w-0 flex-col rounded-[1.75rem] px-5 py-7 sm:px-7 ${tones[plan.tone]}`}>
      <div className="text-center">
        {"badgeKey" in plan && plan.badgeKey ? (
          <p className="mb-2 inline-flex rounded-full bg-brand-blue px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            {t(`home.pricing.${plan.badgeKey}`)}
          </p>
        ) : null}
        <h3 className="text-[1.35rem] font-bold text-slate-900">{plan.name}</h3>
        {tagline ? (
          <p className="mx-auto mt-2 max-w-[17rem] text-[13px] leading-relaxed text-slate-600">{tagline}</p>
        ) : null}
      </div>

      {canRevealPrice ? (
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key={pricePanelId}
              id={pricePanelId}
              role="region"
              aria-label={t("common.pricing.pricingRegionLabel", { planName: plan.name })}
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
                  {monthly}{" "}
                  <span className="text-sm font-semibold text-slate-500">{t("common.pricing.perMonth")}</span>
                </p>
                {annual ? (
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                    {t("common.pricing.orAnnual", { annual })}{" "}
                    <span className="text-slate-500">{t("common.pricing.perYear")}</span>
                    {freeMonths != null ? (
                      <>
                        {" ("}
                        <span className="font-semibold text-brand-blue">
                          {t("home.pricing.monthsFreeHighlight")}
                        </span>
                        {")"}
                      </>
                    ) : null}
                  </p>
                ) : null}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}

      <div className="mt-6 flex flex-1 flex-col">
        {includesLabel ? (
          <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {includesLabel}
          </p>
        ) : null}
        {hasLimits ? (
          <ul className="mb-5 space-y-2 text-[13px] text-slate-700">
            {plan.limits!.map((limit) => (
              <li
                key={limit.labelKey}
                className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2"
              >
                <span>{t(`home.pricing.${limit.labelKey}`)}</span>
                <span className="font-semibold text-slate-900">{limit.value}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="flex flex-1 flex-col gap-2.5 text-[13px] leading-snug text-slate-700">
          {plan.featureKeys.map((featureKey) => (
            <li key={featureKey} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden />
              <span>{t(`home.pricing.features.${featureKey}`)}</span>
            </li>
          ))}
        </ul>
      </div>

      {canRevealPrice ? (
        <Button
          type="button"
          variant="outline"
          className={`mt-6 w-full rounded-full border-slate-300 bg-white/90 text-slate-800 hover:bg-white ${
            plan.featured ? "shadow-md" : "bg-white"
          }`}
          onClick={() => onToggle(plan.id)}
          aria-expanded={expanded}
          aria-controls={pricePanelId}
        >
          {expanded ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
          {expanded ? t("common.pricing.hidePrice") : t("common.pricing.showPrice")}
        </Button>
      ) : null}
    </article>
  );
}

type MockupPricingProps = {
  currencyCode: MarketingCurrency;
  pricesByPlanId: Record<PricingPlanId, SelectedMarketingPrice | null>;
};

export function MockupPricing({ currencyCode: _currencyCode, pricesByPlanId }: MockupPricingProps) {
  const { t } = useI18n();
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  const onTogglePlan = useCallback((planId: string) => {
    setExpandedPlanId((current) => toggleExpandedPlanId(current, planId));
  }, []);

  return (
    <section id="pricing" className="py-14 sm:py-16">
      <MockupContainer>
        <SectionHeading title={t("home.pricing.title")} />
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => (
            <AnimatedReveal key={plan.id} delay={i * 0.07} className="h-full">
              <PricingPlanCard
                plan={plan}
                priceRow={pricesByPlanId[plan.id as PricingPlanId]}
                expanded={isPlanPriceExpanded(expandedPlanId, plan.id)}
                onToggle={onTogglePlan}
              />
            </AnimatedReveal>
          ))}
        </div>
        <p className="mt-6 text-left text-[12px] leading-relaxed text-slate-400 sm:text-right">
          {t("home.pricing.taxDisclaimer")}
        </p>
      </MockupContainer>
    </section>
  );
}
