import type { Metadata } from "next";
import Link from "next/link";
import { og } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import HealthcareDirectory from "@/components/ui/HealthcareDirectory";
import { MATERNITY_FACILITIES, EMERGENCY_NUMBER } from "@/lib/healthcare";

const TITLE = "Having a Baby in Bangkok: Every Published Price Compared";
const DESCRIPTION =
  "Delivery package prices at Bangkok's private hospitals side by side, read from each hospital's own page, plus the exclusions that decide your actual bill and the insurance waiting period that catches most families.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.bkkfamilies.com/healthcare/maternity" },
  openGraph: og({
    title: TITLE,
    description: DESCRIPTION,
    path: "/healthcare/maternity",
  }),
};

const SITE = "https://www.bkkfamilies.com";

const FAQ = [
  {
    q: "How much does it cost to have a baby in Bangkok?",
    a: "Published packages at private hospitals run from about 48,900 baht at the cheapest end to 249,000 or more for premium and twin packages at the international hospitals. Most expat families land between 110,000 and 170,000 baht for a normal delivery or a caesarean at a well-known private hospital. Those figures are for an uncomplicated birth, and prenatal care is usually billed separately.",
  },
  {
    q: "Which hospital should I choose for the birth?",
    a: "For a straightforward pregnancy, any of the private hospitals in this list will deliver your baby safely, so the real variables are the obstetrician you trust, how far you are willing to travel in labour, and what you want to pay. It stops being a matter of preference if the pregnancy is high risk, you are expecting twins, or the baby may need intensive care, in which case ask directly what level of neonatal care the hospital can provide without transferring you.",
  },
  {
    q: "Why are some prices missing?",
    a: "Two different reasons, and we keep them separate. BNH markets an all-inclusive maternity package but quotes only on enquiry rather than publishing a figure. For the other hospitals without a price, we have not yet confirmed a published package, which is a gap in our research rather than a statement about the hospital. Either way we would rather show the gap than fill it with an estimate.",
  },
  {
    q: "Does insurance cover giving birth in Thailand?",
    a: "Only if you bought maternity cover well before conceiving. Maternity is typically an add-on with a waiting period of around ten months, and sometimes longer, so a policy taken out after a positive test will not pay for the birth. This is standard across the market rather than one insurer's quirk.",
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
        name: "Healthcare",
        item: `${SITE}/healthcare`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Having a baby",
        item: `${SITE}/healthcare/maternity`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bangkok hospitals that deliver babies",
    numberOfItems: MATERNITY_FACILITIES.length,
    itemListElement: MATERNITY_FACILITIES.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: f.name,
      url: `${SITE}/healthcare/hospitals/${f.slug}`,
    })),
  },
];

function baht(n: number): string {
  return `฿${n.toLocaleString()}`;
}

