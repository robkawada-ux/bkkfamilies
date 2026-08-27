import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ArticleCard from "@/components/ui/ArticleCard";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides and roundups for families living in Bangkok.",
};

export default function BlogPage() {
  const sorted = ARTICLES.slice().sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHero
        eyebrow="Our Blog"
        title="Guides for Bangkok Families"
        subtitle="Most of our organic search traffic ends up here — practical, community-informed guides on schools, activities, and health."
        color="orange"
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {sorted.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </>
  );
}
