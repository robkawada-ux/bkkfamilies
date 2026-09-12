import type { Metadata } from "next";

export const SITE = "https://www.bkkfamilies.com";
export const SITE_NAME = "BKK Families";

/**
 * Build a complete openGraph block for a page.
 *
 * Next replaces a parent's openGraph object wholesale when a child defines
 * one, so a page cannot declare a partial block and expect siteName or
 * locale to survive. Equally, a page that declares NO openGraph inherits
 * the root layout's url and title, which is how every page on this site
 * ended up sharing as the homepage. Use this on every page.
 */
export function og({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/schools" or "/" for the homepage */
  path: string;
  type?: "website" | "article";
}): Metadata["openGraph"] {
  return {
    title,
    description,
    url: path === "/" ? SITE : `${SITE}${path}`,
    siteName: SITE_NAME,
    locale: "en_US",
    type,
  };
}
