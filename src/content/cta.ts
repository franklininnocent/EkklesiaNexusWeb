import type { CtaLink } from "@/types/marketing";
import { marketingFooterStatement } from "@/content/contract";

export const whyContent = {
  title: "Why EkklesiaNexus",
  paragraphs: [
    "Parish administration often spreads across registers, spreadsheets, and memory. Families, sacraments, stewardship, ministries, and worship each carry important information—but when those records live in disconnected places, follow-up slows and leadership lacks a clear picture.",
    "EkklesiaNexus is built to connect what matters: households and members, pastoral records, stewardship, parish communities, Mass, projects, campaigns, and reports—in one experience designed for church life.",
    "The result is calmer everyday administration, better visibility for leadership, and a parish team that can focus on people instead of reconstructing data.",
  ],
};

export const church360Content = {
  title: "Complete 360° Church Management",
  subtitle: "Everything important to your church, connected in one experience.",
  areas: [
    "Families",
    "Members",
    "Sacraments",
    "Stewardship",
    "Ministries",
    "Life Groups / BCCs",
    "Leadership",
    "Mass",
    "Reports",
    "Administration",
  ],
};

export const finalCtaContent = {
  title: "Ready to see EkklesiaNexus in action?",
  description:
    "Request a demo and explore how your parish can manage families, sacraments, stewardship, ministries, worship, and reports in one connected Church Management System.",
  ctas: [
    { label: "Request a Demo", href: "#contact", variant: "primary" as const },
    { label: "Explore the Platform", href: "#product", variant: "secondary" as const },
  ] satisfies CtaLink[],
};

export const footerContent = {
  statement: marketingFooterStatement(),
  links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};
