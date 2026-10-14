"use client";

import { useState } from "react";
import {
  AGE_FILTERS,
  AGE_LABELS,
  DAY_FILTERS,
  type Age,
  type Day,
  type HalloweenEvent,
} from "@/lib/halloween";

export function Pumpkin({ on, scream }: { on: boolean; scream?: boolean }) {
  const fill = on ? (scream ? "#C2234B" : "#F4831F") : "#E2DAEC";
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[18px] w-[18px]">
      <path
        fill={fill}
        d="M10 4.2c-.4-1.4.2-2.6 1.6-3l.5 1c-.8.3-1.1.9-.9 1.8 2.9-.9 6.8 1.3 6.8 6.6 0 4.4-3 7.4-8 7.4s-8-3-8-7.4c0-5.3 3.9-7.5 6.8-6.6Z"
      />
    </svg>
  );
}

export function FrightMeter({ level }: { level: 1 | 2 | 3 }) {
  const names = { 1: "Giggle", 2: "Shiver", 3: "Scream" } as const;
  return (
    <span className="flex shrink-0 gap-0.5" title={`Fright level: ${names[level]}`}>
      <span className="sr-only">Fright level {level} of 3, {names[level]}</span>
      {[1, 2, 3].map((n) => (
        <Pumpkin key={n} on={n <= level} scream={level === 3} />
      ))}
    </span>
  );
}

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full border-2 px-3 py-1 text-sm font-semibold transition ${
        pressed
          ? "border-purple-dark bg-purple-dark text-white"
          : "border-purple/20 bg-white text-purple-dark hover:border-orange"
      }`}
    >
      {children}
    </button>
  );
}

export default function HalloweenEventFinder({ events }: { events: HalloweenEvent[] }) {
  const [day, setDay] = useState<Day | "all">("all");
  const [age, setAge] = useState<Age | "all">("all");
  const [freeOnly, setFreeOnly] = useState(false);

  const shown = events.filter(
    (e) =>
      (day === "all" || e.days.includes(day)) &&
      (age === "all" || e.ages.includes(age)) &&
      (!freeOnly || e.free),
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter Halloween events"
        className="mb-6 grid gap-3 rounded-xl border border-purple/15 bg-purple-50 p-4"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-full text-xs font-bold uppercase tracking-widest text-purple sm:w-14">When</span>
          {DAY_FILTERS.map((f) => (
            <Chip key={f.id} pressed={day === f.id} onClick={() => setDay(f.id)}>
              {f.label}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-full text-xs font-bold uppercase tracking-widest text-purple sm:w-14">Who</span>
          {AGE_FILTERS.map((f) => (
            <Chip key={f.id} pressed={age === f.id} onClick={() => setAge(f.id)}>
              {f.label}
            </Chip>
          ))}
          <Chip pressed={freeOnly} onClick={() => setFreeOnly(!freeOnly)}>
            Free or free to wander
          </Chip>
        </div>
        <p className="text-sm text-neutral-600" aria-live="polite">
          Showing {shown.length} of {events.length} events
        </p>
      </div>

      {shown.length === 0 ? (
        <p className="rounded-xl border-2 border-dashed border-purple/20 p-8 text-center text-neutral-600">
          Nothing matches that combination. Try another day, or see the at-home ideas further down.
        </p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((e) => (
            <li key={e.name} className="flex flex-col gap-3 rounded-xl border border-black/5 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading text-lg font-bold leading-snug text-purple-dark">{e.name}</h3>
                  <p className="mt-0.5 text-sm text-neutral-500">{e.venue}</p>
                </div>
                <FrightMeter level={e.fright} />
              </div>
              <p className="w-fit rounded-md bg-purple-50 px-2.5 py-1 text-sm font-semibold text-purple-dark">{e.when}</p>
              <p className="text-[15px] leading-relaxed text-neutral-700">{e.blurb}</p>
              <div className="flex flex-wrap gap-1.5">
                {e.free && (
                  <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-bold text-green-800">Free or free to wander</span>
                )}
                {e.price && (
                  <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-bold text-orange-700">{e.price}</span>
                )}
                {e.teen ? (
                  <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-700">{e.teen}</span>
                ) : (
                  e.ages.map((a) => (
                    <span key={a} className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-bold text-neutral-600">
                      {AGE_LABELS[a]}
                    </span>
                  ))
                )}
              </div>
              <p className="mt-auto text-sm">
                {e.link && (
                  <a href={e.link} target="_blank" rel="noopener" className="font-semibold text-orange hover:underline">
                    Details and booking
                  </a>
                )}
                {e.link && e.contact && <span className="text-neutral-400"> · </span>}
                {e.contact && <span className="text-neutral-600">{e.contact}</span>}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
