/**
 * Generates docs/i18n/review-matrix.md from en-US / pt-BR catalogs and src references.
 * Run: npm run generate:review-matrix
 */
import fs from "node:fs";
import path from "node:path";

type JsonTree = Record<string, unknown>;

const ROOT = path.join(process.cwd());
const MESSAGES = path.join(ROOT, "src/messages");
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "docs/i18n/review-matrix.md");

function flattenKeys(tree: JsonTree, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(tree)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flattenKeys(value as JsonTree, full));
    } else if (typeof value === "string") {
      keys.push(full);
    }
  }
  return keys.sort();
}

function getAt(tree: JsonTree, key: string): string {
  const parts = key.split(".");
  let current: unknown = tree;
  for (const part of parts) {
    current = (current as JsonTree)[part];
  }
  return current as string;
}

function collectSourceFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      collectSourceFiles(full, acc);
    } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

const PREFIX_SOURCE: Array<{ prefix: string; source: string; rationale: string; uiFit: string }> = [
  { prefix: "common.", source: "Mockup CTAs, contact, pricing", rationale: "Shared UI chrome; Brazilian você tone", uiFit: "Buttons, labels, loading states" },
  { prefix: "navigation.", source: "src/components/mockup/header.tsx", rationale: "Primary nav; Recursos not características", uiFit: "Header + mobile drawer" },
  { prefix: "footer.", source: "src/components/mockup/footer.tsx", rationale: "Legal links + copyright", uiFit: "Footer column" },
  { prefix: "a11y.", source: "Header, contact, slider, language-switcher", rationale: "Screen reader strings; not visible copy", uiFit: "aria-label / landmarks" },
  { prefix: "home.hero.", source: "src/components/mockup/hero.tsx", rationale: "Hero value prop + CTA", uiFit: "Above-the-fold hero" },
  { prefix: "home.trust.", source: "src/components/mockup/trust.tsx", rationale: "Trust strip", uiFit: "Narrow band under hero" },
  { prefix: "home.features.", source: "src/components/mockup/features.tsx", rationale: "Feature grid; pastoral product language", uiFit: "Feature cards" },
  { prefix: "home.slider.", source: "src/components/mockup/slider.tsx", rationale: "Product showcase slides; CEB/BCC review item", uiFit: "Slider headings + device mocks" },
  { prefix: "home.tech.", source: "src/components/mockup/tech.tsx", rationale: "Security/performance pillars", uiFit: "Icon grid" },
  { prefix: "home.testimonials.", source: "src/components/mockup/testimonials.tsx", rationale: "Quotes; person names unchanged", uiFit: "Testimonial cards" },
  { prefix: "home.pricing.", source: "src/components/mockup/pricing.tsx", rationale: "Plan names English; descriptions transcreated", uiFit: "Pricing section + comparison" },
  { prefix: "home.cta.", source: "src/components/mockup/cta.tsx", rationale: "Mid-page CTA band", uiFit: "Full-width CTA" },
  { prefix: "home.contact.", source: "src/components/mockup/contact.tsx", rationale: "Contact section headings", uiFit: "Contact form intro" },
  { prefix: "home.devices.", source: "src/components/mockup/devices.tsx", rationale: "Decorative mock UI only", uiFit: "Hero/slider device screenshots" },
  { prefix: "forms.contact.", source: "contact.tsx, contact-form-validation.ts, contact-enquiries route", rationale: "Live contact form + BFF validation", uiFit: "Form labels, errors, success" },
  { prefix: "forms.demo.", source: "demo-requests route, demo-form.tsx fallbacks", rationale: "Demo BFF only (legacy form partial)", uiFit: "API messages" },
  { prefix: "forms.bff.", source: "src/app/api/* BFF routes", rationale: "Safe mapped API responses", uiFit: "Toast / alert text" },
  { prefix: "legal.", source: "src/components/legal/legal-document-page.tsx", rationale: "Placeholder legal; no new claims", uiFit: "Privacy / terms pages" },
  { prefix: "errors.", source: "src/app/not-found.tsx, error.tsx", rationale: "Error boundaries", uiFit: "404 / error pages" },
  { prefix: "seo.", source: "localized-metadata, layout, sitemap", rationale: "Metadata + JSON-LD language fields", uiFit: "Head tags, not body" },
];

function defaultMeta(key: string): { source: string; rationale: string; uiFit: string } {
  const row = PREFIX_SOURCE.find((p) => key.startsWith(p.prefix));
  if (row) {
    return { source: row.source, rationale: row.rationale, uiFit: row.uiFit };
  }
  return { source: "src/messages (see grep)", rationale: "Catalog string", uiFit: "Site UI" };
}