export default function MaternityPage() {
  const priced = MATERNITY_FACILITIES.filter(
    (f) => typeof f.maternity?.packageFrom === "number"
  ).sort(
    (a, b) => (a.maternity!.packageFrom ?? 0) - (b.maternity!.packageFrom ?? 0)
  );
  /**
   * Every hospital that delivers babies gets a row, priced or not. Hiding the
   * unpriced ones in a footnote below the table made them effectively
   * invisible, which is how a hospital already in the directory looked missing.
   */
  const unpriced = MATERNITY_FACILITIES.filter(
    (f) => typeof f.maternity?.packageFrom !== "number"
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={`${MATERNITY_FACILITIES.length} hospitals compared`}
        title="Having a Baby in Bangkok"
        subtitle="Every delivery package price we can verify, side by side, read from each hospital's own page. Plus the exclusions that actually decide your bill."
        color="teal"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            Nobody publishes these numbers next to each other, which is why
            working out what a birth costs here is unreasonably hard. Every
            hospital packages differently, some put the figure in an image so it
            never shows up in a search, and at least one will not publish at all.
          </p>
          <p>
            So here they are together, cheapest first, with the date each price
            was checked and a link to the page it came from. Then the part that
            matters more than the headline price, which is what each package
            leaves out.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-purple-dark text-left">
                <th className="py-2 pr-4 font-heading font-bold text-purple-dark">
                  Hospital
                </th>
                <th className="py-2 pr-4 font-heading font-bold text-purple-dark">
                  Area
                </th>
                <th className="py-2 pr-4 font-heading font-bold text-purple-dark">
                  From
                </th>
                <th className="py-2 font-heading font-bold text-purple-dark">
                  Up to
                </th>
              </tr>
            </thead>
            <tbody>
              {priced.map((f) => (
                <tr key={f.slug} className="border-b border-black/5">
                  <td className="py-2.5 pr-4">
                    <Link
                      href={`/healthcare/hospitals/${f.slug}`}
                      className="font-semibold text-teal hover:underline"
                    >
                      {f.name}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-4 text-neutral-600">{f.area}</td>
                  <td className="py-2.5 pr-4 font-semibold text-neutral-800">
                    {baht(f.maternity!.packageFrom!)}
                  </td>
                  <td className="py-2.5 text-neutral-600">
                    {f.maternity?.packageTo
                      ? baht(f.maternity.packageTo)
                      : "One package only"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mx-auto mt-4 max-w-3xl text-xs leading-relaxed text-neutral-500">
          Prices are each hospital&rsquo;s own published figure for an
          uncomplicated birth, read from their package page and dated on their
          entry. Only hospitals that publish a price appear above.
        </p>

        {unpriced.length > 0 && (
          <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-black/5 bg-neutral-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              Also deliver babies, but do not publish a price
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              These {unpriced.length} are not in the table because there is no
              figure to put in it. They are worth calling, particularly if one is
              near you, since an unpublished price is not the same as a high one.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {unpriced.map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/healthcare/hospitals/${f.slug}`}
                    className="text-sm font-semibold text-teal hover:underline"
                  >
                    {f.name}
                  </Link>
                  <span className="block text-xs text-neutral-500">
                    {f.area}
                    {f.maternity?.pricing === "on-enquiry"
                      ? " · quotes on enquiry"
                      : " · not yet confirmed by us"}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
              &ldquo;Quotes on enquiry&rdquo; means we checked and the hospital
              does not publish. &ldquo;Not yet confirmed&rdquo; means we have not
              finished checking, which is on us rather than on them. If you get a
              quote from any of these, send it over and we will add it.
            </p>
          </div>
        )}

        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-orange/30 bg-orange-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            The price is not the bill
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            Every package above is priced for a birth that goes to plan, and the
            exclusions are where the money actually moves. MedPark excludes
            phototherapy for newborn jaundice, which is common. Nakornthon adds
            7,000 baht for an elective caesarean booked between 10pm and 7:59am
            and excludes a BMI above 35. Vichaiyut excludes prenatal care
            entirely. Bumrungrad deducts 15,000 baht and reverts all baby and
            paediatrician charges to standard rates if a complication affects the
            baby but not the mother.
          </p>
          <Link
            href="/blog/having-a-baby-in-bangkok"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Read the full guide, including the five questions to ask
          </Link>
          <Link
            href="/healthcare/insurance#maternity"
            className="mt-3 inline-block text-sm font-semibold text-teal hover:underline sm:ml-4"
          >
            Will insurance pay? Check the waiting period →
          </Link>
        </div>

        <div id="directory" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Browse the hospitals
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Filtered to maternity. Clear the filter to see everything in the
            directory.
          </p>
          <div className="mt-6">
            <HealthcareDirectory initialService="maternity" />
          </div>
        </div>

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

        <p className="mx-auto mt-10 max-w-3xl text-xs leading-relaxed text-neutral-500">
          This page is information, not medical advice, and is not a
          recommendation to use or avoid any hospital. Prices change and packages
          are withdrawn, so confirm directly with the hospital before you rely on
          anything here. In an emergency, Thailand&rsquo;s national ambulance
          number is {EMERGENCY_NUMBER}.
        </p>
      </div>
    </>
  );
}
