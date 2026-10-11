import type { FeatureCategory } from "@/types/marketing";

export const featureCategoriesContent: FeatureCategory[] = [
  {
    id: "people",
    title: "People & Community",
    items: [
      {
        id: "families",
        categoryId: "people",
        title: "Families",
        description:
          "Families is your centralized register of parish households, bringing together members, contact details, community relationships, and relevant stewardship context. Administrators can maintain family information in one organized place, making it easier to keep parish records current and provide better pastoral support.",
      },
      {
        id: "members",
        categoryId: "people",
        title: "Members",
        description:
          "Member profiles connect individuals to families, sacraments, ministries, and stewardship information your parish already maintains. Secretaries and administrators can find the right context quickly during office visits and phone calls without searching separate lists.",
      },
      {
        id: "ministries",
        categoryId: "people",
        title: "Ministries & Associations",
        description:
          "Organize ministries, associations, councils, and parish organizations with membership, leadership terms, and history. Pastors and coordinators gain a clearer picture of who serves and how each group fits parish life.",
      },
      {
        id: "bcc",
        categoryId: "people",
        title: "Life Groups / Basic Christian Communities (BCCs)",
        description:
          "Life Groups are managed as Basic Christian Communities (BCCs)—small faith communities within the parish roll. Assign families, see leadership, and keep neighborhood-level community life visible alongside families and members.",
      },
      {
        id: "leadership",
        categoryId: "people",
        title: "Parish Leadership",
        description:
          "Parish leadership records help you know who serves now, who served before, and how appointments change across clergy, staff, ministries, and associations. Continuity becomes easier when leadership information lives in one organized place.",
      },
    ],
  },
  {
    id: "pastoral",
    title: "Pastoral & Sacramental",
    items: [
      {
        id: "sacraments",
        categoryId: "pastoral",
        title: "Sacraments",
        description:
          "Sacramental records are among the most valuable registers a parish maintains. EkklesiaNexus helps you organize baptisms, confirmations, marriages, and other sacramental entries with search, detail views, and certificates where your parish workflow supports them.",
      },
      {
        id: "certificates",
        categoryId: "pastoral",
        title: "Certificates & Verification",
        description:
          "Generate and manage sacramental certificates where supported, and use public certificate verification when your parish enables it. Families receive trustworthy documentation while administrators keep production aligned with parish records.",
      },
      {
        id: "mass",
        categoryId: "pastoral",
        title: "Mass & Mass Intentions",
        description:
          "Coordinate Mass schedules, intentions, and related worship administration. Sacristans and administrators can review upcoming celebrations and intention activity with records that stay connected to parish worship life.",
      },
    ],
  },
  {
    id: "stewardship",
    title: "Stewardship",
    items: [
      {
        id: "donations",
        categoryId: "stewardship",
        title: "Donations & Contributions",
        description:
          "Record collections, issue receipts, and review contribution activity in a workspace built for parish stewardship. Treasurers can answer family questions and prepare council summaries from organized records instead of scattered notebooks.",
      },
      {
        id: "plans",
        categoryId: "stewardship",
        title: "Contribution Plans & Dues",
        description:
          "Contribution plans and outstanding dues help parishes follow up with clarity. See what is pledged, what is received, and what still needs attention—supporting calm stewardship conversations with families.",
      },
      {
        id: "projects",
        categoryId: "stewardship",
        title: "Projects, Installments & Campaigns",
        description:
          "Dedicated projects and campaigns keep special fundraising organized with progress visibility. Installments honor families who give over time while leadership reviews remaining commitments together.",
      },
    ],
  },
  {
    id: "admin",
    title: "Administration",
    items: [
      {
        id: "dashboard",
        categoryId: "admin",
        title: "Dashboard",
        description:
          "The parish dashboard offers a connected starting point for administrators—highlighting celebrations, stewardship health, Mass intentions, and operational items that deserve attention today. Leaders open one screen instead of jumping between registers when the office day begins.",
      },
      {
        id: "users",
        categoryId: "admin",
        title: "Users, Roles & Permissions",
        description:
          "Mirror real parish responsibilities with custom roles so sacristans, secretaries, and stewardship volunteers see what they need—without opening sensitive areas unnecessarily. Permissions stay aligned with how your parish already divides pastoral, financial, and administrative work.",
      },
      {
        id: "church-profile",
        categoryId: "admin",
        title: "Church Settings & Profile",
        description:
          "Maintain parish identity—name, contact, logo, leadership, and settings—so EkklesiaNexus reflects the church your community knows and trusts. Updates in Church Profile flow through the experience your staff and volunteers use every day.",
      },
    ],
  },
  {
    id: "insights",
    title: "Insights",
    items: [
      {
        id: "reports",
        categoryId: "insights",
        title: "Reports & Dashboards",
        description:
          "Turn records you already maintain into organized reports and dashboards for monthly review, stewardship follow-up, and leadership meetings—without assembling figures from separate registers by hand. Reports draw from the same tenant-scoped data your parish already stewards in EkklesiaNexus.",
      },
      {
        id: "exports",
        categoryId: "insights",
        title: "Supported Exports",
        description:
          "Where your parish role includes data export, authorized administrators can produce portable archives aligned with parish governance—keeping information accessible for planning and continuity. Exports respect the permissions your parish assigns; they are not a back door around tenant isolation.",
      },
    ],
  },
];
