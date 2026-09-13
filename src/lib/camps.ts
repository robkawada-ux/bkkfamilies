// Camps directory. One Camp per OPERATOR, with nested sessions.
//
// A Camp is the organisation that runs the camp. A CampSession is one
// bookable programme-week: a specific programme running on specific dates
// for a specific age range at a specific price.
//
// The directory filters on SESSIONS, not operators, because a parent is
// shopping for a specific week at a specific price for a specific child.
// This is why categories, ages and price all live on the session: one
// operator can run a Thai literacy week and a competitive swimming week
// that share nothing but a car park.
//
// MAINTENANCE: sessions expire. Every session carries lastVerified and
// dateStatus. See the quarterly verification pass in the project notes.

import type { BreakWindowId } from "./schoolBreaks";

export type CampFormat = "day" | "half-day" | "residential";

export type CampCategory =
  | "academic"
  | "art-and-design"
  | "cookery"
  | "language-learning"
  | "music-and-drama"
  | "nature-and-outdoors"
  | "sport-and-fitness"
  | "stem"
  | "swimming"
  | "multi-activity";

/**
 * confirmed      dates published by the operator for this run
 * tba            operator has announced the camp but not the dates
 * ran-previously ran in a past year, not yet re-announced. Shown greyed,
 *                with previousRun giving the dates it last ran.
 */
export type DateStatus = "confirmed" | "tba" | "ran-previously";

export type PriceUnit = "per-day" | "per-week" | "per-session";

export interface CampSession {
  id: string;
  /** Programme name, e.g. "English (EAL) Camp". Operators run many. */
  programme: string;
  /** Which city-wide break window this falls in. See BREAK_WINDOWS. */
  window: BreakWindowId;
  /** Inclusive. Required when dateStatus is "confirmed". */
  startDate?: string;
  endDate?: string;
  dateStatus: DateStatus;
  /** Human-readable dates of the last confirmed run, for ran-previously. */
  previousRun?: string;
  /** On the session, not the operator. A provider spans categories. */
  categories: CampCategory[];
  /** Real numbers, not brackets, so the age filter can be a single input. */
  minAge: number;
  maxAge: number;
  format: CampFormat;
  /** Baht. Omit all three when genuinely unpublished rather than guessing. */
  priceFrom?: number;
  priceTo?: number;
  priceUnit?: PriceUnit;
  /** True when the price is our researched estimate, not a published figure. */
  priceEstimated?: boolean;
  /** Where this session runs. Omit when it is the operator's main venue. */
  venue?: string;
  /** Daily start and end, e.g. "9am to 3pm". */
  hours?: string;
  minimumBooking?: string;
  lunchIncluded?: boolean;
  /** Residential only. */
  nights?: number;
  supervisionRatio?: string;
  transportFromBangkok?: boolean;
  bookingUrl?: string;
  note?: string;
  lastVerified: string;
}

export interface Camp {
  slug: string;
  name: string;
  /** Bangkok area, or the province for residential camps. */
  area: string;
  /** True for residential camps outside Bangkok. No upcountry DAY camps. */
  outsideBangkok?: boolean;
  description: string;
  /** Honesty box on the detail page, same pattern as learning support. */
  worthKnowing?: string;
  /**
   * Slugs of operators whose camps run at THIS operator's venue.
   * Lets a parent browsing a school also see the independents on campus.
   */
  hosts?: string[];
  /** Slugs of venues this operator runs at, when it is a guest. */
  hostedAt?: string[];
  website?: string;
  email?: string;
  phone?: string;
  lineId?: string;
  facebook?: string;
  sessions: CampSession[];
  lastVerified: string;
}

