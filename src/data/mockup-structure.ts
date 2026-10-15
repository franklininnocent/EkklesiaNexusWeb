/** Structural mockup data (non-translatable ids, tones, assets). Copy lives in message catalogs. */

export const NAV_SECTION_IDS = ["features", "solutions", "pricing", "demo", "contact"] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

export const FEATURE_ITEMS = [
  { id: "members", tone: "cyan" as const },
  { id: "giving", tone: "amber" as const },
  { id: "events", tone: "purple" as const },
  { id: "comms", tone: "sky" as const },
  { id: "groups", tone: "rose" as const },
  { id: "volunteers", tone: "indigo" as const },
] as const;

export const SLIDER_ITEMS = [
  { id: "dashboard", frame: "emerald" as const },
  { id: "mobile", frame: "rose" as const },
  {
    id: "familyFinancial",
    frame: "emerald" as const,
    image: "/images/product/familyfinancialDashboard12.png",
  },
  { id: "calendar", frame: "purple" as const },
  { id: "insights", frame: "cyan" as const },
] as const;

export const TECH_ITEMS = [{ id: "next" }, { id: "perf" }, { id: "ui" }] as const;

export const TESTIMONIAL_ROW_ITEMS = [
  { key: "namoBarnes", tone: 200, imageSrc: "/images/testimonials/namo-barnes.png" },
  { key: "marcusHale", tone: 24, imageSrc: "/images/testimonials/marcus-hale.png" },
  { key: "jaraphWilson", tone: 160, imageSrc: "/images/testimonials/jaraph-wilson.png" },
  { key: "elenaBrooks", tone: 280, imageSrc: "/images/testimonials/elena-brooks.png" },
  { key: "priyaMenon", tone: 48, imageSrc: "/images/testimonials/priya-menon.png" },
  { key: "thomasOkonkwo", tone: 132, imageSrc: "/images/testimonials/thomas-okonkwo.png" },
  { key: "claireDsouza", tone: 248, imageSrc: "/images/testimonials/claire-dsouza.png" },
] as const;

export const TESTIMONIAL_CARD_ITEMS = [
  { key: "jasonRamos", tone: 210 },
  { key: "jessenDillon", tone: 32 },
  { key: "desteniRobins", tone: 265 },
] as const;

export type DevicePersonKey =
  | "anthonyGeorge"
  | "mariaGeorge"
  | "danielGeorge"
  | "elenaGeorge"
  | "sofiaGeorge";

export const DEVICE_COMMUNITY_LEADER_KEYS = [
  "leaderFrancisMathew",
  "leaderAnnaThomas",
  "leaderJosephGeorge",
] as const;

export const DEVICE_FAMILY_NAV: ReadonlyArray<{
  personKey: DevicePersonKey;
  roleKey: "familyHead" | "spouse" | "son" | "daughter";
  tone: number;
  active?: boolean;
}> = [
  { personKey: "anthonyGeorge", roleKey: "familyHead", tone: 1, active: true },
  { personKey: "mariaGeorge", roleKey: "spouse", tone: 3 },
  { personKey: "danielGeorge", roleKey: "son", tone: 0 },
  { personKey: "elenaGeorge", roleKey: "daughter", tone: 5 },
  { personKey: "sofiaGeorge", roleKey: "daughter", tone: 2 },
];

export const DEVICE_FAMILY_CARDS: ReadonlyArray<{
  personKey: DevicePersonKey;
  roleKey: "headOfHousehold" | "spouse" | "son" | "daughter";
  metaKey: "anthony" | "maria" | "daniel" | "elena";
  tone: number;
}> = [
  { personKey: "anthonyGeorge", roleKey: "headOfHousehold", metaKey: "anthony", tone: 1 },
  { personKey: "mariaGeorge", roleKey: "spouse", metaKey: "maria", tone: 3 },
  { personKey: "danielGeorge", roleKey: "son", metaKey: "daniel", tone: 0 },
  { personKey: "elenaGeorge", roleKey: "daughter", metaKey: "elena", tone: 5 },
];

export const PRICING_PLANS = [
  {
    id: "seed",
    name: "Starter",
    tone: "seed" as const,
    featured: false,
    limits: [
      { labelKey: "limitsPeople", value: "250" },
      { labelKey: "limitsStaff", value: "2" },
      { labelKey: "limitsStorage", value: "5120" },
    ],
    featureKeys: [
      "churchProfile",
      "rolesPermissions",
      "notifications",
      "contributions",
      "familyRecords",
      "memberRecords",
      "sacramentRecords",
      "basicReports",
    ] as const,
  },
  {
    id: "growth",
    name: "Standard",
    badgeKey: "badgeMostPopular",
    tone: "growth" as const,
    featured: true,
    includesKey: "includesStarter",
    limits: [
      { labelKey: "limitsPeople", value: "1,000" },
      { labelKey: "limitsStaff", value: "5" },
      { labelKey: "limitsStorage", value: "20,480" },
    ],
    featureKeys: [
      "advancedRoles",
      "auditLog",
      "export",
      "contributionPlans",
      "financialDashboard",
      "churchLeadership",
      "ministriesAssociations",
      "advancedDashboards",
    ] as const,
  },
  {
    id: "summit",
    name: "Professional",
    tone: "summit" as const,
    featured: false,
    includesKey: "includesStandard",
    limits: [
      { labelKey: "limitsPeople", value: "2,500" },
      { labelKey: "limitsStaff", value: "10" },
      { labelKey: "limitsStorage", value: "25,600" },
    ],
    featureKeys: [
      "multipleWorkflows",
      "advancedCommunication",
      "advancedFinancialReporting",
      "advancedMinistryManagement",
      "massIntentions",
      "advancedAnalytics",
    ] as const,
  },
] as const;

/** Footer page links are hidden in the live mockup footer; routes remain available via direct URL. */
export const FOOTER_LINKS = [] as const;
