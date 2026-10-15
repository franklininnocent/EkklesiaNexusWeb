"use client";

import { Fragment } from "react";
import { MockupContainer, SectionHeading } from "@/components/mockup/container";
import {
  buildComparisonMatrix,
  comparisonLimitRows,
  planIncludesFeature,
  planLimitDisplay,
} from "@/lib/pricing/map-public-plans";
import type { PublicPlanCard } from "@/types/subscription-plans";

type PlanComparisonProps = {
  plans: PublicPlanCard[];
  title?: string;
};

function InclusionCell({
  plan,
  rowCode,
  rowName,
}: {
  plan: PublicPlanCard;
  rowCode: string;
  rowName: string;
}) {
  const included = planIncludesFeature(plan, rowCode);
  const limitValue = planLimitDisplay(plan, rowCode);

  return (
    <span className="text-right text-slate-700">
      {included ? (
        <span className="font-semibold text-brand-blue" aria-label={`Included in ${plan.name}: ${rowName}`}>
          ✓
        </span>
      ) : (
        <span className="text-slate-400" aria-hidden="true">
          —
        </span>
      )}
      {limitValue !== "—" && limitValue !== "✓" ? (
        <span className="mt-0.5 block text-xs text-slate-600">{limitValue}</span>
      ) : null}
    </span>
  );
}

export function PlanComparison({ plans, title = "Compare plans" }: PlanComparisonProps) {
  if (plans.length === 0) {
    return null;
  }

  const sorted = [...plans].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  const categories = buildComparisonMatrix(sorted);
  const limitRows = comparisonLimitRows(sorted);

  return (
    <section id="plan-comparison" className="py-10 sm:py-12" aria-labelledby="plan-comparison-heading">
      <MockupContainer>
        <SectionHeading id="plan-comparison-heading" title={title} />

        <div className="space-y-5 lg:hidden">
          {sorted.map((plan) => (
            <article
              key={`stack-${plan.code}`}
              className={`min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${
                plan.is_featured ? "ring-2 ring-brand-blue" : ""
              }`}
            >
              <div className="mb-3 text-center">
                <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                {plan.badge_label ? (
                  <span className="mt-1 inline-block rounded-full bg-brand-blue px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    {plan.badge_label}
                  </span>
                ) : null}
              </div>
              {categories.map((group) => (
                <div key={`${plan.code}-${group.category}`} className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{group.category}</p>
                  <ul className="mt-2 divide-y divide-slate-100">
                    {group.rows.map((row) => (
                      <li key={row.code} className="flex items-start justify-between gap-3 py-2">
                        <span className="min-w-0 text-sm font-medium text-slate-800">
                          <span className="block break-words">{row.name}</span>
                          {row.description ? (
                            <span className="mt-0.5 block text-xs font-normal leading-relaxed text-slate-500">
                              {row.description}
                            </span>
                          ) : null}
                        </span>
                        <InclusionCell plan={plan} rowCode={row.code} rowName={row.name} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {limitRows.length > 0 ? (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Usage limits</p>
                  <ul className="mt-2 divide-y divide-slate-100">
                    {limitRows.map((row) => (
                      <li key={`${plan.code}-limit-${row.code}`} className="flex items-start justify-between gap-3 py-2">
                        <span className="min-w-0 break-words text-sm font-medium text-slate-800">{row.name}</span>
                        <span className="shrink-0 text-sm font-medium text-slate-800">
                          {planLimitDisplay(plan, row.code)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div className="hidden min-w-0 lg:block">
          <div className="overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <caption className="sr-only">Subscription plan feature comparison</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 bg-slate-50 px-4 py-3 font-semibold text-slate-900"
                  >
                    Feature
                  </th>
                  {sorted.map((plan) => (
                    <th
                      key={plan.code}
                      scope="col"
                      className={`min-w-[9rem] px-3 py-3 text-center font-semibold text-slate-900 ${
                        plan.is_featured ? "bg-blue-50/80" : ""
                      }`}
                    >
                      <span className="block">{plan.name}</span>
                      {plan.badge_label ? (
                        <span className="mt-1 inline-block rounded-full bg-brand-blue px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          {plan.badge_label}
                        </span>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((group) => (
                  <Fragment key={`group-${group.category}`}>
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <th
                        scope="colgroup"
                        colSpan={sorted.length + 1}
                        className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {group.category}
                      </th>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.code} className="border-b border-slate-100">
                        <th
                          scope="row"
                          className="sticky left-0 z-10 bg-white px-4 py-3 align-top font-medium text-slate-800"
                        >
                          <span className="block break-words">{row.name}</span>
                          {row.description ? (
                            <span className="mt-1 block text-xs font-normal leading-relaxed text-slate-500">
                              {row.description}
                            </span>
                          ) : null}
                        </th>
                        {sorted.map((plan) => {
                          const included = planIncludesFeature(plan, row.code);
                          const limitValue = planLimitDisplay(plan, row.code);

                          return (
                            <td
                              key={`${plan.code}-${row.code}`}
                              className={`px-3 py-3 text-center text-slate-700 ${plan.is_featured ? "bg-blue-50/40" : ""}`}
                            >
                              {included ? (
                                <span className="font-semibold text-brand-blue" aria-label={`Included in ${plan.name}`}>
                                  ✓
                                </span>
                              ) : (
                                <span className="text-slate-400" aria-hidden="true">
                                  —
                                </span>
                              )}
                              {limitValue !== "—" && limitValue !== "✓" ? (
                                <span className="mt-0.5 block text-xs text-slate-600">{limitValue}</span>
                              ) : null}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </Fragment>
                ))}
                {limitRows.length > 0 ? (
                  <Fragment key="usage-limits">
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <th
                        scope="colgroup"
                        colSpan={sorted.length + 1}
                        className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        Usage limits
                      </th>
                    </tr>
                    {limitRows.map((row) => (
                      <tr key={`limit-${row.code}`} className="border-b border-slate-100">
                        <th scope="row" className="sticky left-0 bg-white px-4 py-3 font-medium text-slate-800">
                          {row.name}
                        </th>
                        {sorted.map((plan) => (
                          <td
                            key={`${plan.code}-limit-${row.code}`}
                            className="px-3 py-3 text-center font-medium text-slate-800"
                          >
                            {planLimitDisplay(plan, row.code)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </MockupContainer>
    </section>
  );
}
