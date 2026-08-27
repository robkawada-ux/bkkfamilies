import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs font-bold uppercase tracking-wide text-teal">
        {article.category}
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-purple-dark md:text-4xl">
        {article.title}
      </h1>
      <p className="mt-3 text-sm text-neutral-400">
        {new Date(article.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}{" "}
        · by BKK Families
      </p>

      <div className="prose prose-neutral mt-8 max-w-none">
        {article.body.map((p, i) => (
          <p key={i} className="mb-4 leading-relaxed text-neutral-700">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-12 border-t border-black/10 pt-8">
        <Link href="/blog" className="text-sm font-semibold text-orange">
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}
