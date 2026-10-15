import { validateMarketingContentFiles } from "../src/lib/marketing/validate-content";
import { validateMarketingSeo } from "../src/lib/marketing/validate-seo";

const errors = [...validateMarketingContentFiles(), ...validateMarketingSeo()];

if (errors.length > 0) {
  for (const message of errors) {
    console.error(message);
  }
  process.exit(1);
}

console.log("Marketing content validation passed.");
console.log("Run npm run test:unit for marketing unit tests.");
