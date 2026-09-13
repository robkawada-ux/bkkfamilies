"use client";

import { useState } from "react";
import {
  SCHOOL_CALENDARS,
  BREAK_WINDOWS,
  type BreakWindowId,
} from "@/lib/schoolBreaks";

/** Academic year spine. Everything is positioned as a % of this span. */
const SPINE_START = "2026-08-01";
const SPINE_END = "2027-08-31";

const WINDOW_COLOR: Record<BreakWindowId, string> = {
  "oct-2026": "bg-orange",
  "winter-2026": "bg-teal",
  "spring-2027": "bg-green",
  "songkran-2027": "bg-purple",
  "summer-2027": "bg-orange",
  "other-2027": "bg-purple-dark",
};

function toDays(iso: string): number {
  return new Date(`${iso}T00:00:00Z`).getTime() / 86_400_000;
}

const SPINE_0 = toDays(SPINE_START);
const SPINE_SPAN = toDays(SPINE_END) - SPINE_0;

function pct(iso: string): number {
  return ((toDays(iso) - SPINE_0) / SPINE_SPAN) * 100;
}

const MONTHS = [
  { label: "Aug", iso: "2026-08-01" },
  { label: "Sep", iso: "2026-09-01" },
  { label: "Oct", iso: "2026-10-01" },
  { label: "Nov", iso: "2026-11-01" },
  { label: "Dec", iso: "2026-12-01" },
  { label: "Jan", iso: "2027-01-01" },
  { label: "Feb", iso: "2027-02-01" },
  { label: "Mar", iso: "2027-03-01" },
  { label: "Apr", iso: "2027-04-01" },
  { label: "May", iso: "2027-05-01" },
  { label: "Jun", iso: "2027-06-01" },
  { label: "Jul", iso: "2027-07-01" },
  { label: "Aug", iso: "2027-08-01" },
];

const SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function label(start: string, end: string): string {
  const [, sm, sd] = start.split("-").map(Number);
  const [, em, ed] = end.split("-").map(Number);
  if (sm === em) return `${sd} to ${ed} ${SHORT[em - 1]}`;
  return `${sd} ${SHORT[sm - 1]} to ${ed} ${SHORT[em - 1]}`;
}

export default function SchoolBreakTimeline() {
  const [hover, setHover] = useState<string | null>(null);

  const withDates = SCHOOL_CALENDARS.filter((s) => s.breaks.length > 0);

  return (
    <div>
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[760px]">
          {/* Year ruler */}
          <div className="relative ml-48 h-4">
            <span
              className="absolute top-0 text-xs font-bold tracking-wide text-neutral-500"
              style={{ left: `${pct("2026-08-01")}%` }}
            >
              2026
            </span>
            <span
              className="absolute top-0 text-xs font-bold tracking-wide text-neutral-500"
              style={{ left: `${pct("2027-01-01")}%` }}
            >
              2027
            </span>
          </div>

          {/* Month ruler */}
          <div className="relative mb-2 ml-48 h-5 border-b border-black/10">
            {MONTHS.map((m) => (
              <span
                key={m.iso}
                className="absolute top-0 text-xs text-neutral-400"
                style={{ left: `${pct(m.iso)}%` }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* One row per school */}
          {withDates.map((s) => (
            <div key={s.name} className="flex items-center py-1.5">
              <div className="w-48 shrink-0 pr-3 text-right text-xs font-semibold leading-tight text-neutral-700">
                {s.name}
              </div>
              <div className="relative h-7 flex-1 rounded bg-neutral-100">
                <div
                  className="absolute inset-y-0 w-px bg-black/15"
                  style={{ left: `${pct("2027-01-01")}%` }}
                  aria-hidden="true"
                />
                {s.breaks.map((b, i) => {
                  const key = `${s.name}-${b.window}-${i}`;
                  const left = pct(b.start);
                  const width = Math.max(pct(b.end) - left, 0.8);
                  return (
                    <div
                      key={key}
                      className={`absolute top-1 h-5 rounded ${WINDOW_COLOR[b.window]} ${b.endEstimated ? "opacity-50" : ""} cursor-default transition hover:ring-2 hover:ring-purple-dark`}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      onMouseEnter={() => setHover(key)}
                      onMouseLeave={() => setHover(null)}
                      role="img"
                      aria-label={`${s.name}, ${label(b.start, b.end)}`}
                    >
                      {hover === key && (
                        <div className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-purple-dark px-2 py-1 text-xs text-white shadow-lg">
                          {label(b.start, b.end)}
                          {b.endEstimated ? " (estimated)" : ""}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {BREAK_WINDOWS.map((w) => (
          <span key={w.id} className="flex items-center gap-2 text-xs text-neutral-600">
            <span className={`inline-block h-3 w-3 rounded ${WINDOW_COLOR[w.id]}`} />
            {w.shortLabel}
          </span>
        ))}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-neutral-500">
        Faded bars are estimated end dates where the next academic year has not
        been published. ISB and KIS are not shown, since their dates are not yet
        confirmed.
      </p>
    </div>
  );
}
