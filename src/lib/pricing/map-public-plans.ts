import type { PricingViewPlan, PublicPlanCard, PublicPlanLimit } from "@/types/subscription-plans";

const TONES: PricingViewPlan["tone"][] = ["seed", "growth", "summit", "neutral"];

function formatLimitValue(limit: PublicPlanLimit): string {
  if (limit.unlimited || limit.value === null) {
    return "Unlimited";
  }
  const raw = limit.value;
  if (limit.code === "STORAGE_MB" || limit.unit === "MB") {
    return new Intl.NumberFormat("en").format(raw);
  }

  return new Intl.NumberFormat("en").format(raw);
}

function limitLabel(limit: PublicPlanLimit): string {
  return limit.name || limit.code;
}

function toneForIndex(index: number, featured: boolean): PricingViewPlan["tone"] {
  if (featured) {
    return "growth";
  }

  return TONES[Math.min(index, TONES.length - 1)] ?? "neutral";
}

function featureNames(plan: PublicPlanCard): string[] {
  const rows = plan.features ?? [];

  return rows.map((f) => f.name).filter(Boolean);
}

function deltaFeatures(current: PublicPlanCard, previous: PublicPlanCard | null): string[] {
  const names = featureNames(current);
  if (!previous) {
    return names;
  }

  const prevSet = new Set(featureNames(previous));

  return names.filter((name) => !prevSet.has(name));
}

export function mapPublicPlansToView(plans: PublicPlanCard[]): PricingViewPlan[] {
  const sorted = [...plans].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

  return sorted.map((plan, index) => {
    const previous = index > 0 ? sorted[index - 1] : null;
    const delta = deltaFeatures(plan, previous);
    const isCustom = plan.pricing_type === "CUSTOM";
    const hasFixedPrice =
      !isCustom && (Boolean(plan.monthly_price) || Boolean(plan.annual_price));

    const limits = (plan.limits ?? []).map((limit) => ({
      label: limitLabel(limit),
      value: formatLimitValue(limit),
    }));

    let includesLabel: string | null = null;
    if (previous && delta.length > 0) {
      includesLabel = `Everything in ${previous.name}, plus:`;
    } else if (limits.length > 0 && delta.length > 0) {
      includesLabel = "Includes";
    }

    const listFeatures = previous && delta.length > 0 ? delta : featureNames(plan);

    return {
      id: plan.code,
      name: plan.name,
      tagline: plan.short_description?.trim() || null,
      badge: plan.badge_label?.trim() || null,
      featured: Boolean(plan.is_featured),
      tone: toneForIndex(index, Boolean(plan.is_featured)),
      currency_code: plan.currency_code ?? null,
      monthly_price: plan.monthly_price ?? null,
      annual_price: plan.annual_price ?? null,
      pricing_type: plan.pricing_type,
      limits,
      includes_label: includesLabel,
      features: listFeatures,
      showPriceToggle: hasFixedPrice,
      customPricingLabel: isCustom ? "Custom pricing" : null,
    };
  });
}

export function buildTaxDisclaimer(plans: PublicPlanCard[]): string | null {
  const priced = plans.find((p) => p.tax && (p.monthly_price || p.annual_price));
  if (!priced?.tax) {
    return "* Applicable taxes are calculated transparently in accordance with prevailing government regulations.";
  }

  const { label, rate_percent, prices_include_tax } = priced.tax;
  const rate = rate_percent ? `${rate_percent}%` : "";
  const inclusive = prices_include_tax ? "include" : "exclude";

  if (rate) {
    return `* ${label} (${rate}) ${inclusive} listed prices where shown. Final amounts follow your billing configuration.`;
  }

  return "* Applicable taxes are calculated transparently in accordance with prevailing government regulations.";
}

export type ComparisonCategory = {
  category: string;
  rows: { code: string; name: string; description: string | null }[];
};

export function comparisonLimitRows(
  plans: PublicPlanCard[],
): { code: string; name: string }[] {
  const rows = new Map<string, string>();
  for (const plan of plans) {
    for (const row of plan.coverage ?? []) {
      if (row.feature_type === "LIMIT" && !rows.has(row.code)) {
        rows.set(row.code, row.name);
      }
    }
  }

  return [...rows.entries()].map(([code, name]) => ({ code, name }));
}

export function buildComparisonMatrix(plans: PublicPlanCard[]): ComparisonCategory[] {
  const byCategory = new Map<string, Map<string, { name: string; description: string | null }>>();

  for (const plan of plans) {
    for (const row of plan.coverage ?? []) {
      const category = row.category?.trim() || "Features";
      if (!byCategory.has(category)) {
        byCategory.set(category, new Map());
      }
      const map = byCategory.get(category)!;
      if (!map.has(row.code)) {
        map.set(row.code, {
          name: row.name,
          description: row.description?.trim() || null,
        });
      }
    }
  }

  return [...byCategory.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, rows]) => ({
      category,
      rows: [...rows.entries()]
        .sort(([, a], [, b]) => a.name.localeCompare(b.name))
        .map(([code, meta]) => ({ code, ...meta })),
    }));
}

export function planIncludesFeature(plan: PublicPlanCard, code: string): boolean {
  const row = (plan.coverage ?? []).find((r) => r.code === code);

  return Boolean(row?.included);
}

export function planLimitDisplay(plan: PublicPlanCard, code: string): string {
  const row = (plan.coverage ?? []).find((r) => r.code === code);
  if (!row) {
    return "—";
  }
  if (row.unlimited || row.value === null) {
    return "Unlimited";
  }
  if ((row.feature_type === "LIMIT" || row.unit) && typeof row.value === "number") {
    return new Intl.NumberFormat("en").format(row.value);
  }

  return row.included ? "✓" : "—";
}
