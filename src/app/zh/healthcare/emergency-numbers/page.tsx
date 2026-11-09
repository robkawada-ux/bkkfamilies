import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { zhMetadata, zhPath } from "@/lib/i18n";
import { SITE } from "@/lib/seo";

const EN_PATH = "/healthcare/emergency-numbers";
const PATH = zhPath(EN_PATH);
const PDF = "/downloads/bkk-families-emergency-card-zh.pdf";
const CHECKED = "2026年11月9日";
const CHECKED_ISO = "2026-11-09";

const TITLE = "泰国和曼谷紧急电话（2026）";
const DESCRIPTION =
  "泰国紧急电话一览：1669 救护车、191 警察、199 火警、1155 旅游警察（英语），以及曼谷私立医院救护车电话。附免费可打印卡片。";

export const metadata: Metadata = zhMetadata({
  title: TITLE,
  description: DESCRIPTION,
  enPath: EN_PATH,
  type: "article",
  image: `${SITE}/images/og/zh-emergency-numbers.png`,
});

const MAIN = [
  { n: "1669", label: "救护车和医疗急救", note: "全国通用，免费。由泰国国家急救医学研究所运营。不保证有英语服务。", color: "bg-[#d9342b]" },
  { n: "191", label: "警察", note: "犯罪、危险及一般紧急情况。据报道拨打 911 也能接通。", color: "bg-purple" },
  { n: "199", label: "火警", note: "火灾及火灾救援。", color: "bg-orange" },
  { n: "1155", label: "旅游警察（英语）", note: "警员会说英语，可帮你转接到相应部门。实在沟通不了时，这是最好的备选。", color: "bg-teal" },
];

const HOSPITALS = [
  { name: "Bumrungrad International", num: "1378 或 +66 2011 5222", what: "救护车，24小时" },
  { name: "Bangkok Hospital", num: "1724", what: "急诊和创伤中心" },
  { name: "BNH Hospital", num: "+66 2 632 1000", what: "急诊和救护车" },
  { name: "MedPark Hospital", num: "+66 2 090 3000", what: "救护车" },
  { name: "Vejthani Hospital", num: "+66 2 734 0001", what: "救护车" },
  { name: "Samitivej", num: "+66 2022 2222", what: "24小时客服中心" },
  { name: "Phyathai 2 Hospital", num: "1772", what: "医院热线" },
  { name: "Praram 9 Hospital", num: "1270", what: "医院热线" },
];

const OTHER = [
  { k: "曼谷救护车（市政府）", n: "1646", note: "Erawan 医疗中心，曼谷市政府运营" },
  { k: "曼谷救护车（Vajira）", n: "1554", note: "Vajira 医院急救队" },
  { k: "中毒控制或蛇咬", n: "1367", note: "泰国中毒控制电话：Ramathibodi 中毒中心，24小时。LINE @rpc1367" },
  { k: "心理危机", n: "1323", note: "泰国心理健康厅热线" },
  { k: "虐待儿童或家庭暴力", n: "1300", note: "社会援助中心，免费，24小时，泰语和英语" },
  { k: "儿童和青少年", n: "1387", note: "泰国儿童热线（Childline），24小时" },
  { k: "高速公路事故", n: "1193", note: "高速公路警察" },
  { k: "水上事故", n: "1196", note: "水上事故热线" },
  { k: "灾害预警", n: "1860", note: "泰国国家灾害预警中心" },
  { k: "空中救护", n: "089 922 3300", note: "Siam Air Care" },
];

