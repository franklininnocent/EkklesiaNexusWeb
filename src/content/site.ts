import type { SiteConfig } from "@/types/marketing";
import { marketingCopyContract } from "@/content/contract";

export const siteContent: SiteConfig = {
  name: "EkklesiaNexus",
  tagline: marketingCopyContract.supportingLine,
  slogan: marketingCopyContract.slogan,
  supportingLine: marketingCopyContract.supportingLine,
  seoTitle: "EkklesiaNexus — The Next Generation of Church Management System",
  seoDescription:
    "EkklesiaNexus is church management software for parish teams—families, sacramental registers, stewardship, ministries, Mass intentions, and reports in one connected platform.",
};
