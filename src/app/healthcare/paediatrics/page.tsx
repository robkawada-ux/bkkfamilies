import type { Metadata } from "next";
import Link from "next/link";
import { og } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import HealthcareDirectory from "@/components/ui/HealthcareDirectory";
import {
  PAEDIATRIC_FACILITIES,
  FACILITIES,
  EMERGENCY_NUMBER,
} from "@/lib/healthcare";

const TITLE = "Paediatric Care in Bangkok: Where to Take a Sick Child";
const DESCRIPTION =
  "Which Bangkok hospitals have a children's emergency department staffed by paediatricians and which see children in the general ER, plus every paediatric service in the city we can verify, filterable by area.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.bkkfamilies.com/healthcare/paediatrics",
  },
  openGraph: og({
    title: TITLE,
    description: DESCRIPTION,
    path: "/healthcare/paediatrics",
  }),
};

const SITE = "https://www.bkkfamilies.com";

const FAQ = [
  {
    q: "Where do I take a sick child at 2am in Bangkok?",
    a: "Any 24-hour hospital will see a child, but there is a real difference between a general emergency department that also sees children and a paediatric emergency department staffed by paediatricians. In Bangkok the dedicated children's emergency services are at Samitivej's children's hospital at the Srinakarin campus and the national children's hospital in Ratchathewi. For anything critical, call 1669.",
  },
  {
    q: "Do I need a hospital, or will a clinic do?",
    a: "For a routine checkup, a vaccination, a rash or an ordinary childhood illness, a good clinic is faster and a fraction of the price of the same visit at an international hospital. Go to a hospital instead for a fever in an infant, a fever lasting more than a couple of days in an older child, breathing difficulty, dehydration, unusual drowsiness, any significant injury, and anything you are simply worried about and cannot explain.",
  },
  {
    q: "How much does a paediatric consultation cost in Bangkok?",
    a: "Roughly 1,500 to 3,000 baht at the Sukhumvit international hospitals, around 1,000 to 2,000 at mid-market private hospitals, and less again at a standalone clinic or a budget hospital. The gap is substantially a gap in how much English-language explanation and hand-holding is included, which is worth paying for in your first year and often not afterwards.",
  },
  {
    q: "What is a well baby clinic?",
    a: "A dedicated service for routine infant and child checkups: growth and development monitoring, vaccinations on schedule, and feeding and sleep advice, separate from the queue of sick children. Several hospitals in this directory run one, which is worth seeking out because it means a scheduled healthy visit does not put your newborn in a waiting room full of infections.",
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
        name: "Paediatrics",
        item: `${SITE}/healthcare/paediatrics`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Paediatric services in Bangkok",
    numberOfItems: PAEDIATRIC_FACILITIES.length,
    itemListElement: PAEDIATRIC_FACILITIES.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: f.name,
      url: `${SITE}/healthcare/hospitals/${f.slug}`,
    })),
  },
];

export default function PaediatricsPage() {
  const childrensEr = FACILITIES.filter(
    (f) => f.paediatrics?.separateChildrensEr
  );
  const generalEr = PAEDIATRIC_FACILITIES.filter(
    (f) =>
      f.paediatrics?.separateChildrensEr === false &&
      f.services.includes("emergency-24h")
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={`${PAEDIATRIC_FACILITIES.length} paediatric services`}
        title="Paediatric Care in Bangkok"
        subtitle="The distinction almost nobody makes when they arrive, and the one that matters most at 2am: which hospitals have a children's emergency department, and which see children in the general ER."
        color="teal"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-xl border border-orange/30 bg-orange-50 p-5">
          <h2 className="font-heading text-base font-bold text-purple-dark">
            In an emergency
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-neutral-700">
            Thailand&rsquo;s national emergency medical number is{" "}
            <strong className="font-bold">{EMERGENCY_NUMBER}</strong>. Free, any
            phone, English-speaking dispatch usually available. If your family
            already uses one hospital, save its own ambulance line too, since a
            private ambulance takes you to that hospital rather than the nearest.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            Most Bangkok hospitals see children in their general emergency
            department. That is usually fine. It is less fine for a very sick
            small child, where being seen by a paediatrician rather than an adult
            emergency doctor genuinely matters.
          </p>
          <p>
            Only a small number of places in this city run a paediatric emergency
            department proper. It is worth knowing which, and worth knowing how
            far away they are, before the night you need one.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              Children&rsquo;s emergency department
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Staffed by paediatricians, with its own facilities.
            </p>
            <ul className="mt-4 space-y-2">
              {childrensEr.map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/healthcare/hospitals/${f.slug}`}
                    className="text-sm font-semibold text-teal hover:underline"
                  >
                    {f.name}
                  </Link>
                  <span className="block text-xs text-neutral-500">
                    {f.area}
                    {f.paediatrics?.erHours ? ` · ${f.paediatrics.erHours}` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-black/5 bg-neutral-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              Paediatrics, general emergency
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Children are seen in the main emergency department out of hours.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              {generalEr.length} hospitals in the directory have a paediatric
              service but no separate children&rsquo;s emergency, including most
              of the ones families use day to day. For ordinary illness that is
              not a problem. It is a reason to know where the alternative is.
            </p>
          </div>
        </div>

        <div id="directory" className="mt-16 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Browse paediatric services
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Filtered to paediatrics. Narrow by area to find what is close, or
            clear the filter to see the whole directory.
          </p>
          <div className="mt-6">
            <HealthcareDirectory initialService="paediatrics" />
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

        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-teal-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            New here and not sure how to choose?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            A directory tells you what your options are. Working out how to pick
            between them is a different question, and one worth answering before
            you need to.
          </p>
          <Link
            href="/blog/top-5-hospitals-in-bangkok"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            How to choose a hospital in Bangkok
          </Link>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs leading-relaxed text-neutral-500">
          This page is information, not medical advice, and is not a
          recommendation to use or avoid any provider. Services change, so
          confirm directly before you rely on anything here.
        </p>
      </div>
    </>
  );
}
