import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ArticleCard from "@/components/ui/ArticleCard";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Family Activities in Bangkok",
  description:
    "Playgrounds, sports, cooking classes, theme parks, and things to do with kids in Bangkok.",
};

const CATEGORIES = [
  { title: "Playgrounds", desc: "Shaded, safe, and stroller-friendly spots across the city." },
  { title: "Sports", desc: "Swim, football, and multi-sport programs for kids of all ages." },
  { title: "Cooking Classes", desc: "Hands-on Thai cooking experiences built for families." },
  { title: "Board Games", desc: "Cafés and clubs for rainy-day afternoons." },
  { title: "Theme Parks", desc: "From water parks to full-day amusement park trips." },
];

export default function ActivitiesPage() {
  const articles = ARTICLES.filter((a) => a.category === "Activities");

  return (
    <>
      <PageHero
        eyebrow="Bangkok Family Options"
        title="Activities for Families in Bangkok"
        subtitle="Parents are always searching for things to do with their kids. Here's what our community recommends."
        color="green"
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <h3 className="font-heading text-lg font-bold text-purple-dark">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">{c.desc}</p>
            </div>
          ))}
        </div>

        {articles.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 font-heading text-2xl font-bold text-purple-dark">
              Related Reading
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
