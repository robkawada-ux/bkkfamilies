import type { Article } from "./articles";

/**
 * Private previews of sponsored articles waiting for the sponsor's approval.
 *
 * These are NOT in ARTICLES, so they stay out of /blog, the homepage, the
 * sitemap and related links. The blog page still renders them at
 * /blog/<slug> (on demand) with noindex and a "private preview" banner, so
 * the sponsor can see exactly how the article will look. The slugs end in a
 * random suffix so nobody stumbles on them.
 *
 * To publish: move the entry into ARTICLES, drop the suffix from the slug,
 * set date to the publish date, and delete it here.
 */
export const PREVIEW_ARTICLES: Article[] = [
];

export function getPreviewArticle(slug: string) {
  return PREVIEW_ARTICLES.find((a) => a.slug === slug);
}
