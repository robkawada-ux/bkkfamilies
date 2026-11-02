import type { Metadata } from "next";
import Link from "next/link";
import { og, SITE } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import InsuranceDirectory from "@/components/ui/InsuranceDirectory";
import RichText, { stripRichText } from "@/components/ui/RichText";
import {
  INSURERS,
  INSURERS_SORTED,
  INSURANCE_OPTIONS,
  QUOTE_ONLY,
  TYPE_LABEL,
  TYPE_LABEL_PLURAL,
  formatMoney,
  type Insurer,
  type PriceExample,
} from "@/lib/insurance";
import { GUIDE, INSURANCE_FAQ } from "@/lib/insuranceGuide";

const PATH = "/healthcare/insurance";
const TITLE = "Health Insurance in Thailand for Families (2026)";
const DESCRIPTION =
  "Health insurance in Thailand for expat families: every option, real 2026 prices, and honest reviews of Pacific Cross, LUMA, AIA, Cigna, Allianz and more.";
const PUBLISHED = "2026-09-14";
const REVIEWED = "2026-09-17";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "health insurance Thailand",
    "Thailand health insurance for expats",
    "expat health insurance Bangkok",
    "family health insurance Thailand",
    "health insurance Thailand cost",
    "best health insurance Thailand",
    "Thailand health insurance reviews",
    "Pacific Cross review",
    "LUMA health insurance review",
    "Cigna Global Thailand",
    "AIA Health Happy Kids",
    "Thailand social security foreigners",
    "maternity insurance Thailand",
    "international health insurance Thailand",
    "health insurance for children Thailand",
  ],
  alternates: { canonical: `${SITE}${PATH}` },
  openGraph: og({ title: TITLE, description: DESCRIPTION, path: PATH }),
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
function longDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function priceCell(p: PriceExample): string {
  const cur = p.currency ?? "THB";
  const main = formatMoney(p.amount, cur);
  const both =
    typeof p.amountAlt === "number"
      ? `${main} / ${formatMoney(p.amountAlt, cur)}`
      : main;
  return `${both} a ${p.period}`;
}

