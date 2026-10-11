import fs from "node:fs";
import path from "node:path";
import { getMarketingContent } from "@/lib/marketing/get-content";
import { scanProhibitedSeoText } from "@/lib/marketing/seo-prohibited";
import {
  scanProhibitedMarketingText,
  validateMarketingContentStructure,
} from "@/lib/marketing/validate-payload";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

function walkTsFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkTsFiles(full);
    if (entry.name.endsWith(".ts") && entry.name !== "contract.ts") return [full];
    return [];
  });
}

export function validateMarketingContentFiles(): string[] {
  const errors: string[] = [];

  for (const file of walkTsFiles(CONTENT_DIR)) {
    const text = fs.readFileSync(file, "utf8");
    const rel = path.relative(process.cwd(), file);
    if (rel.endsWith("navigation.ts")) {
      errors.push(...scanProhibitedSeoText(text, rel));
    } else {
      errors.push(...scanProhibitedMarketingText(text, rel));
    }
  }

  const content = getMarketingContent();
  errors.push(...validateMarketingContentStructure(content));

  return errors;
}
