"use client";

import { useState } from "react";
import type { FinderGroup, FinderItem, FinderMeter, FinderToggle, MeterIcon } from "@/lib/festive";

type Theme = "christmas" | "nye";

// Full class strings so Tailwind keeps them.
const THEMES = {
  christmas: {
    panel: "border-[#0f3b2e]/15 bg-[#eef6f0]",
    groupLabel: "text-[#0f3b2e]",
    chipOn: "border-[#0f3b2e] bg-[#0f3b2e] text-white",
    chipOff: "border-[#0f3b2e]/20 bg-white text-[#0f3b2e] hover:border-[#c62f3a]",
    title: "text-[#0f3b2e]",
    whenPill: "bg-[#eef6f0] text-[#0f3b2e]",
    link: "text-[#c62f3a]",
    on: "#c62f3a",
    hi: "#0f3b2e",
    off: "#dde8e1",
  },
  nye: {
    panel: "border-[#141b44]/15 bg-[#eef0fb]",
    groupLabel: "text-[#141b44]",
    chipOn: "border-[#141b44] bg-[#141b44] text-white",
    chipOff: "border-[#141b44]/20 bg-white text-[#141b44] hover:border-[#e0a526]",
    title: "text-[#141b44]",
    whenPill: "bg-[#eef0fb] text-[#141b44]",
    link: "text-[#b7791f]",
    on: "#e0a526",
    hi: "#d6336c",
    off: "#e3e5f2",
  },
} as const;

const BADGE: Record<string, string> = {
  price: "bg-orange-50 text-orange-700",
  kids: "bg-sky-50 text-sky-800",
  free: "bg-emerald-50 text-emerald-800",
  santa: "bg-rose-50 text-rose-700",
  warn: "bg-amber-50 text-amber-800",
  plain: "bg-neutral-100 text-neutral-700",
};

function Icon({ icon, fill }: { icon: MeterIcon; fill: string }) {
  if (icon === "person") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[18px] w-[18px]">
        <circle cx="10" cy="5.5" r="3.4" fill={fill} />
        <path fill={fill} d="M3.5 18.5c0-4.2 2.9-7.2 6.5-7.2s6.5 3 6.5 7.2Z" />
      </svg>
    );
  }
  if (icon === "star") {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[18px] w-[18px]">
        <path fill={fill} d="m10 1.5 2.5 5.4 5.9.7-4.4 4 1.2 5.8L10 14.5l-5.2 2.9L6 11.6l-4.4-4 5.9-.7Z" />
      </svg>
    );
  }
  // Bauble
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[18px] w-[18px]">
      <rect x="8" y="1.5" width="4" height="3" rx="0.8" fill={fill} opacity="0.7" />
      <circle cx="10" cy="11.5" r="7" fill={fill} />
      <path d="M4 10.2c4 1.8 8 1.8 12 0" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function Meter({
  meter,
  level,
  theme,
}: {
  meter: FinderMeter;
  level: 1 | 2 | 3;
  theme: Theme;
}) {
  const t = THEMES[theme];
  const name = meter.names[level - 1];
  return (
    <span className="flex shrink-0 gap-0.5" title={`${meter.label}: ${name}`}>
      <span className="sr-only">
        {meter.label} {level} of 3, {name}
      </span>
      {[1, 2, 3].map((n) => (
        <Icon key={n} icon={meter.icon} fill={n <= level ? (level === 3 ? t.hi : t.on) : t.off} />
      ))}
    </span>
  );
}

