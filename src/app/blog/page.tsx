import type { Metadata } from "next";
import { og } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import ArticleCard from "@/components/ui/ArticleCard";
import { listedArticles } from "@/lib/articles";

// Re-render hourly so pinned articles drop back into date order on time.
export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog",
  description: "Guides and roundups for families living in Bangkok.",
  openGraph: og({
    title: "Guides for families in Bangkok",
    description:
      "Guides and roundups for families living in Bangkok.",
    path: "/blog",
  }),
};

export default function BlogPage() {
  const sorted = listedArticles();

  return (
    <>
      <PageHero
        eyebrow="Our Blog"
        title="Guides for Bangkok Families"
        subtitle="Most of our organic search traffic ends up here: practical, community-informed guides on schools, activities, and health."
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
