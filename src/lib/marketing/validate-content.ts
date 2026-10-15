import fs from "node:fs";
import path from "node:path";
import { heroContent } from "@/content/hero";
import { siteContent } from "@/content/site";
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

  const rejectedHeroBoilerplate =
    "Simplify parish administration with EkklesiaNexus, an integrated church management platform";
  const enMessagesPath = path.join(process.cwd(), "src/messages/en-US.json");
  const enMessages = JSON.parse(fs.readFileSync(enMessagesPath, "utf8")) as {
    home?: { hero?: { subtitle?: string } };
    seo?: { homeDescription?: string; manifestDescription?: string };
  };
  const heroSubtitle = enMessages.home?.hero?.subtitle ?? "";
  if (heroSubtitle !== heroContent.description) {
    errors.push(
      `en-US home.hero.subtitle must match src/content/hero.ts description (${heroContent.description})`,
    );
  }
  if (
    heroSubtitle.includes(rejectedHeroBoilerplate) ||
    siteContent.seoDescription.includes(rejectedHeroBoilerplate) ||
    (enMessages.seo?.homeDescription ?? "").includes(rejectedHeroBoilerplate)
  ) {
    errors.push(
      "Rejected SEO boilerplate copy detected; use hero.ts and site.ts as the source of truth for homepage copy",
    );
  }

  return errors;
}
