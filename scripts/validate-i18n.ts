import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import IntlMessageFormat from "intl-messageformat";
import { SUPPORTED_LOCALES } from "../src/lib/i18n/locale";

type JsonTree = Record<string, unknown>;

const ROOT = path.join(process.cwd(), "src/messages");

function flattenKeys(tree: JsonTree, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(tree)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flattenKeys(value as JsonTree, full));
    } else if (typeof value === "string") {
      keys.push(full);
    } else {
      throw new Error(`Invalid message type at ${full}`);
    }
  }
  return keys.sort();
}

function getAt(tree: JsonTree, key: string): string {
  const parts = key.split(".");
  let current: unknown = tree;
  for (const part of parts) {
    if (current === null || typeof current !== "object" || !(part in current)) {
      throw new Error(`Missing key ${key}`);
    }
    current = (current as JsonTree)[part];
  }
  if (typeof current !== "string") {
    throw new Error(`Expected string at ${key}`);
  }
  return current;
}

function extractPlaceholders(template: string): string[] {
  const placeholders = new Set<string>();
  const re = /\{([a-zA-Z0-9_]+)(?:,[^}]*)?\}/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(template)) !== null) {
    placeholders.add(match[1]);
  }
  return [...placeholders].sort();
}

function validateSyntax(template: string, key: string): void {
  try {
    new IntlMessageFormat(template, undefined, undefined, { ignoreTag: true });
  } catch (error) {
    throw new Error(`Invalid ICU at ${key}: ${(error as Error).message}`);
  }
}

const catalogs: Record<string, JsonTree> = {};
for (const locale of SUPPORTED_LOCALES) {
  const file = path.join(ROOT, `${locale}.json`);
  assert.ok(fs.existsSync(file), `Missing catalog ${file}`);
  const raw = fs.readFileSync(file, "utf8");
  catalogs[locale] = JSON.parse(raw) as JsonTree;
}

const baseLocale = SUPPORTED_LOCALES[0];
const baseKeys = flattenKeys(catalogs[baseLocale]);

for (const locale of SUPPORTED_LOCALES) {
  const keys = flattenKeys(catalogs[locale]);
  assert.deepEqual(keys, baseKeys, `Key parity failed for ${locale}`);
}

for (const key of baseKeys) {
  for (const locale of SUPPORTED_LOCALES) {
    const value = getAt(catalogs[locale], key);
    assert.ok(value.trim().length > 0, `Empty translation ${locale}:${key}`);
    validateSyntax(value, `${locale}:${key}`);
  }
  const enPlaceholders = extractPlaceholders(getAt(catalogs[baseLocale], key));
  for (const locale of SUPPORTED_LOCALES.slice(1)) {
    const other = extractPlaceholders(getAt(catalogs[locale], key));
    assert.deepEqual(other, enPlaceholders, `Placeholder mismatch at ${key} (${locale})`);
  }
}

console.log(`validate-i18n: OK (${baseKeys.length} keys, ${SUPPORTED_LOCALES.length} locales)`);
