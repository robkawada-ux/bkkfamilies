import type { Metadata } from "next";
import { og } from "@/lib/seo";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SchoolBreakTimeline from "@/components/ui/SchoolBreakTimeline";
import {
  SCHOOL_CALENDARS,
  BREAK_WINDOWS,
  CALENDAR_LAST_VERIFIED,
  type SchoolCalendar,
  type BreakWindowId,
} from "@/lib/schoolBreaks";

const TITLE = "Bangkok International School Holidays 2026/27";
const DESCRIPTION =
  "Verified term dates and break windows for Bangkok's international schools, read off each school's own published calendar. Plus why October half term is two different weeks depending on where your child goes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.bkkfamilies.com/school-breaks",
  },
  openGraph: og({
    title: TITLE,
    description: DESCRIPTION,
    path: "/school-breaks",
  }),
};

const SITE = "https://www.bkkfamilies.com";

const FAQ = [
  {
    q: "Do all Bangkok international schools have the same holidays?",
    a: "No, and the gaps are bigger than people expect. Spring break alone spans five weeks across the schools on this page. Even October, which looks universal, splits into two distinct weeks.",
  },
  {
    q: "When is the best time to book a school holiday camp?",
    a: "For Songkran and summer, January. Those are the two windows where the good camps genuinely fill, partly because they overlap with peak travel and partly because summer programmes open registration early. October and the spring half terms are usually bookable four to six weeks out.",
  },
  {
    q: "Why do some schools break in February and others in March?",
    a: "British curriculum schools place their second half term either in the middle of the spring term or against Easter, and that is a school level decision. Easter Sunday falls on 28 March in 2027, which is late, so the schools that anchor to Easter break unusually far into March.",
  },
  {
    q: "When do international schools in Bangkok finish for summer?",
    a: "Between 22 June and 2 July 2027 for the British schools here, and earlier for American calendar schools. There is no single last day of school in this city.",
  },
  {
    q: "Do Thai public holidays close international schools?",
    a: "Mostly yes, and several fall inside break weeks anyway. King Rama IX Memorial Day on 13 October sits inside the October half term, and Songkran on 13 to 15 April sits inside the April break.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      {
        "@type": "ListItem",
        position: 2,
        name: "School Breaks",
        item: `${SITE}/school-breaks`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bangkok international school break windows 2026/27",
    numberOfItems: BREAK_WINDOWS.length,
    itemListElement: BREAK_WINDOWS.map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: w.label,
    })),
  },
];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function fmt(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** "12 to 16 Oct" when in the same month, otherwise both months shown. */
function range(start: string, end: string): string {
  const [, sm, sd] = start.split("-").map(Number);
  const [, em, ed] = end.split("-").map(Number);
  if (sm === em) return `${sd} to ${ed} ${MONTHS[em - 1]}`;
  return `${sd} ${MONTHS[sm - 1]} to ${ed} ${MONTHS[em - 1]}`;
}

function breakFor(school: SchoolCalendar, window: BreakWindowId) {
  const found = school.breaks.filter((b) => b.window === window);
  if (found.length === 0) return null;
  return found.map((b) => range(b.start, b.end)).join(", ");
}

const TABLE_WINDOWS: { id: BreakWindowId; head: string }[] = [
  { id: "oct-2026", head: "October" },
  { id: "spring-2027", head: "Spring" },
  { id: "songkran-2027", head: "Songkran" },
];

const STYLE_LABEL: Record<SchoolCalendar["style"], string> = {
  british: "British",
  american: "American",
  ib: "IB",
  australian: "Australian",
};

export default function SchoolBreaksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Plan the year"
        title={TITLE}
        subtitle="When the kids are actually off, school by school, read off the calendars themselves."
        color="teal"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Intro */}
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            There is no such thing as the Bangkok school holiday calendar. That
            is the single most useful thing to know before you book a camp, a
            flight or a week of childcare.
          </p>
          <p>
            Every list you find online tells you that British curriculum schools
            take an October half term and Easter, and American schools run
            semesters. True, and almost useless, because the actual dates move
            by weeks between schools that are ten minutes apart. So we went and
            read the published calendars instead. Every date on this page comes
            off a school&rsquo;s own PDF or term dates page, with the source
            linked, and nothing is inferred from what British schools usually
            do.
          </p>
          <p>Here is what we found.</p>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <div className="mx-auto mb-6 max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-purple-dark">
              The whole year at a glance
            </h2>
            <p className="mt-2 text-neutral-600">
              Each bar is a break. The gaps between schools are the point.
            </p>
          </div>
          <SchoolBreakTimeline />
        </div>

        {/* The five windows */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            The windows, and what they actually look like
          </h2>
          <div className="mt-6 space-y-4">
            {BREAK_WINDOWS.map((w) => (
              <div
                key={w.id}
                className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <h3 className="font-heading font-bold text-purple-dark">
                  {w.label}
                </h3>
                <p className="mt-1 text-sm font-semibold text-teal">
                  {range(w.start, w.end)}
                  {w.coreStart && w.coreEnd && (
                    <span className="font-normal text-neutral-500">
                      {"  peak: "}
                      {range(w.coreStart, w.coreEnd)}
                    </span>
                  )}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {w.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* School by school */}
        <div className="mt-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-purple-dark">
              School by school
            </h2>
            <p className="mb-6 mt-2 text-neutral-600">
              Winter break dates are in the section above, since they vary too
              much to fit a column.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-purple/20 text-left">
                  <th className="py-3 pr-4 font-heading text-purple-dark">
                    School
                  </th>
                  <th className="py-3 pr-4 font-heading text-purple-dark">
                    Curriculum
                  </th>
                  <th className="py-3 pr-4 font-heading text-purple-dark">
                    Term 1 starts
                  </th>
                  {TABLE_WINDOWS.map((w) => (
                    <th
                      key={w.id}
                      className="py-3 pr-4 font-heading text-purple-dark"
                    >
                      {w.head}
                    </th>
                  ))}
                  <th className="py-3 font-heading text-purple-dark">
                    Term 3 ends
                  </th>
                </tr>
              </thead>
              <tbody>
                {SCHOOL_CALENDARS.map((s) => (
                  <tr
                    key={s.name}
                    className="border-b border-black/5 align-top"
                  >
                    <td className="py-3 pr-4 font-semibold">
                      {s.schoolSlug ? (
                        <Link
                          href={`/schools/${s.schoolSlug}`}
                          className="text-orange"
                        >
                          {s.name}
                        </Link>
                      ) : (
                        s.name
                      )}
                      {s.confidence !== "verified" && (
                        <span className="ml-2 rounded bg-neutral-100 px-1.5 py-0.5 text-xs font-normal text-neutral-500">
                          {s.confidence === "partial"
                            ? "partial"
                            : "unconfirmed"}
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-neutral-600">
                      {STYLE_LABEL[s.style]}
                    </td>
                    <td className="py-3 pr-4 text-neutral-600">
                      {s.termStart ? fmt(s.termStart) : "not published"}
                    </td>
                    {TABLE_WINDOWS.map((w) => (
                      <td key={w.id} className="py-3 pr-4 text-neutral-600">
                        {breakFor(s, w.id) ?? (
                          <span className="text-neutral-400">
                            not published
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="py-3 text-neutral-600">
                      {s.termEnd ? fmt(s.termEnd) : "not published"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Worth knowing */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Worth knowing
          </h2>
          <p className="mt-2 text-neutral-600">
            A few honest caveats, because a calendar page that pretends to be
            complete is worse than one that admits its gaps.
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700">
            <li>
              <strong>Patana states that its calendar may be revised</strong> if
              the Thai government changes public holiday dates during the year.
              That applies in practice to every school here.
            </li>
            <li>
              <strong>
                Shrewsbury publishes term start and end dates but not half
                terms.
              </strong>{" "}
              We have their Term 1 and Term 2 boundaries and nothing in between.
            </li>
            <li>
              <strong>ISB and KIS publish inside PDF viewers</strong> that
              cannot be read reliably from outside a browser. We have
              ISB&rsquo;s board approved 13 August start date and nothing else
              confirmed. Both are on our list to add.
            </li>
            <li>
              <strong>Secondary and primary sometimes differ</strong> at schools
              with separate campuses, and residential or trip weeks can pull
              year groups out of school outside these windows.
            </li>
            <li>
              <strong>Always check your own school&rsquo;s calendar</strong>{" "}
              before you pay a deposit. This page is a planning tool, not a
              substitute.
            </li>
          </ul>
        </div>

        {/* Sources */}
        <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Where these dates come from
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600">
            {SCHOOL_CALENDARS.map((s) => (
              <li key={s.name}>
                <span className="font-semibold text-neutral-700">{s.name}</span>
                {": "}
                <a
                  href={s.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange"
                >
                  {s.sourceLabel}
                </a>
                {s.caveat && (
                  <span className="block text-neutral-500">{s.caveat}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Questions parents ask
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

        {/* Next */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Next
          </h2>
          <ul className="mt-4 space-y-3 text-neutral-700">
            <li>
              <Link href="/schools" className="font-semibold text-orange">
                Our schools directory
              </Link>
              , if you are still choosing a school rather than planning around
              one.
            </li>
            <li>
              <a
                href="https://www.facebook.com/groups/395501457186828"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-orange"
              >
                Bangkok Expat Families on Facebook
              </a>
              , where 40,000 parents compare notes on exactly this.
            </li>
          </ul>
        </div>

        {/* Corrections */}
        <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Spot a date that is wrong?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Calendars get revised and schools publish late. If a date here is
            wrong, or your school is missing and you have the calendar to hand,
            tell us. Corrections get made the same week.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Send us a correction
          </Link>
          <p className="mt-6 text-xs text-neutral-500">
            All dates verified {fmt(CALENDAR_LAST_VERIFIED)} against each
            school&rsquo;s published calendar. We re-check when schools publish
            new academic years, usually October and November.
          </p>
        </div>
      </div>
    </>
  );
}
