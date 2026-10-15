import fs from "node:fs";
import path from "node:path";
import { marketingCopyContract } from "@/content/contract";
import type { MarketingContent } from "@/types/marketing";

const PROHIBITED_PATTERNS: RegExp[] = [
  /\battendance\b/i,
  /\bmobile app\b/i,
  /\bmobile giving\b/i,
  /\bvolunteer management\b/i,
  /\bevent calendar\b/i,
  /\bgroup portal\b/i,
  /\btestimonial\b/i,
  /\b5 stars?\b/i,
  /\bpricing\b/i,
  /\bsubscription plan\b/i,
  /\bbuilt with next\.js\b/i,
  /\blocalhost\b/i,
  /\b127\.0\.0\.1\b/i,
  /\bAI-powered\b/i,
  /\bmachine learning\b/i,
];

const REQUIRED_TOP_LEVEL_KEYS = [
  "site",
  "navigation",
  "hero",
  "valueStrip",
  "why",
  "church360",
  "featureCategories",
  "solutions",
  "reports",
  "workflow",
  "advantages",
  "audiences",
  "finalCta",
  "screenshots",
  "footer",
] as const;

function countSentences(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/(?<=[.!?])\s+/).filter((s) => s.length > 0).length;
}

function assertUniqueIds(ids: string[], label: string, errors: string[]): void {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) errors.push(`Duplicate id "${id}" in ${label}`);
    seen.add(id);
  }
}

export function scanProhibitedMarketingText(text: string, label = "content"): string[] {
  const errors: string[] = [];
  for (const pattern of PROHIBITED_PATTERNS) {
    if (pattern.test(text)) {
      errors.push(`Prohibited pattern ${pattern} in ${label}`);
    }
  }
  return errors;
}

export function validateMarketingContentStructure(content: MarketingContent): string[] {
  const errors: string[] = [];
  const { site, hero } = content;

  if (site.slogan !== marketingCopyContract.slogan) {
    errors.push("site.slogan does not match marketingCopyContract.slogan");
  }
  if (site.supportingLine !== marketingCopyContract.supportingLine) {
    errors.push("site.supportingLine does not match marketingCopyContract.supportingLine");
  }
  if (site.tagline !== marketingCopyContract.supportingLine) {
    errors.push("site.tagline must equal supportingLine");
  }
  if (hero.title !== marketingCopyContract.slogan) {
    errors.push("hero.title must equal contract slogan (H1)");
  }
  if (hero.supportingLine !== marketingCopyContract.supportingLine) {
    errors.push("hero.supportingLine must equal contract supporting line");
  }

  for (const category of content.featureCategories) {
    for (const item of category.items) {
      if (item.categoryId !== category.id) {
        errors.push(`Feature "${item.id}" categoryId mismatch`);
      }
      const sentences = countSentences(item.description);
      if (sentences < 2 || sentences > 4) {
        errors.push(
          `Feature "${item.id}" description should be 2–4 sentences (found ${sentences})`,
        );
      }
    }
    assertUniqueIds(
      category.items.map((i) => i.id),
      `features.${category.id}`,
      errors,
    );
  }

  for (const item of content.advantages) {
    const sentences = countSentences(item.description);
    if (sentences < 2 || sentences > 6) {
      errors.push(
        `Advantage "${item.id}" description should be 2–6 sentences (found ${sentences})`,
      );
    }
  }
  assertUniqueIds(content.advantages.map((a) => a.id), "advantages", errors);

  const activeShots = content.screenshots;
  assertUniqueIds(activeShots.map((s) => s.id), "screenshots", errors);

  const publicDir = path.join(process.cwd(), "public");
  for (const shot of activeShots) {
    const imagePath = shot.image.startsWith("/") ? shot.image.slice(1) : shot.image;
    const onDisk = path.join(publicDir, imagePath);
    if (!fs.existsSync(onDisk)) {
      errors.push(`Screenshot "${shot.id}" missing file public/${imagePath}`);
    }
  }

  const navHrefs = new Set(content.navigation.map((n) => n.href));
  const expectedAnchors = ["#features", "#solutions", "#pricing", "#demo", "#contact"];
  for (const href of expectedAnchors) {
    if (!navHrefs.has(href)) {
      errors.push(`Navigation missing expected anchor ${href}`);
    }
  }

  if (content.advantages.length !== 11) {
    errors.push(`Expected 11 advantage cards, found ${content.advantages.length}`);
  }

  if (!JSON.stringify(content).includes("Basic Christian")) {
    errors.push("Content must mention Basic Christian Communities for BCC terminology");
  }

  return errors;
}

/** Validate unknown CMS/API JSON before rendering. */
export function validateMarketingContentPayload(data: unknown): string[] {
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    return ["Payload must be a MarketingContent object"];
  }

  const record = data as Record<string, unknown>;
  const errors: string[] = [];

  for (const key of REQUIRED_TOP_LEVEL_KEYS) {
    if (!(key in record)) {
      errors.push(`Missing required key: ${key}`);
    }
  }

  if (errors.length > 0) {
    return errors;
  }

  errors.push(...scanProhibitedMarketingText(JSON.stringify(data), "CMS payload"));

  return [...errors, ...validateMarketingContentStructure(data as MarketingContent)];
}
