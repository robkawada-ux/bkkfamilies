import type { Metadata } from "next";
import Link from "next/link";
import { og } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import ArticleCard from "@/components/ui/ArticleCard";
import { ARTICLES } from "@/lib/articles";
import {
  FACILITIES,
  MATERNITY_FACILITIES,
  PAEDIATRIC_FACILITIES,
  ALL_AREAS,
  EMERGENCY_NUMBER,
} from "@/lib/healthcare";

const TITLE = "Healthcare for Families in Bangkok";
const DESCRIPTION =
  "Hospitals, maternity, paediatrics, clinics, dentists and mental health support for expat families in Bangkok, with published prices where they exist and honest write-ups where they do not.";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.bkkfamilies.com/healthcare" },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: og({ title: TITLE, description: DESCRIPTION, path: "/healthcare" }),
};

const SITE = "https://www.bkkfamilies.com";

/** Two pieces carry this section. Everything else is supporting. */
const PILLARS = ["having-a-baby-in-bangkok", "bangkok-smog-season-kids"];

const jsonLd = [
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
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Healthcare resources for families in Bangkok",
    itemListElement: [
      { name: "Hospitals, clinics and dentists", path: "/healthcare/hospitals" },
      { name: "Having a baby in Bangkok", path: "/healthcare/maternity" },
      { name: "Paediatric care in Bangkok", path: "/healthcare/paediatrics" },
    ].map((x, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: x.name,
      url: `${SITE}${x.path}`,
    })),
  },
];

export default function HealthcarePage() {
  const articles = ARTICLES.filter((a) => a.category === "Healthcare");
  const pillars = PILLARS.map((s) => articles.find((a) => a.slug === s)).filter(
    (a): a is NonNullable<typeof a> => Boolean(a)
  );
  const rest = articles.filter((a) => !PILLARS.includes(a.slug));

  const dental = FACILITIES.filter((f) => f.services.includes("dental"));
  const mentalHealth = FACILITIES.filter((f) =>
    f.services.includes("mental-health")
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={`${FACILITIES.length} places across ${ALL_AREAS.length} areas`}
        title="Healthcare in Bangkok"
        subtitle="Working out where to have a baby, who to call at 2am with a fever, and what any of it costs is one of the hardest parts of moving here. We have made the searching easier below."
        color="teal"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-xl border border-orange/30 bg-orange-50 p-5">
          <h2 className="font-heading text-base font-bold text-purple-dark">
            In an emergency
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-neutral-700">
            Thailand&rsquo;s national emergency medical number is{" "}
            <strong className="font-bold">{EMERGENCY_NUMBER}</strong>. Free,
            works from any phone, and English-speaking dispatch is usually
            available.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Search the directory
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
            Pick whichever of these three is closest to what you need. Each one
            opens a searchable list you can narrow by area, by service and by
            the kind of place it is.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <Link
              href="/healthcare/hospitals"
              className="group flex flex-col rounded-xl border-2 border-teal/30 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal hover:shadow-md"
            >
              <p className="font-heading text-3xl font-bold text-teal">
                {FACILITIES.length}
              </p>
              <h3 className="mt-1 font-heading text-lg font-bold text-purple-dark">
                Hospitals, clinics and dentists
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                The full directory, filterable by what you need, where you are
                and what kind of place it is.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-orange group-hover:underline">
                Search all {FACILITIES.length} →
              </span>
            </Link>

            <Link
              href="/healthcare/maternity"
              className="group flex flex-col rounded-xl border-2 border-teal/30 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal hover:shadow-md"
            >
              <p className="font-heading text-3xl font-bold text-teal">
                {MATERNITY_FACILITIES.length}
              </p>
              <h3 className="mt-1 font-heading text-lg font-bold text-purple-dark">
                Places that deliver babies
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                Every published delivery package price in one table, cheapest
                first, plus what each package leaves out.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-orange group-hover:underline">
                Compare delivery prices →
              </span>
            </Link>

            <Link
              href="/healthcare/paediatrics"
              className="group flex flex-col rounded-xl border-2 border-teal/30 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal hover:shadow-md"
            >
              <p className="font-heading text-3xl font-bold text-teal">
                {PAEDIATRIC_FACILITIES.length}
              </p>
              <h3 className="mt-1 font-heading text-lg font-bold text-purple-dark">
                Paediatric services
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                Including which hospitals have a children&rsquo;s emergency
                department staffed by paediatricians, and which do not.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-orange group-hover:underline">
                Find care for a child →
              </span>
            </Link>
          </div>
        </div>

        {pillars.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-purple-dark">
              Start here
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {pillars.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="block rounded-xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="font-heading text-xl font-bold text-purple-dark">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {a.excerpt}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-orange">
                    Read it →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-black/5 bg-neutral-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              Dentists
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Bangkok dental is cheap and good, so the mistake is saving it for a
              trip home.
            </p>
            <ul className="mt-4 space-y-1.5">
              {dental.map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/healthcare/hospitals/${f.slug}`}
                    className="text-sm font-semibold text-teal hover:underline"
                  >
                    {f.name}
                  </Link>
                  <span className="ml-2 text-xs text-neutral-500">{f.area}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/blog/dental-health-for-families-in-bangkok"
              className="mt-4 inline-block text-sm font-semibold text-orange hover:underline"
            >
              What it actually costs →
            </Link>
          </div>

          <div className="rounded-xl border border-black/5 bg-neutral-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              Mental health
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Including services that see children and adolescents, not only
              adults.
            </p>
            <ul className="mt-4 space-y-1.5">
              {mentalHealth.map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/healthcare/hospitals/${f.slug}`}
                    className="text-sm font-semibold text-teal hover:underline"
                  >
                    {f.name}
                  </Link>
                  <span className="ml-2 text-xs text-neutral-500">{f.area}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/learning-support"
              className="mt-4 inline-block text-sm font-semibold text-orange hover:underline"
            >
              For developmental and educational support, see Learning Support →
            </Link>
          </div>
        </div>

        <div className="mt-16 rounded-xl border border-black/5 bg-teal-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Where we cover
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            {ALL_AREAS.length} areas across Bangkok and Nonthaburi, because in
            this city the right hospital is often just the good one you can
            actually reach: {ALL_AREAS.join(", ")}.
          </p>
          <Link
            href="/healthcare/hospitals"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Filter the directory by area
          </Link>
        </div>

        {rest.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-purple-dark">
              More reading
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {rest.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Know somewhere we have missed?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            This directory grows from what families actually tell us. If your
            paediatrician, clinic or dentist should be here, or something listed
            is out of date, send it over. Listing is free and always will be.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Tell us about a provider
          </Link>
        </div>

        <p className="mx-auto mt-16 max-w-3xl text-xs leading-relaxed text-neutral-500">
          Everything in this section is information, not medical advice. We are
          parents who have lived here, not clinicians. Nothing here is a
          recommendation to use or avoid any particular hospital, doctor or
          treatment, and it is no substitute for speaking to a qualified
          professional about your own family.
        </p>
      </div>
    </>
  );
}
