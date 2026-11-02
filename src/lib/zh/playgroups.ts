// Simplified Chinese text for the playgroups directory (/zh/playgroups).
//
// Facts (names, venues, addresses, ages, times, prices, contacts, status,
// lastVerified) are NOT repeated here. They are read from src/lib/playgroups.ts
// so there is one source of truth. This file holds only the free text that
// needs translating, keyed by the English slug. A playgroup with no entry here
// is left out of /zh entirely rather than shown half in English.
//
// Glossary and punctuation rules: see src/lib/zh/common.ts.

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
import { bahtZh } from "@/lib/zh/common";

export interface SessionZh {
  /** Only for generic labels. Programme names (Little Pups, PlayNest) stay in English. */
  label?: string;
  note?: string;
  /** Translation of session.price.note */
  priceNote?: string;
}

export interface PlaygroupZh {
  description: string;
  worthKnowing?: string;
  transit?: string;
  finePrint?: string;
  /** One entry per English session, same order. Use {} when there is nothing to translate. */
  sessions: SessionZh[];
}

// ------------------------------------------------------------- label maps

export const ORGANISER_ZH: Record<Organiser, string> = {
  "International school": "国际学校",
  "Preschool or nursery": "幼儿园或托儿所",
  "Parents' group": "家长社群",
  "Play centre or cafe": "游乐中心或亲子咖啡馆",
  "Community or library": "社区或图书馆",
};

export const KIND_ZH: Record<Kind, string> = {
  "Drop-in playgroup": "自由参加的游戏小组",
  "Class or course": "课程",
  Storytime: "故事时间",
};

export const ZONE_ZH: Record<Zone, string> = {
  Sukhumvit: "素坤逸 (Sukhumvit)",
  Central: "市中心",
  "Rama 9 and Ramkhamhaeng": "拉玛九与拉姆甘亨 (Rama 9 and Ramkhamhaeng)",
  "Bang Na and east": "邦那及以东 (Bang Na and east)",
  North: "北部",
  "Several locations": "多个地点",
};

/** Short form for cards and filters, where the English in brackets is too long. */
export const ZONE_SHORT_ZH: Record<Zone, string> = {
  Sukhumvit: "素坤逸",
  Central: "市中心",
  "Rama 9 and Ramkhamhaeng": "拉玛九与拉姆甘亨",
  "Bang Na and east": "邦那及以东",
  North: "北部",
  "Several locations": "多个地点",
};

/** District names stay in English (they match street signs and map apps). Only these two placeholders are translated. */
export function districtZh(district: string): string {
  if (district === "Call for address") return "地址请咨询";
  if (district === "Various") return "多个区";
  return district;
}

export const FREQUENCY_ZH: Record<Frequency, string> = {
  weekly: "每周",
  fortnightly: "每两周一次",
  monthly: "每月",
  occasional: "不定期",
};

export const LANGUAGE_ZH: Record<string, string> = {
  English: "英语",
  Japanese: "日语",
  Mandarin: "普通话",
  Thai: "泰语",
  German: "德语",
};

export const languageZh = (l: string): string => LANGUAGE_ZH[l] ?? l;
export const languagesZh = (ls: string[]): string => ls.map(languageZh).join("、");

export const DAY_OPTION_ZH: Record<Day, string> = {
  Mon: "周一",
  Tue: "周二",
  Wed: "周三",
  Thu: "周四",
  Fri: "周五",
  Sat: "周六",
  Sun: "周日",
};

/** Age bands a parent actually thinks in, mapped to a representative age in months. */
export const AGE_BANDS_ZH: { id: string; label: string; months: number }[] = [
  { id: "0-6", label: "6个月以下", months: 3 },
  { id: "6-12", label: "6至12个月", months: 9 },
  { id: "12-18", label: "12至18个月", months: 15 },
  { id: "18-24", label: "18个月至2岁", months: 21 },
  { id: "2", label: "2岁", months: 30 },
  { id: "3", label: "3岁", months: 42 },
  { id: "4-6", label: "4至6岁", months: 60 },
];

// ---------------------------------------------------------------- formatters
// Same rules as the English helpers in src/lib/playgroups.ts, in Chinese.

