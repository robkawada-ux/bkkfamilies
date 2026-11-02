// Shared building blocks for the Simplified Chinese (/zh) pages.
//
// GLOSSARY. Use these terms everywhere so the four directories read as one
// site. Change a term here and in this comment, nowhere else.
//
//   Playgroup ............ 亲子游戏小组      Camp (holiday camp) ... 假期营
//   Activity ............. 亲子活动          Learning support ...... 学习支持
//   International school . 国际学校          Preschool or nursery .. 幼儿园或托儿所
//   Parents' group ....... 家长社群          Community or library .. 社区或图书馆
//   Play centre or cafe .. 游乐中心或亲子咖啡馆
//   Drop-in playgroup .... 自由参加的游戏小组  Class or course ....... 课程
//   Storytime ............ 故事时间          Weekdays .............. 工作日
//   Confirmed ............ 已确认            Check before going .... 出行前请先核实
//   Worth knowing ........ 家长须知          Booking required ...... 需要预约
//   Free ................. 免费              Price not published ... 价格未公布
//   Age range not published 年龄范围未公布    Days and times on request 日期和时间请咨询
//
// PUNCTUATION. Full-width Chinese punctuation (，。：；？！) in prose. Never use
// em or en dashes: ranges use 至 ("6个月至2岁"), asides use commas, like the
// English site, which writes "to" and never a dash.
//
// NAMES. Keep every business, school, venue and street name exactly as the
// English data has it. Do not invent Chinese brand names. Keep addresses in
// English so a taxi driver or a map app can use them. Place names a Chinese
// reader will know well may carry the Chinese form first, with the English in
// brackets on first mention: 素坤逸 (Sukhumvit), 沙吞 (Sathorn), 是隆 (Silom),
// 通罗 (Thonglor). When unsure of the accepted Chinese form, keep the English.
//
// FACTS. Translate, never improve. Prices, dates, ages, phone numbers, URLs,
// LINE ids and "lastVerified" stay as the English data has them. If the
// English hedges ("check before you go"), the Chinese hedges too.

export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export const DAY_ZH: Record<Day, string> = {
  Mon: "周一",
  Tue: "周二",
  Wed: "周三",
  Thu: "周四",
  Fri: "周五",
  Sat: "周六",
  Sun: "周日",
};

/** ["Sat","Sun"] -> "周六、周日"; Mon to Fri -> "工作日" */
export function daysZh(days?: Day[]): string | null {
  if (!days || days.length === 0) return null;
  const weekdays: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  if (days.length === 5 && weekdays.every((d) => days.includes(d))) return "工作日";
  return days.map((d) => DAY_ZH[d]).join("、");
}

/** "09:30" + "11:00" -> "9:30至11:00". 24-hour clock; 至 instead of a dash, matching the English site, which writes "to". */
export function timeZh(start?: string, end?: string): string | null {
  if (!start) return null;
  const fmt = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return `${h}:${String(m).padStart(2, "0")}`;
  };
  return end ? `${fmt(start)}至${fmt(end)}` : `${fmt(start)}起`;
}

/** 450 -> "฿450". The baht sign is understood in Thailand and keeps figures identical to the English page. */
export function bahtZh(n: number): string {
  return `฿${n.toLocaleString("en-US")}`;
}

/** Months to a Chinese age phrase: 6 -> "6个月", 24 -> "2岁", 30 -> "2岁半", 18 -> "18个月" */
export function monthsZh(m: number): string {
  if (m % 12 === 0 && m >= 24) return `${m / 12}岁`;
  if (m % 12 === 6 && m >= 30) return `${Math.floor(m / 12)}岁半`;
  return `${m}个月`;
}

/** "2026-09-28" -> "2026年9月28日" */
export function dateZh(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return d ? `${y}年${m}月${d}日` : `${y}年${m}月`;
}

/** Shown on every detail page, from the English data's lastVerified. */
export function verifiedZh(iso: string): string {
  return `信息核实于${dateZh(iso)}`;
}

/** "Showing 12 of 44 playgroups" */
export function showingZh(shown: number, total: number, noun: string): string {
  return `显示 ${shown} / ${total} 个${noun}`;
}

export const COMMON_ZH = {
  clearFilters: "清除筛选",
  search: "搜索",
  any: "不限",
  allAreas: "全部区域",
  noMatches: "没有符合条件的结果，请试着清除一项筛选。",
  backToEnglish: "查看英文版",
  /** Appended under every translated detail page. */
  translationNote:
    "本页由英文原版翻译而成。价格、日期和时间可能随时变动，出行前请直接向机构确认；如中英文有出入，以英文版为准。",
} as const;
