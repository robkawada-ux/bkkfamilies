"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SchoolAreaMap from "@/components/ui/SchoolAreaMap";
import {
  SCHOOLS,
  ALL_CURRICULA,
  AREAS,
  type Area,
  type Budget,
  type School,
} from "@/lib/schools";
import { SCHOOLS_TH, AREA_TH, BUDGET_TH, BUDGET_FILTER_TH, curriculumTh } from "@/lib/th/schools";
import { COMMON_TH, showingTh } from "@/lib/th/common";

// Thai copy of src/components/ui/SchoolDirectory.tsx. Filter logic is the
// same and still matches on the English curriculum tags and school names; keep
// the two in step when one changes. Only schools with a Thai write-up are
// listed, so no card leads to a page in the wrong language.
const SCHOOLS_LIST = SCHOOLS.filter((s) => SCHOOLS_TH[s.slug]?.description);

export default function SchoolDirectoryTh() {
  const [query, setQuery] = useState("");
  const [curriculum, setCurriculum] = useState("All");
  const [budget, setBudget] = useState<"All" | Budget>("All");
  const [area, setArea] = useState<"All" | Area>("All");
  const [showMap, setShowMap] = useState(false);

  // Main-campus counts per area, for the map labels.
  const counts = useMemo(() => {
    const c = Object.fromEntries(AREAS.map((a) => [a.id, 0])) as Record<Area, number>;
    for (const s of SCHOOLS_LIST) c[s.areas[0]]++;
    return c;
  }, []);

  const filtered = useMemo(() => {
    return SCHOOLS_LIST.filter((s) => {
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
      const matchesCurriculum =
        curriculum === "All" || s.curricula.includes(curriculum);
      const matchesBudget = budget === "All" || s.budget === budget;
      const matchesArea = area === "All" || s.areas.includes(area);
      return matchesQuery && matchesCurriculum && matchesBudget && matchesArea;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [query, curriculum, budget, area]);

  // Group by location, in the fixed AREAS order. With a location chosen, a
  // school belongs to that group even when it is not the school's main area.
  const groups = useMemo(() => {
    return AREAS.map((a) => ({
      ...a,
      schools: filtered.filter((s) =>
        area === "All" ? s.areas[0] === a.id : a.id === area
      ),
    })).filter((g) => g.schools.length > 0);
  }, [filtered, area]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 grid gap-4 rounded-xl border border-black/5 bg-white p-5 shadow-sm md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            ชื่อ
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาโรงเรียน (พิมพ์ชื่อภาษาอังกฤษ)"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            ย่าน
          </label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value as "All" | Area)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          >
            <option value="All">{COMMON_TH.allAreas}</option>
            {AREAS.map((a) => (
              <option key={a.id} value={a.id}>
                {AREA_TH[a.id].label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            หลักสูตร
          </label>
          <select
            value={curriculum}
            onChange={(e) => setCurriculum(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          >
            <option value="All">{COMMON_TH.any}</option>
            {ALL_CURRICULA.map((c) => (
              <option key={c} value={c}>{curriculumTh(c)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500">
            งบประมาณ
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value as "All" | Budget)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none"
          >
            <option value="All">ทุกงบประมาณ</option>
            <option value="under400k">{BUDGET_FILTER_TH.under400k}</option>
            <option value="over400k">{BUDGET_FILTER_TH.over400k}</option>
            <option value="unknown">{BUDGET_FILTER_TH.unknown}</option>
          </select>
        </div>
      </div>

      {/* Map, hidden until asked for */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => setShowMap((v) => !v)}
          aria-expanded={showMap}
          className="inline-flex items-center gap-2 rounded-full border border-purple/20 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-dark transition hover:bg-purple hover:text-white"
        >
          <span aria-hidden="true">🗺️</span>
          {showMap ? "ซ่อนแผนที่" : "ไม่แน่ใจว่าอยู่ย่านไหน ดูแผนที่"}
        </button>
        {showMap && (
          <div className="mt-4 rounded-xl border border-black/5 bg-white p-5 shadow-sm">
            <SchoolAreaMap selected={area} counts={counts} onSelect={setArea} th />
          </div>
        )}
      </div>

      <p className="mb-6 text-sm text-neutral-500">
        {showingTh(filtered.length, SCHOOLS_LIST.length, "โรงเรียน")}
      </p>

      {/* Results, grouped by location */}
      <div className="space-y-10">
        {groups.map((g) => (
          <section key={g.id}>
            <div className="mb-4 border-b border-black/5 pb-2">
              <h2 className="font-heading text-xl font-bold text-purple-dark">
                {AREA_TH[g.id].label}{" "}
                <span className="text-sm font-normal text-neutral-400">
                  ({g.schools.length})
                </span>
              </h2>
              <p className="mt-0.5 text-xs text-neutral-500">{AREA_TH[g.id].covers}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.schools.map((s) => (
                <SchoolCardTh key={s.slug} school={s} shownIn={g.id} />
              ))}
            </div>
          </section>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-neutral-400">
            {COMMON_TH.noMatches}
          </p>
        )}
      </div>
    </div>
  );
}

function SchoolCardTh({ school: s, shownIn }: { school: School; shownIn: Area }) {
  const otherAreas = s.areas.filter((a) => a !== shownIn);
  return (
    <Link
      href={`/th/schools/${s.slug}`}
      className="block rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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
            {curriculumTh(c)}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs text-neutral-500">
        {BUDGET_TH[s.budget]}
      </p>
      {otherAreas.length > 0 && (
        <p className="mt-1 text-xs text-neutral-400">
          มีวิทยาเขตอื่น: {otherAreas.map((a) => AREA_TH[a].label).join(", ")}
        </p>
      )}
    </Link>
  );
}
