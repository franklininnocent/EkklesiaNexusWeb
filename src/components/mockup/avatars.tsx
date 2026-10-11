type Portrait = {
  skin: string;
  hair: string;
  shirt: string;
  bg: string;
  hairPath: string;
};

const portraits: Portrait[] = [
  {
    skin: "#e8b894",
    hair: "#2c1810",
    shirt: "#2563eb",
    bg: "#dbeafe",
    hairPath: "M18 22 C18 10 46 10 46 22 L46 28 C40 18 24 18 18 28 Z",
  },
  {
    skin: "#c68642",
    hair: "#1a120c",
    shirt: "#0f766e",
    bg: "#ccfbf1",
    hairPath: "M16 24 C16 8 48 8 48 24 L50 32 C44 16 20 16 14 32 Z",
  },
  {
    skin: "#f1c27d",
    hair: "#4a3728",
    shirt: "#7c3aed",
    bg: "#ede9fe",
    hairPath: "M20 20 C22 12 42 12 44 20 L46 26 C40 16 24 16 18 26 Z",
  },
  {
    skin: "#ffdbac",
    hair: "#6b3a2a",
    shirt: "#db2777",
    bg: "#fce7f3",
    hairPath: "M17 24 C20 8 44 8 47 24 C50 18 48 12 32 10 C16 12 14 18 17 24 Z",
  },
  {
    skin: "#d1a679",
    hair: "#111827",
    shirt: "#0369a1",
    bg: "#e0f2fe",
    hairPath: "M18 22 C18 11 46 11 46 22 V30 H18 Z",
  },
  {
    skin: "#e0ac69",
    hair: "#3f2a1d",
    shirt: "#15803d",
    bg: "#dcfce7",
    hairPath: "M19 23 C19 10 45 10 45 23 C48 14 40 12 32 11 C24 12 16 14 19 23 Z",
  },
  {
    skin: "#f3d1b0",
    hair: "#1f2937",
    shirt: "#b45309",
    bg: "#ffedd5",
    hairPath: "M16 26 C18 10 46 10 48 26 L46 20 C40 14 24 14 18 20 Z",
  },
];

export function PersonAvatar({
  name,
  tone,
  size = 56,
}: {
  name: string;
  tone: number;
  size?: number;
}) {
  const p = portraits[Math.abs(tone) % portraits.length];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className="rounded-full shadow-[0_8px_20px_rgba(15,23,42,0.12)] ring-2 ring-white"
      role="img"
      aria-label={name}
    >
      <circle cx="32" cy="32" r="32" fill={p.bg} />
      <path d="M12 64 C14 42 22 38 32 38 C42 38 50 42 52 64 Z" fill={p.shirt} />
      <circle cx="32" cy="26" r="13" fill={p.skin} />
      <path d={p.hairPath} fill={p.hair} />
      <circle cx="27" cy="26" r="1.4" fill="#1f2937" />
      <circle cx="37" cy="26" r="1.4" fill="#1f2937" />
    </svg>
  );
}
