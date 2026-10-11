import assert from "node:assert/strict";
import { test } from "node:test";
import { buildComparisonMatrix, mapPublicPlansToView, planLimitDisplay } from "./map-public-plans";
import type { PublicPlanCard } from "@/types/subscription-plans";

const starter: PublicPlanCard = {
  code: "STARTER",
  name: "Starter",
  pricing_type: "FIXED",
  display_order: 1,
  currency_code: "INR",
  monthly_price: "1499.00",
  annual_price: "14990.00",
  features: [{ code: "A", name: "Basic Reports" }],
  limits: [{ code: "PEOPLE_LIMIT", name: "People", value: 250, unlimited: false }],
  coverage: [],
};

const enterprise: PublicPlanCard = {
  code: "ENTERPRISE",
  name: "Enterprise",
  pricing_type: "CUSTOM",
  display_order: 4,
  currency_code: "INR",
  monthly_price: null,
  annual_price: null,
  features: [],
  limits: [],
  coverage: [],
};

test("mapPublicPlansToView uses ISO currency and custom pricing label", () => {
  const view = mapPublicPlansToView([starter, enterprise]);
  assert.equal(view[0].currency_code, "INR");
  assert.equal(view[1].customPricingLabel, "Custom pricing");
  assert.equal(view[1].showPriceToggle, false);
});

test("comparison omits features hidden from every plan and dashes hidden cells", () => {
  const starter: PublicPlanCard = {
    code: "STARTER",
    name: "Starter",
    pricing_type: "FIXED",
    coverage: [
      { code: "BASIC_REPORTS", name: "Basic Reports", category: "reporting", included: true },
    ],
  };
  const standard: PublicPlanCard = {
    code: "STANDARD",
    name: "Standard",
    pricing_type: "FIXED",
    coverage: [
      { code: "BASIC_REPORTS", name: "Basic Reports", category: "reporting", included: true },
    ],
  };

  const matrix = buildComparisonMatrix([starter, standard]);
  assert.equal(matrix[0]?.rows.some((row) => row.code === "BASIC_REPORTS"), true);
  assert.equal(planLimitDisplay({ ...standard, coverage: [] }, "IMPORT_EXPORT"), "—");

  const hiddenEverywhere = buildComparisonMatrix([
    { ...starter, coverage: [] },
    { ...standard, coverage: [] },
  ]);
  assert.equal(hiddenEverywhere.some((group) => group.rows.some((row) => row.code === "IMPORT_EXPORT")), false);
});

test("mapPublicPlansToView does not hardcode plan count", () => {
  const view = mapPublicPlansToView([starter]);
  assert.equal(view.length, 1);
  assert.equal(view[0].id, "STARTER");
});
