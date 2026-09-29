import type { Metadata } from "next";
import type { ReactNode } from "react";
import { og } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ACTIVITIES, ageLabel, priceLabel } from "@/lib/activities";
import { ARTICLES } from "@/lib/articles";

const SITE = "https://www.bkkfamilies.com";

export function generateStaticParams() {
  return ACTIVITIES.map((a) => ({ slug: a.slug }));
}

function metaDescription(text: string): string {
  return text.length <= 158 ? text : text.slice(0, text.lastIndexOf(" ", 155)) + "...";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = ACTIVITIES.find((x) => x.slug === slug);
  if (!a) return {};
  const title = `${a.name} | Things to Do With Kids in Bangkok`;
  const description = metaDescription(a.description);
  return {
    title,
    description,
    alternates: { canonical: `${SITE}/activities/${a.slug}` },
    openGraph: og({ title, description, path: `/activities/${a.slug}` }),
  };
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-neutral-400">{label}</p>
      <p className="text-sm font-semibold text-purple-dark">{value}</p>
    </div>
  );
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = ACTIVITIES.find((x) => x.slug === slug);
  if (!a) return notFound();

  const url = `${SITE}/activities/${a.slug}`;
  const ages = ageLabel(a.minAge, a.maxAge);
  const cost = priceLabel(a.price);
  const article = a.relatedArticle
    ? ARTICLES.find((x) => x.slug === a.relatedArticle)
    : undefined;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Activities", item: `${SITE}/activities` },
        { "@type": "ListItem", position: 3, name: a.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url,
      name: a.name,
      dateModified: a.lastVerified,
      mainEntity: {
        "@type": a.type === "Weekly class" ? "SportsActivityLocation" : "TouristAttraction",
        name: a.name,
        description: a.description,
        ...(a.website ? { url: a.website } : {}),
        ...(a.phone ? { telephone: a.phone } : {}),
        ...(a.address
          ? {
              address: {
                "@type": "PostalAddress",
                streetAddress: a.address,
                addressLocality: "Bangkok",
                addressCountry: "TH",
              },
            }
          : {}),
        ...(a.price?.free ? { isAccessibleForFree: true } : {}),
      },
    },
  ];

  const related = ACTIVITIES.filter(
    (x) => x.category === a.category && x.slug !== a.slug,
  ).slice(0, 3);

  const contactRows: { label: string; node: ReactNode }[] = [];
  if (a.venue) contactRows.push({ label: "Venue", node: a.venue });
  if (a.address) contactRows.push({ label: "Address", node: a.address });
  if (a.transit) contactRows.push({ label: "Getting there", node: a.transit });
  if (a.branches?.length)
    contactRows.push({ label: "Locations", node: a.branches.join(", ") });
  if (a.phone)
    contactRows.push({
      label: "Phone",
      node: <a href={`tel:${a.phone.split(" (")[0].replace(/\s/g, "")}`}>{a.phone}</a>,
    });
  if (a.email)
    contactRows.push({ label: "Email", node: <a href={`mailto:${a.email}`}>{a.email}</a> });
  if (a.lineId) contactRows.push({ label: "LINE", node: a.lineId });
  if (a.facebook)
    contactRows.push({
      label: "Facebook",
      node: (
        <a href={a.facebook} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
          Facebook page
        </a>
      ),
    });
  if (a.website)
    contactRows.push({
      label: "Website",
      node: (
        <a href={a.website} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
          {a.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </a>
      ),
    });

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-green px-4 py-12 text-purple-dark">
        <div className="mx-auto max-w-3xl">
          <Link href="/activities" className="text-sm font-semibold text-purple-dark/80 hover:text-purple-dark">
            Back to Things to Do
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-purple-dark/80">
            {a.type} &middot; {a.category}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">{a.name}</h1>
          <p className="mt-2 text-purple-dark/90">
            {a.district} &middot; {a.zone}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        {a.closedNote && (
          <div className="mb-6 rounded-xl border border-orange/40 bg-orange/10 p-4 text-sm leading-relaxed text-neutral-800">
            <strong className="font-semibold">Closed right now.</strong> {a.closedNote}
          </div>
        )}

        <div
          className={`rounded-xl p-4 text-sm leading-relaxed text-neutral-700 ${
            a.status === "confirmed"
              ? "border border-green/30 bg-green/10"
              : "border border-orange/30 bg-orange/5"
          }`}
        >
          {a.status === "confirmed" ? (
            <>
              <strong className="font-semibold">Checked with the operator.</strong> Details read on
              their own page on {formatDate(a.lastVerified)}.
            </>
          ) : (
            <>
              <strong className="font-semibold">Check before going.</strong> These details come
              from a recent guide or listing rather than the operator&rsquo;s own page. Last
              checked {formatDate(a.lastVerified)}.
            </>
          )}{" "}
          <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
            Source
          </a>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Fact label="Ages" value={ages ?? "Not published"} />
          <Fact label="Price" value={cost ?? "Not published"} />
          {a.hours && <Fact label="Hours" value={a.hours} />}
          {a.setting && <Fact label="Setting" value={a.setting} />}
        </div>
        {a.price?.note && (
          <p className="mt-3 text-xs leading-relaxed text-neutral-500">{a.price.note}</p>
        )}

        <p className="mt-8 leading-relaxed text-neutral-700">{a.description}</p>

        {a.worthKnowing && (
          <div className="mt-8 rounded-xl border-l-4 border-orange bg-orange/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-orange">Worth knowing</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{a.worthKnowing}</p>
          </div>
        )}

        {contactRows.length > 0 && (
          <div className="mt-10 rounded-xl border border-black/5 bg-neutral-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              Where and how to book
            </h2>
            <dl className="mt-3 space-y-2 text-sm">
              {contactRows.map((r) => (
                <div key={r.label}>
                  <dt className="inline font-semibold text-neutral-500">{r.label}: </dt>
                  <dd className="inline text-neutral-700">{r.node}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {article && (
          <p className="mt-8 text-sm text-neutral-600">
            We cover this in more detail in{" "}
            <Link href={`/blog/${article.slug}`} className="font-semibold text-teal hover:underline">
              {article.title}
            </Link>
            .
          </p>
        )}

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              More {a.category.toLowerCase()}
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/activities/${r.slug}`}
                  className="rounded-xl border border-black/5 bg-white p-4 text-sm shadow-sm transition hover:shadow-md"
                >
                  <p className="font-semibold text-purple-dark">{r.name}</p>
                  <p className="mt-1 text-xs text-neutral-500">{r.district}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="mt-12 text-xs text-neutral-400">
          Spotted something out of date?{" "}
          <Link href="/contact" className="underline">
            Tell us
          </Link>{" "}
          and we will fix it.
        </p>
      </div>
    </article>
  );
}