/** "1", "1.5", "3" for whole and half years, or null when months read better. */
function yearsOnly(m: number): string | null {
  if (m < 12) return null;
  if (m % 12 === 0) return `${m / 12}`;
  if (m % 12 === 6 && m >= 24) return `${Math.floor(m / 12)}.5`;
  return null;
}

function monthsLabelZh(m: number): string {
  const y = yearsOnly(m);
  if (y === null) return `${m}个月`;
  return y.endsWith(".5") ? `${y.slice(0, -2)}岁半` : `${y}岁`;
}

export function ageLabelZh(min?: number, max?: number): string | null {
  if (min === undefined || max === undefined) return null;
  const hi = monthsLabelZh(max);
  if (min === 0) return `出生至${hi}`;
  const loYears = yearsOnly(min);
  const hiYears = yearsOnly(max);
  if (loYears !== null && hiYears !== null) {
    // "1至3岁" when both are whole years, otherwise "1岁至2岁半"
    return !loYears.includes(".") && !hiYears.includes(".")
      ? `${loYears}至${hiYears}岁`
      : `${monthsLabelZh(min)}至${hi}`;
  }
  if (loYears === null && hiYears === null) return `${min}至${max}个月`;
  return `${monthsLabelZh(min)}至${hi}`;
}

export function priceLabelZh(p?: Price): string | null {
  if (!p) return null;
  if (p.free) return "免费";
  if (p.amount === undefined) return null;
  const base =
    p.to && p.to !== p.amount
      ? `${bahtZh(p.amount)}至${bahtZh(p.to)}`
      : bahtZh(p.amount);
  const unit = p.unit === "year" ? "每年" : p.unit === "course" ? "每期课程" : "每次";
  return `${unit} ${base}`;
}

/** Playgroups that have a Chinese translation, in the English file's order. */
export function zhPlaygroups(): Playgroup[] {
  return PLAYGROUPS.filter((p) => p.slug in PLAYGROUPS_ZH);
}

// -------------------------------------------------------------- translations

