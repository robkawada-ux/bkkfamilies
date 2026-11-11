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

import { BREAK_WINDOWS, type BreakWindowId } from "./schoolBreaks";
import { bangkokToday } from "./festive";
import type { BranchContact } from "./branches";

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
  /**
   * Real numbers, not brackets, so the age filter can be a single input.
   * Omit BOTH when the operator genuinely does not publish an age range,
   * the same rule as price. A session with no ages renders as "Age range
   * not published" and is never hidden by the age filter, because hiding
   * it would punish the parent for the operator's omission.
   */
  minAge?: number;
  maxAge?: number;
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
  /** Where camps physically run, when it is worth naming. Shown in the hero. */
  mainVenue?: string;
  /**
   * Operator-supplied image, path under /public. Only with explicit
   * permission. Some operators permit use but forbid alteration, so this
   * renders whole and unclipped rather than cropped to a hero band.
   */
  photo?: string;
  /** Alt text. Required whenever photo is set. */
  photoAlt?: string;
  /** Who to credit, rendered under the image. */
  photoCredit?: string;
  /** Context line under the image, e.g. what it is and when it was published. */
  photoCaption?: string;
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
  /** Per-branch phone and LINE, for operators whose branches each take bookings. */
  branchContacts?: BranchContact[];
  /**
   * Seasonal skin for the detail page. "halloween" swaps the purple hero for
   * a night-sky gradient and adds pumpkins, bats and cobwebs. Purely visual.
   */
  theme?: "halloween";
  /** One-line hook shown in the hero, under the venue. */
  tagline?: string;
  /** Short activity bullets, emoji first, shown as cards under the description. */
  highlights?: string[];
  sessions: CampSession[];
  lastVerified: string;
}

// Bricks 4 Kidz sends one price list for all four branches and all three
// December weeks, so its 12 sessions (4 programmes x 3 weeks) are generated
// here rather than written out by hand.
const B4K_PROGRAMMES = [
  { key: "junior-inventor", name: "Junior Inventor Camp", minAge: 1, maxAge: 4, price: 6750, cats: ["stem", "art-and-design"] },
  { key: "advance-inventor", name: "Advance Inventor Camp", minAge: 5, maxAge: 7, price: 6750, cats: ["stem"] },
  { key: "junior-robotics", name: "Junior Robotics Camp", minAge: 7, maxAge: 9, price: 7750, cats: ["stem"] },
  { key: "advance-robotics", name: "Advance Robotics Camp", minAge: 9, maxAge: 12, price: 8750, cats: ["stem"] },
] as const;
const B4K_WEEKS = [
  { start: "2026-12-07", end: "2026-12-11" },
  { start: "2026-12-14", end: "2026-12-18" },
  { start: "2026-12-21", end: "2026-12-25" },
];
const B4K_SESSIONS: CampSession[] = B4K_WEEKS.flatMap((w) =>
  B4K_PROGRAMMES.map((p) => ({
    id: `b4k-${p.key}-${w.start}`,
    programme: p.name,
    window: "winter-2026" as const,
    startDate: w.start,
    endDate: w.end,
    dateStatus: "confirmed" as const,
    categories: [...p.cats] as CampCategory[],
    minAge: p.minAge,
    maxAge: p.maxAge,
    format: "day" as const,
    priceFrom: p.price,
    priceTo: p.price + 1000,
    priceUnit: "per-week" as const,
    hours: "9.30am to 12.30pm, or 9.30am to 3pm with lunch",
    minimumBooking: "1 week",
    note: `${p.price.toLocaleString("en-US")} baht for the half day to 12.30pm, ${(p.price + 1000).toLocaleString("en-US")} baht to stay until 3pm with lunch. Runs at all four branches.`,
    lastVerified: "2026-10-26",
  }))
);

