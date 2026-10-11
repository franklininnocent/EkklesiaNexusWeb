export type PublicPlanTax = {
  label: string;
  rate_percent: string | null;
  prices_include_tax: boolean;
  source?: string;
};

export type PublicPlanFeature = {
  code: string;
  name: string;
  category?: string | null;
  description?: string | null;
  is_core?: boolean;
  included?: boolean;
};

export type PublicPlanLimit = {
  code: string;
  name: string;
  unit?: string | null;
  value: number | null;
  unlimited: boolean;
};

export type PublicPlanCoverageRow = PublicPlanFeature & {
  feature_type?: string;
  unit?: string | null;
  value?: number | null;
  unlimited?: boolean;
};

export type PublicPlanCard = {
  code: string;
  name: string;
  slug?: string;
  short_description?: string | null;
  badge_label?: string | null;
  is_featured?: boolean;
  pricing_type: string;
  display_order?: number;
  currency_code?: string | null;
  monthly_price?: string | null;
  annual_price?: string | null;
  setup_fee?: string | null;
  billing_intervals?: string[];
  trial_days?: number | null;
  tax?: PublicPlanTax;
  features?: PublicPlanFeature[];
  limits?: PublicPlanLimit[];
  coverage?: PublicPlanCoverageRow[];
  version_number?: number;
};

export type PricingViewPlan = {
  id: string;
  name: string;
  tagline: string | null;
  badge: string | null;
  featured: boolean;
  tone: "seed" | "growth" | "summit" | "neutral";
  currency_code: string | null;
  monthly_price: string | null;
  annual_price: string | null;
  pricing_type: string;
  limits: { label: string; value: string }[];
  includes_label: string | null;
  features: string[];
  showPriceToggle: boolean;
  customPricingLabel: string | null;
};
