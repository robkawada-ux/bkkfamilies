// Shared building blocks for the Thai (/th) pages.
//
// GLOSSARY. Use these terms everywhere so the directories read as one site.
//
//   Playgroup ............ เพลย์กรุ๊ป          Camp (holiday camp) ... แคมป์ปิดเทอม
//   Activity ............. กิจกรรมครอบครัว      Learning support ...... สนับสนุนการเรียนรู้
//   International school . โรงเรียนนานาชาติ     Preschool or nursery .. สถานเลี้ยงเด็กหรืออนุบาล
//   Parents' group ....... กลุ่มผู้ปกครอง       Community or library .. ชุมชนหรือห้องสมุด
//   Play centre or cafe .. ศูนย์เล่นหรือคาเฟ่เด็ก  Drop-in playgroup .... เพลย์กรุ๊ปแบบเข้าร่วมได้เลย
//   Class or course ...... คลาสหรือคอร์ส        Storytime ............ เวลานิทาน
//   Weekdays ............. วันธรรมดา           Confirmed ............ ยืนยันแล้ว
//   Check before going ... โปรดตรวจสอบก่อนไป     Worth knowing ........ ข้อควรรู้สำหรับผู้ปกครอง
//   Booking required ..... ต้องจองล่วงหน้า       Free ................. ฟรี
//   Price not published .. ไม่ประกาศราคา        Age range not published ไม่ประกาศช่วงอายุ
//   Days and times on request  สอบถามวันและเวลา
//
// STYLE. Polite neutral written Thai, no particles (ครับ/ค่ะ) in page copy. No
// em or en dashes: ranges use "ถึง" ("6 เดือนถึง 2 ปี"), asides use commas or
// brackets, like the English site, which writes "to".
//
// NAMES. Keep every business, school, venue and street name exactly as the
// English data has it. Do not invent Thai brand names. Keep addresses in
// English so a map app can use them. Well-known place names may carry the Thai
// form first with the English in brackets on first mention: สุขุมวิท
// (Sukhumvit), สาทร (Sathorn), สีลม (Silom), ทองหล่อ (Thonglor). When unsure
// of the accepted Thai form, keep the English.
//
// FACTS. Translate, never improve. Prices, dates, ages, phone numbers, URLs,
// LINE ids and "lastVerified" stay as the English data has them. If the
// English hedges, the Thai hedges too. Dates use the Gregorian year (ค.ศ.)
// because school terms and fees are quoted that way.

export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export const DAY_TH: Record<Day, string> = {
  Mon: "วันจันทร์",
  Tue: "วันอังคาร",
  Wed: "วันพุธ",
  Thu: "วันพฤหัสบดี",
  Fri: "วันศุกร์",
  Sat: "วันเสาร์",
  Sun: "วันอาทิตย์",
};

/** ["Sat","Sun"] -> "วันเสาร์ วันอาทิตย์"; Mon to Fri -> "วันธรรมดา" */
export function daysTh(days?: Day[]): string | null {
  if (!days || days.length === 0) return null;
  const weekdays: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  if (days.length === 5 && weekdays.every((d) => days.includes(d))) return "วันธรรมดา";
  return days.map((d) => DAY_TH[d]).join(" ");
}

/** "09:30" + "11:00" -> "9:30 ถึง 11:00". 24-hour clock, "ถึง" instead of a dash. */
export function timeTh(start?: string, end?: string): string | null {
  if (!start) return null;
  const fmt = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return `${h}:${String(m).padStart(2, "0")}`;
  };
  return end ? `${fmt(start)} ถึง ${fmt(end)}` : `ตั้งแต่ ${fmt(start)}`;
}

/** 450 -> "฿450" */
export function bahtTh(n: number): string {
  return `฿${n.toLocaleString("en-US")}`;
}

/** Months to a Thai age phrase: 6 -> "6 เดือน", 24 -> "2 ปี", 30 -> "2 ปีครึ่ง" */
export function monthsTh(m: number): string {
  if (m % 12 === 0 && m >= 24) return `${m / 12} ปี`;
  if (m % 12 === 6 && m >= 30) return `${Math.floor(m / 12)} ปีครึ่ง`;
  return `${m} เดือน`;
}

const MONTH_TH = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

/** "2026-09-28" -> "28 กันยายน 2026" */
export function dateTh(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return d ? `${d} ${MONTH_TH[m - 1]} ${y}` : `${MONTH_TH[m - 1]} ${y}`;
}

/** Shown on every detail page, from the English data's lastVerified. */
export function verifiedTh(iso: string): string {
  return `ตรวจสอบข้อมูลเมื่อ ${dateTh(iso)}`;
}

/** "Showing 12 of 44 playgroups" */
export function showingTh(shown: number, total: number, noun: string): string {
  return `แสดง ${shown} จาก ${total} ${noun}`;
}

export const COMMON_TH = {
  clearFilters: "ล้างตัวกรอง",
  search: "ค้นหา",
  any: "ทั้งหมด",
  allAreas: "ทุกย่าน",
  noMatches: "ไม่พบผลลัพธ์ที่ตรงกัน ลองล้างตัวกรองสักหนึ่งรายการ",
  backToEnglish: "ดูฉบับภาษาอังกฤษ",
  /** Appended under every translated detail page. */
  translationNote:
    "หน้านี้แปลจากต้นฉบับภาษาอังกฤษ ราคา วันที่ และเวลาอาจเปลี่ยนแปลงได้ โปรดยืนยันกับหน่วยงานโดยตรงก่อนไป หากฉบับภาษาไทยและภาษาอังกฤษไม่ตรงกัน ให้ยึดฉบับภาษาอังกฤษเป็นหลัก",
} as const;
