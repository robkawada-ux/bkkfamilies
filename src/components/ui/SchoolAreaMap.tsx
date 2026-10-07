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
    label: [110, 70],
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
    label: [212, 190],
    landmarks: ["MRT Phra Ram 9", "MRT Huai Khwang", "MRT Lat Phrao", "Central Rama 9"],
  },
  {
    id: "east",
    short: "East",
    points: "380,150 580,150 580,330 450,330 430,250 390,215",
    label: [505, 200],
    landmarks: ["The Mall Bang Kapi", "Seacon Square", "Airport Rail Link Lat Krabang", "Pink Line Min Buri"],
  },
  {
    id: "central",
    short: "Central",
    points: "175,230 300,215 320,330 250,390 190,330",
    label: [255, 350],
    landmarks: ["BTS Siam", "BTS Sala Daeng", "MRT Lumphini", "Lumpini Park"],
  },
  {
    id: "sukhumvit",
    short: "Sukhumvit",
    points: "300,215 390,215 430,250 400,300 320,330",
    label: [380, 247],
    landmarks: ["BTS Asok", "BTS Phrom Phong", "BTS Thong Lo", "BTS Ekkamai"],
  },
  {
    id: "onnut",
    short: "On Nut",
    points: "320,330 400,300 430,250 450,330 470,380 360,400",
    label: [372, 358],
    landmarks: ["BTS Phra Khanong", "BTS On Nut", "BTS Bang Chak", "Suan Luang Rama IX Park"],
  },
  {
    id: "bangna",
    short: "Bang Na",
    points: "190,330 250,390 320,330 360,400 470,380 450,330 580,330 580,500 170,500",
    label: [320, 472],
    landmarks: ["BTS Udom Suk", "BTS Bearing", "Mega Bangna", "Suvarnabhumi Airport"],
  },
  {
    id: "thonburi",
    short: "Thonburi",
    points: "20,170 140,170 175,230 190,330 170,500 20,500",
    label: [80, 445],
    landmarks: ["BTS Saphan Taksin", "BTS Wongwian Yai", "ICONSIAM", "Central Rama 2"],
  },
];

// Rail lines, drawn schematically so they pass through the right regions.
// Only the best-known stations are named; the rest of each line is implied.
const LINES: { id: string; name: string; color: string; points: string }[] = [
  { id: "purple", name: "MRT Purple Line", color: "#8E5BB5", points: "215,115 150,122 70,142" },
  { id: "arl", name: "Airport Rail Link", color: "#C8102E", points: "225,236 300,228 400,224 470,250 520,282 545,350 550,455" },
  { id: "mrt", name: "MRT Blue Line", color: "#1E4DA1", points: "205,285 250,295 330,262 325,228 318,200 315,182 288,176 300,122 245,105 215,115 165,140 120,185 110,290 165,300 185,285 205,285" },
  { id: "silom", name: "BTS Silom Line", color: "#00826E", points: "215,262 232,298 222,318 193,325 165,340 140,352 85,380" },
  { id: "sukhumvit", name: "BTS Sukhumvit Line", color: "#7CB342", points: "300,122 285,165 255,212 215,262 240,262 330,262 352,266 375,271 395,279 415,300 425,325 445,370 455,400 470,425" },
];

const STATIONS: { name: string; x: number; y: number; color: string; dx?: number; dy?: number; anchor?: "start" | "end" | "middle"; big?: boolean }[] = [
  { name: "Mo Chit / Chatuchak", x: 300, y: 122, color: "#7CB342", dx: 8, dy: -6, anchor: "start", big: true },
  { name: "Siam", x: 215, y: 262, color: "#7CB342", dx: -8, dy: -6, anchor: "end", big: true },
  { name: "Asok / Sukhumvit", x: 330, y: 262, color: "#7CB342", dy: 16, anchor: "middle", big: true },
  { name: "Phrom Phong", x: 352, y: 266, color: "#7CB342", dx: 2, dy: 30, anchor: "middle" },
  { name: "Thong Lo", x: 375, y: 271, color: "#7CB342", dx: 6, dy: -7, anchor: "start" },
  { name: "On Nut", x: 425, y: 325, color: "#7CB342", dx: 8, dy: 4, anchor: "start" },
  { name: "Bearing", x: 470, y: 425, color: "#7CB342", dx: -8, dy: 4, anchor: "end" },
  { name: "Sala Daeng", x: 232, y: 298, color: "#00826E", dx: 7, dy: 12, anchor: "start" },
  { name: "Saphan Taksin", x: 193, y: 325, color: "#00826E", dx: -8, dy: 14, anchor: "end" },
  { name: "Wongwian Yai", x: 140, y: 352, color: "#00826E", dx: -2, dy: 16, anchor: "middle" },
  { name: "Lumphini", x: 250, y: 295, color: "#1E4DA1", dx: 4, dy: -8, anchor: "start" },
  { name: "Phra Ram 9", x: 318, y: 200, color: "#1E4DA1", dx: 7, dy: 4, anchor: "start" },
  { name: "Lat Phrao", x: 288, y: 176, color: "#1E4DA1", dx: -7, dy: -5, anchor: "end" },
  { name: "Tha Phra", x: 110, y: 290, color: "#1E4DA1", dx: -7, dy: 4, anchor: "end" },
  { name: "Lat Krabang", x: 520, y: 282, color: "#C8102E", dx: 8, dy: 4, anchor: "start" },
  { name: "Suvarnabhumi Airport", x: 550, y: 455, color: "#C8102E", dx: 0, dy: 18, anchor: "end" },
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
          <g pointerEvents="none">
            {LINES.map((l) => (
              <polyline
                key={l.id}
                points={l.points}
                fill="none"
                stroke={l.color}
                strokeWidth={4}
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={0.9}
              />
            ))}
            {STATIONS.map((s) => (
              <g key={s.name}>
                <circle cx={s.x} cy={s.y} r={s.big ? 5.5 : 4} fill="#FFFFFF" stroke={s.color} strokeWidth={2.5} />
                <text
                  x={s.x + (s.dx ?? 0)}
                  y={s.y + (s.dy ?? 0)}
                  textAnchor={s.anchor ?? "start"}
                  fontSize={s.big ? 11 : 10}
                  fontWeight={s.big ? 700 : 600}
                  fill="#333333"
                  stroke="#FFFFFF"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {s.name}
                </text>
              </g>
            ))}
          </g>
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
              </g>
            );
          })}
        </svg>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-600">
          {LINES.slice().reverse().map((l) => (
            <span key={l.id} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-1 w-5 rounded-full" style={{ background: l.color }} />
              {l.name}
            </span>
          ))}
        </div>
        <p className="mt-1 text-xs text-neutral-400">Simplified map, not to scale. Only major stations are shown.</p>
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
