export type AnalyticsDetail = { event?: string; label?: string };

/** Maps internal analytics events to allowlisted GA4 event names, or null to skip. */
export function ga4EventName(detail: AnalyticsDetail): string | null {
  const name = detail.event;
  if (!name) return null;
  if (name === "demo_form_submit") return "demo_request_submit";
  if (name === "cta_click") {
    const label = (detail.label ?? "").toLowerCase();
    if (label.includes("application") || label.includes("open_application")) {
      return "login_click";
    }
    return null;
  }
  if (name === "contact_form_submit" || name === "login_click") {
    return name;
  }
  return null;
}
