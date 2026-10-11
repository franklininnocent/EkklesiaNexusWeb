import type { SiteConfig } from "@/types/marketing";
import { marketingCopyContract } from "@/content/contract";

export const siteContent: SiteConfig = {
  name: "EkklesiaNexus",
  tagline: marketingCopyContract.supportingLine,
  slogan: marketingCopyContract.slogan,
  supportingLine: marketingCopyContract.supportingLine,
  seoTitle: "EkklesiaNexus — Next-Generation Church Management System",
  seoDescription:
    "EkklesiaNexus is a complete 360° Church Management System helping churches manage families, members, sacraments, stewardship, ministries, leadership, projects, reports, and more in one connected experience.",
};
