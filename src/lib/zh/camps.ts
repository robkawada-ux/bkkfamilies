// Simplified Chinese (/zh) translations for the camps directory.
//
// Keyed by the English camp slug, then by English session id, so the English
// data in src/lib/camps.ts stays the single source of truth for dates, ages,
// prices and contact details. Only free text lives here. Names, addresses,
// phone numbers, URLs and prices are never retyped: pages read them from the
// English record and use the formatting helpers below.
//
// Camp and operator names, and street addresses, are deliberately left in
// English (see the glossary in ./common.ts). Where this file keeps an English
// place name next to a Chinese one, data/zh-review-notes/camps.md lists it for
// a native reader to check.

import { CAMPS, type CampCategory, type CampFormat, type CampSession, type DateStatus, type PriceUnit } from "@/lib/camps";
import type { BreakWindowId } from "@/lib/schoolBreaks";
import { bahtZh } from "./common";

export interface SessionZh {
  programme: string;
  previousRun?: string;
  hours?: string;
  minimumBooking?: string;
  venue?: string;
  supervisionRatio?: string;
  note?: string;
}

export interface CampZh {
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
  sessions: Record<string, SessionZh>;
}

export const CATEGORY_ZH: Record<CampCategory, string> = {
  academic: "学术",
  "art-and-design": "艺术与设计",
  cookery: "烹饪",
  "language-learning": "语言学习",
  "music-and-drama": "音乐与戏剧",
  "nature-and-outdoors": "自然与户外",
  "sport-and-fitness": "运动与健身",
  stem: "STEM",
  swimming: "游泳",
  "multi-activity": "综合活动",
};

export const FORMAT_ZH: Record<CampFormat, string> = {
  day: "全日营",
  "half-day": "半日营",
  residential: "住宿营",
};

export const DATE_STATUS_ZH: Record<DateStatus, string> = {
  confirmed: "日期已确认",
  tba: "日期待公布",
  "ran-previously": "往年举办过，今年尚未重新公布",
};

export const PRICE_UNIT_ZH: Record<PriceUnit, string> = {
  "per-day": "每天",
  "per-week": "每周",
  "per-session": "每期",
};

/** Area labels. English place names with no settled Chinese form are kept as they are. */
export const AREA_ZH: Record<string, string> = {
  Watthana: "Watthana",
  Nonthaburi: "暖武里 (Nonthaburi)",
  "Huai Khwang": "Huai Khwang",
  "Bang Kachao": "Bang Kachao",
  Silom: "是隆 (Silom)",
  Sathorn: "沙吞 (Sathorn)",
  Bangkok: "曼谷",
  Kanchanaburi: "北碧府 (Kanchanaburi)",
  "Bang Rak": "Bang Rak",
  "Khlong Toei": "Khlong Toei",
  "Several branches": "多个分店",
};

export function areaZh(area: string): string {
  return AREA_ZH[area] ?? area;
}

/** School break windows (ids from src/lib/schoolBreaks.ts). */
export const WINDOW_ZH: Record<BreakWindowId, { label: string; shortLabel: string }> = {
  "oct-2026": { label: "2026年10月半学期假", shortLabel: "2026年10月" },
  "winter-2026": { label: "2026/27年冬季及新年假期", shortLabel: "2026年冬季" },
  "spring-2027": { label: "2027年春季半学期假", shortLabel: "2027年春季" },
  "songkran-2027": { label: "2027年泼水节假期", shortLabel: "2027年泼水节" },
  "summer-2027": { label: "2027年暑假", shortLabel: "2027年暑假" },
  "other-2027": { label: "2027年其他学期内假期", shortLabel: "2027年其他" },
};

/** "2026-12-07","2026-12-11" -> "12月7日至11日"; across months "11月30日至12月4日". Year omitted, as on the English page. */
export function rangeZh(start?: string, end?: string): string | null {
  if (!start || !end) return null;
  const [, sm, sd] = start.split("-").map(Number);
  const [, em, ed] = end.split("-").map(Number);
  if (sm === em) return `${sm}月${sd}日至${ed}日`;
  return `${sm}月${sd}日至${em}月${ed}日`;
}

