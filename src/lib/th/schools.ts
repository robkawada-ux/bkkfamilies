// Thai (/th) data layer for the schools directory. Same design as
// src/lib/zh/schools.ts: the English record in src/lib/schools.ts stays the
// single source of truth for names, curricula, areas, founding year, websites,
// addresses and every fee and date. This file holds only translated free text
// plus the label maps the Thai pages need. A school with no description entry
// is left off /th, so no page mixes the two languages.

import type { Area, Budget } from "@/lib/schools";
import type { SchoolZh as SchoolTh } from "@/lib/zh/schoolsTypes";
import { SCHOOLS_TH_PART1A } from "./schools/part1a";
import { SCHOOLS_TH_PART1B } from "./schools/part1b";
import { SCHOOLS_TH_PART1C } from "./schools/part1c";
import { SCHOOLS_TH_PART2A } from "./schools/part2a";
import { SCHOOLS_TH_PART2B } from "./schools/part2b";
import { SCHOOLS_TH_PART3A } from "./schools/part3a";
import { SCHOOLS_TH_PART3B } from "./schools/part3b";
import { SCHOOLS_TH_PART4A } from "./schools/part4a";
import { SCHOOLS_TH_PART4B } from "./schools/part4b";

export type { SchoolTh };

export const SCHOOLS_TH: Record<string, SchoolTh> = {
  ...SCHOOLS_TH_PART1A,
  ...SCHOOLS_TH_PART1B,
  ...SCHOOLS_TH_PART1C,
  ...SCHOOLS_TH_PART2A,
  ...SCHOOLS_TH_PART2B,
  ...SCHOOLS_TH_PART3A,
  ...SCHOOLS_TH_PART3B,
  ...SCHOOLS_TH_PART4A,
  ...SCHOOLS_TH_PART4B,
};

/** The nine directory locations. Same ids and order as AREAS in schools.ts. */
export const AREA_TH: Record<Area, { label: string; covers: string }> = {
  sukhumvit: { label: "สุขุมวิท", covers: "นานา อโศก พร้อมพงษ์ ทองหล่อ (Thonglor) และเอกมัย" },
  onnut: { label: "พระโขนง อ่อนนุช และประเวศ", covers: "สุขุมวิท 50 ถึง 103 อ่อนนุช บางจาก พัฒนาการ และสวนหลวง" },
  bangna: { label: "บางนาและสมุทรปราการ", covers: "บางนา แบริ่ง บางนา-ตราด บางพลี และบริเวณรอบสนามบินสุวรรณภูมิ" },
  central: { label: "ใจกลางเมือง สาทร และพระราม 3", covers: "สีลม สาทร เพลินจิต พญาไท ดุสิต และพระราม 3" },
  rama9: { label: "พระราม 9 และลาดพร้าว", covers: "พระราม 9 รัชดาภิเษก ห้วยขวาง วังทองหลาง และลาดพร้าว" },
  east: { label: "บางกะปิ มีนบุรี และฝั่งตะวันออก", covers: "รามคำแหง บางกะปิ สะพานสูง กรุงเทพกรีฑา มีนบุรี และลาดกระบัง" },
  north: { label: "กรุงเทพฯ เหนือและปทุมธานี", covers: "จตุจักร วิภาวดี ดอนเมือง รามอินทรา รังสิต และปทุมธานี" },
  nonthaburi: { label: "นนทบุรี", covers: "นิชดาธานี ปากเกร็ด แจ้งวัฒนะ ติวานนท์ และราชพฤกษ์" },
  thonburi: { label: "ริมแม่น้ำและธนบุรี", covers: "เจริญกรุงริมแม่น้ำ ธนบุรี พระราม 2 และฝั่งตะวันตกของกรุงเทพฯ" },
};

/** Curriculum tags, keyed by the exact English tag (filters still match on English). */
export const CURRICULUM_TH: Record<string, string> = {
  Adventist: "แอดเวนทิสต์",
  American: "อเมริกัน",
  Australian: "ออสเตรเลีย",
  "Blended Learning": "การเรียนรู้แบบผสมผสาน",
  British: "อังกฤษ",
  Buddhist: "พุทธ",
  Canadian: "แคนาดา",
  Catholic: "คาทอลิก",
  Chinese: "จีน",
  Christian: "คริสต์",
  "English Program": "หลักสูตรอังกฤษ (EP)",
  French: "ฝรั่งเศส",
  German: "เยอรมัน",
  Indian: "อินเดีย",
  International: "นานาชาติ",
  "International Baccalaureate": "International Baccalaureate (IB)",
  Japanese: "ญี่ปุ่น",
  Montessori: "มอนเตสซอรี",
  Singaporean: "สิงคโปร์",
  "Special Educational Needs": "ความต้องการทางการศึกษาพิเศษ",
  Swiss: "สวิส",
  Thai: "ไทย",
};

export const curriculumTh = (c: string): string => CURRICULUM_TH[c] ?? c;

export const BUDGET_TH: Record<Budget, string> = {
  under400k: "ต่ำกว่า 400,000 บาทต่อปี",
  over400k: "มากกว่า 400,000 บาทต่อปี",
  unknown: "ไม่ประกาศค่าเล่าเรียน โปรดสอบถามโรงเรียน",
};

export const BUDGET_FILTER_TH: Record<Budget, string> = {
  under400k: "400,000 บาทต่อปีหรือต่ำกว่า",
  over400k: "400,000 บาทต่อปีหรือสูงกว่า",
  unknown: "ไม่ประกาศค่าเล่าเรียน",
};
