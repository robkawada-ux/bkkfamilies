import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SCHOOLS } from "@/lib/schools";
import { SITE } from "@/lib/seo";
import {
  schoolFees,
  feesOnEnquiry,
  feeSummary,
  formatThb,
  type SchoolFees,
  type OneTimeFees,
} from "@/lib/schoolFees";
import {
  calendarFor,
  hasPublishableDates,
  type SchoolCalendar,
} from "@/lib/schoolBreaks";
import { zhMetadata } from "@/lib/i18n";
import { COMMON_ZH, dateZh } from "@/lib/zh/common";
import {
  SCHOOLS_ZH,
  AREA_ZH,
  BUDGET_ZH,
  curriculumZh,
} from "@/lib/zh/schools";
import {
  FEE_NOTE_ZH,
  ON_ENQUIRY_ZH,
  EXTRA_LABEL_ZH,
  ROW_LABEL_ZH,
  INCLUSION_LABEL_ZH,
  ONE_TIME_LABEL_ZH,
} from "@/lib/zh/schoolFees";
import { WINDOW_LABEL_ZH, CALENDAR_ZH } from "@/lib/zh/schoolBreaks";

const rowLabel = (l: string) => ROW_LABEL_ZH[l] ?? l;
const thb = (n: number) => `${formatThb(n)} 泰铢`;

