import { expect, test } from "@playwright/test";
import path from "node:path";

/**
 * Captures Portuguese homepage screenshots for layout review (plan widths).
 * Output: docs/i18n/evidence/pt-br-home-{width}x{height}.png
 */
const PT_BR_VIEWPORTS: ReadonlyArray<{ width: number; height: number }> = [
  { width: 320, height: 568 },
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

const evidenceDir = path.join(process.cwd(), "docs/i18n/evidence");

for (const { width, height } of PT_BR_VIEWPORTS) {
  test(`pt-br homepage evidence ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/pt-br", { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await page.screenshot({
      path: path.join(evidenceDir, `pt-br-home-${width}x${height}.png`),
      fullPage: true,
    });
  });
}