const PRICE_ROWS: { insurer: Insurer; price: PriceExample }[] = INSURERS_SORTED.flatMap(
  (insurer) => (insurer.priceExamples ?? []).map((price) => ({ insurer, price }))
);

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Healthcare", item: `${SITE}/healthcare` },
      { "@type": "ListItem", position: 3, name: "Health insurance", item: `${SITE}${PATH}` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: REVIEWED,
    mainEntityOfPage: `${SITE}${PATH}`,
    image: `${SITE}${PATH}/opengraph-image.png`,
    author: { "@type": "Organization", name: "BKK Families", url: SITE },
    publisher: { "@type": "Organization", name: "BKK Families", url: SITE },
    about: [
      { "@type": "Thing", name: "Health insurance in Thailand" },
      { "@type": "Thing", name: "Expat health insurance" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Health insurance providers for families in Thailand",
    numberOfItems: INSURERS_SORTED.length,
    itemListElement: INSURERS_SORTED.map((i, n) => ({
      "@type": "ListItem",
      position: n + 1,
      name: i.name,
      url: `${SITE}${PATH}/${i.slug}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: INSURANCE_FAQ.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: stripRichText(f.answer) },
    })),
  },
];

export default function InsurancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={`${INSURERS.length} providers reviewed · updated ${longDate(REVIEWED)}`}
        title="Health Insurance in Thailand"
        subtitle="Every way an expat family in Bangkok can be covered, what it actually costs where anyone will say, and an honest review of each insurer. Nobody paid to be on this page."
        color="teal"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <nav
          aria-label="On this page"
          className="mx-auto max-w-3xl rounded-xl border border-black/5 bg-neutral-50 p-5 text-sm"
        >
          <p className="font-heading font-bold text-purple-dark">On this page</p>
          <ul className="mt-2 grid gap-1 sm:grid-cols-2">
            <li><a href="#options" className="text-teal hover:underline">Your health insurance options</a></li>
            <li><a href="#costs" className="text-teal hover:underline">What it costs in Thailand</a></li>
            <li><a href="#reviews" className="text-teal hover:underline">Insurer reviews</a></li>
            <li><a href="#guide" className="text-teal hover:underline">How to choose</a></li>
            <li><a href="#maternity" className="text-teal hover:underline">The maternity waiting period</a></li>
            <li><a href="#faq" className="text-teal hover:underline">Questions families ask</a></li>
          </ul>
        </nav>

        {/* ---------------------------------------------------------- */}
        <section id="options" className="mt-14 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark md:text-3xl">
            Your health insurance options in Thailand
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
            Most families end up with a combination of these rather than just
            one. Start with the card that describes your situation.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {INSURANCE_OPTIONS.map((o) => (
              <div
                key={o.id}
                id={`option-${o.id}`}
                className="flex flex-col rounded-xl border-2 border-teal/30 bg-white p-6 shadow-sm"
              >
                <h3 className="font-heading text-lg font-bold text-purple-dark">
                  {o.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-600">{o.whoFor}</p>
                <dl className="mt-4 flex-1 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">Cost</dt>
                    <dd className="text-neutral-800">{o.cost}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wide text-green-700">Good</dt>
                    <dd className="text-neutral-700">{o.good}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wide text-orange">Watch for</dt>
                    <dd className="text-neutral-700">{o.watch}</dd>
                  </div>
                </dl>
                {o.types && (
                  <a
                    href="#reviews"
                    className="mt-4 inline-block text-sm font-semibold text-orange hover:underline"
                  >
                    See the {o.types.map((t) => TYPE_LABEL_PLURAL[t]).join(" and ")} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        <section id="costs" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark md:text-3xl">
            How much health insurance costs in Thailand
          </h2>
          <div className="mt-3 max-w-3xl space-y-3 text-sm leading-relaxed text-neutral-700">
            <p>
              Insurers here almost never publish prices. The table holds only
              figures we can point to a source for, each linked and dated. We
              would rather leave a gap than fill it with a guess, because a wrong
              premium is worse than none.
            </p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-purple-dark text-left">
                  <th className="py-2 pr-4 font-heading font-bold text-purple-dark">Provider</th>
                  <th className="py-2 pr-4 font-heading font-bold text-purple-dark">What the price is for</th>
                  <th className="py-2 pr-4 font-heading font-bold text-purple-dark">Cost</th>
                  <th className="py-2 font-heading font-bold text-purple-dark">Source</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_ROWS.map(({ insurer, price }) => (
                  <tr key={`${insurer.slug}-${price.label}`} className="border-b border-black/5 align-top">
                    <td className="py-2.5 pr-4">
                      <Link
                        href={`${PATH}/${insurer.slug}`}
                        className="font-semibold text-teal hover:underline"
                      >
                        {insurer.name}
                      </Link>
                      <span className="block text-xs text-neutral-500">
                        {TYPE_LABEL[insurer.type]}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-neutral-700">
                      {price.label}
                      {price.note && (
                        <span className="mt-0.5 block text-xs text-neutral-500">{price.note}</span>
                      )}
                    </td>
                    <td className="py-2.5 pr-4 font-semibold text-neutral-800">
                      {priceCell(price)}
                      {price.amountLabels && (
                        <span className="block text-xs font-normal text-neutral-500">
                          {price.amountLabels.join(" / ")}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 text-xs">
                      <a
                        href={price.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-teal hover:underline"
                      >
                        {price.sourceLabel}
                      </a>
                      <span className="block text-neutral-500">
                        Checked {longDate(price.checked)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid items-start gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-orange/30 bg-orange-50 p-6">
              <h3 className="font-heading text-lg font-bold text-purple-dark">
                A rough family budget
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                Two parents aged 40 and two children aged 6 to 10 on AIA&rsquo;s
                5 million baht local plan come to about{" "}
                <strong>120,000 baht a year</strong> in rider premiums, before
                the life policy the riders sit on. Pacific Prime&rsquo;s 2024
                average for an international family plan in Thailand was{" "}
                <strong>US$18,027</strong>, about 565,000 baht. Most families
                land somewhere between the two, and a deductible is the fastest
                way to move down that range.
              </p>
            </div>

            <div className="rounded-xl border border-black/5 bg-neutral-50 p-6">
              <h3 className="font-heading text-lg font-bold text-purple-dark">
                Quote only: no published price
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                On 17 September 2026 we tried the online quote tools for a
                sample family of two adults aged 40 and children aged 8 and 11.
                Cigna, Pacific Cross and LUMA all asked for a name, email or
                phone number before showing any price, and none of these{" "}
                {QUOTE_ONLY.length} publishes one. That is the only reason they
                are not in the table. It says nothing about whether they are
                expensive.
              </p>
              <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                {QUOTE_ONLY.map((i) => (
                  <li key={i.slug}>
                    <Link
                      href={`${PATH}/${i.slug}`}
                      className="text-sm font-semibold text-teal hover:underline"
                    >
                      {i.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-neutral-500">
                Got a quote from any of these you are happy to share, with the
                names taken out? Send it over and we will add it as a dated
                example.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        <section id="reviews" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark md:text-3xl">
            Thailand health insurance reviews
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-600">
            A plain-English review of every provider here: who it suits, the
            plans, the pros and cons, and anything we would warn a friend about.
            Listed by type, then alphabetically. Nothing is ranked and nothing
            is paid for.
          </p>
          <div className="mt-6">
            <InsuranceDirectory />
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        <section id="guide" className="mx-auto mt-20 max-w-3xl scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark md:text-3xl">
            How to choose health insurance in Thailand
          </h2>
          <div className="mt-6 space-y-10">
            {GUIDE.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-28">
                <h3 className="font-heading text-xl font-bold text-purple-dark">
                  {s.heading}
                </h3>
                <div className="mt-3 space-y-4 leading-relaxed text-neutral-700">
                  {s.paragraphs.map((p, n) => (
                    <p key={n}>
                      <RichText text={p} />
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        <section id="faq" className="mx-auto mt-16 max-w-3xl scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Questions families ask about health insurance in Thailand
          </h2>
          <div className="mt-6 space-y-4">
            {INSURANCE_FAQ.map((f) => (
              <div key={f.question} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <h3 className="font-heading font-bold text-purple-dark">{f.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  <RichText text={f.answer} />
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto mt-16 grid max-w-3xl gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-black/5 bg-teal-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              Check your hospital first
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Every hospital in our directory says whether it bills most
              international insurers directly, a short panel, or none.
            </p>
            <Link
              href="/healthcare/hospitals"
              className="mt-4 inline-block text-sm font-semibold text-orange hover:underline"
            >
              Browse hospitals and clinics →
            </Link>
          </div>
          <div className="rounded-xl border border-black/5 bg-neutral-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              How this page is paid for
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Today, it is not. No insurer or broker pays to be listed and we
              take no commission. If that changes, any paid placement will be
              clearly labelled as sponsored and will never change a review or
              the order of the price table. Insurers and brokers interested in
              sponsorship can{" "}
              <Link href="/contact" className="font-semibold text-teal hover:underline">
                get in touch
              </Link>
              .
            </p>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs leading-relaxed text-neutral-500">
          Last reviewed {longDate(REVIEWED)}. This page is general information,
          not financial, legal or medical advice, and we are not licensed
          insurance brokers or advisers. Nothing here is a recommendation to buy
          or avoid any policy. Premiums, benefits and visa rules change, so
          confirm everything with the insurer or a licensed broker before you
          rely on it.
        </p>
      </div>
    </>
  );
}
