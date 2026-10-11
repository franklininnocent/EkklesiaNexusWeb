import { writeFileSync } from "node:fs";
import path from "node:path";
import { getFileMarketingContent } from "../src/lib/marketing/providers/file-provider";

const out = path.join(process.cwd(), "marketing-content.export.json");
const payload = getFileMarketingContent();

writeFileSync(out, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Wrote ${out}`);
console.log("Run npm run validate:export to verify before CMS publish.");
