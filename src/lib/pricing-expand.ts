/**
 * Single-active pricing card: at most one plan id is expanded.
 * Clicking the open plan collapses it; clicking another plan transfers the open state.
 */
export function toggleExpandedPlanId(currentId: string | null, clickedId: string): string | null {
  if (!clickedId) {
    return currentId;
  }

  return currentId === clickedId ? null : clickedId;
}

export function isPlanPriceExpanded(expandedPlanId: string | null, planId: string): boolean {
  return expandedPlanId !== null && expandedPlanId === planId;
}

export function planPricePanelId(planId: string): string {
  return `plan-price-${planId}`;
}
