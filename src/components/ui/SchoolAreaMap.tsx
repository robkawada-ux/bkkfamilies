"use client";

import { useState } from "react";
import { AREAS, type Area } from "@/lib/schools";

// A simplified, not-to-scale map of Bangkok split into the nine directory
// locations. The shapes only need to put each area on the right side of the
// city relative to the others, so parents can find their side of town; the
// landmarks do the real work of telling them which region they live in.
const REGIONS: {
  id: Area;
  short: string;
  points: string;
  label: [number, number];
  landmarks: string[];
}[] = [
  {
    id: "nonthaburi",
    short: "Nonthaburi",
    points: "20,20 230,20 230,150 140,170 20,170",
    label: [110, 92],
    landmarks: ["MRT Purple Line", "Nichada Thani", "Impact Muang Thong Thani", "Central WestGate"],
  },
  {
    id: "north",
    short: "North",
    points: "230,20 580,20 580,150 380,150 330,170 230,150",
    label: [410, 82],
    landmarks: ["BTS Mo Chit", "Chatuchak Weekend Market", "Don Mueang Airport", "Future Park Rangsit"],
  },
  {
    id: "rama9",
    short: "Rama 9",
    points: "140,170 230,150 330,170 380,150 390,215 300,215 175,230",
    label: [272, 192],
    landmarks: ["MRT Phra Ram 9", "MRT Huai Khwang", "MRT Lat Phrao", "Central Rama 9"],
  },
  {
    id: "east",
    short: "East",
    points: "380,150 580,150 580,330 450,330 430,250 390,215",
    label: [505, 240],
    landmarks: ["The Mall Bang Kapi", "Seacon Square", "Airport Rail Link Lat Krabang", "Pink Line Min Buri"],
  },
  {
    id: "central",
    short: "Central",
    points: "175,230 300,215 320,330 250,390 190,330",
    label: [250, 290],
    landmarks: ["BTS Siam", "BTS Sala Daeng", "MRT Lumphini", "Lumpini Park"],
  },
  {
    id: "sukhumvit",
    short: "Sukhumvit",
    points: "300,215 390,215 430,250 400,300 320,330",
    label: [362, 262],
    landmarks: ["BTS Asok", "BTS Phrom Phong", "BTS Thong Lo", "BTS Ekkamai"],
  },
  {
    id: "onnut",
    short: "On Nut",
    points: "320,330 400,300 430,250 450,330 470,380 360,400",
    label: [408, 345],
    landmarks: ["BTS Phra Khanong", "BTS On Nut", "BTS Bang Chak", "Suan Luang Rama IX Park"],
  },
  {
    id: "bangna",
    short: "Bang Na",
    points: "190,330 250,390 320,330 360,400 470,380 450,330 580,330 580,500 170,500",
    label: [420, 448],
    landmarks: ["BTS Udom Suk", "BTS Bearing", "Mega Bangna", "Suvarnabhumi Airport"],
  },
  {
    id: "thonburi",
    short: "Thonburi",
    points: "20,170 140,170 175,230 190,330 170,500 20,500",
    label: [92, 330],
    landmarks: ["BTS Saphan Taksin", "BTS Wongwian Yai", "ICONSIAM", "Central Rama 2"],
  },
];

const RIVER =
  "M150,20 C140,90 135,140 150,190 C175,240 185,290 195,340 C210,400 270,440 330,460 C370,475 400,490 420,500";

export default function SchoolAreaMap({
  selected,
  counts,
  onSelect,
}: {
  selected: "All" | Area;
  counts: Record<Area, number>;
  onSelect: (area: "All" | Area) => void;
}) {
  const [hover, setHover] = useState<Area | null>(null);
  const focus = hover ?? (selected === "All" ? null : selected);
  const info = focus ? AREAS.find((a) => a.id === focus) : null;
  const region = focus ? REGIONS.find((r) => r.id === focus) : null;

  return (
    <div className="grid gap-5 md:grid-cols-[3fr_2fr]">
      <div>
        <svg
          viewBox="0 0 600 520"
          className="h-auto w-full select-none"
          role="group"
          aria-label="Map of Bangkok divided into nine school locations"
        >
          {REGIONS.map((r) => {
            const isSelected = selected === r.id;
            const isHover = hover === r.id;
            return (
              <polygon
                key={r.id}
                points={r.points}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`${AREAS.find((a) => a.id === r.id)?.label}, ${counts[r.id]} schools`}
                onClick={() => onSelect(isSelected ? "All" : r.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(isSelected ? "All" : r.id);
                  }
                }}
                onMouseEnter={() => setHover(r.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(r.id)}
                onBlur={() => setHover(null)}
                className="cursor-pointer outline-none transition-colors"
                style={{
                  fill: isSelected ? "#5C2D91" : isHover ? "#FEF3E8" : "#F3EEF9",
                  stroke: isHover && !isSelected ? "#F4831F" : "#FFFFFF",
                  strokeWidth: 3,
                  strokeLinejoin: "round",
                }}
              />
            );
          })}
          <path
            d={RIVER}
            fill="none"
            stroke="#3EC1D3"
            strokeWidth={7}
            strokeLinecap="round"
            opacity={0.55}
            pointerEvents="none"
          />
          <text x={120} y={238} fontSize={11} fill="#2a8f9c" transform="rotate(62 120 238)" pointerEvents="none">
            Chao Phraya
          </text>
          {REGIONS.map((r) => {
            const isSelected = selected === r.id;
            return (
              <g key={r.id} pointerEvents="none" textAnchor="middle">
                <text
                  x={r.label[0]}
                  y={r.label[1]}
                  fontSize={15}
                  fontWeight={700}
                  fill={isSelected ? "#FFFFFF" : "#3D1E5C"}
                >
                  {r.short}
                </text>
                <text
                  x={r.label[0]}
                  y={r.label[1] + 17}
                  fontSize={11}
                  fill={isSelected ? "#FFFFFF" : "#6b6b6b"}
                >
                  {counts[r.id]} {counts[r.id] === 1 ? "school" : "schools"}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="mt-1 text-xs text-neutral-400">Simplified map, not to scale.</p>
      </div>

      <div className="rounded-xl border border-black/5 bg-neutral-50 p-5 text-sm">
        {info && region ? (
          <>
            <h3 className="font-heading text-lg font-bold text-purple-dark">{info.label}</h3>
            <p className="mt-1 text-neutral-600">{info.covers}</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-neutral-500">
              Landmarks
            </p>
            <ul className="mt-1.5 space-y-1 text-neutral-700">
              {region.landmarks.map((l) => (
                <li key={l}>📍 {l}</li>
              ))}
            </ul>
            <p className="mt-4 font-semibold text-purple-dark">
              {counts[info.id]} {counts[info.id] === 1 ? "school" : "schools"}
            </p>
            {selected === info.id ? (
              <button
                type="button"
                onClick={() => onSelect("All")}
                className="mt-3 text-sm font-semibold text-teal hover:underline"
              >
                Show all locations
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onSelect(info.id)}
                className="mt-3 rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Show schools here
              </button>
            )}
          </>
        ) : (
          <>
            <h3 className="font-heading text-lg font-bold text-purple-dark">Pick your side of town</h3>
            <p className="mt-2 text-neutral-600">
              Tap a region on the map to see the schools there. Hover over or tap a region to see its
              BTS and MRT stations and landmarks, so you can tell which one you live in.
            </p>
            <p className="mt-3 text-neutral-600">Tap the selected region again to clear it.</p>
          </>
        )}
      </div>
    </div>
  );
}
