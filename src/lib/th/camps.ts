// Thai (/th) translations for the camps directory.
//
// Keyed by the English camp slug, then by English session id, so the English
// data in src/lib/camps.ts stays the single source of truth for dates, ages,
// prices and contact details. Only free text lives here. Names, addresses,
// phone numbers, URLs and prices are never retyped: pages read them from the
// English record and use the formatting helpers below.
//
// Camp and operator names, and street addresses, stay in English (see the
// glossary in ./common.ts).

import { CAMPS, type CampCategory, type CampFormat, type CampSession, type DateStatus, type PriceUnit } from "@/lib/camps";
import type { BreakWindowId } from "@/lib/schoolBreaks";
import { bahtTh } from "./common";

export interface SessionTh {
  programme: string;
  previousRun?: string;
  hours?: string;
  minimumBooking?: string;
  venue?: string;
  supervisionRatio?: string;
  note?: string;
}

export interface CampTh {
  area: string;
  photoAlt?: string;
  photoCaption?: string;
  photoCredit?: string;
  description: string;
  worthKnowing?: string;
  tagline?: string;
  highlights?: string[];
  /** Branch name (English, as in the data) to translated location line. */
  branchLocations?: Record<string, string>;
  sessions: Record<string, SessionTh>;
}

export const CATEGORY_TH: Record<CampCategory, string> = {
  academic: "วิชาการ",
  "art-and-design": "ศิลปะและการออกแบบ",
  cookery: "ทำอาหาร",
  "language-learning": "การเรียนภาษา",
  "music-and-drama": "ดนตรีและการแสดง",
  "nature-and-outdoors": "ธรรมชาติและกลางแจ้ง",
  "sport-and-fitness": "กีฬาและสุขภาพ",
  stem: "STEM",
  swimming: "ว่ายน้ำ",
  "multi-activity": "หลายกิจกรรม",
};

export const FORMAT_TH: Record<CampFormat, string> = {
  day: "แคมป์เต็มวัน",
  "half-day": "แคมป์ครึ่งวัน",
  residential: "แคมป์ค้างคืน",
};

export const DATE_STATUS_TH: Record<DateStatus, string> = {
  confirmed: "ยืนยันวันที่แล้ว",
  tba: "รอประกาศวันที่",
  "ran-previously": "เคยจัดมาก่อน ปีนี้ยังไม่ประกาศใหม่",
};

export const PRICE_UNIT_TH: Record<PriceUnit, string> = {
  "per-day": "ต่อวัน",
  "per-week": "ต่อสัปดาห์",
  "per-session": "ต่อรอบ",
};

/** Area labels. English place names with no settled Thai form are kept as they are. */
export const AREA_TH: Record<string, string> = {
  Watthana: "วัฒนา (Watthana)",
  Nonthaburi: "นนทบุรี (Nonthaburi)",
  "Huai Khwang": "ห้วยขวาง (Huai Khwang)",
  "Bang Kachao": "บางกะเจ้า (Bang Kachao)",
  Silom: "สีลม (Silom)",
  Sathorn: "สาทร (Sathorn)",
  Bangkok: "กรุงเทพฯ",
  Kanchanaburi: "กาญจนบุรี (Kanchanaburi)",
  "Bang Rak": "บางรัก (Bang Rak)",
  "Khlong Toei": "คลองเตย (Khlong Toei)",
  "Several branches": "หลายสาขา",
};

export function areaTh(area: string): string {
  return AREA_TH[area] ?? area;
}

/** School break windows (ids from src/lib/schoolBreaks.ts). */
export const WINDOW_TH: Record<BreakWindowId, { label: string; shortLabel: string }> = {
  "oct-2026": { label: "ปิดเทอมกลางภาค ตุลาคม 2026", shortLabel: "ตุลาคม 2026" },
  "winter-2026": { label: "ปิดเทอมฤดูหนาวและปีใหม่ 2026/27", shortLabel: "ฤดูหนาว 2026" },
  "spring-2027": { label: "ปิดเทอมกลางภาค ฤดูใบไม้ผลิ 2027", shortLabel: "ฤดูใบไม้ผลิ 2027" },
  "songkran-2027": { label: "ปิดเทอมสงกรานต์ 2027", shortLabel: "สงกรานต์ 2027" },
  "summer-2027": { label: "ปิดเทอมฤดูร้อน 2027", shortLabel: "ฤดูร้อน 2027" },
  "other-2027": { label: "วันหยุดระหว่างภาคเรียนอื่นๆ ปี 2027", shortLabel: "อื่นๆ 2027" },
};

const MONTH_TH = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

/** "2026-12-07","2026-12-11" -> "7 ถึง 11 ธันวาคม"; across months "30 พฤศจิกายน ถึง 4 ธันวาคม". Year omitted, as on the English page. */
export function rangeTh(start?: string, end?: string): string | null {
  if (!start || !end) return null;
  const [, sm, sd] = start.split("-").map(Number);
  const [, em, ed] = end.split("-").map(Number);
  if (sm === em) return `${sd} ถึง ${ed} ${MONTH_TH[sm - 1]}`;
  return `${sd} ${MONTH_TH[sm - 1]} ถึง ${ed} ${MONTH_TH[em - 1]}`;
}

/** "฿6,750 ถึง ฿7,750 ต่อสัปดาห์", with the "(โดยประมาณ)" hedge kept. Null when unpublished. */
export function priceTh(s: Pick<CampSession, "priceFrom" | "priceTo" | "priceUnit" | "priceEstimated">): string | null {
  if (!s.priceFrom) return null;
  const base =
    s.priceTo && s.priceTo !== s.priceFrom
      ? `${bahtTh(s.priceFrom)} ถึง ${bahtTh(s.priceTo)}`
      : bahtTh(s.priceFrom);
  const unit = s.priceUnit === "per-week" ? " ต่อสัปดาห์" : s.priceUnit === "per-day" ? " ต่อวัน" : "";
  return base + unit + (s.priceEstimated ? " (โดยประมาณ)" : "");
}

