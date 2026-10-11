type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  id,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl";

  return (
    <header className={`mb-10 md:mb-12 ${alignClass}`}>
      <h2 id={id} className="font-display text-3xl font-semibold tracking-tight text-brand-navy md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">{subtitle}</p>
      ) : null}
    </header>
  );
}
