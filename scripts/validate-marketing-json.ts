import fs from "node:fs";
import path from "node:path";
import { validateMarketingContentPayload } from "../src/lib/marketing/validate-payload";

const fileArg = process.argv[2];
const file = fileArg
  ? path.resolve(process.cwd(), fileArg)
  : path.join(process.cwd(), "marketing-content.export.json");

if (!fs.existsSync(file)) {
  console.error(`File not found: ${file}`);
  console.error("Run npm run export:content first, or pass a path.");
  process.exit(1);
}

let data: unknown;
try {
  data = JSON.parse(fs.readFileSync(file, "utf8")) as unknown;
} catch {
  console.error("Invalid JSON in", file);
  process.exit(1);
}

const errors = validateMarketingContentPayload(data);
if (errors.length > 0) {
  for (const message of errors) {
    console.error(message);
  }
  process.exit(1);
}

console.log(`Marketing JSON validation passed: ${file}`);
