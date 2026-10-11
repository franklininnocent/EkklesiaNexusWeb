import type { MarketingContent } from "@/types/marketing";
import { buildStructuredDataGraph } from "@/lib/marketing/seo-metadata";

export function StructuredData({ content }: { content: MarketingContent }) {
  const graph = buildStructuredDataGraph(content);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
