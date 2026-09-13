import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CAMPS,
  campBySlug,
  isStale,
  type CampCategory,
  type CampFormat,
  type CampSession,
} from "@/lib/camps";
import { BREAK_WINDOWS } from "@/lib/schoolBreaks";

const SITE = "https://www.bkkfamilies.com";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const CATEGORY_LABEL: Record<CampCategory, string> = {
  academic: "Academic",
  "art-and-design": "Art and design",
  cookery: "Cookery",
  "language-learning": "Language learning",
  "music-and-drama": "Music and drama",
  "nature-and-outdoors": "Nature and outdoors",
  "sport-and-fitness": "Sport and fitness",
  stem: "STEM",
  swimming: "Swimming",
  "multi-activity": "Multi-activity",
};

const FORMAT_LABEL: Record<CampFormat, string> = {
  day: "Day camp",
  "half-day": "Half day",
  residential: "Residential",
};

function longDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function range(start?: string, end?: string): string | null {
  if (!start || !end) return null;
  const [, sm, sd] = start.split("-").map(Number);
  const [, em, ed] = end.split("-").map(Number);
  if (sm === em) return `${sd} to ${ed} ${SHORT[em - 1]}`;
  return `${sd} ${SHORT[sm - 1]} to ${ed} ${SHORT[em - 1]}`;
}

function priceLabel(s: CampSession): string | null {
  if (!s.priceFrom) return null;
  const base =
    s.priceTo && s.priceTo !== s.priceFrom
      ? `฿${s.priceFrom.toLocaleString()} to ฿${s.priceTo.toLocaleString()}`
      : `฿${s.priceFrom.toLocaleString()}`;
  const suffix =
    s.priceUnit === "per-week" ? " a week"
    : s.priceUnit === "per-day" ? " a day"
    : "";
  return base + suffix + (s.priceEstimated ? " (estimated)" : "");
}

export function generateStaticParams() {
  return CAMPS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const camp = campBySlug(slug);
  if (!camp) return {};

  const firstPara = camp.description.split("\n\n")[0] ?? "";
  const description =
    firstPara.length <= 158 ? firstPara : `${firstPara.slice(0, 155)}...`;

  return {
    title: `${camp.name} | Holiday Camps in Bangkok`,
    description,
    alternates: { canonical: `${SITE}/camps/${camp.slug}` },
    openGraph: og({
      title: camp.name,
      description,
      path: `/camps/${camp.slug}`,
    }),
  };
}

