"use client";

import { useCallback, useRef, type KeyboardEvent } from "react";

export type PillOption<T extends string> = {
  value: T;
  label: string;
};

type PricingPillRadiogroupProps<T extends string> = {
  label: string;
  name: string;
  options: PillOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export function PricingPillRadiogroup<T extends string>({
  label,
  name,
  options,
  value,
  onChange,
  className = "",
}: PricingPillRadiogroupProps<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusAt = useCallback((index: number) => {
    const el = refs.current[index];
    el?.focus();
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = options.length - 1;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        const next = index >= last ? 0 : index + 1;
        onChange(options[next].value);
        focusAt(next);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        const prev = index <= 0 ? last : index - 1;
        onChange(options[prev].value);
        focusAt(prev);
      } else if (event.key === "Home") {
        event.preventDefault();
        onChange(options[0].value);
        focusAt(0);
      } else if (event.key === "End") {
        event.preventDefault();
        onChange(options[last].value);
        focusAt(last);
      }
    },
    [focusAt, onChange, options],
  );

  return (
    <div className={className} role="radiogroup" aria-label={label}>
      <ul className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-slate-200 bg-white/80 p-0.5 text-[11px] font-semibold sm:text-[12px]">
        {options.map((option, index) => {
          const checked = value === option.value;
          return (
            <li key={option.value}>
              <button
                ref={(el) => {
                  refs.current[index] = el;
                }}
                type="button"
                role="radio"
                name={name}
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                onClick={() => onChange(option.value)}
                onKeyDown={(e) => onKeyDown(e, index)}
                className={`block min-w-[2.25rem] whitespace-normal rounded-full px-2.5 py-1.5 text-center leading-snug transition-colors sm:min-w-[2.5rem] sm:px-3 ${
                  checked ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
