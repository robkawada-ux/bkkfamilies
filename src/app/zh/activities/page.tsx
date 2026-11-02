import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import ActivitiesDirectoryZh from "@/components/zh/ActivitiesDirectoryZh";
import { ZH_ACTIVITIES } from "@/lib/zh/activities";
import { zhMetadata } from "@/lib/i18n";
import { COMMON_ZH } from "@/lib/zh/common";
import { SITE } from "@/lib/seo";

const TITLE = "曼谷亲子活动：周末去哪里玩与儿童课程";
const DESCRIPTION =
  "曼谷的亲子出游去处和每周课程，从室内游乐场、水族馆、博物馆到游泳、足球和舞蹈，附真实的开放时间、适合年龄和价格。下雨或雾霾天可以只看室内选项。";

export const metadata: Metadata = zhMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: "/activities",
});

const DAYS_OUT = ZH_ACTIVITIES.filter((a) => a.type === "Day out").length;
const CLASSES = ZH_ACTIVITIES.filter((a) => a.type === "Weekly class").length;

const FAQ = [
  {
    q: "下雨天在曼谷可以带孩子去哪里？",
    a: "在上方的目录里勾选“只看室内”。曼谷的商场承担了大部分室内去处：HarborLand、Playmondo 和 MELAND 是大型室内游乐场，Siam Paragon 地下有 SEA LIFE，BOUNCE 有蹦床，WOW Park 有动手科学。同一份清单也适用于12月至3月的雾霾天，以及4月、5月最热的下午。",
  },
  {
    q: "在曼谷有哪些免费的亲子去处？",
    a: "把价格筛选设为“免费”。公园（Lumpini 公园内有免费的儿童图书馆，还有 Benjakitti 公园）、泰国皇家空军博物馆、BACC、15岁以下儿童免费的 MOCA，以及周末市集都不收费，Museum Siam 历来也让15岁以下儿童免费入场。两家儿童探索博物馆原本也免费，但都已于2026年10月1日关闭，市政府正在遴选新的运营方。",
  },
  {
    q: "曼谷的 KidZania 还开着吗？",
    a: "没有了。Siam Paragon 的 KidZania Bangkok 已永久关闭。Siam Paragon 5楼新开了大型室内主题乐园 MELAND，设有角色扮演小镇，是目前最接近它的选择。",
  },
  {
    q: "曼谷的室内游乐场一般多少钱？",
    a: "每名儿童大约 200至800 泰铢，通常可玩两三个小时，成人要么收取较低费用，要么免费。较小的亲子咖啡馆和社区游乐中心处于价格区间的低端，而 MEGA HarborLand、Playmondo CentralWorld 和 MELAND 这类大型商场游乐场则处于高端。",
  },
  {
    q: "曼谷的每周课程是怎么收费的？",
    a: "大多数游泳学校、体操俱乐部和足球学院按学期或按一整套课时出售，而不是单节售卖，游泳一个学期通常在 6,000至11,000 泰铢之间。许多机构会先提供免费或低价的试听课，值得主动询问。课程通常在学校假期暂停，改为开设假期营，详见我们的假期营目录。",
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
      { "@type": "ListItem", position: 2, name: "亲子活动", item: `${SITE}/zh/activities` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "曼谷亲子活动",
    inLanguage: "zh-Hans",
    numberOfItems: ZH_ACTIVITIES.length,
    itemListElement: ZH_ACTIVITIES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.name,
      url: `${SITE}/zh/activities/${a.slug}`,
    })),
  },
];

// Links to pages that exist in Chinese go to /zh; the rest go to the English page.
const ALSO: { href: string; title: string; desc: string; en?: boolean }[] = [
  {
    href: "/zh/playgroups",
    title: "亲子游戏小组",
    desc: "按星期、年龄和区域查找婴幼儿游戏小组。",
  },
  {
    href: "/zh/camps",
    title: "假期营",
    desc: "按孩子放假的日期筛选营期。",
  },
  {
    href: "/blog/top-museums-for-kids-in-bangkok",
    title: "适合孩子的博物馆（英文）",
    desc: "哪些开放、收费多少、哪些目前关闭。",
    en: true,
  },
  {
    href: "/blog/9-things-to-do-in-bangkok-with-kids",
    title: "我们家最爱的9件事（英文）",
    desc: "我们自己家的最爱，附上坦诚的小提示。",
    en: true,
  },
];

export default function ZhActivitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="出游去处与每周课程"
        title="曼谷亲子活动：周末去哪里玩"
        subtitle={`${DAYS_OUT}个出游去处和${CLASSES}个每周课程，附真实的开放时间、适合年龄和价格。天气转坏时，可以只看室内选项。`}
        color="green"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            每个曼谷家长都熟悉周六早上的那个问题：气温34度，说不定还会下雨，孩子们已经在家里坐不住了，那今天去哪儿？这份清单，是我们在孩子还小的时候最希望拥有的。想要一个计划，就看出游去处；想要固定的节奏，就看每周课程；天气或空气让人别无选择的时候，就用室内筛选。
          </p>
          <p>
            每张卡片都标有适合年龄、价格和所在的区域。某个地方目前关闭，我们会直接写明，而不是悄悄把它删掉；价格没有公布，我们也会照实说明，而不是猜测。曼谷的价格变动频繁，大型景点尤其如此，所以请把价格当作参考，出发前再确认一次。没有人需要付费才能被收录。
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ALSO.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              {...(l.en ? { lang: "en", hrefLang: "en" } : {})}
              className="rounded-xl border border-black/5 bg-teal-50 p-4 transition hover:shadow-md"
            >
              <p className="font-heading font-bold text-purple-dark">{l.title}</p>
              <p className="mt-1 text-sm text-neutral-600">{l.desc}</p>
            </Link>
          ))}
        </div>

        <div id="directory" className="mt-12 scroll-mt-28">
          <ActivitiesDirectoryZh />
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
            您经营一项活动，或者知道我们漏掉的地方？
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            如果您的时间或价格有变动、您的场地或课程没有被收录，或者这里有任何错误，请告诉我们，我们会改正。收录永远免费。
          </p>
          <Link
            href="/contact"
            lang="en"
            hrefLang="en"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            发送更正（联系页为英文）
          </Link>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs text-neutral-500">
          {COMMON_ZH.translationNote}{" "}
          <Link href="/activities" lang="en" hrefLang="en" className="underline">
            查看英文版
          </Link>
        </p>
      </div>
    </>
  );
}
