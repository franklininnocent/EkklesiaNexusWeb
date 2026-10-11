"use client";

import { useTranslations } from "@/lib/i18n/i18n-provider";

export default function ErrorPage({ reset }: { reset: () => void }) {
  const t = useTranslations();

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4 py-16 text-center">
      <h1 className="text-xl font-semibold">{t("errors.somethingWrong")}</h1>
      <p className="text-slate-600">{t("errors.tryAgainMoment")}</p>
      <button type="button" className="rounded-md border px-3 py-2" onClick={() => reset()}>
        {t("common.actions.tryAgain")}
      </button>
    </main>
  );
}
