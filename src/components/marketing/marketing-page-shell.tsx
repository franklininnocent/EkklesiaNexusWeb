import type { ReactNode } from "react";
import { MockupFooter } from "@/components/mockup/footer";
import { MockupHeader } from "@/components/mockup/header";

type MarketingPageShellProps = {
  children: ReactNode;
};

export function MarketingPageShell({ children }: MarketingPageShellProps) {
  return (
    <>
      <MockupHeader />
      <main className="min-h-[60vh] pt-[var(--header-offset)]">{children}</main>
      <MockupFooter />
    </>
  );
}
