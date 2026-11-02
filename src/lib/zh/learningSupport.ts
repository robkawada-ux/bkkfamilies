// Simplified Chinese text for the learning-support directory (/zh/learning-support).
//
// Structured facts (names, phone numbers, emails, URLs, tags, categories,
// checked dates) stay in src/lib/learningSupport.ts and are never copied
// here. This file only holds the words a parent reads: descriptions, notes,
// the services list, the ages line, and display labels for the controlled
// vocabularies. A provider with no entry in PROVIDERS_ZH is not shown on the
// Chinese site at all, so a Chinese page can never be half English.
//
// See src/lib/zh/common.ts for the glossary and the naming rules.
import type { Delivery, ProviderCategory, Tag } from "@/lib/learningSupport";

export interface ProviderZh {
  /** Chinese reading of the English `ages` line. */
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

export const CATEGORY_ZH: Record<ProviderCategory, string> = {
  "Assessment & diagnosis": "评估与诊断",
  "Therapy clinic": "治疗诊所",
  "ABA & behaviour support": "ABA与行为支持",
  "Specialist school": "特殊教育学校",
  "School learning support": "学校学习支持",
  "Tutoring & mentoring": "辅导与指导",
  "Vocational & transition": "职业与过渡衔接",
  "Parent support": "家长支持",
  "Hospital clinic": "医院门诊",
  "Government service": "政府机构",
  "Enrichment & general learning": "兴趣拓展与综合学习",
  "Special Needs Support and Consultancy": "特殊需求支持与咨询",
};

export const TAG_ZH: Record<Tag, string> = {
  "ADHD & attention": "ADHD与注意力",
  "Anxiety & mood": "焦虑与情绪",
  "Assessment & diagnosis": "评估与诊断",
  Autism: "孤独症谱系",
  Behaviour: "行为",
  "Developmental delay": "发育迟缓",
  "Dyslexia & literacy": "阅读障碍与读写能力",
  "Early intervention": "早期干预",
  "Exam access arrangements": "考试便利措施",
  "Executive function": "执行功能",
  Hearing: "听力",
  "In-school support": "校内支持",
  "Intellectual disability": "智力障碍",
  "Life skills & independence": "生活技能与独立能力",
  "Occupational therapy": "作业治疗",
  "Parent support & training": "家长支持与培训",
  "Play, art & music therapy": "游戏、艺术与音乐治疗",
  "Sensory processing": "感觉处理",
  "Social skills": "社交技能",
  "Speech & language": "言语与语言",
  "Visual impairment": "视力障碍",
  "Vocational & employment": "职业与就业",
};

export const DELIVERY_ZH: Record<Delivery, string> = {
  "At a centre": "到机构上课",
  "In school": "入校服务",
  "At home": "上门服务",
  Online: "线上",
};

export const LANGUAGE_ZH: Record<string, string> = {
  English: "英语",
  Thai: "泰语",
  Mandarin: "普通话",
  Cantonese: "粤语",
  Japanese: "日语",
};

/**
 * Display labels for the English `area` strings. Where I am not certain of
 * the accepted Chinese form of a district, the English stays on its own.
 */
export const AREA_ZH: Record<string, string> = {
  Online: "线上",
  Bangkok: "曼谷",
  "Bangkok and across Thailand": "曼谷及泰国各地",
  "Khlong Toei": "空堤区（Khlong Toei）",
  "Khlong Toei (Phra Khanong)": "空堤区（Phra Khanong）",
  Watthana: "瓦他纳区（Watthana）",
  "Watthana (Thong Lo)": "瓦他纳区（通罗 Thong Lo）",
  "Watthana (Ekkamai)": "瓦他纳区（Ekkamai）",
  "Watthana and Suan Luang": "瓦他纳区和 Suan Luang",
  "Sathorn and Watthana": "沙吞和瓦他纳区（Sathorn、Watthana）",
  Nonthaburi: "暖武里（Nonthaburi）",
  "Nonthaburi (Pak Kret)": "暖武里（Pak Kret）",
  "Bang Na": "邦那（Bang Na）",
  "Bang Kho Laem": "Bang Kho Laem",
  "Phra Khanong (Bang Chak)": "Phra Khanong（Bang Chak）",
  "Huai Khwang": "Huai Khwang",
  "Huai Khwang (Mengjai)": "Huai Khwang（Mengjai）",
  "Taling Chan": "Taling Chan",
  "Phaya Thai": "Phaya Thai",
  "Min Buri": "Min Buri",
  "Bang Khae": "Bang Khae",
  "Din Daeng": "Din Daeng",
};

export const areaZh = (a: string): string => AREA_ZH[a] ?? a;
export const languageZh = (l: string): string => LANGUAGE_ZH[l] ?? l;

const MONTH_NUM: Record<string, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

/** "September 2026" -> "2026年9月". Falls back to the English text. */
export function checkedZh(checked: string): string {
  const [month, year] = checked.split(" ");
  const m = MONTH_NUM[month];
  return m && year ? `${year}年${m}月` : checked;
}

/** A meta description of about 80 characters, cut at a clause boundary. */
export function metaDescriptionZh(text: string): string {
  const first = text.split("\n\n")[0] ?? "";
  if (first.length <= 80) return first;
  const cut = first.slice(0, 80);
  const stop = Math.max(cut.lastIndexOf("，"), cut.lastIndexOf("。"), cut.lastIndexOf("；"));
  return (stop > 30 ? cut.slice(0, stop) : cut) + "…";
}

export const PROVIDERS_ZH: Record<string, ProviderZh> = {
  "australian-therapy-services": {
    ages: "儿童和青少年",
    services: [
      "言语和语言评估",
      "言语治疗",
      "作业治疗",
      "学习支持",
      "心理健康支持",
      "小组课程",
    ],
    description:
      "Australian Therapy Services 完全通过线上方式提供言语和语言治疗、作业治疗和学习支持，治疗师都在澳大利亚。曼谷的家庭预约课程的方式，和马来西亚、越南、澳大利亚的家庭完全一样，因此它是少数不受你住在城里哪个位置、也不受周二下午堵车影响的选择之一。\n\n机构由言语语言治疗师 Lorelle Evans 负责。课程的安排方便家长或班主任在旁观看，如果你希望把方法带回课堂，而不是只停留在治疗的那一小时里，这一点很重要。公布的服务时间是周一至周五 8:00至22:00，可以覆盖大多数曼谷学校的课表。\n\n线上治疗并不适合每个孩子。年龄很小的孩子、需要面对面作业治疗的孩子，以及难以坐在屏幕前的孩子，通常在治疗室里与治疗师面对面效果更好。它更适合年龄较大的孩子、阶段性的后续课程，以及住得离素坤逸一带诊所较远的家庭。",
  },
  "brainfit-thailand": {
    ages: "3至18岁",
    services: [
      "CognitiveMAP 评估",
      "BrainFit Junior，3至6岁",
      "BrainFit Scholar，7至18岁",
      "Fast ForWord 和 ClearFluency 语言课程",
      "注意力和书写课程",
      "假期课程",
    ],
    description:
      "BrainFit 为3至18岁的孩子开设结构化的认知训练课程，围绕注意力、记忆力、听力和动作协调展开，而不是学科辅导。孩子先做一次 CognitiveMAP 评估，再被分到合适的课程路径：幼儿阶段是以游戏为主的 BrainFit Junior，学龄阶段是 BrainFit Scholar，训练的是阅读和数学背后的基础能力。\n\n中心获得 Fast ForWord 和 ClearFluency 的使用授权，这两套都是成熟的电脑化语言和阅读课程，另外也开设较短的假期强化班。地点便利，从 BTS Ploenchit 站步行只要两分钟。",
    note: "这是一家商业性质的认知训练中心，不是临床或诊断机构。如果你想弄清楚孩子是否有阅读障碍、ADHD 或语言障碍，请先找评估机构或儿科医生，然后再决定是否把这类课程作为补充。",
  },
  "building-bridges-bangkok": {
    ages: "2岁至高中阶段",
    services: [
      "一对一 ABA 治疗",
      "校内支持和陪读",
      "上门课程",
      "远程诊疗课程",
      "小组治疗",
      "家长培训",
      "学校教职员培训和专业发展",
    ],
    description:
      "Building Bridges 把行为分析应用于沟通、社交技能、学习和情绪调节，服务对象是大约2岁至高中阶段的孩子。机构由国际认证行为分析师（BCBA）带领，这一点值得留意：BCBA 是国际通用的资格认证，有各自的督导和职业伦理要求，曼谷提供 ABA 的机构并不都有这样的人员。\n\n实际操作上，它的特点是服务方式灵活。同一套方案可以在他们位于 Khlong Tan Nuea 的诊所进行，也可以进入孩子的学校、到你家里，或通过远程方式进行。当孩子需要把支持推广到不同环境，而不是每周只在诊所里做一次时，这一点很重要。\n\n他们还为学校教职员提供培训和专业发展，所以如果孩子的学校愿意配合但技能不足，这也是帮助课堂团队尽快上手的途径之一。",
  },
  "care-child-professional-school": {
    ages: "0至26岁",
    services: [
      "早期强化干预，0至3岁",
      "入学准备，3至6岁",
      "个别化路径，6至18岁",
      "青年过渡衔接，18至26岁",
      "学校陪读支持",
      "面向其他机构的督导服务包",
      "培训工作坊",
    ],
    description:
      "CARE 开设以 ABA 为基础的课程，分为四个清晰的年龄段，从面向3岁以下孩子的强化早期干预，一直到面向26岁以下青年的过渡衔接课程。最后这一段在曼谷很少见。大多数机构只服务到离校年龄，年龄较大的青少年家庭常常发现选择很少。\n\n他们表示重视的是独立能力、生活技能和参与社区生活，而不是局限在诊所里的反复训练。督导会定期旁听课程，团队也用泰语和英语开展培训，所以对使用多种语言的家庭，以及需要指导的泰国学校教职员来说，是一个合理的选择。\n\n机构位于 Bang Kho Laem 的 Charoen Rat Road，在常见的素坤逸聚集区西南面。如果打算每周上好几次课，请把路程时间也考虑进去。",
  },
  "clue-ei-centre": {
    ages: "儿童、青少年和成人",
    services: [
      "言语和语言评估",
      "言语和语言干预",
      "到托儿中心、幼儿园和学校现场上课",
      "上门服务",
    ],
    description:
      "CLUE 是一家言语语言治疗机构，涵盖各类沟通困难：表达性和接受性语言、构音、听觉处理、言语失用症、嗓音、共鸣和流利度。团队由言语治疗师和受过训练的幼儿教育工作者组成，后者擅长与有额外需求（包括智力障碍）的孩子相处。\n\n家长最看重的一点是，他们可以上门或到现场服务。课程可以安排在托儿中心、幼儿园、学校或家里，而不是只能在诊所进行，这去掉了许多让家庭在几个月后悄悄放弃治疗的后勤麻烦。\n\n公布的服务时间是周一至周六 8:00至18:00，周日需预约。如果夫妻双方都要上班，周六可以预约是很实用的。",
  },
  "hope-center-for-learning": {
    ages: "5岁及以上",
    address: "Bang Chak，从 BTS Bang Chak 站1号出口步行很短一段路",
    services: [
      "英语授课的托管服务",
      "课业辅导",
      "小学阶段教学",
      "英文图书借阅",
      "室内游戏区",
    ],
    description:
      "Holistic Primary Education，简称 HoPE，是位于 Bang Chak 的一家小型家庭式学习中心，为5岁及以上的孩子提供英语授课的托管、辅导和小学阶段教学。创办人是一位母亲，她希望自己的孩子能以普通家庭负担得起的价格接受良好的英语教育。中心一直保持小规模：一间迷你图书室、一个学习区和一个室内游戏区，离 BTS 只有几步路。\n\n对于负担不起国际学校学费、主要需要英语支持和温馨轻松环境的家庭，值得去聊一聊。",
    note: "这是一家一般性的辅导和托管中心，不是专门的学习支持机构。中心没有宣传有受过特殊教育需求（SEN）培训的人员、治疗师或评估服务。如果孩子已经确诊有某种需求，报名前请直接询问他们在这方面有哪些经验。",
  },
  "isb-intensive-learning-center": {
    ages: "学龄，仅限在读学生",
    services: [
      "面向轻度至重度需求的学习支持项目",
      "安排进入 Intensive Learning Center",
      "小组教学",
      "协同教学和课堂内支持",
      "个别化教育计划",
      "校内提供言语治疗、作业治疗和心理服务",
    ],
    description:
      "ISB 的学习支持是分层级的。大多数有轻度或中度需求的学生，通过差异化教学、教学调整、协同教学和小组课程，在普通班级内得到支持。有智力或发育障碍、需要高度个别化课程的学生，则被安排在对应年级的班级，并在 Intensive Learning Center 接受专业教学，由受过培训的特殊教育教师和助教授课。\n\n这支校内团队是最大的吸引力：有认证的特殊教育教师，也有言语语言治疗师、作业治疗师和学校心理学家，全部是学校自己聘用，而不是外聘。曼谷很少有学校能在员工配置上达到这样的深度。\n\n名额有限，入学申请与普通招生是分开谈的，所以请尽早提出孩子的学习需求，不要等拿到录取通知之后再说。",
    note: "仅限在读的 ISB 学生。如果你是专门为这个项目考虑这所学校，申请之前请先联系招生办公室，了解学习支持的招生安排。",
  },
  "julia-gabriel-centre-bangkok": {
    ages: "6个月至小学阶段",
    services: [
      "PlayNest 和 PlayClub 幼儿早教课程",
      "言语与戏剧课程，托儿班和幼儿园阶段",
      "I Love Reading 阅读课程",
      "Let's Read and Write 读写课程",
      "普通话学习课程",
    ],
    description:
      "源自新加坡的 Julia Gabriel Centre 采用 EduDrama 教学法，把语言学习放进表演和游戏中。曼谷中心开设6个月起的早教课程、托儿班和幼儿园阶段的言语与戏剧课程、面向低年级小学生的阅读和写作课程，以及普通话课程。\n\n对于性格安静、不愿开口，或在口头表达自信上落后于同龄人的孩子，以戏剧为基础的课程确实能发挥作用。许多家庭把它当作学业辅导之外更温和的选择。",
    note: "言语与戏剧不是言语治疗。如果你担心孩子有言语或语言障碍，请去看言语语言治疗师。这里是兴趣拓展课程，两者常常因为英文里的 “speech”（言语）一词而被混淆。",
  },
  "kensington-learning-space": {
    ages: "4个月至11岁，另设成人课程",
    services: [
      "幼儿发展课程",
      "课后和周末课程",
      "STEAM、数学和语言",
      "舞蹈、美术和体育",
      "森林学校和水上运动课程",
      "假期营和工作坊",
    ],
    description:
      "Kensington Learning Space 是位于吞武里一侧的一家大型学习中心，建筑很有特色，开设面向4个月至11岁孩子的课程，涵盖舞蹈、美术、体育、STEAM、数学、语言、天文、水上运动和森林学校，另有假期营。这栋建筑本身获过设计奖，室内外空间对住在河西岸、厌倦了开车横穿全城的家庭来说是实实在在的吸引力。",
    note: "我们没有找到这里公布过任何专门的学习支持、特殊教育需求（SEN）服务或治疗服务。它出现在一些学习支持名单里，但据现有信息，它是一家综合性兴趣拓展中心。我们把它列出来，是为了让你不必再疑惑，并如实标注了它的性质。",
  },
  "leap-bangkok": {
    ages: "家长和家庭",
    services: [
      "家长互助指导",
      "转介评估师和治疗师",
      "讲座和工作坊",
      "非正式咖啡聚会",
    ],
    description:
      "LEAP 全称 Learning and Educational Advocacy Program，是由家长自己运营的支持和倡导小组，服务对象是有额外学习和发育需求的孩子的家庭。它把新手家长与走在前面的家长联系起来，为家庭指引评估师和治疗师，并举办关于学习困难、发育迟缓、感觉统合、注意力和孤独症的讲座、工作坊和非正式的咖啡聚会。\n\n这里不收费，也不提供临床服务。它给你的，是最难用钱买到的东西：其他家长已经摸索出哪项评估值得花钱，哪所学校真正兑现了承诺，以及怎样推动学校采取行动。",
    note: "请不要与同名同缩写的美国机构混淆，那家机构在佛罗里达州棕榈滩县运营，两者毫无关系。搜索结果经常把它们混在一起。",
  },
  "little-sprouts-childrens-centre": {
    ages: "12个月至11岁，部分专家也接待青少年",
    services: [
      "发育和心理评估",
      "言语和语言治疗",
      "作业治疗",
      "早期干预课程",
      "社交技能小组",
      "心理咨询和游戏治疗",
      "音乐治疗",
      "语言和读写课程",
      "融合式幼儿预备班",
      "到校服务",
    ],
    description:
      "Little Sprouts 是曼谷最接近“一站式”多学科儿童诊所的地方，外籍家长互相打听该从哪里入手时，提到最多的就是它的名字。评估、言语治疗、作业治疗、心理服务、早期干预、社交技能小组、音乐治疗和读写支持，都集中在 Thong Lo 5 的同一栋楼里。\n\n这一点比听上去更重要。当孩子同时需要言语治疗师、作业治疗师和教育心理学家时，他们在同一栋楼里意味着彼此会沟通，你不必自己把三份意见拼凑起来。\n\n服务以英语、泰语和普通话提供，团队里有在本地很难找到的领域受过培训的专家，包括喂养困难、运动性言语障碍、选择性缄默症和儿童言语失用症。他们也提供到校服务，治疗师可以在课堂上观察你的孩子。\n\n他们很受欢迎，也就意味着要排队。第一次打电话时就问清时间安排，不要想当然地认为下周就能开始。",
  },
  "merak-clinic": {
    ages: "儿童至成人",
    services: [
      "发育和行为评估",
      "早期干预",
      "家庭和夫妻咨询",
      "游戏治疗",
      "认知行为治疗",
      "音乐和艺术治疗",
      "应用行为分析（ABA）",
      "育儿技能培训",
      "学校咨询",
    ],
    description:
      "Merak 是一家多学科的儿童青少年心理健康诊所，处理发育、行为、情绪和学习方面的问题，团队涵盖心理学、治疗和行为分析。服务范围很广：面向幼儿的早期干预、游戏治疗和认知行为治疗、音乐和艺术治疗、ABA、育儿课程、家庭咨询和学校咨询，成人也可以就诊。\n\n由于同时涵盖发育和心理健康两方面，对于学习困难已经与焦虑、拒绝上学或家庭压力纠缠在一起的大孩子和青少年来说，这是一个合理的选择，而这种情况比大多数人想象的更常见。",
    note: "Merak 位于暖武里，在曼谷市区以北，不在曼谷市中心。对住在素坤逸或沙吞的家庭来说，这是一趟很远的路。固定每周一个时段之前，请先确认路程。",
  },

  "new-day-learning": {
    ages: "幼儿阶段至青少年",
    services: [
      "评估与测评",
      "作业治疗",
      "言语和语言治疗",
      "读写支持",
      "盲文教学",
      "早期干预",
      "青少年生活技能与教育",
      "英语作为附加语言",
      "泰语",
      "营队和兴趣小组",
      "专业发展培训",
    ],
    description:
      "New Day Learning 介于学校与诊所之间。它采用调整后的英国课程，以多感官教学法进行小班教学，同时在教学之外提供作业治疗、言语和语言治疗、读写支持和早期干预。青少年则有生活技能与教育课程。\n\n有两点值得了解。它持有泰国公共卫生部颁发的执照，执照编号为 10109002562；它也是经认可的 Pearson BTEC 考试中心，学生可以朝着获得认可的职业资格努力，而不是毕业时什么正式证书都没有。\n\n它也是曼谷为数不多提供盲文教学的地方，所以对于有视力障碍孩子的家庭，这里是最该先打电话问一问的地方。",
  },
  "no-limits": {
    ages: "幼儿阶段至学龄",
    services: [
      "Ready2Learn 小组课程",
      "在机构、家里和社区提供一对一专业支持",
      "家长培训和咨询",
      "学校工作坊和培训",
      "个别化学习者档案",
    ],
    description:
      "No Limits Community Services 是曼谷一家融合式支持中心，服务对象是有额外需求和发育差异的孩子。由专业人员带领的 Ready2Learn 课程为小学年龄的孩子提供小组环境，着重沟通、独立能力、游戏、社交联系和情绪调节。他们也在机构、家里和社区为孩子提供一对一专业支持，并根据每个孩子和家庭量身定制。",
  },
  "north-light-center": {
    ages: "新生儿至学龄",
    services: [
      "听力评估与检查",
      "助听技术咨询",
      "聆听和口语发展",
      "个别听力训练与言语康复",
      "强化语言发展课程",
      "家长教育与指导",
      "作业治疗发育刺激",
    ],
    description:
      "North Light 是专门服务失聪及听力障碍儿童的机构，对象从新生儿到学龄儿童。服务包括听力评估、助听技术指导、聆听和口语发展、个别听力训练与言语康复、强化语言课程，以及用于发育刺激的作业治疗，并且十分重视家长指导。\n\n这是一个范围很窄、但做得专业的领域，曼谷几乎没有其他类似的机构。如果新生儿听力筛查发现了问题，或者孩子已经配了助听器或植入了人工耳蜗，接下来需要做聆听和语言训练，可以向这里咨询。\n\n开放时间为周一至周五 9:00至17:00，周六 8:00至17:00。",
    note: "该机构的网站和服务均使用泰语。不会泰语的外籍家庭，首次就诊时可考虑请一位会泰语的朋友或口译陪同。",
  },
  "ris-learning-support": {
    ages: "学前班至12年级，仅限在读学生",
    services: [
      "心理与教育评估",
      "课堂内和抽离式学业支持",
      "个别学习目标",
      "与辅导员和学校心理学家协同的转介流程",
    ],
    description:
      "RIS 的学习支持项目覆盖学前班至12年级，服务对象是在阅读、写作或数学上有已确认困难的学生。进入项目并不随意：先通过转介触发一次完整的心理和教育评估，涵盖学生的学业、认知和社交情感状况，结果与家长和老师讨论之后，学生才会正式加入项目。退出也需要类似的评估。\n\n这套流程是真正的优点。它意味着支持是建立在数据上，而不是某位老师的直觉，也意味着孩子在不再需要时，不会被无限期留在支持项目里。",
    note: "仅限 RIS 在读学生。请在招生面谈时就说明孩子的学习需求，不要等入学后再提。",
  },
  "sen-tutors": {
    ages: "儿童和青少年",
    services: ["一对一特殊教育需求（SEN）辅导", "指导", "执行功能辅导"],
    description:
      "SEN Tutors 提供量身定制的一对一辅导和指导，导师熟悉神经多样性学生的教育，另有执行功能辅导，也就是计划、开始任务、管理时间和记住截止日期这些实际工作，常常让原本能力很强的青少年陷入困境。公布的服务范围包括孤独症、ADHD 特征、轻度学习困难、社交、情绪和心理健康需求、创伤和焦虑。每周七天都可以安排课程。",
    note: "我们无法通过独立来源核实这项服务的电话、电子邮箱或现行网站。预约前请像对待任何私人家教一样，先询问导师的资质并索取推荐人。",
  },
  "st-andrews-sukhumvit-107": {
    ages: "中学阶段和16岁以后",
    services: [
      "校园内的 Steps 职业培训中心",
      "学生经营的咖啡馆",
      "与主流学校并行的替代教育路径",
      "生活技能和过渡衔接支持",
    ],
    description:
      "St Andrews Sukhumvit 107 把 Steps 的职业培训模式带进了一所主流学校的校园，校内设有培训中心和咖啡馆，神经多样性学生可以走另一条路径，同时不必离开学校社区。这是泰国第一次把完整的 Steps 模式纳入更广泛的学术环境。\n\n它回答的正是让年长孩子的家长夜不能寐的问题：给小时候的孩子找到了治疗和学习支持，然后呢？这是对此作出的一次切实回应，一条贯穿中学阶段、最后落在生活技能和就业能力上的路，而不是孩子到了十六岁就面临悬崖。\n\n它对主流学生也有一种不那么显眼的影响：他们在这样的学校里长大，会觉得这一切再自然不过。",
  },
  "st-andrews-learning-support-services-centre": {
    ages: "小学和高中阶段，仅限在读学生",
    services: [
      "STARS 小学项目",
      "Embracing Differences 高中项目",
      "班级人数上限8人",
      "一对一学习支持助教",
      "言语和语言治疗",
      "作业治疗",
      "艺术和游戏治疗",
      "物理治疗",
      "感觉统合室和治疗空间",
    ],
    description:
      "St Andrews 开设两个相互衔接的专业项目：小学部的 STARS 和高中部的 Embracing Differences，让孩子在11岁时不会掉下支持的悬崖。班级人数上限为8人，配有一对一学习支持助教和 SEND 专业教师。\n\n跨专业团队是最突出的特点。言语和语言治疗师、作业治疗师、艺术治疗师、游戏治疗师和物理治疗师与教学人员并肩工作，而不是按小时外聘，校园里还有专门建造的感觉统合室、运动空间、治疗空间和无障碍教室。\n\n教学针对每个孩子学习的边缘水平展开，有意识地训练功能性和社交技能、社区参与，以及日后的职业机会，让技能能迁移到真实场景，而不是只停留在教室里。",
    note: "仅限 St Andrews 的在读学生。请专门联系招生团队咨询这些专业项目，因为录取与主流招生是分开的。",
  },
  steps: {
    ages: "青少年和青年",
    services: [
      "生活技能课程",
      "未来准备课程",
      "过渡到就业",
      "暑期课程",
      "作为培训工作场所的 Steps 咖啡馆",
      "商务服务中心",
      "为雇主和学校提供融合咨询",
      "ASDAN 和 BTEC 路径",
    ],
    description:
      "Steps 是曼谷的一家社会企业，围绕一个简单而顽固的问题而建：神经多样性的年轻人离开教育体系后，发现没有任何东西在等着他们。它的课程从生活技能、未来准备，一直到真正过渡到就业，并配有 ASDAN 和 BTEC 路径，让学生毕业时拿到获认可的资格。\n\n培训在机构自己运营的真实工作场所里进行，包括 Steps 咖啡馆和一个商务服务中心，这意味着学生是在真实的商业环境里面对真实的顾客练习，而不是模拟。Steps 也为雇主和学校提供融合方面的咨询，St Andrews Sukhumvit 107 就是这样引入了这套模式。\n\n它是经认证的 B Corporation（共益企业），也是 Valuable 500 的成员，工作语言为英语、泰语和日语。如果你家有青少年，开始考虑毕业之后怎么办，请尽早把它放进名单，不要等到最后一年。",
  },
  "sunshine-child-and-family-development-center": {
    ages: "儿童和家庭",
    services: ["游戏治疗", "早期干预", "心理咨询", "正向教养培训", "个别化课程"],
    description:
      "SunShine 关注孩子的心理健康，也关注孩子身边的家庭，把游戏治疗、早期干预和心理咨询，与有系统的正向教养培训结合起来，教看护人了解儿童发展、行为和基本的正向管教。\n\n值得特别指出的是教养这一块。看起来像孩子学习或行为问题的情况，有相当一部分会随着身边成年人回应方式的改变而改善，而曼谷很少有机构真正重视指导家长，而不是只治疗孩子。",
  },
  "dove-programme-elc": {
    ages: "3至11岁",
    services: [
      "4至6名孩子的小班",
      "沟通支持，包括辅助与替代沟通（AAC）、手语和视觉辅助",
      "情绪调节支持",
      "感觉处理支持",
      "日常生活技能",
      "为神经多样性学习者调整的安大略课程",
      "暑期课程",
    ],
    description:
      "Dove 属于 ELC The City School 学生服务与福祉体系的一部分，接收3至11岁、有较高支持需求的孩子，班级人数只有四到六人。由教育工作者、治疗师和残障领域专家组成的多专业团队以跨专业方式合作，也就是说，治疗目标融入学校的一天，而不是另外附加上去。\n\n沟通方面的支持相当扎实：辅助与替代沟通（AAC）、手语和视觉辅助都会使用，同时还有情绪调节、感觉处理和日常生活技能的训练。学业上遵循安大略课程，并为神经多样性学习者作了调整，功能性生活技能和社交发展与学业同等重要。\n\n四到六人的小班加上治疗师融入其中的团队，在曼谷接近主流学校的体系里，已经是强度最高的一类。他们还有暑期课程，是了解这种环境是否适合孩子的低承诺方式。",
  },
  "the-dyslexia-hub": {
    ages: "8至16岁",
    services: [
      "完整的阅读障碍诊断评估，全程线上进行",
      "15分钟线上阅读障碍筛查（不是正式诊断）",
      "向家长和学校收集背景信息",
      "附有家庭和学校建议的详细诊断报告",
      "课堂策略和后续步骤",
      "考试便利措施指导",
      "与家长就关切事项进行的初次沟通",
    ],
    description:
      "The Dyslexia Hub 为8至16岁的孩子提供全面的线上阅读障碍诊断评估，由合格的阅读障碍评估师依据英国阅读障碍协会（British Dyslexia Association）的指引和专业标准进行。\n\n评估完全在线上进行，孩子可以在自己家里舒适地接受评估。\n\n阅读障碍诊断评估的意义不止于判断是否有阅读障碍。它能让你详细了解孩子个人的学习特点，包括认知和读写方面的优势和困难。即使没有发现阅读障碍，评估结果也能给家长和老师提供有价值的参考，帮助他们了解孩子的学习需求，并规划适当的支持。\n\n评估从向家长和孩子的学校收集背景信息开始，以了解孩子的学习经历和目前的困难。评估之后，家庭会收到一份详细的诊断报告，其中有针对家庭和学校、切实可行且量身定制的建议，包括课堂策略、后续步骤，以及在适当时对考试便利措施的指导。\n\nThe Dyslexia Hub 还提供15分钟的线上阅读障碍筛查，适合不确定是否有必要做完整诊断评估的家庭。这个较短的筛查有助于发现阅读障碍的可能迹象，并判断是否需要进一步评估。筛查不能作为正式诊断。\n\n如果家长担心孩子的阅读、拼写或读写发展，或者不确定该做筛查还是完整的诊断评估，欢迎联系他们进行初次沟通，讨论你的顾虑和可行的下一步。",
  },
  "the-rainbow-room": {
    ages: "各年龄段的家庭、兄弟姐妹和个人",
    services: [
      "家长互助小组聚会",
      "兄弟姐妹支持和社交活动",
      "每月讲座",
      "关注家长自我成长与自我照顾的工作坊",
      "融合式游戏小组",
      "家庭活动",
      "借阅图书馆",
      "自我倡导课程",
    ],
    description:
      "The Rainbow Room 是一家非营利的神经多样性认知中心，由发育和行为差异人士的家长、家人和朋友创办并运营，涵盖唐氏综合征、孤独症、脑瘫、ADHD 和遗传性疾病等。它采用家长互助的模式：信息、经验和鼓励在家庭之间传递，而不是自上而下地灌输。\n\n活动范围比一个互助小组更广。除了定期的家长聚会和每月讲座，还有专门针对家长自身身心健康（而不是孩子）的工作坊、让不同年龄和能力的孩子与兄弟姐妹一起玩的融合式游戏小组、家庭活动、藏有书籍和研究资料的借阅图书馆，以及面向当事人本人的自我倡导课程。\n\n兄弟姐妹的支持值得特别一提。兄弟姐妹承担了很多，却很少有地方可以让他们把重担放下。",
    note: "我们查看时，他们网站的安全证书已经过期，所以浏览器可能会弹出警告。打电话或发邮件是可靠的联系方式。",
  },
  "the-village-international-education-centre": {
    ages: "2岁至19岁及以上",
    services: [
      "幼儿阶段和小学",
      "初中和高中",
      "ASDAN 生活技能课程",
      "COPE Award 和 GED 路径",
      "回归主流学校的过渡课程",
      "言语和语言治疗",
      "作业治疗",
      "行为支持",
      "教育心理学和阅读障碍评估",
    ],
    description:
      "The Village 是位于素坤逸 42 巷的一所完整的特殊教育学校，招收2岁至19岁及以上的青年，围绕个别化教育方案而建，服务那些在主流学校里遇到困难的孩子。学校教授英国国家课程，同时开设 ASDAN 生活技能、COPE Award 和美国 GED 路径，并在校内提供言语和语言治疗、作业治疗、行为支持、教育心理学和阅读障碍评估。\n\n它比较实用的特色之一是过渡课程，面向需要先集中解决某些具体困难、之后再回到主流学校的孩子，而不是把转入特殊教育看作永久性的。\n\n校长 Harshi Sehmar 因近三十年投身特殊教育，于2024年被英王查尔斯三世授予 MBE 勋章。学校的工作语言为英语、泰语和日语。",
  },
  "speech-station": {
    ages: "儿童至成人",
    services: [
      "言语治疗",
      "语言发展",
      "作业治疗",
      "运动技能训练",
      "家长指导",
      "社交情绪小组治疗",
      "成人嗓音治疗，包括声音嘶哑",
      "口吃治疗",
      "中风后康复（失语症、言语失用症）",
      "跨性别嗓音治疗",
    ],
    description:
      "Speech Station 把言语治疗和作业治疗结合起来，处理言语、语言、沟通、运动技能和发育里程碑方面的问题，除个别治疗外，还有家长指导和社交情绪小组课程。服务对象从儿童到成人，使用泰语和英语。\n\n对成人，它还提供嗓音治疗，涵盖声音嘶哑、口吃、中风后失语症和言语失用症的康复，以及跨性别嗓音治疗，所以对家长本人也可能是一个有用的联系方式。\n\n它对本目录的价值在于地理位置。这里几乎所有选择都集中在素坤逸一带，住在吞武里和城市西侧的家庭，为了一节四十五分钟的课程，往往要单程花上一个小时。如果你住在那一带，Bang Khae 是一个现实的替代选择。",
  },
  "english-speech-therapy-bkk": {
    ages: "儿童至成人",
    services: [
      "根据档期和专长，转介给说英语的言语语言治疗师",
      "言语、语言和沟通支持",
      "通过个别成员提供私人治疗",
    ],
    description:
      "English Speech Therapy BKK 是一个由说英语的言语语言治疗师（SLT）组成的专业网络，成员分布在曼谷和泰国各地。大多数成员在国际学校和诊所工作，部分也提供私人治疗。网络根据成员的档期和专长，在成员之间分享转介和咨询，从而为家庭对接合适的治疗师。\n\n它不是单一的治疗机构，所以没有一家诊所可以去。你只需说明孩子的需求，网络会帮你找到合适的治疗师，提供言语、语言和沟通方面的支持。",
  },
  "samitivej-special-needs-child-center": {
    ages: "婴儿期至青少年期",
    services: [
      "心理评估",
      "脑电图（EEG）和 TOVA 注意力测试",
      "言语治疗",
      "作业治疗",
      "音乐、艺术和游戏治疗",
      "发育和行为治疗",
      "社交技能训练",
      "神经反馈和生物反馈，仅限 Srinakarin 院区",
      "用于早期发育的儿童发展与学习中心",
    ],
    description:
      "Samitivej 在 Sukhumvit 和 Srinakarin 两个院区同时设有特殊需求儿童中心和儿童发展与学习中心，由精神科医生、心理学家、治疗师和特殊教育教师组成团队。两者合起来涵盖正式诊断、心理评估、脑电图、TOVA 注意力测试，以及随后的治疗：言语、作业、音乐、艺术和游戏治疗，加上社交技能训练。Srinakarin 院区另提供神经反馈和生物反馈。\n\n之所以建议从这里而不是私人机构开始，原因在于诊断。医院儿科精神科医生出具的报告，对学校、保险公司以及日后的考试机构都有分量，这是非正式意见比不了的。两个院区每天 7:00至20:00 开诊，英语是标准服务语言。",
    note: "私立医院收费。请先向保险公司确认，因为许多外籍人士的保险即使覆盖医院本身，也不包括发育评估和治疗。",
  },
  "bangkok-hospital-child-development": {
    ages: "儿童和青少年",
    services: ["发育与行为儿科评估", "心理咨询", "治疗和用药管理"],
    description:
      "Bangkok Hospital 的发育行为儿科医生可以评估、咨询和治疗范围很广的问题：包括阅读障碍以及书写和数学困难在内的学习障碍、ADHD 和对立行为、抽动症和妥瑞氏症、孤独症谱系障碍和脑瘫、言语、语言和运动发育迟缓，还有睡眠、喂养和如厕训练这些日常却让人疲惫的问题。\n\n当你还不确定面对的是什么，需要先听医学意见再决定走哪条治疗路径时，这里是个不错的第一站。门诊每天 8:00至16:00 开放，提供英语服务。",
    note: "私立医院收费。首次就诊前请先确认保险的赔付范围。",
  },
  "manarom-hospital-child-adolescent": {
    ages: "婴儿期至18岁",
    services: [
      "精神科和心理评估",
      "ADHD、孤独症和发育迟缓的治疗",
      "情绪、焦虑和行为障碍的治疗",
      "家庭咨询",
      "药物咨询",
    ],
    description:
      "Manarom 是一家专科精神病院，其儿童青少年服务面向婴儿期至18岁，由儿童青少年精神科医生、心理学家和社工组成团队。服务内容包括精神科和心理评估、ADHD、孤独症和发育迟缓、情绪和焦虑障碍、行为障碍、家庭咨询和药物治疗。\n\n因为精神科是这家医院的本业，而不是众多科室中的一个，所以当学习困难伴随着更严重的问题时，比如严重焦虑、拒绝上学、抑郁，或在家里已经难以管理的行为，转诊到这里是合适的。提供英语服务。",
  },
  "rajanukul-institute": {
    ages: "出生至18岁",
    services: [
      "智力障碍的诊断和治疗",
      "学习障碍门诊",
      "唐氏综合征门诊",
      "遗传咨询",
      "早期干预，0至6岁",
      "家长管理培训",
      "特殊教育部",
      "医学康复部",
    ],
    description:
      "Rajanukul 是泰国国立的智力障碍儿童专门机构，隶属心理健康厅。它设有面向出生至18岁、有智力障碍、学习障碍以及情绪或行为困难的儿童的门诊，另有唐氏综合征、遗传咨询和学习障碍专科门诊，面向0至6岁儿童的早期干预服务，家长管理培训，以及自己的特殊教育部和医学康复部。\n\n它被收入本目录，是因为一个别处无法比拟的理由：费用。在曼谷，私立评估和治疗动辄要花几万泰铢，许多泰国和外国家庭根本负担不起。Rajanukul 是公立途径，而且是一家有研究和培训职能的正规机构，不是万不得已才去的地方。",
    note: "服务以泰语提供，等候时间可能很长。请带一位会泰语的朋友或口译同行。外国籍人士请提前致电，确认是否符合就诊条件以及需要携带哪些文件。",
  },
};