export default async function CampPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const camp = campBySlug(slug);
  if (!camp) notFound();

  // Group sessions by break window, in calendar order.
  const grouped = BREAK_WINDOWS.map((w) => ({
    window: w,
    sessions: camp.sessions.filter((s) => s.window === w.id),
  })).filter((g) => g.sessions.length > 0);

  const hosts = (camp.hosts ?? [])
    .map((s) => campBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const hostedAt = (camp.hostedAt ?? [])
    .map((s) => campBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const stale = isStale(camp.lastVerified);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Camps", item: `${SITE}/camps` },
        {
          "@type": "ListItem",
          position: 3,
          name: camp.name,
          item: `${SITE}/camps/${camp.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: camp.name,
      url: camp.website,
      email: camp.email,
      telephone: camp.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: camp.area,
        addressCountry: "TH",
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-purple py-10 text-white">
        <div className="mx-auto max-w-4xl px-4">
          <Link href="/camps" className="text-sm text-white/80 hover:text-white">
            &larr; All camps
          </Link>
          <h1 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
            {camp.name}
          </h1>
          <p className="mt-2 text-white/90">
            {camp.mainVenue ?? camp.area}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
              {camp.area}
            </span>
            {camp.outsideBangkok && (
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
                Outside Bangkok
              </span>
            )}
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
              {camp.sessions.length} camp{camp.sessions.length === 1 ? "" : " weeks"}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="space-y-4 leading-relaxed text-neutral-700">
          {camp.description.split("\n\n").map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>

        {camp.worthKnowing && (
          <div className="mt-8 rounded-xl border border-black/5 bg-orange-50 p-5">
            <h2 className="font-heading font-bold text-purple-dark">
              Worth knowing
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              {camp.worthKnowing}
            </p>
          </div>
        )}

        {/* Contact */}
        <div className="mt-12 rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Contact
          </h2>
          <ul className="mt-3 space-y-1 text-sm text-neutral-700">
            {camp.website && (
              <li>
                <a
                  href={camp.website}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-orange"
                >
                  Official camp page
                </a>
              </li>
            )}
            {camp.email && (
              <li>
                Email:{" "}
                <a href={`mailto:${camp.email}`} className="text-orange">
                  {camp.email}
                </a>
              </li>
            )}
            {camp.phone && <li>Phone: {camp.phone}</li>}
            {camp.lineId && <li>LINE: {camp.lineId}</li>}
            {camp.facebook && (
              <li>
                <a
                  href={camp.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-orange"
                >
                  Facebook
                </a>
              </li>
            )}
          </ul>
          <p className="mt-4 text-xs text-neutral-500">
            Details verified {longDate(camp.lastVerified)}.
            {stale
              ? " That was a while ago, so confirm dates and prices with the organiser before booking."
              : " Always confirm with the organiser before booking."}
          </p>
        </div>

        {/* Sessions */}
        <h2 className="mt-12 font-heading text-2xl font-bold text-purple-dark">
          Camp weeks
        </h2>
        {grouped.map((g) => (
          <div key={g.window.id} className="mt-6">
            <h3 className="font-heading text-lg font-bold text-teal">
              {g.window.label}
            </h3>
            <div className="mt-3 space-y-3">
              {g.sessions.map((s) => {
                const dates = range(s.startDate, s.endDate);
                const cost = priceLabel(s);
                return (
                  <div
                    key={s.id}
                    className={`rounded-xl border border-black/5 bg-white p-5 shadow-sm ${s.dateStatus !== "confirmed" ? "opacity-80" : ""}`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-heading font-bold text-purple-dark">
                        {s.programme}
                      </h4>
                      <span className="text-sm font-semibold text-neutral-700">
                        {cost ?? (
                          <span className="font-normal text-neutral-400">
                            Price not published
                          </span>
                        )}
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-teal">
                      {dates ?? "Dates not announced"}
                    </p>
                    {s.dateStatus !== "confirmed" && (
                      <p className="text-xs text-neutral-500">
                        {s.previousRun
                          ? `Last ran ${s.previousRun}. Not yet re-announced.`
                          : "Not yet re-announced for this year."}
                      </p>
                    )}

                    <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm text-neutral-600 sm:grid-cols-2">
                      <div>
                        <dt className="inline font-semibold">Ages: </dt>
                        <dd className="inline">
                          {s.minAge} to {s.maxAge}
                        </dd>
                      </div>
                      <div>
                        <dt className="inline font-semibold">Format: </dt>
                        <dd className="inline">{FORMAT_LABEL[s.format]}</dd>
                      </div>
                      {s.hours && (
                        <div>
                          <dt className="inline font-semibold">Hours: </dt>
                          <dd className="inline">{s.hours}</dd>
                        </div>
                      )}
                      {s.minimumBooking && (
                        <div>
                          <dt className="inline font-semibold">Minimum: </dt>
                          <dd className="inline">{s.minimumBooking}</dd>
                        </div>
                      )}
                      {s.lunchIncluded !== undefined && (
                        <div>
                          <dt className="inline font-semibold">Lunch: </dt>
                          <dd className="inline">
                            {s.lunchIncluded ? "Included" : "Not included"}
                          </dd>
                        </div>
                      )}
                      {s.nights !== undefined && (
                        <div>
                          <dt className="inline font-semibold">Nights: </dt>
                          <dd className="inline">{s.nights}</dd>
                        </div>
                      )}
                      {s.supervisionRatio && (
                        <div>
                          <dt className="inline font-semibold">Ratio: </dt>
                          <dd className="inline">{s.supervisionRatio}</dd>
                        </div>
                      )}
                      {s.venue && (
                        <div className="sm:col-span-2">
                          <dt className="inline font-semibold">Venue: </dt>
                          <dd className="inline">{s.venue}</dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {s.categories.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal"
                        >
                          {CATEGORY_LABEL[c]}
                        </span>
                      ))}
                    </div>

                    {s.note && (
                      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                        {s.note}
                      </p>
                    )}

                    {s.bookingUrl && (
                      <a
                        href={s.bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-sm font-semibold text-orange"
                      >
                        Book with the organiser &rarr;
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Host relationships */}
        {hosts.length > 0 && (
          <div className="mt-8">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              Also running on this campus
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Separate operators with their own pricing and booking.
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              {hosts.map((h) => (
                <li key={h.slug}>
                  <Link
                    href={`/camps/${h.slug}`}
                    className="font-semibold text-orange"
                  >
                    {h.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hostedAt.length > 0 && (
          <div className="mt-8">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              Runs at
            </h2>
            <ul className="mt-3 space-y-1 text-sm">
              {hostedAt.map((h) => (
                <li key={h.slug}>
                  <Link
                    href={`/camps/${h.slug}`}
                    className="font-semibold text-orange"
                  >
                    {h.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/camps"
            className="rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Back to all camps
          </Link>
          <Link
            href="/school-breaks"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:border-orange hover:text-orange"
          >
            School holiday dates
          </Link>
        </div>
      </div>
    </>
  );
}
