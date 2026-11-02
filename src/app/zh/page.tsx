import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { zhMetadata } from "@/lib/i18n";

const TITLE = "BKK Families 曼谷家庭指南";
const DESCRIPTION =
  "为在曼谷生活的家庭整理的国际学校、亲子游戏小组、假期营、亲子活动和学习支持信息，价格、时间和年龄都对照机构自己的页面核实过。";

export const metadata: Metadata = zhMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: "/",
});

const SECTIONS = [
  {
    href: "/zh/schools",
    title: "国际学校",
    text: "按区域、课程体系和预算浏览曼谷的国际学校，附学校自己公布的学费和学期日期。",
    cls: "border-teal bg-teal-50",
  },
  {
    href: "/zh/playgroups",
    title: "亲子游戏小组",
    text: "按星期、孩子年龄、区域和语言筛选曼谷的婴幼儿游戏小组。",
    cls: "border-teal bg-teal-50",
  },
  {
    href: "/zh/camps",
    title: "假期营",
    text: "学校假期里的日营和住宿营，按日期、年龄和主题查找。",
    cls: "border-green bg-green-50",
  },
  {
    href: "/zh/activities",
    title: "亲子活动",
    text: "周末和雨天去哪里玩，以及适合孩子的每周课程。",
    cls: "border-orange bg-orange-50",
  },
  {
    href: "/zh/learning-support",
    title: "学习支持",
    text: "语言治疗、教育心理、辅导和其他支持机构。",
    cls: "border-purple bg-purple-50",
  },
] as const;

export default function ZhHome() {
  return (
    <>
      <PageHero
        color="purple"
        eyebrow="曼谷家庭指南"
        title="在曼谷带孩子，信息一站查全"
        subtitle="BKK Families 自2012年起为曼谷的外籍家庭和泰国家庭整理本地信息。这里是中文版，目前涵盖国际学校、游戏小组、假期营、亲子活动和学习支持。"
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`rounded-xl border-2 p-6 transition hover:-translate-y-0.5 hover:shadow-md ${s.cls}`}
            >
              <h2 className="font-heading text-xl font-bold text-purple-dark">{s.title}</h2>
              <p className="mt-2 text-sm text-neutral-700">{s.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-purple">查看全部 →</span>
            </Link>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm text-neutral-600">
          中文版由英文原版翻译而成，信息以英文版为准。医疗保健和文章目前仅有英文版，
          <Link href="/" lang="en" hrefLang="en" className="font-semibold text-purple underline">
            点击查看英文网站
          </Link>
          。
        </p>
      </section>
    </>
  );
}