const BRAND_LITERALS = new Set([
  "EkklesiaNexus",
  "Starter",
  "Standard",
  "Professional",
  "Francis",
  "Francis Mathew",
  "Anna Thomas",
  "Joseph George",
  "Anthony George",
  "Maria George",
  "Daniel George",
  "Elena George",
  "Sofia George",
  "George",
]);

function reviewStatus(key: string, en: string, pt: string): string {
  if (en === pt && (BRAND_LITERALS.has(en) || en.includes("EkklesiaNexus") && en === pt)) {
    return "FIXED AND VERIFIED";
  }
  if (key.startsWith("seo.") && en === pt && /EkklesiaNexus/.test(en)) {
    return "IMPLEMENTED — HUMAN REVIEW REQUIRED";
  }
  if (en === pt && /^[A-Za-z0-9 .,&'’/+()-]+$/.test(en) && en.length < 48) {
    if (["Starter", "Standard", "Professional"].some((p) => en.includes(p))) {
      return "FIXED AND VERIFIED";
    }
  }
  return "IMPLEMENTED — HUMAN REVIEW REQUIRED";
}

function escapeCell(s: string): string {
  return s.replace(/\|/g, "\\|").replace(/\n/g, " ").replace(/\r/g, "");
}

function main(): void {
  const en = JSON.parse(fs.readFileSync(path.join(MESSAGES, "en-US.json"), "utf8")) as JsonTree;
  const pt = JSON.parse(fs.readFileSync(path.join(MESSAGES, "pt-BR.json"), "utf8")) as JsonTree;
  const keys = flattenKeys(en);

  const files = collectSourceFiles(SRC);
  const fileContents = files.map((f) => ({
    rel: path.relative(ROOT, f).replace(/\\/g, "/"),
    text: fs.readFileSync(f, "utf8"),
  }));

  function findSources(key: string): string {
    const found: string[] = [];
    const quoted = `"${key}"`;
    const ticked = `'${key}'`;
    for (const { rel, text } of fileContents) {
      if (text.includes(quoted) || text.includes(ticked)) {
        found.push(rel);
      }
    }
    if (found.length === 0) {
      const parent = key.split(".").slice(0, -1).join(".");
      if (parent) {
        for (const { rel, text } of fileContents) {
          if (text.includes(`\`${parent}.`) || text.includes(`"${parent}.`)) {
            if (!found.includes(rel)) found.push(rel);
          }
        }
      }
    }
    if (found.length === 0) {
      return defaultMeta(key).source;
    }
    return found.slice(0, 3).join("; ");
  }

  const generatedAt = new Date().toISOString().slice(0, 10);
  const lines: string[] = [
    "# i18n review matrix (EkklesiaNexusWeb)",
    "",
    `Generated: ${generatedAt} — **${keys.length}** catalog keys (\`en-US\` / \`pt-BR\`). Regenerate with \`npm run generate:review-matrix\` after catalog changes.`,
    "",
    "Statuses: `FIXED AND VERIFIED` | `IMPLEMENTED — HUMAN REVIEW REQUIRED` | `IMPLEMENTED — DEPLOYMENT REQUIRED` | `OPEN` | `BLOCKED`.",
    "",
    "Portuguese copy must not be treated as legally or pastorally approved until a qualified reviewer updates this matrix.",
    "",
    "| Key | Source (primary) | English | Portuguese (pt-BR) | Rationale | UI fit | Status |",
    "| --- | --- | --- | --- | --- | --- | --- |",
  ];

  for (const key of keys) {
    const enVal = getAt(en, key);
    const ptVal = getAt(pt, key);
    const meta = defaultMeta(key);
    const source = findSources(key);
    const status = reviewStatus(key, enVal, ptVal);
    lines.push(
      `| \`${key}\` | ${escapeCell(source)} | ${escapeCell(enVal)} | ${escapeCell(ptVal)} | ${escapeCell(meta.rationale)} | ${escapeCell(meta.uiFit)} | ${status} |`,
    );
  }

  lines.push("");
  lines.push("## Summary");
  lines.push("");
  const counts: Record<string, number> = {};
  for (const key of keys) {
    const s = reviewStatus(key, getAt(en, key), getAt(pt, key));
    counts[s] = (counts[s] ?? 0) + 1;
  }
  for (const [status, count] of Object.entries(counts).sort()) {
    lines.push(`- **${status}**: ${count}`);
  }
  lines.push("");

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, lines.join("\n"), "utf8");
  console.log(`Wrote ${OUT} (${keys.length} rows)`);
}

main();
