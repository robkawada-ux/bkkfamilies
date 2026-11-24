// Thai text for the playgroups directory (/th/playgroups).
//
// Facts (names, venues, addresses, ages, times, prices, contacts, status,
// lastVerified) are read from src/lib/playgroups.ts so there is one source of
// truth. This file holds only the free text that needs translating, keyed by
// the English slug. A playgroup with no entry is left out of /th entirely.
//
// Glossary and punctuation rules: see src/lib/th/common.ts.

import {
  PLAYGROUPS,
  type Day,
  type Frequency,
  type Kind,
  type Organiser,
  type Playgroup,
  type Price,
  type Zone,
} from "@/lib/playgroups";
import { bahtTh, DAY_TH } from "@/lib/th/common";
import { PLAYGROUPS_TH_PART1 } from "./playgroups/part1";
import { PLAYGROUPS_TH_PART2 } from "./playgroups/part2";
import { PLAYGROUPS_TH_PART3 } from "./playgroups/part3";
import { PLAYGROUPS_TH_PART4 } from "./playgroups/part4";

export interface SessionTh {
  /** Only for generic labels. Programme names (Little Pups, PlayNest) stay in English. */
  label?: string;
  note?: string;
  /** Translation of session.price.note */
  priceNote?: string;
}

export interface PlaygroupTh {
  description: string;
  worthKnowing?: string;
  transit?: string;
  finePrint?: string;
  /** One entry per English session, same order. Use {} when there is nothing to translate. */
  sessions: SessionTh[];
}

export const ORGANISER_TH: Record<Organiser, string> = {
  "International school": "โรงเรียนนานาชาติ",
  "Preschool or nursery": "สถานเลี้ยงเด็กหรือโรงเรียนอนุบาล",
  "Parents' group": "กลุ่มผู้ปกครอง",
  "Play centre or cafe": "ศูนย์เล่นหรือคาเฟ่เด็ก",
  "Community or library": "ชุมชนหรือห้องสมุด",
};

export const KIND_TH: Record<Kind, string> = {
  "Drop-in playgroup": "เพลย์กรุ๊ปแบบเข้าร่วมได้เลย",
  "Class or course": "คลาสหรือคอร์ส",
  Storytime: "เวลานิทาน",
};

export const ZONE_TH: Record<Zone, string> = {
  Sukhumvit: "สุขุมวิท (Sukhumvit)",
  Central: "ใจกลางเมือง",
  "Rama 9 and Ramkhamhaeng": "พระราม 9 และรามคำแหง (Rama 9 and Ramkhamhaeng)",
  "Bang Na and east": "บางนาและฝั่งตะวันออก (Bang Na and east)",
  North: "ฝั่งเหนือ",
  "Several locations": "หลายสถานที่",
};

/** Short form for cards and filters. */
export const ZONE_SHORT_TH: Record<Zone, string> = {
  Sukhumvit: "สุขุมวิท",
  Central: "ใจกลางเมือง",
  "Rama 9 and Ramkhamhaeng": "พระราม 9 และรามคำแหง",
  "Bang Na and east": "บางนาและฝั่งตะวันออก",
  North: "ฝั่งเหนือ",
  "Several locations": "หลายสถานที่",
};

/** District names stay in English. Only these two placeholders are translated. */
export function districtTh(district: string): string {
  if (district === "Call for address") return "สอบถามที่อยู่";
  if (district === "Various") return "หลายเขต";
  return district;
}

export const FREQUENCY_TH: Record<Frequency, string> = {
  weekly: "ทุกสัปดาห์",
  fortnightly: "สองสัปดาห์ครั้ง",
  monthly: "ทุกเดือน",
  occasional: "ไม่สม่ำเสมอ",
};

export const LANGUAGE_TH: Record<string, string> = {
  English: "อังกฤษ",
  Japanese: "ญี่ปุ่น",
  Mandarin: "จีนกลาง",
  Thai: "ไทย",
  German: "เยอรมัน",
};

export const languageTh = (l: string): string => LANGUAGE_TH[l] ?? l;
export const languagesTh = (ls: string[]): string => ls.map(languageTh).join(" ");

export const DAY_OPTION_TH: Record<Day, string> = DAY_TH;

/** Age bands a parent actually thinks in, mapped to a representative age in months. */
export const AGE_BANDS_TH: { id: string; label: string; months: number }[] = [
  { id: "0-6", label: "ต่ำกว่า 6 เดือน", months: 3 },
  { id: "6-12", label: "6 ถึง 12 เดือน", months: 9 },
  { id: "12-18", label: "12 ถึง 18 เดือน", months: 15 },
  { id: "18-24", label: "18 เดือนถึง 2 ปี", months: 21 },
  { id: "2", label: "2 ปี", months: 30 },
  { id: "3", label: "3 ปี", months: 42 },
  { id: "4-6", label: "4 ถึง 6 ปี", months: 60 },
];

function yearsOnly(m: number): string | null {
  if (m < 12) return null;
  if (m % 12 === 0) return `${m / 12}`;
  if (m % 12 === 6 && m >= 24) return `${Math.floor(m / 12)}.5`;
  return null;
}

function monthsLabelTh(m: number): string {
  const y = yearsOnly(m);
  if (y === null) return `${m} เดือน`;
  return y.endsWith(".5") ? `${y.slice(0, -2)} ปีครึ่ง` : `${y} ปี`;
}

export function ageLabelTh(min?: number, max?: number): string | null {
  if (min === undefined || max === undefined) return null;
  const hi = monthsLabelTh(max);
  if (min === 0) return `แรกเกิดถึง ${hi}`;
  const loYears = yearsOnly(min);
  const hiYears = yearsOnly(max);
  if (loYears !== null && hiYears !== null) {
    return !loYears.includes(".") && !hiYears.includes(".")
      ? `${loYears} ถึง ${hiYears} ปี`
      : `${monthsLabelTh(min)} ถึง ${hi}`;
  }
  if (loYears === null && hiYears === null) return `${min} ถึง ${max} เดือน`;
  return `${monthsLabelTh(min)} ถึง ${hi}`;
}

export function priceLabelTh(p?: Price): string | null {
  if (!p) return null;
  if (p.free) return "ฟรี";
  if (p.amount === undefined) return null;
  const base =
    p.to && p.to !== p.amount ? `${bahtTh(p.amount)} ถึง ${bahtTh(p.to)}` : bahtTh(p.amount);
  const unit = p.unit === "year" ? "ต่อปี" : p.unit === "course" ? "ต่อคอร์ส" : "ต่อครั้ง";
  return `${base} ${unit}`;
}

/** Playgroups that have a Thai translation, in the English file's order. */
export function thPlaygroups(): Playgroup[] {
  return PLAYGROUPS.filter((p) => p.slug in PLAYGROUPS_TH);
}

export const PLAYGROUPS_TH: Record<string, PlaygroupTh> = {
  ...PLAYGROUPS_TH_PART1,
  ...PLAYGROUPS_TH_PART2,
  ...PLAYGROUPS_TH_PART3,
  ...PLAYGROUPS_TH_PART4,
};
