import Image from "next/image";
import Link from "next/link";
import { marketingCopyrightNotice } from "@/config/brand";
import { Container } from "@/components/ui/container";
import type { MarketingContent } from "@/types/marketing";

type SiteFooterProps = {
  content: MarketingContent;
};

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-brand-navy text-white">
      <Container className="py-12 md:py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Image
              src="/logos/ekklesianexus-mark.png"
              alt="EkklesiaNexus"
              width={48}
              height={48}
              className="h-10 w-10"
            />
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {content.footer.statement}
            </p>
          </div>
          <nav className="flex flex-col gap-3" aria-label="Legal">
            {content.footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-400">
          {marketingCopyrightNotice()}
        </p>
      </Container>
    </footer>
  );
}
