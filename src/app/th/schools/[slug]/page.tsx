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
import { thMetadata } from "@/lib/i18n";
import { COMMON_TH, dateTh } from "@/lib/th/common";
import {
  SCHOOLS_TH,
  AREA_TH,
  BUDGET_TH,
  curriculumTh,
} from "@/lib/th/schools";
import {
  FEE_NOTE_TH,
  ON_ENQUIRY_TH,
  EXTRA_LABEL_TH,
  rowLabelTh,
  INCLUSION_LABEL_TH,
  ONE_TIME_LABEL_TH,
} from "@/lib/th/schoolFees";
import { WINDOW_LABEL_TH, CALENDAR_TH } from "@/lib/th/schoolBreaks";

const rowLabel = (l: string) => rowLabelTh(l);
const thb = (n: number) => `${formatThb(n)} บาท`;

const MONTHS_TH = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

/** "12 ถึง 16 ตุลาคม 2026", "19 ธันวาคม 2026 ถึง 10 มกราคม 2027" */
function rangeFullTh(start: string, end: string): string {
  const [sy, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  if (sy === ey && sm === em) return `${sd} ถึง ${ed} ${MONTHS_TH[sm - 1]} ${sy}`;
  if (sy === ey) return `${sd} ${MONTHS_TH[sm - 1]} ถึง ${ed} ${MONTHS_TH[em - 1]} ${sy}`;
  return `${dateTh(start)} ถึง ${dateTh(end)}`;
}

export function generateStaticParams() {
  return SCHOOLS.filter((s) => SCHOOLS_TH[s.slug]?.description).map((s) => ({
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
  const z = SCHOOLS_TH[slug];
  if (!school || !z?.description) return {};

  const summary = feeSummary(school.slug);
  const cal = calendarFor(school.slug);
  const dates = hasPublishableDates(cal);
  const year = summary?.feeYear ?? "2026/27";
  const topic =
    summary && dates
      ? `ค่าเล่าเรียนและวันที่ภาคเรียน ${year}`
      : summary
        ? `ค่าเล่าเรียน ${year}`
        : dates
          ? "วันที่ภาคเรียน 2026/27"
          : null;
  const pageTitle = topic ? `${school.name}：${topic}` : school.name;

  const firstPara = z.description.split("\n\n")[0] ?? "";
  let description = firstPara.length <= 90 ? firstPara : `${firstPara.slice(0, 88)}...`;
  if (summary) {
    const lead = summary.primary
      ? `${rowLabel(summary.primary.label)} ปีละ ${thb(summary.primary.annual)}`
      : `ปีละ ${formatThb(summary.from.annual)} ถึง ${thb(summary.to.annual)}`;
    description = `ค่าเล่าเรียน ${school.name} ${summary.feeYear} จากตารางค่าเล่าเรียนของโรงเรียนเอง: ${lead} สูงสุด ${thb(summary.to.annual)} (${rowLabel(summary.to.label)})`;
  }

  return thMetadata({
    title: pageTitle,
    description,
    enPath: `/schools/${school.slug}`,
    image: school.photo,
  });
}

export default async function SchoolPageTh({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = SCHOOLS.find((s) => s.slug === slug);
  const z = SCHOOLS_TH[slug];
  if (!school || !z?.description) return notFound();

  const pageUrl = `${SITE}/th/schools/${school.slug}`;
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
        { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE}/th` },
        { "@type": "ListItem", position: 2, name: "โรงเรียนนานาชาติ", item: `${SITE}/th/schools` },
        { "@type": "ListItem", position: 3, name: school.name, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: pageUrl,
      name: school.name,
      inLanguage: "th",
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
      {curriculumTh(c)}
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
              <Link href="/th/schools" className="text-sm font-semibold text-white/90 hover:text-white">
                กลับไปรายชื่อโรงเรียน
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
            <Link href="/th/schools" className="block w-fit text-sm font-semibold text-white/80 hover:text-white">
              กลับไปรายชื่อโรงเรียน
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
            <p className="text-xs text-neutral-400">ย่าน</p>
            <p className="text-sm font-semibold text-purple-dark">
              {school.areas.map((a) => AREA_TH[a].label).join(", ")}
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
                      ดูเส้นทาง
                    </a>
                  </>
                )}
              </p>
            )}
          </div>
          {ageRange && (
            <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
              <p className="text-xs text-neutral-400">ช่วงอายุที่รับ</p>
              <p className="text-sm font-semibold text-purple-dark">{ageRange}</p>
            </div>
          )}
          {languages && (
            <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
              <p className="text-xs text-neutral-400">ภาษาที่ใช้สอน</p>
              <p className="text-sm font-semibold text-purple-dark">{languages}</p>
            </div>
          )}
          <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
            <p className="text-xs text-neutral-400">
              ค่าเล่าเรียนรายปี{summary ? ` ${summary.feeYear}` : ""}
            </p>
            {summary ? (
              <>
                {summary.primary ? (
                  <p className="text-sm font-semibold text-purple-dark">
                    {rowLabel(summary.primary.label)}: {thb(summary.primary.annual)}
                  </p>
                ) : (
                  <p className="text-sm font-semibold text-purple-dark">
                    {formatThb(summary.from.annual)} ถึง {thb(summary.to.annual)}
                  </p>
                )}
                <p className="mt-0.5 text-xs text-neutral-500">
                  {summary.primary
                    ? `ต่ำสุด ${thb(summary.from.annual)} (${rowLabel(summary.from.label)}) สูงสุด ${thb(summary.to.annual)} (${rowLabel(summary.to.label)}) `
                    : `${rowLabel(summary.from.label)} ถึง ${rowLabel(summary.to.label)} `}
                  <a href="#fees" className="font-semibold text-orange">
                    ดูตารางค่าเล่าเรียนฉบับเต็ม
                  </a>
                </p>
              </>
            ) : onEnquiry ? (
              <>
                <p className="text-sm font-semibold text-purple-dark">ไม่ประกาศ โปรดสอบถามโรงเรียน</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  โรงเรียนไม่ได้ประกาศตารางค่าเล่าเรียน ตรวจสอบเมื่อ {dateTh(onEnquiry.checked)}
                </p>
              </>
            ) : school.schoolStatedFee ? (
              <>
                <p className="text-sm font-semibold text-purple-dark">
                  {z.schoolStatedFee ?? school.schoolStatedFee}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  ตัวเลขที่โรงเรียนให้เอง
                  {school.schoolStatedFeeDate ? `(${school.schoolStatedFeeDate})` : ""}
                  ขึ้นอยู่กับอายุและหลักสูตรของเด็ก โปรดสอบถามโรงเรียน
                </p>
              </>
            ) : school.feeRange ? (
              <>
                <p className="text-sm font-semibold text-purple-dark">
                  {z.feeRange ?? school.feeRange}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  เป็นข้อมูลโดยประมาณจากแหล่งข้อมูลภายนอก ยังไม่ได้ตรวจกับตารางค่าเล่าเรียนของโรงเรียน โปรดสอบถามโรงเรียน
                </p>
              </>
            ) : (
              <p className="text-sm font-semibold text-purple-dark">
                {BUDGET_TH[school.budget]}
              </p>
            )}
          </div>
          {school.founded && (
            <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
              <p className="text-xs text-neutral-400">ปีที่ก่อตั้ง</p>
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

        {fees && summary && <FeeTableTh slug={school.slug} fees={fees} schoolName={school.name} />}

        {!fees && onEnquiry && ON_ENQUIRY_TH[school.slug] && (
          <p className="mt-8 rounded-xl border-l-4 border-orange bg-orange/5 p-4 text-sm leading-relaxed text-neutral-700">
            <span className="font-semibold text-purple-dark">หมายเหตุเรื่องค่าเล่าเรียน: </span>
            {ON_ENQUIRY_TH[school.slug]}
          </p>
        )}

        {calendar && <TermDatesTh calendar={calendar} schoolName={school.name} />}

        <div className="mt-12 rounded-xl bg-neutral-50 p-5">
          <p className="text-xs font-bold text-neutral-400">วางแผนล่วงหน้า</p>
          <ul className="mt-2 grid gap-2 text-sm sm:grid-cols-3">
            <li>
              <Link
                href={calendar?.schoolSlug ? `/school-breaks#${calendar.schoolSlug}` : "/school-breaks"}
                hrefLang="en"
                className="font-semibold text-orange"
              >
                ปิดเทอมของโรงเรียนปีการศึกษา 2026/27 (หน้าภาษาอังกฤษ) →
              </Link>
            </li>
            <li>
              <Link
                href="/blog/what-does-international-school-actually-cost-bangkok-2026"
                hrefLang="en"
                className="font-semibold text-orange"
              >
                เรียนที่นี่ต้องใช้เงินเท่าไรจริงๆ (บทความภาษาอังกฤษ) →
              </Link>
            </li>
            <li>
              <Link href="/th/camps" className="font-semibold text-orange">
                แคมป์ปิดเทอม →
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
              เข้าเว็บไซต์โรงเรียน
            </a>
          ) : (
            <p className="text-sm text-neutral-400">
              ยังไม่มีเว็บไซต์ของโรงเรียนในรายการ โปรดค้นหาชื่อโรงเรียนโดยตรง
            </p>
          )}
          {school.virtualTour && (
            <a
              href={school.virtualTour}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full border border-orange px-6 py-3 font-semibold text-orange transition hover:bg-orange hover:text-white"
            >
              ดูวิดีโอโรงเรียน
            </a>
          )}
        </div>

        <p className="mt-10 rounded-xl bg-purple-50 p-4 text-xs leading-relaxed text-neutral-600">
          {COMMON_TH.translationNote}{" "}
          <Link href={`/schools/${school.slug}`} lang="en" hrefLang="en" className="font-semibold text-purple underline">
            {COMMON_TH.backToEnglish}
          </Link>
        </p>

        <div className="mt-8 border-t border-black/10 pt-8">
          <Link href="/th/schools" className="text-sm font-semibold text-orange">
            กลับไปดูโรงเรียนทั้งหมด
          </Link>
        </div>
      </div>
    </article>
  );
}

function FeeTableTh({
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
  const note = fees.note ? FEE_NOTE_TH[slug] : undefined;

  return (
    <section id="fees" className="mt-12 scroll-mt-40">
      <h2 className="font-heading text-2xl font-bold text-purple-dark">
        ค่าเล่าเรียน {schoolName} {fees.feeYear}
      </h2>
      <p className="mt-2 text-sm text-neutral-600">
        ค่าเล่าเรียนรายปี เป็นเงินบาท จากตารางค่าเล่าเรียนของโรงเรียนเอง
        {fees.verified ? `(ตรวจสอบเมื่อ ${dateTh(fees.verified)})` : ""}
        {partial ? "โรงเรียนให้เพียงตัวเลขต่ำสุดและสูงสุด ไม่ได้ให้ค่าเล่าเรียนของแต่ละระดับชั้น" : ""}
      </p>

      <div className="mt-5 overflow-hidden rounded-xl border border-black/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs text-neutral-500">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-semibold">ระดับชั้น</th>
              <th scope="col" className="px-4 py-2.5 text-right font-semibold">บาทต่อปี</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-black/5">
                <td className="px-4 py-2.5 text-neutral-700">
                  {rowLabel(r.label)}
                  {r.billedTerms === 2 && (
                    <span className="block text-xs text-neutral-400">
                      ชั้นเรียนที่มีการสอบ แบ่งจ่ายสองเทอม
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
          <h3 className="font-heading text-lg font-bold text-purple-dark">ค่าใช้จ่ายครั้งเดียวเมื่อเข้าเรียน</h3>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            {oneTime.map(([k, v]) => (
              <li key={k} className="flex justify-between gap-4 border-b border-black/5 py-1.5">
                <span>{ONE_TIME_LABEL_TH[k]}</span>
                <span className="font-semibold tabular-nums text-purple-dark">{formatThb(v)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {fees.extras && fees.extras.length > 0 && (
        <div className="mt-6">
          <h3 className="font-heading text-lg font-bold text-purple-dark">ค่าใช้จ่ายนอกเหนือจากค่าเล่าเรียน</h3>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            {fees.extras.map((e) => (
              <li key={e.label} className="flex justify-between gap-4 border-b border-black/5 py-1.5">
                <span>
                  {EXTRA_LABEL_TH[e.label] ?? e.label}
                  {e.compulsory && (
                    <span className="ml-2 rounded-full bg-orange/10 px-2 py-0.5 text-xs font-semibold text-orange">
                      ภาคบังคับ
                    </span>
                  )}
                </span>
                <span className="whitespace-nowrap font-semibold tabular-nums text-purple-dark">
                  {formatThb(e.annualFrom)}
                  {e.annualTo ? ` ถึง ${formatThb(e.annualTo)}` : ""} ต่อปี
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
              <p className="text-xs text-neutral-400">ค่าเล่าเรียนรวมแล้ว</p>
              <p className="mt-1 text-neutral-700">
                {fees.includes.map((i) => INCLUSION_LABEL_TH[i]).join(", ")}
              </p>
            </div>
          )}
          {fees.excludes && fees.excludes.length > 0 && (
            <div className="rounded-xl bg-neutral-50 p-4">
              <p className="text-xs text-neutral-400">ไม่รวม</p>
              <p className="mt-1 text-neutral-700">
                {fees.excludes.map((i) => INCLUSION_LABEL_TH[i]).join(", ")}
              </p>
            </div>
          )}
        </div>
      ) : null}

      {note && (
        <p className="mt-6 rounded-xl border-l-4 border-orange bg-orange/5 p-4 text-sm leading-relaxed text-neutral-700">
          <span className="font-semibold text-purple-dark">ข้อควรรู้สำหรับผู้ปกครอง: </span>
          {note}
        </p>
      )}

      <p className="mt-4 text-xs text-neutral-500">
        แหล่งที่มา: 
        {sourceIsUrl ? (
          <a href={fees.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-orange">
            ตารางค่าเล่าเรียน {schoolName}
          </a>
        ) : (
          fees.sourceUrl ?? "โรงเรียน"
        )}
        ค่าเล่าเรียนปรับทุกปี โปรดยืนยันกับโรงเรียนก่อนวางงบประมาณ{" "}
        <Link
          href="/blog/what-does-international-school-actually-cost-bangkok-2026"
          hrefLang="en"
          className="font-semibold text-orange"
        >
          โรงเรียนนานาชาติในกรุงเทพฯ ต้องใช้เงินเท่าไรจริงๆ (บทความภาษาอังกฤษ)
        </Link>
      </p>
    </section>
  );
}

/** Term start, breaks and term end as one list in date order. */
function termRowsTh(c: SchoolCalendar, notes: Record<string, string>) {
  const rows: { key: string; sort: string; label: string; when: string; note?: string }[] = [];
  if (c.termStart) rows.push({ key: "start", sort: c.termStart, label: "วันเปิดเรียนวันแรกของปีการศึกษา", when: dateTh(c.termStart) });
  for (const b of c.breaks) {
    rows.push({
      key: b.window + b.start,
      sort: b.start,
      label: WINDOW_LABEL_TH[b.window],
      when: rangeFullTh(b.start, b.end) + (b.endEstimated ? " (วันสิ้นสุดเป็นการประมาณ)" : ""),
      note: b.note ? notes[`${b.window}|${b.start}`] : undefined,
    });
  }
  if (c.termEnd) rows.push({ key: "end", sort: c.termEnd, label: "วันสุดท้ายของปีการศึกษา", when: dateTh(c.termEnd) });
  return rows.sort((a, b) => a.sort.localeCompare(b.sort));
}

function TermDatesTh({ calendar, schoolName }: { calendar: SchoolCalendar; schoolName: string }) {
  const publishable = hasPublishableDates(calendar);
  const z = calendar.schoolSlug ? CALENDAR_TH[calendar.schoolSlug] : undefined;
  return (
    <section id="term-dates" className="mt-12 scroll-mt-40">
      <h2 className="font-heading text-2xl font-bold text-purple-dark">
        วันที่ภาคเรียน 2026/27 ของ {schoolName}
      </h2>

      {publishable ? (
        <>
          <p className="mt-2 text-sm text-neutral-600">
            จากปฏิทินที่โรงเรียนประกาศเอง ตรวจสอบเมื่อ {dateTh(calendar.lastVerified)}
            {calendar.confidence === "partial"
              ? "โรงเรียนยังไม่ประกาศช่วงปิดเทอมทั้งหมด จึงมีบางช่วงที่ไม่ได้แสดงด้านล่าง"
              : ""}
          </p>
          <ul className="mt-5 divide-y divide-black/5 overflow-hidden rounded-xl border border-black/10 text-sm">
            {termRowsTh(calendar, z?.breakNotes ?? {}).map((r) => (
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
          เรายังไม่ได้ตรวจสอบปฏิทินฉบับเต็มของโรงเรียนนี้สำหรับปีการศึกษา 2026/27
          {calendar.termStart ? `ปีการศึกษาเริ่มวันที่ ${dateTh(calendar.termStart)}` : ""}
        </p>
      )}

      {calendar.caveat && z?.caveat && (
        <p className="mt-4 text-sm text-neutral-600">{z.caveat}</p>
      )}

      <p className="mt-4 text-xs text-neutral-500">
        แหล่งที่มา: 
        <a href={calendar.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-orange">
          {z?.sourceLabel ?? calendar.sourceLabel}
        </a>
        ปฏิทินอาจเปลี่ยนแปลง โปรดยืนยันกับโรงเรียนก่อนจองตั๋วเครื่องบินหรือแคมป์{" "}
        <Link
          href={calendar.schoolSlug ? `/school-breaks#${calendar.schoolSlug}` : "/school-breaks"}
          hrefLang="en"
          className="font-semibold text-orange"
        >
          เทียบกับโรงเรียนอื่น (หน้าภาษาอังกฤษ)
        </Link>
      </p>
    </section>
  );
}
