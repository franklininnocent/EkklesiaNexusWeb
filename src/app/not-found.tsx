import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found — EkklesiaNexus",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-2 py-16">
      <Container className="text-center">
        <h1 className="text-[clamp(1.5rem,4vw+0.8rem,1.875rem)] font-semibold text-slate-900">Page not found</h1>
        <p className="mt-4 text-pretty text-[var(--text-secondary)]">
          This marketing site is a single homepage experience. Return to EkklesiaNexus.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-[var(--radius-md)] bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--brand-blue-hover)]"
        >
          Go to homepage
        </Link>
      </Container>
    </main>
  );
}
