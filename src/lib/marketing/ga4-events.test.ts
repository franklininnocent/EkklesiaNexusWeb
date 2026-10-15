import assert from "node:assert/strict";
import { ga4EventName } from "./ga4-events";

assert.equal(ga4EventName({ event: "login_click" }), "login_click");
assert.equal(ga4EventName({ event: "contact_form_submit" }), "contact_form_submit");
assert.equal(ga4EventName({ event: "demo_form_submit" }), "demo_request_submit");
assert.equal(ga4EventName({ event: "cta_click", label: "header_demo" }), null);
assert.equal(ga4EventName({ event: "cta_click", label: "open_application" }), "login_click");
assert.equal(ga4EventName({ event: "section_view" }), null);

console.log("ga4-events.test.ts passed.");
