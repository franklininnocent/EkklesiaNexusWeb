import { PersonAvatar } from "@/components/mockup/avatars";

function ChartLine({ gid }: { gid: string }) {
  return (
    <svg viewBox="0 0 220 88" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 70 C20 62 28 48 48 50 C70 52 78 22 98 28 C118 34 128 18 150 20 C172 22 186 40 220 16 V88 H0 Z"
        fill={`url(#${gid})`}
      />
      <path
        d="M0 70 C20 62 28 48 48 50 C70 52 78 22 98 28 C118 34 128 18 150 20 C172 22 186 40 220 16"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DesktopDashboard({ gid = "chart-a" }: { gid?: string }) {
  return (
    <div className="overflow-hidden rounded-[10px] bg-white">
      <div className="flex min-h-[210px]">
        <aside className="flex w-[46px] flex-col items-center gap-2.5 bg-[#e6fffa] py-3 sm:w-[52px]">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400" />
          {["#99f6e4", "#a5f3fc", "#c4b5fd", "#bae6fd", "#fde68a"].map((c) => (
            <div key={c} className="h-3.5 w-3.5 rounded-md" style={{ background: c }} />
          ))}
        </aside>
        <div className="min-w-0 flex-1 p-3">
          <div className="mb-2.5 flex items-center justify-between">
            <div
              className="text-[9px] font-extrabold leading-none tracking-[-0.03em]"
              aria-hidden="true"
            >
              <span className="text-[#003070]">Ekklesia</span>
              <span className="text-[#E0A830]">Nexus</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-16 rounded-md bg-sky-50" />
              <div className="h-5 w-5 rounded-full bg-teal-200" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { bg: "#dbeafe", bar: "#60a5fa" },
              { bg: "#d1fae5", bar: "#34d399" },
              { bg: "#ede9fe", bar: "#a78bfa" },
            ].map((card) => (
              <div key={card.bg} className="rounded-lg p-2" style={{ background: card.bg }}>
                <div className="h-1.5 w-8 rounded" style={{ background: card.bar, opacity: 0.45 }} />
                <div className="mt-1.5 h-2.5 w-10 rounded bg-white" />
              </div>
            ))}
          </div>
          <div className="mt-2 h-[78px] rounded-lg bg-slate-50 px-1 pt-1">
            <ChartLine gid={gid} />
          </div>
          <div className="mt-2 space-y-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <div className="h-1.5 flex-1 rounded bg-slate-100" />
                <div className="h-1.5 w-8 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommunityDashboardScreen() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-inner">
      <div className="flex shrink-0 items-center gap-1 border-b border-slate-100 bg-[#f8fafc] px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="ml-1 truncate text-[5.5px] text-slate-400">parish.ekklesianexus.app</span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden bg-[#f7f8fb] p-1.5">
        <div className="mb-1 flex items-start justify-between gap-1">
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <p className="truncate text-[8px] font-extrabold leading-none text-slate-800">
                Our Lady of Lourdes Ward
              </p>
              <span className="rounded-full bg-[#14b8a6] px-1.5 py-[1px] text-[5px] font-semibold leading-none text-white">
                View
              </span>
            </div>
            <p className="mt-0.5 truncate text-[5.5px] text-slate-500">
              St. Mary Parish · Sector 4 · Sunday 7:30 AM
            </p>
          </div>
          <div className="flex shrink-0 gap-1">
            <span className="h-3 w-8 rounded bg-white shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-teal-200" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1">
          {[
            { label: "Families", value: "52" },
            { label: "Members", value: "187" },
            { label: "Active", value: "162" },
            { label: "Leadership", value: "Francis" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-md bg-white px-1 py-1 shadow-sm">
              <p className="text-[5px] font-medium uppercase tracking-wide text-slate-400">{kpi.label}</p>
              <p className="text-[8px] font-extrabold leading-tight text-slate-800">{kpi.value}</p>
            </div>
          ))}
        </div>

        <p className="mt-1 truncate rounded bg-white px-1 py-0.5 text-[5.5px] text-slate-500">
          <span className="font-semibold text-slate-700">Community at a glance</span>
          {" · 52 families · 187 members · 87% active"}
        </p>

        <div className="mt-1 grid min-h-0 grid-cols-[0.9fr_1.1fr_1fr] gap-1">
          <div className="rounded-md bg-white p-1 shadow-sm">
            <p className="text-[5.5px] font-bold text-slate-600">Life stage</p>
            <div className="mt-1 flex items-center justify-center">
              <div
                className="h-11 w-11 rounded-full"
                style={{
                  background:
                    "conic-gradient(#2563eb 0 22%, #0d9488 22% 48%, #7c3aed 48% 68%, #ca8a04 68% 86%, #be123c 86% 100%)",
                }}
              />
            </div>
          </div>
          <div className="rounded-md bg-white p-1 shadow-sm">
            <p className="text-[5.5px] font-bold text-slate-600">Membership status</p>
            <div className="mt-1.5 flex h-10 items-end gap-0.5 px-0.5">
              {[18, 28, 22, 32, 24, 16].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-emerald-400/80"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-md bg-white p-1 shadow-sm">
            <p className="text-[5.5px] font-bold text-slate-600">Leaders</p>
            <ul className="mt-1 space-y-0.5">
              {["Francis Mathew", "Anna Thomas", "Joseph George"].map((name) => (
                <li key={name} className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                  <span className="truncate text-[5.5px] font-medium text-slate-600">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MassIntentionsScreen() {
  const masses = [
    { time: "6:30 AM", label: "Weekday" },
    { time: "7:00 AM", label: "Sunday", featured: true },
    { time: "9:00 AM", label: "Sunday" },
    { time: "6:00 PM", label: "Evening" },
  ];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-inner">
      <nav
        className="flex shrink-0 items-center gap-1.5 border-b border-slate-100 bg-[#f8fafc] px-2 py-1 text-[5.5px] font-medium text-slate-400"
        aria-hidden="true"
      >
        {["Dashboard", "Register", "Types", "Settings", "Reports", "Audit"].map((tab, i) => (
          <span
            key={tab}
            className={i === 0 ? "rounded-full bg-teal-500 px-1.5 py-[1px] font-semibold text-white" : ""}
          >
            {tab}
          </span>
        ))}
      </nav>

      <div className="min-h-0 flex-1 overflow-hidden bg-[#f4f7fb] p-1.5">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-[8px] font-extrabold leading-none text-slate-800">Mass Intentions</p>
          <span className="rounded bg-white px-1 py-[1px] text-[5px] font-medium text-slate-500 shadow-sm">
            This week
          </span>
        </div>

        <p className="mb-1 truncate rounded-md bg-sky-50 px-1 py-0.5 text-[5.5px] text-sky-800">
          <span className="font-bold">Next Mass 7:00 AM</span>
          {" · Collect a new intention for someone special"}
        </p>

        <div className="grid grid-cols-4 gap-1">
          {[
            { label: "Open", value: "3" },
            { label: "Registered", value: "1" },
            { label: "This week", value: "4" },
            { label: "Said", value: "3" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-md bg-white px-1 py-1 shadow-sm">
              <p className="text-[5px] font-medium uppercase tracking-wide text-slate-400">{kpi.label}</p>
              <p className="text-[8px] font-extrabold leading-tight text-slate-800">{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-1 grid min-h-0 grid-cols-[1.2fr_0.9fr] gap-1">
          <div className="rounded-md bg-white p-1 shadow-sm">
            <p className="text-[5.5px] font-bold text-slate-600">Host Masses</p>
            <div className="mt-1 grid grid-cols-2 gap-0.5">
              {masses.map((mass) => (
                <div
                  key={mass.time}
                  className={`rounded px-1 py-0.5 ${mass.featured ? "bg-sky-100" : "bg-slate-50"}`}
                >
                  <p className="text-[6.5px] font-extrabold leading-tight text-slate-800">{mass.time}</p>
                  <p className="text-[5px] text-slate-500">{mass.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md bg-white p-1 shadow-sm">
            <p className="text-[5.5px] font-bold text-slate-600">Last four months</p>
            <div className="mt-1 flex items-center gap-1">
              <div
                className="h-10 w-10 shrink-0 rounded-full"
                style={{
                  background: "conic-gradient(#0ea5e9 0 45%, #14b8a6 45% 78%, #cbd5e1 78% 100%)",
                }}
              />
              <ul className="min-w-0 space-y-0.5">
                {["Registered", "Closed", "Said"].map((label) => (
                  <li key={label} className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-sky-400" />
                    <span className="truncate text-[5px] text-slate-500">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhoneGiving() {
  return (
    <div className="mx-auto h-full w-full rounded-[1.2rem] bg-white p-2.5">
      <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-slate-200" />
      <div className="text-center text-[9px] font-semibold text-slate-600">Give</div>
      <div className="mt-2 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 p-2.5 text-white">
        <div className="text-[8px] opacity-80">This month</div>
        <div className="mt-0.5 text-base font-bold">1,250</div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {["Tithe", "Offering", "Project", "Gift"].map((label) => (
          <div
            key={label}
            className="rounded-lg bg-slate-50 px-1.5 py-1.5 text-center text-[8px] font-medium text-slate-600"
          >
            {label}
          </div>
        ))}
      </div>
      <div className="mt-2 h-7 rounded-full bg-brand-blue text-center text-[9px] font-semibold leading-7 text-white">
        Continue
      </div>
    </div>
  );
}

export function TabletScreen() {
  return (
    <div className="overflow-hidden rounded-[14px] bg-white">
      <DesktopDashboard gid="chart-tablet" />
    </div>
  );
}

const familyNav = [
  { name: "Anthony George", role: "Family Head", tone: 1, active: true },
  { name: "Maria George", role: "Spouse", tone: 3, active: false },
  { name: "Daniel George", role: "Son", tone: 0, active: false },
  { name: "Elena George", role: "Daughter", tone: 5, active: false },
  { name: "Sofia George", role: "Daughter", tone: 2, active: false },
];

const familyCards = [
  { name: "Anthony George", role: "Head of Household", meta: "St. Mary Parish · BCC 12", tone: 1 },
  { name: "Maria George", role: "Spouse", meta: "Choir · Catechist", tone: 3 },
  { name: "Daniel George", role: "Son", meta: "Altar server", tone: 0 },
  { name: "Elena George", role: "Daughter", meta: "Youth ministry", tone: 5 },
];

function MiniMemberCard({
  name,
  role,
  meta,
  tone,
}: {
  name: string;
  role: string;
  meta: string;
  tone: number;
}) {
  return (
    <div className="flex min-h-0 items-start gap-1.5 overflow-hidden rounded-lg bg-[#e6f3d8] p-1.5">
      <div className="shrink-0">
        <PersonAvatar name={name} tone={tone} size={28} />
      </div>
      <div className="min-w-0 pt-0.5">
        <p className="truncate text-[7px] font-bold leading-tight text-slate-800">{name}</p>
        <p className="truncate text-[6px] font-semibold leading-tight text-teal-700">{role}</p>
        <p className="mt-0.5 truncate text-[5.5px] leading-tight text-slate-500">{meta}</p>
        <div className="mt-1 flex gap-0.5">
          <span className="h-1 w-6 rounded-sm bg-white/80" />
          <span className="h-1 w-4 rounded-sm bg-white/60" />
        </div>
      </div>
    </div>
  );
}

export function CalendarScreen() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-[#f3f6ef] shadow-inner">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-[#e4eadc] bg-[#fbfbf7] px-2 py-1">
        <p className="text-[8px] font-extrabold leading-none text-slate-800">George Family</p>
        <span className="rounded-full bg-[#14b8a6] px-1.5 py-[1px] text-[5.5px] font-semibold leading-none text-white">
          View
        </span>
        <nav className="ml-1 hidden items-center gap-1.5 text-[6px] text-slate-400 sm:flex" aria-hidden="true">
          <span className="font-semibold text-slate-700">All</span>
          <span>Pastoral care</span>
          <span>Notes</span>
          <span>Sacraments</span>
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <span className="rounded bg-white px-1 py-[1px] text-[5.5px] font-medium text-slate-500 shadow-sm">
            Actions
          </span>
          <span className="h-2.5 w-2.5 rounded bg-white shadow-sm" />
          <span className="h-2.5 w-2.5 rounded bg-white shadow-sm" />
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[0.78fr_1.22fr_1.05fr] gap-1 p-1">
        <aside className="flex min-h-0 flex-col overflow-hidden rounded-lg bg-white/90 p-1">
          <div className="mb-1 h-3 rounded bg-[#eef3e8]" />
          <p className="px-0.5 text-[5.5px] font-bold uppercase tracking-wide text-slate-400">Family Head</p>
          <ul className="mt-0.5 space-y-0.5">
            {familyNav.map((member) => (
              <li
                key={member.name}
                className={`flex items-center gap-1 rounded-md px-0.5 py-0.5 ${
                  member.active ? "bg-[#d7edc6]" : ""
                }`}
              >
                <PersonAvatar name={member.name} tone={member.tone} size={12} />
                <div className="min-w-0">
                  <p className="truncate text-[6px] font-semibold leading-tight text-slate-700">{member.name}</p>
                  <p className="truncate text-[5px] leading-tight text-slate-400">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <div className="grid min-h-0 grid-rows-2 gap-1">
          {familyCards.slice(0, 2).map((card) => (
            <MiniMemberCard key={card.name} {...card} />
          ))}
        </div>

        <div className="grid min-h-0 grid-rows-2 gap-1">
          {familyCards.slice(2).map((card) => (
            <MiniMemberCard key={card.name} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroDevices() {
  return (
    <div className="relative mx-auto h-[min(380px,78vw)] w-full min-w-0 max-w-[580px] sm:h-[440px]">
      <div className="animate-orb absolute right-2 top-10 h-56 w-56 rounded-full bg-cyan-300/70 blur-3xl" />
      <div className="animate-orb absolute bottom-6 right-8 h-44 w-44 rounded-full bg-emerald-300/65 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-16 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-300 to-emerald-300 opacity-80 blur-xl" />

      <div className="animate-float relative z-10 ml-auto w-[90%]">
        <div className="rounded-2xl bg-gradient-to-b from-slate-200 to-slate-100 p-[7px] shadow-2xl shadow-cyan-500/25">
          <div className="mb-1.5 flex items-center gap-1 px-1">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <DesktopDashboard gid="chart-hero" />
        </div>
      </div>

      <div className="animate-float-slow absolute bottom-1 left-0 z-20 w-[46%] max-w-[210px]">
        <div className="rounded-[1.35rem] border-[8px] border-slate-800 bg-slate-800 p-1 shadow-2xl shadow-slate-900/35">
          <TabletScreen />
        </div>
      </div>
    </div>
  );
}
