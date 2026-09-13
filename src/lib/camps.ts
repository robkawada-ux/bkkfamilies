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
  /** Where camps physically run, when it is worth naming. Shown in the hero. */
  mainVenue?: string;
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
    mainVenue: "Bangkok Prep Secondary Campus, 77 Soi Sukhumvit 77, Phra Khanong Nuea",
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
  {
    slug: "carroll-prep-october-camp",
    name: "Carroll Prep October Camp",
    area: "Nonthaburi",
    mainVenue: "Carroll Preparatory Primary and Preschool, Nonthaburi",
    description:
      "Carroll Prep runs a five-week October camp for younger children, built around life skills and language rather than weekly themes. English is used throughout as a working language rather than taught as a lesson, and the camp also carries a Chinese strand. Days mix hands-on projects, arts, crafts and cooking. The age range starts at two, which is unusually young for a Bangkok holiday camp and makes this one of the few real options for preschoolers.",
    worthKnowing:
      "The camp runs five weeks because Thai schools take a much longer October break than international schools do. Only weeks three and four overlap the international school half terms, so the other three weeks are worth knowing about if you need cover either side. Carroll Prep also stays open on 13 and 23 October, both public holidays, when most camps close.",
    website: "https://www.carrollprep.ac.th/october-camp-2026/",
    email: "admissions@carrollprep.ac.th",
    phone: "02 954 2168",
    facebook: "https://www.facebook.com/carrollprep",
    lastVerified: "2026-09-12",
    sessions: [
      {
        id: "carroll-oct-w1",
        programme: "October Life Skills and Language Camp",
        window: "oct-2026",
        startDate: "2026-09-28",
        endDate: "2026-10-02",
        dateStatus: "confirmed",
        categories: ["language-learning", "art-and-design", "cookery"],
        minAge: 2,
        maxAge: 11,
        format: "day",
        priceFrom: 10000,
        priceUnit: "per-week",
        minimumBooking: "1 week",
        note: "Before the international school half term. Useful for early cover.",
        lastVerified: "2026-09-12",
      },
      {
        id: "carroll-oct-w2",
        programme: "October Life Skills and Language Camp",
        window: "oct-2026",
        startDate: "2026-10-05",
        endDate: "2026-10-09",
        dateStatus: "confirmed",
        categories: ["language-learning", "art-and-design", "cookery"],
        minAge: 2,
        maxAge: 11,
        format: "day",
        priceFrom: 10000,
        priceUnit: "per-week",
        minimumBooking: "1 week",
        lastVerified: "2026-09-12",
      },
      {
        id: "carroll-oct-w3",
        programme: "October Life Skills and Language Camp",
        window: "oct-2026",
        startDate: "2026-10-12",
        endDate: "2026-10-16",
        dateStatus: "confirmed",
        categories: ["language-learning", "art-and-design", "cookery"],
        minAge: 2,
        maxAge: 11,
        format: "day",
        priceFrom: 10000,
        priceUnit: "per-week",
        minimumBooking: "1 week",
        note: "Matches the Patana and St Andrews half term. Open on 13 October.",
        lastVerified: "2026-09-12",
      },
      {
        id: "carroll-oct-w4",
        programme: "October Life Skills and Language Camp",
        window: "oct-2026",
        startDate: "2026-10-19",
        endDate: "2026-10-23",
        dateStatus: "confirmed",
        categories: ["language-learning", "art-and-design", "cookery"],
        minAge: 2,
        maxAge: 11,
        format: "day",
        priceFrom: 10000,
        priceUnit: "per-week",
        minimumBooking: "1 week",
        note: "Matches the King's College half term. Open on 23 October.",
        lastVerified: "2026-09-12",
      },
      {
        id: "carroll-oct-w5",
        programme: "October Life Skills and Language Camp",
        window: "oct-2026",
        startDate: "2026-10-26",
        endDate: "2026-10-30",
        dateStatus: "confirmed",
        categories: ["language-learning", "art-and-design", "cookery"],
        minAge: 2,
        maxAge: 11,
        format: "day",
        priceFrom: 10000,
        priceUnit: "per-week",
        minimumBooking: "1 week",
        note: "After the international school half terms.",
        lastVerified: "2026-09-12",
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
        id: "regents-oct-2026",
        programme: "Regent's English October Camp",
        window: "oct-2026",
        startDate: "2026-10-12",
        endDate: "2026-10-30",
        dateStatus: "confirmed",
        categories: ["language-learning", "academic", "swimming"],
        minAge: 3,
        maxAge: 12,
        format: "day",
        priceFrom: 17010,
        priceTo: 40967,
        priceUnit: "per-session",
        venue: "Regent's Boarding Campus, 592 Pracha Uthit Road, Huai Khwang",
        hours: "9:00am to 2:30pm, Monday to Friday",
        minimumBooking: "1 week",
        bookingUrl: "https://forms.cloud.microsoft/r/7X4DYptQZm",
        note:
          "Three weeks available. Discounted prices: 17,010 for one week, 34,136 for two, 40,967 for all three. Regular prices are quoted as 28,350, 56,894 and 68,279.",
        lastVerified: "2026-09-12",
      },
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
    lastVerified: "2026-09-12",
    sessions: [
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
      {
        id: "grow-oct",
        programme: "Grow Nature Camp",
        window: "oct-2026",
        dateStatus: "ran-previously",
        previousRun: "13 to 17 and 20 to 24 October 2025",
        categories: ["nature-and-outdoors"],
        minAge: 5,
        maxAge: 12,
        format: "day",
        hours: "9:00am to 4:00pm",
        lunchIncluded: true,
        venue: "Bangkok Prep Forest School, Bang Kachao",
        note: "Ran both half term weeks in 2025. 2026 dates not yet announced.",
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
    slug: "bangkok-dolphins",
    name: "Bangkok Dolphins",
    area: "Watthana",
    description:
      "Bangkok Dolphins has run sports and activities camps since 1998, which makes it one of the longest-established camp operators in the city. Each week carries its own theme, with activities across sports, swimming and arts and crafts shaped to the age group.",
    worthKnowing:
      "Dolphins advertises heavily on the main competing Bangkok kids directory, so you will see it everywhere when you search. That is marketing spend rather than a quality signal, in either direction. We have not been able to verify current dates, prices or age bands from their own site, so treat this entry as a pointer to check rather than a listing.",
    website: "http://www.bangkokdolphins.com/camp/",
    lastVerified: "2026-09-12",
    sessions: [
      {
        id: "dolphins-oct",
        programme: "Bangkok Dolphins October Camp",
        window: "oct-2026",
        dateStatus: "ran-previously",
        previousRun: "October 2025",
        categories: ["sport-and-fitness", "swimming", "art-and-design"],
        minAge: 3,
        maxAge: 12,
        format: "day",
        note: "Ages are our estimate from their general camp marketing and need confirming. Prices not published.",
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
    slug: "alliance-francaise-bangkok",
    name: "Alliance Francaise Bangkok",
    area: "Sathorn",
    description:
      "Alliance Francaise runs holiday camps for children aged roughly three to eleven, either improving their French or exploring arts activities depending on the programme on offer that break. It is the established route to French language provision in Bangkok outside the Lycee, and camps run in most school holiday periods.",
    worthKnowing:
      "Programmes vary a lot between breaks, and some are language camps while others are arts camps with French alongside. Check which one is running before assuming your child will come out speaking more French. Dates and prices are published per camp rather than on a standing page, so they need checking each break.",
    lastVerified: "2026-09-12",
    sessions: [
      {
        id: "af-oct",
        programme: "Alliance Francaise October Camp",
        window: "oct-2026",
        dateStatus: "ran-previously",
        previousRun: "October 2025",
        categories: ["language-learning", "art-and-design"],
        minAge: 3,
        maxAge: 11,
        format: "day",
        note: "French language and arts activities. 2026 dates and prices not yet published.",
        lastVerified: "2026-09-12",
      },
    ],
  },
  {
    slug: "mandarin-house-bangkok",
    name: "Mandarin House",
    area: "Bangkok",
    description:
      "Mandarin House runs Chinese language holiday camps for children in Bangkok, and is one of the few dedicated Mandarin options during school breaks rather than a general camp with a language strand bolted on.",
    worthKnowing:
      "Mandarin provision for children during Bangkok school holidays is genuinely thin, so the choice is small and places go quickly. We have not been able to verify current dates, prices or age bands from a primary source, so treat this as a lead to follow rather than a listing. If you have used them, tell us and we will fill this in properly.",
    lastVerified: "2026-09-12",
    sessions: [
      {
        id: "mandarinhouse-oct",
        programme: "Mandarin House October Camp",
        window: "oct-2026",
        dateStatus: "ran-previously",
        previousRun: "October 2025",
        categories: ["language-learning"],
        minAge: 4,
        maxAge: 12,
        format: "day",
        note: "Ages are our estimate and need confirming. Dates and prices not published.",
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
      "iCamp runs a strict no-screen policy: phones are collected at check-in and returned on departure day, and parents cannot phone their child directly, though the office will pass on messages and posts daily photos to Facebook. Visits need two days notice. For a lot of families that is the appeal, but it is worth knowing before you book if your child has never been away from home. Bookings are by the week with the option to extend once they are there. The camp is a two to three hour drive from Bangkok, so this is a genuine residential trip rather than a day camp.",
    website: "https://icampthailand.com/october-camp/",
    email: "info@icampthailand.com",
    phone: "02 399 5400 ext 503",
    lineId: "@icampthailand",
    facebook: "https://www.facebook.com/icampth/",
    lastVerified: "2026-09-12",
    sessions: [
      {
        id: "icamp-oct-2026",
        programme: "Active Discovery English Camp",
        window: "oct-2026",
        dateStatus: "tba",
        categories: ["language-learning", "nature-and-outdoors", "sport-and-fitness", "swimming"],
        minAge: 7,
        maxAge: 16,
        format: "residential",
        nights: 5,
        supervisionRatio: "roughly 1 to 10, varies by age",
        minimumBooking: "1 week",
        lunchIncluded: true,
        venue: "iCamp Thailand, Kanchanaburi",
        note:
          "Six day residential. Registration is open but exact dates and prices are not published on the site front page. Day three includes a sports competition, the Kanchanaburi Skywalk and a meal by the river. English activities are matched to Cambridge A1, A2, B1 and B2.",
        lastVerified: "2026-09-12",
      },
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
        note: "Places are capped per week to hold staff ratios.",
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
