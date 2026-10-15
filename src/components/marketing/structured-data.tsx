import type { AppLocale } from "@/lib/i18n/locale";
import type { MarketingContent } from "@/types/marketing";
import { buildStructuredDataGraph } from "@/lib/marketing/seo-metadata";

export function StructuredData({ content, locale }: { content: MarketingContent; locale: AppLocale }) {
  const graph = buildStructuredDataGraph(content, locale);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
