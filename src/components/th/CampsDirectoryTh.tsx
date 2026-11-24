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
import { COMMON_TH, showingTh } from "@/lib/th/common";
import {
  AREA_TH,
  CAMPS_TH,
  CATEGORY_TH,
  FORMAT_TH,
  WINDOW_TH,
  agesTh,
  areaTh,
  priceTh,
  rangeTh,
} from "@/lib/th/camps";

// Mirrors src/components/ui/CampsDirectory.tsx. The filter logic is identical;
// only camps that have a Thai translation are listed.
export default function CampsDirectoryTh({
  sessions = ALL_SESSIONS,
}: {
  /** Upcoming sessions, worked out on the server so finished camps drop off. */
  sessions?: SessionWithCamp[];
}) {
  const SESSIONS = useMemo(() => sessions.filter((s) => CAMPS_TH[s.camp.slug]), [sessions]);
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
      const t = CAMPS_TH[s.camp.slug];
      const ts = t.sessions[s.id];
      // Search both languages: a parent may type the English name they heard.
      const haystack = [
        s.camp.name,
        s.programme,
        ts?.programme ?? "",
        s.camp.area,
        areaTh(s.camp.area),
        s.venue ?? "",
        ts?.venue ?? "",
        ts?.note ?? "",
        ...s.categories,
        ...s.categories.map((c) => CATEGORY_TH[c]),
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
          <label className={labelClass}>{COMMON_TH.search}</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ลองพิมพ์ เช่น Minecraft จีนกลาง ฟุตบอล Sukhumvit"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>ช่วงปิดเทอม</label>
          <select
            value={window}
            onChange={(e) => setWindow(e.target.value as "All" | BreakWindowId)}
            className={inputClass}
          >
            <option value="All">ทุกช่วงปิดเทอม</option>
            {BREAK_WINDOWS.filter((w) => SESSIONS.some((s) => s.window === w.id)).map((w) => (
              <option key={w.id} value={w.id}>
                {WINDOW_TH[w.id].shortLabel}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>อายุของลูก</label>
          <input
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
          <label className={labelClass}>ประเภทกิจกรรม</label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "All" | CampCategory)
            }
            className={inputClass}
          >
            <option value="All">ทั้งหมด</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_TH[c]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>ย่าน</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={inputClass}
          >
            <option value="All">{COMMON_TH.allAreas}</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {AREA_TH[a] ?? a}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>รูปแบบ</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as "All" | CampFormat)}
            className={inputClass}
          >
            <option value="All">{COMMON_TH.any}</option>
            <option value="day">{FORMAT_TH.day}</option>
            <option value="half-day">{FORMAT_TH["half-day"]}</option>
            <option value="residential">{FORMAT_TH.residential}</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          {showingTh(filtered.length, SESSIONS.length, "รอบแคมป์")}
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

      {window !== "All" && filtered.length < 6 && (
        <div className="mb-4 rounded-xl border border-black/5 bg-orange-50 p-4 text-sm leading-relaxed text-neutral-700">
          <strong className="font-semibold">ผลลัพธ์น้อยเป็นเรื่องปกติเมื่อยังอีกนานกว่าจะปิดเทอม</strong>{" "}
          แคมป์ส่วนใหญ่ในกรุงเทพฯ ประกาศวันที่เพียงสี่ถึงหกสัปดาห์ก่อนเริ่มปิดเทอม และแคมป์ฤดูร้อนมักรอจนถึงเดือนมกราคม
          หากช่วงปิดเทอมที่คุณดูอยู่ยังอีกหลายเดือน ลองกลับมาดูใกล้ๆ วัน หรือสังเกตแคมป์ที่ระบุว่า
          "ยังไม่ประกาศใหม่" ซึ่งส่วนใหญ่จัดเกือบทุกปีและน่าติดตาม
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const ts = CAMPS_TH[s.camp.slug].sessions[s.id];
          const dates = rangeTh(s.startDate, s.endDate);
          const cost = priceTh(s);
          const past = s.dateStatus !== "confirmed";
          const ages = agesTh(s.minAge, s.maxAge);
          return (
            <Link
              key={s.id}
              href={`/th/camps/${s.camp.slug}`}
              className={`block rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${past ? "opacity-75" : ""}`}
            >
              <h3 className="font-heading text-base font-bold text-purple-dark">
                {ts?.programme ?? s.programme}
              </h3>
              <p className="mt-0.5 text-sm text-neutral-600">{s.camp.name}</p>

              <p className="mt-3 text-sm font-semibold text-teal">
                {dates ?? "ไม่ประกาศวันที่"}
              </p>
              {past && (
                <p className="mt-0.5 text-xs text-neutral-500">
                  {ts?.previousRun
                    ? `จัดครั้งล่าสุด: ${ts.previousRun} ยังไม่ประกาศใหม่`
                    : "ปีนี้ยังไม่ประกาศวันที่"}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.categories.slice(0, 2).map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal"
                  >
                    {CATEGORY_TH[c]}
                  </span>
                ))}
                {s.format !== "day" && (
                  <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple">
                    {FORMAT_TH[s.format]}
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs text-neutral-500">
                {ages ? `อายุ: ${ages}` : "ไม่ประกาศช่วงอายุ"} &middot;{" "}
                {areaTh(s.camp.area)}
              </p>
              <p className="mt-1 text-sm font-semibold text-neutral-700">
                {cost ?? (
                  <span className="font-normal text-neutral-400">
                    ไม่ประกาศราคา
                  </span>
                )}
              </p>
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
