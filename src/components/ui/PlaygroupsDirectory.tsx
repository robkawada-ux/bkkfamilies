"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PLAYGROUPS,
  DAYS,
  DAY_LABEL,
  ZONES,
  ORGANISERS,
  ALL_LANGUAGES,
  FREQUENCY_LABEL,
  ageLabel,
  ageMatches,
  daysLabel,
  timeLabel,
  priceLabel,
  lowestSessionPrice,
  type Day,
  type Organiser,
  type Zone,
} from "@/lib/playgroups";

/** Age bands a parent actually thinks in, mapped to a representative age in months. */
const AGE_BANDS: { id: string; label: string; months: number }[] = [
  { id: "0-6", label: "Under 6 months", months: 3 },
  { id: "6-12", label: "6 to 12 months", months: 9 },
  { id: "12-18", label: "12 to 18 months", months: 15 },
  { id: "18-24", label: "18 months to 2", months: 21 },
  { id: "2", label: "2 years", months: 30 },
  { id: "3", label: "3 years", months: 42 },
  { id: "4-6", label: "4 to 6 years", months: 60 },
];

type Budget = "All" | "free" | "300" | "500" | "over" | "unknown";

export default function PlaygroupsDirectory() {
  const [query, setQuery] = useState("");
  const [day, setDay] = useState<"All" | "Weekend" | Day>("All");
  const [age, setAge] = useState("All");
  const [zone, setZone] = useState<"All" | Zone>("All");
  const [organiser, setOrganiser] = useState<"All" | Organiser>("All");
  const [language, setLanguage] = useState("All");
  const [budget, setBudget] = useState<Budget>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const band = AGE_BANDS.find((b) => b.id === age);
    return PLAYGROUPS.filter((pg) => {
      const haystack = [
        pg.name,
        pg.venue,
        pg.district,
        pg.zone,
        pg.address ?? "",
        pg.organiser,
        pg.description,
        ...pg.languages,
        ...pg.sessions.map((s) => s.label ?? ""),
      ]
        .join(" ")
        .toLowerCase();
      if (q && !haystack.includes(q)) return false;
      if (zone !== "All" && pg.zone !== zone) return false;
      if (organiser !== "All" && pg.organiser !== organiser) return false;
      if (language !== "All" && !pg.languages.includes(language)) return false;

      // Day and age must match the SAME session, so a Saturday session for
      // 3 to 5s does not pull in a venue whose baby group is on Tuesday.
      const sessionMatch = pg.sessions.some((s) => {
        const dayOk =
          day === "All" ||
          // A session with no published day stays visible rather than
          // punishing the parent for the organiser's gap.
          !s.days ||
          (day === "Weekend"
            ? s.days.includes("Sat") || s.days.includes("Sun")
            : s.days.includes(day));
        const ageOk = !band || ageMatches(band.months, s.minAgeMonths, s.maxAgeMonths);
        return dayOk && ageOk;
      });
      if (!sessionMatch) return false;

      if (budget !== "All") {
        const low = lowestSessionPrice(pg);
        if (budget === "free" && low !== "free") return false;
        if (budget === "unknown" && low !== null) return false;
        if (budget === "300" && !(low === "free" || (typeof low === "number" && low <= 300))) return false;
        if (budget === "500" && !(low === "free" || (typeof low === "number" && low <= 500))) return false;
        if (budget === "over" && !(typeof low === "number" && low > 500)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (a.status !== b.status) return a.status === "confirmed" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [query, day, age, zone, organiser, language, budget]);

  const filtersActive =
    query !== "" ||
    day !== "All" ||
    age !== "All" ||
    zone !== "All" ||
    organiser !== "All" ||
    language !== "All" ||
    budget !== "All";

  const reset = () => {
    setQuery("");
    setDay("All");
    setAge("All");
    setZone("All");
    setOrganiser("All");
    setLanguage("All");
    setBudget("All");
  };

  const inputClass =
    "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none";
  const labelClass =
    "mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500";

  return (
    <div>
      <div className="mb-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
        <div className="sm:col-span-2 lg:col-span-2">
          <label className={labelClass} htmlFor="pg-search">Search</label>
          <input
            id="pg-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try Mandarin, Sathorn, splash, music..."
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="pg-day">Day</label>
          <select
            id="pg-day"
            value={day}
            onChange={(e) => setDay(e.target.value as "All" | "Weekend" | Day)}
            className={inputClass}
          >
            <option value="All">Any day</option>
            <option value="Weekend">Weekend</option>
            {DAYS.filter((d) => d !== "Sun").map((d) => (
              <option key={d} value={d}>
                {DAY_LABEL[d]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pg-age">Child&rsquo;s age</label>
          <select
            id="pg-age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={inputClass}
          >
            <option value="All">Any age</option>
            {AGE_BANDS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pg-zone">Area</label>
          <select
            id="pg-zone"
            value={zone}
            onChange={(e) => setZone(e.target.value as "All" | Zone)}
            className={inputClass}
          >
            <option value="All">All areas</option>
            {ZONES.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pg-org">Run by</label>
          <select
            id="pg-org"
            value={organiser}
            onChange={(e) => setOrganiser(e.target.value as "All" | Organiser)}
            className={inputClass}
          >
            <option value="All">Anyone</option>
            {ORGANISERS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pg-lang">Language</label>
          <select
            id="pg-lang"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={inputClass}
          >
            <option value="All">Any</option>
            {ALL_LANGUAGES.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pg-budget">Price</label>
          <select
            id="pg-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value as Budget)}
            className={inputClass}
          >
            <option value="All">Any</option>
            <option value="free">Free</option>
            <option value="300">Up to ฿300</option>
            <option value="500">Up to ฿500</option>
            <option value="over">Over ฿500</option>
            <option value="unknown">Price not published</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          Showing {filtered.length} of {PLAYGROUPS.length} playgroups
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pg) => (
          <Link
            key={pg.slug}
            href={`/playgroups/${pg.slug}`}
            className="flex flex-col rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple">
                {pg.organiser}
              </span>
              {pg.status === "confirmed" ? (
                <span className="rounded-full bg-green/15 px-2 py-0.5 text-xs font-semibold text-teal">
                  Confirmed this term
                </span>
              ) : (
                <span className="rounded-full bg-orange/10 px-2 py-0.5 text-xs font-semibold text-orange">
                  Check before going
                </span>
              )}
            </div>
            <h3 className="mt-3 font-heading text-base font-bold text-purple-dark">
              {pg.name}
            </h3>
            <p className="mt-0.5 text-xs text-neutral-500">
              {pg.district} &middot; {pg.zone}
            </p>

            <div className="mt-3 space-y-2">
              {pg.sessions.map((s, i) => {
                const when = [daysLabel(s.days), timeLabel(s.start, s.end)]
                  .filter(Boolean)
                  .join(", ");
                const ages = ageLabel(s.minAgeMonths, s.maxAgeMonths);
                const cost = priceLabel(s.price);
                return (
                  <div key={i} className="text-sm">
                    {s.label && (
                      <p className="font-semibold text-neutral-700">{s.label}</p>
                    )}
                    <p className="font-semibold text-teal">
                      {when || "Days and times on request"}
                      {s.frequency !== "weekly" && (
                        <span className="font-normal text-neutral-500">
                          {" "}
                          &middot; {FREQUENCY_LABEL[s.frequency]}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {ages ?? "Age range not published"}
                    </p>
                    <p className="text-sm text-neutral-700">
                      {cost ?? (
                        <span className="text-neutral-400">Price not published</span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            {pg.languages.some((l) => l !== "English") && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {pg.languages
                  .filter((l) => l !== "English")
                  .map((l) => (
                    <span
                      key={l}
                      className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal"
                    >
                      {l}
                    </span>
                  ))}
              </div>
            )}
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-neutral-400">
            Nothing matches those filters. Try clearing one of them.
          </p>
        )}
      </div>
    </div>
  );
}
