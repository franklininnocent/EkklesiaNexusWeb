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

export type FeatureDetailSection = {
  title: string;
  paragraphs: string[];
};

export type FeatureLandingSpec = {
  slug: FeatureSlug;
  path: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  limitations: string;
  detailSections?: FeatureDetailSection[];
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
    seoTitle: "Church family records for parishes — EkklesiaNexus",
    seoDescription:
      "Parish household and family records with relationships, sacramental links, and stewardship context—built for secretaries and pastors in one family-first register.",
    h1: "Family records for the parish office",
    intro:
      "Parish secretaries and pastors need household information that stays current. EkklesiaNexus keeps families, members, and related parish context together so office visits and pastoral follow-up take less searching.",
    limitations:
      "This is parish office software—not a member self-service portal, attendance system, or generic CRM.",
    detailSections: [
      {
        title: "Why household-first records matter",
        paragraphs: [
          "Catholic parish work is often family-centered: sacraments, stewardship, and pastoral care follow household relationships. A register that starts with families—not isolated name rows—matches how secretaries answer questions at the desk and on the phone.",
          "When members, ministries, and giving history connect to the household record, your team spends less time reconciling spreadsheets and more time serving people.",
        ],
      },
      {
        title: "Typical parish office uses",
        paragraphs: [
          "Update contact details after a move, confirm who belongs to a household before issuing a certificate request, or review stewardship context before a treasurer follows up on an outstanding balance—all from one connected family view.",
        ],
      },
    ],
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
    detailSections: [
      {
        title: "Members in parish context",
        paragraphs: [
          "A member record is most useful when it sits beside household relationships, sacramental history, ministry participation, and stewardship context your office already maintains. That is how secretaries answer “who is this?” during a phone call without opening three different lists.",
        ],
      },
      {
        title: "Who maintains member data",
        paragraphs: [
          "Authorized parish staff update profiles according to your roles and permissions. EkklesiaNexus is office software—not a self-service parishioner portal or a check-in kiosk product.",
        ],
      },
    ],
    itemIds: ["members"],
    relatedSlugs: ["family-management", "sacramental-registers"],
  },
  "sacramental-registers": {
    slug: "sacramental-registers",
    path: "/features/sacramental-registers",
    seoTitle: "Sacramental register software for Catholic parishes — EkklesiaNexus",
    seoDescription:
      "Maintain Catholic parish sacramental registers, generate certificates where supported, and use parish-controlled verification links—without publishing private books to the open web.",
    h1: "Sacramental registers and certificates",
    intro:
      "Sacramental books are among the most valuable records a parish keeps. Search, maintain entries, and produce certificates where your workflow supports them—without exposing private registers to the public web.",
    limitations:
      "Certificate verification links are parish-controlled and token-based; EkklesiaNexus does not publish a public directory of all sacramental records. Reconciliation certificate workflows are not marketed here.",
    detailSections: [
      {
        title: "Registers your parish stewards every day",
        paragraphs: [
          "Sacramental administration depends on accurate books: baptisms, confirmations, marriages, and related entries your staff is authorized to maintain. EkklesiaNexus supports sacramental record workflows in the parish application so searches and updates stay in one tenant-scoped system.",
        ],
      },
      {
        title: "Certificates and verification",
        paragraphs: [
          "Where your parish uses certificate generation in the product, staff can produce documents aligned with your internal process. Public verification uses token-based links your parish controls—it is not a searchable directory of sacramental data on the marketing site.",
        ],
      },
      {
        title: "What to expect during evaluation",
        paragraphs: [
          "Ask how your team searches historical entries, who may edit registers, and how certificates are issued today. Compare that workflow to a single parish office system rather than a generic membership database built for attendance check-in.",
        ],
      },
    ],
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
    detailSections: [
      {
        title: "Worship administration alongside registers",
        paragraphs: [
          "Sacristans and administrators coordinate Mass schedules and intention activity next to the sacramental and family records the parish stewards every day. The goal is fewer duplicate lists and clearer handoffs between worship and office staff.",
        ],
      },
      {
        title: "What to clarify during evaluation",
        paragraphs: [
          "Ask how your parish records intentions today, who may edit schedules, and whether online intention payments are required. EkklesiaNexus describes office workflows here—not a parishioner payment gateway for intentions.",
        ],
      },
    ],
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
      "Record parish collections, contribution plans, dues, projects, and campaigns in a family-first stewardship workspace for treasurers and secretaries—not a mobile giving app.",
    h1: "Stewardship collections and parish finance records",
    intro:
      "Stewardship work is family-first: treasurers answer questions, issue receipts, and follow outstanding balances with records that respect tenant isolation and parish roles.",
    limitations:
      "Stewardship features record parish office collections and expenses; they are not an advertised UPI, card, or parishioner mobile-giving gateway.",
    detailSections: [
      {
        title: "Office stewardship, not a payment gateway",
        paragraphs: [
          "Many search results mix church management with online giving platforms. EkklesiaNexus focuses on how your parish office records gifts, plans, dues, projects, and campaigns—and how treasurers answer family questions with consistent data.",
        ],
      },
      {
        title: "Plans, dues, and projects",
        paragraphs: [
          "Contribution plans, outstanding dues, donation projects, installments, and campaigns live in the donations module your staff already permissions by role. Marketing pricing on the homepage reflects subscription plans from the public catalog API; parish collection amounts come from your parish data, not hardcoded demo figures.",
        ],
      },
    ],
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
