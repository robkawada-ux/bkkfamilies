import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CampsDirectoryZh from "@/components/zh/CampsDirectoryZh";
import { CAMPS, upcomingSessions } from "@/lib/camps";
import { CAMPS_ZH } from "@/lib/zh/camps";
import { COMMON_ZH } from "@/lib/zh/common";
import { zhMetadata } from "@/lib/i18n";

const TITLE = "曼谷假期营";
const DESCRIPTION =
  "我们能核实到的曼谷学校假期营，日期、年龄和价格都是真实的。按孩子实际放假的那一周来筛选。";

export const metadata: Metadata = zhMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: "/camps",
});

// Re-render hourly so camps drop off the day after they finish.
export const revalidate = 3600;

const SITE = "https://www.bkkfamilies.com";

const FAQ = [
  {
    q: "曼谷的学校什么时候放假？",
    a: "没有统一的答案，所以本目录按日期而不是按假期名称来筛选。仅十月半学期假，不同学校就分成两个不同的星期；春假则分布在全市五周之内。我们的学校假期页面（目前仅有英文版）列有各校已核实的日期。",
  },
  {
    q: "一个假期营大概要多少钱？",
    a: "国际学校的全日营，含午餐，每周大约9,000至15,000泰铢是常见范围。低于这个价位的，通常是幼儿园或半日营。远高于这个价位的，则是专项课程、外来机构或品牌溢价。很少有机构公布价格，有的我们都列出来了。",
  },
  {
    q: "要在这所学校就读才能参加它的营吗？",
    a: "通常不需要。曼谷国际学校的营大多向任何学校的孩子开放，有几个还主动面向校外家庭招生。预订时最好再确认一下，因为个别项目会优先录取本校学生。",
  },
  {
    q: "为什么有些营写着“尚未重新公布”？",
    a: "营地机构公布日期往往很晚，常常只提前四到六周。与其把每年都会开办的营隐藏起来，我们会列出它上次举办的日期并清楚标明。这能告诉您该关注谁，也比一个空页面有用。",
  },
  {
    q: "什么时候订比较好？",
    a: "泼水节营和暑假营值得在1月就订，一方面是它们与出行旺季重叠，另一方面是暑假项目开放报名早，并有早鸟价。十月和春季半学期假的营，通常提前四到六周预订即可。",
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
      {
        "@type": "ListItem",
        position: 2,
        name: "假期营",
        item: `${SITE}/zh/camps`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    inLanguage: "zh-Hans",
    name: "曼谷假期营机构",
    numberOfItems: CAMPS.filter((c) => CAMPS_ZH[c.slug]).length,
    itemListElement: CAMPS.filter((c) => CAMPS_ZH[c.slug]).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${SITE}/zh/camps/${c.slug}`,
    })),
  },
];

export default function CampsPageZh() {
  const sessions = upcomingSessions();
  const weeks = sessions.filter((s) => CAMPS_ZH[s.camp.slug]);
  const camps = new Set(weeks.map((s) => s.camp.slug));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="学校假期，一次理清"
        title="曼谷假期营"
        subtitle={`日期、年龄和价格都是真实的。共 ${camps.size} 家机构的 ${weeks.length} 个营期，逐一核对并如实描述。`}
        color="purple"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            曼谷的假期营季节总是手忙脚乱：日期公布得晚，价格很少公开，您搜到的信息有一半是去年的，而真正需要知道的那件事，也就是自家孩子哪几周放假，又和隔壁家不一样。
          </p>
          <p>
            所以这个目录是按日期而不是按季节名称来编排的。每一条是一个营期：什么时候开、适合谁、多少钱、在哪里。按您需要的那一周和孩子的年龄筛选，大约三十秒就能得到一份候选名单。
          </p>
          <p>
            这里没有人付费上榜。价格没有公布的，我们会如实说明，而不是猜测。某个营每年都会开办、但今年的日期还没公布的，我们会列出它上次举办的日期并清楚标明，因为知道该关注谁，比一份更短的名单更有用。
          </p>
        </div>

        <div id="directory" className="mt-12 scroll-mt-28">
          <CampsDirectoryZh sessions={sessions} />
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-teal-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            不确定孩子哪一周放假？
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            曼谷各国际学校的假期并不一致。十月半学期假，不同学校分成两个不同的星期；春假则分布在全市五周之内。我们逐校查阅校历，您不必自己去查。
          </p>
          <Link
            href="/school-breaks"
            hrefLang="en"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            查看学校假期日期（英文页面）
          </Link>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            家长常问的问题
          </h2>
          <div className="mt-6 space-y-4">
            {FAQ.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <h3 className="font-heading font-bold text-purple-dark">
                  {f.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            您在办营，或发现我们漏了某个营？
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            这个目录只有保持最新才有用。如果您的日期有变、您的营没有列出，或者这里有错误，请告诉我们，我们会更正。收录永远免费。
          </p>
          <Link
            href="/zh/contact"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            发送更正
          </Link>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs text-neutral-500">
          {COMMON_ZH.translationNote}{" "}
          <Link href="/camps" lang="en" hrefLang="en" className="font-semibold text-purple underline">
            {COMMON_ZH.backToEnglish}
          </Link>
        </p>
      </div>
    </>
  );
}
