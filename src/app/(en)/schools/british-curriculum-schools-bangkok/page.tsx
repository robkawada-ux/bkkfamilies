import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { og, SITE } from "@/lib/seo";
import { SCHOOLS, AREAS, AREA_LABEL, type School } from "@/lib/schools";
import { schoolFees, formatThb, type FeeRow } from "@/lib/schoolFees";
import { EARLY_YEARS_SPECIALISTS, EARLY_YEARS_PATH } from "@/lib/earlyYears";

// Landing page for "british curriculum school(s) bangkok", "british national
// curriculum school bangkok", "british primary school ks1 bangkok" and
// "british nursery bangkok", which were landing on the British School of
// Bangkok (Topsy Turvy) page by accident. Built from SCHOOLS and schoolFees.
//
// FEES: compared on Year 1 only. The fee file's rule is that comparisons
// must be locked to one stage; Year 1 is the first year every British school
// in the table shares, and it is what "KS1" searchers are pricing.

const PATH = "/schools/british-curriculum-schools-bangkok";
const TITLE = "British Curriculum Schools in Bangkok";

const BRITISH = SCHOOLS.filter((s) => s.curricula.includes("British")).sort((a, b) =>
  a.name.localeCompare(b.name),
);
const PURE = BRITISH.filter((s) => s.curricula.length === 1);

/** Early years specialists teaching a British curriculum. */
const NURSERIES = BRITISH.filter((s) => EARLY_YEARS_SPECIALISTS.includes(s.slug));

/** Stops at the end of primary, by stated age range (or description, below). */
const PRIMARY_END = /to (year 6|11|12)\b|primary 6|grade 6\b/i;
const PRIMARY_BY_DESCRIPTION = ["the-british-school-of-bangkok-topsy-turvy-international-school"];
const PRIMARY = BRITISH.filter(
  (s) =>
    !NURSERIES.includes(s) &&
    // Only the main range counts: Dulwich's "(opening with Nursery to Year 6, ...)" is not an end point.
    ((s.ageRange && PRIMARY_END.test(s.ageRange.split("(")[0])) || PRIMARY_BY_DESCRIPTION.includes(s.slug)),
);
const REST = BRITISH.filter((s) => !NURSERIES.includes(s) && !PRIMARY.includes(s));

/** The school's Year 1 row: the first published row whose label starts with "Year 1". */
function yearOne(slug: string): FeeRow | null {
  const f = schoolFees[slug];
  if (!f || f.status !== "published") return null;
  return (f.rows ?? []).find((r) => /^year 1\b/i.test(r.label)) ?? null;
}

const FEES = BRITISH.map((s) => ({ s, row: yearOne(s.slug) }))
  .filter((x): x is { s: School; row: FeeRow } => x.row !== null)
  .sort((a, b) => a.row.annual - b.row.annual);

const WITH_IB = BRITISH.filter((s) => s.curricula.includes("International Baccalaureate"));

function list(names: string[]): string {
  const n = names.map((x) => x.replace(/, ([^,]+)$/, " ($1)"));
  return n.length > 1 ? `${n.slice(0, -1).join(", ")} and ${n[n.length - 1]}` : n.join("");
}