export const CAMPS: Camp[] = [
  {
    slug: "bangkok-prep-holiday-camps",
    name: "Bangkok Prep Holiday Camps",
    area: "Watthana",
    description:
      "Bangkok Prep runs one of the largest and best documented holiday camp programmes in the city, spanning seven weeks of the summer break with a different mix of programmes each week. Camps are open to children from any school, not just Bangkok Prep families. Everything runs 9am to 3pm at the Secondary Campus on Sukhumvit 77, and lunch and snacks are included in every fee. The range is unusually wide, from Thai literacy and EAL English through to Minecraft coding, robotics, design, multi-sports and an elite swimming programme.",
    worthKnowing:
      "Three of the camps advertised on Bangkok Prep's page are run by separate operators using the campus: Ivy Camps USA, Grow Learning Gardens and AP Race. They have their own pricing, their own booking systems and in Ivy's case a separate early bird deadline, so the school's own discount does not apply to them. They are listed separately in this directory.",
    hosts: ["ivy-camps-usa", "grow-learning-gardens", "ap-race"],
    website: "https://www.bangkokprep.ac.th/news-events/holiday-camps",
    email: "supattrao@bkkprep.ac.th",
    phone: "094 958 8996",
    lastVerified: "2026-09-12",
    sessions: [
      // English (EAL) Camp
      {
        id: "bkkprep-eal-w1",
        programme: "English (EAL) Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "29 June to 3 July 2026",
        categories: ["language-learning", "academic"],
        minAge: 4,
        maxAge: 11,
        format: "day",
        priceFrom: 13000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        lastVerified: "2026-09-12",
      },
      {
        id: "bkkprep-eal-w6",
        programme: "English (EAL) Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "3 to 7 August 2026",
        categories: ["language-learning", "academic"],
        minAge: 5,
        maxAge: 14,
        format: "day",
        priceFrom: 13000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        lastVerified: "2026-09-12",
      },
      {
        id: "bkkprep-eal-w7",
        programme: "English (EAL) Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "10 to 14 August 2026",
        categories: ["language-learning", "academic"],
        minAge: 5,
        maxAge: 14,
        format: "day",
        priceFrom: 13000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        lastVerified: "2026-09-12",
      },
      // Thai Literacy Camp
      {
        id: "bkkprep-thai-w1",
        programme: "Thai Literacy Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "29 June to 3 July 2026",
        categories: ["language-learning"],
        minAge: 7,
        maxAge: 11,
        format: "day",
        priceFrom: 9000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        note: "Thai Club for Beginners, aimed at non-Thai students.",
        lastVerified: "2026-09-12",
      },
      {
        id: "bkkprep-thai-w2",
        programme: "Thai Literacy Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "6 to 10 July 2026",
        categories: ["language-learning", "art-and-design"],
        minAge: 6,
        maxAge: 11,
        format: "day",
        priceFrom: 9000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        note: "Thai Fun and Craft Camp, language combined with arts and crafts.",
        lastVerified: "2026-09-12",
      },
      {
        id: "bkkprep-thai-w7",
        programme: "Thai Literacy Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "10 to 14 August 2026",
        categories: ["language-learning"],
        minAge: 12,
        maxAge: 14,
        format: "day",
        priceFrom: 9000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        note: "Thai Language and Pop Culture, for the older age group.",
        lastVerified: "2026-09-12",
      },
      // Minecraft Innovators
      {
        id: "bkkprep-minecraft-w1",
        programme: "Minecraft Innovators Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "29 June to 3 July 2026",
        categories: ["stem"],
        minAge: 5,
        maxAge: 11,
        format: "day",
        priceFrom: 11000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        note: "No prior coding experience required.",
        lastVerified: "2026-09-12",
      },
      {
        id: "bkkprep-minecraft-w2",
        programme: "Minecraft Innovators Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "6 to 10 July 2026",
        categories: ["stem"],
        minAge: 5,
        maxAge: 11,
        format: "day",
        priceFrom: 11000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        lastVerified: "2026-09-12",
      },
      // Maths & Drama
      {
        id: "bkkprep-maths-drama-w1",
        programme: "Maths and Drama Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "29 June to 3 July 2026",
        categories: ["academic", "music-and-drama"],
        minAge: 8,
        maxAge: 12,
        format: "day",
        priceFrom: 11000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        lastVerified: "2026-09-12",
      },
      {
        id: "bkkprep-maths-drama-w3",
        programme: "Maths and Drama Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "13 to 17 July 2026",
        categories: ["academic", "music-and-drama"],
        minAge: 8,
        maxAge: 12,
        format: "day",
        priceFrom: 11000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        lastVerified: "2026-09-12",
      },
      // Multi-Sports
      {
        id: "bkkprep-sports-w1",
        programme: "Multi-Sports Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "29 June to 3 July 2026",
        categories: ["sport-and-fitness", "swimming"],
        minAge: 5,
        maxAge: 13,
        format: "day",
        priceFrom: 11000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        note: "Football, basketball, tennis, swimming, gymnastics and triathlon.",
        lastVerified: "2026-09-12",
      },
      {
        id: "bkkprep-sports-w2",
        programme: "Multi-Sports Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "6 to 10 July 2026",
        categories: ["sport-and-fitness", "swimming"],
        minAge: 5,
        maxAge: 13,
        format: "day",
        priceFrom: 11000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        lastVerified: "2026-09-12",
      },
      {
        id: "bkkprep-sports-w3",
        programme: "Multi-Sports Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "13 to 17 July 2026",
        categories: ["sport-and-fitness", "swimming"],
        minAge: 5,
        maxAge: 13,
        format: "day",
        priceFrom: 11000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        lastVerified: "2026-09-12",
      },
      {
        id: "bkkprep-sports-w6",
        programme: "Multi-Sports Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "3 to 7 August 2026",
        categories: ["sport-and-fitness", "swimming"],
        minAge: 5,
        maxAge: 13,
        format: "day",
        priceFrom: 11000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        lastVerified: "2026-09-12",
      },
      // Young Designers
      {
        id: "bkkprep-designers-w6",
        programme: "Young Designers Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "3 to 7 August 2026",
        categories: ["art-and-design"],
        minAge: 5,
        maxAge: 13,
        format: "day",
        priceFrom: 12000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        note: "Mini Maker and Young Artist week. Run by Creative Giants.",
        lastVerified: "2026-09-12",
      },
      {
        id: "bkkprep-designers-w7",
        programme: "Young Designers Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "10 to 14 August 2026",
        categories: ["art-and-design"],
        minAge: 5,
        maxAge: 13,
        format: "day",
        priceFrom: 12000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        note: "Young Architects and Dream Spaces week. Run by Creative Giants.",
        lastVerified: "2026-09-12",
      },
      // Minecraft & Robotics
      {
        id: "bkkprep-robotics-w6",
        programme: "Minecraft and Robotics Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "3 to 7 August 2026",
        categories: ["stem"],
        minAge: 5,
        maxAge: 12,
        format: "day",
        priceFrom: 12000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        lastVerified: "2026-09-12",
      },
      {
        id: "bkkprep-robotics-w7",
        programme: "Minecraft and Robotics Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "10 to 14 August 2026",
        categories: ["stem"],
        minAge: 5,
        maxAge: 12,
        format: "day",
        priceFrom: 12000,
        priceUnit: "per-week",
        hours: "9am to 3pm",
        lunchIncluded: true,
        lastVerified: "2026-09-12",
      },
    ],
  },
];

/** Flattened view for the directory filter. */
export interface SessionWithCamp extends CampSession {
  camp: Camp;
}

export const ALL_SESSIONS: SessionWithCamp[] = CAMPS.flatMap((camp) =>
  camp.sessions.map((session) => ({ ...session, camp }))
);

export const ALL_CATEGORIES: CampCategory[] = Array.from(
  new Set(ALL_SESSIONS.flatMap((s) => s.categories))
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

export function campBySlug(slug: string): Camp | undefined {
  return CAMPS.find((c) => c.slug === slug);
}
