"use client";

import { useMemo, useState } from "react";
import { SCHOOLS, ALL_CURRICULA, type Budget } from "@/lib/schools";

export default function SchoolDirectory() {
  const [query, setQuery] = useState("");
  const [curriculum, setCurriculum] = useState("All");
  const [budget, setBudget] = useState<"All" | Budget>("All");

  const filtered = useMemo(() => {
    return SCHOOLS.filter((s) => {
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
      const matchesCurriculum =
        curriculum === "All" || s.curricula.includes(curriculum);
      const matchesBudget = budget === "All" || s.budget === budget;
      return matchesQuery && matchesCurriculum && matchesBudget;
    });
  }, [query, curriculum, budget]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 grid gap-4 rounded-xl border border-black/5 bg-white p-5 shadow-sm md:grid-cols-4">
        <div className="md:col-span-2">
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

      <p className="mb-4 text-sm text-neutral-500">
        Showing {filtered.length} of {SCHOOLS.length} schools
      </p>

      {/* Results */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <div
            key={s.slug}
            className="rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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
                : "Fees not published — confirm with school"}
            </p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-neutral-400">
            No schools match those filters — try widening your search.
          </p>
        )}
      </div>
    </div>
  );
}
