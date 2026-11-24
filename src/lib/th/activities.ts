// Thai text for the activities directory (/th/activities).
//
// Only the free-text fields are translated here, keyed by the English slug.
// Everything factual (prices, ages, phone numbers, URLs, LINE ids, dates,
// status, lastVerified) is read from the English record in
// src/lib/activities.ts, so a price fixed there is fixed in both languages.
//
// A listing with no entry in ACTIVITIES_TH does not appear under /th at all
// (TH_ACTIVITIES below), so a Thai page is never half English.
//
// Style rules: see ./common.ts. Business, venue and mall names stay in English.

import {
  ACTIVITIES,
  type Activity,
  type ActivityType,
  type Budget,
  type Category,
  type Price,
  type PriceUnit,
  type Setting,
  type Zone,
} from "@/lib/activities";
import { bahtTh } from "./common";
import { ACTIVITIES_TH_PART1 } from "./activities/part1";
import { ACTIVITIES_TH_PART2 } from "./activities/part2";
import { ACTIVITIES_TH_PART3 } from "./activities/part3";
import { ACTIVITIES_TH_PART4 } from "./activities/part4";
import { ACTIVITIES_TH_PART5 } from "./activities/part5";

export interface ActivityTh {
  /** Only where the English "district" is a descriptor, not a place name (e.g. "Six pools"). */
  district?: string;
  venue?: string;
  transit?: string;
  hours?: string;
  /** Translation of price.note. */
  priceNote?: string;
  description: string;
  worthKnowing?: string;
  closedNote?: string;
  /** Only where a branch label has words to translate. Others fall back to the English list. */
  branches?: string[];
  /** Keyed by the English BranchContact.name. */
  branchLocations?: Record<string, string>;
  photoAlt?: string;
  photoCredit?: string;
}

// ---------------------------------------------------------------- labels

export const TYPE_TH: Record<ActivityType, string> = {
  "Day out": "ที่เที่ยววันหยุด",
  "Weekly class": "คลาสประจำสัปดาห์",
};

export const CATEGORY_TH: Record<Category, string> = {
  "Indoor play": "สนามเด็กเล่นในร่ม",
  "Trampolines, climbing and karts": "แทรมโพลีน ปีนผา และโกคาร์ท",
  "Theme and water parks": "สวนสนุกและสวนน้ำ",
  "Animals and aquariums": "สัตว์และพิพิธภัณฑ์สัตว์น้ำ",
  "Museums and science": "พิพิธภัณฑ์และวิทยาศาสตร์",
  "Parks and outdoors": "สวนสาธารณะและกลางแจ้ง",
  "Markets, culture and views": "ตลาด วัฒนธรรม และจุดชมวิว",
  "Seasonal events": "กิจกรรมตามเทศกาล",
  Swimming: "ว่ายน้ำ",
  Football: "ฟุตบอล",
  Gymnastics: "ยิมนาสติก",
  Dance: "เต้น",
  Fitness: "ฟิตเนส",
  Music: "ดนตรี",
  "Art and science": "ศิลปะและวิทยาศาสตร์",
};

export const SETTING_TH: Record<Setting, string> = {
  Indoor: "ในร่ม",
  Outdoor: "กลางแจ้ง",
  "Indoor and outdoor": "ทั้งในร่มและกลางแจ้ง",
  Undercover: "มีหลังคาคลุม",
};

export const ZONE_TH: Record<Zone, string> = {
  Sukhumvit: "สุขุมวิท",
  Central: "ใจกลางเมือง",
  "Riverside and Thonburi": "ริมแม่น้ำและธนบุรี",
  "Rama 9 and east": "พระราม 9 และฝั่งตะวันออก",
  "Bang Na and south": "บางนาและฝั่งใต้",
  North: "ฝั่งเหนือ",
  "Day trip outside Bangkok": "ทริปวันเดียวนอกกรุงเทพฯ",
  "Several locations": "หลายสถานที่",
};

export const PRICE_UNIT_TH: Record<PriceUnit, string> = {
  entry: "",
  hour: "ต่อชั่วโมง",
  session: "ต่อครั้ง",
  term: "ต่อภาคเรียน",
  course: "ต่อคอร์ส",
  month: "ต่อเดือน",
  activity: "ต่อกิจกรรม",
};

export const BUDGET_TH: Record<Budget, string> = {
  free: "ฟรี",
  under500: "ต่ำกว่า ฿500",
  "500to1000": "฿500 ถึง ฿1,000",
  over1000: "มากกว่า ฿1,000 หรือเก็บเป็นรายภาคเรียน",
  unknown: "ไม่เปิดเผยราคา",
};

/** English ageLabel, in Thai: "3 ปีขึ้นไป", "ทารกถึง 13 ปี", "ทุกวัย". */
export function ageLabelTh(min?: number, max?: number): string | null {
  if (min === undefined && max === undefined) return null;
  if (min !== undefined && max === undefined) return min === 0 ? "ทุกวัย" : `${min} ปีขึ้นไป`;
  if (min === undefined) return `ไม่เกิน ${max} ปี`;
  if (min === 0) return `ทารกถึง ${max} ปี`;
  return `${min} ถึง ${max} ปี`;
}

/** English priceLabel, in Thai: "฿180 ถึง ฿760", "เริ่ม ฿350", "เริ่ม ฿10,500 (ต่อภาคเรียน)", "ฟรี". */
export function priceLabelTh(p?: Price): string | null {
  if (!p) return null;
  if (p.free) return "ฟรี";
  if (p.from === undefined) return null;
  const base =
    p.to && p.to !== p.from
      ? `${bahtTh(p.from)} ถึง ${bahtTh(p.to)}`
      : `เริ่ม ${bahtTh(p.from)}`;
  const unit = PRICE_UNIT_TH[p.unit];
  return unit ? `${base} (${unit})` : base;
}

// -------------------------------------------------------------- translations

export const ACTIVITIES_TH: Record<string, ActivityTh> = {
  ...ACTIVITIES_TH_PART1,
  ...ACTIVITIES_TH_PART2,
  ...ACTIVITIES_TH_PART3,
  ...ACTIVITIES_TH_PART4,
  ...ACTIVITIES_TH_PART5,
};

/** The English records that have a Thai translation, in the English order. */
export const TH_ACTIVITIES: Activity[] = ACTIVITIES.filter((a) => a.slug in ACTIVITIES_TH);

export function getActivityTh(slug: string): ActivityTh | undefined {
  return ACTIVITIES_TH[slug];
}
