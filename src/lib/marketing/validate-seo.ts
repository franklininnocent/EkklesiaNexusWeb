import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const FORBIDDEN_JSON_LD = [
  /AggregateRating/i,
  /"@type"\s*:\s*"Review"/,
  /"@type"\s*:\s*"Offer"/,
  /"@type"\s*:\s*"Product"/,
];

export function validateMarketingSeo(): string[] {
  const errors: string[] = [];

  const layoutPath = path.join(ROOT, "src/app/layout.tsx");
  const layout = fs.readFileSync(layoutPath, "utf8");
  const seoMetaPath = path.join(ROOT, "src/lib/marketing/seo-metadata.ts");
  const seoMeta = fs.readFileSync(seoMetaPath, "utf8");

  for (const pattern of FORBIDDEN_JSON_LD) {
    if (pattern.test(layout) || pattern.test(seoMeta)) {
      errors.push(`Forbidden JSON-LD pattern in marketing SEO: ${pattern}`);
    }
  }

  if (!layout.includes("StructuredData") || !seoMeta.includes("Organization")) {
    errors.push("Structured data must include Organization via seo-metadata");
  }

  const legalMeta = fs.readFileSync(
    path.join(ROOT, "src/lib/marketing/legal-metadata.ts"),
    "utf8",
  );
  const privacy = fs.readFileSync(path.join(ROOT, "src/app/privacy/page.tsx"), "utf8");
  const terms = fs.readFileSync(path.join(ROOT, "src/app/terms/page.tsx"), "utf8");

  if (!/index:\s*false/.test(legalMeta)) {
    errors.push("legal-metadata.ts must set robots.index false for legal pages");
  }
  if (!privacy.includes("legalPageMetadata")) {
    errors.push("Privacy page must use legalPageMetadata()");
  }
  if (!terms.includes("legalPageMetadata")) {
    errors.push("Terms page must use legalPageMetadata()");
  }

  const sitemap = fs.readFileSync(path.join(ROOT, "src/app/sitemap.ts"), "utf8");
  if (/privacy|terms/.test(sitemap)) {
    errors.push("Sitemap must not list noindex legal pages until legal approves indexing");
  }
  if (!/indexableSitemapEntries|getMarketingContentAsync/.test(sitemap)) {
    errors.push("Sitemap must derive URLs from published SEO configuration");
  }
  if (/changeFrequency|priority:/.test(sitemap)) {
    errors.push("Sitemap must not set changeFrequency or priority without reliable values");
  }

  const robots = fs.readFileSync(path.join(ROOT, "src/app/robots.ts"), "utf8");
  if (!robots.includes("sitemap:")) {
    errors.push("robots.ts must reference sitemap.xml");
  }
  if (!robots.includes('disallow: ["/api/"]')) {
    errors.push("robots.ts must disallow /api/ so form endpoints stay out of the index");
  }

  const brand = fs.readFileSync(path.join(ROOT, "src/config/brand.ts"), "utf8");
  const requiredBrand = [
    'productName: "EkklesiaNexus"',
    'rootDomain: "ekklesianexus.com"',
    'websiteUrl: "https://ekklesianexus.com"',
    'applicationUrl: "https://app.ekklesianexus.com"',
    'apiUrl: "https://api.ekklesianexus.com"',
    'contactEmail: "contact@ekklesianexus.com"',
  ];
  for (const token of requiredBrand) {
    if (!brand.includes(token)) {
      errors.push(`Official brand config is missing ${token}`);
    }
  }

  if (!seoMeta.includes("contactPoint") || !seoMeta.includes("officialBrand.contactEmail")) {
    errors.push("Structured data must publish the official organization contact email");
  }
  if (!seoMeta.includes("alternates") || !seoMeta.includes("canonical")) {
    errors.push("Page metadata must set a canonical URL");
  }

  const proxy = fs.readFileSync(path.join(ROOT, "src/proxy.ts"), "utf8");
  if (!proxy.includes("officialBrand.rootDomain") || !proxy.includes("301")) {
    errors.push("proxy.ts must 301 www and HTTP on the official website host to the apex HTTPS origin");
  }

  const site = fs.readFileSync(path.join(ROOT, "src/config/site.ts"), "utf8");
  if (!site.includes("officialBrand.websiteUrl")) {
    errors.push("Production site URL must fall back to the official website");
  }

  const parishAppIndex = path.join(ROOT, "../EkklesiaNexusUi/src/index.html");
  if (fs.existsSync(parishAppIndex)) {
    const indexHtml = fs.readFileSync(parishAppIndex, "utf8");
    if (!indexHtml.includes('content="noindex, nofollow, noarchive"')) {
      errors.push("Parish application index.html must include noindex robots directives");
    }
    if (!indexHtml.includes("Sign in — EkklesiaNexus Parish Application")) {
      errors.push("Parish application index.html must use a distinct sign-in title");
    }
  }

  return errors;
}
