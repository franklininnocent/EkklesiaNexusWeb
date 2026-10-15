import assert from "node:assert/strict";
import { secretsEqual } from "./secrets";

assert.equal(secretsEqual("alpha-secret", "alpha-secret"), true);
assert.equal(secretsEqual("alpha-secret", "other-secret"), false);
assert.equal(secretsEqual("", "alpha-secret"), false);

console.log("secrets.test.ts passed.");
