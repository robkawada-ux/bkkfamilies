import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import LearningSupportDirectoryZh from "@/components/zh/LearningSupportDirectoryZh";
import { PROVIDERS } from "@/lib/learningSupport";
import { PROVIDERS_ZH } from "@/lib/zh/learningSupport";
import { zhMetadata, zhPath } from "@/lib/i18n";
import { SITE } from "@/lib/seo";

const TITLE = "曼谷学习支持机构目录";
const DESCRIPTION =
  "曼谷的学习支持、评估、治疗和特殊教育需求机构目录，并附上从哪里开始的通俗指引。";

export const metadata: Metadata = zhMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: "/learning-support",
});

const LISTED = PROVIDERS.filter((p) => PROVIDERS_ZH[p.slug]);

const FAQ = [
  {
    q: "学校说孩子没问题，可我并不放心，该怎么办？",
    a: "学校看到的只是孩子的一个侧面，而你看到的，往往是放学回家后筋疲力尽的那一面。你不需要征得学校同意才能找独立机构做评估，也不必告诉学校你正在做。如果评估确认了孩子的需求，这份报告就是学校必须回应的依据。",
  },
  {
    q: "评估、治疗和辅导有什么区别？",
    a: "评估告诉你发生了什么，并出具一份报告。治疗针对的是底层的能力，比如言语、动作控制、情绪调节或行为，通常由持证的临床人员提供。辅导教的是孩子落后的学科内容。三者不能互相替代，问题其实是语言障碍却花钱请人辅导，会白白耽误好几年。",
  },
  {
    q: "大概要花多少钱？",
    a: "曼谷的私立评估通常要花几万泰铢，之后每周的治疗费用也累积得很快。大多数外籍人士的医疗保险，即使医院在保险网络内，也不包括发育评估和治疗，所以预约之前请先查看保单条款。Rajanukul Institute 是公立途径，费用低得多，但服务以泰语提供，等候时间也更长。",
  },
  {
    q: "孩子一定需要诊断吗？",
    a: "要获得支持不一定需要，但凡是正式的事项通常都需要。考试便利措施（例如延长时间）、进入专门项目的名额，以及保险理赔，一般都需要由合格评估师出具报告。如果孩子即将参加 IGCSE 或 A Level，请在考试季之前很早就把评估做好，不要拖到考试前的那个学期。",
  },
  {
    q: "预约之前应该问机构什么？",
    a: "你们的工作人员有什么资质，由谁来注册管理。有多少和我孩子情况类似的孩子你们服务过。你们会衡量什么，我们怎么知道有没有效果。你们会和孩子的学校沟通吗。如果三个月后没有效果会怎么办。值得信赖的机构，这五个问题都会爽快作答。",
  },
  {
    q: "孩子已经是青少年了，是不是太晚了？",
    a: "不晚，但目标会变。对大一点的青少年，价值最高的往往是执行功能指导、考试便利措施，以及为就业或升学做的过渡规划，而不是补救早年的技能。Steps 和 CARE 都开设面向青年的课程，这在曼谷并不多见。",
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
      { "@type": "ListItem", position: 1, name: "首页", item: `${SITE}${zhPath("/")}` },
      {
        "@type": "ListItem",
        position: 2,
        name: "学习支持",
        item: `${SITE}${zhPath("/learning-support")}`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "曼谷学习支持机构",
    numberOfItems: LISTED.length,
    itemListElement: LISTED.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${SITE}${zhPath(`/learning-support/${p.slug}`)}`,
    })),
  },
];

const STEPS = [
  {
    t: "写下你实际看到的情况",
    d: "具体、带日期的例子，胜过笼统的印象。读完一行就找不到读到哪了。每周二和周四放学后情绪崩溃。看不清黑板，抄不下来。好的评估师最先会要这份清单，它也是让学校认真对待你的依据。",
  },
  {
    t: "和学校谈，并要求书面回复",
    d: "曼谷大多数国际学校都有一定的学习支持。问问他们已经注意到了什么，课堂上能提供什么支持，由谁来统筹。请他们用电子邮件回复，这样就有记录。",
  },
  {
    t: "情况不明朗时，先做评估",
    d: "想要医学意见，找儿科医生或儿童精神科医生；想了解学习特点，找教育心理学家或专业评估师。很多家庭最常跳过这一步，而这一步从长远看最能省钱。",
  },
  {
    t: "然后再选择干预方式，不要提前",
    d: "治疗、专业教学、换一所学校，或者只是让现有学校做更好的调整，评估会告诉你该选哪一个。先选方案后评估，正是不少家庭走了两年、花了几十万泰铢还在错误道路上的原因。",
  },
  {
    t: "去找其他家长",
    d: "The Rainbow Room 和 LEAP Bangkok 就是为此而设，都免费，比任何搜索都更能帮你节省时间。到我们的 Facebook 社群里提问也一样，很多家庭已经走过你正在走的路。",
  },
];

export default function ZhLearningSupportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="你并不孤单"
        title="曼谷学习支持机构目录"
        subtitle={`评估、治疗、特殊教育学校和家长支持，尽在一处。共 ${LISTED.length} 家机构，信息经过核实，介绍如实。`}
        color="purple"
        image="/images/learning-support/mother-comforting-son-bangkok-park.jpg"
        imageAlt="曼谷公园里，一位母亲蹲下来拥抱年幼的儿子，两人都很平静，背后是湖水和树木。"
      />

      <div className="border-b border-black/5 bg-neutral-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-5 sm:flex-row sm:justify-between">
          <p className="text-sm text-neutral-600">已经知道自己要找什么？</p>
          <a
            href="#directory"
            className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            直接查看机构目录
            <span aria-hidden="true">&darr;</span>
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            有些地方不对劲。也许班上其他孩子都往前走了，阅读却停滞不前。也许老师总是反复提到“专注”这个词。也许你三岁的孩子还不开口说话，而婆婆一直告诉你男孩子就是晚一点。也许你早就清楚自己面对的是什么，只是刚到一座城市，一个电话号码都不知道。
          </p>
          <p>
            在曼谷找帮助，比应有的情况要难。好的机构不怎么做广告，现有的目录大多是付费收录，而言语治疗师和言语戏剧课之间的区别，往往要等你在错误的选择上浪费了时间和金钱才会明白。所以我们做了这个目录：把我们能核实的每一家学习支持机构，用通俗的语言写出来，并保留而不是删去其中的提醒事项。
          </p>
          <p>
            没有任何机构为上榜付费。我们无法确认的地方，会如实说明。如果某家机构的分类有误，或者网站已经失效，我们也会说明。
          </p>
          <p className="text-sm text-neutral-500">
            本页由英文原版翻译而成。机构名称、地址、电话和网址均保持原样，信息以英文版为准。
          </p>
        </div>

        <div id="directory" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">机构目录</h2>
          <p className="mb-8 mt-2 max-w-3xl text-neutral-600">
            可以按所需支持的类型、区域或专长筛选。每家机构都有单独的页面，附有联系方式，并如实说明这家机构能做什么、不能做什么。
          </p>
          <LearningSupportDirectoryZh />
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">从哪里开始，按顺序来</h2>
          <ol className="mt-4 space-y-4">
            {STEPS.map((s, i) => (
              <li
                key={s.t}
                className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-purple-dark">{s.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{s.d}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/learning-support/mother-helping-son-with-homework-bangkok.jpg"
              alt="曼谷的一张桌子旁，母亲坐在儿子身边，指着他的作业本，而他用手托着下巴，目光移向别处。"
              width={1400}
              height={1022}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-sm leading-relaxed text-neutral-500">
            做作业变成每晚的争吵，是家庭开始寻求帮助最常见的原因之一。这很少是因为不够努力，也几乎从来不是意志的较量，尽管当时感觉确实如此。
          </figcaption>
        </figure>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">家长真正会问的问题</h2>
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

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">其他值得查看的地方</h2>
          <ul className="mt-4 space-y-3 text-neutral-700">
            <li>
              <a
                href="https://bangkokcommunityresources.isb.ac.th/"
                target="_blank"
                rel="noreferrer"
                lang="en"
                className="font-semibold text-orange"
              >
                Bangkok Community Resources
              </a>
              ，由 International School Bangkok 维护的免费公开目录，涵盖心理咨询、精神科、相关专业健康服务和学习需求，对所有人开放，不限于 ISB 的家庭（英文）。
            </li>
            <li>
              <Link href="/zh/schools" className="font-semibold text-orange">
                我们的学校目录
              </Link>
              ，适合答案是换一所学校而不是换一位治疗师的情况。
            </li>
            <li>
              <a
                href="https://www.facebook.com/groups/395501457186828"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-orange"
              >
                Facebook 上的 Bangkok Expat Families 社群
              </a>
              ，你可以向用过本页大多数机构的家长提问（英文社群）。
            </li>
          </ul>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">有错误，或者有遗漏？</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            信息会变，机构会搬家，人员也会调动。如果你发现了错误，知道我们漏掉的机构，或者你本人经营其中一项服务，希望更新你的条目，请告诉我们，我们会改正。这个页面只有准确才有用。
          </p>
          <Link
            href="/zh/contact"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            提交更正
          </Link>
        </div>
      </div>
    </>
  );
}
