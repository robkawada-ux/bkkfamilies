import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SCHOOLS } from "@/lib/schools";

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
  return {
    title: school.name,
    description:
      school.description ??
      `${school.name} international school in Bangkok. Curriculum: ${school.curricula.join(", ")}.`,
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

  return (
    <article className="mx-auto max-w-3xl">
      {school.photo ? (
        <div className="relative aspect-[21/9] w-full overflow-hidden">
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
          <p className="text-xs uppercase tracking-wide text-neutral-400">Yearly Fees</p>
          <p className="text-sm font-semibold text-purple-dark">
            {school.feeRange ?? BUDGET_LABEL[school.budget]}
          </p>
        </div>
        {school.founded && (
          <div className="rounded-xl border border-black/5 bg-neutral-50 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-neutral-400">Founded</p>
            <p className="text-sm font-semibold text-purple-dark">{school.founded}</p>
          </div>
        )}
      </div>

      {school.description ? (
        <p className="mt-8 leading-relaxed text-neutral-700">
          {school.description}
        </p>
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

      {school.website ? (
        <a
          href={school.website}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-full bg-orange px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Visit official website
        </a>
      ) : (
        <p className="mt-8 text-sm text-neutral-400">
          Official website not yet listed, search the school name directly
          to find it.
        </p>
      )}

      <div className="mt-12 border-t border-black/10 pt-8">
        <Link href="/schools" className="text-sm font-semibold text-orange">
          Back to all schools
        </Link>
      </div>
      </div>
    </article>
  );
}
