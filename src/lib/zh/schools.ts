// Simplified Chinese (/zh) data layer for the schools directory.
//
// The English record in src/lib/schools.ts stays the single source of truth for
// names, curricula, areas, founding year, websites, addresses and every fee and
// date. This file holds only translated free text plus the label maps the
// Chinese pages need. A school with no description entry is left off /zh, so no
// page mixes the two languages.

import type { Area, Budget } from "@/lib/schools";
import type { SchoolZh } from "./schoolsTypes";
import { SCHOOLS_ZH_PART1 } from "./schools/part1";
import { SCHOOLS_ZH_PART2 } from "./schools/part2";
import { SCHOOLS_ZH_PART3 } from "./schools/part3";
import { SCHOOLS_ZH_PART4 } from "./schools/part4";
import { SCHOOLS_ZH_PART5 } from "./schools/part5";
import { SCHOOLS_ZH_PART6 } from "./schools/part6";

export const SCHOOLS_ZH: Record<string, SchoolZh> = {
  ...SCHOOLS_ZH_PART1,
  ...SCHOOLS_ZH_PART2,
  ...SCHOOLS_ZH_PART3,
  ...SCHOOLS_ZH_PART4,
  ...SCHOOLS_ZH_PART5,
  ...SCHOOLS_ZH_PART6,
};

/** The nine directory locations. Same ids and order as AREAS in schools.ts. */
export const AREA_ZH: Record<Area, { label: string; covers: string }> = {
  sukhumvit: { label: "素坤逸", covers: "Nana、Asok、Phrom Phong、通罗 (Thonglor) 和 Ekkamai" },
  onnut: { label: "Phra Khanong、On Nut 和 Prawet", covers: "素坤逸50至103巷、On Nut、Bang Chak、Pattanakarn 和 Suan Luang" },
  bangna: { label: "邦那 (Bang Na) 和北榄府", covers: "Bang Na、Bearing、Bangna-Trad、Bang Phli 以及素万那普机场周边" },
  central: { label: "市中心、沙吞 (Sathorn) 和 Rama 3", covers: "是隆 (Silom)、沙吞、Ploenchit、Phaya Thai、Dusit 和 Rama 3" },
  rama9: { label: "Rama 9 和 Lat Phrao", covers: "Rama 9、Ratchada、Huai Khwang、Wang Thonglang 和 Lat Phrao" },
  east: { label: "Bang Kapi、Minburi 和东部", covers: "Ramkhamhaeng、Bang Kapi、Saphan Sung、Krungthep Kreetha、Minburi 和 Lat Krabang" },
  north: { label: "曼谷北部和巴吞他尼", covers: "Chatuchak、Vibhavadi、廊曼 (Don Mueang)、Ramintra、Rangsit 和巴吞他尼" },
  nonthaburi: { label: "暖武里 (Nonthaburi)", covers: "Nichada Thani、Pak Kret、Chaeng Watthana、Tiwanon 和 Ratchaphruek" },
  thonburi: { label: "河畔和吞武里", covers: "Charoen Krung 河畔、吞武里 (Thonburi)、Rama 2 和曼谷西部" },
};

/** Curriculum tags, keyed by the exact English tag (filters still match on English). */
export const CURRICULUM_ZH: Record<string, string> = {
  Adventist: "基督复临安息日会",
  American: "美式",
  Australian: "澳大利亚",
  "Blended Learning": "混合式学习",
  British: "英式",
  Buddhist: "佛教",
  Canadian: "加拿大",
  Catholic: "天主教",
  Chinese: "中文",
  Christian: "基督教",
  "English Program": "英语课程 (EP)",
  French: "法式",
  German: "德式",
  Indian: "印度",
  International: "国际",
  "International Baccalaureate": "国际文凭 (IB)",
  Japanese: "日本",
  Montessori: "蒙特梭利",
  Singaporean: "新加坡",
  "Special Educational Needs": "特殊教育需求",
  Swiss: "瑞士",
  Thai: "泰国",
};

export const curriculumZh = (c: string): string => CURRICULUM_ZH[c] ?? c;

export const BUDGET_ZH: Record<Budget, string> = {
  under400k: "每年40万泰铢以下",
  over400k: "每年40万泰铢以上",
  unknown: "学费未公布，请向学校确认",
};

export const BUDGET_FILTER_ZH: Record<Budget, string> = {
  under400k: "每年40万泰铢或以下",
  over400k: "每年40万泰铢或以上",
  unknown: "学费未公布",
};
