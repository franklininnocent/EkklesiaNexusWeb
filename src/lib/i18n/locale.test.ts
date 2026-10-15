import assert from "node:assert/strict";
import {
  localeFromPathname,
  publicPagePath,
  switchLocalePath,
} from "@/lib/i18n/locale";

assert.equal(localeFromPathname("/"), "en-US");
assert.equal(localeFromPathname("/privacy"), "en-US");
assert.equal(localeFromPathname("/pt-br"), "pt-BR");
assert.equal(localeFromPathname("/pt-br/privacy"), "pt-BR");

assert.equal(publicPagePath("en-US", "home"), "/");
assert.equal(publicPagePath("pt-BR", "home"), "/pt-br");
assert.equal(publicPagePath("pt-BR", "privacy"), "/pt-br/privacy");

assert.equal(switchLocalePath("/privacy", "pt-BR"), "/pt-br/privacy");
assert.equal(switchLocalePath("/pt-br/terms", "en-US"), "/terms");
assert.equal(switchLocalePath("/#features", "pt-BR"), "/pt-br#features");

console.log("locale.test.ts: OK");
