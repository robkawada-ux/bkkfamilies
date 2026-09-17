import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES, getArticle } from "@/lib/articles";
import { SCHOOLS } from "@/lib/schools";
import { FACILITIES } from "@/lib/healthcare";
import RichText, { stripRichText } from "@/components/ui/RichText";

/**
 * Articles that ship a generated Open Graph card, keyed by slug. Anything
 * without a heroImage and not listed here falls back to the generic blog
 * card, so a new article can never end up with no share image at all.
 *
 * A slug listed here MUST have a matching file at
 * public/images/og/blog/<slug>.png, or the share image 404s, which is worse
 * than the default. Add the file and the slug together.
 *
 * The cards carry the article title, so RETITLING AN ARTICLE MEANS
 * REGENERATING ITS CARD. Three cards here were left showing old titles after
 * a round of rewrites before anyone noticed.
 */
const OG_CARDS = new Set([
  "third-culture-kids-bangkok-moving-back",
  "is-bangkok-safe-for-kids",
  "top-5-hospitals-in-bangkok",
  "staying-fit-in-bangkok",
  "dental-health-for-families-in-bangkok",
  "top-museums-for-kids-in-bangkok",
  "having-a-baby-in-bangkok",
  "bangkok-smog-season-kids",
  "pharmacies-in-thailand-guide",
  "heatstroke-thailand-hot-season",
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
          name: stripRichText(f.question),
          acceptedAnswer: {
            "@type": "Answer",
            text: stripRichText(f.answer),
          },
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
              <p className="mb-4 leading-relaxed text-neutral-700">
                <RichText text={p} />
              </p>
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

      {article.relatedFacilities && article.relatedFacilities.length > 0 && (
        <div className="mt-10 rounded-xl border border-black/5 bg-teal-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Places mentioned in this guide
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {article.relatedFacilities.map((f) => (
              <li key={f.slug}>
                <Link
                  href={"/healthcare/hospitals/" + f.slug}
                  className="text-sm font-semibold text-orange hover:underline"
                >
                  {f.name} →
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/healthcare/hospitals"
            className="mt-4 inline-block text-sm font-semibold text-teal hover:underline"
          >
            Browse all {FACILITIES.length} hospitals, clinics and dentists →
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
                  <RichText text={f.answer} />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {article.category === "Healthcare" && (
        <p className="mt-10 text-xs leading-relaxed text-neutral-500">
          This article is information, not medical advice. We are parents who
          have lived here, not clinicians, and nothing here is a recommendation
          to use or avoid any particular hospital, doctor, medication or
          treatment. Prices, rules and services change, so confirm anything
          important with the provider or the relevant authority before you rely
          on it. In an emergency, Thailand&rsquo;s national ambulance number is
          1669.
        </p>
      )}

      <div className="mt-12 border-t border-black/10 pt-8">
        <Link href="/blog" className="text-sm font-semibold text-orange">
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}