export const CAMPS: Camp[] = [
  {
    slug: "bangkok-prep-holiday-camps",
    name: "Bangkok Prep Holiday Camps",
    area: "Watthana",
    mainVenue: "Bangkok Prep Secondary Campus, 77 Soi Sukhumvit 77, Phra Khanong Nuea",
    description:
      "Bangkok Prep runs one of the largest and best documented holiday camp programmes in the city, spanning seven weeks of the summer break with a different mix of programmes each week. Camps are open to children from any school, not just Bangkok Prep families. Summer camps run 9am to 3pm at the Secondary Campus on Sukhumvit 77, and lunch and snacks are included in every fee. There is also a winter week, 4 to 8 January 2027, from 9am to 2pm with snack and lunch, open to children at any school from Reception to Year 13. The range is unusually wide, from Thai literacy and EAL English through to Minecraft coding, robotics, design, multi-sports and an elite swimming programme.",
    worthKnowing:
      "Three of the camps advertised on Bangkok Prep's page are run by separate operators using the campus: Ivy Camps USA, Grow Learning Gardens and AP Race. They have their own pricing, their own booking systems and in Ivy's case a separate early bird deadline, so the school's own discount does not apply to them. They are listed separately in this directory.",
    hosts: ["ivy-camps-usa", "grow-learning-gardens", "ap-race"],
    website: "https://www.bangkokprep.ac.th/news-events/holiday-camps",
    email: "supattrao@bkkprep.ac.th",
    phone: "094 958 8996",
    lastVerified: "2026-11-10",
    sessions: [
      // Winter camps, 4 to 8 January 2027 (Bangkok Prep winter camps poster, roundup of 6 Nov 2026)
      {
        id: "bkkprep-winter-sports",
        programme: "Sports Camp",
        window: "winter-2026",
        startDate: "2027-01-04",
        endDate: "2027-01-08",
        dateStatus: "confirmed",
        categories: ["sport-and-fitness", "swimming"],
        minAge: 5,
        maxAge: 17,
        format: "day",
        priceFrom: 2000,
        priceUnit: "per-day",
        hours: "9am to 2pm",
        lunchIncluded: true,
        note: "Choose a sport each day: basketball, football, swimming, gymnastics or tennis. Led by Bangkok Prep coaches. Booked by the day, with no early bird discount.",
        lastVerified: "2026-11-10",
      },
      {
        id: "bkkprep-winter-puppy-play",
        programme: "Puppy Play Camp: Winter Wonders",
        window: "winter-2026",
        startDate: "2027-01-04",
        endDate: "2027-01-08",
        dateStatus: "confirmed",
        categories: ["multi-activity"],
        minAge: 4,
        maxAge: 6,
        format: "day",
        priceFrom: 11000,
        priceUnit: "per-week",
        hours: "9am to 2pm",
        lunchIncluded: true,
        note: "Learning through play for Reception to Year 2, led by a Bangkok Prep teacher. Early bird: 1,000 baht off the week if booked by 15 December.",
        lastVerified: "2026-11-10",
      },
      {
        id: "bkkprep-winter-young-designer",
        programme: "Young Designer: Mini Makers",
        window: "winter-2026",
        startDate: "2027-01-04",
        endDate: "2027-01-08",
        dateStatus: "confirmed",
        categories: ["art-and-design"],
        minAge: 5,
        maxAge: 13,
        format: "day",
        priceFrom: 11000,
        priceUnit: "per-week",
        hours: "9am to 2pm",
        lunchIncluded: true,
        note: "Arts, crafts and design run by the Creative Giants team: squishy making, festive lamps, watercolour painting, mini vase magnets and paper craft notebooks. Early bird: 1,000 baht off the week if booked by 15 December.",
        lastVerified: "2026-11-10",
      },
      {
        id: "bkkprep-winter-minecraft-robotics",
        programme: "Minecraft and Robotics",
        window: "winter-2026",
        startDate: "2027-01-04",
        endDate: "2027-01-08",
        dateStatus: "confirmed",
        categories: ["stem"],
        minAge: 5,
        maxAge: 11,
        format: "day",
        priceFrom: 11000,
        priceUnit: "per-week",
        hours: "9am to 2pm",
        lunchIncluded: true,
        note: "Code in Minecraft and build with robotics, run by the Me-iZone team. Early bird: 1,000 baht off the week if booked by 15 December.",
        lastVerified: "2026-11-10",
      },
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
  {
    slug: "little-pea-term-break-camps",
    name: "Little Pea Term-Break Camps",
    area: "Watthana",
    mainVenue: "Little Pea Kids Commons, theCOMMONS Thonglor",
    photo: "/images/camps/little-pea-winter-2026.jpg",
    photoAlt: "Little Pea's Winter Camp poster: Week 1, Christmas Eve Dance Camp with Ms. Lynn, 21 to 24 December, 10,000 baht for 4 days; Week 2, Winter STEAM Camp with Teacher Connie, 28 to 30 December, 7,500 baht for 3 days; Week 3, New Year Art Studio with Pop Up Art Studio, 4 to 8 January, 12,000 baht a week. Ages 4 to 8, 9am to 2pm, lunch and snack included. Book via LINE @littlepeabkk.",
    photoCredit: "Little Pea Kids Commons, used with permission",
    photoCaption: "Little Pea's Winter Camp 2026 poster. Book on LINE at @littlepeabkk.",
    description:
      "Little Pea Kids Commons runs day camps during the international school holidays throughout the year, at its space in theCOMMONS on Thong Lo Soi 17. Winter Camp 2026 is three separate weeks, each with its own theme: Christmas Eve Dance Camp with Ms. Lynn from 21 to 24 December, which ends with a Christmas Eve showcase; Winter STEAM Camp with Teacher Connie from 28 to 30 December, with winter science experiments and building challenges; and New Year Art Studio with Pop Up Art Studio Bangkok from 4 to 8 January, trying new techniques and materials with a keepsake to take home each day. All three run from 9am to 2pm.",
    worthKnowing:
      "Each week is booked on its own. The dance camp is full week only (10,000 baht for the four days), while the STEAM camp and the art studio can also be booked by the day at 2,800 baht. Lunch and a snack are included. Book through LINE (@littlepeabkk) or Little Pea's camp registration form. All three winter weeks are for ages 4 to 8.",
    tagline: "Winter Camp 2026: three themed weeks of dance, STEAM and art",
    highlights: [
      "🩰 21 to 24 Dec: Christmas Eve Dance Camp with Ms. Lynn, ending in a showcase",
      "🧪 28 to 30 Dec: Winter STEAM Camp, winter experiments and building challenges",
      "🎨 4 to 8 Jan: New Year Art Studio with Pop Up Art Studio Bangkok",
      "🍱 9am to 2pm, lunch and snack included",
      "📅 STEAM and art weeks can be booked by the day",
    ],
    website: "https://www.littlepeabkk.com/",
    email: "hello@littlepeabkk.com",
    phone: "065 392 5658",
    lineId: "@littlepeabkk",
    facebook: "https://www.facebook.com/littlepeabkk",
    lastVerified: "2026-11-07",
    sessions: [
      {
        id: "little-pea-winter-2026-dance",
        programme: "Christmas Eve Dance Camp",
        window: "winter-2026",
        startDate: "2026-12-21",
        endDate: "2026-12-24",
        dateStatus: "confirmed",
        categories: ["music-and-drama"],
        minAge: 4,
        maxAge: 8,
        format: "day",
        priceFrom: 10000,
        priceUnit: "per-week",
        hours: "9am to 2pm",
        minimumBooking: "Full week (Mon to Thu)",
        lunchIncluded: true,
        bookingUrl: "https://forms.gle/kAwdACdB8zidJB7F7",
        note: "Led by Ms. Lynn, ending with a Christmas Eve showcase. Lunch and snack included. Also bookable on LINE @littlepeabkk.",
        lastVerified: "2026-11-06",
      },
      {
        id: "little-pea-winter-2026-steam",
        programme: "Winter STEAM Camp",
        window: "winter-2026",
        startDate: "2026-12-28",
        endDate: "2026-12-30",
        dateStatus: "confirmed",
        categories: ["stem", "art-and-design"],
        minAge: 4,
        maxAge: 8,
        format: "day",
        priceFrom: 7500,
        priceUnit: "per-week",
        hours: "9am to 2pm",
        lunchIncluded: true,
        bookingUrl: "https://forms.gle/kAwdACdB8zidJB7F7",
        note: "Three days, led by Teacher Connie. Or ฿2,800 a day. Lunch and snack included. Also bookable on LINE @littlepeabkk.",
        lastVerified: "2026-11-06",
      },
      {
        id: "little-pea-winter-2026-art",
        programme: "New Year Art Studio",
        window: "winter-2026",
        startDate: "2027-01-04",
        endDate: "2027-01-08",
        dateStatus: "confirmed",
        categories: ["art-and-design"],
        minAge: 4,
        maxAge: 8,
        format: "day",
        priceFrom: 12000,
        priceUnit: "per-week",
        hours: "9am to 2pm",
        lunchIncluded: true,
        bookingUrl: "https://forms.gle/kAwdACdB8zidJB7F7",
        note: "With Pop Up Art Studio Bangkok. Or ฿2,800 a day. Lunch and snack included. Also bookable on LINE @littlepeabkk.",
        lastVerified: "2026-11-06",
      },
    ],
  },
  {
    slug: "regents-english-camps",
    name: "Regent's English Camps",
    area: "Huai Khwang",
    mainVenue: "Regent's Boarding Campus, 592 Pracha Uthit Road, Huai Khwang",
    description:
      "Regent's runs English language camps out of its Boarding Campus on Pracha Uthit Road, aimed at children aged 3 to 12 and open to non-Regent's students. Classes are taught by native English-speaking teachers with a teaching assistant alongside, and mornings cover listening, speaking, reading, writing, grammar and role play, plus English-medium science, maths and thinking skills. Afternoons are activity led, with swimming, cooking, arts and crafts and a water slide. Children are grouped 3 to 5, 6 to 8 and 9 to 12.",
    worthKnowing:
      "Regent's is at the expensive end. The stated regular price of 28,350 baht a week is roughly two and a half times Bangkok Prep and nearly three times Carroll Prep, and it is consistently advertised with a large discount attached: the promotion moved from 50 percent to 40 percent within a single day in September 2026. Treat the regular price as a list price rather than what anyone pays. Separately, the Winter Camp runs through term time and its refund policy covers visa denial, which tells you it is aimed at students travelling into Bangkok rather than at local families.",
    website: "https://regents.ac.th/extra-programme/course-camps/",
    email: "aew.pichaisriswad@regents.ac.th",
    phone: "081 522 9191",
    lineId: "@regentscamps",
    lastVerified: "2026-09-12",
    sessions: [
      {
        id: "regents-winter-2027",
        programme: "Regent's English Winter Camp",
        window: "spring-2027",
        startDate: "2027-01-11",
        endDate: "2027-02-19",
        dateStatus: "confirmed",
        categories: ["language-learning", "academic", "swimming"],
        minAge: 3,
        maxAge: 12,
        format: "day",
        venue: "Regent's Boarding Campus, 592 Pracha Uthit Road, Huai Khwang",
        minimumBooking: "1 week",
        bookingUrl: "https://forms.cloud.microsoft/r/3upr52KQHW",
        note:
          "Runs through term time and is aimed at students travelling into Bangkok. For a local family the only usable week is 15 to 19 February, which matches the St Andrews half term. Maximum class size 25. Prices not published; 20 percent off for payment by 30 September 2026 and a further 10 percent for groups of three or more.",
        lastVerified: "2026-09-12",
      },
    ],
  },
  {
    slug: "ivy-camps-usa",
    name: "Ivy Camps USA",
    area: "Watthana",
    description:
      "Ivy Camps is an American operator that runs week-long project-based camps inside host schools in Bangkok, taught by instructors recruited from leading US universities. Topics rotate through business and entrepreneurship, science and innovation, engineering and design, public speaking and leadership. It ran at both Bangkok Prep and Ruamrudee in summer 2026.",
    worthKnowing:
      "Ivy Camps uses its own registration platform rather than the host school's, and its early bird deadline is earlier than the host's. At Bangkok Prep in 2026 it was explicitly excluded from the school's own early bird discount, so check which scheme applies before assuming a price. It is also the most expensive non-specialist option we have found at a host school.",
    hostedAt: ["bangkok-prep-holiday-camps"],
    website: "https://www.ivycampsusa.com/thailand-summer-camps",
    lastVerified: "2026-09-12",
    sessions: [
      {
        id: "ivy-bkkprep-summer",
        programme: "Ivy Camps at Bangkok Prep",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "6 to 31 July 2026, weekly",
        categories: ["academic", "stem"],
        minAge: 6,
        maxAge: 14,
        format: "day",
        priceFrom: 13950,
        priceTo: 15050,
        priceUnit: "per-week",
        hours: "9:00am to 3:00pm",
        venue: "Bangkok Prep Secondary Campus, Sukhumvit 77",
        lunchIncluded: true,
        note: "13,950 early bird, 15,050 standard. Separate early bird deadline of 1 May.",
        lastVerified: "2026-09-12",
      },
      {
        id: "ivy-ris-summer-a",
        programme: "Ivy Camps at Ruamrudee",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "6 to 24 July 2026, weekly",
        categories: ["academic", "stem"],
        minAge: 6,
        maxAge: 17,
        format: "day",
        hours: "9:00am to 3:00pm",
        venue: "Ruamrudee International School",
        note: "The widest age range Ivy ran in Bangkok, up to 17. Prices not published for this venue.",
        lastVerified: "2026-09-12",
      },
      {
        id: "ivy-ris-summer-b",
        programme: "Ivy Camps at Ruamrudee",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "27 July to 7 August 2026, weekly",
        categories: ["academic", "stem"],
        minAge: 6,
        maxAge: 14,
        format: "day",
        hours: "9:00am to 3:00pm",
        venue: "Ruamrudee International School",
        note: "Sold out in 2026, which is worth knowing if you are planning for 2027.",
        lastVerified: "2026-09-12",
      },
    ],
  },
  {
    slug: "grow-learning-gardens",
    name: "Grow Learning Gardens",
    area: "Bang Kachao",
    mainVenue: "Bangkok Prep Forest School, Bang Kachao",
    description:
      "Grow runs a Forest School nature camp at Bang Kachao, the green loop in the river south of the city. It is deliberately screen-free and built around outdoor exploration, play and discovery rather than a timetable of lessons, led by outdoor educators. Fees include snacks, lunch and camp photography.",
    worthKnowing:
      "Bang Kachao is a genuine trip from most of Bangkok even though it is technically close, since you cross the river to get there. Check travel time from your side of the city before booking a week of it. The camp runs 9am to 4pm, an hour later than most school-based camps.",
    hostedAt: ["bangkok-prep-holiday-camps"],
    email: "growbangkok@gmail.com",
    lastVerified: "2026-11-10",
    sessions: [
      {
        id: "grow-winter-dec-2026",
        programme: "Grow Nature Camp",
        window: "winter-2026",
        startDate: "2026-12-21",
        endDate: "2026-12-25",
        dateStatus: "confirmed",
        categories: ["nature-and-outdoors"],
        format: "day",
        hours: "9am to 4pm",
        venue: "Bangkok Prep Forest School, Bang Kachao",
        note: "Five-day camp with pick up and drop off at Wat Khlong Toei Nok. The winter poster gives no ages or price; the summer 2026 camps were for ages 5 to 12 at 12,750 to 15,000 baht a week. Register through Grow (growbangkok@gmail.com).",
        lastVerified: "2026-11-10",
      },
      {
        id: "grow-winter-jan-2027",
        programme: "Grow Nature Camp",
        window: "winter-2026",
        startDate: "2027-01-04",
        endDate: "2027-01-08",
        dateStatus: "confirmed",
        categories: ["nature-and-outdoors"],
        format: "day",
        hours: "9am to 4pm",
        venue: "Bangkok Prep Forest School, Bang Kachao",
        note: "Five-day camp with pick up and drop off at Wat Khlong Toei Nok. The winter poster gives no ages or price; the summer 2026 camps were for ages 5 to 12 at 12,750 to 15,000 baht a week. Register through Grow (growbangkok@gmail.com).",
        lastVerified: "2026-11-10",
      },
      {
        id: "grow-summer",
        programme: "Grow Nature Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "29 June to 21 August 2026, five-day camps",
        categories: ["nature-and-outdoors"],
        minAge: 5,
        maxAge: 12,
        format: "day",
        priceFrom: 12750,
        priceTo: 15000,
        priceUnit: "per-week",
        hours: "9:00am to 4:00pm",
        lunchIncluded: true,
        venue: "Bangkok Prep Forest School, Bang Kachao",
        lastVerified: "2026-09-12",
      },
    ],
  },
  {
    slug: "ap-race",
    name: "AP Race Swimming Camp",
    area: "Watthana",
    mainVenue: "Bangkok Prep Secondary Campus, Sukhumvit 77",
    description:
      "An intensive swimming camp developed by triple Olympic champion Adam Peaty and the AP Race coaching team, run at Bangkok Prep. Ten pool sessions across the week plus daily pre-pool preparation, strength and conditioning, injury prevention and physiotherapy guidance, and workshops on race strategy, performance psychology and athlete lifestyle.",
    worthKnowing:
      "This is for competitive swimmers, not children learning to swim. The camp lists no age range at all, only the standard, which tells you how it selects. At 25,000 baht a week it is by some distance the most expensive camp we have found in Bangkok, and roughly double a typical school multi-sports week. Despite the elite framing it is non-residential; lunch and snacks are included.",
    hostedAt: ["bangkok-prep-holiday-camps"],
    lastVerified: "2026-09-12",
    sessions: [
      {
        id: "aprace-w1",
        programme: "AP Race Swimming Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "3 to 7 August 2026",
        categories: ["swimming", "sport-and-fitness"],
        minAge: 8,
        maxAge: 18,
        format: "day",
        priceFrom: 25000,
        priceUnit: "per-week",
        lunchIncluded: true,
        venue: "Bangkok Prep Secondary Campus, Sukhumvit 77",
        note: "For competitive swimmers. No published age limits, so the ages shown are our estimate of who it suits; confirm with the organiser. 45,000 for both weeks together.",
        lastVerified: "2026-09-12",
      },
      {
        id: "aprace-w2",
        programme: "AP Race Swimming Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "10 to 14 August 2026",
        categories: ["swimming", "sport-and-fitness"],
        minAge: 8,
        maxAge: 18,
        format: "day",
        priceFrom: 25000,
        priceUnit: "per-week",
        lunchIncluded: true,
        venue: "Bangkok Prep Secondary Campus, Sukhumvit 77",
        note: "For competitive swimmers. Ages shown are our estimate; confirm with the organiser.",
        lastVerified: "2026-09-12",
      },
    ],
  },
  {
    slug: "british-club-bangkok",
    name: "British Club Bangkok",
    area: "Silom",
    description:
      "The British Club runs supervised sports camps during school holidays, split into Mini Sports for four to seven year olds and Sports Camp for seven to thirteens. Most activities happen at the club itself, including tennis, squash, football, basketball, swimming and cooking, with occasional outings such as ice skating or bowling at Central World or Paragon. Up to 55 children attend, with members and staff helping out.",
    worthKnowing:
      "The camps are run for club members, so check membership requirements before planning around them. The central Silom location suits families who work downtown and is one of the few options that is not out on Sukhumvit or beyond.",
    lastVerified: "2026-09-12",
    sessions: [
      {
        id: "britishclub-mini",
        programme: "Mini Sports Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "school holidays, runs most breaks",
        categories: ["sport-and-fitness", "swimming"],
        minAge: 4,
        maxAge: 7,
        format: "day",
        note: "Dates and prices not published publicly. Likely members only.",
        lastVerified: "2026-09-12",
      },
      {
        id: "britishclub-sports",
        programme: "Sports Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "school holidays, runs most breaks",
        categories: ["sport-and-fitness", "swimming", "cookery"],
        minAge: 7,
        maxAge: 13,
        format: "day",
        note: "Tennis, squash, football, basketball, swimming and cooking, plus occasional outings. Dates and prices not published publicly.",
        lastVerified: "2026-09-12",
      },
    ],
  },
  {
    slug: "icamp-thailand",
    name: "iCamp Thailand",
    area: "Kanchanaburi",
    mainVenue: "9/9 Moo 6, Tambon Klondo, Dan Makhamtia District, Kanchanaburi",
    outsideBangkok: true,
    description:
      "iCamp is a residential English camp in Kanchanaburi, about 160km from Bangkok in the River Kwai valley, and has been running for ten years. Mornings are English missions and projects pitched at Cambridge levels A1 to B2; afternoons are swimming, water games, sports, adventure and team challenges, with evening programmes after dinner. Accommodation is eight boys and eight girls cabins built from bamboo, twelve campers and two staff in each, all air conditioned, arranged in a circle around the canteen. Staff ratio is around one to ten depending on age. The kitchen caters Western, Asian, halal and vegetarian, with vegan, gluten free and dairy free options at every meal.",
    worthKnowing:
      "iCamp runs a strict no-screen policy: phones are collected at check-in and returned on departure day, and parents cannot phone their child directly, though the office will pass on messages and posts daily photos to Facebook. Visits need two days notice. For a lot of families that is the appeal, but it is worth knowing before you book if your child has never been away from home. Bookings are by the week with the option to extend once they are there. The camp is a two to three hour drive from Bangkok, so this is a genuine residential trip rather than a day camp. There is full-time nursing cover during camp, and Synphaet and Dan Makham Tia hospitals in Kanchanaburi are their emergency partners. iCamp does not publish prices on its public pages, so you have to email for a figure.",
    website: "https://icampthailand.com/",
    email: "info@icampthailand.com",
    phone: "02 399 5400 ext 503",
    lineId: "@icampthailand",
    facebook: "https://www.facebook.com/icampth/",
    lastVerified: "2026-09-12",
    sessions: [
      {
        id: "icamp-summer-2027",
        programme: "iCamp Summer Camp",
        window: "summer-2027",
        dateStatus: "ran-previously",
        previousRun: "summer 2026, their tenth anniversary season",
        categories: ["language-learning", "nature-and-outdoors", "sport-and-fitness", "swimming"],
        minAge: 7,
        maxAge: 16,
        format: "residential",
        supervisionRatio: "roughly 1 to 10, varies by age",
        minimumBooking: "1 week, extendable once on site",
        lunchIncluded: true,
        venue: "iCamp Thailand, Kanchanaburi",
        note: "Places are capped per week to hold staff ratios. A buy-one-bring-a-friend-free anniversary offer ran in 2026.",
        lastVerified: "2026-09-12",
      },
      {
        id: "icamp-songkran-2027",
        programme: "iCamp Songkran Camp",
        window: "songkran-2027",
        dateStatus: "ran-previously",
        previousRun: "22 to 28 March, 29 March to 4 April and 5 to 11 April 2026",
        categories: ["language-learning", "nature-and-outdoors", "sport-and-fitness", "swimming"],
        minAge: 7,
        maxAge: 16,
        format: "residential",
        nights: 6,
        supervisionRatio: "roughly 1 to 10, varies by age",
        minimumBooking: "1 week",
        lunchIncluded: true,
        venue: "iCamp Thailand, Kanchanaburi",
        note: "Seven day sessions. Includes a supervised water celebration over Songkran itself.",
        lastVerified: "2026-09-12",
      },
    ],
  },
  {
    slug: "storytime-preschool-winter-camp",
    name: "Storytime Preschool Winter Camp",
    tagline: "Five days of Christmas fun for ages 2 to 7, 21 to 25 December",
    highlights: [
      "🎄 Christmas crafts and festive activities",
      "🎅 Gifts from Santa",
      "🗣️ English practice through play",
      "👫 Small, age-based groups",
      "🚐 Free shuttle from BTS Nana",
      "📅 Book single days or the whole week",
      "🏷️ 10% early bird discount until 27 November",
    ],
    area: "Khlong Toei",
    mainVenue: "Storytime Preschool, 85 Soi Samahan, Sukhumvit Soi 4",
    photo: "/images/camps/storytime-winter-december-2026.jpg",
    photoAlt: "Storytime Preschool Winter Camp flyer: 21 to 25 December 2026 for ages 2 to 7, half day 9am to 12 noon, full day 9am to 2pm, extended day 9am to 4pm, early bird prices 1,080, 1,350 and 1,620 baht (full price 1,200, 1,500 and 1,800 baht), 10% early bird discount until 27 November, school bus 400 baht a day, free shuttle to BTS Nana, with snowmen, children in winter clothes and LINE and WhatsApp QR codes for booking.",
    photoCredit: "Storytime Preschool, used with permission",
    photoCaption: "Storytime's flyer for the December 2026 Winter Camp, published October 2026. Scan the QR codes to book on LINE or WhatsApp.",
    description:
      "Storytime is an English-language preschool off Sukhumvit Soi 4 that also runs playgroups for babies and toddlers. From 21 to 25 December it runs a five-day Winter Camp for children aged 2 to 7, open to everyone, not just Storytime pupils, with fun Christmas activities, educational sessions about the festive season and gifts from Santa. Children are split into age-appropriate groups so each child gets individual attention, and it is a good way to make friends and build English skills.",
    worthKnowing:
      "Book single days or the whole week, as a half, full or extended day. Booking by 27 November takes 10% off. There is a free shuttle to and from BTS Nana, which helps because parking at the school is very limited, and a school bus from selected areas for 400 baht a day. The camp runs on Christmas Day.",
    website: "https://www.storytimepreschool.com",
    email: "info@storytimepreschool.com",
    phone: "081 646 4535 or 02 656 9084",
    facebook: "https://www.facebook.com/storytimepreschool",
    lastVerified: "2026-10-30",
    sessions: [
      {
        id: "storytime-winter-2026-half",
        programme: "Winter Camp, half day",
        window: "winter-2026",
        startDate: "2026-12-21",
        endDate: "2026-12-25",
        dateStatus: "confirmed",
        categories: ["multi-activity", "art-and-design", "language-learning"],
        minAge: 2,
        maxAge: 7,
        format: "half-day",
        priceFrom: 1200,
        priceUnit: "per-day",
        hours: "9am to 12pm",
        minimumBooking: "1 day",
        note: "1,080 baht a day with the 10% early bird discount until 27 November. Free shuttle from BTS Nana; school bus 400 baht a day from selected areas.",
        lastVerified: "2026-10-30",
      },
      {
        id: "storytime-winter-2026-day",
        programme: "Winter Camp, full or extended day",
        window: "winter-2026",
        startDate: "2026-12-21",
        endDate: "2026-12-25",
        dateStatus: "confirmed",
        categories: ["multi-activity", "art-and-design", "language-learning"],
        minAge: 2,
        maxAge: 7,
        format: "day",
        priceFrom: 1500,
        priceTo: 1800,
        priceUnit: "per-day",
        hours: "9am to 2pm, or 9am to 4pm extended",
        minimumBooking: "1 day",
        note: "1,500 baht to 2pm, 1,800 baht to 4pm. Early bird prices until 27 November: 1,350 and 1,620 baht. Free shuttle from BTS Nana; school bus 400 baht a day from selected areas.",
        lastVerified: "2026-10-30",
      },
    ],
  },
  {
    slug: "bricks-4-kidz",
    name: "Bricks 4 Kidz",
    area: "Several branches",
    mainVenue: "K Village (Sukhumvit 26), Central Ladprao, The Crystal Ratchaphruek and Mega Bangna",
    tagline: "LEGO building and robotics camps for ages 1 to 12, at four Bangkok branches",
    highlights: [
      "🧱 LEGO building every day",
      "🤖 Robotics with motors and sensors",
      "💻 Coding for 7 and up",
      "🔤 Theme-a-day builds for 1 to 4 year olds",
      "🕥 Half day or full day with lunch",
      "📍 Four branches across Bangkok",
    ],
    description:
      "Bricks 4 Kidz runs LEGO-based building and robotics classes from four mall branches, and for the December break it runs week-long camps at all four. There are four camps by age: Junior Inventor for one to four year olds, Advance Inventor for five to sevens, Junior Robotics for seven to nines, where children build and program LEGO robots with motors and sensors, and Advance Robotics for nine to twelves, using LEGO Mindstorms EV3. Each camp runs Monday to Friday, as a half day or a full day with lunch.",
    worthKnowing:
      "The first week, 7 to 11 December, is before most international schools break up, so it suits families at schools that finish early. The last week runs to 25 December, Christmas Day, so check that day with your branch. Each branch takes its own camp bookings, by phone or LINE, listed under Contact.",
    photo: "/images/camps/bricks-4-kidz-logo.jpg",
    photoAlt: "Bricks 4 Kidz logo: the name in white on red, green and blue LEGO-style bricks, with the line we learn, we build, we play with LEGO Bricks.",
    photoCredit: "Bricks 4 Kidz Thailand, used with permission",
    photoCaption: "Bricks 4 Kidz runs its December camps at all four Bangkok branches.",
    website: "http://www.bricks4kidz.co.th",
    email: "info-th@bricks4kidz.com",
    branchContacts: [
      { name: "K Village", location: "Sukhumvit 26, 2nd floor", phone: "096 394 6353", lineUrl: "https://line.me/ti/p/gUbyvQKfhQ" },
      { name: "Central Ladprao", location: "10th floor", phone: "090 991 4922", lineUrl: "https://line.me/ti/p/t9pMszEnNT" },
      { name: "The Crystal Ratchaphruek", location: "3rd floor", phone: "095 519 8961", lineUrl: "https://line.me/ti/p/z8IeDvqOF0" },
      { name: "Mega Bangna", location: "2nd floor, near HomePro", phone: "086 394 1462", lineUrl: "https://line.me/ti/p/HoSwmHvTnq" },
    ],
    lastVerified: "2026-10-26",
    sessions: B4K_SESSIONS,
  },
  {
    slug: "ninja-academy-christmas-ninja-camp",
    name: "Ninja Academy Christmas Ninja Camp",
    area: "Sathorn and Ekkamai",
    tagline: "Gymnastics, parkour and Brazilian jiu-jitsu, booked day by day",
    description:
      "Ninja Academy runs a Christmas holiday Ninja Camp for children aged 4 to 11 at its Sathorn and Ekkamai locations, from 5 December to 3 January. Days mix gymnastics, parkour and obstacle courses with Brazilian jiu-jitsu and martial arts, plus ninja games with missions and team challenges. It is built for active kids who would otherwise spend the holidays in front of a screen, with the focus on strength, confidence and discipline.",
    worthKnowing:
      "Booking is unusually flexible: the camp is open every day, including weekends and holidays, you book day by day with no weekly commitment, and there is no advance payment and no cancellation fee. Regular, extended and short sessions are available, from 600 baht a session, and freshly prepared lunch comes with the full-camp options. Places are limited, so book through the form or message them on WhatsApp or LINE.",
    email: "info@ninjaacademythailand.com",
    phone: "081 701 6365 (WhatsApp and LINE)",
    highlights: [
      "🤸 Gymnastics, parkour and obstacle courses",
      "🥋 Brazilian jiu-jitsu and martial arts",
      "🎯 Ninja games, missions and team challenges",
      "📅 Open every day, book day by day",
    ],
    lastVerified: "2026-11-07",
    sessions: [
      {
        id: "ninja-academy-christmas-2026",
        programme: "Christmas Ninja Camp",
        window: "winter-2026",
        startDate: "2026-12-05",
        endDate: "2027-01-03",
        dateStatus: "confirmed",
        categories: ["sport-and-fitness", "multi-activity"],
        minAge: 4,
        maxAge: 11,
        format: "day",
        priceFrom: 600,
        priceUnit: "per-session",
        venue: "Sathorn and Ekkamai",
        hours: "9am to 2.30pm, with regular, extended and short sessions",
        minimumBooking: "1 day",
        bookingUrl: "https://forms.gle/T4is8aSTPkeiJgb18",
        note: "From 600 baht a session. Open every day including weekends and holidays. No advance payment and no cancellation fee. Lunch with full-camp options.",
        lastVerified: "2026-11-07",
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

/**
 * True once a session can no longer be booked: its confirmed last day has
 * passed, or (for tba and ran-previously sessions) its whole break window
 * is over. Finished sessions stay in the data, so the operator keeps its
 * history and next year's run can be added beside them, but the directory
 * and the camp pages stop showing them. Dates are Bangkok time.
 */
export function isFinished(s: CampSession, today: string = bangkokToday()): boolean {
  if (s.dateStatus === "confirmed" && s.endDate) return s.endDate < today;
  const w = BREAK_WINDOWS.find((x) => x.id === s.window);
  return !!w && w.end < today;
}

/** The next school break that hasn't ended yet (Bangkok time). */
export function nextWindowId(today: string = bangkokToday()): string | undefined {
  return BREAK_WINDOWS.find((w) => w.end >= today)?.id;
}

/**
 * Whether a session belongs on the site right now: not finished, and either
 * confirmed or in the next break. Unconfirmed weeks for breaks further out
 * (next summer, say) stay in the data but are hidden until that break is next.
 */
export function isShown(s: CampSession, today: string = bangkokToday()): boolean {
  if (isFinished(s, today)) return false;
  return s.dateStatus === "confirmed" || s.window === nextWindowId(today);
}

/** Sessions to show in the directory. Call at request time. */
export function upcomingSessions(today: string = bangkokToday()): SessionWithCamp[] {
  return ALL_SESSIONS.filter((s) => isShown(s, today));
}

export function campBySlug(slug: string): Camp | undefined {
  return CAMPS.find((c) => c.slug === slug);
}
