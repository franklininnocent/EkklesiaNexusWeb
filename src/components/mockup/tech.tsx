"use client";

import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { Card } from "@/components/ui/card";
import { MockupContainer, SectionHeading } from "@/components/mockup/container";
import { TECH_ITEMS } from "@/data/mockup-structure";
import { useTranslations } from "@/lib/i18n/i18n-provider";

function NextMark() {
  return (
    <svg viewBox="0 0 160 64" className="h-14 w-40" aria-hidden="true">
      <ellipse cx="72" cy="58" rx="42" ry="5" fill="#e0f2fe" />
      <circle cx="50" cy="36" r="16" fill="#7dd3fc" />
      <circle cx="74" cy="26" r="20" fill="#38bdf8" />
      <circle cx="100" cy="36" r="15" fill="#0ea5e9" />
      <rect x="40" y="34" width="64" height="20" rx="10" fill="#38bdf8" />
      <circle cx="58" cy="42" r="3.5" fill="#e0f2fe" />
      <circle cx="74" cy="42" r="3.5" fill="#e0f2fe" />
      <circle cx="90" cy="42" r="3.5" fill="#e0f2fe" />
      <path
        d="M126 36 L140 22 L154 36"
        fill="none"
        stroke="#0284c7"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M126 48 L140 34 L154 48"
        fill="none"
        stroke="#7dd3fc"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PerfMark() {
  return (
    <svg viewBox="0 0 160 64" className="h-14 w-40" aria-hidden="true">
      <ellipse cx="80" cy="58" rx="42" ry="5" fill="#dcfce7" />
      <rect x="16" y="8" width="90" height="40" rx="8" fill="#86efac" />
      <rect x="22" y="13" width="78" height="26" rx="4" fill="#bbf7d0" />
      <rect x="28" y="18" width="24" height="5" rx="2" fill="#22c55e" />
      <rect x="28" y="27" width="40" height="4" rx="2" fill="#4ade80" />
      <rect x="54" y="48" width="16" height="4" rx="2" fill="#4ade80" />
      <rect x="42" y="52" width="40" height="4" rx="2" fill="#86efac" />
      <rect x="116" y="10" width="28" height="46" rx="6" fill="#22c55e" />
      <rect x="120" y="16" width="20" height="30" rx="3" fill="#bbf7d0" />
      <circle cx="130" cy="50" r="2" fill="#dcfce7" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 160 64" className="h-14 w-40" aria-hidden="true">
      <ellipse cx="80" cy="58" rx="36" ry="5" fill="#e0e7ff" />
      <path d="M80 6 L116 18 V36 C116 50 100 58 80 62 C60 58 44 50 44 36 V18 Z" fill="#6366f1" />
      <path d="M80 12 L108 22 V36 C108 47 96 54 80 58 C64 54 52 47 52 36 V22 Z" fill="#818cf8" />
      <rect x="72" y="32" width="16" height="14" rx="3" fill="#eef2ff" />
      <path
        d="M76 32 V27 C76 23 84 23 84 27 V32"
        fill="none"
        stroke="#eef2ff"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <circle cx="80" cy="39" r="2.25" fill="#4f46e5" />
      <rect x="126" y="24" width="8" height="24" rx="2" fill="#c7d2fe" />
      <rect x="138" y="30" width="8" height="18" rx="2" fill="#a5b4fc" />
    </svg>
  );
}

const marks = [NextMark, PerfMark, PlayMark];

export function MockupTech() {
  const t = useTranslations();

  return (
    <section className="py-14 sm:py-16">
      <MockupContainer>
        <SectionHeading title={t("home.tech.title")} subtitle={t("home.tech.subtitle")} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_ITEMS.map((item, i) => {
            const Mark = marks[i] ?? PlayMark;
            return (
              <AnimatedReveal key={item.id} delay={i * 0.06} className="h-full">
                <Card lift className="h-full min-w-0 rounded-[1.5rem] px-5 py-7 text-center sm:px-7">
                  <div className="mb-4 flex justify-center">
                    <Mark />
                  </div>
                  <h3 className="text-[1.05rem] font-bold text-slate-900">{t(`home.tech.${item.id}.title`)}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{t(`home.tech.${item.id}.body`)}</p>
                </Card>
              </AnimatedReveal>
            );
          })}
        </div>
      </MockupContainer>
    </section>
  );
}
