import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ArticleCard from "@/components/ui/ArticleCard";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Fitness & Health for Families in Bangkok",
  description:
    "Hospitals, dentists, and staying active as a family in Bangkok.",
};

export default function FitnessHealthPage() {
  const articles = ARTICLES.filter((a) => a.category === "Fitness/Health");

  return (
    <>
      <PageHero
        eyebrow="Trust is a primary concern"
        title="Fitness & Health in Bangkok"
        subtitle="Finding the right hospital, dentist, or fitness routine is one of the biggest concerns for expat families. Here's what our community trusts."
        color="purple"
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </>
  );
}
