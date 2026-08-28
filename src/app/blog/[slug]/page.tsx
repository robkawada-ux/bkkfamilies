import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ARTICLES, getArticle } from "@/lib/articles";

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
  const url = "https://bkkfamilies.com/blog/" + article.slug;

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
      images: article.heroImage ? [{ url: article.heroImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: article.heroImage ? [article.heroImage] : undefined,
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

  const url = "https://bkkfamilies.com/blog/" + article.slug;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription ?? article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    image: article.heroImage
      ? "https://bkkfamilies.com" + article.heroImage
      : undefined,
    author: {
      "@type": "Organization",
      name: "BKK Families",
      url: "https://bkkfamilies.com",
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bkkfamilies.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://bkkfamilies.com/blog" },
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
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
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
                <div
                  key={j}
                  className="relative my-6 aspect-[16/9] w-full overflow-hidden rounded-xl"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
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
            Browse all 120 schools in our directory →
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