/** "฿6,750至฿7,750每周", with the "(estimated)" hedge kept. Null when unpublished. */
export function priceZh(s: Pick<CampSession, "priceFrom" | "priceTo" | "priceUnit" | "priceEstimated">): string | null {
  if (!s.priceFrom) return null;
  const base =
    s.priceTo && s.priceTo !== s.priceFrom
      ? `${bahtZh(s.priceFrom)}至${bahtZh(s.priceTo)}`
      : bahtZh(s.priceFrom);
  const unit = s.priceUnit === "per-week" ? "每周" : s.priceUnit === "per-day" ? "每天" : "";
  return base + unit + (s.priceEstimated ? "（估算）" : "");
}

/** "4至8岁", "7岁及以上", or null when the operator publishes no ages. */
export function agesZh(min?: number, max?: number): string | null {
  if (min !== undefined && max !== undefined) return `${min}至${max}岁`;
  if (min !== undefined) return `${min}岁及以上`;
  return null;
}

// Bricks 4 Kidz sessions are generated in English from one price list. Rather
// than retype them, build the Chinese side from the same generated records.
const B4K_PROGRAMME_ZH: Record<string, string> = {
  "Junior Inventor Camp": "Junior Inventor 营",
  "Advance Inventor Camp": "Advance Inventor 营",
  "Junior Robotics Camp": "Junior Robotics 营",
  "Advance Robotics Camp": "Advance Robotics 营",
};

function b4kSessionsZh(): Record<string, SessionZh> {
  const out: Record<string, SessionZh> = {};
  const camp = CAMPS.find((c) => c.slug === "bricks-4-kidz");
  for (const s of camp?.sessions ?? []) {
    out[s.id] = {
      programme: B4K_PROGRAMME_ZH[s.programme] ?? s.programme,
      hours: "9:30至12:30，或9:30至15:00（含午餐）",
      minimumBooking: "1周",
      note:
        s.priceFrom && s.priceTo
          ? `半日营至12:30为${bahtZh(s.priceFrom)}，留到15:00并含午餐为${bahtZh(s.priceTo)}。四个分店均有开办。`
          : undefined,
    };
  }
  return out;
}

