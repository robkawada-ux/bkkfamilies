"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  INSURERS_SORTED,
  ALL_FEATURES,
  FEATURE_LABEL,
  TYPE_LABEL,
  TYPE_ORDER,
  type Feature,
  type InsurerType,
} from "@/lib/insurance";

// Shared labels and data live in lib/insurance, never here. A server page
// importing a constant from this "use client" file would get undefined.

const PRICING_LABEL = {
  published: "Published prices",
  contribution: "Set contribution",
  "quote-only": "Quote only",
  "not-applicable": "Broker, free to use",
} as const;

export default function InsuranceDirectory() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"All" | InsurerType>("All");
  const [feature, setFeature] = useState<"All" | Feature>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INSURERS_SORTED.filter((i) => {
      const haystack = [
        i.name,
        i.tagline,
        i.description,
        i.underwriter ?? "",
        ...(i.plans ?? []).map((p) => p.name),
      ]
        .join(" ")
        .toLowerCase();
      return (
        (q === "" || haystack.includes(q)) &&
        (type === "All" || i.type === type) &&
        (feature === "All" || i.features.includes(feature))
      );
    });
  }, [query, type, feature]);

  const active = query !== "" || type !== "All" || feature !== "All";

  const inputClass =
    "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none";
  const labelClass =
    "mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500";

  return (
    <div>
      <div className="mb-6 grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="ins-search">
            Search
          </label>
          <input
            id="ins-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try Cigna, maternity, Navakij..."
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="ins-type">
            Type
          </label>
          <select
            id="ins-type"
            value={type}
            onChange={(e) => setType(e.target.value as "All" | InsurerType)}
            className={inputClass}
          >
            <option value="All">Any</option>
            {TYPE_ORDER.map((t) => (
              <option key={t} value={t}>
                {TYPE_LABEL[t]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="ins-feature">
            Must have
          </label>
          <select
            id="ins-feature"
            value={feature}
            onChange={(e) => setFeature(e.target.value as "All" | Feature)}
            className={inputClass}
          >
            <option value="All">Anything</option>
            {ALL_FEATURES.map((f) => (
              <option key={f} value={f}>
                {FEATURE_LABEL[f]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          Showing {filtered.length} of {INSURERS_SORTED.length}
        </p>
        <button
          type="button"
          disabled={!active}
          onClick={() => {
            setQuery("");
            setType("All");
            setFeature("All");
          }}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-600 transition hover:border-orange hover:text-orange disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-300 disabled:hover:text-neutral-600"
        >
          Clear filters
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <Link
            key={i.slug}
            href={`/healthcare/insurance/${i.slug}`}
            className="group flex flex-col rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {i.sponsored && (
              <span className="mb-2 self-start rounded bg-orange-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-orange">
                {i.sponsored.label ?? "Sponsored"}
              </span>
            )}
            <h3 className="font-heading text-base font-bold text-purple-dark">
              {i.name}
            </h3>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-teal">
              {TYPE_LABEL[i.type]}
            </p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
              {i.tagline}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {i.features.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal"
                >
                  {FEATURE_LABEL[f]}
                </span>
              ))}
            </div>
            <p className="mt-3 flex items-center justify-between text-xs">
              <span className="text-neutral-500">{PRICING_LABEL[i.pricing]}</span>
              <span className="font-semibold text-orange group-hover:underline">
                Read the review →
              </span>
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
