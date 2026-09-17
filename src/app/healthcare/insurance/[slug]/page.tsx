import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { og, SITE } from "@/lib/seo";
import {
  INSURERS,
  INSURERS_SORTED,
  insurerBySlug,
  FEATURE_LABEL,
  TYPE_LABEL,
  TYPE_LABEL_PLURAL,
  formatMoney,
  type Insurer,
  type PriceExample,
} from "@/lib/insurance";

const BASE = "/healthcare/insurance";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
function longDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function shortName(i: Insurer): string {
  return i.shortName ?? i.name;
}

function reviewTitle(i: Insurer): string {
  const year = i.lastVerified.slice(0, 4);
  if (i.type === "government") {
    return `Thai Social Security for Foreigners: ${year} Review`;
  }
  if (i.type === "broker") {
    return `${shortName(i)} Review ${year}: Insurance Broker in Thailand`;
  }
  return `${shortName(i)} Review ${year}: Health Insurance in Thailand`;
}

function metaDescription(i: Insurer): string {
  const text = `${shortName(i)} reviewed for expat families in Thailand: ${i.tagline}`;
  return text.length <= 158 ? text : `${text.slice(0, 155).trimEnd()}...`;
}

function priceText(p: PriceExample): string {
  const cur = p.currency ?? "THB";
  const main = formatMoney(p.amount, cur);
  const both =
    typeof p.amountAlt === "number"
      ? `${main} / ${formatMoney(p.amountAlt, cur)}`
      : main;
  const labels = p.amountLabels ? ` (${p.amountLabels.join(" / ")})` : "";
  return `${both} a ${p.period}${labels}`;
}

/**
 * Questions people search for about a named insurer, answered only from
 * fields we hold. A question whose answer we do not have is left out rather
 * than answered vaguely.
 */
function faqFor(i: Insurer): { q: string; a: string }[] {
  const name = shortName(i);
  const out: { q: string; a: string }[] = [];
  const has = (f: Insurer["features"][number]) => i.features.includes(f);

  if (i.type !== "broker") {
    if (i.pricing === "published" || i.pricing === "contribution") {
      const ex = (i.priceExamples ?? [])
        .map((p) => `${p.label}: ${priceText(p)}`)
        .join(". ");
      out.push({ q: `How much does ${name} cost?`, a: `${ex}. Figures are from the sources linked on this page and were checked on ${longDate(i.lastVerified)}.` });
    } else if (i.pricing === "quote-only") {
      out.push({
        q: `How much does ${name} cost?`,
        a: `${name} does not publish prices. ${i.quoteNote ?? ""} A broker can compare it against other insurers for you.`.trim(),
      });
    }
  }
  if (has("maternity-option")) {
    out.push({
      q: `Does ${name} cover pregnancy and childbirth?`,
      a: `Maternity cover is available with ${name}, normally as an option with a waiting period, so it needs to be in place well before conception. Check the exact waiting period in the policy wording before you buy.`,
    });
  }
  if (has("direct-billing")) {
    out.push({
      q: `Does ${name} offer direct billing at Thai hospitals?`,
      a: `Yes, ${name} settles directly with hospitals in its network. Confirm your specific hospital and plan before admission rather than on the day.`,
    });
  }
  if (has("children-from-birth")) {
    out.push({
      q: `Can children be covered by ${name}?`,
      a: `Yes. ${name} covers babies and young children.${i.slug === "luma" ? " Children under 18 must be on a parent's policy." : ""}`,
    });
  }
  if (has("pre-existing-considered")) {
    out.push({
      q: `Does ${name} cover pre-existing conditions?`,
      a:
        i.type === "government"
          ? "Yes. Treatment at your registered hospital that a doctor considers necessary is covered, including for conditions you had before you joined."
          : `${name} has plans that consider pre-existing conditions. Always declare them in full, because non-disclosure can void a policy.`,
    });
  }
  if (i.type === "broker") {
    out.push({
      q: `Does ${name} charge a fee?`,
      a:
        i.slug === "pacific-prime-thailand"
          ? "Pacific Prime says its broking, claims and renewal assistance are free to clients. Like most brokers, it is paid commission by the insurers it places you with."
          : "Brokers in Thailand are normally paid commission by the insurer rather than a fee by you. Confirm this with the broker before you start.",
    });
  }
  return out;
}

