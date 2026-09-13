// Source of truth for /school-breaks and the /camps break-window filter.
//
// RULE: every date below is read off the school's own published calendar.
// Nothing is inferred from "British schools usually...". If a date is not
// published, confidence is "partial" or "unverified" and it renders as such.

export type CalendarStyle = "british" | "american" | "ib" | "australian";
export type Confidence = "verified" | "partial" | "unverified";

export type BreakWindowId =
  | "oct-2026"
  | "winter-2026"
  | "spring-2027"
  | "songkran-2027"
  | "summer-2027"
  | "other-2027";

export interface SchoolBreak {
  window: BreakWindowId;
  start: string;
  end: string;
  endEstimated?: boolean;
  note?: string;
}

export interface SchoolCalendar {
  name: string;
  schoolSlug: string | null;
  style: CalendarStyle;
  sourceUrl: string;
  sourceLabel: string;
  lastVerified: string;
  confidence: Confidence;
  termStart?: string;
  termEnd?: string;
  breaks: SchoolBreak[];
  caveat?: string;
}

export const SCHOOL_CALENDARS: SchoolCalendar[] = [
  {
    name: "Bangkok Patana School",
    schoolSlug: "bangkok-patana-school",
    style: "british",
    sourceUrl:
      "https://www.patana.ac.th/wp-content/uploads/2026/01/School_Calendar_26-27.pdf",
    sourceLabel: "Official 2026/27 academic calendar, version 2026.01.22",
    lastVerified: "2026-09-12",
    confidence: "verified",
    termStart: "2026-08-19",
    termEnd: "2027-06-25",
    breaks: [
      { window: "oct-2026", start: "2026-10-12", end: "2026-10-16" },
      {
        window: "winter-2026",
        start: "2026-12-19",
        end: "2027-01-10",
        note: "Term 1 ends 18 Dec, Term 2 starts 11 Jan. Three full weeks, the longest winter break of the schools listed here.",
      },
      {
        window: "spring-2027",
        start: "2027-03-22",
        end: "2027-03-26",
        note: "Easter aligned. Good Friday falls on 26 March 2027.",
      },
      { window: "songkran-2027", start: "2027-04-05", end: "2027-04-16" },
      {
        window: "summer-2027",
        start: "2027-06-28",
        end: "2027-08-13",
        endEstimated: true,
        note: "2027/28 term start not yet published.",
      },
    ],
    caveat:
      "Patana states the calendar may be revised if the government changes public holiday dates.",
  },
  {
    name: "St Andrews International School Bangkok",
    schoolSlug: "st-andrews-international-school-bangkok",
    style: "british",
    sourceUrl:
      "https://www.standrewssukhumvit.com/wp-content/uploads/sites/23/2022/06/School-calendar-2026-27-BKK-Final.pdf",
    sourceLabel: "Official 2026/27 calendar, Dusit / Sathorn / Sukhumvit 107",
    lastVerified: "2026-09-12",
    confidence: "verified",
    termStart: "2026-08-19",
    termEnd: "2027-06-22",
    breaks: [
      {
        window: "oct-2026",
        start: "2026-10-12",
        end: "2026-10-16",
        note: "King Rama IX Memorial Day falls inside the break on 13 October.",
      },
      {
        window: "winter-2026",
        start: "2026-12-14",
        end: "2027-01-04",
        note: "Out a full week before Patana, back a week earlier too. Term 2 starts 5 January.",
      },
      {
        window: "spring-2027",
        start: "2027-02-15",
        end: "2027-02-22",
        note: "February, not March. Five weeks earlier than Patana. Makha Bucha in lieu on 19 Feb, staff day on 22 Feb.",
      },
      { window: "songkran-2027", start: "2027-04-05", end: "2027-04-16" },
      {
        window: "summer-2027",
        start: "2027-06-23",
        end: "2027-08-13",
        endEstimated: true,
      },
    ],
  },
  {
    name: "King's College International School Bangkok",
    schoolSlug: "kings-college-international-school-bangkok",
    style: "british",
    sourceUrl: "https://www.kingsbangkok.ac.th/en/admissions/key-dates",
    sourceLabel: "Published key dates, 2026/27",
    lastVerified: "2026-09-12",
    confidence: "verified",
    termStart: "2026-08-27",
    termEnd: "2027-07-02",
    breaks: [
      {
        window: "oct-2026",
        start: "2026-10-17",
        end: "2026-10-25",
        note: "Nine days, a week later than Patana and St Andrews. Check which week your school actually has off before booking an October camp.",
      },
      { window: "winter-2026", start: "2026-12-19", end: "2027-01-10" },
      { window: "spring-2027", start: "2027-02-20", end: "2027-02-28" },
      { window: "songkran-2027", start: "2027-04-03", end: "2027-04-18" },
      {
        window: "other-2027",
        start: "2027-05-01",
        end: "2027-05-04",
        note: "Term 3 break, unique to King's among the schools here.",
      },
      { window: "other-2027", start: "2027-06-03", end: "2027-06-06" },
      {
        window: "summer-2027",
        start: "2027-07-03",
        end: "2027-08-20",
        endEstimated: true,
        note: "Latest finish of any school listed, 2 July.",
      },
    ],
  },
  {
    name: "Shrewsbury International School Bangkok",
    schoolSlug: "shrewsbury-international-school-bangkok",
    style: "british",
    sourceUrl: "https://www.shrewsbury.ac.th/our-school/term-dates/2026-2027/",
    sourceLabel: "Published term dates, 2026/27",
    lastVerified: "2026-09-12",
    confidence: "partial",
    termStart: "2026-08-31",
    breaks: [
      {
        window: "winter-2026",
        start: "2026-12-19",
        end: "2027-01-11",
        note: "Term 1 ends 18 Dec, Term 2 starts 12 Jan.",
      },
      {
        window: "songkran-2027",
        start: "2027-04-10",
        end: "2027-04-18",
        endEstimated: true,
        note: "Term 2 ends 9 April. Term 3 start not published.",
      },
    ],
    caveat:
      "Shrewsbury publishes term start and end dates but not half terms. October and spring half terms still need confirming.",
  },
  {
    name: "International School Bangkok (ISB)",
    schoolSlug: "international-school-bangkok-isb",
    style: "american",
    sourceUrl: "https://www.isb.ac.th/calendar",
    sourceLabel: "Board approved first day of school, 2026/27",
    lastVerified: "2026-09-12",
    confidence: "unverified",
    termStart: "2026-08-13",
    breaks: [],
    caveat:
      "ISB runs an American semester calendar, so its breaks do not map onto the British half term pattern. The full calendar sits behind a viewer that needs opening in a browser. Only the 13 August start date is confirmed.",
  },
  {
    name: "KIS International School Bangkok",
    schoolSlug: "kis-international-school-bangkok",
    style: "ib",
    sourceUrl: "https://kis.ac.th/bkk/about/calendar/",
    sourceLabel: "2026/27 calendar, updated 22 May 2026",
    lastVerified: "2026-09-12",
    confidence: "unverified",
    breaks: [],
    caveat:
      "Calendar is published inside a PDF.js viewer. Dates need reading off manually.",
  },
];

