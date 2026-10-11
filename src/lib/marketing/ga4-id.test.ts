import assert from "node:assert/strict";
import { ga4MeasurementIdFromContent } from "./seo-metadata";
import type { MarketingContent } from "@/types/marketing";

function contentWithGa4(id: string): MarketingContent {
  return {
    seo: {
      analytics: { ga4MeasurementId: id },
    },
  } as MarketingContent;
}

assert.equal(ga4MeasurementIdFromContent(contentWithGa4("G-ABCDEF12")), "G-ABCDEF12");
assert.equal(ga4MeasurementIdFromContent(contentWithGa4("GT-12345")), "GT-12345");
assert.equal(ga4MeasurementIdFromContent(contentWithGa4("G-abc';alert(1)//")), undefined);
assert.equal(ga4MeasurementIdFromContent(contentWithGa4("UA-123")), undefined);

console.log("ga4-id.test.ts passed.");
