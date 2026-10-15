"use client";

import { Check, Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { Button } from "@/components/ui/button";
import { MockupContainer, SectionHeading } from "@/components/mockup/container";
import { PRICING_PLANS } from "@/data/mockup-structure";
import {
  derivedFreeMonths,
  getMarketCatalog,
  getPlanPrice,
  type PricingMarket,
  type PricingPlanId,
} from "@/data/regional-pricing";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { formatMarketingMoney } from "@/lib/marketing-money";
import { isPlanPriceExpanded, planPricePanelId, toggleExpandedPlanId } from "@/lib/pricing-expand";

const tones = {
  seed: "bg-[#fff7e0]",
  growth: "bg-[#e8f1ff] ring-2 ring-[#2563eb]",
  summit: "bg-[#fde8f1]",
};

type PricingPlan = (typeof PRICING_PLANS)[number];

type PricingPlanCardProps = {
  plan: PricingPlan;
  market: PricingMarket;
  expanded: boolean;
  onToggle: (planId: string) => void;
};

function PricingPlanCard({ plan, market, expanded, onToggle }: PricingPlanCardProps) {
  const { locale, t } = useI18n();
  const pricePanelId = planPricePanelId(plan.id);
  const hasLimits = Boolean(plan.limits?.length);
  const catalog = getMarketCatalog(market);
  const priceRow = getPlanPrice(market, plan.id as PricingPlanId);
  const monthly =
    priceRow != null ? formatMarketingMoney(priceRow.monthlyAmount, catalog.currencyCode, locale) : "";
  const annual =
    priceRow != null ? formatMarketingMoney(priceRow.annualAmount, catalog.currencyCode, locale) : "";
  const freeMonths =
    priceRow != null ? derivedFreeMonths(priceRow.monthlyAmount, priceRow.annualAmount) : null;
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

      <div className="mt-5 flex-1">
        {hasLimits ? (
          <div className="grid grid-cols-3 gap-2">
            {plan.limits?.map((limit) => (
              <div
                key={limit.labelKey}
                className="min-w-0 rounded-2xl bg-white/80 px-1.5 py-3 text-center shadow-[0_4px_14px_rgba(15,23,42,0.04)] sm:px-2"
              >
                <p className="break-words text-base font-bold tracking-tight text-slate-900 sm:text-lg">{limit.value}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  {t(`home.pricing.${limit.labelKey}`)}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {includesLabel ? (
          <p
            className={
              includesKey
                ? "mt-5 mb-2.5 text-[13px] font-semibold text-slate-800"
                : "mt-5 mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500"
            }
          >
            {includesLabel}
          </p>
        ) : null}

        <ul className={hasLimits ? "grid grid-cols-1 gap-x-3 gap-y-2 xl:grid-cols-2" : "space-y-2.5"}>
          {plan.featureKeys.map((featureKey) => (
            <li key={featureKey} className="flex items-start gap-2 text-[13px] text-slate-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" strokeWidth={2.5} />
              <span>{t(`home.pricing.features.${featureKey}`)}</span>
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
          className={`mt-7 w-full gap-2 whitespace-normal rounded-full py-2.5 text-sm transition-transform duration-200 active:scale-[0.98] motion-reduce:transform-none ${
            plan.featured ? "shadow-md" : "bg-white"
          }`}
        >
          {expanded ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
          {expanded ? t("common.actions.hidePrice") : t("common.actions.showPrice")}
        </Button>
      ) : null}
    </article>
  );
}

type MockupPricingProps = {
  market: PricingMarket;
};

export function MockupPricing({ market }: MockupPricingProps) {
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
                market={market}
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
