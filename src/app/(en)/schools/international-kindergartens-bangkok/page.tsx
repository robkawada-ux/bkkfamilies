import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { og, SITE } from "@/lib/seo";
import { AREAS, AREA_LABEL, type School } from "@/lib/schools";
import { schoolFees, formatThb } from "@/lib/schoolFees";
import {
  SPECIALIST_SCHOOLS,
  SCHOOLS_WITH_EARLY_YEARS,
  EARLY_YEARS_PATH,
  earlyYearsFees,
} from "@/lib/earlyYears";

// Landing page for "international kindergarten / nursery / preschool
// bangkok" searches, which were landing on /schools at position 40 to 70.
// Everything below is built from SCHOOLS and schoolFees, so it stays in step
// with the directory. See lib/earlyYears.ts for who qualifies and why.

const PATH = EARLY_YEARS_PATH;
const TITLE = "International Kindergartens and Nurseries in Bangkok";
const DESCRIPTION = `${SPECIALIST_SCHOOLS.length} international kindergartens and nurseries in Bangkok, plus ${SCHOOLS_WITH_EARLY_YEARS.length} international schools with their own nursery, and published early years fees.`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: og({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    image: `${SITE}/images/og/schools/international-kindergartens-bangkok.png`,
  }),
};

/** Fee for one named row, or null if the school or row is not published. */
function rowFee(slug: string, label: string): number | null {
  return earlyYearsFees(slug).find((r) => r.label === label)?.annual ?? null;
}

const FEE_SCHOOLS = [...SPECIALIST_SCHOOLS, ...SCHOOLS_WITH_EARLY_YEARS]
  .filter((s) => earlyYearsFees(s.slug).length > 0)
  .sort((a, b) => a.name.localeCompare(b.name));

const CENTRAL = [...SPECIALIST_SCHOOLS, ...SCHOOLS_WITH_EARLY_YEARS]
  .filter((s) => s.areas.includes("central"))
  // "Regent's International School Bangkok, Langsuan Campus" would break a comma list.
  .map((s) => s.name.replace(/, ([^,]+)$/, " ($1)"))
  .sort();

const over700 = [
  ["harrow-international-school-bangkok", "Nursery full day", "Harrow"],
  ["kings-college-international-school-bangkok", "Nursery", "King's College"],
  ["wellington-international-school-bangkok", "Nursery", "Wellington"],
].filter(([slug, label]) => (rowFee(slug, label) ?? 0) > 700000);
const giisNursery = rowFee("global-indian-international-school", "Nursery");
const wellsNursery = rowFee("wells-international-school", "Nursery");

