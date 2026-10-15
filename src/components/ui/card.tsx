import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  lift?: boolean;
};

export function Card({ children, className = "", lift = false }: CardProps) {
  return (
    <div
      className={`rounded-[1.75rem] border border-slate-100/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] ${
        lift ? "card-lift" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