const WHICH = [
  { s: "在曼谷家中，孩子停止呼吸、抽搐或严重受伤", a: "打你自己所用医院的救护车电话。如果一分钟内打不通，就拨 1669。" },
  { s: "发生交通事故，或者你在曼谷以外", a: "拨 1669。高速公路上的事故可拨 1193 联系高速公路警察。" },
  { s: "你无法让对方听懂你的话", a: "拨 1155。旅游警察会说英语，会帮你转接。" },
  { s: "孩子误吞了有毒的东西，或者被蛇咬了", a: "拨泰国中毒控制电话 1367 寻求指导，并拨 1669 或你的医院叫救护车。" },
  { s: "遇到犯罪、入室盗窃或有人威胁你", a: "拨 191。" },
  { s: "起火或冒烟", a: "先离开现场，再拨 199。" },
];

const PHRASES = [
  { zh: "救命！", kar: "chuay duay!", th: "ช่วยด้วย" },
  { zh: "我需要救护车", kar: "dtong gaan rot pa-yaa-baan", th: "ต้องการรถพยาบาล" },
  { zh: "送我们去 ___ 医院", kar: "paa bpai rohng pa-yaa-baan ___", th: "พาไปโรงพยาบาล ___" },
  { zh: "我不会说泰语", kar: "poot paa-saa tai mai dai", th: "พูดภาษาไทยไม่ได้" },
  { zh: "你会说英语吗？", kar: "poot paa-saa ang-grit dai mai?", th: "พูดภาษาอังกฤษได้ไหม" },
];

const FAQ = [
  { q: "泰国的紧急电话是多少？", a: "泰国没有一个统一的号码。救护车或医疗急救拨 1669，报警拨 191，火警拨 199，需要英语帮助拨 1155 联系旅游警察。在曼谷，如果你家固定看某家私立医院，那家医院自己的救护车电话往往是最快找到会说英语的救援人员的方式。" },
  { q: "曼谷的救护车电话是多少？", a: "1669 是全国救护车号码，在曼谷也能用。曼谷还有 1646（Erawan 医疗中心）和 1554（Vajira 医院）。私立医院有自己的救护车，例如 Bumrungrad 的 1378 和 Bangkok Hospital 的 1724。" },
  { q: "在泰国能打 911 吗？", a: "据报道拨打 911 能接通警察，但不要依赖它。请把 1669、191 和 1155 存进手机。" },
  { q: "1669 的接线员会说英语或中文吗？", a: "有时会说英语，但不能保证，也不能指望有中文服务。如果沟通不了，请拨 1155 旅游警察，他们会说英语，可以帮你转接。私立医院的救护车电话通常有会说英语的工作人员。" },
  { q: "在泰国叫救护车要钱吗？", a: "拨打 1669 是免费的。私立医院的救护车通常会计入你的账单或由保险支付，所以请提前确认你的保单是否涵盖。" },
  { q: "救护车会把我送到哪家医院？", a: "私立医院的救护车会把你送到那家医院。1669 的急救队或志愿救援队通常会把病人送到最近的合适医院，可能是公立医院。请清楚说明你想去哪家医院，并同时打电话给你自己的医院。" },
  { q: "志愿救援队是什么？", a: "曼谷很多路边救援由 Poh Teck Tung 和 Ruamkatanyu 等志愿基金会负责。他们常常最先赶到，做的是非常重要的工作，但他们不是你所用医院的救护车，而且有报道称不同救援队之间曾为争夺地盘发生冲突。如果可以选择，请打电话给你自己的医院。" },
  { q: "泰国的中毒控制电话是多少？", a: "泰国的中毒控制电话是 1367，即 Ramathibodi 中毒中心，24小时提供有关中毒、蛇咬和解毒剂的指导。需要救护车请拨 1669 或你的医院。" },
  { q: "用外国手机号能拨打四位数热线吗？", a: "四位数热线是为泰国手机号设计的，用外国 SIM 卡漫游时可能无法接通。请保存你所用医院的完整 +66 号码，并在抵达后尽快办一张泰国 SIM 卡。" },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "zh-Hans",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: `${SITE}/zh` },
      { "@type": "ListItem", position: 2, name: "紧急电话", item: `${SITE}${PATH}` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: "zh-Hans",
    headline: "泰国和曼谷紧急电话",
    description: DESCRIPTION,
    url: `${SITE}${PATH}`,
    datePublished: CHECKED_ISO,
    dateModified: CHECKED_ISO,
    image: `${SITE}/images/og/zh-emergency-numbers.png`,
    author: { "@type": "Organization", name: "BKK Families", url: SITE },
    publisher: { "@type": "Organization", name: "BKK Families", url: SITE },
  },
  {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: "BKK Families 泰国紧急电话卡（可打印 PDF）",
    inLanguage: "zh-Hans",
    url: `${SITE}${PDF}`,
    encodingFormat: "application/pdf",
    isAccessibleForFree: true,
    dateModified: CHECKED_ISO,
  },
];

