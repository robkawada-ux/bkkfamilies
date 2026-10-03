// Paid banner placements on bkkfamilies.com.
//
// To book a slot: put the artwork in public/images/ads/, fill in the slot
// below with the sponsor's details and dates, commit and push. The homepage
// re-renders hourly, so a booking appears on its start date and comes down
// after its end date without another deploy.
//
// An empty slot (null, or outside its dates) never shows a blank box. The top
// banner shows an "advertise here" panel; the sidebar slots fall back to
// promoting our own sections (HOUSE_PROMOS).
//
// Every paid link renders with rel="sponsored" and a visible "Sponsored"
// label. That is both Google's rule for paid links and our promise to
// readers that ads are always labelled.

export type AdSlotId =
  | "home-top"
  | "home-sidebar-top"
  | "home-sidebar-middle"
  | "home-sidebar-bottom";

export interface AdCreative {
  sponsor: string;
  /** Where the banner links to. */
  href: string;
  /** Desktop artwork, under public/, e.g. "/images/ads/acme-home-top.jpg". */
  image: string;
  /** Optional narrower artwork for phones (top banner only). */
  mobileImage?: string;
  alt: string;
  /** ISO dates, inclusive. Omit for an open-ended booking. */
  start?: string;
  end?: string;
}

export interface SlotSpec {
  name: string;
  /** Artwork size to ask the advertiser for. */
  size: string;
  mobileSize?: string;
}

export const SLOT_SPECS: Record<AdSlotId, SlotSpec> = {
  "home-top": {
    name: "Homepage top banner (sole ownership)",
    size: "1200 x 200 px",
    mobileSize: "640 x 320 px",
  },
  "home-sidebar-top": { name: "Homepage sidebar, top", size: "600 x 500 px (shown at 300 x 250)" },
  "home-sidebar-middle": { name: "Homepage sidebar, middle", size: "600 x 500 px (shown at 300 x 250)" },
  "home-sidebar-bottom": { name: "Homepage sidebar, bottom", size: "600 x 500 px (shown at 300 x 250)" },
};

export const ADS: Record<AdSlotId, AdCreative | null> = {
  "home-top": null,
  "home-sidebar-top": null,
  "home-sidebar-middle": null,
  "home-sidebar-bottom": null,
};

/** Our own sections, shown in empty sidebar slots. Order matches the slots. */
export const HOUSE_PROMOS: Record<
  Exclude<AdSlotId, "home-top">,
  { eyebrow: string; title: string; text: string; href: string; color: "teal" | "green" | "orange" }
> = {
  "home-sidebar-top": {
    eyebrow: "School holidays",
    title: "Every school's 2026/27 break dates",
    text: "Term dates read off each school's own calendar, so you know which week your child is off.",
    href: "/school-breaks",
    color: "teal",
  },
  "home-sidebar-middle": {
    eyebrow: "Holiday camps",
    title: "Camps with real dates and prices",
    text: "Filter by the week your child is actually off school.",
    href: "/camps",
    color: "green",
  },
  "home-sidebar-bottom": {
    eyebrow: "Health insurance",
    title: "Family health insurance in Thailand",
    text: "Every option, real 2026 prices and honest reviews. No review is ever paid for.",
    href: "/healthcare/insurance",
    color: "orange",
  },
};

/** The booked creative for a slot, or null if the slot is empty today. */
export function activeAd(slot: AdSlotId, now: Date = new Date()): AdCreative | null {
  const ad = ADS[slot];
  if (!ad) return null;
  const today = now.toISOString().slice(0, 10);
  if (ad.start && today < ad.start) return null;
  if (ad.end && today > ad.end) return null;
  return ad;
}
