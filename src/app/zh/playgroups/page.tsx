import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import PlaygroupsDirectoryZh from "@/components/zh/PlaygroupsDirectoryZh";
import { zhPlaygroups } from "@/lib/zh/playgroups";
import { zhMetadata } from "@/lib/i18n";
import { COMMON_ZH } from "@/lib/zh/common";

const SITE = "https://www.bkkfamilies.com";

const TITLE = "曼谷亲子游戏小组";
const DESCRIPTION =
  "我们能找到的曼谷婴幼儿游戏小组，日期、时间、年龄和价格都对照机构自己的页面核实过。可按星期、孩子年龄、区域和语言筛选。";

export const metadata: Metadata = zhMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: "/playgroups",
});

const LISTED = zhPlaygroups();
const CONFIRMED = LISTED.filter((p) => p.status === "confirmed").length;

const FAQ = [
  {
    q: "曼谷的游戏小组收费多少？",
    a: "大多数自由参加的游戏小组每次收费200至500泰铢，通常按每个家庭或每名儿童加一名成人计算。少数学校的游戏小组免费，而森林学校或音乐课这类专项课程大约是1,000至1,250泰铢。像 Harrow 的 Lion Cubs 这样的学期项目按年收费，性质完全不同。",
  },
  {
    q: "可以让保姆带孩子去游戏小组吗？",
    a: "通常可以，但并非处处如此。Shrewsbury 的游戏小组要求家长或祖父母出席，不接受保姆单独带孩子，另有几处场地每个家庭只允许一名成人入场。凡有此类规定的游戏小组，我们都在它的页面上注明。",
  },
  {
    q: "宝宝几岁可以开始参加游戏小组？",
    a: "有几个游戏小组从出生起就接收宝宝，包括 Ascot 的 Little Lion、St Andrews 的 Little Bunnies、Kira Kira 和 Christ Church 的小组，还有少数从六个月或八个月起招收。大多数面向一至三岁的孩子。三至五岁的选择就少了：Bangkok Prep 的 Big Pups、Firefly Forest 的 Saturday Explorers、Wycombe Abbey 的 Little Doves 和 Neilson Hays 的周六故事时间是主要的选项。",
  },
  {
    q: "周末有游戏小组吗？",
    a: "有，但比工作日少得多。请在“星期”筛选里选择“周末”。Bangkok Prep、Kids Kingdom Ruamrudee、Annabel's、HEI 的 Music Club、Firefly Forest 和 Kids' Academy Ekkamai 都有周六场次，沙吞还有一个家长自办的周六游戏小组，每月一次。",
  },
  {
    q: "学校假期和空气污染严重的日子，游戏小组还开吗？",
    a: "大多数学校办的游戏小组跟随学期安排，假期停办，所以十月的期中假、圣诞节、泼水节（宋干节）和漫长的暑假前后请先确认。每年12月至次年3月，一些游戏小组在 PM2.5 偏高的日子也会取消，出门前请先核实。",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "zh-Hans",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: `${SITE}/zh` },
      { "@type": "ListItem", position: 2, name: "亲子游戏小组", item: `${SITE}/zh/playgroups` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: TITLE,
    inLanguage: "zh-Hans",
    numberOfItems: LISTED.length,
    itemListElement: LISTED.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${SITE}/zh/playgroups/${p.slug}`,
    })),
  },
];

export default function ZhPlaygroupsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="婴幼儿"
        title="曼谷亲子游戏小组"
        subtitle={`全市共${LISTED.length}个游戏小组，列出真实的日期、时间、年龄和价格。其中${CONFIRMED}个已对照机构自己的页面确认本学期仍在举办。`}
        color="teal"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            带着幼儿待在曼谷的户外并不轻松。天气炎热，常常下雨，人行道像障碍赛场，一年里有一半的时间空气质量也不理想。所以游戏小组在这里比在老家更重要：宝宝在这里认识其他宝宝，新手父母在这里认识彼此，很多家庭也是在这里第一次看到孩子日后就读的学校内部。
          </p>
          <p>
            麻烦在于信息很分散。学校把游戏小组藏在招生页面深处，家长社群把日历放在各自的预约网站上，网上的大部分列表已经过时一两年。我们逐个核对了一遍。您可以按自己有空的日子、孩子的年龄和居住的区域筛选，每张卡片都会显示举办时间、适合谁以及收费多少。
          </p>
          <p>
            标注为<strong>本学期已确认</strong>的，我们已在机构自己的最新页面或实时预约日历上读到了信息。标注为<strong>出行前请先核实</strong>的，是确实在办的游戏小组，但它最新公布的信息比较旧，或来自其他列表，请先联系对方。没有任何机构为上榜付费。
          </p>
          <p>
            您会注意到，有些游戏小组的预约直接链接到一个叫 BAMBI 的社群。BAMBI 是一个值得信赖的社群，帮助组织曼谷各地的许多游戏小组。
          </p>
        </div>

        <div id="directory" className="mt-12 scroll-mt-28">
          <PlaygroupsDirectoryZh />
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-teal-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            想通过游戏小组来选学校？
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            学校的游戏小组是从内部了解早期教育部门、结识老师、和在读家长聊聊的最便宜、压力最小的方式。我们的学校目录涵盖一百多所曼谷国际学校的学费、课程体系和年龄范围。
          </p>
          <Link
            href="/zh/schools"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            浏览学校目录
          </Link>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-purple-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            除了游戏小组，也想认识其他妈妈？
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            游戏小组是为小朋友准备的，但家长也需要自己的圈子，尤其是在一座新城市生活的第一年。The Village 是一个 WhatsApp 社群，在泰国的妈妈们在里面分享推荐、提问和交朋友，并在曼谷举办仅限妈妈参加的聚会。
          </p>
          <a
            href="https://thevillage.mom"
            target="_blank"
            rel="noopener"
            className="mt-4 inline-block rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            访问 The Village（英文）
          </a>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">家长常问的问题</h2>
          <div className="mt-6 space-y-4">
            {FAQ.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <h3 className="font-heading font-bold text-purple-dark">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            您在办游戏小组，或者发现我们漏掉了某一个？
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            游戏小组每个学期都会变化。如果您的时间或价格有变，您的游戏小组没有列出，或这里有任何错误，请告诉我们，我们会更正。上榜永远免费。
          </p>
          <Link
            href="/contact"
            lang="en"
            hrefLang="en"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            提交更正（联系页为英文）
          </Link>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs text-neutral-400">
          {COMMON_ZH.translationNote}{" "}
          <Link href="/playgroups" lang="en" hrefLang="en" className="underline">
            {COMMON_ZH.backToEnglish}
          </Link>
        </p>
      </div>
    </>
  );
}
