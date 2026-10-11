import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type LegalPath = "/privacy" | "/terms";

export function legalPageMetadata(path: LegalPath, title: string): Metadata {
  const base = siteConfig.url.replace(/\/$/, "");
  const slug = path === "/privacy" ? "Privacy" : "Terms";

  return {
    title,
    description: `${slug} information for the EkklesiaNexus marketing website. Placeholder pending legal review.`,
    alternates: { canonical: `${base}${path}` },
    robots: { index: false, follow: false },
    openGraph: {
      title,
      url: `${base}${path}`,
      type: "website",
    },
  };
}
