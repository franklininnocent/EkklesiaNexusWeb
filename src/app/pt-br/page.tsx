import type { Metadata } from "next";
import { MockupPage } from "@/components/mockup/mockup-page";
import { getMarketingContentAsync } from "@/lib/marketing/get-content";
import { buildLocalizedHomeMetadata } from "@/lib/marketing/localized-metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMarketingContentAsync();
  return buildLocalizedHomeMetadata(content, "pt-BR");
}

export default function PortugueseHomePage() {
  return <MockupPage />;
}
