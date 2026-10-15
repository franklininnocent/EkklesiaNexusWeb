"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { ga4MeasurementIdFromContent } from "@/lib/marketing/seo-metadata";
import { ga4EventName } from "@/lib/marketing/ga4-events";
import type { MarketingContent } from "@/types/marketing";

const CONSENT_COOKIE = "en_analytics_consent";

function hasConsent(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((part) => part.trim().startsWith(`${CONSENT_COOKIE}=1`));
}

function setConsent(): void {
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 180}; SameSite=Lax${secure}`;
}

function loadGtag(measurementId: string): void {
  if (typeof window === "undefined") return;
  if (document.querySelector(`script[data-ga-id="${measurementId}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.dataset.gaId = measurementId;
  document.head.appendChild(script);

  const inline = document.createElement("script");
  inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}');`;
  document.head.appendChild(inline);
}

export function MarketingAnalytics({ content }: { content: MarketingContent }) {
  const measurementId = ga4MeasurementIdFromContent(content);
  const analyticsOn = siteConfig.analyticsEnabled && Boolean(measurementId);
  const [consented, setConsented] = useState(() => hasConsent());

  useEffect(() => {
    if (!analyticsOn || !consented || !measurementId) return;
    loadGtag(measurementId);
  }, [analyticsOn, consented, measurementId]);

  useEffect(() => {
    if (!analyticsOn || !consented) return;

    const onAnalytics = (event: Event) => {
      const detail = (event as CustomEvent<{ event?: string; label?: string }>).detail ?? {};
      if (typeof window.gtag !== "function") return;
      const mapped = ga4EventName(detail);
      if (!mapped) return;
      window.gtag("event", mapped);
    };

    window.addEventListener("ekklesia-analytics", onAnalytics);
    return () => window.removeEventListener("ekklesia-analytics", onAnalytics);
  }, [analyticsOn, consented]);

  if (!analyticsOn) {
    return null;
  }

  if (!consented) {
    return (
      <div
        className="fixed inset-x-0 bottom-0 z-[200] border-t border-slate-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:px-6"
        role="region"
        aria-label="Analytics consent"
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            We use optional analytics cookies to understand how visitors use this website. No parish records are sent.
          </p>
          <button
            type="button"
            className="shrink-0 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--brand-blue-hover)]"
            onClick={() => {
              setConsent();
              setConsented(true);
            }}
          >
            Accept analytics
          </button>
        </div>
      </div>
    );
  }

  return null;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
