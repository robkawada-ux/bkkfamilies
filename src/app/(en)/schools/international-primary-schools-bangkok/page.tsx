import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { og, SITE } from "@/lib/seo";
import { SCHOOLS, AREAS, AREA_LABEL, type School } from "@/lib/schools";
import { schoolFees, formatThb, type FeeRow } from "@/lib/schoolFees";
import { EARLY_YEARS_PATH } from "@/lib/earlyYears";
import { PRIMARY_PATH, PRIMARY_SCHOOLS, PRIMARY_ONLY, ALL_THROUGH, ageSixFee } from "@/lib/primarySchools";

// Landing page for "international primary school bangkok / thailand" and
// "international elementary school bangkok", which were landing on /schools
// at positions 49 to 73. Built from SCHOOLS and schoolFees via
// lib/primarySchools.ts, so it updates when schools are added.

const TITLE = "International Primary Schools in Bangkok";

const FEES = PRIMARY_SCHOOLS.map((s) => ({ s, row: ageSixFee(s.slug) }))
  .filter((x): x is { s: School; row: FeeRow } => x.row !== null)
  .sort((a, b) => a.row.annual - b.row.annual);

const count = (c: string) => PRIMARY_SCHOOLS.filter((s) => s.curricula.includes(c)).length;
const CURRICULA: [string, number][] = (
  [
    ["British", count("British")],
    ["American", count("American")],
    ["International Baccalaureate", count("International Baccalaureate")],
    ["Singaporean", count("Singaporean")],
  ] as [string, number][]
).filter(([, n]) => n > 0);

function list(names: string[]): string {
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names.join("");
}

