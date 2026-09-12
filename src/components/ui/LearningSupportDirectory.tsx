"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PROVIDERS,
  ALL_CATEGORIES,
  ALL_AREAS,
  ALL_SPECIALISMS,
  type ProviderCategory,
} from "@/lib/learningSupport";

export default function LearningSupportDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ProviderCategory>("All");
  const [area, setArea] = useState("All");
  const [specialism, setSpecialism] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROVIDERS.filter((p) => {
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.services.some((s) => s.toLowerCase().includes(q)) ||
        (p.specialisms ?? []).some((s) => s.toLowerCase().includes(q));
      const matchesCategory = category === "All" || p.category === category;
      const matchesArea = area === "All" || p.area === area;
      const matchesSpecialism =
        specialism === "All" || (p.specialisms ?? []).includes(specialism);
      return matchesQuery && matchesCategory && matchesArea && matchesSpecialism;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [query, category, area, specialism]);

  const reset = () => {
    setQuery("");
    setCategory("All");
    setArea("All");
    setSpecialism("All");
  };

  return (
    <div>
      <div className="mb-8 grid gap-4 rounded-xl border border-black/5 bg-white p-5 shadow-sm md:grid-cols-4">
        <div className="md:col-span-4">
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            Search
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try dyslexia, speech therapy, autism, assessment..."
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            Type of support
          </label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "All" | ProviderCategory)
            }
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          >
            <option value="All">All types</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            Area
          </label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          >
            <option value="All">All areas</option>
            {ALL_AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            Specialism
          </label>
          <select
            value={specialism}
            onChange={(e) => setSpecialism(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          >
            <option value="All">All specialisms</option>
            {ALL_SPECIALISMS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="button"
            onClick={reset}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-600 transition hover:border-orange hover:text-orange"
          >
            Clear filters
          </button>
        </div>
      </div>

      <p className="mb-4 text-sm text-neutral-500">
        Showing {filtered.length} of {PROVIDERS.length} providers
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/learning-support/${p.slug}`}
            className="block rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="font-heading text-base font-bold text-purple-dark">
              {p.name}
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-orange">
              {p.category}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(p.specialisms ?? []).slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-neutral-500">
              {p.area}
              {p.ages ? ` · Ages ${p.ages}` : ""}
            </p>
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
