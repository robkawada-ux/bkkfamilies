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
  ACTIVITIES_TH,
  TH_ACTIVITIES,
  BUDGET_TH,
  CATEGORY_TH,
  ZONE_TH,
  ageLabelTh,
  priceLabelTh,
} from "@/lib/th/activities";
import { COMMON_TH, showingTh } from "@/lib/th/common";

// Thai twin of src/components/ui/ActivitiesDirectory.tsx. The filter logic is
// copied, not shared, so nothing here can affect the English directory.
// Only activities that have a Thai translation are listed.

type TypeFilter = "All" | ActivityType;

const TYPE_TABS: { id: TypeFilter; label: string }[] = [
  { id: "All", label: "ทั้งหมด" },
  { id: "Day out", label: "ที่เที่ยววันหยุด" },
  { id: "Weekly class", label: "คลาสประจำสัปดาห์" },
];

export default function ActivitiesDirectoryTh() {
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
  ).filter((c) => TH_ACTIVITIES.some((a) => a.category === c));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const ageNum = age === "" ? null : Number(age);
    return TH_ACTIVITIES.filter((a) => {
      const zh = ACTIVITIES_TH[a.slug];
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
          CATEGORY_TH[a.category],
          a.venue ?? "",
          zh.venue ?? "",
          a.address ?? "",
          a.district,
          zh.district ?? "",
          a.zone,
          ZONE_TH[a.zone],
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
      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="ประเภทกิจกรรม">
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
          <label className={labelClass} htmlFor="ac-search">{COMMON_TH.search}</label>
          <input
            id="ac-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ลองค้นหา: แทรมโพลีน พิพิธภัณฑ์สัตว์น้ำ บัลเลต์ สุขุมวิท"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="ac-cat">หมวดหมู่</label>
          <select
            id="ac-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value as "All" | Category)}
            className={inputClass}
          >
            <option value="All">{COMMON_TH.any}</option>
            {categories.map((c) => (
              <option key={c} value={c}>{CATEGORY_TH[c]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="ac-age">อายุของลูก</label>
          <input
            id="ac-age"
            type="number"
            min={0}
            max={18}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder={COMMON_TH.any}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="ac-zone">พื้นที่</label>
          <select
            id="ac-zone"
            value={zone}
            onChange={(e) => setZone(e.target.value as "All" | Zone)}
            className={inputClass}
          >
            <option value="All">{COMMON_TH.allAreas}</option>
            {ZONES.map((z) => (
              <option key={z} value={z}>{ZONE_TH[z]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="ac-budget">ราคา</label>
          <select
            id="ac-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value as "All" | Budget)}
            className={inputClass}
          >
            <option value="All">{COMMON_TH.any}</option>
            {(["free", "under500", "500to1000", "over1000", "unknown"] as Budget[]).map((b) => (
              <option key={b} value={b}>{BUDGET_TH[b]}</option>
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
            เฉพาะในร่ม (เหมาะกับวันฝนตก อากาศร้อน หรือฝุ่นหนา)
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={hideClosed}
              onChange={(e) => setHideClosed(e.target.checked)}
              className="h-4 w-4 accent-purple"
            />
            ซ่อนสถานที่ที่ปิดอยู่ตอนนี้
          </label>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-neutral-500">
            {showingTh(filtered.length, TH_ACTIVITIES.length, "กิจกรรม")}
          </p>
          <button
            type="button"
            onClick={reset}
            disabled={!filtersActive}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-600 transition hover:border-orange hover:text-orange disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-300 disabled:hover:text-neutral-600"
          >
            {COMMON_TH.clearFilters}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => {
          const zh = ACTIVITIES_TH[a.slug];
          const ages = ageLabelTh(a.minAge, a.maxAge);
          const cost = priceLabelTh(a.price);
          return (
            <Link
              key={a.slug}
              href={`/th/activities/${a.slug}`}
              className={`flex flex-col rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                a.closedNote ? "opacity-70" : ""
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple">
                  {CATEGORY_TH[a.category]}
                </span>
                {a.closedNote ? (
                  <span className="rounded-full bg-orange/10 px-2 py-0.5 text-xs font-semibold text-orange">
                    ปิดอยู่ตอนนี้
                  </span>
                ) : a.setting === "Indoor" ? (
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal">
                    ในร่ม
                  </span>
                ) : a.setting === "Undercover" ? (
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal">
                    มีหลังคาคลุม
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 font-heading text-base font-bold text-purple-dark">
                {a.name}
              </h3>
              <p className="mt-0.5 text-xs text-neutral-500">
                {zh.district ?? a.district} &middot; {ZONE_TH[a.zone]}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                {zh.description}
              </p>
              <div className="mt-auto pt-3">
                <p className="text-xs text-neutral-500">
                  {ages ? `อายุที่เหมาะสม: ${ages}` : "ไม่ระบุช่วงอายุ"}
                </p>
                <p className="text-sm font-semibold text-neutral-700">
                  {cost ?? <span className="font-normal text-neutral-400">ไม่เปิดเผยราคา</span>}
                </p>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-neutral-400">
            {COMMON_TH.noMatches}
          </p>
        )}
      </div>
    </div>
  );
}
