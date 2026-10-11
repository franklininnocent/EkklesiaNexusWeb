"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import { Card } from "@/components/ui/card";
import { PersonAvatar } from "@/components/mockup/avatars";
import { MockupContainer, SectionHeading } from "@/components/mockup/container";
import { mockupTestimonialsCards, mockupTestimonialsRow } from "@/data/mockup-page";
import { usePerView } from "@/hooks/use-per-view";

function TestimonialAvatar({
  name,
  tone,
  size,
  imageSrc,
}: {
  name: string;
  tone: number;
  size: number;
  imageSrc?: string;
}) {
  if (imageSrc) {
    return (
      <Image
        src={imageSrc}
        alt=""
        width={size}
        height={size}
        className="rounded-full object-cover shadow-[0_8px_20px_rgba(15,23,42,0.12)] ring-2 ring-white"
      />
    );
  }

  return <PersonAvatar name={name} tone={tone} size={size} />;
}

function perViewForWidth(width: number): number {
  if (width < 768) {
    return 1;
  }
  if (width < 1024) {
    return 2;
  }
  if (width < 1280) {
    return 3;
  }
  return 4;
}

export function MockupTestimonialsRow() {
  const items = mockupTestimonialsRow.items;
  const [index, setIndex] = useState(0);
  const perView = usePerView(perViewForWidth);
  const [paused, setPaused] = useState(false);

  const max = Math.max(0, items.length - perView);
  const slideIndex = Math.min(index, max);

  const prev = () => setIndex((value) => Math.max(0, value - 1));
  const next = () => setIndex((value) => Math.min(max, value + 1));

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused || max === 0) {
      return;
    }
    const timer = window.setInterval(() => {
      setIndex((value) => (value >= max ? 0 : value + 1));
    }, 5200);
    return () => window.clearInterval(timer);
  }, [max, paused]);

  return (
    <section id="testimonials" className="relative overflow-hidden py-14 sm:py-16">
      <MockupContainer>
        <SectionHeading
          title={mockupTestimonialsRow.title}
          subtitle={mockupTestimonialsRow.subtitle}
        />

        <div className="mb-4 flex items-center justify-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonials"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg shadow-slate-300/60"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonials"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg shadow-slate-300/60"
          >
            <ChevronRight className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonials"
            className="absolute -left-2 top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg shadow-slate-300/60 sm:flex sm:-left-5"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonials"
            className="absolute -right-2 top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg shadow-slate-300/60 sm:flex sm:-right-5"
          >
            <ChevronRight className="h-5 w-5 text-slate-600" />
          </button>

          <div className="overflow-hidden px-1 sm:px-2">
            <div
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${slideIndex * (100 / perView)}%)` }}
            >
              {items.map((item) => (
                <article
                  key={item.name}
                  className="min-w-0 shrink-0 px-2 text-center sm:px-3"
                  style={{ width: `${100 / perView}%` }}
                >
                  <div className="flex justify-center">
                    <TestimonialAvatar
                      name={item.name}
                      tone={item.tone}
                      size={86}
                      imageSrc={item.imageSrc}
                    />
                  </div>
                  <p className="mt-4 px-1 text-[13px] leading-relaxed text-slate-500">“{item.quote}”</p>
                  <p className="mt-3 text-sm font-bold text-slate-900">{item.name}</p>
                  <p className="text-[11px] text-slate-400">{item.role}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </MockupContainer>
    </section>
  );
}

export function MockupTestimonialsCards() {
  return (
    <section className="py-6 sm:py-10">
      <MockupContainer>
        <SectionHeading
          title={mockupTestimonialsCards.title}
          subtitle={mockupTestimonialsCards.subtitle}
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {mockupTestimonialsCards.items.map((item, i) => (
            <AnimatedReveal key={item.name} delay={i * 0.06} className="h-full">
              <Card lift className="flex h-full items-start gap-3 rounded-[1.35rem] p-5">
                <div className="shrink-0">
                  <PersonAvatar name={item.name} tone={item.tone} size={48} />
                </div>
                <div>
                  <p className="text-[13px] leading-relaxed text-slate-500">“{item.quote}”</p>
                  <p className="mt-2.5 text-sm font-bold text-slate-900">{item.name}</p>
                  <p className="text-[11px] text-slate-400">{item.role}</p>
                </div>
              </Card>
            </AnimatedReveal>
          ))}
        </div>
      </MockupContainer>
    </section>
  );
}
