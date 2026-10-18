import type { CtaLink } from "@/types/marketing";
import { marketingCopyContract } from "@/content/contract";

export const heroContent = {
  title: marketingCopyContract.slogan,
  supportingLine: marketingCopyContract.supportingLine,
  description: marketingCopyContract.slogan,
  image: "/images/product/dashboard.png",
  imageAlt: "EkklesiaNexus parish dashboard showing connected parish overview",
  ctas: [
    { label: "Request a Demo", href: "#contact", variant: "primary" as const },
    { label: "Explore the Platform", href: "#product", variant: "secondary" as const },
    { label: "Talk to Our Team", href: "#contact", variant: "ghost" as const },
  ] satisfies CtaLink[],
};
