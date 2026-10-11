type Tone = "cyan" | "amber" | "purple" | "sky" | "rose" | "indigo";

export function FeatureArt({ id }: { id: string; tone: Tone }) {
  if (id === "members") return <MembersArt />;
  if (id === "giving") return <GivingArt />;
  if (id === "events") return <EventsArt />;
  if (id === "comms") return <CommsArt />;
  if (id === "groups") return <GroupsArt />;
  return <VolunteersArt />;
}

function MembersArt() {
  return (
    <svg viewBox="0 0 180 130" className="h-[7.25rem] w-full" aria-hidden="true">
      <ellipse cx="58" cy="118" rx="32" ry="8" fill="#d1fae5" />
      <ellipse cx="118" cy="118" rx="34" ry="8" fill="#a5f3fc" />
      <rect x="34" y="72" width="48" height="42" rx="14" fill="#2dd4bf" />
      <circle cx="58" cy="58" r="18" fill="#5eead4" />
      <rect x="92" y="68" width="52" height="46" rx="15" fill="#22d3ee" />
      <circle cx="118" cy="52" r="20" fill="#67e8f9" />
    </svg>
  );
}

function GivingArt() {
  return (
    <svg viewBox="0 0 180 130" className="h-[7.25rem] w-full" aria-hidden="true">
      <ellipse cx="90" cy="118" rx="50" ry="8" fill="#ffedd5" />
      <ellipse cx="90" cy="92" rx="58" ry="22" fill="#fdba74" />
      <ellipse cx="90" cy="86" rx="44" ry="14" fill="#fb923c" />
      <ellipse cx="90" cy="84" rx="30" ry="8" fill="#fed7aa" />
      <path
        d="M90 80 C86 72 74 72 74 80 C74 86 90 96 90 96 C90 96 106 86 106 80 C106 72 94 72 90 80 Z"
        fill="#f97316"
      />
      <circle cx="90" cy="28" r="16" fill="#fbbf24" />
      <circle cx="90" cy="28" r="10" fill="#fde68a" />
      <rect x="132" y="40" width="34" height="24" rx="6" fill="#fcd34d" />
      <path d="M132 44 L149 56 L166 44" stroke="#b45309" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function EventsArt() {
  return (
    <svg viewBox="0 0 180 130" className="h-[7.25rem] w-full" aria-hidden="true">
      <ellipse cx="90" cy="118" rx="48" ry="8" fill="#ede9fe" />
      <rect x="52" y="30" width="88" height="76" rx="14" fill="#ddd6fe" />
      <rect x="52" y="30" width="88" height="18" rx="14" fill="#8b5cf6" />
      <rect x="52" y="40" width="88" height="8" fill="#8b5cf6" />
      <rect x="66" y="80" width="12" height="14" rx="3" fill="#c4b5fd" />
      <rect x="84" y="70" width="12" height="24" rx="3" fill="#a78bfa" />
      <rect x="102" y="56" width="12" height="38" rx="3" fill="#6d28d9" />
      <rect x="120" y="64" width="12" height="30" rx="3" fill="#8b5cf6" />
      <circle cx="34" cy="92" r="16" fill="#c4b5fd" />
      <path d="M34 76 A16 16 0 0 1 50 92 L34 92 Z" fill="#8b5cf6" />
      <circle cx="34" cy="92" r="7" fill="#f5f3ff" />
    </svg>
  );
}

function CommsArt() {
  return (
    <svg viewBox="0 0 180 130" className="h-[7.25rem] w-full" aria-hidden="true">
      <ellipse cx="90" cy="118" rx="48" ry="8" fill="#e0f2fe" />
      <path d="M30 42 C30 42 84 30 84 42 L84 104 C84 92 30 104 30 104 Z" fill="#bae6fd" />
      <path d="M84 42 C84 30 150 42 150 42 L150 104 C150 104 84 92 84 104 Z" fill="#38bdf8" />
      <rect x="80" y="36" width="8" height="72" rx="3" fill="#0284c7" />
      <circle cx="54" cy="70" r="13" fill="#7dd3fc" />
      <rect x="52" y="58" width="4" height="22" rx="1.5" fill="#0369a1" />
      <rect x="47" y="64" width="14" height="4" rx="1.5" fill="#0369a1" />
      <rect x="102" y="56" width="34" height="5" rx="2.5" fill="#e0f2fe" />
      <rect x="102" y="68" width="26" height="5" rx="2.5" fill="#e0f2fe" />
      <rect x="102" y="80" width="30" height="5" rx="2.5" fill="#e0f2fe" />
    </svg>
  );
}

function GroupsArt() {
  return (
    <svg viewBox="0 0 180 130" className="h-[7.25rem] w-full" aria-hidden="true">
      <ellipse cx="90" cy="118" rx="50" ry="8" fill="#ffe4e6" />
      <rect x="42" y="82" width="96" height="28" rx="14" fill="#fecdd3" />
      <ellipse cx="90" cy="84" rx="48" ry="13" fill="#fda4af" />
      <circle cx="90" cy="36" r="13" fill="#fb7185" />
      <rect x="76" y="48" width="28" height="24" rx="10" fill="#fb7185" />
      <circle cx="48" cy="52" r="11" fill="#fda4af" />
      <rect x="36" y="62" width="24" height="22" rx="10" fill="#fda4af" />
      <circle cx="132" cy="52" r="11" fill="#fda4af" />
      <rect x="120" y="62" width="24" height="22" rx="10" fill="#fda4af" />
      <rect x="88" y="78" width="4" height="12" rx="1.5" fill="#9f1239" />
      <rect x="83" y="82" width="14" height="4" rx="1.5" fill="#9f1239" />
    </svg>
  );
}

function VolunteersArt() {
  return (
    <svg viewBox="0 0 180 130" className="h-[7.25rem] w-full" aria-hidden="true">
      <ellipse cx="90" cy="118" rx="48" ry="8" fill="#e0e7ff" />
      <rect x="86" y="12" width="8" height="22" rx="2" fill="#4f46e5" />
      <rect x="78" y="18" width="24" height="8" rx="2" fill="#4f46e5" />
      <path d="M50 58 L90 26 L130 58 Z" fill="#6366f1" />
      <rect x="62" y="54" width="56" height="52" rx="10" fill="#818cf8" />
      <circle cx="90" cy="72" r="8" fill="#e0e7ff" />
      <rect x="82" y="84" width="16" height="22" rx="8" fill="#c7d2fe" />
      <circle cx="38" cy="96" r="14" fill="#a5b4fc" />
      <circle cx="142" cy="96" r="14" fill="#a5b4fc" />
    </svg>
  );
}
