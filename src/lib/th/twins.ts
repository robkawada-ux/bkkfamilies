/**
 * English paths that have a Thai twin under /th. Used for the sitemap's
 * hreflang pairs and for the ไทย link in every header, so they can never
 * disagree. Add a section here when it gets translated.
 */
export function thTwinPaths(): string[] {
  return ["/", "/contact", "/healthcare/emergency-numbers"];
}
