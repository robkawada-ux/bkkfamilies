import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FACILITIES,
  facilityBySlug,
  isStale,
  EMERGENCY_NUMBER,
  SERVICE_LABEL,
  TYPE_LABEL,
  type Facility,
  type DirectBilling,
} from "@/lib/healthcare";

const SITE = "https://www.bkkfamilies.com";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function longDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function baht(n: number): string {
  return `฿${n.toLocaleString()}`;
}

const BILLING_LABEL: Record<DirectBilling, string> = {
  most: "Direct billing with most international insurers",
  some: "Direct billing with a limited panel of insurers",
  none: "No direct billing, pay and claim back",
  unknown: "Direct billing arrangements not published",
};

/** Map our facility types onto the closest schema.org medical types. */
function schemaType(f: Facility): string {
  switch (f.type) {
    case "dental":
      return "Dentist";
    case "clinic":
      return "MedicalClinic";
    default:
      return "Hospital";
  }
}

export function generateStaticParams() {
  return FACILITIES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const facility = facilityBySlug(slug);
  if (!facility) return {};

  const firstPara = facility.description.split("\n\n")[0] ?? "";
  const description =
    firstPara.length <= 158 ? firstPara : `${firstPara.slice(0, 155)}...`;

  return {
    title: `${facility.name} | Healthcare in Bangkok`,
    description,
    alternates: { canonical: `${SITE}/healthcare/hospitals/${facility.slug}` },
    openGraph: og({
      title: facility.name,
      description,
      path: `/healthcare/hospitals/${facility.slug}`,
    }),
  };
}