function Chip({
  pressed,
  onClick,
  children,
  theme,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
  theme: Theme;
}) {
  const t = THEMES[theme];
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full border-2 px-3 py-1 text-sm font-semibold transition ${pressed ? t.chipOn : t.chipOff}`}
    >
      {children}
    </button>
  );
}

export default function FestiveFinder({
  items,
  groups,
  toggles = [],
  meter,
  theme,
  label,
  noun,
  empty,
  lastYear,
}: {
  items: FinderItem[];
  groups: FinderGroup[];
  toggles?: FinderToggle[];
  meter?: FinderMeter;
  theme: Theme;
  /** Accessible name for the filter panel. */
  label: string;
  /** Plural noun for the count line, e.g. "dinners". */
  noun: string;
  empty: string;
  /** Year shown on unconfirmed items, e.g. 2025. */
  lastYear: number;
}) {
  const t = THEMES[theme];
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [on, setOn] = useState<string[]>([]);

  const shown = items.filter(
    (e) =>
      groups.every((g) => !picked[g.id] || (e.facets[g.id] ?? []).includes(picked[g.id])) &&
      on.every((id) => (e.flags ?? []).includes(id)),
  );

  return (
    <div>
      <div role="group" aria-label={label} className={`mb-6 grid gap-3 rounded-xl border p-4 ${t.panel}`}>
        {groups.map((g) => (
          <div key={g.id} className="flex flex-wrap items-center gap-2">
            <span className={`w-full text-xs font-bold uppercase tracking-widest sm:w-20 ${t.groupLabel}`}>{g.label}</span>
            <Chip theme={theme} pressed={!picked[g.id]} onClick={() => setPicked({ ...picked, [g.id]: "" })}>
              {g.anyLabel}
            </Chip>
            {g.options.map((o) => (
              <Chip
                key={o.id}
                theme={theme}
                pressed={picked[g.id] === o.id}
                onClick={() => setPicked({ ...picked, [g.id]: picked[g.id] === o.id ? "" : o.id })}
              >
                {o.label}
              </Chip>
            ))}
          </div>
        ))}
        {toggles.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className={`w-full text-xs font-bold uppercase tracking-widest sm:w-20 ${t.groupLabel}`}>Must have</span>
            {toggles.map((x) => (
              <Chip
                key={x.id}
                theme={theme}
                pressed={on.includes(x.id)}
                onClick={() => setOn(on.includes(x.id) ? on.filter((i) => i !== x.id) : [...on, x.id])}
              >
                {x.label}
              </Chip>
            ))}
          </div>
        )}
        <p className="text-sm text-neutral-600" aria-live="polite">
          Showing {shown.length} of {items.length} {noun}
        </p>
      </div>

      {shown.length === 0 ? (
        <p className="rounded-xl border-2 border-dashed border-black/10 p-8 text-center text-neutral-600">{empty}</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((e) => (
            <li key={e.name} className="flex flex-col gap-3 rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className={`font-heading text-lg font-bold leading-snug ${t.title}`}>{e.name}</h3>
                  <p className="mt-0.5 text-sm text-neutral-500">{e.venue}</p>
                </div>
                {meter && e.level && <Meter meter={meter} level={e.level} theme={theme} />}
              </div>
              <p className={`w-fit rounded-md px-2.5 py-1 text-sm font-semibold ${t.whenPill}`}>
                {!e.confirmed && !e.evergreen && <span className="mr-1.5 font-bold opacity-60">{lastYear}:</span>}
                {e.when}
              </p>
              <p className="text-[15px] leading-relaxed text-neutral-700">{e.blurb}</p>
              {(e.badges?.length || e.free || e.confirmed) && (
                <div className="flex flex-wrap gap-1.5">
                  {e.confirmed && (
                    <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">
                      {lastYear + 1} confirmed
                    </span>
                  )}
                  {e.free && <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${BADGE.free}`}>Free</span>}
                  {e.badges?.map((b) => (
                    <span key={b.text} className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${BADGE[b.tone]}`}>
                      {b.text}
                    </span>
                  ))}
                </div>
              )}
              {(e.link || e.contact) && (
                <p className="mt-auto text-sm">
                  {e.link && (
                    <a
                      href={e.link}
                      {...(e.link.startsWith("/") ? {} : { target: "_blank", rel: "noopener" })}
                      className={`font-semibold hover:underline ${t.link}`}
                    >
                      {e.link.startsWith("/") ? "Read more" : "Details and booking"}
                    </a>
                  )}
                  {e.link && e.contact && <span className="text-neutral-400"> · </span>}
                  {e.contact && <span className="text-neutral-600">{e.contact}</span>}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
