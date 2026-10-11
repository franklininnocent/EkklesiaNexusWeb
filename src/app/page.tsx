import type { Metadata } from "next";
import { MockupPage } from "@/components/mockup/mockup-page";
import { getMarketingContentAsync } from "@/lib/marketing/get-content";
import { buildPageMetadata, getHomePageSeo, resolveMarketingSeo } from "@/lib/marketing/seo-metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMarketingContentAsync();
  const home = getHomePageSeo(content);
  const seo = resolveMarketingSeo(content);
  return buildPageMetadata(home, seo);
}

export default async function HomePage() {
  return <MockupPage />;
}
