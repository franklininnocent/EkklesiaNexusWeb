import Image from "next/image";

type LogoSize = "nav" | "hero" | "footer";

const sizes: Record<
  LogoSize,
  { badge: string; gap: string; text: string; tracking: string }
> = {
  nav: {
    badge: "h-8 w-8",
    gap: "gap-2",
    text: "text-[15px] leading-none",
    tracking: "tracking-[-0.02em]",
  },
  footer: {
    badge: "h-8 w-8",
    gap: "gap-2",
    text: "text-[15px] leading-none",
    tracking: "tracking-[-0.02em]",
  },
  hero: {
    badge: "h-[clamp(3.25rem,18vw,5.5rem)] w-[clamp(3.25rem,18vw,5.5rem)]",
    gap: "gap-2.5 sm:gap-4",
    text: "text-[clamp(1.65rem,8.4vw,2.75rem)] leading-none",
    tracking: "tracking-[-0.03em]",
  },
};

type MockupLogoProps = {
  size?: LogoSize;
  priority?: boolean;
};

export function MockupLogo({ size = "nav", priority = false }: MockupLogoProps) {
  const s = sizes[size];

  return (
    <span className={`inline-flex min-w-0 max-w-full items-center ${s.gap}`}>
      <Image
        src="/logos/ekklesia-circular-badge.png"
        alt=""
        width={512}
        height={512}
        className={`${s.badge} shrink-0 object-contain`}
        priority={priority}
      />
      <span
        className={`min-w-0 font-extrabold ${s.text} ${s.tracking}`}
        aria-hidden={false}
      >
        <span className="text-[#003070]">Ekklesia</span>
        <span className="text-[#E0A830]">Nexus</span>
      </span>
    </span>
  );
}
