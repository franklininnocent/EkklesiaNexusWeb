import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getRequestI18n } from "@/lib/i18n/server";
import { publicPagePath } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getRequestI18n();
  const t = createTranslator(getMessages(locale));
  return {
    title: t("seo.notFoundTitle"),
    robots: { index: false, follow: false },
  };
}

export default async function NotFound() {
  const { locale, t } = await getRequestI18n();
  const homeHref = publicPagePath(locale, "home");

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-2 py-16">
      <Container className="text-center">
        <h1 className="text-[clamp(1.5rem,4vw+0.8rem,1.875rem)] font-semibold text-slate-900">
          {t("errors.notFoundTitle")}
        </h1>
        <p className="mt-4 text-pretty text-[var(--text-secondary)]">{t("errors.notFoundBody")}</p>
        <Link
          href={homeHref}
          className="mt-8 inline-flex rounded-[var(--radius-md)] bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--brand-blue-hover)]"
        >
          {t("common.actions.goToHomepage")}
        </Link>
      </Container>
    </main>
  );
}
