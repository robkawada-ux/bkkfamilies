import type { Metadata } from "next";
import { og } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SCHOOLS } from "@/lib/schools";
import { SITE } from "@/lib/seo";
import {
  schoolFees,
  feesOnEnquiry,
  feeSummary,
  formatThb,
  formatVerifiedDate,
  INCLUSION_LABEL,
  ONE_TIME_LABEL,
  type SchoolFees,
  type OneTimeFees,
} from "@/lib/schoolFees";

export function generateStaticParams() {
  return SCHOOLS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const school = SCHOOLS.find((s) => s.slug === slug);
  if (!school) return {};
  const firstPara = school.description?.split("\n\n")[0] ?? "";
  const description = firstPara
    ? firstPara.length <= 158
      ? firstPara
      : firstPara.slice(0, firstPara.lastIndexOf(" ", 155)) + "..."
    : `${school.name} international school in Bangkok. Curriculum: ${school.curricula.join(", ")}.`;

  return {
    title: school.name,
    description,
    alternates: {
      canonical: `https://www.bkkfamilies.com/schools/${school.slug}`,
    },
    openGraph: {
      ...og({
        title: school.name,
        description,
        path: `/schools/${school.slug}`,
      }),
      // Schools that have sent us a photo share with it; the rest fall back
      // to the schools directory card.
      ...(school.photo
        ? { images: [{ url: school.photo, width: 1200, height: 630 }] }
        : {}),
    },
  };
}