const DESCRIPTION = `${PRIMARY_SCHOOLS.length} international primary schools in Bangkok by area and curriculum, with fees for the year children turn six side by side.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PRIMARY_PATH },
  openGraph: og({
    title: TITLE,
    description: DESCRIPTION,
    path: PRIMARY_PATH,
    image: `${SITE}/images/og/schools/international-primary-schools-bangkok.png`,
  }),
};

const SYSTEMS: [string, string, string][] = [
  ["British", "Key Stages 1 and 2: Years 1 to 6", "Ages 5 to 11"],
  ["American", "Elementary: Kindergarten and Grades 1 to 5", "Ages 5 to 11"],
  ["IB Primary Years Programme", "A framework, often taught alongside another curriculum", "Ages 3 to 12"],
  ["Singaporean", "Primary 1 to 6", "Ages 6 to 12"],
  ["Australian", "Foundation and Years 1 to 6", "Ages 5 to 12"],
];

const cheapest = FEES[0];
const dearest = FEES[FEES.length - 1];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What age does primary school start at international schools in Bangkok?",
    a: "It depends on the curriculum. British schools start Year 1 at five, American schools start Grade 1 at six after a Kindergarten year, and Singapore schools start Primary 1 at six or seven. Year groups are set by birthday, so check each school's cut-off date.",
  },
  {
    q: "How much does an international primary school cost in Bangkok?",
    a:
      FEES.length > 1
        ? `Comparing the year children turn six to seven, the ${FEES.length} schools that publish that fee range from ${formatThb(cheapest.row.annual)} baht a year at ${cheapest.s.name} to ${formatThb(dearest.row.annual)} baht at ${dearest.s.name}. Most schools also charge registration and other one-time fees, listed on each school's page.`
        : "Fees vary widely. Check the full schedule on each school's page.",
  },
  {
    q: "Which international schools in Bangkok are primary only?",
    a: PRIMARY_ONLY.length
      ? `${list(PRIMARY_ONLY.map((s) => s.name))} stop at the end of primary, so you will need to choose a secondary school at 11 or 12.`
      : "Most international schools in Bangkok run through to secondary.",
  },
  {
    q: "Should I choose a British, American or IB primary school?",
    a: "At primary age the day-to-day differences are smaller than the labels suggest. The bigger questions are where you may move next, which secondary qualifications you want later, and the commute. If you might return to the UK, a British school keeps year groups aligned; if you expect to move often, an IB school makes transfers between countries easier.",
  },
  {
    q: "When should I apply?",
    a: "Many schools admit through the year when there is space, but popular year groups fill for an August start, so contact schools six to twelve months ahead and ask about waiting lists when you visit.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Schools", item: `${SITE}/schools` },
      { "@type": "ListItem", position: 3, name: TITLE, item: `${SITE}${PRIMARY_PATH}` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: TITLE,
    numberOfItems: PRIMARY_SCHOOLS.length,
    itemListElement: PRIMARY_SCHOOLS.map((s, i) => ({
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
  return (
    <Link
      href={`/schools/${s.slug}`}
      className="block rounded-xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <h4 className="font-heading text-base font-bold text-purple-dark">{s.name}</h4>
      <p className="mt-1 text-xs text-neutral-500">
        {[showArea ? AREA_LABEL[s.areas[0]] : null, s.curricula.join(", "), s.ageRange ?? null]
          .filter(Boolean)
          .join(" · ")}
      </p>
    </Link>
  );
}

export default function PrimarySchoolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="Schools guide"
        title={TITLE}
        subtitle="Every international school in our directory that teaches primary-age children, by area and curriculum, with fees compared on one year group."
        color="teal"
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-neutral-700">
          <p>
            <b>{PRIMARY_SCHOOLS.length}</b> of the {SCHOOLS.length} international schools in our directory
            teach primary-age children.{" "}
            {CURRICULA.length > 0 &&
              `By curriculum, ${list(CURRICULA.map(([c, n], i) => `${n}${i === 0 ? " teach" : ""} ${c === "International Baccalaureate" ? "the IB" : c}`))}, and many combine more than one.`}
          </p>
          <p>
            Below, the schools that stop at the end of primary come first, then the schools that run
            through to secondary, grouped by where the main campus is. Every school comes from our{" "}
            <Link href="/schools" className="font-semibold text-teal hover:underline">international schools directory</Link>,
            which lists schools licensed by OPEC as international schools or accredited by an
            OPEC-recognised body.
          </p>
        </div>

        <nav className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          <a href="#curricula" className="rounded-full border border-teal/40 px-4 py-2 text-teal hover:bg-teal-50">Curricula compared</a>
          <a href="#primary-only" className="rounded-full border border-teal/40 px-4 py-2 text-teal hover:bg-teal-50">Primary only</a>
          <a href="#by-area" className="rounded-full border border-teal/40 px-4 py-2 text-teal hover:bg-teal-50">By area</a>
          <a href="#fees" className="rounded-full border border-teal/40 px-4 py-2 text-teal hover:bg-teal-50">Fees</a>
        </nav>

        <section id="curricula" className="mt-14 max-w-3xl scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">How primary works in each curriculum</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Each system names its years differently, which matters when you compare schools or move
            between them. Exact age cut-offs vary by school.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-black/5 bg-white shadow-sm">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-teal-50 text-xs uppercase tracking-wide text-neutral-600">
                <tr>
                  <th className="px-4 py-3">Curriculum</th>
                  <th className="px-4 py-3">Primary years</th>
                  <th className="px-4 py-3">Ages</th>
                </tr>
              </thead>
              <tbody>
                {SYSTEMS.map(([c, years, ages]) => (
                  <tr key={c} className="border-t border-black/5">
                    <td className="px-4 py-2 font-semibold text-purple-dark">{c}</td>
                    <td className="px-4 py-2 text-neutral-700">{years}</td>
                    <td className="px-4 py-2 text-neutral-700">{ages}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-neutral-600">
            Looking at British schools? Our{" "}
            <Link href="/schools/british-curriculum-schools-bangkok" className="font-semibold text-teal hover:underline">
              British curriculum schools
            </Link>{" "}
            guide covers them in more detail. For younger children, see{" "}
            <Link href={EARLY_YEARS_PATH} className="font-semibold text-teal hover:underline">
              international kindergartens and nurseries
            </Link>
            .
          </p>
        </section>

        {PRIMARY_ONLY.length > 0 && (
          <section id="primary-only" className="mt-16 scroll-mt-28">
            <h2 className="font-heading text-2xl font-bold text-purple-dark">Primary-only schools</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
              These stop at the end of primary, which often means smaller classes and a younger
              campus, but you will be choosing a secondary school at 11 or 12.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PRIMARY_ONLY.map((s) => (
                <Tile key={s.slug} s={s} showArea />
              ))}
            </div>
          </section>
        )}

        <section id="by-area" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Schools with primary through to secondary, by area
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
            The commute shapes primary years more than anything, so start with the schools near home.
            Where we know a school&rsquo;s age range it is shown on the card.
          </p>
          <div className="mt-6 space-y-8">
            {AREAS.map((area) => {
              const here = ALL_THROUGH.filter((s) => s.areas[0] === area.id);
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

        {FEES.length > 0 && (
          <section id="fees" className="mt-16 scroll-mt-28">
            <h2 className="font-heading text-2xl font-bold text-purple-dark">
              Primary school fees in Bangkok, compared at age six
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
              Annual tuition for the year a child turns six to seven (British Year 2, American Grade 1,
              Singapore Primary 1), from each school&rsquo;s own published schedule, lowest first.
              Comparing one year group keeps it fair across curricula. Some schools charge one fee
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
        )}

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
