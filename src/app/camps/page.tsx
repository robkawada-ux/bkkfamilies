import type { Metadata } from "next";
import { og } from "@/lib/seo";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CampsDirectory from "@/components/ui/CampsDirectory";
import { CAMPS, ALL_SESSIONS } from "@/lib/camps";

const TITLE = "Holiday Camps in Bangkok";
const DESCRIPTION =
  "Every school holiday camp we can verify in Bangkok, with real dates, real ages and real prices. Filter by the week your child is actually off school.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.bkkfamilies.com/camps" },
  openGraph: og({ title: TITLE, description: DESCRIPTION, path: "/camps" }),
};

const SITE = "https://www.bkkfamilies.com";

const FAQ = [
  {
    q: "When are the school holidays in Bangkok?",
    a: "There is no single answer, which is why this directory filters by date rather than by break name. October half term alone splits into two different weeks depending on the school, and spring break spans five weeks across the city. Our school breaks page has the verified dates for each school.",
  },
  {
    q: "How much should a holiday camp cost?",
    a: "For a full day camp at an international school, roughly 9,000 to 15,000 baht a week including lunch is the normal range. Below that you are usually looking at a preschool or a half day. Well above it you are paying for a specialist programme, a visiting provider, or a brand. Very few operators publish prices, so where we have them we list them.",
  },
  {
    q: "Do I have to attend the school to join its camp?",
    a: "Usually not. Most international school camps in Bangkok are open to children from any school, and several actively market to outside families. It is worth confirming when you book, since a few programmes give priority to their own students.",
  },
  {
    q: "Why do some listings say a camp has not been re-announced?",
    a: "Camp operators publish dates late, often only four to six weeks ahead. Rather than hide a camp that reliably runs every year, we show it with the dates it last ran and mark it clearly. It tells you who to watch, and it is more useful than an empty page.",
  },
  {
    q: "When should I book?",
    a: "Songkran and summer camps are worth booking in January, partly because they overlap peak travel and partly because summer programmes open registration early with early bird pricing. October and the spring half terms are usually bookable four to six weeks out.",
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
        name: "Camps",
        item: `${SITE}/camps`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Holiday camp operators in Bangkok",
    numberOfItems: CAMPS.length,
    itemListElement: CAMPS.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${SITE}/camps/${c.slug}`,
    })),
  },
];

export default function CampsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="School holidays, sorted"
        title="Holiday Camps in Bangkok"
        subtitle={`Real dates, real ages, real prices. ${ALL_SESSIONS.length} camp weeks from ${CAMPS.length} operators, checked and described honestly.`}
        color="purple"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            Camp season in Bangkok is a scramble. Dates land late, prices are
            rarely published, half the listings you find are from last year,
            and the one thing you actually need to know, which weeks your own
            child is off, is different from the family down the road.
          </p>
          <p>
            So this directory is built around dates rather than season names.
            Every entry is one camp week: when it runs, who it is for, what it
            costs and where. Filter by the week you need and the age of your
            child, and you should get a shortlist in about thirty seconds.
          </p>
          <p>
            Nobody pays to be listed here. Where a price is not published we say
            so rather than guessing. Where a camp reliably runs every year but
            has not announced this year&rsquo;s dates yet, we show it with the
            dates it last ran and mark it clearly, because knowing who to watch
            is more useful than a shorter list.
          </p>
        </div>

        <div id="directory" className="mt-12 scroll-mt-28">
          <CampsDirectory />
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-teal-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Not sure which week your child is off?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            The breaks do not line up across Bangkok&rsquo;s international
            schools. October half term is two different weeks depending on the
            school, and spring break spans five weeks across the city. We read
            the calendars so you do not have to.
          </p>
          <Link
            href="/school-breaks"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            See the school holiday dates
          </Link>
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

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Running a camp, or spotted one we have missed?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            This directory is only useful if it is current. If your dates have
            changed, your camp is missing, or something here is wrong, tell us
            and we will fix it. Listing is free and always will be.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Send us a correction
          </Link>
        </div>
      </div>
    </>
  );
}
