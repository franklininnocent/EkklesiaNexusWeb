import { safeJsonLdStringify } from "@/lib/marketing/json-ld-safe";
import { siteConfig } from "@/config/site";

export type BreadcrumbItem = { name: string; path: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const base = siteConfig.url.replace(/\/$/, "");
  const graph = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? `${base}/` : `${base}${item.path}`,
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(graph) }} />
  );
}
