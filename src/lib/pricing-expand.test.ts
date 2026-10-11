import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isPlanPriceExpanded, planPricePanelId, toggleExpandedPlanId } from "./pricing-expand";

describe("toggleExpandedPlanId", () => {
  it("opens the first plan from a fully collapsed section", () => {
    assert.equal(toggleExpandedPlanId(null, "seed"), "seed");
  });

  it("collapses the active plan when it is clicked again", () => {
    assert.equal(toggleExpandedPlanId("seed", "seed"), null);
  });

  it("transfers expansion from Starter to Standard in one update", () => {
    assert.equal(toggleExpandedPlanId("seed", "growth"), "growth");
  });

  it("transfers expansion across every plan id without leaving two open", () => {
    const sequence = ["seed", "growth", "summit", "seed"];
    let expanded: string | null = null;
    const snapshots: Array<string | null> = [];

    for (const id of sequence) {
      expanded = toggleExpandedPlanId(expanded, id);
      snapshots.push(expanded);
    }

    assert.deepEqual(snapshots, ["seed", "growth", "summit", "seed"]);
    assert.equal(snapshots.filter(Boolean).length, snapshots.length);
  });

  it("ignores an empty click id so the current plan stays the source of truth", () => {
    assert.equal(toggleExpandedPlanId("growth", ""), "growth");
  });
});

describe("isPlanPriceExpanded", () => {
  it("reports at most one plan as expanded", () => {
    const plans = ["seed", "growth", "summit"];
    const expandedId = "growth";
    const open = plans.filter((id) => isPlanPriceExpanded(expandedId, id));
    assert.deepEqual(open, ["growth"]);
    assert.equal(plans.filter((id) => isPlanPriceExpanded(null, id)).length, 0);
  });
});

describe("planPricePanelId", () => {
  it("uses the stable plan id rather than index or display name", () => {
    assert.equal(planPricePanelId("seed"), "plan-price-seed");
  });
});
