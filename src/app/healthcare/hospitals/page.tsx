import type { Metadata } from "next";
import Link from "next/link";
import { og } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import HealthcareDirectory from "@/components/ui/HealthcareDirectory";
import {
  FACILITIES,
  MATERNITY_FACILITIES,
  PAEDIATRIC_FACILITIES,
  EMERGENCY_NUMBER,
} from "@/lib/healthcare";

const TITLE = "Hospitals and Clinics in Bangkok for Families";
const DESCRIPTION =
  "Every hospital, clinic and dental practice we can verify for expat families in Bangkok, with published maternity package prices side by side, paediatric capability and what each place is actually good at.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.bkkfamilies.com/healthcare/hospitals" },
  openGraph: og({
    title: TITLE,
    description: DESCRIPTION,
    path: "/healthcare/hospitals",
  }),
};

const SITE = "https://www.bkkfamilies.com";

const FAQ = [
  {
    q: "How much does it cost to have a baby in Bangkok?",
    a: "At a private hospital the published packages run from about 49,000 baht at the cheapest end to 230,000 or more for the premium packages at the international hospitals, with most mainstream options landing between 110,000 and 155,000 for a normal delivery or caesarean. Those are package prices for an uncomplicated birth. Complications, a longer stay, and anything the baby needs are almost always outside the package, which is the single most common source of a bill that is larger than expected.",
  },
  {
    q: "Which hospital should I choose for the birth?",
    a: "The honest answer is that for a straightforward pregnancy most of the private hospitals in this directory will deliver your baby safely, so the real variables are the obstetrician you click with, how far you are willing to travel in labour, and how much you want to pay. Where it stops being a matter of preference is if the pregnancy is high risk or the baby may need intensive care, in which case go where the NICU is, and ask directly what level of neonatal care the hospital can provide without transferring.",
  },
  {
    q: "Will my insurance be billed directly?",
    a: "At the big international hospitals, usually yes, through their international patient desk. At mid-market Thai private hospitals it depends on a shorter panel of insurers, and at small clinics you should expect to pay and claim back. Confirm before admission rather than on the day, and be aware that maternity in particular usually carries a waiting period of ten to twelve months or longer, so a policy bought after conception will not cover the birth.",
  },
  {
    q: "Where do I take a sick child at 2am?",
    a: "Any of the 24-hour hospitals in this directory will see a child, but there is a real difference between a hospital that sees children in its general emergency department and one with a paediatric emergency department staffed by paediatricians. In Bangkok the dedicated children's emergency services are at Samitivej's children's hospital in Srinakarin and at the national children's hospital in Ratchathewi. For anything genuinely critical, the national ambulance number is 1669.",
  },
  {
    q: "Do I need to speak Thai?",
    a: "Not at the international hospitals, where English is routine and several also work in Japanese, Arabic and Mandarin. At mid-market private hospitals English is usually available but patchier by department, and at public hospitals you should not rely on it. The gap in cost between an international hospital and a good Thai private hospital is substantially a gap in how much translation and hand-holding is included.",
  },
  {
    q: "Why are some prices missing?",
    a: "Because the hospital does not publish them. Several of the best known hospitals in Bangkok, including Bumrungrad and BNH, quote maternity packages only on enquiry. We would rather show that plainly than fill the gap with an estimate, because a wrong number on a maternity package is worse than no number at all. Every price here was read from the hospital's own published page, and each entry links to the page it came from.",
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
        name: "Hospitals and clinics",
        item: `${SITE}/healthcare/hospitals`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hospitals, clinics and dental practices in Bangkok for families",
    numberOfItems: FACILITIES.length,
    itemListElement: FACILITIES.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: f.name,
      url: `${SITE}/healthcare/hospitals/${f.slug}`,
    })),
  },
];

function baht(n?: number): string {
  return typeof n === "number" ? `฿${n.toLocaleString()}` : "Not published";
}

export default function HospitalsPage() {
  const priced = MATERNITY_FACILITIES.filter(
    (f) => typeof f.maternity?.packageFrom === "number"
  ).sort(
    (a, b) => (a.maternity!.packageFrom ?? 0) - (b.maternity!.packageFrom ?? 0)
  );
  const unpriced = MATERNITY_FACILITIES.filter(
    (f) => typeof f.maternity?.packageFrom !== "number"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Where families actually go"
        title="Hospitals and Clinics in Bangkok"
        subtitle={`${FACILITIES.length} places checked and described honestly, including ${MATERNITY_FACILITIES.length} that deliver babies and ${PAEDIATRIC_FACILITIES.length} with a paediatric service.`}
        color="teal"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            Choosing a hospital in a new country is mostly guesswork. The
            rankings you find online are medical tourism marketing, the forum
            threads are five years old, and the one number you actually want,
            what it costs, is the one nobody puts next to anything else.
          </p>
          <p>
            So this directory does the boring thing. Every entry says what the
            place is good at, where it is, what it costs where that is
            published, and what we would tell a friend about the downsides.
            Nobody pays to be listed. Where a hospital does not publish a price
            we say so rather than guessing, and every price links back to the
            page we read it on.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-orange/30 bg-orange-50 p-5">
          <h2 className="font-heading text-base font-bold text-purple-dark">
            In an emergency
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-neutral-700">
            Thailand&rsquo;s national emergency medical number is{" "}
            <strong className="font-bold">{EMERGENCY_NUMBER}</strong>. It is
            free, it works from any phone, and English-speaking dispatch is
            usually available. If your family already uses one hospital, save
            its own ambulance line in your phone as well, since a private
            ambulance from your own hospital will take you to that hospital.
          </p>
        </div>

        <div id="directory" className="mt-12 scroll-mt-28">
          <HealthcareDirectory />
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            What it costs to have a baby
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            Published delivery package prices, cheapest first. These are the
            hospitals&rsquo; own figures for an uncomplicated birth, read from
            their package pages. Anything that goes wrong, and almost anything
            the baby needs beyond routine newborn care, sits outside the
            package.
          </p>

          <div className="mt-6 overflow-x-auto">
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
                      {baht(f.maternity?.packageFrom)}
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

          {unpriced.length > 0 && (
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Quoting on enquiry rather than publishing a price:{" "}
              {unpriced.map((f, i) => (
                <span key={f.slug}>
                  {i > 0 && ", "}
                  <Link
                    href={`/healthcare/hospitals/${f.slug}`}
                    className="font-semibold text-teal hover:underline"
                  >
                    {f.name}
                  </Link>
                </span>
              ))}
              .
            </p>
          )}
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
            Spotted something wrong, or somewhere we have missed?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Prices and phone numbers change constantly and this is only useful
            if it is current. If a figure here is out of date, or your practice
            is missing, tell us and we will fix it. Listing is free and always
            will be.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Send us a correction
          </Link>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs leading-relaxed text-neutral-500">
          This directory is information, not medical advice. We are parents who
          have lived here, not clinicians. Nothing on this page is a
          recommendation to use or avoid any particular hospital, doctor or
          treatment, and it is no substitute for speaking to a qualified
          professional about your own family. Always confirm prices, services
          and insurance arrangements with the provider directly before you rely
          on them.
        </p>
      </div>
    </>
  );
}