export const CAMPS_ZH: Record<string, CampZh> = {
  "bangkok-prep-holiday-camps": {
    area: "Watthana",
    description: "Bangkok Prep 的假期营是曼谷规模最大、资料也最完整的项目之一，覆盖暑假中的七周，每周的项目组合各不相同。营地向所有学校的孩子开放，不限于 Bangkok Prep 的学生。所有项目都在 Sukhumvit 77 的中学校区进行，时间为上午9点至下午3点，每项费用均含午餐和点心。项目范围很广，从泰语读写和 EAL 英语，到 Minecraft 编程、机器人、设计、综合运动，再到精英游泳项目。",
    worthKnowing: "Bangkok Prep 页面上宣传的营地中，有三个是由使用该校区的独立机构举办的：Ivy Camps USA、Grow Learning Gardens 和 AP Race。它们有各自的价格和预订系统，其中 Ivy 另设早鸟截止日期，因此学校自己的折扣不适用于这三个营地。本目录将它们单独列出。",
    sessions: {
      "bkkprep-eal-w1": { programme: "英语（EAL）营", previousRun: "2026年6月29日至7月3日", hours: "9:00至15:00" },
      "bkkprep-eal-w6": { programme: "英语（EAL）营", previousRun: "2026年8月3日至7日", hours: "9:00至15:00" },
      "bkkprep-eal-w7": { programme: "英语（EAL）营", previousRun: "2026年8月10日至14日", hours: "9:00至15:00" },
      "bkkprep-thai-w1": { programme: "泰语读写营", previousRun: "2026年6月29日至7月3日", hours: "9:00至15:00", note: "泰语初学者俱乐部，面向非泰籍学生。" },
      "bkkprep-thai-w2": { programme: "泰语读写营", previousRun: "2026年7月6日至10日", hours: "9:00至15:00", note: "泰语趣味手工营，语言学习与美术手工相结合。" },
      "bkkprep-thai-w7": { programme: "泰语读写营", previousRun: "2026年8月10日至14日", hours: "9:00至15:00", note: "泰语与流行文化，面向年龄较大的组别。" },
      "bkkprep-minecraft-w1": { programme: "Minecraft 创新营", previousRun: "2026年6月29日至7月3日", hours: "9:00至15:00", note: "无需编程基础。" },
      "bkkprep-minecraft-w2": { programme: "Minecraft 创新营", previousRun: "2026年7月6日至10日", hours: "9:00至15:00" },
      "bkkprep-maths-drama-w1": { programme: "数学与戏剧营", previousRun: "2026年6月29日至7月3日", hours: "9:00至15:00" },
      "bkkprep-maths-drama-w3": { programme: "数学与戏剧营", previousRun: "2026年7月13日至17日", hours: "9:00至15:00" },
      "bkkprep-sports-w1": { programme: "综合运动营", previousRun: "2026年6月29日至7月3日", hours: "9:00至15:00", note: "足球、篮球、网球、游泳、体操和铁人三项。" },
      "bkkprep-sports-w2": { programme: "综合运动营", previousRun: "2026年7月6日至10日", hours: "9:00至15:00" },
      "bkkprep-sports-w3": { programme: "综合运动营", previousRun: "2026年7月13日至17日", hours: "9:00至15:00" },
      "bkkprep-sports-w6": { programme: "综合运动营", previousRun: "2026年8月3日至7日", hours: "9:00至15:00" },
      "bkkprep-designers-w6": { programme: "小小设计师营", previousRun: "2026年8月3日至7日", hours: "9:00至15:00", note: "Mini Maker 与 Young Artist 主题周，由 Creative Giants 举办。" },
      "bkkprep-designers-w7": { programme: "小小设计师营", previousRun: "2026年8月10日至14日", hours: "9:00至15:00", note: "Young Architects 与 Dream Spaces 主题周，由 Creative Giants 举办。" },
      "bkkprep-robotics-w6": { programme: "Minecraft 与机器人营", previousRun: "2026年8月3日至7日", hours: "9:00至15:00" },
      "bkkprep-robotics-w7": { programme: "Minecraft 与机器人营", previousRun: "2026年8月10日至14日", hours: "9:00至15:00" },
    },
  },
  "carroll-prep-october-camp": {
    area: "暖武里 (Nonthaburi)",
    description: "Carroll Prep 面向较小的孩子举办为期五周的十月营，内容以生活技能和语言为主，而不是按周设主题。英语是日常使用的工作语言，而不是单独的课程，营地同时设有中文环节。每天安排动手项目、美术、手工和烹饪。招收年龄从2岁起，在曼谷的假期营中相当少见，也是为数不多真正适合学龄前孩子的选择。",
    worthKnowing: "营地长达五周，是因为泰国学校的十月假期比国际学校长得多。只有第三周和第四周与国际学校的半学期假重合，其余三周可供在前后需要托管时参考。Carroll Prep 在10月13日和23日这两个公共假日也照常开放，而大多数营地这两天会休息。",
    sessions: {
      "carroll-oct-w1": { programme: "十月生活技能与语言营", minimumBooking: "1周", note: "在国际学校半学期假之前，适合需要提前托管的家庭。" },
      "carroll-oct-w2": { programme: "十月生活技能与语言营", minimumBooking: "1周" },
      "carroll-oct-w3": { programme: "十月生活技能与语言营", minimumBooking: "1周", note: "与 Patana 和 St Andrews 的半学期假相同。10月13日开营。" },
      "carroll-oct-w4": { programme: "十月生活技能与语言营", minimumBooking: "1周", note: "与 King's College 的半学期假相同。10月23日开营。" },
      "carroll-oct-w5": { programme: "十月生活技能与语言营", minimumBooking: "1周", note: "在国际学校半学期假之后。" },
    },
  },
  "little-pea-term-break-camps": {
    area: "Watthana",
    photoAlt: "Little Pea 2026年10月营海报：School of Magic，烹饪与科学营，10月12日至16日，适合4至8岁，上午9点至下午2点，附每天的主题、每周12,000泰铢或每天2,800泰铢的价格、老学员和组团优惠，以及用于预订的 LINE 二维码。",
    photoCaption: "Little Pea 2026年10月营的海报。扫描二维码即可通过 LINE 预订。",
    photoCredit: "Little Pea Kids Commons，经许可使用",
    description: "Little Pea Kids Commons 全年在国际学校放假期间为4至8岁的孩子开办日营，地点在 Thong Lo Soi 17 的 theCOMMONS。十月营的主题是 School of Magic，一周以哈利·波特为灵感的烹饪与科学活动：每天一个主题，从调制冒泡的魔法药水，到烘焙并装饰生日蛋糕，最后以化装毕业日收尾。",
    worthKnowing: "可以只订单日，每天฿2,800，不必订整周，适合只需要覆盖半学期假中几天的家庭。老学员订整周减฿500，与朋友或家人一起订整周享5%折扣。含上午点心和午餐。",
    tagline: "School of Magic：巫师主题的烹饪与科学周",
    highlights: ["🪄 周一：欢迎来到魔法世界，调制黄油啤酒并制作魔杖", "🧪 周二：魔药课，冒泡起泡的科学实验", "🍫 周三：魔法厨房，巧克力蛙和其他魔法点心", "🎂 周四：海格的生日蛋糕，烘焙、装饰并了解蛋糕背后的科学", "🎓 周五：巫师毕业日，化装庆祝"],
    sessions: {
      "little-pea-oct-2026": { programme: "School of Magic：烹饪与科学营", hours: "9:00至14:00", note: "也可订单日，每天฿2,800。老学员订整周减฿500，与朋友一起订整周享5%折扣。" },
    },
  },
  "regents-english-camps": {
    area: "Huai Khwang",
    description: "Regent's 在 Pracha Uthit Road 的寄宿校区开办英语营，面向3至12岁的孩子，非 Regent's 学生也可参加。课程由以英语为母语的教师授课，并配有助教，上午内容包括听、说、读、写、语法和角色扮演，以及英语授课的科学、数学和思维技能。下午以活动为主，有游泳、烹饪、手工和水上滑梯。孩子按3至5岁、6至8岁、9至12岁分组。",
    worthKnowing: "Regent's 属于价格偏高的一档。公布的常规价每周28,350泰铢，约为 Bangkok Prep 的两倍半、Carroll Prep 的近三倍，而且一直附带大幅折扣宣传：2026年9月，促销力度在一天之内从50%降到40%。请把常规价当作标价，而不是实际支付的价格。另外，冬季营在学期中举办，退款政策还涵盖签证被拒的情况，这说明它面向的是专程来曼谷的学生，而不是本地家庭。",
    sessions: {
      "regents-oct-2026": { programme: "Regent's 英语十月营", hours: "周一至周五 9:00至14:30", minimumBooking: "1周", note: "共三周可选。优惠价：1周17,010，2周34,136，3周全选40,967。常规价标注为28,350、56,894和68,279。" },
      "regents-winter-2027": { programme: "Regent's 英语冬季营", minimumBooking: "1周", note: "在学期中举办，面向专程来曼谷的学生。对本地家庭来说，唯一可用的是2月15日至19日这一周，与 St Andrews 的半学期假相同。班级最多25人。价格未公布；2026年9月30日前付款可享20%折扣，三人及以上团体可再减10%。" },
    },
  },
  "ivy-camps-usa": {
    area: "Watthana",
    description: "Ivy Camps 是一家美国机构，在曼谷的合作学校内开办为期一周的项目式营地，由从美国顶尖大学招募的导师授课。主题轮换，涵盖商业与创业、科学与创新、工程与设计、公开演讲与领导力。2026年暑假在 Bangkok Prep 和 Ruamrudee 两地都有开办。",
    worthKnowing: "Ivy Camps 使用自己的报名平台，而不是合作学校的平台，早鸟截止日期也早于学校。2026年在 Bangkok Prep，它被明确排除在学校自己的早鸟优惠之外，所以在默认某个价格之前，请先确认适用哪一套优惠方案。它也是我们在合作学校里找到的最贵的非专项营地。",
    sessions: {
      "ivy-bkkprep-summer": { programme: "Ivy Camps（Bangkok Prep 场）", previousRun: "2026年7月6日至31日，按周报名", hours: "9:00至15:00", note: "早鸟价13,950，标准价15,050。早鸟截止日期另定为5月1日。" },
      "ivy-ris-summer-a": { programme: "Ivy Camps（Ruamrudee 场）", previousRun: "2026年7月6日至24日，按周报名", hours: "9:00至15:00", note: "这是 Ivy 在曼谷开办过的年龄范围最宽的营，最大到17岁。该场地的价格未公布。" },
      "ivy-ris-summer-b": { programme: "Ivy Camps（Ruamrudee 场）", previousRun: "2026年7月27日至8月7日，按周报名", hours: "9:00至15:00", note: "2026年已售罄，如果您在为2027年做规划，值得留意。" },
    },
  },
  "grow-learning-gardens": {
    area: "Bang Kachao",
    description: "Grow 在 Bang Kachao（曼谷南面河湾中的那片绿色半岛）开办森林学校式自然营。营地刻意不使用屏幕，以户外探索、玩耍和发现为主，而不是排满课程表，由户外教育工作者带领。费用含点心、午餐和营地摄影。",
    worthKnowing: "Bang Kachao 虽然在地图上离市区很近，但需要过河，从曼谷大部分地区过去其实要花些功夫。订一周之前，请先确认从您所在的区域过去要多久。营地时间为上午9点至下午4点，比大多数校内营地晚一个小时结束。",
    sessions: {
      "grow-summer": { programme: "Grow 自然营", previousRun: "2026年6月29日至8月21日，每期五天", hours: "9:00至16:00" },
      "grow-oct": { programme: "Grow 自然营", previousRun: "2025年10月13日至17日及20日至24日", hours: "9:00至16:00", note: "2025年两个半学期假周都有开办。2026年的日期尚未公布。" },
    },
  },
  "ap-race": {
    area: "Watthana",
    description: "由拥有三枚奥运金牌的 Adam Peaty 与 AP Race 教练团队开发的高强度游泳营，在 Bangkok Prep 举办。一周共十节泳池训练，另有每天的泳前准备、力量与体能训练、伤病预防和理疗指导，以及比赛策略、竞技心理和运动员生活方式工作坊。",
    worthKnowing: "这是面向竞技游泳运动员的营地，不是给孩子学游泳用的。营地没有列出任何年龄范围，只列出水平标准，这说明了它的选拔方式。每周25,000泰铢，是我们在曼谷找到的最贵的营地，而且遥遥领先，约为一般学校综合运动周的两倍。尽管定位精英，它并非住宿营；含午餐和点心。",
    sessions: {
      "aprace-w1": { programme: "AP Race 游泳营", previousRun: "2026年8月3日至7日", note: "面向竞技游泳运动员。没有公布年龄限制，所以显示的年龄是我们对适合人群的估计；请向主办方确认。两周一起订45,000。" },
      "aprace-w2": { programme: "AP Race 游泳营", previousRun: "2026年8月10日至14日", note: "面向竞技游泳运动员。显示的年龄是我们的估计；请向主办方确认。" },
    },
  },
  "bangkok-dolphins": {
    area: "Watthana",
    description: "Bangkok Dolphins 自1998年起开办体育和活动营，是曼谷历史最悠久的营地机构之一。每周有各自的主题，活动涵盖运动、游泳和手工，并按年龄段调整。",
    worthKnowing: "Dolphins 在曼谷另一个主要的竞争对手亲子目录上投放了大量广告，所以您搜索时会到处看到它。这是营销投入，而不是质量信号，无论好坏。我们未能从其官网核实目前的日期、价格或年龄段，所以请把这一条当作需要自行核实的线索，而不是一份确切的信息。",
    sessions: {
      "dolphins-oct": { programme: "Bangkok Dolphins 十月营", previousRun: "2025年10月", note: "年龄是我们根据其一般营地宣传做出的估计，需要确认。价格未公布。" },
    },
  },
  "british-club-bangkok": {
    area: "是隆 (Silom)",
    description: "British Club 在学校假期期间开办有人看管的运动营，分为面向4至7岁的 Mini Sports 和面向7至13岁的 Sports Camp。多数活动在俱乐部内进行，包括网球、壁球、足球、篮球、游泳和烹饪，偶尔也会外出，比如去 Central World 或 Paragon 溜冰或打保龄球。最多55名孩子参加，会员和工作人员也会帮忙。",
    worthKnowing: "营地是为俱乐部会员举办的，规划行程前请先确认会员要求。位于市中心的是隆 (Silom)，适合在市中心上班的家庭，也是为数不多不在 Sukhumvit 或更远地区的选择。",
    sessions: {
      "britishclub-mini": { programme: "迷你运动营", previousRun: "学校假期，多数假期都会开办", note: "日期和价格没有公开发布。很可能仅限会员。" },
      "britishclub-sports": { programme: "运动营", previousRun: "学校假期，多数假期都会开办", note: "网球、壁球、足球、篮球、游泳和烹饪，偶尔外出。日期和价格没有公开发布。" },
    },
  },
  "alliance-francaise-bangkok": {
    area: "沙吞 (Sathorn)",
    description: "Alliance Francaise 为大约3至11岁的孩子开办假期营，根据当期的项目，或提高法语，或探索艺术活动。除 Lycee 之外，它是曼谷提供法语学习的老牌渠道，多数学校假期都会开营。",
    worthKnowing: "各个假期的项目差别很大，有的是语言营，有的是以艺术为主、顺带法语的营。在默认孩子会多说法语之前，请先确认当期开的是哪一种。日期和价格是按营地单独公布的，没有固定页面，所以每个假期都需要重新核实。",
    sessions: {
      "af-oct": { programme: "Alliance Francaise 十月营", previousRun: "2025年10月", note: "法语语言和艺术活动。2026年的日期和价格尚未公布。" },
    },
  },
  "mandarin-house-bangkok": {
    area: "曼谷",
    description: "Mandarin House 为曼谷的孩子开办中文假期营，是学校假期里为数不多专门的普通话选择，而不是在普通营地里附带一个语言环节。",
    worthKnowing: "曼谷学校假期里面向孩子的普通话项目其实很少，选择不多，名额也很快满。我们未能从原始来源核实目前的日期、价格或年龄段，所以请把这一条当作可跟进的线索，而不是一份确切的信息。如果您用过他们，请告诉我们，我们会补充完整。",
    sessions: {
      "mandarinhouse-oct": { programme: "Mandarin House 十月营", previousRun: "2025年10月", note: "年龄是我们的估计，需要确认。日期和价格未公布。" },
    },
  },
  "icamp-thailand": {
    area: "北碧府 (Kanchanaburi)",
    photoAlt: "iCamp Thailand 2026年10月英语活力探索营的宣传单，画面是几位青少年在北碧府的湖边一起看地图。",
    photoCaption: "iCamp 2026年10月英语活力探索营的宣传单，2026年9月发布。",
    photoCredit: "iCamp Thailand，经许可使用",
    description: "iCamp 是位于北碧府 (Kanchanaburi) 的住宿式英语营，距曼谷约160公里，在桂河谷地，已经办了十年。上午是英语任务和项目，难度对应剑桥 A1 至 B2 级别；下午是游泳、水上游戏、运动、探险和团队挑战，晚饭后还有晚间活动。住宿是竹子搭建的小屋，男生小屋八间、女生小屋八间，每间住十二名营员和两名工作人员，全部有空调，围绕餐厅呈圆形排布。工作人员配比约为1比10，视年龄而定。厨房提供西餐、亚洲餐、清真和素食，每餐都有纯素、无麸质和无乳制品的选择。",
    worthKnowing: "iCamp 严格禁止使用屏幕：入营登记时手机会被收走，离营当天归还，家长不能直接打电话给孩子，不过办公室会转达留言，并每天把照片发布到 Facebook。探访需提前两天通知。对很多家庭来说这正是吸引之处，但如果孩子从未离开过家，订之前值得考虑。按周预订，到了营地后可以续订。营地距曼谷两到三个小时车程，是真正的住宿旅行，而不是日营。营期内有全职护士，北碧府的 Synphaet 医院和 Dan Makham Tia 医院是他们的紧急合作医院。iCamp 在公开页面上不公布价格，需要发邮件询问具体金额。",
    sessions: {
      "icamp-oct-2026": { programme: "英语活力探索营", minimumBooking: "1周", venue: "iCamp Thailand，北碧府 (Kanchanaburi)", supervisionRatio: "约1比10，按年龄而异", note: "今年十月举办两周，也是 iCamp 首次开办英语活力探索项目。2026年9月11日开放报名。确切日期和价格没有在任何公开渠道公布，请直接联系 iCamp。英语活动对应剑桥 A1、A2、B1 和 B2 级别，第三天包括一场运动比赛、北碧府 Skywalk 空中步道，以及在河边用餐。" },
      "icamp-summer-2027": { programme: "iCamp 夏令营", previousRun: "2026年夏季，十周年纪念季", minimumBooking: "1周，到营地后可续订", venue: "iCamp Thailand，北碧府 (Kanchanaburi)", supervisionRatio: "约1比10，按年龄而异", note: "每周名额设有上限，以保证师生配比。2026年曾推出周年优惠：买一个名额，带一位朋友免费。" },
      "icamp-songkran-2027": { programme: "iCamp 泼水节营", previousRun: "2026年3月22日至28日、3月29日至4月4日及4月5日至11日", minimumBooking: "1周", venue: "iCamp Thailand，北碧府 (Kanchanaburi)", supervisionRatio: "约1比10，按年龄而异", note: "每期七天，包括泼水节当天有人看管的泼水庆祝活动。" },
    },
  },
  "hoyhon-park-silom": {
    area: "Bang Rak",
    photoAlt: "HoyHon 2026年10月特技体操与空中舞蹈营的宣传单，画面是幼小的孩子在舞台灯光下跳舞，以及在 Park Silom 工作室里做手工。",
    photoCaption: "HoyHon 2026年10月特技体操与空中舞蹈营的宣传单，2026年9月发布。",
    photoCredit: "HoyHon 和 Kids Mindfulness Co., Ltd，经许可使用",
    description: "HoyHon 是一家空中艺术、钢管和舞蹈工作室，在 Park Silom 和 RCA 设有分店。十月假期，其 Silom 分店与 Kids Mindfulness Co., Ltd 合作，举办以万圣节为主题的特技体操与空中舞蹈营。一天里运动与手作交替进行：上午一节空中或特技课，午饭后一小时美术，四点前再上最后一节课。一周下来，运动方面有空中绸缎和吊环、舞蹈、拉伸和软功、特技体操馆，艺术方面有扎染、黏土、绘画、制作面具和饰品以及史莱姆，周五以一场表演收尾。含午餐、点心和饮料，工作室离 Saladaeng BTS 步行两分钟。",
    worthKnowing: "我们没有在任何地方找到 HoyHon 公布的这个营的年龄范围，而且它自己的预订系统里只有成人课程，所以这个营不在该系统内。运营方自己照片里的孩子看起来是学龄前到小学低年级，但这是我们对宣传单的判断，而不是官方说明的规定，所以预订前请先询问。公布的课程表涵盖两周，而不是每周各一份，这说明两周很可能是同一套五天流程；如果您打算两周都订，值得确认。好的一面是，这是为数不多设有按天计费的营地之一，每天1,700泰铢，也是为数不多在10月13日和23日这两个公共假日仍然开放的营地，而大多数营地这两天休息。",
    sessions: {
      "hoyhon-oct-2026-w1": { programme: "十月特技体操与空中舞蹈营", hours: "10:00至16:00", minimumBooking: "1天，每天฿1,700", note: "与 Patana 和 St Andrews 的半学期假相同。10月13日（拉玛九世逝世纪念日）照常开营，而许多营地这天休息。" },
      "hoyhon-oct-2026-w2": { programme: "十月特技体操与空中舞蹈营", hours: "10:00至16:00", minimumBooking: "1天，每天฿1,700", note: "与 King's College 的半学期假相同。10月23日（朱拉隆功纪念日）照常开营。" },
    },
  },
  "storytime-preschool-halloween-camp": {
    area: "Khlong Toei",
    photoAlt: "Storytime Preschool 2026年10月营的宣传单，10月12日至16日，适合2至7岁，列有半日、全日和延长日的价格，画面有南瓜灯、蝙蝠和装满糖果的女巫大锅，另有用于预订的 LINE 和 WhatsApp 二维码。",
    photoCaption: "Storytime 2026年10月营的宣传单，2026年10月发布。扫描二维码即可通过 LINE 或 WhatsApp 预订。",
    photoCredit: "Storytime Preschool，经许可使用",
    description: "Storytime 是位于 Sukhumvit Soi 4 附近的英语幼儿园，同时也为婴幼儿开办亲子游戏小组。十月假期，它为2至8岁的孩子开办万圣节营，内容有万圣节手工、烘焙点心、雕南瓜灯、感官游戏、魔法药水、寻宝、户外游戏和化装派对。家庭可以订单日或整周，并选择半日、全日或延长日。",
    worthKnowing: "10月13日因拉玛九世逝世纪念日休营，所以这一周实际是四天。学校提供免费的每日接驳车，往返 BTS Nana 接送，因为学校的停车位非常有限，这点很有帮助。",
    tagline: "为2至8岁孩子准备的一周魔法与惊悚欢乐，10月12日至16日",
    highlights: ["🎨 万圣节手工", "🧁 烘焙惊悚点心", "🎃 雕南瓜灯", "🫧 感官游戏", "🧪 魔法药水", "🗺️ 寻宝", "🌳 户外游戏", "🎉 化装派对", "🚐 BTS Nana 免费接驳车", "📅 可订单日或整周"],
    sessions: {
      "storytime-oct-2026-half": { programme: "万圣节营，半日", hours: "9:00至12:00", minimumBooking: "1天", note: "10月13日因公共假日休营。BTS Nana 有免费接驳车。" },
      "storytime-oct-2026-day": { programme: "万圣节营，全日或延长日", hours: "9:00至14:00，或延长至16:00", minimumBooking: "1天", note: "฿1,500含至14:00，฿1,800含至16:00。10月13日因公共假日休营。BTS Nana 有免费接驳车。" },
    },
  },
  "storytime-preschool-winter-camp": {
    area: "Khlong Toei",
    photoAlt: "Storytime Preschool 冬季营宣传单：2026年12月21日至25日，适合2至7岁，半日上午9点至中午12点，全日上午9点至下午2点，延长日上午9点至下午4点，早鸟价1,080、1,350和1,620泰铢（原价1,200、1,500和1,800泰铢），11月27日前享10%早鸟折扣，校车每天400泰铢，BTS Nana 有免费接驳车，画面有雪人、穿冬装的孩子，以及用于预订的 LINE 和 WhatsApp 二维码。",
    photoCaption: "Storytime 2026年12月冬季营的宣传单，2026年10月发布。扫描二维码即可通过 LINE 或 WhatsApp 预订。",
    photoCredit: "Storytime Preschool，经许可使用",
    description: "Storytime 是位于 Sukhumvit Soi 4 附近的英语幼儿园，同时也为婴幼儿开办亲子游戏小组。12月21日至25日，它为2至7岁的孩子开办为期五天的冬季营，向所有孩子开放，不限于 Storytime 的学生，内容有欢乐的圣诞活动、关于节日季的教育课程以及圣诞老人的礼物。孩子按年龄分成合适的小组，每个孩子都能得到个别关注，这也是结交朋友、提高英语的好机会。",
    worthKnowing: "可订单日或整周，可选半日、全日或延长日。11月27日前预订可减10%。学校提供往返 BTS Nana 的免费接驳车，因为学校停车位非常有限；部分地区还有校车，每天400泰铢。营地圣诞节当天也开营。",
    tagline: "为2至7岁孩子准备的五天圣诞欢乐，12月21日至25日",
    highlights: ["🎄 圣诞手工和节日活动", "🎅 圣诞老人的礼物", "🗣️ 在玩中练习英语", "👫 按年龄分的小班", "🚐 BTS Nana 免费接驳车", "📅 可订单日或整周", "🏷️ 11月27日前享10%早鸟折扣"],
    sessions: {
      "storytime-winter-2026-half": { programme: "冬季营，半日", hours: "9:00至12:00", minimumBooking: "1天", note: "11月27日前享10%早鸟折扣，每天฿1,080。BTS Nana 有免费接驳车；部分地区有校车，每天฿400。" },
      "storytime-winter-2026-day": { programme: "冬季营，全日或延长日", hours: "9:00至14:00，或延长至16:00", minimumBooking: "1天", note: "฿1,500含至14:00，฿1,800含至16:00。11月27日前早鸟价：฿1,350和฿1,620。BTS Nana 有免费接驳车；部分地区有校车，每天฿400。" },
    },
  },
  "bricks-4-kidz": {
    area: "多个分店",
    photoAlt: "Bricks 4 Kidz 标志：名称为白色字体，印在红、绿、蓝三色乐高风格积木上，下面一行字是 “we learn, we build, we play with LEGO Bricks”。",
    photoCaption: "Bricks 4 Kidz 的十二月营在曼谷四家分店都有开办。",
    photoCredit: "Bricks 4 Kidz Thailand，经许可使用",
    description: "Bricks 4 Kidz 在四家商场分店开办基于乐高积木的搭建和机器人课程，十二月假期在四家分店都开办为期一周的营。按年龄分为四个营：Junior Inventor 面向1至4岁，Advance Inventor 面向5至7岁，Junior Robotics 面向7至9岁，孩子们用马达和传感器搭建并编程乐高机器人，Advance Robotics 面向9至12岁，使用 LEGO Mindstorms EV3。每个营周一至周五开办，可选半日或含午餐的全日。",
    worthKnowing: "第一周（12月7日至11日）在大多数国际学校放假之前，所以适合学校较早结束学期的家庭。最后一周到12月25日（圣诞节）为止，当天是否开营请向分店确认。每个分店各自受理营地预订，可通过电话或 LINE，详见“联系方式”。",
    tagline: "适合1至12岁孩子的乐高搭建与机器人营，曼谷四家分店",
    highlights: ["🧱 每天乐高搭建", "🤖 使用马达和传感器的机器人", "💻 7岁及以上学习编程", "🔤 1至4岁每天一个主题的搭建", "🕥 半日或含午餐的全日", "📍 曼谷四家分店"],
    branchLocations: {"K Village": "Sukhumvit 26，2楼", "Central Ladprao": "10楼", "The Crystal Ratchaphruek": "3楼", "Mega Bangna": "2楼，HomePro 附近"},
    sessions: b4kSessionsZh(),
  },
};

export function campZh(slug: string): CampZh | undefined {
  return CAMPS_ZH[slug];
}
