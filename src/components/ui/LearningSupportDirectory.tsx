"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PROVIDERS,
  ALL_CATEGORIES,
  ALL_AREAS,
  ALL_TAGS,
  type ProviderCategory,
  type Tag,
} from "@/lib/learningSupport";

export default function LearningSupportDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ProviderCategory>("All");
  const [area, setArea] = useState("All");
  const [tag, setTag] = useState<"All" | Tag>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROVIDERS.filter((p) => {
      const haystack = [
        p.name,
        p.category,
        p.area,
        ...(p.tags ?? []),
        ...p.services,
        ...(p.languages ?? []),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = q === "" || haystack.includes(q);
      const matchesCategory = category === "All" || p.category === category;
      const matchesArea = area === "All" || p.area === area;
      const matchesTag = tag === "All" || (p.tags ?? []).includes(tag);
      return matchesQuery && matchesCategory && matchesArea && matchesTag;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [query, category, area, tag]);

  const reset = () => {
    setQuery("");
    setCategory("All");
    setArea("All");
    setTag("All");
  };

  const filtersActive =
    query !== "" || category !== "All" || area !== "All" || tag !== "All";

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
            placeholder="Try dyslexia, speech, autism, assessment, Thong Lo..."
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            Need or service
          </label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value as "All" | Tag)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          >
            <option value="All">Anything</option>
            {ALL_TAGS.map((t) => (
              <option key={t.tag} value={t.tag}>
                {t.tag} ({t.count})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            Type of provider
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
        <div className="flex items-end">
          <button
            type="button"
            onClick={reset}
            disabled={!filtersActive}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-600 transition hover:border-orange hover:text-orange disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-300 disabled:hover:text-neutral-600"
          >
            Clear filters
          </button>
        </div>
      </div>

      <p className="mb-4 text-sm text-neutral-500">
        Showing {filtered.length} of {PROVIDERS.length} providers
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const tags = p.tags ?? [];
          return (
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
                {tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal"
                  >
                    {t}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500">
                    +{tags.length - 3} more
                  </span>
                )}
              </div>
              <p className="mt-3 text-xs text-neutral-500">
                {p.area}
                {p.ages ? ` · Ages ${p.ages}` : ""}
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
