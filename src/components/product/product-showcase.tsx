"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import type { ProductScreenshot } from "@/types/marketing";

type ProductShowcaseProps = {
  screenshots: ProductScreenshot[];
};

export function ProductShowcase({ screenshots }: ProductShowcaseProps) {
  const [activeId, setActiveId] = useState(screenshots[0]?.id ?? "");
  const active = screenshots.find((s) => s.id === activeId) ?? screenshots[0];

  const selectByOffset = useCallback(
    (offset: number) => {
      if (screenshots.length === 0) return;
      const index = screenshots.findIndex((s) => s.id === activeId);
      const next = screenshots[(index + offset + screenshots.length) % screenshots.length];
      setActiveId(next.id);
    },
    [activeId, screenshots],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button")) return;
      if (e.key === "ArrowRight") selectByOffset(1);
      if (e.key === "ArrowLeft") selectByOffset(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectByOffset]);

  if (!active) return null;

  return (
    <section id="product" className="py-16 md:py-24">
      <Container>
        <SectionHeader
          title="See the product"
          subtitle="Explore real EkklesiaNexus modules with screenshots from the parish management experience."
          align="center"
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr]">
          <div
            className="flex flex-col gap-1"
            role="tablist"
            aria-label="Product modules"
          >
            {screenshots.map((shot, index) => {
              const selected = shot.id === active.id;
              return (
                <button
                  key={shot.id}
                  type="button"
                  role="tab"
                  tabIndex={selected ? 0 : -1}
                  aria-selected={selected}
                  aria-controls={`panel-${shot.id}`}
                  id={`tab-${shot.id}`}
                  onClick={() => setActiveId(shot.id)}
                  onKeyDown={(e) => {
                    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                    e.preventDefault();
                    const next =
                      screenshots[
                        (index + (e.key === "ArrowDown" ? 1 : -1) + screenshots.length) %
                          screenshots.length
                      ];
                    setActiveId(next.id);
                    document.getElementById(`tab-${next.id}`)?.focus();
                  }}
                  className={`rounded-[var(--radius-md)] px-4 py-3 text-left text-sm font-medium transition-colors ${
                    selected
                      ? "bg-brand-navy text-white"
                      : "bg-white text-[var(--text-secondary)] hover:bg-slate-50"
                  }`}
                >
                  {shot.title}
                </button>
              );
            })}
          </div>

          <div
            id={`panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-card)]"
          >
            <div className="mb-4 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => selectByOffset(-1)}
                className="inline-flex items-center gap-1 rounded-[var(--radius-md)] border border-[var(--border-subtle)] px-3 py-2 text-sm font-medium text-brand-navy hover:bg-slate-50"
                aria-label="Previous module"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
                Previous
              </button>
              <button
                type="button"
                onClick={() => selectByOffset(1)}
                className="inline-flex items-center gap-1 rounded-[var(--radius-md)] border border-[var(--border-subtle)] px-3 py-2 text-sm font-medium text-brand-navy hover:bg-slate-50"
                aria-label="Next module"
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-subtle)]">
              <Image
                src={active.image}
                alt={active.alt}
                width={1100}
                height={700}
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="h-auto w-full"
              />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-brand-navy">{active.title}</h3>
            <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">{active.description}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
              {active.capabilities.map((cap) => (
                <li key={cap}>{cap}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-medium text-brand-navy">{active.benefit}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
