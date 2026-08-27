import Link from "next/link";
import type { Article } from "@/lib/articles";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group block overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="h-2 w-full bg-orange" />
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-teal">
          {article.category}
        </p>
        <h3 className="mt-2 font-heading text-lg font-bold text-purple-dark group-hover:text-orange">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-neutral-600">{article.excerpt}</p>
        <p className="mt-3 text-xs text-neutral-400">
          {new Date(article.date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
