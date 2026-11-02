// Simplified Chinese text for the activities directory (/zh/activities).
//
// Only the free-text fields are translated here, keyed by the English slug.
// Everything factual (prices, ages, phone numbers, URLs, LINE ids, dates,
// status, lastVerified) is read from the English record in
// src/lib/activities.ts, so a price fixed there is fixed in both languages.
//
// A listing with no entry in ACTIVITIES_ZH does not appear under /zh at all
// (ZH_ACTIVITIES below), so a Chinese page is never half English.
//
// Terminology and punctuation rules: see the glossary in ./common.ts.
// Station names stay in English because that is what the signs say; 站 is added.
// Business, venue and mall names stay in English; no Chinese brand names are invented.

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
import { bahtZh } from "./common";

export interface ActivityZh {
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

export const TYPE_ZH: Record<ActivityType, string> = {
  "Day out": "出游去处",
  "Weekly class": "每周课程",
};

export const CATEGORY_ZH: Record<Category, string> = {
  "Indoor play": "室内游乐场",
  "Trampolines, climbing and karts": "蹦床、攀岩与卡丁车",
  "Theme and water parks": "主题乐园与水上乐园",
  "Animals and aquariums": "动物与水族馆",
  "Museums and science": "博物馆与科学",
  "Parks and outdoors": "公园与户外",
  "Markets, culture and views": "市集、文化与观景",
  "Seasonal events": "节庆活动",
  Swimming: "游泳",
  Football: "足球",
  Gymnastics: "体操",
  Dance: "舞蹈",
  Fitness: "体能训练",
  Music: "音乐",
  "Art and science": "艺术与科学",
};

export const SETTING_ZH: Record<Setting, string> = {
  Indoor: "室内",
  Outdoor: "户外",
  "Indoor and outdoor": "室内外结合",
  Undercover: "有顶棚",
};

export const ZONE_ZH: Record<Zone, string> = {
  Sukhumvit: "素坤逸",
  Central: "市中心",
  "Riverside and Thonburi": "湄南河沿岸与吞武里",
  "Rama 9 and east": "拉玛九及以东",
  "Bang Na and south": "邦那及以南",
  North: "北部",
  "Day trip outside Bangkok": "曼谷周边一日游",
  "Several locations": "多个地点",
};

export const PRICE_UNIT_ZH: Record<PriceUnit, string> = {
  entry: "",
  hour: "每小时",
  session: "每节",
  term: "每学期",
  course: "每期课程",
  month: "每月",
  activity: "每项活动",
};

export const BUDGET_ZH: Record<Budget, string> = {
  free: "免费",
  under500: "低于 ฿500",
  "500to1000": "฿500至฿1,000",
  over1000: "高于 ฿1,000，或按学期收费",
  unknown: "价格未公布",
};

/** English ageLabel, in Chinese. Reads as a complete phrase: "3岁及以上", "婴儿至13岁", "全年龄". */
export function ageLabelZh(min?: number, max?: number): string | null {
  if (min === undefined && max === undefined) return null;
  if (min !== undefined && max === undefined) return min === 0 ? "全年龄" : `${min}岁及以上`;
  if (min === undefined) return `${max}岁及以下`;
  if (min === 0) return `婴儿至${max}岁`;
  return `${min}至${max}岁`;
}

/** English priceLabel, in Chinese: "฿180至฿760", "฿350起", "฿10,500起（每学期）", "免费". */
export function priceLabelZh(p?: Price): string | null {
  if (!p) return null;
  if (p.free) return "免费";
  if (p.from === undefined) return null;
  const base =
    p.to && p.to !== p.from
      ? `${bahtZh(p.from)}至${bahtZh(p.to)}`
      : `${bahtZh(p.from)}起`;
  const unit = PRICE_UNIT_ZH[p.unit];
  return unit ? `${base}（${unit}）` : base;
}

// -------------------------------------------------------------- translations

export const ACTIVITIES_ZH: Record<string, ActivityZh> = {
  // ===================================================== Indoor play
  "mega-harborland-one-bangkok": {
    venue: "One Bangkok，Parade 区 6 楼",
    transit: "MRT Lumphini 站，有连廊直通 One Bangkok",
    hours: "每天 10:30至20:00",
    priceNote: "按年龄分档，可选按小时或全天计费。价格区间涵盖 HarborLand 在曼谷各分店的价格，均为最长三小时的票价。",
    description:
      "全球规模最大的室内游乐场之一，面积超过6,000平方米：设有幼儿专用的软包游乐区、儿童巨型滑梯，还有绳索挑战、滑索、空中单轨列车和 Jumpz 蹦床乐园，大孩子和大人也能玩。从 MRT Lumphini 站有连廊直达，是不开车也很容易到达的大型亲子去处之一。",
    worthKnowing:
      "探险区的所有人都需要穿防滑袜，入场前工作人员会做安全讲解。HarborLand 在 IconSiam 和 Gateway Ekamai 也有分店。",
  },
  "mega-harborland-iconsiam": {
    transit: "BTS Charoen Nakhon 站（金线），或从 Sathorn 码头乘 IconSiam 免费接驳船",
    hours: "每天 10:30至20:00",
    priceNote: "按年龄分档，最长三小时。",
    description:
      "位于河畔的 HarborLand，大型滑梯和攀爬区足够让孩子玩上一个下午。再加上 IconSiam 的河景和美食广场，就能轻松安排成一整天，尤其适合太热或下雨、不想待在户外的日子。",
    worthKnowing: "周末人多。至少预留两小时，请自带防滑袜，或在柜台购买。",
  },
  "harborland-gateway-ekamai": {
    transit: "BTS Ekkamai 站，与商场相连",
    hours: "工作日 10:00至20:00，周末 10:00至21:00",
    priceNote: "按年龄不同而异。",
    description:
      "规模比 MEGA 系列分店小，但紧邻 BTS，并设有专为低龄儿童准备的区域。Gateway Ekamai 里还有 Kidzooona 和 WOW Park，是下雨天一站式逛玩的好去处。",
  },
  "playmondo-centralworld": {
    transit: "BTS Chit Lom 或 Siam 站，经空中步道可达",
    hours: "工作日 11:00至20:00，周末 10:30至20:00",
    priceNote: "三小时至全天票。家长按优惠价收费。其他分店更便宜，例如 Central Rama 2 为 ฿290至฿390。",
    description:
      "四个大型游乐区分别以沙漠、海洋、火山和森林为主题，设有滑梯、障碍赛道、海洋球池、蹦床和软包游乐区。孩子身高须至少65厘米。馆内常有主题工作坊，学校假期尤其丰富。",
  },
  funarium: {
    hours: "周一至周四 9:00至18:00，周五至周日 9:00至19:00",
    priceNote: "身高105厘米以下 ฿200，13岁以下更高的孩子 ฿330。工作日不限时，周末限三小时。成人 ฿110。",
    description:
      "曼谷历史悠久、仓库般大的游乐中心，设有运动、沙水、手工和烹饪四个区域。有家长休息区和咖啡厅，适合工作日长时间停留。多年来一直是曼谷外籍家庭的经典去处，不是没有原因的。",
    worthKnowing: "租借滑冰鞋和烹饪课需另外收费。",
  },
  "playville-thonglor": {
    venue: "49 Playscape 2 楼",
    transit: "BTS Thong Lo 站，步行约7分钟",
    hours: "每天 9:00至18:00",
    priceNote: "每名儿童两小时。成人约 ฿100。",
    description:
      "干净安静的室内游乐场，面向婴儿和学龄前儿童，设有海洋球池、攀爬和滑梯、阅读角和玩沙区，还有过程艺术、做史莱姆和故事时间活动。馆内有提供儿童餐的咖啡厅，以及一家售卖玩具和婴儿用品的商店。",
  },
  "wonder-woods-kids-cafe": {
    transit: "MRT Hua Mak 站，步行约9分钟",
    hours: "每天 9:00至19:00",
    priceNote: "每名儿童三小时。成人 ฿200。70厘米以下免费。",
    description:
      "亲子咖啡馆兼共同学习空间，设有室内外游乐区、大型海洋球池、木质游乐设施、蘑菇森林，以及可以尽情玩得一身脏的沙池和水池。孩子玩耍时，家长可以在咖啡厅用餐、喝饮品。请带一套换洗衣服。",
  },
  "kidzooona-gateway-ekamai": {
    venue: "Gateway Ekamai 4 楼",
    transit: "BTS Ekkamai 站，与商场相连",
    hours: "每天约 10:30至21:00",
    priceNote: "两小时或全天。各类指南给出的现价不一致。90厘米以下曾经免费。",
    description:
      "面向婴幼儿，是曼谷性价比最高的游乐空间之一，设有堆满木质玩具的两岁以下专区，以及供学龄前儿童玩的角色扮演小镇。",
  },
  "meland-siam-paragon": {
    venue: "Siam Paragon 5 楼北区",
    transit: "BTS Siam 站，与商场相连",
    hours: "每天约 10:00至21:00（部分日子更晚）",
    priceNote: "三小时票。",
    description:
      "曼谷最新的大型室内主题乐园，也是该连锁品牌在中国以外的第一家：面积超过5,000平方米，分为七个主题区，包括天空王国、海洋探险、角色扮演小镇、STEM 区和体感运动，共有100多个游玩项目。请预留三小时或更久。",
  },
  "yoyoland-seacon-square": {
    transit: "MRT Suan Luang Rama 9 站（黄线）",
    hours: "工作日 12:00至19:00，周末 10:30至21:30",
    priceNote: "成人 ฿120。",
    description:
      "位于 Seacon Square 内的室内游乐场，有迷你过山车、恐龙骑乘和化石挖掘。适合住在 Srinakarin 一带、想玩游乐设施又不想长途跋涉去大型主题乐园的家庭。",
  },
  "kidzilla-nanglinchee": {
    transit: "距 BTS Saint Louis 站约15分钟",
    hours: "每天 10:00至18:00",
    priceNote: "两小时。成人 ฿100。",
    description:
      "面向婴儿至五岁儿童的游乐空间，同时也是学习中心，除了自由玩耍，还有艺术、英语甚至国际象棋课。方便 Sathorn 和 Rama 3 一带的家庭。",
  },
  "mari-go-round-kids-cafe": {
    venue: "RQ Residence 一楼107室",
    hours: "每天 10:00至19:00",
    priceNote: "大约价格，每名儿童。",
    description:
      "位于 Sukhumvit 49 的小型亲子咖啡馆，设计感强，有创意游乐设施、蹦床和海洋球池，也为家长准备了正式的咖啡厅。需要穿袜子。",
  },

  // ============================================ Trampolines, climbing, karts
  "bounce-emquartier": {
    venue: "EmQuartier 4 楼",
    transit: "BTS Phrom Phong 站，与商场相连",
    hours: "工作日 11:00至20:00，周末 10:00至20:00或更晚",
    priceNote: "每场蹦床约一小时。",
    description:
      "满场的蹦床、海绵坑、躲避球场和跑酷赛道。最适合精力旺盛的学龄儿童，通常玩一小时就够了。",
    worthKnowing:
      "请预留一至两小时，不要排满整个下午。孩子比你想象的更容易累，累了就容易擦伤。结束后安排些安静的活动，比如吃东西。",
  },
  "stonegoat-the-parq": {
    transit: "MRT Queen Sirikit National Convention Centre 站",
    hours: "每天 10:00至22:00",
    priceNote: "每30分钟。",
    description:
      "室内攀岩馆，设有面向五至十二岁孩子的体验场次和课程，紧邻 Benjakitti 公园。想报名课程前，这是试玩攀岩的好办法。",
  },
  "playerbox-siam-discovery": {
    transit: "BTS Siam 或 National Stadium 站",
    hours: "每天 10:00至22:00",
    priceNote: "按项目分别收费。",
    description:
      "电动卡丁车赛道、挖掘机区、VR 体验和电玩街机，适合追求速度而不是滑梯的孩子。更适合大一些的孩子。",
  },
  "beat-active-bitec": {
    transit: "BTS Bang Na 站",
    hours: "每天 10:00至19:00",
    priceNote: "四小时或全天。",
    description:
      "大型室内运动馆，设有溜冰场、足球场和篮球场，还有各类健身活动。适合爱运动的孩子，也是城里为数不多可以滑冰的地方。",
  },

  // ================================================ Theme and water parks
  "dream-world": {
    hours: "工作日 9:30至17:00，周末 9:30至18:00",
    priceNote: "视套票而定。90厘米以下免费。",
    description:
      "曼谷经典的主题乐园，位于市区以北约一小时车程，既有适合幼儿的游乐项目，也有适合青少年的设施，还有雪城，以及一些会让人全身湿透的项目。请把它当作一整天的行程，而不是两三个小时。",
    worthKnowing:
      "雪城和卡丁车要求身高至少155厘米。可以的话请选工作日去，带一套换洗衣服，并且在大家分头行动之前，哪怕只是上洗手间，也先约好一个明显的集合点。",
  },
  "siam-amazing-park": {
    hours: "每天 10:00至18:00",
    priceNote: "101至130厘米的儿童 ฿850，131厘米及以上 ฿1,000。含游乐设施和水上乐园。年卡 ฿2,000。",
    description:
      "主题乐园与水上乐园二合一，位于市区范围内，拥有吉尼斯世界纪录认证的全球最大造浪池、高速滑梯和螺旋滑梯，以及 Boomerang 和 Vortex 跳楼机等大型游乐设施。对住在曼谷东部的家庭来说，比 Dream World 更方便。",
  },
  "pororo-aquapark-central-bangna": {
    venue: "CentralPlaza Bangna 6 楼（屋顶）",
    hours: "工作日 10:30至19:00，周末和节假日 10:00至19:00。17:00停止售票，18:00关闭滑梯。",
    priceNote: "身高90至120厘米的儿童约 ฿280，成人约 ฿400，90厘米以下免费。",
    description:
      "位于购物中心屋顶的水上乐园，以韩国卡通企鹅 Pororo 为主题，设有滑梯和戏水区。它把一次普通的逛商场变成了水上乐园日，天气热的时候很难被超越。",
    worthKnowing: "几个较大的滑梯要求身高至少120厘米，所以答应孩子玩大滑梯之前请先核对。",
  },

  // ================================================ Animals and aquariums
  "sea-life-bangkok-ocean-world": {
    venue: "Siam Paragon 地下楼层",
    transit: "BTS Siam 站，与商场相连",
    hours: "每天 10:00至20:00（最后入场19:00）",
    priceNote: "2至11岁儿童：线上预订 ฿799，现场购票 ฿1,199。与 Madame Tussauds 的联票及附加项目价格更高。",
    description:
      "东南亚最大的水族馆之一，位于 Siam Paragon 地下，设有海底隧道、鲨鱼、水母和珊瑚礁展区，还可加购玻璃底船和4D影院等项目。空调环境、位置居中，是下雨天可靠的备选。",
    worthKnowing: "请在线预订：每名儿童比现场票价便宜 ฿400。",
  },
  "safari-world": {
    hours: "每天约 9:00至16:30",
    description:
      "自驾游览的野生动物园，有长颈鹿、斑马、狮子和老虎，另设有海洋公园，有海豚和海狮表演。请预留大半天时间。它位于市区东北边缘，实际上只能自驾或打车前往。",
    worthKnowing:
      "票价因套餐和预订渠道差异很大，请对比官方价格和代理商的优惠。我们暂时无法确认现在的现场购票价格。",
  },
  "snake-farm-queen-saovabha": {
    transit: "MRT Sam Yan 站或 BTS Sala Daeng 站",
    hours: "工作日 8:30至16:30，表演时间为 11:00 和 14:30。周末和节假日，表演为 11:00。",
    priceNote: "儿童 ฿50，成人 ฿200。含博物馆和表演。",
    description:
      "泰国红十字会的蛇类研究所，是世界上历史最悠久的蛇场之一，至今仍在生产抗蛇毒血清。孩子可以观看取毒表演和蛇类表演，还能参观一间小型蛇类博物馆。便宜、位置居中，也真的会让人难忘。",
  },
  "siam-serpentarium": {
    hours: "约 10:00至16:00",
    description:
      "位于素万那普机场附近的现代沉浸式蛇类博物馆，有70多种蛇，展览介绍蛇如何出生、捕猎和生存，并在可容纳400人的剧场里有现场表演。它比红十字会蛇场贵得多，但确实很有教育意义。",
    worthKnowing: "如果你本来就要去机场那一带，顺路去很合适。票价公布得不统一，请先打电话询问。",
  },
  "siamese-cat-cafe-bang-kaeo": {
    transit: "靠近 Mega Bangna",
    hours: "周一至周五 9:00至20:00，周六、周日 8:00至21:00",
    priceNote:
      "猫咪房免费入内，没有最低消费。饮品套餐从 ฿129（一杯饮品加一份猫零食套装或一双猫咪袜）到 ฿399 的家庭套餐（三杯饮品加三份零食套装或三双袜子）不等。",
    description:
      "位于 Mega Bangna 附近的咖啡馆，照料着16只获救的猫咪，欢迎孩子进入猫咪房。厨房供应越南特色菜以及泰式和国际菜肴，所以既可以当午餐地点，也可以当作动物主题的出行。孩子还可以自己动手做新鲜春卷：每套 ฿299，可做10个，够一至两人享用，有图片说明，可以自己操作。",
    worthKnowing:
      "五岁及以下的孩子进入猫咪房需要家长陪同，建议穿袜子。猫咪在12:00至13:00和17:00至18:00休息，想不想理人由它们决定，所以请避开休息时间前往。隔壁是咖啡馆的 Siamese Cat Creative Club，设有儿童游戏室，需家长陪同孩子，每名儿童一小时 ฿149，两小时 ฿249，含一名成人和一张涂色纸，蜡笔和软陶活动 ฿45至฿99。游戏室必须提前预约。俱乐部还用英语开设 Coding with AI 课程，孩子设计并制作游戏或迷你应用：90分钟一节 ฿2,000，12节 ฿18,000，可免费试听30分钟。",
    photoAlt:
      "Siamese Cat Café 猫咪房的玻璃窗边，几只常驻猫咪（其中有数只暹罗猫）坐在窗前，背后是猫爬架、猫窝，以及一面介绍暹罗猫故事的展示墙。",
    photoCredit: "Siamese Cat Café，经许可使用",
  },

  // ================================================ Museums and science
  "childrens-discovery-museum-chatuchak": {
    transit: "MRT Chatuchak Park 站或 BTS Mo Chit 站，步行五分钟",
    hours: "通常周二至周日 10:00至16:00",
    priceNote: "入场时需用护照或身份证登记。",
    closedNote:
      "自2026年10月1日起关闭，市政府正在遴选新的运营方。市政府表示关闭是暂时的，但尚未公布重新开放的日期。",
    description:
      "开放时，它是城里最超值的儿童博物馆，面向12岁以下儿童：四栋楼按年龄分区，设有恐龙挖掘、攀爬区和带喷泉与水柱的户外戏水区。请带上泳衣和毛巾，并可与隔壁的周末市集一起安排。",
  },
  "childrens-discovery-museum-thung-khru": {
    hours: "通常周二至周日 10:00至16:00",
    priceNote: "入场时需用护照或身份证登记。",
    closedNote:
      "自2026年10月1日起与 Chatuchak 分馆一同关闭，市政府正在遴选新的运营方。目前尚无重新开放的日期。",
    description:
      "吞武里一侧的分馆与 Chatuchak 的模式相同：免费，设有动手科学、自然、艺术和科技区域，有巨型积木搭建，周末还有戏水活动。对住在 Rama 2 一带的家庭来说，这是目前最近的优质室内选择。",
  },
  "science-centre-for-education-ekkamai": {
    transit: "BTS Ekkamai 站，2号出口",
    hours: "周二至周日 9:00至16:00",
    priceNote: "展览门票儿童约 ฿20，成人约 ฿30。",
    description:
      "展厅涵盖海洋生物、恐龙、昆虫和动手科学，价格几乎可以忽略不计，从 BTS 步行即到。是便宜又有空调的两小时好去处，自1964年起，这里也是曼谷天象馆所在地。",
    worthKnowing:
      "天象馆圆顶因翻新于2026年3月30日关闭，预计约八个月，预计2026年底重新开放。展览照常开放。",
  },
  "museum-siam": {
    transit: "MRT Sanam Chai 站，1号出口",
    hours: "周二至周日 10:00至18:00",
    priceNote: "15岁以下儿童历来免费入场，成人票价不高。",
    description:
      "让孩子对泰国历史产生兴趣的博物馆，以提问和互动展示为核心，而不是玻璃展柜。请预留60至90分钟，并可与步行即到的卧佛寺（Wat Pho）一起安排。",
  },
  "wow-park-gateway-ekamai": {
    venue: "Gateway Ekamai 4 楼",
    transit: "BTS Ekkamai 站，与商场相连",
    hours: "每天 10:00至19:00或更晚",
    priceNote: "各类指南给出的价格为 ฿250至฿599，视票种而定。",
    description:
      "动手类科学游乐中心，11个主题区内有40多个互动展项，包括钉床、风洞房和漩涡隧道。适合好奇的五至十二岁孩子，可提供导览。",
  },
  "national-science-museum": {
    description:
      "全国最大的科学博物馆，位于曼谷市中心以北约一小时车程的博物馆群中。孩子们记得最清楚的是主馆。请把它当作一整天的行程，而不是一个下午。",
    worthKnowing: "开放时间和票价会变动，出发前请查看 nsm.or.th。",
  },
  "royal-thai-air-force-museum": {
    transit: "距 Don Mueang 火车站约500米",
    hours: "周一闭馆。请上午前往。",
    description:
      "免费，任何喜欢飞机的孩子都会爱上这里：室内机库和户外展区共有50多架飞机，跨越泰国航空一个世纪的历史。",
  },
  "ancient-city-muang-boran": {
    hours: "每天 9:00至19:00",
    priceNote: "外国游客：成人 ฿700，6至14岁儿童 ฿350，6岁以下免费。含自行车。",
    description:
      "露天博物馆，占地约240英亩（约97公顷），有115多座仿造泰国各地的建筑和古迹。园内免费提供自行车，一路骑行，每隔几分钟就有东西可看。不会骑车的孩子可以按小时租用高尔夫球车。",
    worthKnowing: "几乎没有遮阴。请早点或晚点去。",
  },
  "bangkok-art-and-culture-centre": {
    transit: "BTS National Stadium 站，有空中连廊",
    hours: "周二至周日 10:00至20:00",
    description:
      "免费、位置居中，营业到很晚，轮换展览更适合大一点的孩子，而不是幼儿。白天热得无法在户外活动时，这里是不错的傍晚去处。",
  },
  "moca-bangkok": {
    hours: "周二至周日 10:00至18:00",
    priceNote: "15岁以下儿童免费。成人 ฿250。",
    description:
      "五层楼的泰国当代艺术，坐落在一栋引人注目的建筑里，还有一家不错的咖啡馆。更适合学龄儿童，15岁以下免费。",
  },
  "hsbc-childrens-library-lumpini": {
    venue: "Lumpini Park",
    transit: "MRT Lumphini 或 Silom 站",
    hours: "周二至周六 8:30至19:30，周日 9:00至17:30",
    description:
      "位于 Lumpini 公园内的免费儿童图书馆，有1万多册图书，还有滑梯、隧道和攀爬区。可与公园里的脚踏船搭配，是一个便宜的半日游。",
  },

  // ================================================ Parks and outdoors
  "lumpini-park": {
    transit: "MRT Lumphini 或 Silom 站，BTS Sala Daeng 站",
    priceNote: "脚踏船半小时几百泰铢。",
    description:
      "曼谷市中心的大片绿地。在湖上租脚踏船又便宜又百玩不厌，巨蜥是大多数孩子的最爱，免费的儿童图书馆也在园内。",
    worthKnowing: "请在傍晚前往，那时更凉快，光线也更好。",
  },
  "benjakitti-forest-park": {
    transit: "MRT Queen Sirikit National Convention Centre 站，或从 BTS Asok 步行前往",
    hours: "每天 4:30至22:00",
    description:
      "位于 Asok 附近的修复湿地公园，设有高架木制空中步道，横跨水面，推婴儿车也能通行，还有宽阔的自行车和滑板车道，以及可以奔跑的开阔草坪。是曼谷市中心让孩子尽情活动的最佳去处之一。",
    worthKnowing: "遮阴有限。请在清晨或傍晚前往。",
  },

  // ================================================ Markets, culture and views
  "chatuchak-weekend-market": {
    transit: "MRT Chatuchak Park 或 Kamphaeng Phet 站，BTS Mo Chit 站",
    hours: "周末",
    description:
      "乱得恰到好处。宠物区和玩具摊位能让年幼的孩子兴致勃勃，也是了解曼谷传统市集的轻松入门。",
    worthKnowing: "请在10点前去，一来避开炎热，二来到了下午早些时候会非常拥挤。",
  },
  "taling-chan-floating-market": {
    hours: "周六、周日 8:00至17:00",
    description:
      "位于吞武里一侧的小型本地水上市场，有现煮海鲜、售卖小吃的小船和传统音乐。带孩子去，比市郊那些大型旅游水上市场轻松得多。",
  },
  "khlong-lat-mayom-floating-market": {
    hours: "周六、周日 9:30至16:30",
    description:
      "比大多数水上市场更绿意盎然、更安静，离市区很近，有各种美食和泰国传统商品。",
  },
  "grand-palace-wat-phra-kaew": {
    transit: "MRT Sanam Chai 站，或 Tha Chang 码头",
    hours: "每天 8:30至15:30",
    priceNote: "外国游客每人。",
    description: "即使带着年幼的孩子，也值得去一次，参观玉佛寺和皇宫建筑。",
    worthKnowing:
      "请在开门时就去。到上午晚些时候，高温和人群会让小孩子很吃力。需要遮住肩膀和膝盖，孩子也一样。",
  },
  "mahanakhon-skywalk": {
    transit: "BTS Chong Nonsi 站，直接相连",
    hours: "每天 10:00至19:00（最后入场18:30）",
    priceNote: "3至12岁儿童 ฿350。成人白天 ฿880，日落时段 ฿1,080。",
    description:
      "78层观景台，有可以走过去的玻璃地板，360度俯瞰全城。大多数孩子觉得玻璃地板很刺激，也有些孩子觉得很可怕。",
  },

  // ===================================================== Swimming
  "bangkok-dolphins": {
    district: "六个泳池",
    description:
      "曼谷最知名的游泳学校之一，从三至六个月的婴儿一直教到竞技泳队。孩子依次升入 Seahorse、Octopus 和 Seal 等级，学校还开设亲子班、集训班和假期营。",
    worthKnowing: "仅接受在办公室刷卡或银行转账付款，不收现金。",
  },
  "lets-asia-swim": {
    transit: "距 EmQuartier 步行约20分钟",
    hours: "工作日 9:00至18:00，周六 8:30至18:00，周日休息",
    description:
      "招收4个月大的婴儿直至成人，设有面向婴儿的 Little Splashers 班、分级技能课程、竞技训练、假期营和泳池派对。",
  },
  "little-fins-pool": {
    transit: "距 BTS Thong Lo 站步行约10分钟",
    hours: "周二至周五 10:00至18:00，周末 9:00至18:00，周一休息",
    description:
      "位于 Thong Lo 附近的儿童专用泳池，招收3个月至10岁的孩子，把技术训练与好玩的水上活动和水中自救技能结合起来。",
  },
  "baby-pool-thailand": {
    district: "三个泳池",
    description:
      "由澳大利亚和英国认证的教练授课，从婴幼儿起步，经四种泳姿课程，直至游泳俱乐部。",
  },
  "bangkok-swim-academy": {
    transit: "距 BTS Phra Khanong 站约5分钟",
    hours: "工作日 10:00至19:00，周末 8:00至17:00",
    description: "课程循序渐进，从面向幼儿的 Aqua Bear 课程，一直到竞技训练。",
  },
  "aqua-tots-thailand": {
    district: "三个泳池",
    description:
      "美国连锁品牌的八级游泳课程，面向4个月至12岁的孩子，设有亲子班、特殊需求课程和快速强化班。按月而不是按学期收费。",
  },

  // ===================================================== Football
  "cuki-tots-football": {
    district: "多个场地",
    description:
      "从两岁开始的学龄前足球课程：Lenny's Cubs 面向两三岁的孩子，家长一同参与；Lenny's Lions 面向四五岁的孩子，开始独立踢球。同时开设足球和多项运动假期营。",
    branches: [
      "Polo Football Park, Wireless Road",
      "Noah Park, Sukhumvit 26",
      "Harrow International School（周末）",
    ],
  },
  "epa-bangkok-football-academy": {
    venue: "EPA Football Development Centre",
    hours: "青少年学院：周二至周四 16:30至18:30，周六、周日 11:00至12:30",
    priceNote: "10节课套票，有效期四个月。三个月通票 ฿16,050。首节课免费。",
    description:
      "男孩女孩、各种水平都可以参加。工作日课程两小时，先有30分钟可自选的自由活动，再进行90分钟的系统训练。EPA 还开设面向更小和更大球员的小组。",
    worthKnowing:
      "EPA 在自己的专用场馆训练，有两块国际足联标准的球场，完全由屋顶覆盖，所以下雨或正午太阳大时训练照常进行。场内的咖啡店 Claret & Brew 供应餐点和饮品，家长可以边等边吃。",
  },
  "can-u-kick-it-soccer": {
    venue: "Polo Football Park 及多所国际学校",
    hours: "工作日放学后，以及周末",
    description:
      "CUKI Tots 的大龄版，为六至十二岁的孩子在放学后和周末授课，地点在 Wireless Road 附近的 Polo Football Park 以及多所国际学校。",
  },

  // ===================================================== Gymnastics
  "the-little-gym-bangkok": {
    district: "多家分店",
    description:
      "面向4个月至12岁的体操和运动课程：三岁以下为亲子班，三至七岁为学龄前体操，七至十二岁为小学体操。同时开设假期营和生日派对。",
  },

  // ===================================================== Dance
  "bangkok-dance-academy": {
    transit: "BTS Chit Lom 或 Siam 站",
    description: "为儿童开设芭蕾、爵士、街舞和现代舞课程，地点在市中心的 CentralWorld。",
  },
  "cala-dance-studio": {
    transit: "BTS Phrom Phong 站",
    description: "在 Emporium Tower 开设芭蕾、现代舞、爵士和 K-pop 课程，紧邻 BTS Phrom Phong 站。",
  },
  "dance-centre-sukhumvit-33": {
    transit: "BTS Phrom Phong 站",
    description: "位于素坤逸的舞蹈学校，教授芭蕾、爵士、街舞、拉丁舞和国标舞。",
  },
  "urban-dance-studio-bangkok": {
    transit: "BTS Asok 站或 MRT Sukhumvit 站",
    description: "Asok 附近的多风格舞蹈工作室，既有儿童班，也有成人班。",
  },

  // ===================================================== Fitness
  strongkiddo: {
    transit: "BTS Asok 或 Phrom Phong 站",
    hours: "每天 9:00至18:00",
    priceNote: "12节课套餐。",
    description:
      "儿童版 CrossFit：障碍赛道、力量与体能训练，专为孩子设计。适合精力旺盛、对团队运动不感兴趣的孩子。",
  },

  // ===================================================== Little Pea Kids Commons
  "little-pea-music-together": {
    venue: "Little Pea Kids Commons，theCOMMONS Thonglor",
    transit: "BTS Thong Lo 站",
    hours: "周三和周日 10:00至11:00。一岁以下婴儿班：周三 11:15至12:00",
    description:
      "Music Together 是面向四岁以下儿童及其照顾者的早期音乐与律动课程，围绕唱歌、节奏和律动展开，帮助语言和情感发展。Little Pea 每周开设两次主课，另有一节更温和、感官体验更丰富的一岁以下婴儿课，侧重亲子联结和初次的音乐体验。",
  },
  "little-pea-ballet-and-jazz": {
    venue: "Little Pea Kids Commons，theCOMMONS Thonglor",
    transit: "BTS Thong Lo 站",
    hours:
      "周六：Baby Ballet（2至4岁）9:30 和 10:30，Level Up Ballet（4至6岁）11:30，Move & Groove Jazz（5至12岁）13:00",
    description:
      "周六按年龄分班的三节舞蹈课。Baby Ballet 带两至四岁的孩子接触古典舞，同时培养协调性、运动能力和社交能力。Level Up Ballet 由 Ms. Lynn 授课，面向已有基础、想进一步提高技巧和自信的四至六岁孩子。Move & Groove Jazz 在轻松好玩的氛围里教五至十二岁的孩子跳活力十足的舞蹈组合。",
  },
  "little-pea-little-scientists": {
    venue: "Little Pea Kids Commons，theCOMMONS Thonglor",
    transit: "BTS Thong Lo 站",
    hours: "周日 11:30至12:30",
    description:
      "面向三至五岁孩子的动手科学课，孩子们混合、搭建、观察并做简单的实验，验证自己的想法，不断追问“如果这样会怎样”。目标是培养好奇心和自信，而不是要背的知识点。",
  },
  "little-pea-creative-painting": {
    venue: "Little Pea Kids Commons，theCOMMONS Thonglor",
    transit: "BTS Thong Lo 站",
    hours: "周日 10:30至11:30",
    description:
      "由 Pop Up Art Studio 举办、面向五至十二岁孩子的每周工作室课程，由一位老师和一位工作室艺术教育者采用 Reggio Emilia 教学法带领。它比一般的绘画课更开放：孩子学着创作、犹豫、重来，并相信自己的想法，同时培养创造自信、精细动作和抗挫力。",
  },

  // ===================================================== Art and science
  "bricks-4-kidz": {
    district: "多家分店",
    priceNote:
      "以12节课为一套出售：Junior Inventor 和 Advance Inventor 为 7,800 泰铢，Junior Robotics 为 9,000 泰铢，Advance Robotics 为 9,500 泰铢。",
    description:
      "以乐高为基础的搭建与机器人课程，按年龄分为四个级别。面向一至四岁的 Junior Inventor 按字母表推进，每周一个主题（比如 D 代表恐龙），孩子在搭建模型的同时练习数数、颜色、形状和规律。面向五至七岁的 Advance Inventor 通过主题搭建引入科学、工程和数学概念，孩子再对作品进行测试和改进。面向七至九岁的 Junior Robotics 加入马达、传感器和拖拽式编程，孩子可以给自己的乐高机器人编程。面向九至十二岁的 Advance Robotics 进阶到 LEGO Mindstorms EV3 和更复杂的编程挑战。",
    worthKnowing:
      "每家分店自订课表，也各自提供免费试听课，所以请选择离你最近的分店，通过下面的电话或 LINE 预约。最低龄级别还设有亲子班，见下方的学习路径海报。四家分店也都开设假期营，详见我们的假期营目录。",
    photoAlt:
      "Bricks 4 Kidz 学习路径海报，展示四个阶段：面向最小孩子的 Early Builders、Young Engineers、Coding and Robotics，以及使用 LEGO Mindstorms EV3 的 Future Innovators，并标有曼谷四家分店和 LINE 二维码。",
    photoCredit: "Bricks 4 Kidz Thailand，经许可使用",
    branchLocations: {
      "K Village": "Sukhumvit 26，2楼",
      "Central Ladprao": "10楼",
      "The Crystal Ratchaphruek": "3楼",
      "Mega Bangna": "2楼，近 HomePro",
    },
  },
};

/** The English records that have a Chinese translation, in the English order. */
export const ZH_ACTIVITIES: Activity[] = ACTIVITIES.filter((a) => a.slug in ACTIVITIES_ZH);

export function getActivityZh(slug: string): ActivityZh | undefined {
  return ACTIVITIES_ZH[slug];
}