const FAQ: { q: string; a: string }[] = [
  {
    q: "How much does an international kindergarten cost in Bangkok?",
    a: [
      `${FEE_SCHOOLS.length} of the schools on this page publish their current early years fees, and they vary more than at any other stage.`,
      over700.length
        ? `Nursery at ${over700.map((x) => x[2]).join(", ").replace(/, ([^,]*)$/, " and $1")} is over 700,000 baht a year.`
        : "",
      giisNursery && wellsNursery
        ? `At the other end, Nursery is ${formatThb(giisNursery)} baht a year at Global Indian International School and ${formatThb(wellsNursery)} at Wells International School.`
        : "",
      "Compare the same hours and inclusions, because half-day, full-day and parent-and-toddler places are priced very differently. Most dedicated kindergartens do not publish fees, so ask them directly.",
    ]
      .filter(Boolean)
      .join(" "),
  },
  {
    q: "What age do children start international kindergarten in Bangkok?",
    a: "Most international schools here take children from age two or three, usually into a pre-nursery or nursery class. Some dedicated early years settings start younger: Hampton, Kids Kingdom, The Purple Elephant and the Regents Langsuan campus take children from 18 months, and Tiny Tots and Storytime from age one.",
  },
  {
    q: "What is the difference between nursery, pre-K, kindergarten and reception?",
    a: "They are different names for broadly the same years in different systems. British schools usually run Pre-Nursery at around age two, Nursery at three and Reception at four, before Year 1. American schools usually call the years before Grade 1 Pre-K and Kindergarten, and many Asian and Thai-run schools use K1 to K3 for ages three to five. Check each school's own age cut-off dates, because they vary.",
  },
  {
    q: "Which international kindergartens are near Silom and Sathorn?",
    a: `In our Central, Sathorn and Rama 3 area, which covers Silom, Sathorn, Ploenchit, Phaya Thai, Dusit and Rama 3, the schools that take early years children are ${CENTRAL.join(", ").replace(/, ([^,]*)$/, " and $1")}.`,
  },
  {
    q: "Should we choose a dedicated kindergarten or a full international school?",
    a: "If you already know which school you want for primary, joining its nursery can save a second application later. If you do not, a dedicated kindergarten close to home buys time, keeps the daily journey short and is usually smaller. Either way, the commute matters more at this age than almost anything else.",
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
    numberOfItems: SPECIALIST_SCHOOLS.length + SCHOOLS_WITH_EARLY_YEARS.length,
    itemListElement: [...SPECIALIST_SCHOOLS, ...SCHOOLS_WITH_EARLY_YEARS].map((s, i) => ({
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

function SchoolTile({ s }: { s: School }) {
  return (
    <Link
      href={`/schools/${s.slug}`}
      className="block rounded-xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <h4 className="font-heading text-base font-bold text-purple-dark">{s.name}</h4>
      <p className="mt-1 text-xs text-neutral-500">
        {s.curricula.join(", ")}
        {s.ageRange ? ` · ${s.ageRange}` : ""}
      </p>
    </Link>
  );
}

function ByArea({ schools }: { schools: School[] }) {
  return (
    <div className="mt-6 space-y-8">
      {AREAS.map((area) => {
        const here = schools.filter((s) => s.areas[0] === area.id);
        if (here.length === 0) return null;
        return (
          <div key={area.id} id={area.id} className="scroll-mt-28">
            <h3 className="font-heading text-lg font-bold text-purple-dark">{area.label}</h3>
            <p className="text-xs text-neutral-500">{area.covers}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {here.map((s) => (
                <SchoolTile key={s.slug} s={s} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function KindergartensPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Early years"
        title={TITLE}
        subtitle="Every international kindergarten, nursery and preschool in our directory, plus the international schools that run their own nursery, with published early years fees."
        color="teal"
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-neutral-700">
          <p>
            Bangkok has two quite different kinds of international early years setting, and it
            helps to know which one you are looking for. The first is a dedicated kindergarten,
            nursery or preschool: small, usually close to home, and finished by the time your
            child is five or six. The second is a full international school with its own nursery
            or kindergarten, where a place at two or three can carry on to the end of secondary
            school.
          </p>
          <p>
            We list <b>{SPECIALIST_SCHOOLS.length}</b> of the first kind and{" "}
            <b>{SCHOOLS_WITH_EARLY_YEARS.length}</b> of the second. Every school here comes from
            our <Link href="/schools" className="font-semibold text-teal hover:underline">international schools directory</Link>,
            which lists schools licensed by OPEC as international schools or accredited by an
            OPEC-recognised body, and says so on the school&rsquo;s own page where we have not
            been able to confirm it. Families in Silom and Sathorn should start with the{" "}
            <a href="#central" className="font-semibold text-teal hover:underline">Central, Sathorn and Rama 3</a> groups.
          </p>
        </div>

        <nav className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          <a href="#kindergartens" className="rounded-full border border-teal/40 px-4 py-2 text-teal hover:bg-teal-50">Kindergartens and nurseries</a>
          <a href="#full-schools" className="rounded-full border border-teal/40 px-4 py-2 text-teal hover:bg-teal-50">Schools with a nursery</a>
          <a href="#fees" className="rounded-full border border-teal/40 px-4 py-2 text-teal hover:bg-teal-50">Early years fees</a>
          <a href="#choosing" className="rounded-full border border-teal/40 px-4 py-2 text-teal hover:bg-teal-50">How to choose</a>
        </nav>

        <section id="kindergartens" className="mt-14 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            International kindergartens, nurseries and preschools
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
            These stop before primary school, so you will be choosing again at five or six. In
            return they are small and local, and a short daily journey counts for a lot at this age.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALIST_SCHOOLS.map((s) => (
              <div key={s.slug}>
                <SchoolTile s={s} />
                <p className="mt-1 px-1 text-xs text-neutral-500">{AREA_LABEL[s.areas[0]]}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="full-schools" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            International schools with their own nursery or kindergarten
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
            Full schools that take children from nursery or kindergarten age, grouped by where
            their main campus is. A school is listed here when its published fees include early
            years classes or its stated age range starts at three or younger.
          </p>
          <ByArea schools={SCHOOLS_WITH_EARLY_YEARS} />
        </section>

        <section id="fees" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Published early years fees
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
            The early years rows from each school&rsquo;s own published schedule. Read them school
            by school rather than down the column: a half-day pre-nursery, a parent-and-toddler
            session and a full-day reception class are not the same product, and some include
            lunch while others do not. Each school&rsquo;s page has the full schedule and what it
            leaves out.
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
                {FEE_SCHOOLS.map((s) =>
                  earlyYearsFees(s.slug).map((r, i, rows) => (
                    <tr
                      key={`${s.slug}-${r.label}`}
                      className={i === rows.length - 1 ? "border-b border-black/10" : ""}
                    >
                      <td className="px-4 py-2 align-top">
                        {i === 0 ? (
                          <Link href={`/schools/${s.slug}#fees`} className="font-semibold text-purple-dark hover:underline">
                            {s.name}
                          </Link>
                        ) : null}
                      </td>
                      <td className="px-4 py-2 text-neutral-700">{r.label}</td>
                      <td className="px-4 py-2 text-right tabular-nums text-neutral-700">{formatThb(r.annual)}</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            Current fee years as published by each school ({Array.from(new Set(FEE_SCHOOLS.map((s) => schoolFees[s.slug].feeYear))).join(", ")}).
            Fees change every year, so confirm with the school before you budget.
          </p>
        </section>

        <section id="choosing" className="mt-16 max-w-3xl scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            How to choose an international kindergarten in Bangkok
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-neutral-700">
            <p>
              <b>Start with the journey.</b> At this age a long daily drive costs more than any
              difference in curriculum, and Bangkok traffic turns a short distance into a long trip
              at school run times. Check the route at 7.30am on a weekday, not on a Sunday.
            </p>
            <p>
              <b>Decide whether this is a two-year choice or a fifteen-year one.</b> If you already
              know which school you want for primary, joining its nursery can save a second
              application later. If you do not, a local kindergarten buys time.
            </p>
            <p>
              <b>Compare the same hours.</b> Many early years places are priced by half day or full
              day, and some of the youngest groups expect a parent to attend. A cheaper headline
              fee is often a shorter day.
            </p>
            <p>
              <b>Ask what is included.</b> Lunch, snacks, uniform and transport vary from school to
              school, and so do one-time registration fees, which our{" "}
              <Link href="/blog/what-does-international-school-actually-cost-bangkok-2026" className="font-semibold text-teal hover:underline">
                guide to what international school really costs
              </Link>{" "}
              covers.
            </p>
            <p>
              <b>Visit while classes are running.</b> An open day shows you the building. A normal
              Tuesday morning shows you the teachers.
            </p>
            <p>
              Looking for something lighter than a school place? Our{" "}
              <Link href="/playgroups" className="font-semibold text-teal hover:underline">playgroups directory</Link>{" "}
              lists baby and toddler groups across Bangkok, and our{" "}
              <Link href="/school-breaks" className="font-semibold text-teal hover:underline">school holidays calendar</Link>{" "}
              shows term dates side by side.
            </p>
          </div>
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
