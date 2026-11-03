"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ALL_SESSIONS,
  ALL_CATEGORIES,
  ALL_AREAS,
  type CampCategory,
  type CampFormat,
  type SessionWithCamp,
} from "@/lib/camps";
import { BREAK_WINDOWS, type BreakWindowId } from "@/lib/schoolBreaks";
import { COMMON_ZH, showingZh } from "@/lib/zh/common";
import {
  AREA_ZH,
  CAMPS_ZH,
  CATEGORY_ZH,
  FORMAT_ZH,
  WINDOW_ZH,
  agesZh,
  areaZh,
  priceZh,
  rangeZh,
} from "@/lib/zh/camps";

// Mirrors src/components/ui/CampsDirectory.tsx. The filter logic is identical;
// only camps that have a Chinese translation are listed.
export default function CampsDirectoryZh({
  sessions = ALL_SESSIONS,
}: {
  /** Upcoming sessions, worked out on the server so finished camps drop off. */
  sessions?: SessionWithCamp[];
}) {
  const SESSIONS = useMemo(() => sessions.filter((s) => CAMPS_ZH[s.camp.slug]), [sessions]);
  const AREAS = useMemo(() => ALL_AREAS.filter((a) => SESSIONS.some((s) => s.camp.area === a)), [SESSIONS]);
  const [query, setQuery] = useState("");
  const [window, setWindow] = useState<"All" | BreakWindowId>("All");
  const [category, setCategory] = useState<"All" | CampCategory>("All");
  const [area, setArea] = useState("All");
  const [format, setFormat] = useState<"All" | CampFormat>("All");
  const [age, setAge] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const ageNum = age === "" ? null : Number(age);
    return SESSIONS.filter((s) => {
      const z = CAMPS_ZH[s.camp.slug];
      const zs = z.sessions[s.id];
      // Search both languages: a parent may type the English name they heard.
      const haystack = [
        s.camp.name,
        s.programme,
        zs?.programme ?? "",
        s.camp.area,
        areaZh(s.camp.area),
        s.venue ?? "",
        zs?.venue ?? "",
        zs?.note ?? "",
        ...s.categories,
        ...s.categories.map((c) => CATEGORY_ZH[c]),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = q === "" || haystack.includes(q);
      const matchesWindow = window === "All" || s.window === window;
      const matchesCategory =
        category === "All" || s.categories.includes(category);
      const matchesArea = area === "All" || s.camp.area === area;
      const matchesFormat = format === "All" || s.format === format;
      // A session whose operator publishes no age range always passes the
      // age filter, same as the English page.
      const matchesAge =
        ageNum === null ||
        s.minAge === undefined ||
        (s.maxAge === undefined
          ? Number.isFinite(ageNum) && ageNum >= s.minAge
          : Number.isFinite(ageNum) && ageNum >= s.minAge && ageNum <= s.maxAge);
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
  }, [SESSIONS, query, window, category, area, format, age]);

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
  const labelClass = "mb-1 block text-xs font-bold text-neutral-500";

  return (
    <div>
      <div className="mb-6 grid gap-3 md:grid-cols-4 lg:grid-cols-7">
        <div className="lg:col-span-2">
          <label className={labelClass}>{COMMON_ZH.search}</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="试试 Minecraft、普通话、足球、Sukhumvit……"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>假期</label>
          <select
            value={window}
            onChange={(e) => setWindow(e.target.value as "All" | BreakWindowId)}
            className={inputClass}
          >
            <option value="All">任何假期</option>
            {BREAK_WINDOWS.filter((w) => SESSIONS.some((s) => s.window === w.id)).map((w) => (
              <option key={w.id} value={w.id}>
                {WINDOW_ZH[w.id].shortLabel}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>孩子的年龄</label>
          <input
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
          <label className={labelClass}>活动类型</label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "All" | CampCategory)
            }
            className={inputClass}
          >
            <option value="All">不限</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_ZH[c]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>区域</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={inputClass}
          >
            <option value="All">{COMMON_ZH.allAreas}</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {AREA_ZH[a] ?? a}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>形式</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as "All" | CampFormat)}
            className={inputClass}
          >
            <option value="All">{COMMON_ZH.any}</option>
            <option value="day">{FORMAT_ZH.day}</option>
            <option value="half-day">{FORMAT_ZH["half-day"]}</option>
            <option value="residential">{FORMAT_ZH.residential}</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          {showingZh(filtered.length, SESSIONS.length, "营期")}
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

      {window !== "All" && filtered.length < 6 && (
        <div className="mb-4 rounded-xl border border-black/5 bg-orange-50 p-4 text-sm leading-relaxed text-neutral-700">
          <strong className="font-semibold">离假期还早时，结果少是正常的。</strong>{" "}
          曼谷的大多数营地要到假期开始前四到六周才会公布日期，暑假营往往要等到
          1月。如果您查看的假期还有好几个月，可以临近时再来看，或者留意标注为
          “尚未重新公布”的营地，它们多数年份都会开办，值得关注。
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const zs = CAMPS_ZH[s.camp.slug].sessions[s.id];
          const dates = rangeZh(s.startDate, s.endDate);
          const cost = priceZh(s);
          const past = s.dateStatus !== "confirmed";
          const ages = agesZh(s.minAge, s.maxAge);
          return (
            <Link
              key={s.id}
              href={`/zh/camps/${s.camp.slug}`}
              className={`block rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${past ? "opacity-75" : ""}`}
            >
              <h3 className="font-heading text-base font-bold text-purple-dark">
                {zs?.programme ?? s.programme}
              </h3>
              <p className="mt-0.5 text-sm text-neutral-600">{s.camp.name}</p>

              <p className="mt-3 text-sm font-semibold text-teal">
                {dates ?? "日期未公布"}
              </p>
              {past && (
                <p className="mt-0.5 text-xs text-neutral-500">
                  {zs?.previousRun
                    ? `上次举办：${zs.previousRun}。尚未重新公布。`
                    : "今年的日期尚未公布。"}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.categories.slice(0, 2).map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal"
                  >
                    {CATEGORY_ZH[c]}
                  </span>
                ))}
                {s.format !== "day" && (
                  <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple">
                    {FORMAT_ZH[s.format]}
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs text-neutral-500">
                {ages ? `年龄：${ages}` : "年龄范围未公布"} &middot;{" "}
                {areaZh(s.camp.area)}
              </p>
              <p className="mt-1 text-sm font-semibold text-neutral-700">
                {cost ?? (
                  <span className="font-normal text-neutral-400">
                    价格未公布
                  </span>
                )}
              </p>
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
