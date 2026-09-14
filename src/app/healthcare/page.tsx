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
  EMERGENCY_NUMBER,
} from "@/lib/healthcare";

const TITLE = "Healthcare for Families in Bangkok";
const DESCRIPTION =
  "Hospitals, maternity care, paediatrics, clinics and dentists for expat families in Bangkok, with real prices and honest write-ups.";

export const metadata: Metadata = {
  alternates: { canonical: "/healthcare" },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: og({ title: TITLE, description: DESCRIPTION, path: "/healthcare" }),
};

export default function HealthcarePage() {
  const articles = ARTICLES.filter((a) => a.category === "Healthcare");

  return (
    <>
      <PageHero
        eyebrow="Trust is a primary concern"
        title="Healthcare in Bangkok"
        subtitle="Working out where to have a baby, who to call at 2am, and what any of it costs is one of the hardest parts of moving here. Here is what we have checked."
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

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Link
            href="/healthcare/hospitals"
            className="block rounded-xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="font-heading text-3xl font-bold text-teal">
              {FACILITIES.length}
            </p>
            <h2 className="mt-1 font-heading text-lg font-bold text-purple-dark">
              Hospitals, clinics and dentists
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Filterable by what you need, where you are and what kind of place
              it is. Every entry says what it is good at and what it is not.
            </p>
          </Link>

          <Link
            href="/healthcare/hospitals"
            className="block rounded-xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="font-heading text-3xl font-bold text-teal">
              {MATERNITY_FACILITIES.length}
            </p>
            <h2 className="mt-1 font-heading text-lg font-bold text-purple-dark">
              Places that deliver babies
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              With published package prices side by side, so you can see what a
              birth actually costs before you choose a hospital.
            </p>
          </Link>

          <Link
            href="/healthcare/hospitals"
            className="block rounded-xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="font-heading text-3xl font-bold text-teal">
              {PAEDIATRIC_FACILITIES.length}
            </p>
            <h2 className="mt-1 font-heading text-lg font-bold text-purple-dark">
              Paediatric services
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Including which hospitals have a children&rsquo;s emergency
              department staffed by paediatricians, and which do not.
            </p>
          </Link>
        </div>

        {articles.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-purple-dark">
              Reading
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        )}

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
