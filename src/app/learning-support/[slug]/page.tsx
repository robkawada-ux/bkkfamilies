import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROVIDERS, type ProviderCategory } from "@/lib/learningSupport";

const SITE = "https://www.bkkfamilies.com";

/** Closest schema.org type for each kind of provider */
const SCHEMA_TYPE: Record<ProviderCategory, string> = {
  "Assessment & diagnosis": "MedicalBusiness",
  "Therapy clinic": "MedicalBusiness",
  "ABA & behaviour support": "MedicalBusiness",
  "Hospital clinic": "MedicalClinic",
  "Specialist school": "EducationalOrganization",
  "School learning support": "EducationalOrganization",
  "Tutoring & mentoring": "EducationalOrganization",
  "Vocational & transition": "EducationalOrganization",
  "Enrichment & general learning": "EducationalOrganization",
  "Government service": "GovernmentOrganization",
  "Parent support": "Organization",
};

export function generateStaticParams() {
  return PROVIDERS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const provider = PROVIDERS.find((p) => p.slug === slug);
  if (!provider) return {};

  const firstPara = provider.description.split("\n\n")[0] ?? "";
  const description =
    firstPara.length <= 158
      ? firstPara
      : firstPara.slice(0, firstPara.lastIndexOf(" ", 155)) + "...";

  return {
    title: `${provider.name} | Learning Support in Bangkok`,
    description,
    alternates: {
      canonical: `https://www.bkkfamilies.com/learning-support/${provider.slug}`,
    },
  };
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-neutral-400">{label}</p>
      <p className="text-sm font-semibold text-purple-dark">{value}</p>
    </div>
  );
}

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = PROVIDERS.find((p) => p.slug === slug);
  if (!provider) return notFound();

  const url = `${SITE}/learning-support/${provider.slug}`;
  const sameAs = [provider.facebook, provider.instagram].filter(Boolean);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        {
          "@type": "ListItem",
          position: 2,
          name: "Learning Support",
          item: `${SITE}/learning-support`,
        },
        { "@type": "ListItem", position: 3, name: provider.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url,
      name: provider.name,
      mainEntity: {
        "@type": SCHEMA_TYPE[provider.category],
        name: provider.name,
        description: provider.description.split("\n\n")[0],
        areaServed: provider.area,
        ...(provider.website ? { url: provider.website } : {}),
        ...(provider.phone ? { telephone: provider.phone } : {}),
        ...(provider.email ? { email: provider.email } : {}),
        ...(provider.address
          ? {
              address: {
                "@type": "PostalAddress",
                streetAddress: provider.address,
                addressCountry: "TH",
              },
            }
          : {}),
        ...(provider.languages?.length
          ? { availableLanguage: provider.languages }
          : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
    },
  ];

  const related = PROVIDERS.filter(
    (p) => p.category === provider.category && p.slug !== provider.slug,
  ).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-purple px-4 py-12 text-white">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/learning-support"
            className="text-sm font-semibold text-white/80 hover:text-white"
          >
            Back to Learning Support
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/70">
            {provider.category}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
            {provider.name}
          </h1>
          {provider.tags && provider.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {provider.tags.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-12">
        <div className="grid gap-3 sm:grid-cols-2">
          <Fact label="Area" value={provider.area} />
          {provider.ages && <Fact label="Ages" value={provider.ages} />}
          {provider.languages && provider.languages.length > 0 && (
            <Fact label="Languages" value={provider.languages.join(", ")} />
          )}
          {provider.delivery && provider.delivery.length > 0 && (
            <Fact label="Delivered" value={provider.delivery.join(", ")} />
          )}
        </div>

        <div className="mt-8 space-y-4">
          {provider.description.split("\n\n").map((para, i) => (
            <p key={i} className="leading-relaxed text-neutral-700">
              {para}
            </p>
          ))}
        </div>

        {provider.note && (
          <div className="mt-8 rounded-xl border-l-4 border-orange bg-orange/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-orange">
              Worth knowing
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              {provider.note}
            </p>
          </div>
        )}

        <div className="mt-10">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            What they offer
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {provider.services.map((s) => (
              <li
                key={s}
                className="rounded-lg border border-black/5 bg-white px-3 py-2 text-sm text-neutral-700 shadow-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Contact
          </h2>
          <dl className="mt-3 space-y-2 text-sm">
            {provider.address && (
              <div>
                <dt className="inline font-semibold text-neutral-500">
                  Address:{" "}
                </dt>
                <dd className="inline text-neutral-700">{provider.address}</dd>
              </div>
            )}
            {provider.phone && (
              <div>
                <dt className="inline font-semibold text-neutral-500">
                  Phone:{" "}
                </dt>
                <dd className="inline text-neutral-700">
                  <a href={`tel:${provider.phone.replace(/\s/g, "")}`}>
                    {provider.phone}
                  </a>
                </dd>
              </div>
            )}
            {provider.email && (
              <div>
                <dt className="inline font-semibold text-neutral-500">
                  Email:{" "}
                </dt>
                <dd className="inline text-neutral-700">
                  <a href={`mailto:${provider.email}`}>{provider.email}</a>
                </dd>
              </div>
            )}
            {provider.facebook && (
              <div>
                <dt className="inline font-semibold text-neutral-500">
                  Facebook:{" "}
                </dt>
                <dd className="inline">
                  <a
                    href={provider.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange"
                  >
                    View page
                  </a>
                </dd>
              </div>
            )}
            {provider.instagram && (
              <div>
                <dt className="inline font-semibold text-neutral-500">
                  Instagram:{" "}
                </dt>
                <dd className="inline">
                  <a
                    href={provider.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange"
                  >
                    View profile
                  </a>
                </dd>
              </div>
            )}
          </dl>

          {provider.website ? (
            <a
              href={provider.website}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Visit official website
            </a>
          ) : (
            <p className="mt-5 text-sm text-neutral-500">
              No official website listed. Use the contact details above.
            </p>
          )}

          <p className="mt-4 text-xs text-neutral-400">
            Details last checked {provider.checked}. Always confirm directly
            before travelling.
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Used this provider?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Other families would like to hear how it went. Share your experience
            in the Bangkok Expat Families group, where thousands of parents in
            the city compare notes.
          </p>
          <a
            href="https://www.facebook.com/groups/395501457186828"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-semibold text-orange"
          >
            Ask in Bangkok Expat Families
          </a>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-lg font-bold text-purple-dark">
              Similar providers
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/learning-support/${r.slug}`}
                  className="block rounded-xl border border-black/5 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="font-heading text-sm font-bold text-purple-dark">
                    {r.name}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">{r.area}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 border-t border-black/10 pt-8">
          <Link
            href="/learning-support"
            className="text-sm font-semibold text-orange"
          >
            Back to all learning support providers
          </Link>
        </div>
      </div>
    </article>
  );
}