export interface BreakWindow {
  id: BreakWindowId;
  label: string;
  shortLabel: string;
  start: string;
  end: string;
  coreStart?: string;
  coreEnd?: string;
  summary: string;
}

export const BREAK_WINDOWS: BreakWindow[] = [
  {
    id: "oct-2026",
    label: "October half term 2026",
    shortLabel: "Oct 2026",
    start: "2026-10-12",
    end: "2026-10-25",
    coreStart: "2026-10-12",
    coreEnd: "2026-10-16",
    summary:
      "Two separate weeks, not one. Patana and St Andrews take 12 to 16 October. King's takes 17 to 25 October. Camp supply is heaviest in the first week.",
  },
  {
    id: "winter-2026",
    label: "Winter and New Year 2026/27",
    shortLabel: "Winter 2026",
    start: "2026-12-14",
    end: "2027-01-11",
    coreStart: "2026-12-21",
    coreEnd: "2027-01-01",
    summary:
      "The most staggered break of the year. St Andrews is out from 14 December, Patana not until 19 December. St Andrews returns 5 January, Shrewsbury not until 12 January. Nearly a month of rolling demand.",
  },
  {
    id: "spring-2027",
    label: "Spring half term 2027",
    shortLabel: "Spring 2027",
    start: "2027-02-15",
    end: "2027-03-26",
    summary:
      "There is no single spring break. St Andrews takes mid February, King's takes late February, Patana takes late March around Easter. Check your own school's dates before booking anything labelled February half term.",
  },
  {
    id: "songkran-2027",
    label: "Songkran break 2027",
    shortLabel: "Songkran 2027",
    start: "2027-04-03",
    end: "2027-04-18",
    coreStart: "2027-04-05",
    coreEnd: "2027-04-16",
    summary:
      "The most aligned break after October. Most schools take the full two weeks, 5 to 16 April, with Songkran itself on 13 to 15 April. Very few camps run during the festival days themselves.",
  },
  {
    id: "summer-2027",
    label: "Summer 2027",
    shortLabel: "Summer 2027",
    start: "2027-06-23",
    end: "2027-08-20",
    summary:
      "Finish dates spread across three weeks, from 22 June at St Andrews to 2 July at King's, and American calendar schools finish earlier still. Eight weeks of camp demand, and the only window where residential and overseas programmes are realistic.",
  },
  {
    id: "other-2027",
    label: "Other term time breaks 2027",
    shortLabel: "Other 2027",
    start: "2027-05-01",
    end: "2027-06-06",
    summary:
      "A few schools take short breaks inside Term 3. King's takes 1 to 4 May and 3 to 6 June. Almost no camps are scheduled against these, since demand is too thin.",
  },
];

export const CALENDAR_LAST_VERIFIED = "2026-09-12";