/** "2026年10月12日至16日", "2026年12月19日至2027年1月10日" */
function rangeFullZh(start: string, end: string): string {
  const [sy, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  if (sy === ey && sm === em) return `${sy}年${sm}月${sd}日至${ed}日`;
  if (sy === ey) return `${sy}年${sm}月${sd}日至${em}月${ed}日`;
  return `${dateZh(start)}至${dateZh(end)}`;
}

export function generateStaticParams() {
  return SCHOOLS.filter((s) => SCHOOLS_ZH[s.slug]?.description).map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const school = SCHOOLS.find((s) => s.slug === slug);
  const z = SCHOOLS_ZH[slug];
  if (!school || !z?.description) return {};

  const summary = feeSummary(school.slug);
  const cal = calendarFor(school.slug);
  const dates = hasPublishableDates(cal);
  const year = summary?.feeYear ?? "2026/27";
  const topic =
    summary && dates
      ? `${year}学费与学期日期`
      : summary
        ? `${year}学费`
        : dates
          ? "2026/27学期日期"
          : null;
  const pageTitle = topic ? `${school.name}：${topic}` : school.name;

  const firstPara = z.description.split("\n\n")[0] ?? "";
  let description = firstPara.length <= 90 ? firstPara : `${firstPara.slice(0, 88)}……`;
  if (summary) {
    const lead = summary.primary
      ? `${rowLabel(summary.primary.label)} 每年${thb(summary.primary.annual)}`
      : `每年${formatThb(summary.from.annual)}至${thb(summary.to.annual)}`;
    description = `${school.name} ${summary.feeYear}学费，取自学校自己的收费表：${lead}，最高${thb(summary.to.annual)}（${rowLabel(summary.to.label)}）。`;
  }

  return zhMetadata({
    title: pageTitle,
    description,
    enPath: `/schools/${school.slug}`,
    image: school.photo,
  });
}

export default async function SchoolPageZh({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = SCHOOLS.find((s) => s.slug === slug);
  const z = SCHOOLS_ZH[slug];
  if (!school || !z?.description) return notFound();

  const pageUrl = `${SITE}/zh/schools/${school.slug}`;
  const fees = schoolFees[school.slug];
  const summary = feeSummary(school.slug);
  const onEnquiry = feesOnEnquiry[school.slug];
  const calendar = calendarFor(school.slug);
  const firstPara = z.description.split("\n\n")[0];
  const ageRange = z.ageRange ?? school.ageRange;
  const languages = z.languageOfInstruction ?? school.languageOfInstruction;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: `${SITE}/zh` },
        { "@type": "ListItem", position: 2, name: "国际学校", item: `${SITE}/zh/schools` },
        { "@type": "ListItem", position: 3, name: school.name, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: pageUrl,
      name: school.name,
      inLanguage: "zh-Hans",
      mainEntity: {
        "@type": "School",
        name: school.name,
        areaServed: "Bangkok, Thailand",
        description: firstPara,
        ...(school.website ? { url: school.website } : {}),
        ...(school.photo ? { image: `${SITE}${school.photo}` } : {}),
        ...(school.founded ? { foundingDate: String(school.founded) } : {}),
      },
    },
  ];

  const Tag = ({ c }: { c: string }) => (
    <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
      {curriculumZh(c)}
    </span>
  );

  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {school.photo ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={school.photo}
            alt={school.name}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
          <div className="absolute inset-0 flex flex-col justify-between px-4 py-6">
            <div className="mx-auto w-full max-w-3xl">
              <Link href="/zh/schools" className="text-sm font-semibold text-white/90 hover:text-white">
                返回学校列表
              </Link>
            </div>
            <div className="mx-auto w-full max-w-3xl text-white">
              <h1 className="font-heading text-3xl font-bold md:text-4xl">{school.name}</h1>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {school.curricula.map((c) => (
                  <Tag key={c} c={c} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-purple px-4 py-12 text-white">
          <div className="mx-auto max-w-3xl">
            <Link href="/zh/schools" className="block w-fit text-sm font-semibold text-white/80 hover:text-white">
              返回学校列表
            </Link>
            {school.logo && (
              <div className={`mx-auto mt-6 w-fit ${school.logoPlain ? "" : "rounded-xl bg-white p-3 shadow-sm"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={school.logo}
                  alt={`${school.name} logo`}
                  className={school.logoPlain ? "h-28 w-auto max-w-[320px] object-contain md:h-36 md:max-w-[420px]" : "h-20 w-auto max-w-[260px] object-contain md:h-24"}
                />
              </div>
            )}
            <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">{school.name}</h1>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {school.curricula.map((c) => (
                <Tag key={c} c={c} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="px-4 py-12">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
            <p className="text-xs text-neutral-400">区域</p>
            <p className="text-sm font-semibold text-purple-dark">
              {school.areas.map((a) => AREA_ZH[a].label).join("、")}
            </p>
            {school.address && (
              <p className="mt-0.5 text-xs text-neutral-500">
                {school.address}
                {school.mapUrl && (
                  <>
                    {" "}
                    <a
                      href={school.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-orange"
                    >
                      查看路线
                    </a>
                  </>
                )}
              </p>
            )}
          </div>
          {ageRange && (
            <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
              <p className="text-xs text-neutral-400">招收年龄</p>
              <p className="text-sm font-semibold text-purple-dark">{ageRange}</p>
            </div>
          )}
          {languages && (
            <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
              <p className="text-xs text-neutral-400">授课语言</p>
              <p className="text-sm font-semibold text-purple-dark">{languages}</p>
            </div>
          )}
          <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
            <p className="text-xs text-neutral-400">
              年度学费{summary ? ` ${summary.feeYear}` : ""}
            </p>
            {summary ? (
              <>
                {summary.primary ? (
                  <p className="text-sm font-semibold text-purple-dark">
                    {rowLabel(summary.primary.label)}：{thb(summary.primary.annual)}
                  </p>
                ) : (
                  <p className="text-sm font-semibold text-purple-dark">
                    {formatThb(summary.from.annual)}至{thb(summary.to.annual)}
                  </p>
                )}
                <p className="mt-0.5 text-xs text-neutral-500">
                  {summary.primary
                    ? `最低 ${thb(summary.from.annual)}（${rowLabel(summary.from.label)}），最高 ${thb(summary.to.annual)}（${rowLabel(summary.to.label)}）。`
                    : `${rowLabel(summary.from.label)}至${rowLabel(summary.to.label)}。`}
                  <a href="#fees" className="font-semibold text-orange">
                    完整收费表
                  </a>
                </p>
              </>
            ) : onEnquiry ? (
              <>
                <p className="text-sm font-semibold text-purple-dark">未公布，需向学校咨询</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  学校没有公布收费表。核查于{dateZh(onEnquiry.checked)}。
                </p>
              </>
            ) : school.schoolStatedFee ? (
              <>
                <p className="text-sm font-semibold text-purple-dark">
                  {z.schoolStatedFee ?? school.schoolStatedFee}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  学校自己提供的数字
                  {school.schoolStatedFeeDate ? `（${school.schoolStatedFeeDate}）` : ""}。
                  具体取决于孩子的年龄和课程，请向学校确认。
                </p>
              </>
            ) : school.feeRange ? (
              <>
                <p className="text-sm font-semibold text-purple-dark">
                  {z.feeRange ?? school.feeRange}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  仅供参考，来自第三方数据，尚未对照学校自己的收费表核实，请向学校确认。
                </p>
              </>
            ) : (
              <p className="text-sm font-semibold text-purple-dark">
                {BUDGET_ZH[school.budget]}
              </p>
            )}
          </div>
          {school.founded && (
            <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
              <p className="text-xs text-neutral-400">创办年份</p>
              <p className="text-sm font-semibold text-purple-dark">{school.founded}</p>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4">
          {z.description.split("\n\n").map((para, i) => (
            <p key={i} className="leading-relaxed text-neutral-700">
              {para}
            </p>
          ))}
        </div>

        {fees && summary && <FeeTableZh slug={school.slug} fees={fees} schoolName={school.name} />}

        {!fees && onEnquiry && ON_ENQUIRY_ZH[school.slug] && (
          <p className="mt-8 rounded-xl border-l-4 border-orange bg-orange/5 p-4 text-sm leading-relaxed text-neutral-700">
            <span className="font-semibold text-purple-dark">学费说明：</span>
            {ON_ENQUIRY_ZH[school.slug]}
          </p>
        )}

        {calendar && <TermDatesZh calendar={calendar} schoolName={school.name} />}

        <div className="mt-12 rounded-xl bg-neutral-50 p-5">
          <p className="text-xs font-bold text-neutral-400">提前规划</p>
          <ul className="mt-2 grid gap-2 text-sm sm:grid-cols-3">
            <li>
              <Link
                href={calendar?.schoolSlug ? `/school-breaks#${calendar.schoolSlug}` : "/school-breaks"}
                hrefLang="en"
                className="font-semibold text-orange"
              >
                2026/27学年学校假期（英文页面）→
              </Link>
            </li>
            <li>
              <Link
                href="/blog/what-does-international-school-actually-cost-bangkok-2026"
                hrefLang="en"
                className="font-semibold text-orange"
              >
                上学到底要花多少钱（英文文章）→
              </Link>
            </li>
            <li>
              <Link href="/zh/camps" className="font-semibold text-orange">
                假期营 →
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {school.website ? (
            <a
              href={school.website}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-orange px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              访问学校官网
            </a>
          ) : (
            <p className="text-sm text-neutral-400">
              尚未列出学校官网，请直接搜索校名查找。
            </p>
          )}
          {school.virtualTour && (
            <a
              href={school.virtualTour}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full border border-orange px-6 py-3 font-semibold text-orange transition hover:bg-orange hover:text-white"
            >
              观看校园视频
            </a>
          )}
        </div>

        <p className="mt-10 rounded-xl bg-purple-50 p-4 text-xs leading-relaxed text-neutral-600">
          {COMMON_ZH.translationNote}{" "}
          <Link href={`/schools/${school.slug}`} lang="en" hrefLang="en" className="font-semibold text-purple underline">
            {COMMON_ZH.backToEnglish}
          </Link>
        </p>

        <div className="mt-8 border-t border-black/10 pt-8">
          <Link href="/zh/schools" className="text-sm font-semibold text-orange">
            返回全部学校
          </Link>
        </div>
      </div>
    </article>
  );
}

function FeeTableZh({
  slug,
  fees,
  schoolName,
}: {
  slug: string;
  fees: SchoolFees;
  schoolName: string;
}) {
  const rows = fees.rows ?? [];
  const oneTime = Object.entries(fees.oneTime ?? {}).filter(
    ([, v]) => typeof v === "number",
  ) as [keyof OneTimeFees, number][];
  const sourceIsUrl = fees.sourceUrl?.startsWith("http");
  const partial = rows.length <= 2;
  const note = fees.note ? FEE_NOTE_ZH[slug] : undefined;

  return (
    <section id="fees" className="mt-12 scroll-mt-40">
      <h2 className="font-heading text-2xl font-bold text-purple-dark">
        {schoolName} {fees.feeYear}学费
      </h2>
      <p className="mt-2 text-sm text-neutral-600">
        年度学费，以泰铢计，取自学校自己的收费表
        {fees.verified ? `（${dateZh(fees.verified)}核实）` : ""}。
        {partial ? "学校只提供了最低和最高两个数字，没有给出每个年级的学费。" : ""}
      </p>

      <div className="mt-5 overflow-hidden rounded-xl border border-black/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs text-neutral-500">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-semibold">年级</th>
              <th scope="col" className="px-4 py-2.5 text-right font-semibold">每年泰铢</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-black/5">
                <td className="px-4 py-2.5 text-neutral-700">
                  {rowLabel(r.label)}
                  {r.billedTerms === 2 && (
                    <span className="block text-xs text-neutral-400">
                      考试年级，分两个学期收费
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-purple-dark">
                  {formatThb(r.annual)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {oneTime.length > 0 && (
        <div className="mt-6">
          <h3 className="font-heading text-lg font-bold text-purple-dark">入学时的一次性费用</h3>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            {oneTime.map(([k, v]) => (
              <li key={k} className="flex justify-between gap-4 border-b border-black/5 py-1.5">
                <span>{ONE_TIME_LABEL_ZH[k]}</span>
                <span className="font-semibold tabular-nums text-purple-dark">{formatThb(v)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {fees.extras && fees.extras.length > 0 && (
        <div className="mt-6">
          <h3 className="font-heading text-lg font-bold text-purple-dark">学费之外另收</h3>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            {fees.extras.map((e) => (
              <li key={e.label} className="flex justify-between gap-4 border-b border-black/5 py-1.5">
                <span>
                  {EXTRA_LABEL_ZH[e.label] ?? e.label}
                  {e.compulsory && (
                    <span className="ml-2 rounded-full bg-orange/10 px-2 py-0.5 text-xs font-semibold text-orange">
                      必缴
                    </span>
                  )}
                </span>
                <span className="whitespace-nowrap font-semibold tabular-nums text-purple-dark">
                  {formatThb(e.annualFrom)}
                  {e.annualTo ? `至${formatThb(e.annualTo)}` : ""} / 年
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(fees.includes?.length || fees.excludes?.length) ? (
        <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          {fees.includes && fees.includes.length > 0 && (
            <div className="rounded-xl bg-neutral-50 p-4">
              <p className="text-xs text-neutral-400">学费已包含</p>
              <p className="mt-1 text-neutral-700">
                {fees.includes.map((i) => INCLUSION_LABEL_ZH[i]).join("、")}
              </p>
            </div>
          )}
          {fees.excludes && fees.excludes.length > 0 && (
            <div className="rounded-xl bg-neutral-50 p-4">
              <p className="text-xs text-neutral-400">不包含</p>
              <p className="mt-1 text-neutral-700">
                {fees.excludes.map((i) => INCLUSION_LABEL_ZH[i]).join("、")}
              </p>
            </div>
          )}
        </div>
      ) : null}

      {note && (
        <p className="mt-6 rounded-xl border-l-4 border-orange bg-orange/5 p-4 text-sm leading-relaxed text-neutral-700">
          <span className="font-semibold text-purple-dark">家长须知：</span>
          {note}
        </p>
      )}

      <p className="mt-4 text-xs text-neutral-500">
        来源：
        {sourceIsUrl ? (
          <a href={fees.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-orange">
            {schoolName} 收费表
          </a>
        ) : (
          fees.sourceUrl ?? "学校"
        )}
        。学费每年调整，制定预算前请向学校确认。{" "}
        <Link
          href="/blog/what-does-international-school-actually-cost-bangkok-2026"
          hrefLang="en"
          className="font-semibold text-orange"
        >
          曼谷国际学校到底要花多少钱（英文文章）
        </Link>
      </p>
    </section>
  );
}

/** Term start, breaks and term end as one list in date order. */
function termRowsZh(c: SchoolCalendar, notes: Record<string, string>) {
  const rows: { key: string; sort: string; label: string; when: string; note?: string }[] = [];
  if (c.termStart) rows.push({ key: "start", sort: c.termStart, label: "新学年第一天", when: dateZh(c.termStart) });
  for (const b of c.breaks) {
    rows.push({
      key: b.window + b.start,
      sort: b.start,
      label: WINDOW_LABEL_ZH[b.window],
      when: rangeFullZh(b.start, b.end) + (b.endEstimated ? "（结束日期为估计）" : ""),
      note: b.note ? notes[`${b.window}|${b.start}`] : undefined,
    });
  }
  if (c.termEnd) rows.push({ key: "end", sort: c.termEnd, label: "学年最后一天", when: dateZh(c.termEnd) });
  return rows.sort((a, b) => a.sort.localeCompare(b.sort));
}

function TermDatesZh({ calendar, schoolName }: { calendar: SchoolCalendar; schoolName: string }) {
  const publishable = hasPublishableDates(calendar);
  const z = calendar.schoolSlug ? CALENDAR_ZH[calendar.schoolSlug] : undefined;
  return (
    <section id="term-dates" className="mt-12 scroll-mt-40">
      <h2 className="font-heading text-2xl font-bold text-purple-dark">
        {schoolName} 2026/27学期日期
      </h2>

      {publishable ? (
        <>
          <p className="mt-2 text-sm text-neutral-600">
            取自学校自己公布的校历，核实于{dateZh(calendar.lastVerified)}。
            {calendar.confidence === "partial"
              ? "学校尚未公布全部假期，所以下面有些假期缺失。"
              : ""}
          </p>
          <ul className="mt-5 divide-y divide-black/5 overflow-hidden rounded-xl border border-black/10 text-sm">
            {termRowsZh(calendar, z?.breakNotes ?? {}).map((r) => (
              <li key={r.key} className="px-4 py-3">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                  <span className="text-neutral-700">{r.label}</span>
                  <span className="font-semibold text-purple-dark">{r.when}</span>
                </div>
                {r.note && <p className="mt-1 text-xs text-neutral-500">{r.note}</p>}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-2 text-sm text-neutral-600">
          我们尚未核实这所学校2026/27学年的完整校历。
          {calendar.termStart ? `学年开始于${dateZh(calendar.termStart)}。` : ""}
        </p>
      )}

      {calendar.caveat && z?.caveat && (
        <p className="mt-4 text-sm text-neutral-600">{z.caveat}</p>
      )}

      <p className="mt-4 text-xs text-neutral-500">
        来源：
        <a href={calendar.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-orange">
          {z?.sourceLabel ?? calendar.sourceLabel}
        </a>
        。校历可能变动，订机票或营期前请先向学校确认。{" "}
        <Link
          href={calendar.schoolSlug ? `/school-breaks#${calendar.schoolSlug}` : "/school-breaks"}
          hrefLang="en"
          className="font-semibold text-orange"
        >
          与其他学校对比（英文页面）
        </Link>
      </p>
    </section>
  );
}
