import type { ReactNode } from "react";

export function MockupContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full min-w-0 max-w-[1140px] px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  id,
}: {
  title: string;
  subtitle?: string;
  id?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <h2 id={id} className="text-[clamp(1.5rem,4vw+0.85rem,2.05rem)] font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2.5 text-[13px] leading-relaxed text-slate-500 sm:text-[14.5px]">{subtitle}</p>
      ) : null}
    </div>
  );
}
