import { Container } from "@/components/ui/container";
import type { ValueStripItem } from "@/types/marketing";

type ValueStripProps = {
  items: ValueStripItem[];
};

export function ValueStrip({ items }: ValueStripProps) {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-white py-10 md:py-12" aria-label="Value highlights">
      <Container>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.id}>
              <h3 className="text-base font-semibold text-brand-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
