"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  DAYS,
  ZONES,
  ORGANISERS,
  ALL_LANGUAGES,
  ageMatches,
  lowestSessionPrice,
  type Day,
  type Organiser,
  type Zone,
} from "@/lib/playgroups";
import { COMMON_TH, daysTh, showingTh, timeTh } from "@/lib/th/common";
import {
  AGE_BANDS_TH,
  DAY_OPTION_TH,
  FREQUENCY_TH,
  ORGANISER_TH,
  PLAYGROUPS_TH,
  ZONE_SHORT_TH,
  ageLabelTh,
  districtTh,
  languageTh,
  priceLabelTh,
  thPlaygroups,
} from "@/lib/th/playgroups";

type Budget = "All" | "free" | "300" | "500" | "over" | "unknown";

// Only playgroups that have a Chinese translation are listed.
const LISTED = thPlaygroups();

export default function PlaygroupsDirectoryTh() {
  const [query, setQuery] = useState("");
  const [day, setDay] = useState<"All" | "Weekend" | Day>("All");
  const [age, setAge] = useState("All");
  const [zone, setZone] = useState<"All" | Zone>("All");
  const [organiser, setOrganiser] = useState<"All" | Organiser>("All");
  const [language, setLanguage] = useState("All");
  const [budget, setBudget] = useState<Budget>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const band = AGE_BANDS_TH.find((b) => b.id === age);
    return LISTED.filter((pg) => {
      const th = PLAYGROUPS_TH[pg.slug];
      const haystack = [
        pg.name,
        pg.venue,
        pg.district,
        pg.zone,
        ZONE_SHORT_TH[pg.zone],
        pg.address ?? "",
        pg.organiser,
        ORGANISER_TH[pg.organiser],
        pg.description,
        th.description,
        ...pg.languages,
        ...pg.languages.map(languageTh),
        ...pg.sessions.map((s) => s.label ?? ""),
        ...th.sessions.map((s) => s.label ?? ""),
      ]
        .join(" ")
        .toLowerCase();
      if (q && !haystack.includes(q)) return false;
      if (zone !== "All" && pg.zone !== zone) return false;
      if (organiser !== "All" && pg.organiser !== organiser) return false;
      if (language !== "All" && !pg.languages.includes(language)) return false;

      // Day and age must match the SAME session, so a Saturday session for
      // 3 to 5s does not pull in a venue whose baby group is on Tuesday.
      const sessionMatch = pg.sessions.some((s) => {
        const dayOk =
          day === "All" ||
          // A session with no published day stays visible rather than
          // punishing the parent for the organiser's gap.
          !s.days ||
          (day === "Weekend"
            ? s.days.includes("Sat") || s.days.includes("Sun")
            : s.days.includes(day));
        const ageOk = !band || ageMatches(band.months, s.minAgeMonths, s.maxAgeMonths);
        return dayOk && ageOk;
      });
      if (!sessionMatch) return false;

      if (budget !== "All") {
        const low = lowestSessionPrice(pg);
        if (budget === "free" && low !== "free") return false;
        if (budget === "unknown" && low !== null) return false;
        if (budget === "300" && !(low === "free" || (typeof low === "number" && low <= 300))) return false;
        if (budget === "500" && !(low === "free" || (typeof low === "number" && low <= 500))) return false;
        if (budget === "over" && !(typeof low === "number" && low > 500)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (a.status !== b.status) return a.status === "confirmed" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [query, day, age, zone, organiser, language, budget]);

  const filtersActive =
    query !== "" ||
    day !== "All" ||
    age !== "All" ||
    zone !== "All" ||
    organiser !== "All" ||
    language !== "All" ||
    budget !== "All";

  const reset = () => {
    setQuery("");
    setDay("All");
    setAge("All");
    setZone("All");
    setOrganiser("All");
    setLanguage("All");
    setBudget("All");
  };

  const inputClass =
    "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none";
  const labelClass = "mb-1 block text-xs font-bold text-neutral-500";

  return (
    <div>
      <div className="mb-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
        <div className="sm:col-span-2 lg:col-span-2">
          <label className={labelClass} htmlFor="pg-search">{COMMON_TH.search}</label>
          <input
            id="pg-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ลองพิมพ์ เช่น จีนกลาง Sathorn เล่นน้ำ ดนตรี"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="pg-day">วัน</label>
          <select
            id="pg-day"
            value={day}
            onChange={(e) => setDay(e.target.value as "All" | "Weekend" | Day)}
            className={inputClass}
          >
            <option value="All">ทั้งหมด</option>
            <option value="Weekend">สุดสัปดาห์</option>
            {DAYS.filter((d) => d !== "Sun").map((d) => (
              <option key={d} value={d}>
                {DAY_OPTION_TH[d]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pg-age">อายุเด็ก</label>
          <select
            id="pg-age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={inputClass}
          >
            <option value="All">ทั้งหมด</option>
            {AGE_BANDS_TH.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pg-zone">ย่าน</label>
          <select
            id="pg-zone"
            value={zone}
            onChange={(e) => setZone(e.target.value as "All" | Zone)}
            className={inputClass}
          >
            <option value="All">{COMMON_TH.allAreas}</option>
            {ZONES.map((z) => (
              <option key={z} value={z}>
                {ZONE_SHORT_TH[z]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pg-org">ผู้จัด</label>
          <select
            id="pg-org"
            value={organiser}
            onChange={(e) => setOrganiser(e.target.value as "All" | Organiser)}
            className={inputClass}
          >
            <option value="All">ทั้งหมด</option>
            {ORGANISERS.map((o) => (
              <option key={o} value={o}>
                {ORGANISER_TH[o]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pg-lang">ภาษา</label>
          <select
            id="pg-lang"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={inputClass}
          >
            <option value="All">{COMMON_TH.any}</option>
            {ALL_LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {languageTh(l)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pg-budget">ราคา</label>
          <select
            id="pg-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value as Budget)}
            className={inputClass}
          >
            <option value="All">{COMMON_TH.any}</option>
            <option value="free">ฟรี</option>
            <option value="300">ไม่เกิน ฿300</option>
            <option value="500">ไม่เกิน ฿500</option>
            <option value="over">เกิน ฿500</option>
            <option value="unknown">ไม่ประกาศราคา</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          {showingTh(filtered.length, LISTED.length, "เพลย์กรุ๊ป")}
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pg) => {
          const th = PLAYGROUPS_TH[pg.slug];
          return (
            <Link
              key={pg.slug}
              href={`/th/playgroups/${pg.slug}`}
              className="flex flex-col rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple">
                  {ORGANISER_TH[pg.organiser]}
                </span>
                {pg.status === "confirmed" ? (
                  <span className="rounded-full bg-green/15 px-2 py-0.5 text-xs font-semibold text-teal">
                    ยืนยันแล้วในภาคเรียนนี้
                  </span>
                ) : (
                  <span className="rounded-full bg-orange/10 px-2 py-0.5 text-xs font-semibold text-orange">
                    โปรดตรวจสอบก่อนไป
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-heading text-base font-bold text-purple-dark">
                {pg.name}
              </h3>
              <p className="mt-0.5 text-xs text-neutral-500">
                {districtTh(pg.district)} &middot; {ZONE_SHORT_TH[pg.zone]}
              </p>

              <div className="mt-3 space-y-2">
                {pg.sessions.map((s, i) => {
                  const sz = th.sessions[i] ?? {};
                  const label = sz.label ?? s.label;
                  const when = [daysTh(s.days), timeTh(s.start, s.end)]
                    .filter(Boolean)
                    .join(" ");
                  const ages = ageLabelTh(s.minAgeMonths, s.maxAgeMonths);
                  const cost = priceLabelTh(s.price);
                  return (
                    <div key={i} className="text-sm">
                      {label && <p className="font-semibold text-neutral-700">{label}</p>}
                      <p className="font-semibold text-teal">
                        {when || "สอบถามวันและเวลา"}
                        {s.frequency !== "weekly" && (
                          <span className="font-normal text-neutral-500">
                            {" "}
                            &middot; {FREQUENCY_TH[s.frequency]}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-neutral-500">{ages ?? "ไม่ประกาศช่วงอายุ"}</p>
                      <p className="text-sm text-neutral-700">
                        {cost ?? <span className="text-neutral-400">ไม่ประกาศราคา</span>}
                      </p>
                    </div>
                  );
                })}
              </div>

              {pg.languages.some((l) => l !== "English") && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {pg.languages
                    .filter((l) => l !== "English")
                    .map((l) => (
                      <span
                        key={l}
                        className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal"
                      >
                        {languageTh(l)}
                      </span>
                    ))}
                </div>
              )}
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
