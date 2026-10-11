"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CalendarScreen,
  CommunityDashboardScreen,
  DesktopDashboard,
  MassIntentionsScreen,
} from "@/components/mockup/devices";
import { MockupContainer, SectionHeading } from "@/components/mockup/container";
import { mockupSlider } from "@/data/mockup-page";
import { usePerView } from "@/hooks/use-per-view";

type SlideItem = (typeof mockupSlider.items)[number];

const frames: Record<SlideItem["frame"], string> = {
  emerald: "from-emerald-200 via-emerald-300 to-lime-200",
  rose: "from-pink-300 via-fuchsia-300 to-orange-200",
  purple: "from-violet-300 via-fuchsia-300 to-purple-400",
  cyan: "from-cyan-200 via-teal-300 to-sky-200",
};

function SlideMock({ id }: { id: string }) {
  if (id === "mobile") return <CommunityDashboardScreen />;
  if (id === "calendar") return <CalendarScreen />;
  if (id === "insights") return <MassIntentionsScreen />;
  return <DesktopDashboard gid={`chart-slide-${id}`} />;
}

function SlideVisual({ item }: { item: SlideItem }) {
  return (
    <div className="h-[230px]">
      {item.image ? (
        <div className="relative h-full overflow-hidden rounded-xl bg-white shadow-inner">
          <Image
            src={item.image}
            alt={item.imageAlt ?? "EkklesiaNexus product screenshot"}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 30vw"
            className="object-cover object-center"
          />
        </div>
      ) : (
        <SlideMock id={item.id} />
      )}
    </div>
  );
}

function sliderPerView(width: number): number {
  if (width < 768) return 1;
  if (width < 1024) return 2;
  return 3.15;
}

export function MockupSlider() {
  const items = mockupSlider.items;
  const [index, setIndex] = useState(0);
  const perView = usePerView(sliderPerView);

  const max = Math.max(0, items.length - Math.floor(perView));
  const slideIndex = Math.min(index, max);
  const prev = () => setIndex((v) => Math.max(0, v - 1));
  const next = () => setIndex((v) => Math.min(max, v + 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((v) => Math.max(0, v - 1));
      if (e.key === "ArrowRight") setIndex((v) => Math.min(max, v + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [max]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || max === 0) return;
    const id = window.setInterval(() => {
      setIndex((v) => (v >= max ? 0 : v + 1));
    }, 5200);
    return () => window.clearInterval(id);
  }, [max]);

  return (
    <section id="solutions" className="relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute left-8 top-16 h-10 w-10 rotate-45 rounded-md bg-emerald-300/80" />
      <div className="pointer-events-none absolute right-16 top-24 h-8 w-8 rotate-12 rounded-md bg-sky-400/70" />

      <MockupContainer>
        <SectionHeading title={mockupSlider.title} subtitle={mockupSlider.subtitle} />

        <div className="mb-4 flex items-center justify-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slides"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg shadow-slate-300/60"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slides"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg shadow-slate-300/60"
          >
            <ChevronRight className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slides"
            className="absolute -left-2 top-[42%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg shadow-slate-300/60 sm:flex sm:-left-5"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slides"
            className="absolute -right-2 top-[42%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg shadow-slate-300/60 sm:flex sm:-right-5"
          >
            <ChevronRight className="h-5 w-5 text-slate-600" />
          </button>

          <div className="overflow-hidden px-1 sm:px-2">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${slideIndex * (100 / perView)}%)` }}
            >
              {items.map((item) => (
                <article
                  key={item.id}
                  className="min-w-0 shrink-0 px-2 sm:px-3"
                  style={{ width: `${100 / perView}%` }}
                >
                  <div
                    className={`rounded-[1.9rem] bg-gradient-to-br p-4 shadow-lg shadow-slate-300/40 ${frames[item.frame]}`}
                  >
                    <SlideVisual item={item} />
                  </div>
                  <h3 className="mt-5 text-center text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mx-auto mt-2 max-w-[240px] text-center text-sm leading-relaxed text-slate-500">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </MockupContainer>
    </section>
  );
}