export const PLAYGROUPS_ZH: Record<string, PlaygroupZh> = {
  // ---------------------------------------------------------- Parents' group
  "little-gaia-one-bangkok": {
    description:
      "这是一个由家长自发组织的新游戏小组，在 Little Gaia 里举行。Little Gaia 是 One Bangkok 内 Parade 区域的室内游乐与创意学习空间。上午先是圆圈时间和讲故事，随后孩子们可以在专为十岁以下儿童设计的软垫游乐区自由玩耍。这是全市乘地铁最容易到达的游戏小组之一。",
    worthKnowing:
      "最初定为每周二举行，但十月的预约日历显示周三的场次大约每两周一次，9月22日的一场已取消。出发前请先查看预约页面。Little Gaia 可为收据盖章，凭章可享两小时商场免费停车。",
    transit: "地铁 Lumphini 站3号出口，步行约10分钟",
    sessions: [
      {
        priceNote: "每个家庭，一名成人。额外成人每人฿100。",
        note: "近期场次：2026年9月29日（周二）、10月7日（周三）、10月21日（周三）。",
      },
    ],
  },
  "kira-kira-sukhumvit-61": {
    description:
      "这是一个日语和英语双语的游戏小组，设在 Ekkamai 附近的一所日本国际幼儿园内。活动依次为圆圈时间、手工、感官游戏和音乐，最后是室内外游乐场和沙地。各国家庭都欢迎参加，不限于会说日语的家庭。",
    transit: "Major Cineplex Sukhumvit (Ekkamai) 有免费接驳车",
    sessions: [
      {
        priceNote: "每个家庭。额外成人每人฿100。",
        note: "近期场次：2026年9月30日、10月14日、10月28日。",
      },
    ],
  },
  "kiddieville-playville": {
    description:
      "这是在 Playville 举行的每周一次的家长自办上午场。Playville 是素坤逸49巷一家干净、维护良好的室内游乐场，面向会爬的宝宝到三岁的孩子。场内有波波池、攀爬和滑梯，还有阅读角和沙地游戏区，以及提供儿童餐的咖啡馆。适合想让孩子自由玩耍、而不是上结构化课程的家庭。",
    worthKnowing:
      "本场 Playville 每个家庭只允许一名成人入场，因此第二位家长或保姆不能进入。请自带防滑袜和现金。",
    transit: "BTS Thong Lo 站，步行约7分钟",
    sessions: [{ priceNote: "每个家庭，仅限一名成人。" }],
  },
  "little-steps-future-steps": {
    description:
      "这是一所小型国际幼儿园在素坤逸31巷举办的每周一次家长自办游戏小组，由学校自己的老师带领。活动包括圆圈时间、感官活动和讲故事，场地有室内外游戏区和沙池。在家长自办的上午场里，它的结构性算比较强的。",
    worthKnowing: "每个家庭仅限一名成人，现场付现金。",
    sessions: [{ priceNote: "每个家庭，仅限一名成人。" }],
  },
  "niko-niko-sukhumvit-49": {
    description:
      "这是一个由日本老师带领的新游戏小组，采用蒙特梭利教学法，使用日语和英语。上午的活动有圆圈时间、手工、感官游戏、讲故事和吹泡泡。和 Kira Kira 一样，欢迎任何背景的家庭参加。",
    worthKnowing:
      "活动页面提到，每周的主题有时连场地也会变动，请在每周的预约页面核对地址。",
    sessions: [{ priceNote: "每个家庭。额外成人每人฿100。" }],
  },
  "little-tots-sathorn": {
    description:
      "这是每月一个周六举行的周末游戏小组，由家长自办，地点在沙吞的 Tiny Tots。老师带领感官游戏、体能活动和英语故事，孩子可以使用室内外游戏区和泳池。对工作日上午抽不出时间的上班家长来说，这是个不错的选择。",
    sessions: [
      {
        priceNote: "每个家庭。额外成人每人฿100。",
        note: "每月一个周六。下一场：2026年10月3日。",
      },
    ],
  },
  "wonderkids-wonder-woods": {
    description:
      "这是一周中时间最长的游戏小组上午场之一，长达两个半小时，地点是 Phatthanakan 路附近的一家儿童咖啡馆，设有室内外游乐场、沙地游戏和戏水区。这里比大多数小组更容易弄脏、更偏户外，请带一套换洗衣物。孩子玩耍时，家长可以在咖啡馆吃喝。",
    worthKnowing: "预约页面仍要求室内佩戴口罩，请随身携带一个。",
    transit: "地铁 Hua Mak 站，步行约9分钟",
    sessions: [
      {
        priceNote:
          "每个家庭。额外成人每人฿100。泳池另收฿150，付给 Wonder Woods。",
      },
    ],
  },
  "little-seeds-tiny-seeds": {
    description:
      "这是一所小型国际幼儿园每周一上午的游戏小组，位于素坤逸36至40巷一带。由外籍老师带领圆圈时间和各个活动站，之后是室内外自由玩耍。",
    sessions: [{ priceNote: "每个家庭。额外成人每人฿100。" }],
  },
  "little-panda-mandarin": {
    description:
      "这是我们所能找到的曼谷唯一一个定期举办的普通话游戏小组。圆圈时间、手工和感官游戏全部由流利的中文老师用普通话带领，最后有点心时间和室内自由玩耍。孩子不需要会说普通话也可以参加。",
    worthKnowing:
      "宣传为每周五举行，但目前的日历显示大约每两周一场。请携带身份证件，场地会查验。",
    sessions: [
      {
        priceNote: "每个家庭。额外成人每人฿100。",
        note: "近期场次：2026年10月9日和10月30日。报名在一周前开放。",
      },
    ],
  },
  "little-treehouse-nursery": {
    description:
      "这所小型托儿所自己每月举办一次游戏小组，同时也为一个家长自办的小组提供场地。上午的活动包括圆圈时间、讲故事、玩橡皮泥、自由玩耍，以及按各年龄段设计的感官或艺术活动。",
    worthKnowing: "家长社群专场的价格大约是托儿所自办场的一半。",
    sessions: [
      {
        label: "家长社群专场",
        priceNote: "每个家庭。",
        note: "下一场：2026年10月10日（周六）。",
      },
      {
        label: "托儿所自办游戏小组",
        priceNote: "一名儿童加一名成人。",
      },
    ],
  },

  // ------------------------------------------------------ International schools
  "ascot-little-lion-playgroup": {
    description:
      "这是由 Ascot 早期教育团队举办的每周一次的短时段、低价游戏小组，从出生的婴儿起就可参加。它体现了学校以游戏为基础、以孩子为中心的理念，对正在考虑这所学校的家庭来说，也是了解早期教育楼的轻松入门。",
    worthKnowing:
      "每个孩子限一名监护人，且成人须全程陪同。收费฿200，是曼谷学校自办游戏小组中最便宜的之一。",
    sessions: [
      {
        priceNote: "每名儿童，含茶点。Ascot 在读学生的兄弟姐妹฿150。",
        note: "仅学期内举行。本学期于2026年9月1日（周二）开始。",
      },
    ],
  },
  "bangkok-prep-pups-playgroup": {
    description:
      "周六上午的两场活动按年龄分开，由专职的游戏小组负责人设计：Little Pups 面向会走路到三岁的孩子，内容有音乐、律动和创意游戏；Big Pups 面向三至五岁的孩子，挑战更大。家长或照护人全程陪同。这是少数面向三至五岁孩子的学校游戏小组之一。",
    worthKnowing:
      "学期内每个周六中午12:15开放下一周的报名，每个班额满即截止，请设置提醒。每场500泰铢。学校还提供年度会员，其中包含免费报名，适合计划申请 Bangkok Prep 的家庭。",
    sessions: [{ note: "从会走路起。" }, {}],
  },
  "bangkok-patana-tiny-tigers": {
    description:
      "这是在 Patana 的 Nursery 学习环境和 Foundation Stage 花园里举行的灵活的每日上午游戏小组，由专业的早期教育教师带领。一岁以上的孩子由家长或照护人陪同参加，学校也鼓励家庭用各自的母语分享歌曲和问候语。",
    worthKnowing:
      "Patana 没有在网上公布活动时间和价格。请发邮件给招生办公室报名。",
    sessions: [{ note: "学期内每个工作日上午。具体时间请咨询。" }],
  },
  "st-andrews-little-bunnies": {
    description:
      "这是由合格教师在素坤逸71巷的 Nord Anglia St Andrews 小学校区举办的免费每周游戏小组，提供饮用水和点心。名额有限，每学期都需要报名。",
    worthKnowing:
      "学校已公布2026年秋季的场次。周二午间时段是学校多年来一直开设的时段，报名时请确认当前时间。请勿与位于 Sathorn、Dusit 和 Sukhumvit 107、由 Cognita 另行运营的 St Andrews 学校混淆。",
    transit: "学校接驳车，从 Gateway Ekkamai 发车",
    sessions: [{ note: "偶尔也有周六快闪场次。" }],
  },
  "st-andrews-sathorn-friday-playgroup": {
    description:
      "周五的平静场次，以孩子为中心，面向婴儿和年幼的学步儿，内容有故事、歌曲和儿歌、感官游戏、爬行和攀爬，以及简单的手工。这是少数专门面向两岁以下孩子的游戏小组之一，也是认识 Sathorn 一带的家庭、参观早期教育教室的机会。",
    worthKnowing:
      "本系列从2026年1月开始。名额有限，请提前致电确认本学期的日期。",
    sessions: [{ priceNote: "含点心。", note: "学校假期和公共假日不举行。" }],
  },
  "st-andrews-sukhumvit-107-teddies": {
    description:
      "这是在专用游戏小组楼里举行的以游戏为基础的上午活动，由游戏小组负责人 Ms Alex Rogan 带领，轮换主题活动，培养感官发展、运动技能和社交自信。这是乘 BTS 最容易到达的学校游戏小组。",
    worthKnowing:
      "学校把 Teddies 描述为进入 Early Years 的预备项目，但没有公布日期、时间和价格。学校还会为新家庭举办免费的周六快闪活动。请发邮件给游戏小组负责人索取当前时间表。",
    transit: "BTS Bearing 站，步行1分钟",
    sessions: [{}],
  },
  "st-andrews-dusit-playgroup": {
    description:
      "这是周三下午的游戏小组，每学期分成几个短期阶段举行，在学校的室内外空间开展社交和运动技能活动。它是曼谷北部为数不多的游戏小组之一。",
    worthKnowing:
      "St Andrews Dusit 的在读家庭享有优先预约权，在名额向公众开放之前报名，所以名额可能很快满员。最近公布的一期持续到9月，请留意下一期。",
    transit: "靠近 Victory Monument 和 Ari",
    sessions: [
      {
        priceNote: "St Andrews Dusit 的在读家庭฿100。",
        note: "每学期分成约五周一期。",
      },
    ],
  },
  "shrewsbury-city-campus-starfish": {
    description:
      "Shrewsbury Starfish 游戏小组每周三和周四13:45至15:15举行，面向1至3岁的孩子。可以在花园里探索、在戏水池里玩水、唱歌、听故事，和孩子共度高质量的游戏时光。",
    worthKnowing: "必须有家长出席，保姆不能单独带孩子来。",
    sessions: [{ priceNote: "含健康点心。" }],
  },
  "shrewsbury-riverside-playgroup": {
    description:
      "这是曼谷频率最高的学校游戏小组：每个工作日上午在 Shrewsbury Riverside 的早期教育楼举行，十天一轮换，内容包括软垫游戏、戏水游戏、早期教育花园、河畔野餐、烹饪和球类游戏。每场都以故事和点心结束。",
    worthKnowing:
      "每个孩子限一名家长或祖父母陪同，保姆不能参加。报名表每周重新开放，每天额满即截止，每场限约十名儿童。",
    transit: "Sathorn 码头 (BTS Saphan Taksin) 有免费接驳船",
    sessions: [{ priceNote: "每名儿童。" }],
  },
  "regents-langsuan-toddler-playgroup": {
    description:
      "在 Regent's 位于 Langsuan 附近的纯早期教育校区，每周四个上午开展活动，内容有音乐、不怕弄脏的感官游戏、水中游戏和游泳、讲故事和户外探索，均对应英国 EYFS 课程。位置就在市中心，靠近 Chit Lom 和 Lumphini 公园。",
    worthKnowing: "名额有限。Regent's 没有公布 Langsuan 校区的单次收费。",
    sessions: [{}],
  },
  "regents-rama-9-toddler-playgroup": {
    description:
      "在 Regent's Rama 9 校区举行的工作日学步儿活动，由英国教师在专门建造的游戏区带领，设有户外活动，请戴帽子。孩子必须由家长或保姆陪同参加，全程使用英语。",
    worthKnowing: "请提前一至三天预约，每场只收10名儿童。",
    sessions: [{ note: "每场限10名儿童。" }],
  },
  "brighton-college-bright-start": {
    description:
      "Brighton College 为年龄还不到其 Pre-Nursery 入学要求的孩子开设的亲子学步儿小组，由合格的英国教师带领，每个孩子一名成人。学校新的 Vibhavadi 校区也会不定期举办早期教育的亲子体验上午场。",
    worthKnowing:
      "标注的开始时间很早，且不提供点心。请在线登记，学校会致电确认您的名额。",
    sessions: [{ note: "仅学期内举行。" }],
  },
  "harrow-lion-cubs-parent-toddler": {
    description:
      "这不是随到随玩：Harrow 的 Lion Cubs 是其早期教育中心的第一个年级，Parent Toddler 选项是一个需要正式注册的项目，每周两节有成人陪同的课。适合已经决定读 Harrow、想尽早入读的家庭。",
    worthKnowing:
      "孩子18个月起即可入读，前提是在该学年内满两岁。只有孩子参加的半日和全日 Lion Cubs 学位费用要高得多。",
    sessions: [{ priceNote: "每周两节，按学期缴费。", note: "每周两节。" }],
  },
  "wycombe-abbey-little-doves": {
    description:
      "在素万那普机场附近 Wycombe Abbey 新校区每月举办一次、时长两小时的亲子游戏聚会，由早期教育团队主持，活动受瑞吉欧教育理念启发，包括感官游戏和故事。面向两至五岁的孩子，比大多数游戏小组的年龄偏大。",
    worthKnowing:
      "每场只有十个家庭。学校还为同年龄段的孩子举办短时的早期教育体验上午场。",
    sessions: [{ note: "每场十个家庭名额。" }],
  },
  "ris-swiss-section-spielzwerge": {
    description:
      "这是 Ruamrudee International School 瑞士部的德语游戏小组，也是我们能找到的曼谷唯一一个德语游戏小组。下午场，面向两至三岁的孩子。",
    worthKnowing: "信息来自较旧的列表，价格未公布。请先联系学校再前往。",
    sessions: [{}],
  },

  // ------------------------------------------------- Preschools and nurseries
  "kids-academy-ekkamai-playgroup": {
    description:
      "结构与学校的托儿班相仿：有圆圈时间的歌舞、边唱边听的故事时间、木偶剧、戏水和降落伞游戏，还有在 Snoezelen 多感官室里的活动。每天的流程都不同，所以每周来多次更有收获。",
    worthKnowing:
      "请提前预约，除特别活动外每场限16名儿童。周六场次让它成为少数周末可选的游戏小组之一。",
    finePrint: "BAMBI 会员可咨询是否有折扣。",
    sessions: [{ priceNote: "或฿5,500购买11次。", note: "由 Ms Deah 带领。" }],
  },
  "kids-academy-srinakarin-playgroup": {
    description:
      "Kids' Academy 在 Srinakarin 校区每个工作日都有游戏小组，由专职的游戏小组负责人带领，内容包括不怕弄脏的游戏、感官探索、烹饪、美术、音乐和律动。在城市的 Srinakarin 一侧，每天开放的选择很少。",
    worthKnowing: "价格未公布。年龄上限为两岁半。",
    sessions: [{}],
  },
  "kids-kingdom-ruamrudee-playgroup": {
    description:
      "周六上午的主题活动，面向学步儿及其家长，内容有创意艺术和角色扮演、积木游戏、感官和操作类游戏，以及语言和体能活动，目的是在上幼儿园之前培养自理能力。位置居中，从 Ploenchit 步行可到。",
    sessions: [{ priceNote: "五次和十次的套餐更便宜。" }],
  },
  "kids-kingdom-sukhumvit-47-playgroup": {
    description:
      "这是 Ruamrudee 场次在素坤逸47巷的姊妹场，周一上午举行，面向15个月到三岁的学步儿。上午先在户外玩秋千、滑梯、沙、骑车、玩水和不怕弄脏的游戏，同时室内有角色扮演、橡皮泥、积木和阅读角。接着是带乐器的音乐律动、提供的点心，以及歌曲、故事、木偶、手工、降落伞和泡泡时间，11:15道别。",
    worthKnowing:
      "请提前预约。六次和十次的套餐可把单价降到每次550泰铢和540泰铢，且套餐永不过期，所以错过的周一不会浪费。特别的周六游戏小组会在学校的 Facebook 页面公布。",
    finePrint: "BAMBI 会员可咨询是否有折扣。",
    sessions: [
      {
        priceNote:
          "6次3,300泰铢，10次5,400泰铢。套餐永不过期。提供点心。",
      },
    ],
  },
  "annabels-saturday-playgroup": {
    description:
      "周六上午在 Annabel's 绿树成荫的 Ekamai 托儿所举行，面向6个月至三岁的婴幼儿，由合格的早期教育教师带领。孩子们可以探索泥巴厨房和沙坑，尽情玩颜料和小世界游戏，也可以在感官室里度过一段时光。现场有停车位，家长可以在孩子玩耍时互相认识。",
    finePrint: "BAMBI 会员可咨询是否有折扣。",
    sessions: [{ priceNote: "第二个兄弟姐妹400泰铢。" }],
  },
  "abc-pathways-playgroup": {
    description:
      "按十二个主题（如宠物、家庭和乐器）安排的主题活动，包括自由玩耍、点心、歌曲、故事时间、创意美术、感官游戏和早期 STEAM。这是仅有的两个提供普通话游戏小组的地方之一。",
    worthKnowing:
      "告诉学校您想参加哪一天，学校会为您保留名额。年龄范围未公布。",
    sessions: [
      { label: "英语游戏小组", priceNote: "含点心和手工材料。" },
      { label: "普通话游戏小组" },
    ],
  },
  "storytime-preschool-playgroup": {
    description:
      "每周三上午，Storytime 的老师带领动手的室内外活动，激发孩子的好奇心和对学习的热爱。活动为半结构化、按主题进行，包含园艺、简单烘焙、蒙特梭利活动、音乐和律动，另有点心时间和自由玩耍。家长有咖啡和茶，孩子做的每件手工都可以带回家。",
    worthKnowing:
      "免费接驳车约9:15从 BTS Nana 出发，11:00送您返回。学校的停车位非常有限。",
    transit: "BTS Nana（素坤逸6巷）有免费接驳车",
    finePrint: "BAMBI 会员可咨询是否有折扣。",
    sessions: [
      { label: "Mum & Me Playgroup" },
      { label: "每月周六游戏小组", priceNote: "每名儿童。" },
    ],
  },
  "hei-music-club": {
    description:
      "以芬兰早期教育理念为基础的亲子音乐课，每学期有一个新主题。孩子们探索声音、节奏和乐器，同时锻炼运动、语言和社交技能。每场限十个家庭。",
    worthKnowing:
      "本学期的课程“Musical Adventures with Favourite Characters”在2026年10月31日，11月7日、14日、21日、28日，以及12月12日的周六举行。",
    sessions: [
      { priceNote: "或฿5,400报名完整的六节课程。" },
      { priceNote: "或฿5,400报名完整的六节课程。" },
    ],
  },
  "firefly-forest-school-playgroup": {
    description:
      "这是曼谷的森林学校选择：在封闭的自然环境中玩两小时的泥巴、草地、感官站和歌曲。周五是为年幼学步儿设计的温和、慢节奏小组，周六是面向三至六岁孩子的更具冒险性的小组。泰语和英语双语。",
    worthKnowing:
      "这是本目录中最贵的随到随玩游戏小组，但无需长期承诺，而周六小组是少数面向三岁以上儿童的小组之一。请通过 LINE 预约。",
    sessions: [
      { priceNote: "含点心和材料。" },
      { priceNote: "含点心和材料。" },
    ],
  },
  "outdoor-school-bangkok-playgroup": {
    description:
      "一小时的户外自然主题活动，每月有一个主题引导故事、歌曲和游戏，节奏温和、以感官为主，不会太热闹。孩子可以赤脚踩在草地上，还能见到这里的“常住居民”小乌龟，这在曼谷市中心很少见。",
    worthKnowing: "请通过 LINE 预约，电话 097 092 0924。价格未公布。",
    transit: "BTS Phra Khanong 站，步行5分钟",
    sessions: [{}],
  },
  "first-steps-international-preschool-playgroup": {
    description:
      "由教学人员带领的有结构的英语游戏小组，每周的主要活动不同：手工、戏水日、木偶剧、音乐、舞蹈和烹饪。活动结束后，家庭可以留下来使用学校场地。",
    worthKnowing: "价格未公布。",
    transit: "BTS Phrom Phong 站或 Asok 站",
    sessions: [{}],
  },
  "parry-kindergarten-playgroup": {
    description:
      "周五上午在 Phetchaburi 路附近一所小型幼儿园举行的游戏小组，面向出生到五岁的孩子。",
    worthKnowing: "信息来自较旧的列表。请先联系幼儿园再前往。",
    sessions: [{}],
  },

  // ------------------------------------------------------ Classes and courses
  "julia-gabriel-playnest-playclub": {
    description:
      "新加坡 Julia Gabriel 的曼谷分校开设有成人陪同的学期课程，以戏剧、讲故事、木偶、现场音乐、美术和手工为基础。PlayNest 面向婴儿，PlayClub 面向学步儿，均提供英语和普通话两种语言。",
    worthKnowing:
      "这些是按学期报名的课程，不是随到随玩，费用未公布。可免费试听一节课。",
    sessions: [
      { label: "PlayNest", note: "90分钟，每周两次。" },
      { label: "PlayClub", note: "两小时，每周一次或两次。" },
    ],
  },
  "little-pea-kids-commons": {
    description:
      "Little Pea 在 theCOMMONS Thonglor 的场地里，一周开设五个不同的游戏小组：面向一岁以下婴儿的感官聚会、户外不怕弄脏的玩水游戏、美术和感官游戏、帮助学步儿适应学校作息的幼儿园预备课，以及下午的音乐和游戏小组。",
    worthKnowing:
      "婴儿聚会和周三的音乐游戏小组是城里少数下午举行的游戏小组，方便配合宝宝上午的小睡。每天9:00至18:00营业。",
    sessions: [
      { label: "Parent & Baby Hangout", note: "通过音乐、律动和触摸，为婴儿和照护人带来感官游戏。" },
      { label: "Messy & Water Playgroup", note: "户外感官和戏水游戏，锻炼运动技能和手眼协调。" },
      {
        label: "Wild Art & Sensory Playgroup",
        note: "通过多感官玩具认识形状、颜色和构图，并带回一件艺术作品。",
      },
      { label: "Preschool Prep Playgroup", note: "帮助学步儿适应学校作息，培养独立性。" },
      {
        label: "Music & Games Playgroup",
        note: "通过唱歌、跳舞和感官游戏，促进语言、自我表达和团队合作。",
      },
    ],
  },
  "bumpsy-daisy-little-daisies": {
    description:
      "这是 Phrom Phong 附近的亲子咖啡馆和社区空间，日程排得满，有面向约三岁以下婴幼儿的学步儿游戏小组、音乐、瑜伽和烹饪课，也有面向家长的产前和急救课程。蛋糕是自制的，场地配有品质良好的玩具。",
    worthKnowing:
      "时间表每月都有变化，有些课程已经结束，请先查看预约链接。场次很快订满，新课程通常在 Facebook 上发布。",
    transit: "BTS Phrom Phong 站，再步行约15分钟",
    sessions: [{ label: "Little Daisies 学步儿游戏小组" }, { label: "Tiddly Yoga" }],
  },
  "play-stations-bkk-rama-9": {
    description:
      "位于 Rama 9 的 The Nine 商场内一家室内游乐中心的工作日上午游戏小组，场内有停车位。",
    worthKnowing: "信息来自较旧的列表。请先联系游乐中心再前往。",
    sessions: [{}],
  },
  "gymboree-play-and-music-bangkok": {
    description:
      "这家美国连锁品牌在曼谷多家分店开设面向新生儿到六岁儿童的结构化游戏、音乐和幼儿园预备课程。课程以套餐形式销售，按年龄段预约，所以更像一门课程，而不是随到随玩的游戏小组。",
    worthKnowing:
      "Chidlom 分店已暂时搬到 Rama 3，Sukhumvit 分店搬到 Ari。价格未公布，各分店通过 LINE 报价。",
    sessions: [{}],
  },

  // ------------------------------------------------------ Community and libraries
  "christ-church-tiny-tots": {
    description:
      "Christ Church 位于 Convent Road 的大礼堂里举办的历史悠久的亲子小组，有大量不断更换的玩具、手工和音乐。由社区运营，比学校的游戏小组更轻松。",
    worthKnowing:
      "周三的活动以简短的圣经故事开场。信息来自该小组的 Facebook 页面，请查看以确认假期是否停办。",
    transit: "BTS Sala Daeng 站或地铁 Silom 站",
    sessions: [{}],
  },
  "neilson-hays-library-storytime": {
    description:
      "曼谷历史悠久的英语图书馆藏有8,000多本儿童图书，每周六举办面向两至七岁孩子的故事和手工活动，由志愿者带领。这栋1922年建成的建筑本身就值得一游。",
    worthKnowing:
      "每周的主题会发布在图书馆的 Facebook 页面。图书馆一年两次的图书义卖期间，故事时间暂停。",
    sessions: [
      {
        label: "周六儿童故事时间",
        priceNote: "每名儿童。家长免费。",
        note: "先听故事再做手工，每周更换新主题。",
      },
    ],
  },
};
