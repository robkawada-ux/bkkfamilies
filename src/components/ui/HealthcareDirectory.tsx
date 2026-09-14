"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FACILITIES,
  ALL_AREAS,
  ALL_SERVICES,
  ALL_TYPES,
  type Service,
  type FacilityType,
} from "@/lib/healthcare";

export const SERVICE_LABEL: Record<Service, string> = {
  maternity: "Maternity",
  nicu: "Neonatal intensive care",
  fertility: "Fertility",
  paediatrics: "Paediatrics",
  "paediatric-emergency": "Children's emergency",
  "developmental-paediatrics": "Developmental",
  vaccinations: "Vaccinations",
  "emergency-24h": "24h emergency",
  "family-medicine": "Family medicine",
  "mental-health": "Mental health",
  allergy: "Allergy",
  dermatology: "Dermatology",
  physiotherapy: "Physiotherapy",
  "travel-medicine": "Travel medicine",
  dental: "Dental",
  "paediatric-dentistry": "Children's dentistry",
  orthodontics: "Orthodontics",
};

export const TYPE_LABEL: Record<FacilityType, string> = {
  "international-hospital": "International hospital",
  "private-hospital": "Private hospital",
  "public-hospital": "Public hospital",
  "specialist-hospital": "Specialist hospital",
  clinic: "Clinic",
  dental: "Dental",
};

function baht(n: number): string {
  return `฿${n.toLocaleString()}`;
}

export default function HealthcareDirectory({
  initialService = "All",
}: {
  initialService?: "All" | Service;
}) {
  const [query, setQuery] = useState("");
  const [service, setService] = useState<"All" | Service>(initialService);
  const [area, setArea] = useState("All");
  const [type, setType] = useState<"All" | FacilityType>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FACILITIES.filter((f) => {
      const haystack = [
        f.name,
        f.thaiName ?? "",
        f.area,
        f.address ?? "",
        f.description,
        ...f.services,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = q === "" || haystack.includes(q);
      const matchesService = service === "All" || f.services.includes(service);
      const matchesArea = area === "All" || f.area === area;
      const matchesType = type === "All" || f.type === type;
      return matchesQuery && matchesService && matchesArea && matchesType;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [query, service, area, type]);

  const filtersActive =
    query !== "" || service !== "All" || area !== "All" || type !== "All";

  const reset = () => {
    setQuery("");
    setService("All");
    setArea("All");
    setType("All");
  };

  const inputClass =
    "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-orange focus:outline-none";
  const labelClass =
    "mb-1 block text-xs font-bold uppercase tracking-wide text-neutral-500";

  return (
    <div>
      <div className="mb-6 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <label className={labelClass} htmlFor="hc-search">
            Search
          </label>
          <input
            id="hc-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try maternity, Thong Lor, dentist, NICU..."
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="hc-service">
            What you need
          </label>
          <select
            id="hc-service"
            value={service}
            onChange={(e) => setService(e.target.value as "All" | Service)}
            className={inputClass}
          >
            <option value="All">Anything</option>
            {ALL_SERVICES.map((s) => (
              <option key={s} value={s}>
                {SERVICE_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="hc-area">
            Area
          </label>
          <select
            id="hc-area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={inputClass}
          >
            <option value="All">All areas</option>
            {ALL_AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="hc-type">
            Type
          </label>
          <select
            id="hc-type"
            value={type}
            onChange={(e) => setType(e.target.value as "All" | FacilityType)}
            className={inputClass}
          >
            <option value="All">Any</option>
            {ALL_TYPES.map((t) => (
              <option key={t} value={t}>
                {TYPE_LABEL[t]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          Showing {filtered.length} of {FACILITIES.length} places
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((f) => {
          const price = f.maternity?.packageFrom;
          return (
            <Link
              key={f.slug}
              href={`/healthcare/hospitals/${f.slug}`}
              className="block rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="font-heading text-base font-bold text-purple-dark">
                {f.name}
              </h3>
              <p className="mt-0.5 text-sm text-neutral-600">
                {TYPE_LABEL[f.type]} &middot; {f.area}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {f.services.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal"
                  >
                    {SERVICE_LABEL[s]}
                  </span>
                ))}
                {f.jciAccredited && (
                  <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple">
                    JCI
                  </span>
                )}
              </div>

              {f.nearestTransit && (
                <p className="mt-3 text-xs text-neutral-500">
                  {f.nearestTransit}
                </p>
              )}

              {f.services.includes("maternity") && (
                <p className="mt-2 text-sm font-semibold text-neutral-700">
                  {price ? (
                    <>
                      Delivery from {baht(price)}
                    </>
                  ) : (
                    <span className="font-normal text-neutral-400">
                      Delivery price not published
                    </span>
                  )}
                </p>
              )}
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