/** "4 ถึง 8 ปี", "7 ปีขึ้นไป", or null when the operator publishes no ages. */
export function agesTh(min?: number, max?: number): string | null {
  if (min !== undefined && max !== undefined) return `${min} ถึง ${max} ปี`;
  if (min !== undefined) return `${min} ปีขึ้นไป`;
  return null;
}

// Bricks 4 Kidz sessions are generated in English from one price list. Build
// the Thai side from the same generated records.
const B4K_PROGRAMME_TH: Record<string, string> = {
  "Junior Inventor Camp": "แคมป์ Junior Inventor",
  "Advance Inventor Camp": "แคมป์ Advance Inventor",
  "Junior Robotics Camp": "แคมป์ Junior Robotics",
  "Advance Robotics Camp": "แคมป์ Advance Robotics",
};

function b4kSessionsTh(): Record<string, SessionTh> {
  const out: Record<string, SessionTh> = {};
  const camp = CAMPS.find((c) => c.slug === "bricks-4-kidz");
  for (const s of camp?.sessions ?? []) {
    out[s.id] = {
      programme: B4K_PROGRAMME_TH[s.programme] ?? s.programme,
      hours: "9:30 ถึง 12:30 หรือ 9:30 ถึง 15:00 (รวมอาหารกลางวัน)",
      minimumBooking: "1 สัปดาห์",
      note:
        s.priceFrom && s.priceTo
          ? `ครึ่งวันถึง 12:30 ราคา ${bahtTh(s.priceFrom)} อยู่ถึง 15:00 พร้อมอาหารกลางวันราคา ${bahtTh(s.priceTo)} เปิดทั้งสี่สาขา`
          : undefined,
    };
  }
  return out;
}

