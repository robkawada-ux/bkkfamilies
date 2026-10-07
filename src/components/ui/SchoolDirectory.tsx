"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  SCHOOLS,
  ALL_CURRICULA,
  AREAS,
  AREA_LABEL,
  type Area,
  type Budget,
  type School,
} from "@/lib/schools";

export default function SchoolDirectory() {
  const [query, setQuery] = useState("");
  const [curriculum, setCurriculum] = useState("All");
  const [budget, setBudget] = useState<"All" | Budget>("All");
  const [area, setArea] = useState<"All" | Area>("All");

  const filtered = useMemo(() => {
    return SCHOOLS.filter((s) => {
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
      const matchesCurriculum =
        curriculum === "All" || s.curricula.includes(curriculum);
      const matchesBudget = budget === "All" || s.budget === budget;
      const matchesArea = area === "All" || s.areas.includes(area);
      return matchesQuery && matchesCurriculum && matchesBudget && matchesArea;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [query, curriculum, budget, area]);

  // Group by location, in the fixed AREAS order. With a location chosen, a
  // school belongs to that group even when it is not the school's main area.
  const groups = useMemo(() => {
    return AREAS.map((a) => ({
      ...a,
      schools: filtered.filter((s) =>
        area === "All" ? s.areas[0] === a.id : a.id === area
      ),
    })).filter((g) => g.schools.length > 0);
  }, [filtered, area]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 grid gap-4 rounded-xl border border-black/5 bg-white p-5 shadow-sm md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            Name
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search schools..."
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            Location
          </label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value as "All" | Area)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          >
            <option value="All">All locations</option>
            {AREAS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            Curriculum
          </label>
          <select
            value={curriculum}
            onChange={(e) => setCurriculum(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          >
            <option>All</option>
            {ALL_CURRICULA.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            Budget
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value as "All" | Budget)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          >
            <option value="All">All Budgets</option>
            <option value="under400k">400,000 THB or less / year</option>
            <option value="over400k">400,000 THB or more / year</option>
            <option value="unknown">Fees not published</option>
          </select>
        </div>
      </div>

      <p className="mb-6 text-sm text-neutral-500">
        Showing {filtered.length} of {SCHOOLS.length} schools
      </p>

      {/* Results, grouped by location */}
      <div className="space-y-10">
        {groups.map((g) => (
          <section key={g.id}>
            <div className="mb-4 border-b border-black/5 pb-2">
              <h2 className="font-heading text-xl font-bold text-purple-dark">
                {g.label}{" "}
                <span className="text-sm font-normal text-neutral-400">
                  ({g.schools.length})
                </span>
              </h2>
              <p className="mt-0.5 text-xs text-neutral-500">{g.covers}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.schools.map((s) => (
                <SchoolCard key={s.slug} school={s} shownIn={g.id} />
              ))}
            </div>
          </section>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-neutral-400">
            No schools match those filters. Try widening your search.
          </p>
        )}
      </div>
    </div>
  );
}

function SchoolCard({ school: s, shownIn }: { school: School; shownIn: Area }) {
  const otherAreas = s.areas.filter((a) => a !== shownIn);
  return (
    <Link
      href={`/schools/${s.slug}`}
      className="block rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <h3 className="font-heading text-base font-bold text-purple-dark">
        {s.name}
      </h3>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {s.curricula.map((c) => (
          <span
            key={c}
            className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal"
          >
            {c}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs text-neutral-500">
        {s.budget === "under400k"
          ? "Under 400,000 THB / year"
          : s.budget === "over400k"
          ? "Over 400,000 THB / year"
          : "Fees not published, confirm with school"}
      </p>
      {otherAreas.length > 0 && (
        <p className="mt-1 text-xs text-neutral-400">
          Also in: {otherAreas.map((a) => AREA_LABEL[a]).join(", ")}
        </p>
      )}
    </Link>
  );
}