export function generateStaticParams() {
  return INSURERS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i = insurerBySlug(slug);
  if (!i) return {};
  const title = reviewTitle(i);
  const description = metaDescription(i);
  return {
    // Absolute: these titles are already long and the brand suffix only
    // pushes the searched-for words past the truncation point.
    title: { absolute: title },
    description,
    keywords: [
      `${shortName(i)} review`,
      `${shortName(i)} Thailand`,
      `${shortName(i)} health insurance`,
      `${shortName(i)} cost`,
      "health insurance Thailand",
      "expat health insurance Bangkok",
    ],
    alternates: { canonical: `${SITE}${BASE}/${i.slug}` },
    // A route's opengraph-image file does not reach its dynamic children, so
    // every review borrows the section card explicitly. Without this a
    // review shared in the Facebook group arrives as a bare link.
    openGraph: {
      ...og({ title, description, path: `${BASE}/${i.slug}` }),
      images: [
        {
          url: `${SITE}${BASE}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: "Health Insurance in Thailand, options, costs and insurer reviews, from BKK Families",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE}${BASE}/opengraph-image.png`],
    },
  };
}

export default async function InsurerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const i = insurerBySlug(slug);
  if (!i) notFound();

  const faq = faqFor(i);
  const title = reviewTitle(i);
  const sameType = INSURERS_SORTED.filter(
    (x) => x.type === i.type && x.slug !== i.slug
  );
  const others = INSURERS_SORTED.filter((x) => x.type !== i.type).slice(0, 4);

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Healthcare", item: `${SITE}/healthcare` },
        { "@type": "ListItem", position: 3, name: "Health insurance", item: `${SITE}${BASE}` },
        { "@type": "ListItem", position: 4, name: i.name, item: `${SITE}${BASE}/${i.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: metaDescription(i),
      dateModified: i.lastVerified,
      datePublished: i.lastVerified,
      mainEntityOfPage: `${SITE}${BASE}/${i.slug}`,
      author: { "@type": "Organization", name: "BKK Families", url: SITE },
      publisher: { "@type": "Organization", name: "BKK Families", url: SITE },
      about: {
        "@type": i.type === "broker" ? "InsuranceAgency" : i.type === "government" ? "GovernmentOrganization" : "Organization",
        name: i.name,
        url: i.website,
        ...(i.phone ? { telephone: i.phone } : {}),
      },
    },
  ];
  if (faq.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-teal px-4 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-4 text-sm text-white/80" aria-label="Breadcrumb">
            <Link href="/healthcare" className="hover:underline">Healthcare</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href={BASE} className="hover:underline">Health insurance</Link>
          </nav>
          {i.sponsored && (
            <span className="mb-3 inline-block rounded bg-white/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wide">
              {i.sponsored.label ?? "Sponsored"}
            </span>
          )}
          <h1 className="font-heading text-3xl font-bold md:text-4xl">{i.name}</h1>
          <p className="mt-2 text-lg text-white/90">
            {i.type === "broker" ? "Broker review" : "Review"} for expat families in Thailand
          </p>
          <p className="mt-3 text-white/90">
            {TYPE_LABEL[i.type]}
            {i.coverArea ? ` · ${i.coverArea}` : ""}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {i.features.map((f) => (
              <span key={f} className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
                {FEATURE_LABEL[f]}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl border-2 border-teal/30 bg-teal-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-teal">Best for</p>
          <p className="mt-1 font-heading text-lg font-bold text-purple-dark">{i.bestFor}</p>
        </div>

        {i.depth === "overview" && (
          <p className="mt-6 rounded-xl border border-black/5 bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-600">
            <strong className="font-semibold">A shorter review.</strong> This
            provider publishes little beyond marketing pages and we have not yet
            worked through its full policy documents, so this page sticks to
            what we could confirm.
          </p>
        )}

        <div className="mt-8 space-y-4 leading-relaxed text-neutral-700">
          {i.description.split("\n\n").map((para, n) => (
            <p key={n}>{para}</p>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-bold text-purple-dark">Pros</h2>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              {i.pros.map((p) => (
                <li key={p} className="flex gap-2">
                  <span aria-hidden="true" className="font-bold text-teal">+</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-bold text-purple-dark">Cons</h2>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              {i.cons.map((c) => (
                <li key={c} className="flex gap-2">
                  <span aria-hidden="true" className="font-bold text-orange">&minus;</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {i.worthKnowing && (
          <div className="mt-8 rounded-xl border border-black/5 bg-orange-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">Worth knowing</h2>
            <p className="mt-2 leading-relaxed text-neutral-700">{i.worthKnowing}</p>
          </div>
        )}

        {i.plans && i.plans.length > 0 && (
          <div className="mt-10">
            <h2 className="font-heading text-xl font-bold text-purple-dark">
              {shortName(i)} plans
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {i.plans.map((p) => (
                <div key={p.name} className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
                  <h3 className="font-heading font-bold text-purple-dark">{p.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{p.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 rounded-xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-purple-dark">
            {i.type === "broker" ? "What it costs to use" : `How much ${shortName(i)} costs`}
          </h2>
          {(i.priceExamples ?? []).length > 0 ? (
            <dl className="mt-4 space-y-4">
              {i.priceExamples!.map((p) => (
                <div key={p.label}>
                  <dt className="text-sm text-neutral-600">{p.label}</dt>
                  <dd className="text-xl font-bold text-teal">{priceText(p)}</dd>
                  {p.note && <dd className="text-xs text-neutral-500">{p.note}</dd>}
                  <dd className="mt-1 text-xs text-neutral-500">
                    Source:{" "}
                    <a
                      href={p.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-teal hover:underline"
                    >
                      {p.sourceLabel}
                    </a>
                    , checked {longDate(p.checked)}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-3 text-lg font-semibold text-neutral-500">
              {i.type === "broker" ? "No published fees" : "No published prices"}
            </p>
          )}
          {i.quoteNote && (
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">{i.quoteNote}</p>
          )}
          <Link
            href={`${BASE}#costs`}
            className="mt-4 inline-block text-sm font-semibold text-orange hover:underline"
          >
            Compare prices across every provider →
          </Link>
        </div>

        <div className="mt-8 rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">Practical details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">Type</dt>
              <dd className="text-neutral-700">{TYPE_LABEL[i.type]}</dd>
            </div>
            {i.coverArea && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">Where it covers</dt>
                <dd className="text-neutral-700">{i.coverArea}</dd>
              </div>
            )}
            {i.underwriter && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">Underwritten by</dt>
                <dd className="text-neutral-700">{i.underwriter}</dd>
              </div>
            )}
            {i.maxEntryAge && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">Oldest age to join</dt>
                <dd className="text-neutral-700">{i.maxEntryAge}</dd>
              </div>
            )}
            {i.phone && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">Phone</dt>
                <dd className="text-neutral-700">{i.phone}</dd>
              </div>
            )}
          </dl>
          <a
            href={i.website}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-5 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Visit the official website
          </a>
        </div>

        {faq.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-xl font-bold text-purple-dark">
              {shortName(i)}: common questions
            </h2>
            <div className="mt-4 space-y-3">
              {faq.map((f) => (
                <div key={f.q} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                  <h3 className="font-heading font-bold text-purple-dark">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {sameType.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-xl font-bold text-purple-dark">
              Compare with other {TYPE_LABEL_PLURAL[i.type]}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {sameType.map((x) => (
                <Link
                  key={x.slug}
                  href={`${BASE}/${x.slug}`}
                  className="block rounded-xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="font-heading text-sm font-bold text-purple-dark">{x.name} review</h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-500">{x.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div className="mt-8">
            <h2 className="font-heading text-lg font-bold text-purple-dark">Other kinds of cover</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {others.map((x) => (
                <li key={x.slug}>
                  <Link href={`${BASE}/${x.slug}`} className="text-sm font-semibold text-teal hover:underline">
                    {x.name}
                  </Link>
                  <span className="ml-2 text-xs text-neutral-500">{TYPE_LABEL[x.type]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href={BASE}
            className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-600 transition hover:border-orange hover:text-orange"
          >
            All health insurance options
          </Link>
          <Link
            href="/healthcare/hospitals"
            className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-600 transition hover:border-orange hover:text-orange"
          >
            Hospitals and direct billing
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-600 transition hover:border-orange hover:text-orange"
          >
            Send a correction
          </Link>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-neutral-500">
          Last checked {longDate(i.lastVerified)}. This review is general
          information, not financial or medical advice, and we are not licensed
          insurance brokers. {i.sponsored ? "This provider has paid for a sponsored placement; the review text is written independently." : "No provider pays to appear here."}{" "}
          Confirm benefits, prices and exclusions with the provider before you
          buy.
        </p>
      </div>
    </>
  );
}
