import { siteConfig } from "@/config/site";

export type AnalyticsEvent =
  | "cta_click"
  | "demo_form_open"
  | "demo_form_submit"
  | "contact_form_submit"
  | "login_click"
  | "section_view";

export function trackEvent(event: AnalyticsEvent, detail?: Record<string, string>) {
  if (!siteConfig.analyticsEnabled) return;
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("ekklesia-analytics", {
      detail: { event, ...detail, ts: Date.now() },
    }),
  );
}
