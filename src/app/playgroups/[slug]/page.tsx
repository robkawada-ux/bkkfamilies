import type { Metadata } from "next";
import type { ReactNode } from "react";
import { og } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  PLAYGROUPS,
  FREQUENCY_LABEL,
  ageLabel,
  daysLabel,
  timeLabel,
  priceLabel,
} from "@/lib/playgroups";

const SITE = "https://www.bkkfamilies.com";

export function generateStaticParams() {
  return PLAYGROUPS.map((p) => ({ slug: p.slug }));
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
  const pg = PLAYGROUPS.find((p) => p.slug === slug);
  if (!pg) return {};
  const title = `${pg.name} | Playgroups in Bangkok`;
  const description = metaDescription(pg.description);
  return {
    title,
    description,
    alternates: { canonical: `${SITE}/playgroups/${pg.slug}` },
    openGraph: og({ title, description, path: `/playgroups/${pg.slug}` }),
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

export default async function PlaygroupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pg = PLAYGROUPS.find((p) => p.slug === slug);
  if (!pg) return notFound();

  const url = `${SITE}/playgroups/${pg.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Playgroups", item: `${SITE}/playgroups` },
        { "@type": "ListItem", position: 3, name: pg.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url,
      name: pg.name,
      dateModified: pg.lastVerified,
      mainEntity: {
        "@type": "ChildCare",
        name: pg.name,
        description: pg.description,
        ...(pg.website ? { url: pg.website } : {}),
        ...(pg.phone ? { telephone: pg.phone } : {}),
        ...(pg.email ? { email: pg.email } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: pg.address ?? pg.venue,
          addressLocality: "Bangkok",
          addressCountry: "TH",
        },
        availableLanguage: pg.languages,
      },
    },
  ];

  const related = PLAYGROUPS.filter(
    (p) => p.zone === pg.zone && p.slug !== pg.slug,
  ).slice(0, 3);

  const contactRows: { label: string; node: ReactNode }[] = [];
  if (pg.address) contactRows.push({ label: "Address", node: pg.address });
  if (pg.transit) contactRows.push({ label: "Getting there", node: pg.transit });
  if (pg.phone)
    contactRows.push({
      label: "Phone",
      node: <a href={`tel:${pg.phone.split(" ext")[0].replace(/\s/g, "")}`}>{pg.phone}</a>,
    });
  if (pg.email)
    contactRows.push({ label: "Email", node: <a href={`mailto:${pg.email}`}>{pg.email}</a> });
  if (pg.lineId) contactRows.push({ label: "LINE", node: pg.lineId });
  if (pg.facebook)
    contactRows.push({
      label: "Facebook",
      node: (
        <a href={pg.facebook} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
          Facebook page
        </a>
      ),
    });
  if (pg.website)
    contactRows.push({
      label: "Website",
      node: (
        <a href={pg.website} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
          {pg.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </a>
      ),
    });

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-teal px-4 py-12 text-white">
        <div className="mx-auto max-w-3xl">
          <Link href="/playgroups" className="text-sm font-semibold text-white/80 hover:text-white">
            Back to Playgroups
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/80">
            {pg.organiser} &middot; {pg.kind}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">{pg.name}</h1>
          <p className="mt-2 text-white/90">
            {pg.venue} &middot; {pg.district}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div
          className={`rounded-xl p-4 text-sm leading-relaxed ${
            pg.status === "confirmed"
              ? "border border-green/30 bg-green/10 text-neutral-700"
              : "border border-orange/30 bg-orange/5 text-neutral-700"
          }`}
        >
          {pg.status === "confirmed" ? (
            <>
              <strong className="font-semibold">Confirmed this term.</strong> Checked on the
              organiser&rsquo;s own page on {formatDate(pg.lastVerified)}.
            </>
          ) : (
            <>
              <strong className="font-semibold">Check before going.</strong> This playgroup runs,
              but its latest published details are older or come from another listing. Last
              checked {formatDate(pg.lastVerified)}.
            </>
          )}{" "}
          {!/bambi/i.test(pg.sourceUrl) && (
            <a href={pg.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
              Source
            </a>
          )}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Fact label="Area" value={`${pg.district}, ${pg.zone}`} />
          <Fact label="Language" value={pg.languages.join(" and ")} />
          <Fact label="Run by" value={pg.organiser} />
          <Fact label="Booking" value={pg.bookingRequired ? "Book ahead" : "Contact first"} />
        </div>

        <div className="mt-8 space-y-4">
          <p className="leading-relaxed text-neutral-700">{pg.description}</p>
        </div>

        <div className="mt-10">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            {pg.sessions.length > 1 ? "Sessions" : "When it runs"}
          </h2>
          <div className="mt-3 space-y-3">
            {pg.sessions.map((s, i) => {
              const when = [daysLabel(s.days), timeLabel(s.start, s.end)].filter(Boolean).join(", ");
              const ages = ageLabel(s.minAgeMonths, s.maxAgeMonths);
              const cost = priceLabel(s.price);
              return (
                <div key={i} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                  {s.label && (
                    <h3 className="font-heading font-bold text-purple-dark">{s.label}</h3>
                  )}
                  <dl className="mt-1 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="inline text-neutral-500">When: </dt>
                      <dd className="inline font-semibold text-neutral-700">
                        {when || "Days and times on request"}
                      </dd>
                    </div>
                    <div>
                      <dt className="inline text-neutral-500">How often: </dt>
                      <dd className="inline font-semibold text-neutral-700">
                        {FREQUENCY_LABEL[s.frequency]}
                      </dd>
                    </div>
                    <div>
                      <dt className="inline text-neutral-500">Ages: </dt>
                      <dd className="inline font-semibold text-neutral-700">
                        {ages ?? "Not published"}
                      </dd>
                    </div>
                    <div>
                      <dt className="inline text-neutral-500">Price: </dt>
                      <dd className="inline font-semibold text-neutral-700">
                        {cost ?? "Not published"}
                      </dd>
                    </div>
                    {s.language && (
                      <div>
                        <dt className="inline text-neutral-500">Language: </dt>
                        <dd className="inline font-semibold text-neutral-700">
                          {s.language.join(" and ")}
                        </dd>
                      </div>
                    )}
                  </dl>
                  {s.price?.note && (
                    <p className="mt-2 text-xs text-neutral-500">{s.price.note}</p>
                  )}
                  {s.note && <p className="mt-1 text-xs text-neutral-500">{s.note}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {pg.worthKnowing && (
          <div className="mt-8 rounded-xl border-l-4 border-orange bg-orange/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-orange">Worth knowing</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{pg.worthKnowing}</p>
          </div>
        )}

        {(pg.bookingUrl || contactRows.length > 0) && (
          <div className="mt-10 rounded-xl border border-black/5 bg-neutral-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">Booking and contact</h2>
            {contactRows.length > 0 && (
              <dl className="mt-3 space-y-2 text-sm">
                {contactRows.map((r) => (
                  <div key={r.label}>
                    <dt className="inline font-semibold text-neutral-500">{r.label}: </dt>
                    <dd className="inline text-neutral-700">{r.node}</dd>
                  </div>
                ))}
              </dl>
            )}
            {pg.bookingUrl && (
              <a
                href={pg.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Book a place
              </a>
            )}
          </div>
        )}

        {pg.schoolSlug && (
          <p className="mt-8 text-sm text-neutral-600">
            Considering the school itself?{" "}
            <Link href={`/schools/${pg.schoolSlug}`} className="font-semibold text-teal hover:underline">
              Read our school profile
            </Link>
            .
          </p>
        )}

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              Other playgroups in {pg.zone === "Several locations" ? "Bangkok" : `the ${pg.zone} area`}
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/playgroups/${r.slug}`}
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
