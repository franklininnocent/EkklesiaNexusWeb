import Link from "next/link";
import { MockupFooter } from "@/components/mockup/footer";
import { MockupHeader } from "@/components/mockup/header";
import { MockupContainer } from "@/components/mockup/container";
import { getRequestI18n } from "@/lib/i18n/server";
import { publicPagePath } from "@/lib/i18n/locale";

type LegalKind = "privacy" | "terms";

export async function LegalDocumentPage({ kind }: { kind: LegalKind }) {
  const { t, locale } = await getRequestI18n();
  const homeHref = publicPagePath(locale, "home");

  return (
    <>
      <MockupHeader />
      <main id="home" className="flex-1 pb-16 pt-[calc(var(--header-offset)+2rem)]">
        <MockupContainer className="max-w-3xl">
          <h1 className="text-3xl font-semibold text-slate-900">{t(`legal.${kind}.title`)}</h1>
          <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">{t(`legal.${kind}.warning`)}</p>
          <p className="mt-6 text-slate-600">{t(`legal.${kind}.body`)}</p>
          <Link href={homeHref} className="mt-8 inline-block text-brand-blue hover:underline">
            {t(`legal.${kind}.returnHome`)}
          </Link>
        </MockupContainer>
      </main>
      <MockupFooter />
    </>
  );
}
