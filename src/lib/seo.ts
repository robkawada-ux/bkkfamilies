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
/**
 * Sections that have their own opengraph-image.png card, most specific
 * first. Next serves each one at <section>/opengraph-image.png.
 *
 * WHY: a page that sets openGraph (every page, via og() below) does NOT
 * inherit a parent folder's opengraph-image file, so detail pages such as
 * /playgroups/<slug> or /schools/<slug> were sharing to Facebook with no
 * picture at all. og() now always attaches the nearest section card, and
 * falls back to the homepage card. A section folder that has its own
 * opengraph-image.png still wins, because Next gives file-based images
 * priority over config.
 *
 * Adding a new section? Add an opengraph-image.png (1200x630) to its
 * folder and list it here, or its pages will share with the homepage card.
 */
const SECTION_CARDS = [
  "/healthcare/hospitals",
  "/healthcare/insurance",
  "/healthcare/maternity",
  "/healthcare/paediatrics",
  "/healthcare",
  "/learning-support",
  "/school-breaks",
  "/playgroups",
  "/schools",
  "/camps",
  "/blog",
];

export function shareImage(path: string): string {
  const section = SECTION_CARDS.find(
    (s) => path === s || path.startsWith(`${s}/`),
  );
  return `${SITE}${section ?? ""}/opengraph-image.png`;
}

export function og({
  title,
  description,
  path,
  type = "website",
  image,
}: {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/schools" or "/" for the homepage */
  path: string;
  type?: "website" | "article";
  /** Absolute URL of a page-specific 1200x630 image. Defaults to the section card. */
  image?: string;
}): Metadata["openGraph"] {
  return {
    title,
    description,
    url: path === "/" ? SITE : `${SITE}${path}`,
    siteName: SITE_NAME,
    locale: "en_US",
    type,
    images: [
      { url: image ?? shareImage(path), width: 1200, height: 630, alt: title },
    ],
  };
}
