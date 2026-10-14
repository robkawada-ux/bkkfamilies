// Shared pieces for the seasonal guides (Christmas, New Year's Eve).
// Each guide keeps its own data file; this holds the finder types and the
// Bangkok-time date helpers they share.

/** Today's date in Bangkok (UTC+7) as YYYY-MM-DD. */
export function bangkokToday(now: Date = new Date()): string {
  return new Date(now.getTime() + 7 * 3600 * 1000).toISOString().slice(0, 10);
}

/** Whole days from today (Bangkok) to an ISO date. Negative once it has passed. */
export function daysUntil(isoDate: string, now: Date = new Date()): number {
  const today = Date.parse(bangkokToday(now) + "T00:00:00Z");
  return Math.round((Date.parse(isoDate + "T00:00:00Z") - today) / 86400000);
}

/** True when today (Bangkok) is between from and until, inclusive. */
export function inWindow(from: string, until: string, now: Date = new Date()): boolean {
  const t = bangkokToday(now);
  return t >= from && t <= until;
}

export interface FinderOption {
  id: string;
  label: string;
}

/** One row of filter chips. Items match when they carry the chosen option id. */
export interface FinderGroup {
  id: string;
  label: string;
  /** Text for the "no filter" chip. */
  anyLabel: string;
  options: FinderOption[];
}

/** An on/off chip. Items match when their flags include the id. */
export interface FinderToggle {
  id: string;
  label: string;
}

export type MeterIcon = "bauble" | "person" | "star";

export interface FinderMeter {
  icon: MeterIcon;
  /** What the meter measures, e.g. "Crowd level". */
  label: string;
  /** Names for levels 1, 2 and 3. */
  names: [string, string, string];
}

export interface FinderBadge {
  text: string;
  tone: "price" | "kids" | "free" | "santa" | "warn" | "plain";
}

export interface FinderItem {
  name: string;
  venue: string;
  /** Human-readable when line shown on the card. */
  when: string;
  /** Filter group id to the option ids this item belongs to. */
  facets: Record<string, string[]>;
  flags?: string[];
  /** 1 to 3, drawn with the finder's meter. */
  level?: 1 | 2 | 3;
  badges?: FinderBadge[];
  blurb: string;
  link?: string;
  contact?: string;
  /** ISO dates. Last year's dates until this year's are confirmed. */
  start: string;
  end: string;
  free?: boolean;
  /**
   * This year's dates and prices are confirmed. Unconfirmed items are what
   * ran last year; they show a "last year" note and are left out of Event
   * structured data, which must not advertise dates that have passed.
   */
  confirmed?: boolean;
  /** Runs all year, so no "last year" label. Never gets Event data. */
  evergreen?: boolean;
}

/**
 * Event structured data for the confirmed items in a list, or null when
 * none are confirmed yet.
 */
export function itemListJsonLd(name: string, all: FinderItem[], image?: string) {
  const items = all.filter((e) => e.confirmed);
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: e.name,
        description: e.blurb,
        startDate: e.start,
        endDate: e.end,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: e.venue.split(",")[0],
          address: { "@type": "PostalAddress", streetAddress: e.venue, addressLocality: "Bangkok", addressCountry: "TH" },
        },
        ...(image ? { image: [image] } : {}),
        organizer: { "@type": "Organization", name: e.venue.split(",")[0], ...(e.link?.startsWith("http") ? { url: e.link } : {}) },
        ...(e.link ? { url: e.link } : {}),
        ...(e.free ? { isAccessibleForFree: true } : {}),
      },
    })),
  };
}

export interface Poster {
  file: string;
  w: number;
  h: number;
  title: string;
  use: string;
  alt: string;
}
