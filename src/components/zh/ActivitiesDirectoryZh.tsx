"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  DAY_OUT_CATEGORIES,
  CLASS_CATEGORIES,
  ZONES,
  ageMatches,
  budgetBand,
  type ActivityType,
  type Budget,
  type Category,
  type Zone,
} from "@/lib/activities";
import {
  ACTIVITIES_ZH,
  ZH_ACTIVITIES,
  BUDGET_ZH,
  CATEGORY_ZH,
  ZONE_ZH,
  ageLabelZh,
  priceLabelZh,
} from "@/lib/zh/activities";
import { COMMON_ZH, showingZh } from "@/lib/zh/common";

// Chinese twin of src/components/ui/ActivitiesDirectory.tsx. The filter logic is
// copied, not shared, so nothing here can affect the English directory.
// Only activities that have a Chinese translation are listed.

type TypeFilter = "All" | ActivityType;

const TYPE_TABS: { id: TypeFilter; label: string }[] = [
  { id: "All", label: "全部" },
  { id: "Day out", label: "出游去处" },
  { id: "Weekly class", label: "每周课程" },
];

export default function ActivitiesDirectoryZh() {
  const [type, setType] = useState<TypeFilter>("All");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | Category>("All");
  const [age, setAge] = useState("");
  const [zone, setZone] = useState<"All" | Zone>("All");
  const [budget, setBudget] = useState<"All" | Budget>("All");
  const [indoorOnly, setIndoorOnly] = useState(false);
  const [hideClosed, setHideClosed] = useState(false);

  // Only show categories that currently have listings
  const categories = (
    type === "Day out"
      ? DAY_OUT_CATEGORIES
      : type === "Weekly class"
        ? CLASS_CATEGORIES
        : [...DAY_OUT_CATEGORIES, ...CLASS_CATEGORIES]
  ).filter((c) => ZH_ACTIVITIES.some((a) => a.category === c));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const ageNum = age === "" ? null : Number(age);
    return ZH_ACTIVITIES.filter((a) => {
      const zh = ACTIVITIES_ZH[a.slug];
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
          CATEGORY_ZH[a.category],
          a.venue ?? "",
          zh.venue ?? "",
          a.address ?? "",
          a.district,
          zh.district ?? "",
          a.zone,
          ZONE_ZH[a.zone],
          zh.description,
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
      return a.name.localeCompare(b.name, "en");
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
  const labelClass = "mb-1 block text-xs font-bold text-neutral-500";

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="活动类型">
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
          <label className={labelClass} htmlFor="ac-search">{COMMON_ZH.search}</label>
          <input
            id="ac-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="试试：蹦床、水族馆、芭蕾、Sukhumvit……"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="ac-cat">类别</label>
          <select
            id="ac-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value as "All" | Category)}
            className={inputClass}
          >
            <option value="All">{COMMON_ZH.any}</option>
            {categories.map((c) => (
              <option key={c} value={c}>{CATEGORY_ZH[c]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="ac-age">孩子的年龄</label>
          <input
            id="ac-age"
            type="number"
            min={0}
            max={18}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder={COMMON_ZH.any}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="ac-zone">区域</label>
          <select
            id="ac-zone"
            value={zone}
            onChange={(e) => setZone(e.target.value as "All" | Zone)}
            className={inputClass}
          >
            <option value="All">{COMMON_ZH.allAreas}</option>
            {ZONES.map((z) => (
              <option key={z} value={z}>{ZONE_ZH[z]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="ac-budget">价格</label>
          <select
            id="ac-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value as "All" | Budget)}
            className={inputClass}
          >
            <option value="All">{COMMON_ZH.any}</option>
            {(["free", "under500", "500to1000", "over1000", "unknown"] as Budget[]).map((b) => (
              <option key={b} value={b}>{BUDGET_ZH[b]}</option>
            ))}
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
            只看室内（适合下雨、炎热或雾霾天）
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={hideClosed}
              onChange={(e) => setHideClosed(e.target.checked)}
              className="h-4 w-4 accent-purple"
            />
            隐藏目前关闭的地方
          </label>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-neutral-500">
            {showingZh(filtered.length, ZH_ACTIVITIES.length, "活动")}
          </p>
          <button
            type="button"
            onClick={reset}
            disabled={!filtersActive}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-600 transition hover:border-orange hover:text-orange disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-300 disabled:hover:text-neutral-600"
          >
            {COMMON_ZH.clearFilters}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => {
          const zh = ACTIVITIES_ZH[a.slug];
          const ages = ageLabelZh(a.minAge, a.maxAge);
          const cost = priceLabelZh(a.price);
          return (
            <Link
              key={a.slug}
              href={`/zh/activities/${a.slug}`}
              className={`flex flex-col rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                a.closedNote ? "opacity-70" : ""
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple">
                  {CATEGORY_ZH[a.category]}
                </span>
                {a.closedNote ? (
                  <span className="rounded-full bg-orange/10 px-2 py-0.5 text-xs font-semibold text-orange">
                    目前关闭
                  </span>
                ) : a.setting === "Indoor" ? (
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal">
                    室内
                  </span>
                ) : a.setting === "Undercover" ? (
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal">
                    有顶棚
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 font-heading text-base font-bold text-purple-dark">
                {a.name}
              </h3>
              <p className="mt-0.5 text-xs text-neutral-500">
                {zh.district ?? a.district} &middot; {ZONE_ZH[a.zone]}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                {zh.description}
              </p>
              <div className="mt-auto pt-3">
                <p className="text-xs text-neutral-500">
                  {ages ? `适合年龄：${ages}` : "年龄范围未公布"}
                </p>
                <p className="text-sm font-semibold text-neutral-700">
                  {cost ?? <span className="font-normal text-neutral-400">价格未公布</span>}
                </p>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-neutral-400">
            {COMMON_ZH.noMatches}
          </p>
        )}
      </div>
    </div>
  );
}
