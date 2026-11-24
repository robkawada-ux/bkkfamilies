// Thai text for the learning-support directory (/th/learning-support).
//
// Structured facts (names, phone numbers, emails, URLs, tags, categories,
// checked dates) stay in src/lib/learningSupport.ts and are never copied
// here. This file only holds the words a parent reads: descriptions, notes,
// the services list, the ages line, and display labels for the controlled
// vocabularies. A provider with no entry in PROVIDERS_TH is not shown on the
// Thai site at all, so a Thai page can never be half English.
//
// See src/lib/th/common.ts for the style rules.
import type { Delivery, ProviderCategory, Tag } from "@/lib/learningSupport";
import { PROVIDERS_TH_PART1 } from "./learningSupport/part1";
import { PROVIDERS_TH_PART2 } from "./learningSupport/part2";
import { PROVIDERS_TH_PART3 } from "./learningSupport/part3";
import { PROVIDERS_TH_PART4 } from "./learningSupport/part4";

export interface ProviderTh {
  /** Thai reading of the English `ages` line. */
  ages?: string;
  /**
   * Only for addresses that are descriptive prose ("a short walk from BTS ...").
   * Street addresses stay in English so a taxi driver or map app can use them,
   * so leave this out for those.
   */
  address?: string;
  /** Same order and length as the English `services` array. */
  services: string[];
  /** Paragraphs separated by a blank line, like the English. */
  description: string;
  note?: string;
}

export const CATEGORY_TH: Record<ProviderCategory, string> = {
  "Assessment & diagnosis": "การประเมินและวินิจฉัย",
  "Therapy clinic": "คลินิกบำบัด",
  "ABA & behaviour support": "ABA และการสนับสนุนด้านพฤติกรรม",
  "Specialist school": "โรงเรียนเฉพาะทาง",
  "School learning support": "การสนับสนุนการเรียนรู้ในโรงเรียน",
  "Tutoring & mentoring": "การสอนพิเศษและการให้คำปรึกษา",
  "Vocational & transition": "อาชีวะและการเปลี่ยนผ่าน",
  "Parent support": "การสนับสนุนผู้ปกครอง",
  "Hospital clinic": "คลินิกโรงพยาบาล",
  "Government service": "หน่วยงานรัฐ",
  "Enrichment & general learning": "กิจกรรมเสริมและการเรียนรู้ทั่วไป",
  "Special Needs Support and Consultancy": "การสนับสนุนและให้คำปรึกษาด้านความต้องการพิเศษ",
};

export const TAG_TH: Record<Tag, string> = {
  "ADHD & attention": "ADHD และสมาธิ",
  "Anxiety & mood": "ความวิตกกังวลและอารมณ์",
  "Assessment & diagnosis": "การประเมินและวินิจฉัย",
  Autism: "ออทิสติก",
  Behaviour: "พฤติกรรม",
  "Developmental delay": "พัฒนาการล่าช้า",
  "Dyslexia & literacy": "ดิสเล็กเซียและการอ่านเขียน",
  "Early intervention": "การแทรกแซงระยะต้น",
  "Exam access arrangements": "การปรับสิ่งอำนวยความสะดวกในการสอบ",
  "Executive function": "ทักษะการบริหารจัดการ",
  Hearing: "การได้ยิน",
  "In-school support": "การสนับสนุนในโรงเรียน",
  "Intellectual disability": "ความบกพร่องทางสติปัญญา",
  "Life skills & independence": "ทักษะชีวิตและความเป็นอิสระ",
  "Occupational therapy": "กิจกรรมบำบัด",
  "Parent support & training": "การสนับสนุนและฝึกผู้ปกครอง",
  "Play, art & music therapy": "การบำบัดด้วยการเล่น ศิลปะ และดนตรี",
  "Sensory processing": "การประมวลผลทางประสาทสัมผัส",
  "Social skills": "ทักษะทางสังคม",
  "Speech & language": "การพูดและภาษา",
  "Visual impairment": "ความบกพร่องทางการมองเห็น",
  "Vocational & employment": "อาชีวะและการจ้างงาน",
};

export const DELIVERY_TH: Record<Delivery, string> = {
  "At a centre": "ที่ศูนย์",
  "In school": "ในโรงเรียน",
  "At home": "ที่บ้าน",
  Online: "ออนไลน์",
};

export const LANGUAGE_TH: Record<string, string> = {
  English: "อังกฤษ",
  Thai: "ไทย",
  Mandarin: "จีนกลาง",
  Cantonese: "กวางตุ้ง",
  Japanese: "ญี่ปุ่น",
};

/**
 * Display labels for the English `area` strings. Where I am not certain of
 * the accepted Thai form of a district, the English stays on its own.
 */
export const AREA_TH: Record<string, string> = {
  Online: "ออนไลน์",
  Bangkok: "กรุงเทพฯ",
  "Bangkok and across Thailand": "กรุงเทพฯ และทั่วประเทศไทย",
  "Khlong Toei": "คลองเตย",
  "Khlong Toei (Phra Khanong)": "คลองเตย (พระโขนง)",
  Watthana: "วัฒนา",
  "Watthana (Thong Lo)": "วัฒนา (ทองหล่อ)",
  "Watthana (Ekkamai)": "วัฒนา (เอกมัย)",
  "Watthana and Suan Luang": "วัฒนาและสวนหลวง",
  "Sathorn and Watthana": "สาทรและวัฒนา",
  Nonthaburi: "นนทบุรี",
  "Nonthaburi (Pak Kret)": "นนทบุรี (ปากเกร็ด)",
  "Bang Na": "บางนา",
  "Bang Kho Laem": "บางคอแหลม",
  "Phra Khanong (Bang Chak)": "พระโขนง (บางจาก)",
  "Huai Khwang": "ห้วยขวาง",
  "Huai Khwang (Mengjai)": "ห้วยขวาง (เม็งใจ)",
  "Taling Chan": "ตลิ่งชัน",
  "Phaya Thai": "พญาไท",
  "Min Buri": "มีนบุรี",
  "Bang Khae": "บางแค",
  "Din Daeng": "ดินแดง",
};

export const areaTh = (a: string): string => AREA_TH[a] ?? a;
export const languageTh = (l: string): string => LANGUAGE_TH[l] ?? l;

const MONTH_NAMES: Record<string, string> = {
  January: "มกราคม",
  February: "กุมภาพันธ์",
  March: "มีนาคม",
  April: "เมษายน",
  May: "พฤษภาคม",
  June: "มิถุนายน",
  July: "กรกฎาคม",
  August: "สิงหาคม",
  September: "กันยายน",
  October: "ตุลาคม",
  November: "พฤศจิกายน",
  December: "ธันวาคม",
};

/** "September 2026" -> "กันยายน 2026". Falls back to the English text. */
export function checkedTh(checked: string): string {
  const [month, year] = checked.split(" ");
  const m = MONTH_NAMES[month];
  return m && year ? `${m} ${year}` : checked;
}

/** A meta description of about 110 characters, cut at a word gap. */
export function metaDescriptionTh(text: string): string {
  const first = text.split("\n\n")[0] ?? "";
  if (first.length <= 110) return first;
  const cut = first.slice(0, 110);
  const stop = cut.lastIndexOf(" ");
  return (stop > 50 ? cut.slice(0, stop) : cut) + "…";
}

export const PROVIDERS_TH: Record<string, ProviderTh> = {
  ...PROVIDERS_TH_PART1,
  ...PROVIDERS_TH_PART2,
  ...PROVIDERS_TH_PART3,
  ...PROVIDERS_TH_PART4,
};
