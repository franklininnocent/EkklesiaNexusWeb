import { featureCategoriesContent } from "@/content/features";

export const FEATURE_SLUGS = [
  "family-management",
  "member-management",
  "sacramental-registers",
  "mass-intentions",
  "ministries-and-groups",
  "stewardship-and-finance",
  "church-analytics",
] as const;

export type FeatureSlug = (typeof FEATURE_SLUGS)[number];

export function isFeatureSlug(value: string): value is FeatureSlug {
  return (FEATURE_SLUGS as readonly string[]).includes(value);
}

export type FeatureLandingSpec = {
  slug: FeatureSlug;
  path: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  limitations: string;
  itemIds: string[];
  relatedSlugs: FeatureSlug[];
};

function findFeatureItem(id: string) {
  for (const category of featureCategoriesContent) {
    const item = category.items.find((row) => row.id === id);
    if (item) {
      return item;
    }
  }
  return null;
}

export function featureItemsForSlug(slug: FeatureSlug) {
  const spec = FEATURE_LANDING_SPECS[slug];
  return spec.itemIds.map((id) => findFeatureItem(id)).filter((row) => row !== null);
}

export const FEATURE_LANDING_SPECS: Record<FeatureSlug, FeatureLandingSpec> = {
  "family-management": {
    slug: "family-management",
    path: "/features/family-management",
    seoTitle: "Family records for parishes — EkklesiaNexus",
    seoDescription:
      "Maintain parish household registers with relationships, contact details, and stewardship context in one family-first workspace.",
    h1: "Family records for the parish office",
    intro:
      "Parish secretaries and pastors need household information that stays current. EkklesiaNexus keeps families, members, and related parish context together so office visits and pastoral follow-up take less searching.",
    limitations:
      "This is parish office software—not a member self-service portal, attendance system, or generic CRM.",
    itemIds: ["families"],
    relatedSlugs: ["member-management", "stewardship-and-finance"],
  },
  "member-management": {
    slug: "member-management",
    path: "/features/member-management",
    seoTitle: "Church member management — EkklesiaNexus",
    seoDescription:
      "Connect members to families, sacraments, ministries, and stewardship records your parish already maintains.",
    h1: "Members connected to parish life",
    intro:
      "Member profiles are most useful when they sit beside the registers your team uses every day. Find individuals in context during phone calls and office visits without jumping between lists.",
    limitations:
      "Members are maintained by authorized staff; there is no parishioner-facing member app or attendance check-in product here.",
    itemIds: ["members"],
    relatedSlugs: ["family-management", "sacramental-registers"],
  },
  "sacramental-registers": {
    slug: "sacramental-registers",
    path: "/features/sacramental-registers",
    seoTitle: "Sacramental register software — EkklesiaNexus",
    seoDescription:
      "Organize sacramental records, certificates where supported, and parish-controlled verification links aligned with your registers.",
    h1: "Sacramental registers and certificates",
    intro:
      "Sacramental books are among the most valuable records a parish keeps. Search, maintain entries, and produce certificates where your workflow supports them—without exposing private registers to the public web.",
    limitations:
      "Certificate verification links are parish-controlled and token-based; EkklesiaNexus does not publish a public directory of all sacramental records.",
    itemIds: ["sacraments", "certificates"],
    relatedSlugs: ["mass-intentions", "member-management"],
  },
  "mass-intentions": {
    slug: "mass-intentions",
    path: "/features/mass-intentions",
    seoTitle: "Mass and Mass intentions — EkklesiaNexus",
    seoDescription:
      "Coordinate Mass schedules and intentions with records that stay connected to parish worship administration.",
    h1: "Masses and intentions",
    intro:
      "Sacristans and administrators need a clear view of upcoming celebrations and intention activity. Keep worship records organized alongside the rest of parish administration.",
    limitations:
      "Mass intentions are office workflows for staff; online parishioner payments for intentions are not part of this marketing scope.",
    itemIds: ["mass"],
    relatedSlugs: ["sacramental-registers", "church-analytics"],
  },
  "ministries-and-groups": {
    slug: "ministries-and-groups",
    path: "/features/ministries-and-groups",
    seoTitle: "Ministries, associations, and BCCs — EkklesiaNexus",
    seoDescription:
      "Organize ministries, associations, and Life Groups / Basic Christian Communities (BCCs) with membership and leadership context.",
    h1: "Ministries, associations, and Life Groups / BCCs",
    intro:
      "Parish community life spans councils, ministries, and neighborhood faith communities. Keep membership and leadership visible next to families and members.",
    limitations:
      "Ministry and BCC records support parish coordination—not volunteer scheduling suites or consumer group chat apps.",
    itemIds: ["ministries", "bcc"],
    relatedSlugs: ["family-management", "member-management"],
  },
  "stewardship-and-finance": {
    slug: "stewardship-and-finance",
    path: "/features/stewardship-and-finance",
    seoTitle: "Church stewardship and finance records — EkklesiaNexus",
    seoDescription:
      "Record collections, contribution plans, dues, projects, and campaigns in a parish stewardship workspace built for treasurers and secretaries.",
    h1: "Stewardship collections and parish finance records",
    intro:
      "Stewardship work is family-first: treasurers answer questions, issue receipts, and follow outstanding balances with records that respect tenant isolation and parish roles.",
    limitations:
      "Stewardship features record parish office collections and expenses; they are not an advertised UPI, card, or parishioner mobile-giving gateway.",
    itemIds: ["donations", "plans", "projects"],
    relatedSlugs: ["family-management", "church-analytics"],
  },
  "church-analytics": {
    slug: "church-analytics",
    path: "/features/church-analytics",
    seoTitle: "Parish reports and dashboards — EkklesiaNexus",
    seoDescription:
      "Turn parish records you already maintain into reports and dashboards for leadership review—tenant-scoped, role-gated, without invented analytics claims.",
    h1: "Reports from records you already keep",
    intro:
      "Leadership meetings go smoother when figures come from the same registers your team stewards daily. Reports and exports respect permissions; they are not a substitute for parish judgment.",
    limitations:
      "Reports reflect tenant-scoped parish data you already maintain; there is no AI, predictive analytics, or cross-parish BI platform.",
    itemIds: ["reports", "exports"],
    relatedSlugs: ["stewardship-and-finance", "mass-intentions"],
  },
};