export default async function FacilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const facility = facilityBySlug(slug);
  if (!facility) notFound();

  const stale = isStale(facility.lastVerified);
  const m = facility.maternity;
  const p = facility.paediatrics;

  const nearby = FACILITIES.filter(
    (f) => f.area === facility.area && f.slug !== facility.slug
  ).slice(0, 4);

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
        {
          "@type": "ListItem",
          position: 3,
          name: "Hospitals and clinics",
          item: `${SITE}/healthcare/hospitals`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: facility.name,
          item: `${SITE}/healthcare/hospitals/${facility.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": schemaType(facility),
      name: facility.name,
      alternateName: facility.thaiName,
      url: facility.website,
      email: facility.email,
      telephone: facility.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: facility.address,
        addressLocality: facility.area,
        addressRegion: "Bangkok",
        addressCountry: "TH",
      },
      availableService: facility.services.map((s) => ({
        "@type": "MedicalProcedure",
        name: SERVICE_LABEL[s],
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-teal px-4 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-4 text-sm text-white/80" aria-label="Breadcrumb">
            <Link href="/healthcare" className="hover:underline">
              Healthcare
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <Link href="/healthcare/hospitals" className="hover:underline">
              Hospitals and clinics
            </Link>
          </nav>
          <h1 className="font-heading text-3xl font-bold md:text-4xl">
            {facility.name}
          </h1>
          {facility.thaiName && (
            <p className="mt-1 text-lg text-white/80">{facility.thaiName}</p>
          )}
          <p className="mt-3 text-white/90">
            {TYPE_LABEL[facility.type]} &middot; {facility.area}
            {facility.jciAccredited && " · JCI accredited"}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {facility.services.map((s) => (
              <span
                key={s}
                className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium"
              >
                {SERVICE_LABEL[s]}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {stale && (
          <div className="mb-8 rounded-xl border border-black/5 bg-orange-50 p-4 text-sm leading-relaxed text-neutral-700">
            <strong className="font-semibold">
              This entry is due a check.
            </strong>{" "}
            We last verified it on {longDate(facility.lastVerified)}. Prices and
            phone numbers change often, so confirm anything important with the
            provider before you rely on it.
          </div>
        )}

        <div className="space-y-4 leading-relaxed text-neutral-700">
          {facility.description.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {facility.worthKnowing && (
          <div className="mt-8 rounded-xl border border-black/5 bg-orange-50 p-6">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              Worth knowing
            </h2>
            <p className="mt-2 leading-relaxed text-neutral-700">
              {facility.worthKnowing}
            </p>
          </div>
        )}

        {m && (
          <div className="mt-10 rounded-xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-purple-dark">
              Having a baby here
            </h2>

            {typeof m.packageFrom === "number" ? (
              <p className="mt-3 text-2xl font-bold text-teal">
                {baht(m.packageFrom)}
                {m.packageTo && m.packageTo !== m.packageFrom && (
                  <span className="text-neutral-500">
                    {" "}
                    to {baht(m.packageTo)}
                  </span>
                )}
              </p>
            ) : (
              <p className="mt-3 text-lg font-semibold text-neutral-500">
                Price not published
              </p>
            )}

            {m.packageNote && (
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {m.packageNote}
              </p>
            )}

            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {typeof m.nicuLevel === "number" && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                    Neonatal intensive care
                  </dt>
                  <dd className="text-sm text-neutral-700">
                    Level {m.nicuLevel}
                    {m.nicuLevel === 3
                      ? ", full intensive care including ventilation"
                      : ", special care"}
                  </dd>
                </div>
              )}
              {typeof m.partnerCanStay === "boolean" && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                    Partner can stay overnight
                  </dt>
                  <dd className="text-sm text-neutral-700">
                    {m.partnerCanStay ? "Yes" : "No"}
                  </dd>
                </div>
              )}
              {typeof m.waterBirth === "boolean" && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                    Water birth
                  </dt>
                  <dd className="text-sm text-neutral-700">
                    {m.waterBirth ? "Available" : "Not available"}
                  </dd>
                </div>
              )}
              {typeof m.vbacSupported === "boolean" && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                    Vaginal birth after caesarean
                  </dt>
                  <dd className="text-sm text-neutral-700">
                    {m.vbacSupported ? "Supported" : "Not supported"}
                  </dd>
                </div>
              )}
            </dl>

            <p className="mt-5 text-xs text-neutral-500">
              Package details checked {longDate(m.lastVerified)}.
              {m.packageUrl && (
                <>
                  {" "}
                  <a
                    href={m.packageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-teal hover:underline"
                  >
                    Read the hospital&rsquo;s own package page
                  </a>
                </>
              )}
            </p>
          </div>
        )}

        {p && (
          <div className="mt-8 rounded-xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-purple-dark">
              Children here
            </h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {typeof p.separateChildrensEr === "boolean" && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                    Separate children&rsquo;s emergency
                  </dt>
                  <dd className="text-sm text-neutral-700">
                    {p.separateChildrensEr
                      ? `Yes${p.erHours ? `, ${p.erHours}` : ""}`
                      : "No, children are seen in the general emergency department"}
                  </dd>
                </div>
              )}
              {typeof p.developmentalServices === "boolean" && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                    Developmental services
                  </dt>
                  <dd className="text-sm text-neutral-700">
                    {p.developmentalServices ? "Available" : "Not available"}
                  </dd>
                </div>
              )}
            </dl>
            {p.note && (
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                {p.note}
              </p>
            )}
            <p className="mt-4 text-xs text-neutral-500">
              Checked {longDate(p.lastVerified)}.
            </p>
          </div>
        )}

        <div className="mt-8 rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Practical details
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            {facility.address && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                  Address
                </dt>
                <dd className="text-neutral-700">{facility.address}</dd>
              </div>
            )}
            {facility.nearestTransit && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                  Getting there
                </dt>
                <dd className="text-neutral-700">{facility.nearestTransit}</dd>
              </div>
            )}
            {facility.phone && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                  Phone
                </dt>
                <dd className="text-neutral-700">{facility.phone}</dd>
              </div>
            )}
            {facility.emergencyPhone && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                  Emergency or ambulance
                </dt>
                <dd className="font-semibold text-neutral-800">
                  {facility.emergencyPhone}
                </dd>
              </div>
            )}
            {facility.email && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                  Email
                </dt>
                <dd className="text-neutral-700">{facility.email}</dd>
              </div>
            )}
            {facility.languages && facility.languages.length > 0 && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                  Languages
                </dt>
                <dd className="text-neutral-700">
                  Thai, {facility.languages.join(", ")}
                </dd>
              </div>
            )}
            {facility.directBilling && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                  Insurance
                </dt>
                <dd className="text-neutral-700">
                  {BILLING_LABEL[facility.directBilling]}
                  {facility.directBillingNote
                    ? `. ${facility.directBillingNote}`
                    : ""}{" "}
                  <Link
                    href="/healthcare/insurance"
                    className="font-semibold text-teal hover:underline"
                  >
                    Compare health insurance
                  </Link>
                </dd>
              </div>
            )}
          </dl>

          {facility.website && (
            <a
              href={facility.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Visit the official website
            </a>
          )}
        </div>

        <p className="mt-8 rounded-xl border border-orange/30 bg-orange-50 p-4 text-sm leading-relaxed text-neutral-700">
          In an emergency, Thailand&rsquo;s national ambulance number is{" "}
          <strong className="font-bold">{EMERGENCY_NUMBER}</strong>.
        </p>

        {nearby.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-xl font-bold text-purple-dark">
              Also in {facility.area}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {nearby.map((f) => (
                <Link
                  key={f.slug}
                  href={`/healthcare/hospitals/${f.slug}`}
                  className="block rounded-xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="font-heading text-sm font-bold text-purple-dark">
                    {f.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {TYPE_LABEL[f.type]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/healthcare/hospitals"
            className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-600 transition hover:border-orange hover:text-orange"
          >
            Browse all {FACILITIES.length} places
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-600 transition hover:border-orange hover:text-orange"
          >
            Send a correction
          </Link>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-neutral-500">
          Last checked {longDate(facility.lastVerified)}. This page is
          information, not medical advice, and is not a recommendation to use or
          avoid this provider. Confirm prices, services and insurance
          arrangements directly before you rely on them.
        </p>
      </div>
    </>
  );
}
