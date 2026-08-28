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
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/schools" className="text-sm font-semibold text-orange">
        Back to Schools
      </Link>

      <h1 className="mt-4 font-heading text-3xl font-bold text-purple-dark md:text-4xl">
        {school.name}
      </h1>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {school.curricula.map((c) => (
          <span
            key={c}
            className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal"
          >
            {c}
          </span>
        ))}
      </div>

      <p className="mt-3 text-sm text-neutral-500">
        {BUDGET_LABEL[school.budget]}
        {school.founded && ` Founded ${school.founded}`}
      </p>

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
            href="https://www.facebook.com/share/g/1BtUEcrkLS/?mibextid=wwXIfr"
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
    </article>
  );
}
