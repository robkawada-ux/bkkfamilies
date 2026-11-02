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
import {
  PROVIDERS_ZH,
  CATEGORY_ZH,
  TAG_ZH,
  areaZh,
  languageZh,
} from "@/lib/zh/learningSupport";
import { COMMON_ZH, showingZh } from "@/lib/zh/common";

// Only providers with a Chinese write-up appear, so a Chinese page is never
// half English. Today that is all of them.
const LISTED = PROVIDERS.filter((p) => PROVIDERS_ZH[p.slug]);

export default function LearningSupportDirectoryZh() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ProviderCategory>("All");
  const [area, setArea] = useState("All");
  const [tag, setTag] = useState<"All" | Tag>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LISTED.filter((p) => {
      const zh = PROVIDERS_ZH[p.slug];
      // Search works in both languages: the English name and tags that people
      // copy from elsewhere, and the Chinese labels shown on the page.
      const haystack = [
        p.name,
        p.category,
        CATEGORY_ZH[p.category],
        p.area,
        areaZh(p.area),
        ...(p.tags ?? []),
        ...(p.tags ?? []).map((t) => TAG_ZH[t]),
        ...p.services,
        ...zh.services,
        ...(p.languages ?? []),
        ...(p.languages ?? []).map(languageZh),
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

  const labelCls = "mb-1 block text-xs font-bold text-neutral-500";
  const fieldCls =
    "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none";

  return (
    <div>
      <div className="mb-8 grid gap-4 rounded-xl border border-black/5 bg-white p-5 shadow-sm md:grid-cols-4">
        <div className="md:col-span-4">
          <label className={labelCls}>{COMMON_ZH.search}</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="试试：阅读障碍、言语治疗、孤独症、评估、通罗"
            className={fieldCls}
          />
        </div>
        <div>
          <label className={labelCls}>需求或服务</label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value as "All" | Tag)}
            className={fieldCls}
          >
            <option value="All">{COMMON_ZH.any}</option>
            {ALL_TAGS.map((t) => (
              <option key={t.tag} value={t.tag}>
                {TAG_ZH[t.tag]} ({t.count})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>机构类型</label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "All" | ProviderCategory)
            }
            className={fieldCls}
          >
            <option value="All">全部类型</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_ZH[c]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>区域</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={fieldCls}
          >
            <option value="All">{COMMON_ZH.allAreas}</option>
            {ALL_AREAS.map((a) => (
              <option key={a} value={a}>
                {areaZh(a)}
              </option>
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
            {COMMON_ZH.clearFilters}
          </button>
        </div>
      </div>

      <p className="mb-4 text-sm text-neutral-500">
        {showingZh(filtered.length, LISTED.length, "机构")}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const zh = PROVIDERS_ZH[p.slug];
          const tags = p.tags ?? [];
          return (
            <Link
              key={p.slug}
              href={`/zh/learning-support/${p.slug}`}
              className="block rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Provider names stay in English, exactly as on the English site. */}
              <h3 lang="en" className="font-heading text-base font-bold text-purple-dark">
                {p.name}
              </h3>
              <p className="mt-1 text-xs font-semibold text-orange">
                {CATEGORY_ZH[p.category]}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal"
                  >
                    {TAG_ZH[t]}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500">
                    另有 {tags.length - 3} 项
                  </span>
                )}
              </div>
              <p className="mt-3 text-xs text-neutral-500">
                {areaZh(p.area)}
                {zh.ages ? ` · 年龄：${zh.ages}` : ""}
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