function Download({ className = "" }: { className?: string }) {
  return (
    <a
      href={PDF}
      download
      className={`inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 ${className}`}
    >
      下载免费可打印卡片（PDF）
    </a>
  );
}

export default function ZhEmergencyNumbersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow={`${CHECKED}核实`}
        title="泰国和曼谷紧急电话"
        subtitle="叫救护车、报警或火警该打哪个电话，哪些曼谷医院有自己的救护车专线，还有一张可以贴在冰箱上、放进家人钱包里的免费卡片。"
        color="teal"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-xl bg-purple-dark p-6 text-white">
          <h2 className="font-heading text-lg font-bold">简短回答</h2>
          <p className="mt-2 leading-relaxed text-white/90">
            泰国主要的紧急电话是：救护车 <strong>1669</strong>，警察 <strong>191</strong>，火警{" "}
            <strong>199</strong>，会说英语的旅游警察 <strong>1155</strong>。在曼谷，如果你家固定看某家私立医院，请先打那家医院自己的救护车电话：工作人员会说英语，而且会把你送到保险覆盖的那家医院。
          </p>
          <Download className="mt-5" />
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MAIN.map((m) => (
            <a key={m.n} href={`tel:${m.n}`} className={`rounded-xl p-5 text-white ${m.color}`}>
              <p className="font-heading text-4xl font-bold">{m.n}</p>
              <p className="mt-1 font-bold">{m.label}</p>
              <p className="mt-1 text-sm text-white/90">{m.note}</p>
            </a>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">该打哪个电话？</h2>
          <div className="mt-5 space-y-3">
            {WHICH.map((w) => (
              <div key={w.s} className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-purple-dark">{w.s}</h3>
                <p className="mt-1 text-sm text-neutral-600">{w.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">曼谷私立医院救护车电话</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            以下号码均于{CHECKED}在各医院官方网站上核实。如果医院只公布了一般热线，我们会注明。四位数号码需用泰国手机号拨打。
          </p>
          <div className="mt-5 overflow-x-auto rounded-xl border border-black/5 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-teal-50 text-purple-dark">
                <tr><th className="px-4 py-3">医院</th><th className="px-4 py-3">电话</th><th className="px-4 py-3">说明</th></tr>
              </thead>
              <tbody>
                {HOSPITALS.map((h) => (
                  <tr key={h.name} className="border-t border-black/5">
                    <td className="px-4 py-3 font-semibold text-purple-dark">{h.name}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-purple-dark">{h.num}</td>
                    <td className="px-4 py-3 text-neutral-600">{h.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-neutral-600">
            想了解各家医院？请看我们的{" "}
            <Link href="/healthcare/hospitals" hrefLang="en" lang="en" className="font-semibold text-teal hover:underline">曼谷医院目录（英文页面）</Link>。
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">其他紧急电话和求助热线</h2>
          <div className="mt-5 overflow-x-auto rounded-xl border border-black/5 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <tbody>
                {OTHER.map((o) => (
                  <tr key={o.k} className="border-t border-black/5 first:border-t-0">
                    <td className="px-4 py-3 font-semibold text-purple-dark">{o.k}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-purple-dark">{o.n}</td>
                    <td className="px-4 py-3 text-neutral-600">{o.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">为什么 191 不一定是最好的选择</h2>
          <p>
            泰国没有一个能处理所有情况的统一紧急号码。191 接通的是警察，1669 接通的是全国救护系统，两者是分开的。医疗急症打给警察会耽误时间。
          </p>
          <p>
            在曼谷还有另一层情况。曼谷很多路边救援由 Poh Teck Tung 和 Ruamkatanyu 等志愿基金会负责。他们常常最先赶到，做的是非常重要的工作，但通常会把病人送到最近的医院，而且有报道称不同救援队之间曾{" "}
            <a href="https://thethaiger.com/hot-news/crime/bangkok-rescue-volunteers-brawl-over-territory" className="font-semibold text-teal hover:underline" rel="noopener noreferrer" target="_blank">为争夺地盘发生冲突</a>。私立医院有自己的救护车和会说英语的工作人员，会把你送到你家平时看病的那家医院。
          </p>
          <p>
            所以我们给曼谷外籍家庭的实用建议是：保存你所用医院的救护车电话，有事先打它，同时把 1669 和 1155 作为备选。
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-purple-dark">打电话时要说什么</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-neutral-700">
              <li>发生了什么，谁受了伤。</li>
              <li>你在哪里：地址、楼名、巷（soi）以及附近的地标。</li>
              <li>你的电话号码，并保持畅通。</li>
              <li>你想去哪家医院。</li>
            </ol>
          </div>
          <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-purple-dark">泰语急救用语</h2>
            <p className="mt-1 text-xs text-neutral-500">读红色那一行。如果对方听不懂，就把泰文给他们看。</p>
            <ul className="mt-3 space-y-2 text-sm">
              {PHRASES.map((p) => (
                <li key={p.zh}>
                  <span className="text-neutral-700">{p.zh}</span>
                  <span className="block font-bold text-[#d9342b]" lang="th-Latn">{p.kar}</span>
                  <span className="block text-neutral-500" lang="th">{p.th}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-xl border-l-4 border-teal bg-teal-50 p-6">
          <h2 className="font-heading text-xl font-bold text-purple-dark">今天就做好准备，别等到需要的时候</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
            <li>把你所用医院的救护车电话、1669 和 1155 存进每位家庭成员的手机。</li>
            <li>下载 Thai EMS 1669 应用，它会发送你的 GPS 定位，还有文字聊天功能。</li>
            <li>用泰文写下家庭住址，放在门边并存在手机里。</li>
            <li>把保险卡和证件放在一起，并告诉家里的阿姨或保姆你们用哪家医院。</li>
            <li>了解去最近的24小时急诊室的路线。</li>
            <li>打印下面的卡片，贴在冰箱上。</li>
          </ul>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-2xl bg-purple-dark px-6 py-10 text-center text-white">
          <h2 className="font-heading text-2xl font-bold">免费可打印紧急电话卡</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/80">
            一页 A4 冰箱贴，包含本页所有号码，另附四张钱包卡，每位家庭成员一张，可以写上你们的医院、泰文住址和过敏信息。
          </p>
          <Download className="mt-6" />
          <p className="mt-3 text-xs text-white/60">
            PDF，2页，A4。号码于{CHECKED}核实。{" "}
            <a href="/downloads/bkk-families-emergency-card.pdf" download hrefLang="en" className="underline">English version</a>
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">家长常问的问题</h2>
          <div className="mt-6 space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <h3 className="font-heading font-bold text-purple-dark">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs leading-relaxed text-neutral-500">
          号码于{CHECKED}对照泰国政府资料及各医院官方网站核实。号码可能变动，如果发现有号码打不通，请发邮件至 info@bkkfamilies.com 告诉我们。本页仅供一般参考，不构成医疗建议，也不代表推荐或反对任何机构。{" "}
          <Link href={EN_PATH} hrefLang="en" lang="en" className="underline">English version</Link>
        </p>
      </div>
    </>
  );
}
