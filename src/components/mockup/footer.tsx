"use client";

import { MockupContainer } from "@/components/mockup/container";
import { MockupLogo } from "@/components/mockup/logo";
import { useI18n } from "@/lib/i18n/i18n-provider";

export function MockupFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-white/70 py-8">
      <MockupContainer className="flex flex-col items-center justify-center">
        <MockupLogo size="footer" />
      </MockupContainer>
      <MockupContainer className="mt-6">
        <p className="text-center text-xs text-slate-500">{t("footer.copyright", { year })}</p>
      </MockupContainer>
    </footer>
  );
}
