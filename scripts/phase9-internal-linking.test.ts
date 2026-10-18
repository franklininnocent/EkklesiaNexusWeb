import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function run(): void {
  const footer = readFileSync(join(root, "src/components/mockup/footer.tsx"), "utf8");
  assert.ok(
    footer.includes('href: "/solutions/catholic-parishes"'),
    "English footer must link to Catholic parish solution page",
  );
  assert.ok(footer.includes('t("footer.catholicParishes")'), "Footer must use i18n key for Catholic link label");

  const enMessages = JSON.parse(readFileSync(join(root, "src/messages/en-US.json"), "utf8")) as {
    footer: Record<string, string>;
  };
  assert.equal(enMessages.footer.catholicParishes, "Catholic parishes");

  const afterEnBranch = footer.split('locale === "en-US"')[1] ?? "";
  const ptFooterBlock = afterEnBranch.split(": [")[1]?.split("];")[0] ?? "";
  assert.ok(
    !ptFooterBlock.includes("/solutions/catholic-parishes"),
    "pt-BR footer must not link to English-only Catholic solution until native review approves",
  );

  const ptMessages = JSON.parse(readFileSync(join(root, "src/messages/pt-BR.json"), "utf8")) as {
    footer: Record<string, string>;
  };
  assert.ok(ptMessages.footer.catholicParishes, "pt-BR must define footer.catholicParishes for i18n key parity");

  console.log("phase9-internal-linking.test.ts passed.");
}

run();
