"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ACTIVITIES,
  DAY_OUT_CATEGORIES,
  CLASS_CATEGORIES,
  ZONES,
  ageLabel,
  ageMatches,
  priceLabel,
  budgetBand,
  type ActivityType,
  type Budget,
  type Category,
  type Zone,
} from "@/lib/activities";

type TypeFilter = "All" | ActivityType;

const TYPE_TABS: { id: TypeFilter; label: string }[] = [
  { id: "All", label: "Everything" },
  { id: "Day out", label: "Days out" },
  { id: "Weekly class", label: "Weekly classes" },
];

export default function ActivitiesDirectory() {
  const [type, setType] = useState<TypeFilter>("All");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | Category>("All");
  const [age, setAge] = useState("");
  const [zone, setZone] = useState<"All" | Zone>("All");
  const [budget, setBudget] = useState<"All" | Budget>("All");
  const [indoorOnly, setIndoorOnly] = useState(false);
  const [hideClosed, setHideClosed] = useState(false);

  const categories =
    type === "Day out"
      ? DAY_OUT_CATEGORIES
      : type === "Weekly class"
        ? CLASS_CATEGORIES
        : [...DAY_OUT_CATEGORIES, ...CLASS_CATEGORIES];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const ageNum = age === "" ? null : Number(age);
    return ACTIVITIES.filter((a) => {
      if (type !== "All" && a.type !== type) return false;
      if (category !== "All" && a.category !== category) return false;
      if (zone !== "All" && a.zone !== zone) return false;
      if (indoorOnly && a.setting !== "Indoor") return false;
      if (hideClosed && a.closedNote) return false;
      if (budget !== "All" && budgetBand(a) !== budget) return false;
      if (ageNum !== null && Number.isFinite(ageNum) && !ageMatches(ageNum, a)) return false;
      if (q) {
        const haystack = [
          a.name,
          a.category,
          a.venue ?? "",
          a.address ?? "",
          a.district,
          a.zone,
          a.description,
          ...(a.branches ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => {
      // Closed places sink to the bottom, then confirmed first, then A to Z.
      if (!!a.closedNote !== !!b.closedNote) return a.closedNote ? 1 : -1;
      if (a.status !== b.status) return a.status === "confirmed" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [type, query, category, age, zone, budget, indoorOnly, hideClosed]);

  const filtersActive =
    type !== "All" ||
    query !== "" ||
    category !== "All" ||
    age !== "" ||
    zone !== "All" ||
    budget !== "All" ||
    indoorOnly ||
    hideClosed;

  const reset = () => {
    setType("All");
    setQuery("");
    setCategory("All");
    setAge("");
    setZone("All");
    setBudget("All");
    setIndoorOnly(false);
    setHideClosed(false);
  };

  const inputClass =
    "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none";
  const labelClass =
    "mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500";

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Type of activity">
        {TYPE_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={type === t.id}
            onClick={() => {
              setType(t.id);
              setCategory("All");
            }}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              type === t.id
                ? "bg-purple text-white"
                : "border border-neutral-300 bg-white text-neutral-600 hover:border-purple hover:text-purple"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="ac-search">Search</label>
          <input
            id="ac-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try trampoline, aquarium, ballet, Sukhumvit..."
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="ac-cat">Kind</label>
          <select
            id="ac-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value as "All" | Category)}
            className={inputClass}
          >
            <option value="All">Anything</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="ac-age">Child&rsquo;s age</label>
          <input
            id="ac-age"
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
          <label className={labelClass} htmlFor="ac-zone">Area</label>
          <select
            id="ac-zone"
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
          <label className={labelClass} htmlFor="ac-budget">Price</label>
          <select
            id="ac-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value as "All" | Budget)}
            className={inputClass}
          >
            <option value="All">Any</option>
            <option value="free">Free</option>
            <option value="under500">Under ฿500</option>
            <option value="500to1000">฿500 to ฿1,000</option>
            <option value="over1000">Over ฿1,000, or by term</option>
            <option value="unknown">Price not published</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={indoorOnly}
              onChange={(e) => setIndoorOnly(e.target.checked)}
              className="h-4 w-4 accent-purple"
            />
            Indoors only, for rain, heat or smog
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={hideClosed}
              onChange={(e) => setHideClosed(e.target.checked)}
              className="h-4 w-4 accent-purple"
            />
            Hide places closed right now
          </label>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-neutral-500">
            Showing {filtered.length} of {ACTIVITIES.length}
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
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => {
          const ages = ageLabel(a.minAge, a.maxAge);
          const cost = priceLabel(a.price);
          return (
            <Link
              key={a.slug}
              href={`/activities/${a.slug}`}
              className={`flex flex-col rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                a.closedNote ? "opacity-70" : ""
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple">
                  {a.category}
                </span>
                {a.closedNote ? (
                  <span className="rounded-full bg-orange/10 px-2 py-0.5 text-xs font-semibold text-orange">
                    Closed right now
                  </span>
                ) : a.setting === "Indoor" ? (
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal">
                    Indoors
                  </span>
                ) : a.setting === "Undercover" ? (
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal">
                    Undercover
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 font-heading text-base font-bold text-purple-dark">
                {a.name}
              </h3>
              <p className="mt-0.5 text-xs text-neutral-500">
                {a.district} &middot; {a.zone}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                {a.description}
              </p>
              <div className="mt-auto pt-3">
                <p className="text-xs text-neutral-500">
                  {ages ? `Ages ${ages.toLowerCase()}` : "Age range not published"}
                </p>
                <p className="text-sm font-semibold text-neutral-700">
                  {cost ?? (
                    <span className="font-normal text-neutral-400">Price not published</span>
                  )}
                </p>
              </div>
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