const DESCRIPTION = `${BRITISH.length} British curriculum international schools in Bangkok, from nurseries to sixth form, with Year 1 fees side by side and how the English system works.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    image: `${SITE}/images/og/schools/british-curriculum-schools-bangkok.png`,
  }),
};

const STAGES: [string, string, string][] = [
  ["Early Years Foundation Stage", "Nursery and Reception", "Ages 3 to 5"],
  ["Key Stage 1", "Years 1 and 2", "Ages 5 to 7"],
  ["Key Stage 2", "Years 3 to 6", "Ages 7 to 11"],
  ["Key Stage 3", "Years 7 to 9", "Ages 11 to 14"],
  ["Key Stage 4", "Years 10 and 11, ending in IGCSEs", "Ages 14 to 16"],
  ["Sixth Form", "Years 12 and 13, ending in A levels or the IB Diploma", "Ages 16 to 18"],
];

const cheapest = FEES[0];
const dearest = FEES[FEES.length - 1];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is a British curriculum school?",
    a: "A school that follows the National Curriculum for England, usually adapted for an international setting. Children move through Nursery and Reception, then Years 1 to 13, grouped into Key Stages, and take IGCSEs at 16 and A levels or the IB Diploma at 18.",
  },
  {
    q: "How much do British international schools cost in Bangkok?",
    a:
      FEES.length > 1
        ? `Of the ${FEES.length} British curriculum schools that publish a Year 1 fee, the lowest is ${formatThb(cheapest.row.annual)} baht a year at ${cheapest.s.name} and the highest ${formatThb(dearest.row.annual)} baht at ${dearest.s.name}. Fees rise through the school, and most schools also charge a one-time registration fee, so check the full schedule on each school's page.`
        : "Fees vary widely. Check the full schedule on each school's page.",
  },
  {
    q: "Which British schools in Bangkok are primary only?",
    a: `${list(PRIMARY.map((s) => s.name))} stop at the end of primary, so families need to plan a move at 11.`,
  },
  {
    q: "Where are the British nurseries in Bangkok?",
    a: `The dedicated British curriculum nurseries and kindergartens in our directory are ${list(NURSERIES.map((s) => s.name))}. Most large British schools also run their own nursery: see our guide to international kindergartens and nurseries in Bangkok.`,
  },
  {
    q: "Do British schools in Bangkok offer the IB?",
    a: `Some do, usually as an alternative to A levels in the sixth form. In our directory, ${list(WITH_IB.map((s) => s.name))} list both British and IB programmes. Check each school's page for which qualifications it offers at 16 and 18.`,
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Schools", item: `${SITE}/schools` },
      { "@type": "ListItem", position: 3, name: TITLE, item: `${SITE}${PATH}` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: TITLE,
    numberOfItems: BRITISH.length,
    itemListElement: BRITISH.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${SITE}/schools/${s.slug}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

function Tile({ s, showArea = false }: { s: School; showArea?: boolean }) {
  const other = s.curricula.filter((c) => c !== "British");
  return (
    <Link
      href={`/schools/${s.slug}`}
      className="block rounded-xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <h4 className="font-heading text-base font-bold text-purple-dark">{s.name}</h4>
      <p className="mt-1 text-xs text-neutral-500">
        {[showArea ? AREA_LABEL[s.areas[0]] : null, other.length ? `British and ${other.join(", ")}` : null, s.ageRange ?? null]
          .filter(Boolean)
          .join(" · ") || "British curriculum"}
      </p>
    </Link>
  );
}

export default function BritishSchoolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Curriculum guide"
        title={TITLE}
        subtitle="Every British curriculum international school in our directory, from nurseries to sixth form, with Year 1 fees side by side."
        color="teal"
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-neutral-700">
          <p>
            British curriculum schools are the biggest group in Bangkok&rsquo;s international school
            market. <b>{BRITISH.length}</b> of the {SCHOOLS.length} schools in our directory teach a
            British curriculum, {PURE.length} of them on its own and the rest alongside another
            programme such as the IB or the Singapore curriculum.
          </p>
          <p>
            They range from small nurseries on a Sukhumvit soi to all-through schools with
            sixth forms. Below they are grouped the way parents usually search:
            nurseries and kindergartens, primary schools, and schools that run through to
            secondary. Every school comes from our{" "}
            <Link href="/schools" className="font-semibold text-teal hover:underline">international schools directory</Link>,
            which lists schools licensed by OPEC as international schools or accredited by an
            OPEC-recognised body.
          </p>
        </div>

        <nav className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          <a href="#how-it-works" className="rounded-full border border-teal/40 px-4 py-2 text-teal hover:bg-teal-50">How the system works</a>
          <a href="#nurseries" className="rounded-full border border-teal/40 px-4 py-2 text-teal hover:bg-teal-50">Nurseries</a>
          <a href="#primary" className="rounded-full border border-teal/40 px-4 py-2 text-teal hover:bg-teal-50">Primary schools</a>
          <a href="#all-through" className="rounded-full border border-teal/40 px-4 py-2 text-teal hover:bg-teal-50">Through to secondary</a>
          <a href="#fees" className="rounded-full border border-teal/40 px-4 py-2 text-teal hover:bg-teal-50">Year 1 fees</a>
        </nav>

        <section id="how-it-works" className="mt-14 max-w-3xl scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            How the English National Curriculum works
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Year groups are set by age, so a child joins the year that matches their birthday
            rather than a level they have reached. Exact cut-off dates vary by school.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-black/5 bg-white shadow-sm">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-teal-50 text-xs uppercase tracking-wide text-neutral-600">
                <tr>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Years</th>
                  <th className="px-4 py-3">Ages</th>
                </tr>
              </thead>
              <tbody>
                {STAGES.map(([stage, years, ages]) => (
                  <tr key={stage} className="border-t border-black/5">
                    <td className="px-4 py-2 font-semibold text-purple-dark">{stage}</td>
                    <td className="px-4 py-2 text-neutral-700">{years}</td>
                    <td className="px-4 py-2 text-neutral-700">{ages}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="nurseries" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            British nurseries and kindergartens
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
            Dedicated early years settings following the British Early Years Foundation Stage,
            which stop before Year 1. Most big British schools run their own nursery too: our{" "}
            <Link href={EARLY_YEARS_PATH} className="font-semibold text-teal hover:underline">
              international kindergartens and nurseries
            </Link>{" "}
            page lists both.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {NURSERIES.map((s) => (
              <Tile key={s.slug} s={s} showArea />
            ))}
          </div>
        </section>

        <section id="primary" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">British primary schools</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
            Schools that teach Key Stages 1 and 2 and stop at the end of Year 6, so you will be
            choosing a secondary school at 11. Many of the all-through schools below also have
            strong primary sections.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRIMARY.map((s) => (
              <Tile key={s.slug} s={s} showArea />
            ))}
          </div>
        </section>

        <section id="all-through" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            British schools through to secondary
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
            Grouped by where the main campus is. Where we know a school&rsquo;s age range it is
            shown on the card.
          </p>
          <div className="mt-6 space-y-8">
            {AREAS.map((area) => {
              const here = REST.filter((s) => s.areas[0] === area.id);
              if (here.length === 0) return null;
              return (
                <div key={area.id} id={area.id} className="scroll-mt-28">
                  <h3 className="font-heading text-lg font-bold text-purple-dark">{area.label}</h3>
                  <p className="text-xs text-neutral-500">{area.covers}</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {here.map((s) => (
                      <Tile key={s.slug} s={s} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="fees" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Year 1 fees at British schools in Bangkok
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
            Annual tuition for Year 1, the start of Key Stage 1, from each school&rsquo;s own
            published schedule, lowest first. Comparing one year group keeps it fair: early years
            and sixth form fees are priced too differently to line up. Some schools charge one fee
            across several years, shown in the class column.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-black/5 bg-white shadow-sm">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-teal-50 text-xs uppercase tracking-wide text-neutral-600">
                <tr>
                  <th className="px-4 py-3">School</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3 text-right">Fee a year (THB)</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map(({ s, row }) => (
                  <tr key={s.slug} className="border-t border-black/5">
                    <td className="px-4 py-2">
                      <Link href={`/schools/${s.slug}#fees`} className="font-semibold text-purple-dark hover:underline">
                        {s.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-neutral-700">{row.label}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-neutral-700">{formatThb(row.annual)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            Fee years as published by each school ({Array.from(new Set(FEES.map(({ s }) => schoolFees[s.slug].feeYear))).join(", ")}).
            Registration fees, deposits and extras are on each school&rsquo;s page, and our{" "}
            <Link href="/blog/what-does-international-school-actually-cost-bangkok-2026" className="font-semibold text-orange">
              guide to what international school really costs
            </Link>{" "}
            explains them.
          </p>
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">Questions parents ask</h2>
          <div className="mt-4 space-y-5">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="font-heading text-lg font-bold text-purple-dark">{f.q}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-neutral-700">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 border-t border-black/10 pt-8">
          <Link href="/schools" className="text-sm font-semibold text-orange">
            Browse all international schools in Bangkok
          </Link>
        </div>
      </div>
    </>
  );
}
