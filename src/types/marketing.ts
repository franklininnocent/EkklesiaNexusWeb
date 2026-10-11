export type NavItem = {
  label: string;
  href: string;
};

export type CtaLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type FeatureItem = {
  id: string;
  title: string;
  description: string;
  categoryId: string;
};

export type FeatureCategory = {
  id: string;
  title: string;
  items: FeatureItem[];
};

export type ProductScreenshot = {
  id: string;
  title: string;
  description: string;
  module: string;
  image: string;
  alt: string;
  capabilities: string[];
  benefit: string;
  displayOrder: number;
  active: boolean;
};

export type SolutionBlock = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
};

export type AdvantageItem = {
  id: string;
  title: string;
  description: string;
};

export type AudienceItem = {
  id: string;
  title: string;
  description: string;
};

export type ValueStripItem = {
  id: string;
  title: string;
  description: string;
};

export type WorkflowStep = {
  id: string;
  label: string;
};

export type ReportsSection = {
  title: string;
  purpose: string;
  whatItTellsYou: string[];
  whenToUse: string[];
  howToUseSteps: string[];
  whatYouCanDo: string[];
  whyThisHelps: string;
  practicalAdvantages: string;
  administratorUse: string;
  benefits: string[];
};

export type SiteConfig = {
  name: string;
  tagline: string;
  slogan: string;
  supportingLine: string;
  seoTitle: string;
  seoDescription: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
};

export type PublicPageSeo = {
  id: string;
  name: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
};

export type MarketingSeoConfig = {
  schemaVersion: 1;
  canonicalOrigin: string;
  defaultLocale: string;
  ogLocale: string;
  defaultOgImage: string;
  organizationName: string;
  organizationDescription: string;
  publishedAt?: string;
  verification?: {
    google?: string;
    bing?: string;
  };
  analytics?: {
    ga4MeasurementId?: string;
  };
  robots?: {
    allowRoot: boolean;
  };
  pages: {
    home: PublicPageSeo;
    privacy: PublicPageSeo;
    terms: PublicPageSeo;
  };
};

export type MarketingContent = {
  site: SiteConfig;
  navigation: NavItem[];
  hero: {
    title: string;
    supportingLine: string;
    description: string;
    image: string;
    imageAlt: string;
    ctas: CtaLink[];
  };
  valueStrip: ValueStripItem[];
  why: {
    title: string;
    paragraphs: string[];
  };
  church360: {
    title: string;
    subtitle: string;
    areas: string[];
  };
  featureCategories: FeatureCategory[];
  solutions: SolutionBlock[];
  reports: ReportsSection;
  workflow: {
    title: string;
    steps: WorkflowStep[];
  };
  advantages: AdvantageItem[];
  audiences: AudienceItem[];
  finalCta: {
    title: string;
    description: string;
    ctas: CtaLink[];
  };
  screenshots: ProductScreenshot[];
  footer: {
    statement: string;
    links: NavItem[];
  };
  seo?: MarketingSeoConfig;
};
