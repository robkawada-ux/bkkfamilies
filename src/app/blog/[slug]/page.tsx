import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES, getArticle } from "@/lib/articles";
import { SCHOOLS } from "@/lib/schools";

/**
 * Articles that ship a generated Open Graph card, keyed by slug. Anything
 * without a heroImage and not listed here falls back to the generic blog
 * card, so a new article can never end up with no share image at all.
 */
const OG_CARDS = new Set([
  "third-culture-kids-bangkok-moving-back",
  "is-bangkok-safe-for-kids",
  "top-5-hospitals-in-bangkok",
  "staying-fit-in-bangkok",
  "dental-health-for-families-in-bangkok",
  "top-museums-for-kids-in-bangkok",
]);

/** Hero photo if there is one, else a generated card, else the blog default. */
function shareImage(slug: string, heroImage?: string) {
  if (heroImage) return heroImage;
  if (OG_CARDS.has(slug)) return `/images/og/blog/${slug}.png`;
  return "/images/og/blog-default.png";
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const description = article.metaDescription ?? article.excerpt;
  const url = "https://www.bkkfamilies.com/blog/" + article.slug;
  const image = shareImage(article.slug, article.heroImage);

  return {
    title: article.title,
    description,
    keywords: article.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description,
      url,
      type: "article",
      publishedTime: article.date,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return notFound();

  const url = "https://www.bkkfamilies.com/blog/" + article.slug;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription ?? article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    image:
      "https://www.bkkfamilies.com" +
      shareImage(article.slug, article.heroImage),
    author: {
      "@type": "Organization",
      name: "BKK Families",
      url: "https://www.bkkfamilies.com",
    },
    publisher: {
      "@type": "Organization",
      name: "BKK Families",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bkkfamilies.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.bkkfamilies.com/blog" },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  const faqJsonLd = article.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-neutral-400">
        <Link href="/" className="hover:text-orange">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/blog" className="hover:text-orange">Blog</Link>
        <span className="mx-1.5">/</span>
        <span className="text-neutral-500">{article.title}</span>
      </nav>

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

      {article.heroImage && (
        <div className="mt-8 w-full overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.heroImage}
            alt={article.title}
            className="h-auto w-full"
          />
        </div>
      )}

      <div className="prose prose-neutral mt-8 max-w-none">
        {article.body.map((p, i) => {
          const heading = article.headings?.find((h) => h.beforeParagraph === i);
          const inlineImages = article.images?.filter(
            (img) => img.afterParagraph === i
          );
          return (
            <div key={i}>
              {heading && (
                <h2 className="mb-3 mt-8 font-heading text-xl font-bold text-purple-dark md:text-2xl">
                  {heading.text}
                </h2>
              )}
              <p className="mb-4 leading-relaxed text-neutral-700">{p}</p>
              {inlineImages?.map((img, j) => (
                <div key={j} className="my-6 w-full overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} className="h-auto w-full" />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {article.relatedSchools && article.relatedSchools.length > 0 && (
        <div className="mt-10 rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Schools mentioned in this guide
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {article.relatedSchools.map((s) => (
              <li key={s.slug}>
                <Link
                  href={"/schools/" + s.slug}
                  className="text-sm font-semibold text-orange hover:underline"
                >
                  {s.name} →
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/schools"
            className="mt-4 inline-block text-sm font-semibold text-teal hover:underline"
          >
            Browse all {SCHOOLS.length} schools in our directory →
          </Link>
        </div>
      )}

      {article.faq && article.faq.length > 0 && (
        <div className="mt-10">
          <h2 className="font-heading text-xl font-bold text-purple-dark">
            Frequently asked questions
          </h2>
          <div className="mt-4 space-y-4">
            {article.faq.map((f, i) => (
              <div key={i} className="rounded-xl border border-black/5 p-5">
                <h3 className="font-heading text-base font-bold text-purple-dark">
                  {f.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 border-t border-black/10 pt-8">
        <Link href="/blog" className="text-sm font-semibold text-orange">
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}
