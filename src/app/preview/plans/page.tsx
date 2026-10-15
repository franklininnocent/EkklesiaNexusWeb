import type { Metadata } from "next";
import { cookies } from "next/headers";
import { CatalogPricing } from "@/components/pricing/catalog-pricing";
import { fetchPreviewSession } from "@/lib/api/subscription-plans";
import { PREVIEW_COOKIE } from "@/lib/preview/preview-cookie";

export const metadata: Metadata = {
  title: "Plan catalog preview",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export const dynamic = "force-dynamic";

function PreviewUnavailable() {
  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <CatalogPricing
        title="Pricing Overview"
        plans={[]}
        previewBanner
        errorMessage="This preview is unavailable or has expired."
      />
    </main>
  );
}

export default async function PreviewPlansPage() {
  const session = (await cookies()).get(PREVIEW_COOKIE)?.value?.trim();
  if (!session) {
    return <PreviewUnavailable />;
  }

  const result = await fetchPreviewSession(session);
  if (!result.ok) {
    return <PreviewUnavailable />;
  }

  return (
    <main className="min-h-screen bg-white">
      <CatalogPricing title="Pricing Overview" plans={result.plans} previewBanner />
    </main>
  );
}