const BUDGET_LABEL: Record<string, string> = {
  under400k: "Under 400,000 THB / year",
  over400k: "Over 400,000 THB / year",
  unknown: "Fees not published, confirm with school",
};

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = SCHOOLS.find((s) => s.slug === slug);
  if (!school) return notFound();

  const pageUrl = `${SITE}/schools/${school.slug}`;
  const fees = schoolFees[school.slug];
  const summary = feeSummary(school.slug);
  const onEnquiry = feesOnEnquiry[school.slug];
  const firstPara = school.description?.split("\n\n")[0];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        {
          "@type": "ListItem",
          position: 2,
          name: "Schools",
          item: `${SITE}/schools`,
        },
        { "@type": "ListItem", position: 3, name: school.name, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: pageUrl,
      name: school.name,
      mainEntity: {
        "@type": "School",
        name: school.name,
        areaServed: "Bangkok, Thailand",
        ...(firstPara ? { description: firstPara } : {}),
        ...(school.website ? { url: school.website } : {}),
        ...(school.photo ? { image: `${SITE}${school.photo}` } : {}),
        ...(school.founded ? { foundingDate: String(school.founded) } : {}),
        ...(school.languageOfInstruction
          ? { knowsLanguage: school.languageOfInstruction }
          : {}),
      },
    },
  ];

  return (
    <article className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {school.photo ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={school.photo}
            alt={school.name}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
          <div className="absolute inset-0 flex flex-col justify-between px-4 py-6">
            <div className="mx-auto w-full max-w-3xl">
              <Link href="/schools" className="text-sm font-semibold text-white/90 hover:text-white">
                Back to Schools
              </Link>
            </div>
            <div className="mx-auto w-full max-w-3xl">
              <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">
                {school.name}
              </h1>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {school.curricula.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-purple px-4 py-12 text-white">
          <div className="mx-auto max-w-3xl">
            <Link href="/schools" className="text-sm font-semibold text-white/80 hover:text-white">
              Back to Schools
            </Link>
            <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
              {school.name}
            </h1>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {school.curricula.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="px-4 py-12">
      <div className="grid gap-3 sm:grid-cols-2">
        {school.ageRange && (
          <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-neutral-400">Ages</p>
            <p className="text-sm font-semibold text-purple-dark">{school.ageRange}</p>
          </div>
        )}
        {school.languageOfInstruction && (
          <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-neutral-400">Language of Instruction</p>
            <p className="text-sm font-semibold text-purple-dark">{school.languageOfInstruction}</p>
          </div>
        )}
        <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-neutral-400">
            Yearly Fees{summary ? ` ${summary.feeYear}` : ""}
          </p>
          {summary ? (
            <>
              {summary.primary ? (
                <p className="text-sm font-semibold text-purple-dark">
                  {summary.primary.label}: {formatThb(summary.primary.annual)} THB
                </p>
              ) : (
                <p className="text-sm font-semibold text-purple-dark">
                  {formatThb(summary.from.annual)} to {formatThb(summary.to.annual)} THB
                </p>
              )}
              <p className="mt-0.5 text-xs text-neutral-500">
                {summary.primary
                  ? `From ${formatThb(summary.from.annual)} (${summary.from.label}) to ${formatThb(summary.to.annual)} (${summary.to.label}). `
                  : `${summary.from.label} to ${summary.to.label}. `}
                <a href="#fees" className="font-semibold text-orange">
                  Full fee table
                </a>
              </p>
            </>
          ) : onEnquiry ? (
            <>
              <p className="text-sm font-semibold text-purple-dark">
                Not published, on enquiry
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">
                The school does not publish a fee schedule. Checked{" "}
                {formatVerifiedDate(onEnquiry.checked)}.
              </p>
            </>
          ) : school.feeRange ? (
            <>
              <p className="text-sm font-semibold text-purple-dark">
                {school.feeRange}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">
                Indicative, from third-party data. Not yet checked against
                the school&apos;s own schedule, so confirm with the school.
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold text-purple-dark">
              {BUDGET_LABEL[school.budget]}
            </p>
          )}
        </div>
        {school.founded && (
          <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-neutral-400">Founded</p>
            <p className="text-sm font-semibold text-purple-dark">{school.founded}</p>
          </div>
        )}
      </div>

      {school.description ? (
        <div className="mt-8 space-y-4">
          {school.description.split("\n\n").map((para, i) => (
            <p key={i} className="leading-relaxed text-neutral-700">
              {para}
            </p>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-black/5 bg-neutral-50 p-6 text-sm text-neutral-500">
          <p>
            We do not yet have a detailed write-up for this school. In the
            meantime, we recommend reaching out directly or asking in the
            Bangkok Expat Families group below, where many parents have
            first-hand experience.
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
      )}

      {fees && summary && <FeeTable fees={fees} schoolName={school.name} />}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {school.website ? (
          <a
            href={school.website}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full bg-orange px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Visit official website
          </a>
        ) : (
          <p className="text-sm text-neutral-400">
            Official website not yet listed, search the school name directly
            to find it.
          </p>
        )}
        {school.virtualTour && (
          <a
            href={school.virtualTour}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full border border-orange px-6 py-3 font-semibold text-orange transition hover:bg-orange hover:text-white"
          >
            Watch the campus tour
          </a>
        )}
      </div>

      <div className="mt-12 border-t border-black/10 pt-8">
        <Link href="/schools" className="text-sm font-semibold text-orange">
          Back to all schools
        </Link>
      </div>
      </div>
    </article>
  );
}

function FeeTable({ fees, schoolName }: { fees: SchoolFees; schoolName: string }) {
  const rows = fees.rows ?? [];
  const oneTime = Object.entries(fees.oneTime ?? {}).filter(
    ([, v]) => typeof v === "number",
  ) as [keyof OneTimeFees, number][];
  const sourceIsUrl = fees.sourceUrl?.startsWith("http");
  const partial = rows.length <= 2;

  return (
    <section id="fees" className="mt-12 scroll-mt-40">
      <h2 className="font-heading text-2xl font-bold text-purple-dark">
        {schoolName} fees {fees.feeYear}
      </h2>
      <p className="mt-2 text-sm text-neutral-600">
        Annual tuition in Thai baht, read from the school&apos;s own fee
        schedule
        {fees.verified ? ` on ${formatVerifiedDate(fees.verified)}` : ""}.
        {partial
          ? " The school gave us the lowest and highest figures only, not every year group."
          : ""}
      </p>

      <div className="mt-5 overflow-hidden rounded-xl border border-black/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-semibold">Year group</th>
              <th scope="col" className="px-4 py-2.5 text-right font-semibold">THB per year</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-black/5">
                <td className="px-4 py-2.5 text-neutral-700">
                  {r.label}
                  {r.billedTerms === 2 && (
                    <span className="block text-xs text-neutral-400">
                      Exam year, billed over two terms
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-purple-dark">
                  {formatThb(r.annual)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {oneTime.length > 0 && (
        <div className="mt-6">
          <h3 className="font-heading text-lg font-bold text-purple-dark">
            One-time fees at entry
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            {oneTime.map(([k, v]) => (
              <li key={k} className="flex justify-between gap-4 border-b border-black/5 py-1.5">
                <span>{ONE_TIME_LABEL[k]}</span>
                <span className="font-semibold tabular-nums text-purple-dark">
                  {formatThb(v)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {fees.extras && fees.extras.length > 0 && (
        <div className="mt-6">
          <h3 className="font-heading text-lg font-bold text-purple-dark">
            Charged on top of tuition
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            {fees.extras.map((e) => (
              <li key={e.label} className="flex justify-between gap-4 border-b border-black/5 py-1.5">
                <span>
                  {e.label}
                  {e.compulsory && (
                    <span className="ml-2 rounded-full bg-orange/10 px-2 py-0.5 text-xs font-semibold text-orange">
                      Compulsory
                    </span>
                  )}
                </span>
                <span className="whitespace-nowrap font-semibold tabular-nums text-purple-dark">
                  {formatThb(e.annualFrom)}
                  {e.annualTo ? ` to ${formatThb(e.annualTo)}` : ""} / yr
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(fees.includes?.length || fees.excludes?.length) ? (
        <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          {fees.includes && fees.includes.length > 0 && (
            <div className="rounded-xl bg-neutral-50 p-4">
              <p className="text-xs uppercase tracking-wide text-neutral-400">Included in tuition</p>
              <p className="mt-1 text-neutral-700">
                {fees.includes.map((i) => INCLUSION_LABEL[i]).join(", ")}
              </p>
            </div>
          )}
          {fees.excludes && fees.excludes.length > 0 && (
            <div className="rounded-xl bg-neutral-50 p-4">
              <p className="text-xs uppercase tracking-wide text-neutral-400">Not included</p>
              <p className="mt-1 text-neutral-700">
                {fees.excludes.map((i) => INCLUSION_LABEL[i]).join(", ")}
              </p>
            </div>
          )}
        </div>
      ) : null}

      {fees.note && (
        <p className="mt-6 rounded-xl border-l-4 border-orange bg-orange/5 p-4 text-sm leading-relaxed text-neutral-700">
          <span className="font-semibold text-purple-dark">Worth knowing: </span>
          {fees.note}
        </p>
      )}

      <p className="mt-4 text-xs text-neutral-500">
        Source:{" "}
        {sourceIsUrl ? (
          <a href={fees.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-orange">
            {schoolName} fee schedule
          </a>
        ) : (
          fees.sourceUrl ?? "the school"
        )}
        . Fees change every year, so confirm with the school before you budget.{" "}
        <Link href="/blog/what-does-international-school-actually-cost-bangkok-2026" className="font-semibold text-orange">
          What international school really costs in Bangkok
        </Link>
      </p>
    </section>
  );
}
