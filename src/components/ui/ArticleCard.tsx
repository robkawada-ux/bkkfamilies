import Link from "next/link";
import type { Article } from "@/lib/articles";
import { HALLOWEEN_SLUG } from "@/lib/halloween";

export default function ArticleCard({ article }: { article: Article }) {
  const spooky = article.slug === HALLOWEEN_SLUG;
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group block w-full overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {spooky ? (
        <div
          className="h-2 w-full bg-purple-dark"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, #3D1E5C 0 14px, #F4831F 14px 28px)" }}
        />
      ) : (
        <div className="h-2 w-full bg-orange" />
      )}
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-teal">
          {article.category}
          {article.sponsored && (
            <span className="ml-2 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] text-neutral-500">
              Sponsored
            </span>
          )}
          {spooky && (
            <span className="ml-2 rounded bg-purple-dark px-1.5 py-0.5 text-[10px] text-orange">
              🎃 Halloween 2026
            </span>
          )}
        </p>
        <h3 className="mt-2 font-heading text-lg font-bold text-purple-dark group-hover:text-orange">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-neutral-600">{article.excerpt}</p>
        <p className="mt-3 text-xs text-neutral-400">
          {new Date(article.date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          })}
        </p>
      </div>
    </Link>
  );
}
