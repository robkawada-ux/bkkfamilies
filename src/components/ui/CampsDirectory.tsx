"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ALL_SESSIONS,
  ALL_CATEGORIES,
  ALL_AREAS,
  type CampCategory,
  type CampFormat,
} from "@/lib/camps";
import { BREAK_WINDOWS, type BreakWindowId } from "@/lib/schoolBreaks";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function range(start?: string, end?: string): string | null {
  if (!start || !end) return null;
  const [, sm, sd] = start.split("-").map(Number);
  const [, em, ed] = end.split("-").map(Number);
  if (sm === em) return `${sd} to ${ed} ${MONTHS[em - 1]}`;
  return `${sd} ${MONTHS[sm - 1]} to ${ed} ${MONTHS[em - 1]}`;
}

function price(from?: number, to?: number, unit?: string): string | null {
  if (!from) return null;
  const label = to && to !== from
    ? `฿${from.toLocaleString()} to ฿${to.toLocaleString()}`
    : `฿${from.toLocaleString()}`;
  const suffix =
    unit === "per-week" ? " a week"
    : unit === "per-day" ? " a day"
    : "";
  return label + suffix;
}

const CATEGORY_LABEL: Record<CampCategory, string> = {
  academic: "Academic",
  "art-and-design": "Art and design",
  cookery: "Cookery",
  "language-learning": "Language learning",
  "music-and-drama": "Music and drama",
  "nature-and-outdoors": "Nature and outdoors",
  "sport-and-fitness": "Sport and fitness",
  stem: "STEM",
  swimming: "Swimming",
  "multi-activity": "Multi-activity",
};

const FORMAT_LABEL: Record<CampFormat, string> = {
  day: "Day camp",
  "half-day": "Half day",
  residential: "Residential",
};

export default function CampsDirectory() {
  const [query, setQuery] = useState("");
  const [window, setWindow] = useState<"All" | BreakWindowId>("All");
  const [category, setCategory] = useState<"All" | CampCategory>("All");
  const [area, setArea] = useState("All");
  const [format, setFormat] = useState<"All" | CampFormat>("All");
  const [age, setAge] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const ageNum = age === "" ? null : Number(age);
    return ALL_SESSIONS.filter((s) => {
      const haystack = [
        s.camp.name,
        s.programme,
        s.camp.area,
        s.venue ?? "",
        s.note ?? "",
        ...s.categories,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = q === "" || haystack.includes(q);
      const matchesWindow = window === "All" || s.window === window;
      const matchesCategory =
        category === "All" || s.categories.includes(category);
      const matchesArea = area === "All" || s.camp.area === area;
      const matchesFormat = format === "All" || s.format === format;
      const matchesAge =
        ageNum === null ||
        (Number.isFinite(ageNum) && ageNum >= s.minAge && ageNum <= s.maxAge);
      return (
        matchesQuery &&
        matchesWindow &&
        matchesCategory &&
        matchesArea &&
        matchesFormat &&
        matchesAge
      );
    }).sort((a, b) => {
      // Confirmed dates first, then by start date, then by name.
      if (a.dateStatus !== b.dateStatus) {
        if (a.dateStatus === "confirmed") return -1;
        if (b.dateStatus === "confirmed") return 1;
      }
      if (a.startDate && b.startDate) {
        return a.startDate.localeCompare(b.startDate);
      }
      if (a.startDate) return -1;
      if (b.startDate) return 1;
      return a.camp.name.localeCompare(b.camp.name);
    });
  }, [query, window, category, area, format, age]);

  const filtersActive =
    query !== "" ||
    window !== "All" ||
    category !== "All" ||
    area !== "All" ||
    format !== "All" ||
    age !== "";

  const reset = () => {
    setQuery("");
    setWindow("All");
    setCategory("All");
    setArea("All");
    setFormat("All");
    setAge("");
  };

  const inputClass =
    "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none";
  const labelClass =
    "mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500";

  return (
    <div>
      <div className="mb-6 grid gap-3 md:grid-cols-4 lg:grid-cols-7">
        <div className="lg:col-span-2">
          <label className={labelClass}>Search</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try Minecraft, Mandarin, football, Sukhumvit..."
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>When</label>
          <select
            value={window}
            onChange={(e) => setWindow(e.target.value as "All" | BreakWindowId)}
            className={inputClass}
          >
            <option value="All">Any break</option>
            {BREAK_WINDOWS.map((w) => (
              <option key={w.id} value={w.id}>
                {w.shortLabel}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Child&rsquo;s age</label>
          <input
            type="number"
            min={0}
            max={18}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Any"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Activity</label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "All" | CampCategory)
            }
            className={inputClass}
          >
            <option value="All">Anything</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABEL[c]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Area</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={inputClass}
          >
            <option value="All">All areas</option>
            {ALL_AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as "All" | CampFormat)}
            className={inputClass}
          >
            <option value="All">Any</option>
            <option value="day">Day camp</option>
            <option value="half-day">Half day</option>
            <option value="residential">Residential</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          Showing {filtered.length} of {ALL_SESSIONS.length} camp weeks
        </p>
        <button
          type="button"
          onClick={reset}
          disabled={!filtersActive}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-600 transition hover:border-orange hover:text-orange disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-300 disabled:hover:text-neutral-600"
        >
          Clear filters
        </button>
      </div>

      {window !== "All" && filtered.length < 6 && (
        <div className="mb-4 rounded-xl border border-black/5 bg-orange-50 p-4 text-sm leading-relaxed text-neutral-700">
          <strong className="font-semibold">Thin results are normal this far out.</strong>{" "}
          Most Bangkok camps do not publish dates until four to six weeks
          before a break, and summer programmes often wait until January. If
          the break you are looking at is months away, come back closer to the
          time, or check the camps marked as not yet re-announced, since those
          run most years and are the ones worth watching.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const dates = range(s.startDate, s.endDate);
          const cost = price(s.priceFrom, s.priceTo, s.priceUnit);
          const past = s.dateStatus !== "confirmed";
          return (
            <Link
              key={s.id}
              href={`/camps/${s.camp.slug}`}
              className={`block rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${past ? "opacity-75" : ""}`}
            >
              <h3 className="font-heading text-base font-bold text-purple-dark">
                {s.programme}
              </h3>
              <p className="mt-0.5 text-sm text-neutral-600">{s.camp.name}</p>

              <p className="mt-3 text-sm font-semibold text-teal">
                {dates ?? "Dates not announced"}
              </p>
              {past && (
                <p className="mt-0.5 text-xs text-neutral-500">
                  {s.previousRun
                    ? `Last ran ${s.previousRun}. Not yet re-announced.`
                    : "Not yet re-announced for this year."}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.categories.slice(0, 2).map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal"
                  >
                    {CATEGORY_LABEL[c]}
                  </span>
                ))}
                {s.format !== "day" && (
                  <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple">
                    {FORMAT_LABEL[s.format]}
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs text-neutral-500">
                Ages {s.minAge} to {s.maxAge} &middot; {s.camp.area}
              </p>
              <p className="mt-1 text-sm font-semibold text-neutral-700">
                {cost ?? (
                  <span className="font-normal text-neutral-400">
                    Price not published
                  </span>
                )}
              </p>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-neutral-400">
            Nothing matches those filters. Try clearing one of them.
          </p>
        )}
      </div>
    </div>
  );
}
