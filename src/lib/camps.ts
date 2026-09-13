// Camps directory. One Camp per provider, with nested sessions.
//
// A Camp is the organisation. A CampSession is one bookable run of a camp
// with its own dates, ages and price. The directory filters on SESSIONS,
// not providers, because a parent is shopping for a specific week.
//
// MAINTENANCE: sessions expire. Every session carries lastVerified and
// dateStatus. See the quarterly verification pass in the project notes.

import type { BreakWindowId } from "./schoolBreaks";

export type CampFormat = "day" | "half-day" | "residential";

export type CampCategory =
  | "academic"
  | "art-and-craft"
  | "cookery"
  | "language-learning"
  | "music-and-drama"
  | "nature-and-outdoors"
  | "sport-and-fitness"
  | "stem"
  | "multi-activity";

/**
 * confirmed      dates published by the provider for this run
 * tba            provider has announced the camp but not the dates
 * ran-previously ran in a past year, not yet re-announced. Shown greyed.
 */
export type DateStatus = "confirmed" | "tba" | "ran-previously";

export type PriceUnit = "per-day" | "per-week" | "per-session";

export interface CampSession {
  id: string;
  /** Which city-wide break window this falls in. See BREAK_WINDOWS. */
  window: BreakWindowId;
  /** Inclusive. Required when dateStatus is "confirmed". */
  startDate?: string;
  endDate?: string;
  dateStatus: DateStatus;
  /** Real numbers, not brackets, so the age filter can be a single input. */
  minAge: number;
  maxAge: number;
  format: CampFormat;
  /** Baht. Omit both when genuinely unpublished rather than guessing. */
  priceFrom?: number;
  priceTo?: number;
  priceUnit?: PriceUnit;
  /** True when the price is our researched estimate, not a published figure. */
  priceEstimated?: boolean;
  /** Minimum bookable block, e.g. "1 day", "full week". */
  minimumBooking?: string;
  lunchIncluded?: boolean;
  /** Residential only. */
  nights?: number;
  supervisionRatio?: string;
  transportFromBangkok?: boolean;
  /** Where this session runs, if not the provider's main location. */
  locationOverride?: string;
  bookingUrl?: string;
  note?: string;
  lastVerified: string;
}

export interface Camp {
  slug: string;
  name: string;
  provider?: string;
  categories: CampCategory[];
  /** Bangkok area, or the province for residential camps. */
  area: string;
  /** True for residential camps outside Bangkok. No upcountry DAY camps. */
  outsideBangkok?: boolean;
  description: string;
  /** Honesty box on the detail page, same pattern as learning support. */
  worthKnowing?: string;
  website?: string;
  email?: string;
  phone?: string;
  lineId?: string;
  facebook?: string;
  sessions: CampSession[];
  lastVerified: string;
}

export const CAMPS: Camp[] = [];

/** Flattened view for the directory filter. */
export interface SessionWithCamp extends CampSession {
  camp: Camp;
}

export const ALL_SESSIONS: SessionWithCamp[] = CAMPS.flatMap((camp) =>
  camp.sessions.map((session) => ({ ...session, camp }))
);

export const ALL_CATEGORIES: CampCategory[] = Array.from(
  new Set(CAMPS.flatMap((c) => c.categories))
).sort();

export const ALL_AREAS: string[] = Array.from(
  new Set(CAMPS.map((c) => c.area))
).sort();

/** Days since a session was last verified. Drives the staleness warning. */
export function daysSinceVerified(iso: string, now: Date = new Date()): number {
  const then = new Date(`${iso}T00:00:00Z`).getTime();
  return Math.floor((now.getTime() - then) / 86_400_000);
}

export const STALE_AFTER_DAYS = 90;

export function isStale(iso: string, now: Date = new Date()): boolean {
  return daysSinceVerified(iso, now) > STALE_AFTER_DAYS;
}