export const CAMPS_TH: Record<string, CampTh> = {
  "bangkok-prep-holiday-camps": {
    area: "Watthana",
    description: "แคมป์ปิดเทอมของ Bangkok Prep เป็นหนึ่งในโปรแกรมที่ใหญ่และมีข้อมูลครบที่สุดของเมือง ครอบคลุมเจ็ดสัปดาห์ของปิดเทอมฤดูร้อน โดยแต่ละสัปดาห์มีโปรแกรมต่างกัน เปิดรับเด็กจากทุกโรงเรียน ไม่เฉพาะครอบครัว Bangkok Prep แคมป์ฤดูร้อนจัด 9:00 น. ถึง 15:00 น. ที่วิทยาเขตมัธยมบนสุขุมวิท 77 และทุกค่าใช้จ่ายรวมอาหารกลางวันและของว่าง ยังมีแคมป์ฤดูหนาวหนึ่งสัปดาห์ 4 ถึง 8 มกราคม 2027 เวลา 9:00 น. ถึง 14:00 น. รวมของว่างและอาหารกลางวัน เปิดรับเด็กจากทุกโรงเรียนตั้งแต่ Reception ถึง Year 13 ตัวเลือกกว้างผิดปกติ ตั้งแต่การอ่านเขียนภาษาไทยและ EAL ภาษาอังกฤษ ไปจนถึงการเขียนโค้ด Minecraft หุ่นยนต์ การออกแบบ กีฬาหลายชนิด และโปรแกรมว่ายน้ำระดับแข่งขัน",
    worthKnowing: "แคมป์สามแห่งที่โฆษณาในหน้าของ Bangkok Prep จัดโดยผู้ดำเนินการแยกต่างหากที่ใช้วิทยาเขตนี้ ได้แก่ Ivy Camps USA, Grow Learning Gardens และ AP Race แต่ละแห่งมีราคา ระบบจอง และในกรณีของ Ivy มีกำหนดเวลาจองล่วงหน้าราคาพิเศษแยกต่างหาก ส่วนลดของโรงเรียนจึงไม่ใช้กับแคมป์เหล่านี้ เราลงรายการแยกไว้ในไดเรกทอรีนี้",
    sessions: {
      "bkkprep-winter-sports": { programme: "แคมป์กีฬา", hours: "9:00 น. ถึง 14:00 น.", note: "เลือกกีฬาแต่ละวัน ได้แก่ บาสเกตบอล ฟุตบอล ว่ายน้ำ ยิมนาสติก หรือเทนนิส นำโดยโค้ชของ Bangkok Prep จองเป็นรายวัน ไม่มีส่วนลดจองล่วงหน้า" },
      "bkkprep-winter-puppy-play": { programme: "แคมป์ Puppy Play: Winter Wonders", hours: "9:00 น. ถึง 14:00 น.", note: "เรียนรู้ผ่านการเล่นสำหรับ Reception ถึง Year 2 นำโดยครูของ Bangkok Prep ส่วนลดจองล่วงหน้า: ลด 1,000 บาทต่อสัปดาห์ หากจองภายใน 15 ธันวาคม" },
      "bkkprep-winter-young-designer": { programme: "Young Designer: Mini Makers", hours: "9:00 น. ถึง 14:00 น.", note: "ศิลปะ งานฝีมือ และการออกแบบ โดยทีม Creative Giants ได้แก่ ทำสควิชชี่ โคมไฟเทศกาล สีน้ำ แม่เหล็กแจกันจิ๋ว และสมุดโน้ตงานกระดาษ ส่วนลดจองล่วงหน้า: ลด 1,000 บาทต่อสัปดาห์ หากจองภายใน 15 ธันวาคม" },
      "bkkprep-winter-minecraft-robotics": { programme: "Minecraft และหุ่นยนต์", hours: "9:00 น. ถึง 14:00 น.", note: "เขียนโค้ดใน Minecraft และสร้างด้วยหุ่นยนต์ โดยทีม Me-iZone ส่วนลดจองล่วงหน้า: ลด 1,000 บาทต่อสัปดาห์ หากจองภายใน 15 ธันวาคม" },
      "bkkprep-eal-w1": { programme: "แคมป์ภาษาอังกฤษ (EAL)", previousRun: "29 มิถุนายน ถึง 3 กรกฎาคม 2026", hours: "9:00 น. ถึง 15:00 น." },
      "bkkprep-eal-w6": { programme: "แคมป์ภาษาอังกฤษ (EAL)", previousRun: "3 ถึง 7 สิงหาคม 2026", hours: "9:00 น. ถึง 15:00 น." },
      "bkkprep-eal-w7": { programme: "แคมป์ภาษาอังกฤษ (EAL)", previousRun: "10 ถึง 14 สิงหาคม 2026", hours: "9:00 น. ถึง 15:00 น." },
      "bkkprep-thai-w1": { programme: "แคมป์อ่านเขียนภาษาไทย", previousRun: "29 มิถุนายน ถึง 3 กรกฎาคม 2026", hours: "9:00 น. ถึง 15:00 น.", note: "ชมรมภาษาไทยสำหรับผู้เริ่มต้น สำหรับนักเรียนที่ไม่ใช่คนไทย" },
      "bkkprep-thai-w2": { programme: "แคมป์อ่านเขียนภาษาไทย", previousRun: "6 ถึง 10 กรกฎาคม 2026", hours: "9:00 น. ถึง 15:00 น.", note: "แคมป์ภาษาไทยสนุกกับงานฝีมือ ผสมการเรียนภาษากับศิลปะและงานประดิษฐ์" },
      "bkkprep-thai-w7": { programme: "แคมป์อ่านเขียนภาษาไทย", previousRun: "10 ถึง 14 สิงหาคม 2026", hours: "9:00 น. ถึง 15:00 น.", note: "ภาษาไทยและวัฒนธรรมป๊อป สำหรับกลุ่มอายุมากกว่า" },
      "bkkprep-minecraft-w1": { programme: "แคมป์ Minecraft Innovators", previousRun: "29 มิถุนายน ถึง 3 กรกฎาคม 2026", hours: "9:00 น. ถึง 15:00 น.", note: "ไม่จำเป็นต้องมีพื้นฐานเขียนโค้ด" },
      "bkkprep-minecraft-w2": { programme: "แคมป์ Minecraft Innovators", previousRun: "6 ถึง 10 กรกฎาคม 2026", hours: "9:00 น. ถึง 15:00 น." },
      "bkkprep-maths-drama-w1": { programme: "แคมป์คณิตศาสตร์และการแสดง", previousRun: "29 มิถุนายน ถึง 3 กรกฎาคม 2026", hours: "9:00 น. ถึง 15:00 น." },
      "bkkprep-maths-drama-w3": { programme: "แคมป์คณิตศาสตร์และการแสดง", previousRun: "13 ถึง 17 กรกฎาคม 2026", hours: "9:00 น. ถึง 15:00 น." },
      "bkkprep-sports-w1": { programme: "แคมป์กีฬาหลายชนิด", previousRun: "29 มิถุนายน ถึง 3 กรกฎาคม 2026", hours: "9:00 น. ถึง 15:00 น.", note: "ฟุตบอล บาสเกตบอล เทนนิส ว่ายน้ำ ยิมนาสติก และไตรกีฬา" },
      "bkkprep-sports-w2": { programme: "แคมป์กีฬาหลายชนิด", previousRun: "6 ถึง 10 กรกฎาคม 2026", hours: "9:00 น. ถึง 15:00 น." },
      "bkkprep-sports-w3": { programme: "แคมป์กีฬาหลายชนิด", previousRun: "13 ถึง 17 กรกฎาคม 2026", hours: "9:00 น. ถึง 15:00 น." },
      "bkkprep-sports-w6": { programme: "แคมป์กีฬาหลายชนิด", previousRun: "3 ถึง 7 สิงหาคม 2026", hours: "9:00 น. ถึง 15:00 น." },
      "bkkprep-designers-w6": { programme: "แคมป์ Young Designers", previousRun: "3 ถึง 7 สิงหาคม 2026", hours: "9:00 น. ถึง 15:00 น.", note: "สัปดาห์ Mini Maker และ Young Artist จัดโดย Creative Giants" },
      "bkkprep-designers-w7": { programme: "แคมป์ Young Designers", previousRun: "10 ถึง 14 สิงหาคม 2026", hours: "9:00 น. ถึง 15:00 น.", note: "สัปดาห์ Young Architects และ Dream Spaces จัดโดย Creative Giants" },
      "bkkprep-robotics-w6": { programme: "แคมป์ Minecraft และหุ่นยนต์", previousRun: "3 ถึง 7 สิงหาคม 2026", hours: "9:00 น. ถึง 15:00 น." },
      "bkkprep-robotics-w7": { programme: "แคมป์ Minecraft และหุ่นยนต์", previousRun: "10 ถึง 14 สิงหาคม 2026", hours: "9:00 น. ถึง 15:00 น." },
    },
  },
  "little-pea-term-break-camps": {
    area: "Watthana",
    photoAlt: "โปสเตอร์ Winter Camp ของ Little Pea: สัปดาห์ที่ 1 Christmas Eve Dance Camp กับ Ms. Lynn 21 ถึง 24 ธันวาคม 10,000 บาทสำหรับ 4 วัน สัปดาห์ที่ 2 Winter STEAM Camp กับ Teacher Connie 28 ถึง 30 ธันวาคม 7,500 บาทสำหรับ 3 วัน สัปดาห์ที่ 3 New Year Art Studio กับ Pop Up Art Studio 4 ถึง 8 มกราคม 12,000 บาทต่อสัปดาห์ อายุ 4 ถึง 8 ปี 9:00 น. ถึง 14:00 น. รวมอาหารกลางวันและของว่าง จองผ่าน LINE @littlepeabkk",
    photoCaption: "โปสเตอร์ Winter Camp 2026 ของ Little Pea จองผ่าน LINE @littlepeabkk",
    photoCredit: "Little Pea Kids Commons ใช้ภาพโดยได้รับอนุญาต",
    description: "Little Pea Kids Commons จัดแคมป์รายวันในช่วงปิดเทอมของโรงเรียนนานาชาติตลอดปี ที่พื้นที่ของตนใน theCOMMONS บนทองหล่อซอย 17 Winter Camp 2026 แบ่งเป็นสามสัปดาห์แยกกัน แต่ละสัปดาห์มีธีมของตัวเอง ได้แก่ Christmas Eve Dance Camp กับ Ms. Lynn ตั้งแต่ 21 ถึง 24 ธันวาคม ปิดท้ายด้วยการแสดงคืนวันคริสต์มาสอีฟ Winter STEAM Camp กับ Teacher Connie ตั้งแต่ 28 ถึง 30 ธันวาคม มีการทดลองวิทยาศาสตร์ฤดูหนาวและความท้าทายด้านการสร้าง และ New Year Art Studio กับ Pop Up Art Studio Bangkok ตั้งแต่ 4 ถึง 8 มกราคม ลองเทคนิคและวัสดุใหม่ พร้อมของที่ระลึกให้นำกลับบ้านทุกวัน ทั้งสามแคมป์จัด 9:00 น. ถึง 14:00 น.",
    worthKnowing: "แต่ละสัปดาห์จองแยกกัน แคมป์เต้นรำจองได้เฉพาะทั้งสัปดาห์ (10,000 บาทสำหรับสี่วัน) ส่วนแคมป์ STEAM และสตูดิโอศิลปะจองเป็นรายวันได้ในราคา 2,800 บาท รวมอาหารกลางวันและของว่าง จองผ่าน LINE (@littlepeabkk) หรือแบบฟอร์มลงทะเบียนแคมป์ของ Little Pea ทั้งสามสัปดาห์ฤดูหนาวสำหรับอายุ 4 ถึง 8 ปี",
    tagline: "Winter Camp 2026: สามสัปดาห์ตามธีม เต้นรำ STEAM และศิลปะ",
    highlights: [
      "🩰 21 ถึง 24 ธ.ค.: Christmas Eve Dance Camp กับ Ms. Lynn ปิดท้ายด้วยการแสดง",
      "🧪 28 ถึง 30 ธ.ค.: Winter STEAM Camp การทดลองฤดูหนาวและความท้าทายด้านการสร้าง",
      "🎨 4 ถึง 8 ม.ค.: New Year Art Studio กับ Pop Up Art Studio Bangkok",
      "🍱 9:00 น. ถึง 14:00 น. รวมอาหารกลางวันและของว่าง",
      "📅 สัปดาห์ STEAM และศิลปะจองเป็นรายวันได้",
    ],
    sessions: {
      "little-pea-winter-2026-dance": { programme: "Christmas Eve Dance Camp", hours: "9:00 น. ถึง 14:00 น.", minimumBooking: "ทั้งสัปดาห์ (จันทร์ถึงพฤหัสบดี)", note: "นำโดย Ms. Lynn ปิดท้ายด้วยการแสดงคืนคริสต์มาสอีฟ รวมอาหารกลางวันและของว่าง จองผ่าน LINE @littlepeabkk ได้เช่นกัน" },
      "little-pea-winter-2026-steam": { programme: "Winter STEAM Camp", hours: "9:00 น. ถึง 14:00 น.", note: "สามวัน นำโดย Teacher Connie หรือจองรายวัน ฿2,800 ต่อวัน รวมอาหารกลางวันและของว่าง จองผ่าน LINE @littlepeabkk ได้เช่นกัน" },
      "little-pea-winter-2026-art": { programme: "New Year Art Studio", hours: "9:00 น. ถึง 14:00 น.", note: "ร่วมกับ Pop Up Art Studio Bangkok หรือจองรายวัน ฿2,800 ต่อวัน รวมอาหารกลางวันและของว่าง จองผ่าน LINE @littlepeabkk ได้เช่นกัน" },
    },
  },
  "regents-english-camps": {
    area: "Huai Khwang",
    description: "Regent's จัดแคมป์ภาษาอังกฤษที่วิทยาเขตประจำ (Boarding Campus) บนถนนประชาอุทิศ สำหรับเด็กอายุ 3 ถึง 12 ปี และเปิดรับนักเรียนที่ไม่ใช่ของ Regent's ครูเจ้าของภาษาอังกฤษสอนพร้อมผู้ช่วยครู ช่วงเช้าครอบคลุมการฟัง พูด อ่าน เขียน ไวยากรณ์ และการแสดงบทบาทสมมติ รวมวิทยาศาสตร์ คณิตศาสตร์ และทักษะการคิดที่สอนเป็นภาษาอังกฤษ ช่วงบ่ายเป็นกิจกรรม มีว่ายน้ำ ทำอาหาร ศิลปะและงานประดิษฐ์ และสไลเดอร์น้ำ เด็กแบ่งกลุ่ม 3 ถึง 5, 6 ถึง 8 และ 9 ถึง 12 ปี",
    worthKnowing: "Regent's อยู่ในระดับราคาสูง ราคาปกติที่ระบุ 28,350 บาทต่อสัปดาห์ ประมาณสองเท่าครึ่งของ Bangkok Prep และเกือบสามเท่าของ Carroll Prep และโฆษณาพร้อมส่วนลดก้อนใหญ่เสมอ โปรโมชันเปลี่ยนจาก 50 เปอร์เซ็นต์เป็น 40 เปอร์เซ็นต์ภายในวันเดียวในเดือนกันยายน 2026 ควรมองราคาปกติเป็นราคาตั้งต้น ไม่ใช่ราคาที่ใครจ่ายจริง นอกจากนี้ Winter Camp จัดในช่วงเปิดภาคเรียนและนโยบายคืนเงินครอบคลุมกรณีถูกปฏิเสธวีซ่า ซึ่งบอกว่าเน้นนักเรียนที่เดินทางมากรุงเทพฯ ไม่ใช่ครอบครัวในท้องถิ่น",
    sessions: {
      "regents-winter-2027": { programme: "Regent's English Winter Camp", minimumBooking: "1 สัปดาห์", note: "จัดในช่วงเปิดภาคเรียนและเน้นนักเรียนที่เดินทางมากรุงเทพฯ สำหรับครอบครัวในท้องถิ่น สัปดาห์เดียวที่ใช้ได้คือ 15 ถึง 19 กุมภาพันธ์ ซึ่งตรงกับปิดเทอมกลางภาคของ St Andrews ขนาดชั้นเรียนสูงสุด 25 คน ไม่เผยแพร่ราคา ลด 20 เปอร์เซ็นต์หากชำระภายใน 30 กันยายน 2026 และลดเพิ่มอีก 10 เปอร์เซ็นต์สำหรับกลุ่มสามคนขึ้นไป" },
    },
  },
  "ivy-camps-usa": {
    area: "Watthana",
    description: "Ivy Camps เป็นผู้ดำเนินการสัญชาติอเมริกันที่จัดแคมป์แบบโครงงานหนึ่งสัปดาห์ภายในโรงเรียนเจ้าภาพในกรุงเทพฯ สอนโดยผู้สอนที่คัดจากมหาวิทยาลัยชั้นนำของสหรัฐฯ หัวข้อหมุนเวียนระหว่างธุรกิจและการเป็นผู้ประกอบการ วิทยาศาสตร์และนวัตกรรม วิศวกรรมและการออกแบบ การพูดในที่สาธารณะ และภาวะผู้นำ จัดทั้งที่ Bangkok Prep และ Ruamrudee ในฤดูร้อนปี 2026",
    worthKnowing: "Ivy Camps ใช้แพลตฟอร์มลงทะเบียนของตนเอง ไม่ใช่ของโรงเรียนเจ้าภาพ และกำหนดเวลาจองล่วงหน้าราคาพิเศษเร็วกว่าของโรงเรียน ที่ Bangkok Prep ในปี 2026 Ivy ถูกยกเว้นจากส่วนลดจองล่วงหน้าของโรงเรียนอย่างชัดเจน จึงควรตรวจสอบว่าใช้โปรโมชันแบบใดก่อนสันนิษฐานราคา และเป็นตัวเลือกที่แพงที่สุดในกลุ่มที่ไม่ใช่เฉพาะทางที่เราพบในโรงเรียนเจ้าภาพ",
    sessions: {
      "ivy-bkkprep-summer": { programme: "Ivy Camps ที่ Bangkok Prep", previousRun: "6 ถึง 31 กรกฎาคม 2026 รายสัปดาห์", hours: "9:00 น. ถึง 15:00 น.", note: "ราคาจองล่วงหน้า 13,950 ราคามาตรฐาน 15,050 กำหนดจองล่วงหน้าแยกต่างหากคือ 1 พฤษภาคม" },
      "ivy-ris-summer-a": { programme: "Ivy Camps ที่ Ruamrudee", previousRun: "6 ถึง 24 กรกฎาคม 2026 รายสัปดาห์", hours: "9:00 น. ถึง 15:00 น.", note: "ช่วงอายุกว้างที่สุดที่ Ivy จัดในกรุงเทพฯ ถึง 17 ปี ไม่เผยแพร่ราคาของสถานที่นี้" },
      "ivy-ris-summer-b": { programme: "Ivy Camps ที่ Ruamrudee", previousRun: "27 กรกฎาคม ถึง 7 สิงหาคม 2026 รายสัปดาห์", hours: "9:00 น. ถึง 15:00 น.", note: "เต็มหมดในปี 2026 ควรรู้ไว้หากวางแผนสำหรับปี 2027" },
    },
  },
  "grow-learning-gardens": {
    area: "Bang Kachao",
    description: "Grow จัดแคมป์ธรรมชาติแบบ Forest School ที่บางกะเจ้า วงเขียวกลางแม่น้ำทางใต้ของเมือง ตั้งใจปลอดหน้าจอ สร้างรอบการสำรวจกลางแจ้ง การเล่น และการค้นพบ ไม่ใช่ตารางบทเรียน นำโดยนักการศึกษากลางแจ้ง ค่าใช้จ่ายรวมของว่าง อาหารกลางวัน และภาพถ่ายแคมป์",
    worthKnowing: "บางกะเจ้าเป็นการเดินทางจริงจากกรุงเทพฯ ส่วนใหญ่ แม้ในทางเทคนิคจะอยู่ใกล้ เพราะต้องข้ามแม่น้ำ ควรตรวจสอบเวลาเดินทางจากฝั่งของเมืองที่คุณอยู่ก่อนจองทั้งสัปดาห์ แคมป์จัด 9:00 น. ถึง 16:00 น. ช้ากว่าแคมป์ของโรงเรียนส่วนใหญ่หนึ่งชั่วโมง",
    sessions: {
      "grow-winter-dec-2026": { programme: "Grow Nature Camp", hours: "9:00 น. ถึง 16:00 น.", note: "แคมป์ห้าวัน รับส่งที่วัดคลองเตยนอก โปสเตอร์ฤดูหนาวไม่ระบุอายุหรือราคา แคมป์ฤดูร้อน 2026 สำหรับอายุ 5 ถึง 12 ปี ราคา 12,750 ถึง 15,000 บาทต่อสัปดาห์ ลงทะเบียนผ่าน Grow (growbangkok@gmail.com)" },
      "grow-winter-jan-2027": { programme: "Grow Nature Camp", hours: "9:00 น. ถึง 16:00 น.", note: "แคมป์ห้าวัน รับส่งที่วัดคลองเตยนอก โปสเตอร์ฤดูหนาวไม่ระบุอายุหรือราคา แคมป์ฤดูร้อน 2026 สำหรับอายุ 5 ถึง 12 ปี ราคา 12,750 ถึง 15,000 บาทต่อสัปดาห์ ลงทะเบียนผ่าน Grow (growbangkok@gmail.com)" },
      "grow-summer": { programme: "Grow Nature Camp", previousRun: "29 มิถุนายน ถึง 21 สิงหาคม 2026 แคมป์ละห้าวัน", hours: "9:00 น. ถึง 16:00 น." },
    },
  },
  "ap-race": {
    area: "Watthana",
    description: "แคมป์ว่ายน้ำเข้มข้นที่พัฒนาโดย Adam Peaty แชมป์โอลิมปิกสามสมัย และทีมโค้ช AP Race จัดที่ Bangkok Prep มีการฝึกในสระสิบรอบตลอดสัปดาห์ พร้อมการเตรียมตัวก่อนลงสระรายวัน การฝึกความแข็งแรงและสมรรถภาพ การป้องกันการบาดเจ็บ และคำแนะนำด้านกายภาพบำบัด รวมถึงเวิร์กช็อปเรื่องกลยุทธ์การแข่งขัน จิตวิทยาการแสดงผลงาน และไลฟ์สไตล์นักกีฬา",
    worthKnowing: "แคมป์นี้สำหรับนักว่ายน้ำแข่งขัน ไม่ใช่เด็กที่กำลังเรียนว่ายน้ำ แคมป์ไม่ระบุช่วงอายุเลย ระบุเฉพาะระดับมาตรฐาน ซึ่งบอกวิธีคัดเลือก ที่ 25,000 บาทต่อสัปดาห์ เป็นแคมป์ที่แพงที่สุดที่เราพบในกรุงเทพฯ ห่างจากรายอื่นอย่างมาก และประมาณสองเท่าของสัปดาห์กีฬาหลายชนิดทั่วไปของโรงเรียน แม้จะวางภาพลักษณ์ระดับยอดนักกีฬา แต่ไม่ค้างคืน รวมอาหารกลางวันและของว่าง",
    sessions: {
      "aprace-w1": { programme: "แคมป์ว่ายน้ำ AP Race", previousRun: "3 ถึง 7 สิงหาคม 2026", note: "สำหรับนักว่ายน้ำแข่งขัน ไม่เผยแพร่ขีดจำกัดอายุ อายุที่แสดงจึงเป็นการประมาณของเราว่าเหมาะกับใคร ควรยืนยันกับผู้จัด 45,000 สำหรับทั้งสองสัปดาห์รวมกัน" },
      "aprace-w2": { programme: "แคมป์ว่ายน้ำ AP Race", previousRun: "10 ถึง 14 สิงหาคม 2026", note: "สำหรับนักว่ายน้ำแข่งขัน อายุที่แสดงเป็นการประมาณของเรา ควรยืนยันกับผู้จัด" },
    },
  },
  "british-club-bangkok": {
    area: "Silom",
    description: "British Club จัดแคมป์กีฬาที่มีผู้ดูแลในช่วงปิดเทอม แบ่งเป็น Mini Sports สำหรับเด็กสี่ถึงเจ็ดขวบ และ Sports Camp สำหรับเด็กเจ็ดถึงสิบสามขวบ กิจกรรมส่วนใหญ่จัดที่สโมสร รวมเทนนิส สควอช ฟุตบอล บาสเกตบอล ว่ายน้ำ และทำอาหาร บางครั้งมีกิจกรรมนอกสถานที่ เช่น เล่นสเก็ตน้ำแข็งหรือโบว์ลิ่งที่เซ็นทรัลเวิลด์หรือพารากอน รับเด็กได้สูงสุด 55 คน โดยมีสมาชิกและเจ้าหน้าที่ช่วยดูแล",
    worthKnowing: "แคมป์จัดสำหรับสมาชิกสโมสร จึงควรตรวจสอบเงื่อนไขการเป็นสมาชิกก่อนวางแผน ทำเลสีลมใจกลางเมืองเหมาะกับครอบครัวที่ทำงานในตัวเมือง และเป็นหนึ่งในไม่กี่ตัวเลือกที่ไม่ได้อยู่ไกลบนสุขุมวิทหรือเลยไปกว่านั้น",
    sessions: {
      "britishclub-mini": { programme: "แคมป์ Mini Sports", previousRun: "ช่วงปิดเทอม จัดเกือบทุกช่วงปิด", note: "ไม่เผยแพร่วันที่และราคาต่อสาธารณะ น่าจะสำหรับสมาชิกเท่านั้น" },
      "britishclub-sports": { programme: "แคมป์กีฬา", previousRun: "ช่วงปิดเทอม จัดเกือบทุกช่วงปิด", note: "เทนนิส สควอช ฟุตบอล บาสเกตบอล ว่ายน้ำ และทำอาหาร พร้อมกิจกรรมนอกสถานที่เป็นครั้งคราว ไม่เผยแพร่วันที่และราคาต่อสาธารณะ" },
    },
  },
  "icamp-thailand": {
    area: "Kanchanaburi",
    description: "iCamp เป็นแคมป์ภาษาอังกฤษแบบค้างคืนในกาญจนบุรี ห่างจากกรุงเทพฯ ประมาณ 160 กิโลเมตร ในหุบเขาแม่น้ำแคว เปิดมาแล้วสิบปี ช่วงเช้าเป็นภารกิจและโครงงานภาษาอังกฤษในระดับ Cambridge A1 ถึง B2 ช่วงบ่ายเป็นว่ายน้ำ เกมน้ำ กีฬา ผจญภัย และความท้าทายแบบทีม พร้อมโปรแกรมช่วงเย็นหลังอาหารค่ำ ที่พักเป็นกระท่อมไม้ไผ่แปดหลังสำหรับเด็กชายและแปดหลังสำหรับเด็กหญิง หลังละสิบสองคนพร้อมเจ้าหน้าที่สองคน ติดแอร์ทุกหลัง จัดเรียงเป็นวงกลมรอบโรงอาหาร สัดส่วนเจ้าหน้าที่ประมาณหนึ่งต่อสิบ ขึ้นอยู่กับอายุ ครัวเตรียมอาหารตะวันตก เอเชีย ฮาลาล และมังสวิรัติ พร้อมตัวเลือกวีแกน ปลอดกลูเตน และปลอดนมในทุกมื้อ",
    worthKnowing: "iCamp มีนโยบายห้ามใช้หน้าจออย่างเข้มงวด โทรศัพท์จะถูกเก็บตอนเช็กอินและคืนในวันเดินทางกลับ ผู้ปกครองโทรหาลูกโดยตรงไม่ได้ แต่สำนักงานจะส่งต่อข้อความและโพสต์ภาพถ่ายรายวันลงเฟซบุ๊ก การเยี่ยมต้องแจ้งล่วงหน้าสองวัน สำหรับหลายครอบครัวนี่คือจุดเด่น แต่ควรรู้ก่อนจองหากลูกไม่เคยจากบ้าน จองรายสัปดาห์และขยายเวลาได้เมื่อไปถึงแล้ว แคมป์อยู่ห่างจากกรุงเทพฯ ขับรถสองถึงสามชั่วโมง จึงเป็นการเดินทางค้างคืนจริง ไม่ใช่แคมป์รายวัน มีพยาบาลประจำตลอดช่วงแคมป์ และโรงพยาบาลสินแพทย์และด่านมะขามเตี้ยในกาญจนบุรีเป็นพันธมิตรกรณีฉุกเฉิน iCamp ไม่เผยแพร่ราคาในหน้าสาธารณะ ต้องอีเมลสอบถามตัวเลข",
    sessions: {
      "icamp-summer-2027": { programme: "iCamp Summer Camp", previousRun: "ฤดูร้อน 2026 ซึ่งเป็นฤดูครบรอบสิบปี", minimumBooking: "1 สัปดาห์ ขยายเวลาได้เมื่อไปถึงแล้ว", venue: "iCamp Thailand, กาญจนบุรี", supervisionRatio: "ประมาณ 1 ต่อ 10 ขึ้นอยู่กับอายุ", note: "จำกัดจำนวนที่นั่งต่อสัปดาห์เพื่อรักษาสัดส่วนเจ้าหน้าที่ ในปี 2026 มีข้อเสนอครบรอบ ซื้อหนึ่งพาเพื่อนมาฟรีหนึ่งคน" },
      "icamp-songkran-2027": { programme: "iCamp Songkran Camp", previousRun: "22 ถึง 28 มีนาคม 29 มีนาคม ถึง 4 เมษายน และ 5 ถึง 11 เมษายน 2026", minimumBooking: "1 สัปดาห์", venue: "iCamp Thailand, กาญจนบุรี", supervisionRatio: "ประมาณ 1 ต่อ 10 ขึ้นอยู่กับอายุ", note: "รอบเจ็ดวัน รวมการเฉลิมฉลองสาดน้ำที่มีผู้ดูแลในช่วงสงกรานต์" },
    },
  },
  "storytime-preschool-winter-camp": {
    area: "Khlong Toei",
    photoAlt: "ใบปลิว Winter Camp ของ Storytime Preschool: 21 ถึง 25 ธันวาคม 2026 สำหรับอายุ 2 ถึง 7 ปี ครึ่งวัน 9:00 น. ถึงเที่ยง เต็มวัน 9:00 น. ถึง 14:00 น. วันขยาย 9:00 น. ถึง 16:00 น. ราคาจองล่วงหน้า 1,080, 1,350 และ 1,620 บาท (ราคาเต็ม 1,200, 1,500 และ 1,800 บาท) ส่วนลดจองล่วงหน้า 10 เปอร์เซ็นต์จนถึง 27 พฤศจิกายน รถโรงเรียน 400 บาทต่อวัน รถรับส่งฟรีไป BTS นานา พร้อมภาพตุ๊กตาหิมะ เด็กในเสื้อผ้าฤดูหนาว และคิวอาร์โค้ด LINE และ WhatsApp สำหรับจอง",
    photoCaption: "ใบปลิว Winter Camp ธันวาคม 2026 ของ Storytime เผยแพร่เดือนตุลาคม 2026 สแกนคิวอาร์โค้ดเพื่อจองผ่าน LINE หรือ WhatsApp",
    photoCredit: "Storytime Preschool ใช้ภาพโดยได้รับอนุญาต",
    description: "Storytime เป็นโรงเรียนอนุบาลสอนภาษาอังกฤษใกล้สุขุมวิทซอย 4 ที่จัดเพลย์กรุ๊ปสำหรับทารกและเด็กเล็กด้วย ตั้งแต่ 21 ถึง 25 ธันวาคม โรงเรียนจัด Winter Camp ห้าวันสำหรับเด็กอายุ 2 ถึง 7 ปี เปิดรับทุกคน ไม่เฉพาะนักเรียน Storytime มีกิจกรรมคริสต์มาสสนุกๆ ช่วงเรียนรู้เกี่ยวกับเทศกาล และของขวัญจากซานตาคลอส เด็กแบ่งกลุ่มตามอายุเพื่อให้ได้รับความใส่ใจเป็นรายคน และเป็นวิธีที่ดีในการหาเพื่อนและสร้างทักษะภาษาอังกฤษ",
    worthKnowing: "จองเป็นรายวันหรือทั้งสัปดาห์ แบบครึ่งวัน เต็มวัน หรือวันขยาย จองภายใน 27 พฤศจิกายนลด 10 เปอร์เซ็นต์ มีรถรับส่งฟรีไปกลับ BTS นานา ซึ่งช่วยได้เพราะที่จอดรถของโรงเรียนมีจำกัดมาก และมีรถโรงเรียนจากบางย่านในราคา 400 บาทต่อวัน แคมป์เปิดในวันคริสต์มาส",
    tagline: "สนุกกับคริสต์มาสห้าวันสำหรับอายุ 2 ถึง 7 ปี 21 ถึง 25 ธันวาคม",
    highlights: [
      "🎄 งานประดิษฐ์คริสต์มาสและกิจกรรมเทศกาล",
      "🎅 ของขวัญจากซานตาคลอส",
      "🗣️ ฝึกภาษาอังกฤษผ่านการเล่น",
      "👫 กลุ่มเล็กแบ่งตามอายุ",
      "🚐 รถรับส่งฟรีจาก BTS นานา",
      "📅 จองรายวันหรือทั้งสัปดาห์ได้",
      "🏷️ ส่วนลดจองล่วงหน้า 10 เปอร์เซ็นต์จนถึง 27 พฤศจิกายน",
    ],
    sessions: {
      "storytime-winter-2026-half": { programme: "Winter Camp ครึ่งวัน", hours: "9:00 น. ถึง 12:00 น.", minimumBooking: "1 วัน", note: "1,080 บาทต่อวัน พร้อมส่วนลดจองล่วงหน้า 10 เปอร์เซ็นต์จนถึง 27 พฤศจิกายน มีรถรับส่งฟรีจาก BTS นานา รถโรงเรียนจากบางย่าน 400 บาทต่อวัน" },
      "storytime-winter-2026-day": { programme: "Winter Camp เต็มวันหรือวันขยาย", hours: "9:00 น. ถึง 14:00 น. หรือวันขยายถึง 16:00 น.", minimumBooking: "1 วัน", note: "1,500 บาทถึง 14:00 น. 1,800 บาทถึง 16:00 น. ราคาจองล่วงหน้าจนถึง 27 พฤศจิกายน: 1,350 และ 1,620 บาท มีรถรับส่งฟรีจาก BTS นานา รถโรงเรียนจากบางย่าน 400 บาทต่อวัน" },
    },
  },
  "bricks-4-kidz": {
    area: "Several branches",
    photoAlt: "โลโก้ Bricks 4 Kidz: ชื่อสีขาวบนบล็อกสไตล์เลโก้สีแดง เขียว และน้ำเงิน พร้อมข้อความ we learn, we build, we play with LEGO Bricks",
    photoCaption: "Bricks 4 Kidz จัดแคมป์เดือนธันวาคมที่ทั้งสี่สาขาในกรุงเทพฯ",
    photoCredit: "Bricks 4 Kidz Thailand ใช้ภาพโดยได้รับอนุญาต",
    description: "Bricks 4 Kidz จัดคลาสสร้างและหุ่นยนต์จากเลโก้ที่สี่สาขาในห้างสรรพสินค้า และในช่วงปิดเทอมเดือนธันวาคมจัดแคมป์หนึ่งสัปดาห์ที่ทั้งสี่สาขา มีสี่แคมป์ตามอายุ ได้แก่ Junior Inventor สำหรับเด็กสี่ขวบ Advance Inventor สำหรับห้าถึงเจ็ดขวบ Junior Robotics สำหรับเจ็ดถึงเก้าขวบ ที่เด็กสร้างและเขียนโปรแกรมหุ่นยนต์เลโก้พร้อมมอเตอร์และเซนเซอร์ และ Advance Robotics สำหรับเก้าถึงสิบสองขวบ ใช้ LEGO Mindstorms EV3 แต่ละแคมป์จัดจันทร์ถึงศุกร์ แบบครึ่งวันหรือเต็มวันพร้อมอาหารกลางวัน",
    worthKnowing: "สัปดาห์แรก 7 ถึง 11 ธันวาคม อยู่ก่อนโรงเรียนนานาชาติส่วนใหญ่ปิดเทอม จึงเหมาะกับครอบครัวที่โรงเรียนปิดภาคเรียนเร็ว สัปดาห์สุดท้ายจัดถึง 25 ธันวาคม ซึ่งเป็นวันคริสต์มาส จึงควรตรวจสอบวันนั้นกับสาขา แต่ละสาขารับจองแคมป์ของตนเอง ทางโทรศัพท์หรือ LINE ดูได้ใต้หัวข้อการติดต่อ",
    tagline: "แคมป์สร้างเลโก้และหุ่นยนต์สำหรับอายุ 4 ถึง 12 ปี ที่สี่สาขาในกรุงเทพฯ",
    highlights: [
      "🧱 สร้างเลโก้ทุกวัน",
      "🤖 หุ่นยนต์พร้อมมอเตอร์และเซนเซอร์",
      "💻 เขียนโค้ดสำหรับอายุ 7 ปีขึ้นไป",
      "🔤 สร้างตามธีมรายวันสำหรับเด็กสี่ขวบ",
      "🕥 ครึ่งวัน หรือเต็มวันพร้อมอาหารกลางวัน",
      "📍 สี่สาขาทั่วกรุงเทพฯ",
    ],
    branchLocations: { "K Village": "สุขุมวิท 26 ชั้น 2", "Central Ladprao": "ชั้น 10", "The Crystal Ratchaphruek": "ชั้น 3", "Mega Bangna": "ชั้น 2 ใกล้ HomePro" },
    sessions: b4kSessionsTh(),
  },
};

export function campTh(slug: string): CampTh | undefined {
  return CAMPS_TH[slug];
}
