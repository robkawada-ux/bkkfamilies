import type { Metadata } from "next";
import { SITE, SITE_NAME, shareImage } from "@/lib/seo";

/**
 * Simplified Chinese version of the site, served under /zh.
 *
 * ONE SWITCH controls whether /zh is public. While ZH_LAUNCHED is false:
 * - every /zh page sends robots noindex (follow stays on),
 * - /zh URLs are left out of sitemap.xml,
 * - no hreflang tags or sitemap alternates are emitted (an hreflang pointing
 *   at a noindex page is an error Google ignores),
 * - the English site does not link to /zh at all.
 * Reviewers reach /zh pages by typing the URL. Flip it to true only after a
 * native reader has checked the pages, then re-submit the sitemap in Search
 * Console.
 */
export const ZH_LAUNCHED = true;

export const ZH_PREFIX = "/zh";

/** "/playgroups/foo" -> "/zh/playgroups/foo"; "/" -> "/zh" */
export function zhPath(enPath: string): string {
  return enPath === "/" ? ZH_PREFIX : `${ZH_PREFIX}${enPath}`;
}

/** hreflang language map for a page that exists in both languages. */
export function hreflangLanguages(enPath: string): Record<string, string> {
  const en = enPath === "/" ? SITE : `${SITE}${enPath}`;
  return {
    en,
    "zh-Hans": `${SITE}${zhPath(enPath)}`,
    "x-default": en,
  };
}

/**
 * Metadata for a Chinese page. `enPath` is the English twin's path
 * ("/playgroups/foo", or "/" for the homepage). The canonical is the Chinese
 * URL itself, never the English one, or Google drops the Chinese page.
 */
export function zhMetadata({
  title,
  description,
  enPath,
  type = "website",
  image,
}: {
  title: string;
  description: string;
  enPath: string;
  type?: "website" | "article";
  image?: string;
}): Metadata {
  const url = `${SITE}${zhPath(enPath)}`;
  return {
    // The zh layout sets title.template, so pass only the page title.
    title,
    description,
    alternates: {
      canonical: url,
      ...(ZH_LAUNCHED ? { languages: hreflangLanguages(enPath) } : {}),
    },
    robots: ZH_LAUNCHED
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "zh_CN",
      type,
      // Reuse the English section card, which has no text that needs translating.
      images: [{ url: image ?? shareImage(enPath), width: 1200, height: 630, alt: title }],
    },
  };
}
