// Playgroups directory. One Playgroup per VENUE or PROGRAMME, with nested
// sessions, because one venue often runs two sessions for different ages
// on different days at different prices (Bangkok Prep's Little Pups and
// Big Pups, Little Treehouse's own sessions and its parents' group morning).
//
// The directory filters on PLAYGROUPS, but day, age and price live on the
// SESSION so the filters match the session a parent would actually attend.
//
// HONESTY RULES, same as camps:
// - Never guess a price, a time or an age. Omit the field and the UI says
//   "not published".
// - status "confirmed" means we read it on the organiser's own current page
//   or on the organiser's live booking calendar for the current term. "check" means
//   the best available detail came from an older or secondary listing and
//   the UI tells parents to confirm before going.
//
// MAINTENANCE: playgroups change every term and pause for school holidays.
// Re-verify each term start (late August, January, April). Parents' group
// prices come from the individual Glue Up event pages, which are more
// current than the group's own website. Membership prices are never shown,
// by editorial decision. Where an organiser offers a BAMBI discount, the only
// mention is the finePrint line "Ask about discount for BAMBI members."

export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export const DAYS: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const DAY_LABEL: Record<Day, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export type Frequency = "weekly" | "fortnightly" | "monthly" | "occasional";

export type Organiser =
  | "International school"
  | "Preschool or nursery"
  | "Parents' group"
  | "Play centre or cafe"
  | "Community or library";

export type Kind = "Drop-in playgroup" | "Class or course" | "Storytime";

export type Zone =
  | "Sukhumvit"
  | "Central"
  | "Rama 9 and Ramkhamhaeng"
  | "Bang Na and east"
  | "North"
  | "Several locations";

export const ZONES: Zone[] = [
  "Sukhumvit",
  "Central",
  "Rama 9 and Ramkhamhaeng",
  "Bang Na and east",
  "North",
  "Several locations",
];

export type PriceUnit = "session" | "course" | "year";

export interface Price {
  /** Baht. Omit when not published. */
  amount?: number;
  /** Upper end when the organiser quotes a range. */
  to?: number;
  unit: PriceUnit;
  free?: boolean;
  note?: string;
}

export interface PlaygroupSession {
  /** Shown when a venue runs more than one session, e.g. "Little Pups". */
  label?: string;
  /** Omit when the organiser does not publish the day. */
  days?: Day[];
  frequency: Frequency;
  /** 24h "09:30". Omit when not published. */
  start?: string;
  end?: string;
  /** Ages in MONTHS so babies and toddlers filter properly. */
  minAgeMonths?: number;
  maxAgeMonths?: number;
  price?: Price;
  language?: string[];
  note?: string;
}

export interface Playgroup {
  slug: string;
  name: string;
  /** Who runs it. For parents' group sessions, the host venue is `venue`. */
  organiser: Organiser;
  kind: Kind;
  venue: string;
  address?: string;
  district: string;
  zone: Zone;
  transit?: string;
  sessions: PlaygroupSession[];
  /** Languages across all sessions. English unless stated. */
  languages: string[];
  description: string;
  worthKnowing?: string;
  bookingRequired?: boolean;
  bookingUrl?: string;
  website?: string;
  email?: string;
  phone?: string;
  lineId?: string;
  facebook?: string;
  /** Link to our school profile where one exists. */
  schoolSlug?: string;
  status: "confirmed" | "check";
  /** True when the organiser confirmed the details to us directly, e.g. by email. */
  confirmedByOrganiser?: boolean;
  /** Small print shown at the very bottom of the detail page. */
  finePrint?: string;
  sourceUrl: string;
  lastVerified: string;
}

const Y = 12; // months per year, for readability

export const PLAYGROUPS: Playgroup[] = [
  // ------------------------------------------------------- Parents' group
  {
    slug: "little-gaia-one-bangkok",
    name: "Little Gaia Playgroup",
    organiser: "Parents' group",
    kind: "Drop-in playgroup",
    venue: "Little Gaia, Parade at One Bangkok",
    address: "Unit 1420, 4th floor, Parade, One Bangkok, 1877 Rama IV Road, Lumphini, Pathum Wan",
    district: "Pathum Wan",
    zone: "Central",
    transit: "MRT Lumphini exit 3, about a 10 minute walk",
    sessions: [
      {
        days: ["Tue", "Wed"],
        frequency: "fortnightly",
        start: "10:00",
        end: "12:00",
        minAgeMonths: 6,
        maxAgeMonths: 6 * Y,
        price: { amount: 450, unit: "session", note: "Per family, one adult. Extra adults ฿100." },
        note: "Upcoming: Tue 29 Sep, Wed 7 Oct, Wed 21 Oct 2026.",
      },
    ],
    languages: ["English"],
    description:
      "A newer parent-run playgroup held inside Little Gaia, the indoor play and creative learning space in the Parade zone at One Bangkok. The morning opens with circle time and a story, then children have the run of a soft play area built for under tens. It is one of the easiest playgroups in the city to reach by MRT.",
    worthKnowing:
      "Launched as an every Tuesday session, but the October booking calendar lists Wednesday sessions roughly every two weeks, and the 22 September session was cancelled. Check the booking page before you go. Little Gaia stamps receipts for two hours of free mall parking.",
    bookingRequired: true,
    bookingUrl: "https://bambi.glueup.com/event/193670",
    status: "confirmed",
    sourceUrl: "https://bambi.glueup.com/event/193670",
    lastVerified: "2026-09-28",
  },
  {
    slug: "kira-kira-sukhumvit-61",
    name: "Kira Kira Playgroup",
    organiser: "Parents' group",
    kind: "Drop-in playgroup",
    venue: "Kirakira Kids International Kindergarten",
    address: "81-83 Sukhumvit 61, Khlong Tan Nuea, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "Free shuttle from Major Cineplex Sukhumvit (Ekkamai)",
    sessions: [
      {
        days: ["Wed"],
        frequency: "fortnightly",
        start: "09:30",
        end: "11:00",
        minAgeMonths: 0,
        maxAgeMonths: 3 * Y,
        price: { amount: 400, unit: "session", note: "Per family. Extra adults ฿100." },
        language: ["Japanese", "English"],
        note: "Upcoming: 30 Sep, 14 Oct, 28 Oct 2026.",
      },
    ],
    languages: ["Japanese", "English"],
    description:
      "A Japanese and English bilingual playgroup hosted at a Japanese international kindergarten off Ekkamai. Sessions run through circle time, crafts, sensory play and music, with indoor and outdoor playgrounds and a sand area to finish. Families of every nationality are welcome, not just Japanese speakers.",
    bookingRequired: true,
    bookingUrl: "https://bambi.glueup.com/event/193676",
    status: "confirmed",
    sourceUrl: "https://bambi.glueup.com/event/193676",
    lastVerified: "2026-09-28",
  },
  {
    slug: "kiddieville-playville",
    name: "Kiddieville Playgroup at Playville",
    organiser: "Parents' group",
    kind: "Drop-in playgroup",
    venue: "Playville, 49 Playscape",
    address: "2nd floor, 49 Playscape, 8/3 Sukhumvit 49, Khlong Tan Nuea, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "BTS Thong Lo, about a 7 minute walk",
    sessions: [
      {
        days: ["Thu"],
        frequency: "weekly",
        start: "09:00",
        end: "11:00",
        minAgeMonths: 6,
        maxAgeMonths: 3 * Y,
        price: { amount: 450, unit: "session", note: "Per family, one adult only." },
      },
    ],
    languages: ["English"],
    description:
      "A weekly parent-run morning at Playville, a clean, well kept indoor playground on Sukhumvit 49 aimed at crawlers up to three. There is a ball pit, climbing and slides, a reading corner and a sand play area, plus a cafe with a kids' menu. It suits families who want free play rather than a structured class.",
    worthKnowing:
      "Playville only allows one adult per family at this session, so a second parent or nanny cannot come in. Bring non-slip socks and cash.",
    bookingRequired: true,
    bookingUrl: "https://bambi.glueup.com/event/195661",
    website: "https://www.playville.co.th/",
    status: "confirmed",
    sourceUrl: "https://bambi.glueup.com/event/195661",
    lastVerified: "2026-09-28",
  },
  {
    slug: "little-steps-future-steps",
    name: "Little Steps Playgroup",
    organiser: "Parents' group",
    kind: "Drop-in playgroup",
    venue: "Future Steps International School",
    address: "154/1 Soi Sukhumvit 31, Khlong Tan Nuea, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    sessions: [
      {
        days: ["Thu"],
        frequency: "weekly",
        start: "09:30",
        end: "11:00",
        minAgeMonths: 12,
        maxAgeMonths: 3 * Y,
        price: { amount: 400, unit: "session", note: "Per family, one adult only." },
      },
    ],
    languages: ["English"],
    description:
      "A weekly parent-run playgroup at a small international preschool on Sukhumvit 31, led by the school's own teachers. Expect circle time, sensory activities and a story, with indoor and outdoor play areas and a sand pit. It is one of the more structured of the parent-run mornings.",
    worthKnowing: "One adult per family, and payment is cash at the door.",
    bookingRequired: true,
    bookingUrl: "https://bambi.glueup.com/event/195664",
    status: "confirmed",
    sourceUrl: "https://bambi.glueup.com/event/195664",
    lastVerified: "2026-09-28",
  },
  {
    slug: "niko-niko-sukhumvit-49",
    name: "Niko Niko Japanese Playgroup",
    organiser: "Parents' group",
    kind: "Drop-in playgroup",
    venue: "The Prestige 49 Condominium",
    address: "Sukhumvit 49, Khlong Tan Nuea, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    sessions: [
      {
        days: ["Fri"],
        frequency: "weekly",
        start: "09:30",
        end: "11:00",
        minAgeMonths: 12,
        maxAgeMonths: 4 * Y,
        price: { amount: 400, unit: "session", note: "Per family. Extra adults ฿100." },
        language: ["Japanese", "English"],
      },
    ],
    languages: ["Japanese", "English"],
    description:
      "A newer playgroup led by a Japanese teacher using a Montessori approach, run in Japanese and English. Mornings include circle time, crafts, sensory play, stories and bubbles. Like Kira Kira, it welcomes families of any background.",
    worthKnowing:
      "The event page notes that the theme, and sometimes the venue, changes from week to week, so check the address on each week's booking page.",
    bookingRequired: true,
    bookingUrl: "https://bambi.glueup.com/event/195666",
    status: "confirmed",
    sourceUrl: "https://bambi.glueup.com/event/195666",
    lastVerified: "2026-09-28",
  },
  {
    slug: "little-tots-sathorn",
    name: "Little Tots Playgroup",
    organiser: "Parents' group",
    kind: "Drop-in playgroup",
    venue: "Tiny Tots International Learning Centre, Sathorn",
    address: "148/7 Sathorn Soi 6 (Soi Keng Chuan), Nang Linchi, Sathorn",
    district: "Sathorn",
    zone: "Central",
    sessions: [
      {
        days: ["Sat"],
        frequency: "monthly",
        start: "10:00",
        end: "12:00",
        minAgeMonths: 12,
        maxAgeMonths: 5 * Y,
        price: { amount: 350, unit: "session", note: "Per family. Extra adults ฿100." },
        note: "One Saturday a month. Next: 3 Oct 2026.",
      },
    ],
    languages: ["English"],
    description:
      "A parent-run weekend playgroup, held one Saturday a month at Tiny Tots in Sathorn. A teacher leads sensory play, gym time and an English story, and children can use the indoor and outdoor play areas and the pool. It is a good option for working parents who cannot make a weekday morning.",
    bookingRequired: true,
    bookingUrl: "https://bambi.glueup.com/event/195665",
    schoolSlug: "tiny-tots-international-school",
    status: "confirmed",
    sourceUrl: "https://bambi.glueup.com/event/195665",
    lastVerified: "2026-09-28",
  },
  {
    slug: "wonderkids-wonder-woods",
    name: "Wonderkids Playgroup at Wonder Woods",
    organiser: "Parents' group",
    kind: "Drop-in playgroup",
    venue: "Wonder Woods Kids Cafe and Co-Learning Space",
    address: "Soi Phatthanakan 51, Suan Luang",
    district: "Suan Luang",
    zone: "Rama 9 and Ramkhamhaeng",
    transit: "MRT Hua Mak, about a 9 minute walk",
    sessions: [
      {
        days: ["Mon"],
        frequency: "weekly",
        start: "09:30",
        end: "12:00",
        minAgeMonths: 12,
        maxAgeMonths: 6 * Y,
        price: { amount: 450, unit: "session", note: "Per family. Extra adults ฿100. Pool access ฿150 extra, paid to Wonder Woods." },
      },
    ],
    languages: ["English"],
    description:
      "One of the longest playgroup mornings of the week, two and a half hours at a kids cafe off Phatthanakan with indoor and outdoor playgrounds, sand play and a splash area. It is messier and more outdoorsy than most, so bring a change of clothes. Parents can eat and drink at the cafe while children play.",
    worthKnowing:
      "The booking page still asks for masks indoors, so carry one.",
    bookingRequired: true,
    bookingUrl: "https://bambi.glueup.com/event/195676",
    website: "https://www.facebook.com/wonderwoodskidscafe",
    status: "confirmed",
    sourceUrl: "https://bambi.glueup.com/event/195676",
    lastVerified: "2026-09-28",
  },
  {
    slug: "little-seeds-tiny-seeds",
    name: "Little Seeds Playgroup",
    organiser: "Parents' group",
    kind: "Drop-in playgroup",
    venue: "The Tiny Seeds International Pre-School",
    address: "105/1-3 Soi Naphasap Yaek 5, Khlong Toei",
    district: "Khlong Toei",
    zone: "Sukhumvit",
    sessions: [
      {
        days: ["Mon"],
        frequency: "weekly",
        start: "09:30",
        end: "11:30",
        minAgeMonths: 12,
        maxAgeMonths: 6 * Y,
        price: { amount: 400, unit: "session", note: "Per family. Extra adults ฿100." },
      },
    ],
    languages: ["English"],
    description:
      "A weekly Monday playgroup at a small international preschool in the Sukhumvit 36 to 40 area. An international teacher runs circle time and activity stations, followed by free play indoors and outside.",
    bookingRequired: true,
    bookingUrl: "https://bambi.glueup.com/event/195667",
    schoolSlug: "the-tiny-seeds-international-pre-school-bangkok",
    status: "confirmed",
    sourceUrl: "https://bambi.glueup.com/event/195667",
    lastVerified: "2026-09-28",
  },
  {
    slug: "little-panda-mandarin",
    name: "Little Panda Mandarin Playgroup",
    organiser: "Parents' group",
    kind: "Drop-in playgroup",
    venue: "Nancy Language School, K Village",
    address: "93-95 K Village, Sukhumvit Road, Khlong Tan, Khlong Toei",
    district: "Khlong Toei",
    zone: "Sukhumvit",
    sessions: [
      {
        days: ["Fri"],
        frequency: "fortnightly",
        start: "09:30",
        end: "11:30",
        minAgeMonths: 12,
        maxAgeMonths: 6 * Y,
        price: { amount: 400, unit: "session", note: "Per family. Extra adults ฿100." },
        language: ["Mandarin"],
        note: "Upcoming: 9 Oct and 30 Oct 2026. Registration opens a week ahead.",
      },
    ],
    languages: ["Mandarin"],
    description:
      "Bangkok's only regular Mandarin-language playgroup that we could find. Circle time, crafts and sensory play are all conducted in Mandarin by fluent teachers, with a snack break and indoor free play at the end. Children do not need to speak any Mandarin to join.",
    worthKnowing:
      "Billed as every Friday, but the current calendar shows sessions about every other week. Bring ID, as the venue asks for it.",
    bookingRequired: true,
    bookingUrl: "https://bambi.glueup.com/event/195673",
    website: "https://www.nancylanguageclub.com/",
    status: "confirmed",
    sourceUrl: "https://bambi.glueup.com/event/195673",
    lastVerified: "2026-09-28",
  },
  {
    slug: "little-treehouse-nursery",
    name: "Little Treehouse Playgroup",
    organiser: "Preschool or nursery",
    kind: "Drop-in playgroup",
    venue: "Little Treehouse Nursery",
    address: "41/2 Soi Akkharaphat, Khlong Tan, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    sessions: [
      {
        label: "Parents' group morning",
        days: ["Sat"],
        frequency: "occasional",
        start: "09:00",
        end: "10:30",
        minAgeMonths: 12,
        maxAgeMonths: 3 * Y,
        price: { amount: 400, unit: "session", note: "Per family." },
        note: "Next session: Sat 10 Oct 2026.",
      },
      {
        label: "Nursery's own playgroup",
        days: ["Fri", "Sat"],
        frequency: "monthly",
        start: "09:30",
        end: "11:00",
        price: { amount: 750, unit: "session", note: "One child and one adult." },
      },
    ],
    languages: ["English"],
    description:
      "A small nursery that runs its own monthly playgroup and also hosts a parent-run group. Mornings mix circle time, a story, playdough, free play and a sensory or art activity pitched to each age group.",
    worthKnowing:
      "The parents' group session is about half the price of the nursery's own session.",
    bookingRequired: true,
    bookingUrl: "https://bambi.glueup.com/event/195992",
    status: "confirmed",
    sourceUrl: "https://bambi.glueup.com/event/195992",
    lastVerified: "2026-09-28",
  },

  // ----------------------------------------------------- International schools
  {
    slug: "ascot-little-lion-playgroup",
    name: "Little Lion Playgroup, Ascot International School",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "Ascot International School",
    district: "Ramkhamhaeng",
    zone: "Rama 9 and Ramkhamhaeng",
    sessions: [
      {
        days: ["Tue"],
        frequency: "weekly",
        start: "08:30",
        end: "09:30",
        minAgeMonths: 0,
        maxAgeMonths: 3 * Y,
        price: { amount: 200, unit: "session", note: "Per child, refreshments included. Ascot siblings ฿150." },
        note: "Term time only. This term started Tue 1 Sep 2026.",
      },
    ],
    languages: ["English"],
    description:
      "An early, short and inexpensive weekly session run by Ascot's Early Years team, open to babies from birth. It reflects the school's play-based, child-led approach, and doubles as a gentle introduction to the Early Years building for families considering the school.",
    worthKnowing:
      "One guardian per child, and an adult must stay with the child throughout. At ฿200 it is one of the cheapest school-run playgroups in Bangkok.",
    bookingRequired: true,
    website: "https://ascot.ac.th/en/playgroup-2026/",
    schoolSlug: "ascot-international-school",
    status: "confirmed",
    sourceUrl: "https://ascot.ac.th/en/playgroup-2026/",
    lastVerified: "2026-09-28",
  },
  {
    slug: "bangkok-prep-pups-playgroup",
    name: "Prep's Pups Playgroup, Bangkok Prep",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "Bangkok Prep",
    address: "77 Soi Sukhumvit 77, Phra Khanong Nuea, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    sessions: [
      {
        label: "Little Pups",
        days: ["Sat"],
        frequency: "weekly",
        start: "08:30",
        end: "10:00",
        minAgeMonths: 12,
        maxAgeMonths: 3 * Y,
        note: "From walking age.",
        price: { amount: 500, unit: "session" },
      },
      {
        label: "Big Pups",
        days: ["Sat"],
        frequency: "weekly",
        start: "10:30",
        end: "12:00",
        minAgeMonths: 3 * Y,
        maxAgeMonths: 5 * Y,
        price: { amount: 500, unit: "session" },
      },
    ],
    languages: ["English"],
    description:
      "Two Saturday morning sessions split by age, designed by a dedicated playgroup leader: Little Pups for walkers to three, with music, movement and creative play, and Big Pups for three to fives, who get bigger challenges. A parent or carer stays throughout. It is one of the few school playgroups that caters for three to five year olds.",
    worthKnowing:
      "Registration for the following week opens every Saturday at 12.15pm in term time and closes when each class fills, so set a reminder. Sessions are 500 baht each. The school also offers an annual membership, which includes free registration for families planning to apply to Bangkok Prep.",
    bookingRequired: true,
    bookingUrl: "https://forms.gle/bk7VtGqGmbZyLaWbA",
    lineId: "@622zeadm",
    email: "playgroup@bkkprep.ac.th",
    website: "https://www.bangkokprep.ac.th/news-events/prep-pups-playgroup",
    schoolSlug: "bangkok-prep",
    status: "confirmed",
    confirmedByOrganiser: true,
    sourceUrl: "https://www.bangkokprep.ac.th/news-events/prep-pups-playgroup",
    lastVerified: "2026-10-05",
  },
  {
    slug: "bangkok-patana-tiny-tigers",
    name: "Tiny Tigers Playgroup, Bangkok Patana",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "Bangkok Patana School, Foundation Stage",
    address: "643 Lasalle Road (Sukhumvit 105), Bang Na",
    district: "Bang Na",
    zone: "Bang Na and east",
    sessions: [
      {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        frequency: "weekly",
        minAgeMonths: 12,
        maxAgeMonths: 3 * Y,
        note: "Every weekday morning in term. Exact times on request.",
      },
    ],
    languages: ["English"],
    description:
      "A flexible, every-morning playgroup in Patana's Nursery learning environment and Foundation Stage garden, led by a specialist Early Years teacher. Children from one year old come with a parent or carer, and families are encouraged to share songs and greetings in their home languages.",
    worthKnowing:
      "Patana does not publish session times or a price online. Email admissions to register.",
    bookingRequired: true,
    email: "admissions@patana.ac.th",
    website: "https://www.patana.ac.th/learning-at-patana/primary-school/foundation-stage/",
    schoolSlug: "bangkok-patana-school",
    status: "confirmed",
    sourceUrl: "https://www.patana.ac.th/learning-at-patana/primary-school/foundation-stage/",
    lastVerified: "2026-09-28",
  },
  {
    slug: "st-andrews-little-bunnies",
    name: "Little Bunnies Playgroup, St Andrews Bangkok",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "St Andrews International School Bangkok, Primary School",
    address: "9 Pridi Banomyong 20/1, Sukhumvit 71, Phra Khanong Nuea, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "School shuttle from Gateway Ekkamai",
    sessions: [
      {
        days: ["Tue"],
        frequency: "weekly",
        start: "12:30",
        end: "13:45",
        minAgeMonths: 0,
        maxAgeMonths: 3 * Y,
        price: { free: true, unit: "session" },
        note: "Occasional Saturday pop-ups too.",
      },
    ],
    languages: ["English"],
    description:
      "A free weekly playgroup run by qualified teachers at the Nord Anglia St Andrews primary campus on Sukhumvit 71. Water and snacks are provided. Places are limited, so registration is required each term.",
    worthKnowing:
      "The school has announced its Autumn 2026 sessions. The Tuesday lunchtime slot is the one it has run for several years, so confirm the current time when you register. Not to be confused with the separate Cognita-run St Andrews schools in Sathorn, Dusit and Sukhumvit 107.",
    bookingRequired: true,
    bookingUrl: "http://bit.ly/stabunnies",
    website: "https://www.nordangliaeducation.com/sta-bangkok/news",
    schoolSlug: "st-andrews-international-school-bangkok",
    status: "check",
    sourceUrl: "https://www.bambiweb.org/non-bambi-playgroups/st-andrews-international-school-sukhumvit",
    lastVerified: "2026-09-28",
  },
  {
    slug: "st-andrews-sathorn-friday-playgroup",
    name: "Friday Playgroup, St. Andrews Sathorn",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "St. Andrews International School Sathorn",
    address: "9 Sathorn Soi 4, North Sathorn Road, Bang Rak",
    district: "Bang Rak",
    zone: "Central",
    sessions: [
      {
        days: ["Fri"],
        frequency: "weekly",
        start: "08:30",
        end: "09:30",
        minAgeMonths: 8,
        maxAgeMonths: 2 * Y,
        price: { amount: 300, unit: "session", note: "Snack included." },
        note: "Not on school or public holidays.",
      },
    ],
    languages: ["English"],
    description:
      "A calm, child-led Friday session for babies and young toddlers, with stories, songs and rhymes, sensory play, crawling and climbing, and simple crafts. It is one of the few playgroups aimed specifically at under twos, and a chance to meet other Sathorn families and see the Early Years rooms.",
    worthKnowing:
      "The current series began in January 2026. Spaces are limited, so call ahead to confirm this term's dates.",
    bookingRequired: true,
    phone: "02 632 1995 ext 115/116",
    email: "sathorn@standrews-schools.com",
    website: "https://www.standrewssathorn.com/friday-playgroup-for-young-children/",
    schoolSlug: "st-andrews-international-school-sathorn",
    status: "check",
    sourceUrl: "https://www.standrewssathorn.com/friday-playgroup-for-young-children/",
    lastVerified: "2026-09-28",
  },
  {
    slug: "st-andrews-sukhumvit-107-teddies",
    name: "Teddies Playgroup, St. Andrews Sukhumvit 107",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "St. Andrews International School Sukhumvit 107",
    address: "7 Sukhumvit 107 Road, Bang Na",
    district: "Bang Na",
    zone: "Bang Na and east",
    transit: "BTS Bearing, a one minute walk",
    sessions: [
      {
        frequency: "weekly",
        minAgeMonths: 8,
        maxAgeMonths: 2 * Y + 6,
      },
    ],
    languages: ["English"],
    description:
      "Play-based mornings in a dedicated playgroup building, led by playgroup leader Ms Alex Rogan, with a rotating set of themed activities for sensory development, motor skills and social confidence. It is the easiest school playgroup to reach by BTS.",
    worthKnowing:
      "The school describes Teddies as its preparation programme for Early Years but does not publish days, times or prices. It also runs free Saturday pop-up sessions for new families. Email the playgroup leader for the current timetable.",
    bookingRequired: true,
    email: "arogan@standrews-schools.com",
    website: "https://www.standrewssukhumvit.com/",
    schoolSlug: "st-andrews-international-school-sukhumvit-107",
    status: "check",
    sourceUrl: "https://www.bkkkids.com/blog/where-to-find-awesome-kids-playgroups-in-bangkok/",
    lastVerified: "2026-09-28",
  },
  {
    slug: "st-andrews-dusit-playgroup",
    name: "Dusit Playgroup, St. Andrews Dusit",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "St. Andrews International School Dusit",
    address: "253/1 Sawankhalok Road, Suan Chitlada, Dusit",
    district: "Dusit",
    zone: "North",
    transit: "Close to Victory Monument and Ari",
    sessions: [
      {
        days: ["Wed"],
        frequency: "weekly",
        start: "12:30",
        end: "14:00",
        minAgeMonths: 12,
        maxAgeMonths: 3 * Y,
        price: { amount: 250, unit: "session", note: "St Andrews Dusit families ฿100." },
        note: "Runs in blocks of about five weeks per term.",
      },
    ],
    languages: ["English"],
    description:
      "A Wednesday afternoon playgroup run in short blocks each term, with social and motor skill activities in the school's indoor and outdoor spaces. It is one of very few playgroups in the north of the city.",
    worthKnowing:
      "St Andrews Dusit families get priority booking before places open to the public, so sign-ups can fill fast. The last published block ran through September, so check for the next one.",
    bookingRequired: true,
    bookingUrl: "https://forms.gle/9vDAvTQswV8L4c1t9",
    phone: "02 668 6231",
    email: "Dusit@standrews-schools.com",
    website: "https://www.standrewsdusit.com/",
    schoolSlug: "st-andrews-international-school-dusit",
    status: "check",
    sourceUrl: "https://www.bkkkids.com/blog/where-to-find-awesome-kids-playgroups-in-bangkok/",
    lastVerified: "2026-09-28",
  },
  {
    slug: "shrewsbury-city-campus-starfish",
    name: "Starfish Playgroup, Shrewsbury Bangkok City Campus",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "Shrewsbury International School Bangkok, City Campus",
    address: "982 Rim Khlong Samsen Road, Rama 9, Huai Khwang",
    district: "Huai Khwang",
    zone: "Rama 9 and Ramkhamhaeng",
    sessions: [
      {
        days: ["Wed", "Thu"],
        frequency: "weekly",
        start: "13:45",
        end: "15:15",
        minAgeMonths: 12,
        maxAgeMonths: 3 * Y,
        price: { amount: 400, unit: "session", note: "Healthy snacks included." },
      },
    ],
    languages: ["English", "Thai"],
    description:
      "Shrewsbury Starfish Playgroup runs every Wednesday and Thursday, 1.45pm to 3.15pm, for children aged 1 to 3. Explore the gardens, splash around in the splash pool, sing songs, read stories and enjoy some quality time playing with your child.",
    worthKnowing:
      "A parent must attend, and nannies cannot bring children on their own.",
    bookingRequired: true,
    bookingUrl: "https://shcplaygroupbooking.paperform.co/",
    phone: "02 203 1222",
    website: "https://www.shrewsbury.ac.th/city-campus/playgroup/",
    schoolSlug: "shrewsbury-international-school-bangkok",
    status: "confirmed",
    sourceUrl: "https://www.shrewsbury.ac.th/city-campus/playgroup/",
    lastVerified: "2026-10-07",
  },
  {
    slug: "shrewsbury-riverside-playgroup",
    name: "Riverside Playgroup, Shrewsbury Bangkok",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "Shrewsbury International School Bangkok, Riverside",
    address: "1922 Charoen Krung Road, Wat Phraya Krai, Bang Kho Laem",
    district: "Bang Kho Laem",
    zone: "Central",
    transit: "Free shuttle boat from Sathorn Pier (BTS Saphan Taksin)",
    sessions: [
      {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        frequency: "weekly",
        start: "09:00",
        end: "11:00",
        minAgeMonths: 12,
        maxAgeMonths: 4 * Y,
        price: { amount: 350, unit: "session", note: "Per child." },
      },
    ],
    languages: ["English"],
    description:
      "The most frequent school playgroup in Bangkok: every weekday morning in Shrewsbury Riverside's Early Years building, with a ten-day rotation of soft play, splash play, the Early Years garden, a riverside picnic, cookery and ball games. Every session ends with a story and snack.",
    worthKnowing:
      "One parent or grandparent per child, and no nannies. Registration forms reopen weekly and close when each day is full, capped at around ten children a session.",
    bookingRequired: true,
    bookingUrl: "https://bit.ly/3W908Ay",
    email: "shrplaygroup@shrewsbury.ac.th",
    phone: "02 675 1888",
    website: "https://www.shrewsbury.ac.th/riverside-campus/playgroup/",
    schoolSlug: "shrewsbury-international-school-bangkok",
    status: "check",
    sourceUrl: "https://www.shrewsbury.ac.th/riverside-campus/playgroup/",
    lastVerified: "2026-09-28",
  },
  {
    slug: "regents-langsuan-toddler-playgroup",
    name: "Toddler Playgroup, Regent's Langsuan",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "Regent's International School, Langsuan Campus",
    address: "65 Soi Langsuan, Lumphini, Pathum Wan",
    district: "Pathum Wan",
    zone: "Central",
    sessions: [
      {
        days: ["Mon", "Tue", "Thu", "Fri"],
        frequency: "weekly",
        start: "09:00",
        end: "10:30",
        minAgeMonths: 8,
        maxAgeMonths: 3 * Y,
      },
    ],
    languages: ["English"],
    description:
      "Four mornings a week at Regent's Early Years-only campus off Langsuan, with music, messy and sensory play, water play and swimming, storytelling and outdoor exploration, all mapped to the British EYFS. Right in the centre of town, near Chit Lom and Lumphini Park.",
    worthKnowing: "Places are limited. Regent's does not publish the session price for Langsuan.",
    bookingRequired: true,
    bookingUrl: "https://forms.gle/dMEWbH2wPdrzPV3PA",
    phone: "086 391 9888",
    lineId: "@regents_langsuan",
    email: "admissions_ls@regents.ac.th",
    website: "https://www.nordangliaeducation.com/risb-bangkok/news/toddler-playgroup-at-regents-international-school",
    schoolSlug: "regents-international-school-bangkok",
    status: "confirmed",
    sourceUrl: "https://www.nordangliaeducation.com/risb-bangkok/news/toddler-playgroup-at-regents-international-school",
    lastVerified: "2026-09-28",
  },
  {
    slug: "regents-rama-9-toddler-playgroup",
    name: "Toddler Playgroup, Regent's Rama 9",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "Regent's International School, Rama 9 Campus",
    address: "601/100 Soi Ramkhamhaeng 39 (Tapleela 1), Wang Thonglang",
    district: "Wang Thonglang",
    zone: "Rama 9 and Ramkhamhaeng",
    sessions: [
      {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        frequency: "weekly",
        start: "09:30",
        end: "11:00",
        minAgeMonths: 8,
        maxAgeMonths: 2 * Y,
        price: { amount: 400, unit: "session" },
        note: "Limited to 10 children a session.",
      },
    ],
    languages: ["English"],
    description:
      "Weekday toddler sessions at Regent's Rama 9 campus, run by British staff in a purpose-built play area, with outdoor play so bring a hat. Children must attend with a parent or nanny, and everything is in English.",
    worthKnowing: "Book one to three days in advance, as each session takes only 10 children.",
    bookingRequired: true,
    bookingUrl: "https://forms.cloud.microsoft/r/ztAf2a2mWV",
    phone: "02 957 5777 ext 212",
    lineId: "@regentsschoolbkk",
    email: "admissions-bkk@regents.ac.th",
    website: "https://www.nordangliaeducation.com/risb-bangkok/academic-excellence/early-years",
    schoolSlug: "regents-international-school-bangkok",
    status: "confirmed",
    confirmedByOrganiser: true,
    sourceUrl: "https://www.nordangliaeducation.com/risb-bangkok/academic-excellence/early-years",
    lastVerified: "2026-10-05",
  },
  {
    slug: "brighton-college-bright-start",
    name: "Bright Start Parent and Toddler Group, Brighton College Bangkok",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "Brighton College Bangkok (Krungthep Kreetha)",
    address: "8/8 Krungthep Kreetha 15/1, Hua Mak, Bang Kapi",
    district: "Bang Kapi",
    zone: "Rama 9 and Ramkhamhaeng",
    sessions: [
      {
        days: ["Tue", "Thu"],
        frequency: "weekly",
        start: "07:30",
        end: "09:30",
        minAgeMonths: 12,
        maxAgeMonths: 3 * Y,
        price: { amount: 300, unit: "session" },
        note: "Term time only.",
      },
    ],
    languages: ["English"],
    description:
      "Brighton College's parent and toddler group for children too young for its Pre-Nursery, led by qualified British teachers. One adult per child. The school's newer Vibhavadi campus also holds occasional Early Years stay and play mornings.",
    worthKnowing:
      "The listed start time is unusually early, and no snacks are provided. Register online and the school calls to confirm your place.",
    bookingRequired: true,
    bookingUrl: "https://forms.gle/dSs2xgYNWMjV13Qk9",
    phone: "02 136 7898",
    lineId: "@brightoncollegebkk",
    email: "Admissions@brightoncollege.ac.th",
    website: "https://www.brightoncollege.ac.th/",
    schoolSlug: "brighton-college-bangkok",
    status: "check",
    sourceUrl: "https://www.bambiweb.org/non-bambi-playgroups/brighton-college-bangkok",
    lastVerified: "2026-09-28",
  },
  {
    slug: "harrow-lion-cubs-parent-toddler",
    name: "Lion Cubs Parent and Toddler, Harrow Bangkok",
    organiser: "International school",
    kind: "Class or course",
    venue: "Harrow International School Bangkok, Little Lions Early Years Centre",
    address: "45 Soi Kosumruamchai 14, Don Mueang",
    district: "Don Mueang",
    zone: "North",
    sessions: [
      {
        frequency: "weekly",
        minAgeMonths: 18,
        maxAgeMonths: 2 * Y + 6,
        price: { amount: 146300, unit: "year", note: "Two sessions a week, paid by term." },
        note: "Two sessions a week.",
      },
    ],
    languages: ["English"],
    description:
      "Not a drop-in: Harrow's Lion Cubs is the first year group of its Early Years centre, and the Parent Toddler option is an enrolled programme of two accompanied sessions a week. It suits families who are already set on Harrow and want the earliest possible start.",
    worthKnowing:
      "Children can join from 18 months, provided they turn two within that academic year. Toddler-only half-day and full-day Lion Cubs places cost considerably more.",
    email: "admissions@harrowschool.ac.th",
    website: "https://www.harrowschool.ac.th/admissions/tuition-fees",
    schoolSlug: "harrow-international-school-bangkok",
    status: "check",
    sourceUrl: "https://www.harrowschool.ac.th/admissions/tuition-fees",
    lastVerified: "2026-09-28",
  },
  {
    slug: "wycombe-abbey-little-doves",
    name: "Little Doves Playdate, Wycombe Abbey Bangkok",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "Wycombe Abbey International School Bangkok",
    address: "Thana City, Bang Chalong, Bang Phli, Samut Prakan",
    district: "Bang Phli",
    zone: "Bang Na and east",
    sessions: [
      {
        frequency: "monthly",
        start: "09:00",
        end: "11:00",
        minAgeMonths: 2 * Y,
        maxAgeMonths: 5 * Y,
        note: "Ten family places per session.",
      },
    ],
    languages: ["English"],
    description:
      "A monthly two-hour playdate on the new Wycombe Abbey campus near Suvarnabhumi, with Reggio Emilia inspired activities, sensory play and a story, hosted by the Early Years team. Aimed at two to fives, older than most playgroups.",
    worthKnowing:
      "Only ten families per session. The school also runs short Early Years stay and play mornings for the same age group.",
    bookingRequired: true,
    bookingUrl: "https://playgroup.wycombeabbey.ac.th/",
    website: "https://playgroup.wycombeabbey.ac.th/",
    schoolSlug: "wycombe-abbey-international-school-bangkok",
    status: "check",
    sourceUrl: "https://playgroup.wycombeabbey.ac.th/",
    lastVerified: "2026-09-28",
  },
  {
    slug: "ris-swiss-section-spielzwerge",
    name: "Spielzwerge German Playgroup, RIS Swiss Section",
    organiser: "International school",
    kind: "Drop-in playgroup",
    venue: "RIS Swiss Section, Deutschsprachige Schule Bangkok",
    address: "6/1 Ramkhamhaeng 184 Road, Min Buri",
    district: "Min Buri",
    zone: "Rama 9 and Ramkhamhaeng",
    sessions: [
      {
        days: ["Mon", "Tue", "Wed", "Thu"],
        frequency: "weekly",
        start: "14:30",
        end: "16:00",
        minAgeMonths: 2 * Y,
        maxAgeMonths: 3 * Y,
        language: ["German"],
      },
    ],
    languages: ["German"],
    description:
      "The German-language playgroup at the Swiss Section of Ruamrudee International School, and the only German playgroup in Bangkok we could find. Afternoon sessions for two to three year olds.",
    worthKnowing: "Details come from an older listing and the price is not published. Contact the school before going.",
    status: "check",
    sourceUrl: "https://www.bambiweb.org/non-bambi-playgroups?page=1",
    lastVerified: "2026-09-28",
  },

  // ---------------------------------------------------- Preschools and nurseries
  {
    slug: "kids-academy-ekkamai-playgroup",
    name: "Busy Bees Playgroup, Kids' Academy Ekkamai",
    organiser: "Preschool or nursery",
    kind: "Drop-in playgroup",
    venue: "Kids' Academy International School, Ekkamai",
    address: "52/1-2 Sukhumvit 63 (Ekkamai Soi 2), Phra Khanong Nuea, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    sessions: [
      {
        days: ["Tue", "Thu", "Fri", "Sat"],
        frequency: "weekly",
        start: "09:30",
        end: "11:30",
        minAgeMonths: 12,
        maxAgeMonths: 3 * Y,
        price: { amount: 550, unit: "session", note: "Or ฿5,500 for 11 sessions." },
        note: "Led by Ms Deah.",
      },
    ],
    languages: ["English"],
    description:
      "Structured like the school's nursery class, with circle time songs and dancing, sing-along story time, a puppet show, water play and parachute play, and sessions in a Snoezelen multisensory room. The routine changes each day, so it rewards coming more than once a week.",
    worthKnowing:
      "Book in advance, as sessions are capped at 16 children except for special events. The Saturday session makes it one of the few weekend options.",
    bookingRequired: true,
    email: "playgroup@kidsacademy.ac.th",
    phone: "084 071 1115",
    lineId: "kidsacademyplaygroup",
    facebook: "https://www.facebook.com/kidsacademy.bkk",
    schoolSlug: "kids-academy-international-school",
    status: "confirmed",
    confirmedByOrganiser: true,
    sourceUrl: "https://www.facebook.com/kidsacademy.bkk",
    lastVerified: "2026-10-05",
    finePrint: "Ask about discount for BAMBI members.",
  },
  {
    slug: "kids-academy-srinakarin-playgroup",
    name: "Toddler Playgroup, Kids' Academy Srinakarin",
    organiser: "Preschool or nursery",
    kind: "Drop-in playgroup",
    venue: "Kids' Academy International School, Imagination Campus",
    address: "Srinakarin Soi 57, Prawet",
    district: "Prawet",
    zone: "Bang Na and east",
    sessions: [
      {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        frequency: "weekly",
        start: "09:30",
        end: "11:30",
        minAgeMonths: 12,
        maxAgeMonths: 2 * Y + 6,
      },
    ],
    languages: ["English"],
    description:
      "An every-weekday playgroup at Kids' Academy's Srinakarin campus, led by a dedicated playgroup leader, with messy play, sensory exploration, cooking, art, music and movement. One of very few daily options on the Srinakarin side of the city.",
    worthKnowing: "Price not published. The age range tops out at two and a half.",
    bookingRequired: true,
    schoolSlug: "kids-academy-international-school",
    status: "check",
    sourceUrl: "https://www.bkkkids.com/blog/where-to-find-awesome-kids-playgroups-in-bangkok/",
    lastVerified: "2026-09-28",
  },
  {
    slug: "kids-kingdom-ruamrudee-playgroup",
    name: "Saturday Playgroup, Kids Kingdom Ruamrudee",
    organiser: "Preschool or nursery",
    kind: "Drop-in playgroup",
    venue: "Kids Kingdom Ruamrudee International Kindergarten",
    address: "63/2 Soi Ruamrudee 3, Ploenchit Road, Lumphini, Pathum Wan",
    district: "Pathum Wan",
    zone: "Central",
    sessions: [
      {
        days: ["Sat"],
        frequency: "weekly",
        start: "09:15",
        end: "11:15",
        minAgeMonths: 15,
        maxAgeMonths: 3 * Y,
        price: { amount: 600, unit: "session", note: "Five and ten session packages are cheaper." },
      },
    ],
    languages: ["English"],
    description:
      "A themed Saturday morning for toddlers and their parents, with creative arts and dramatic play, block play, sensory and manipulative play, language and physical activities, all aimed at building self-help skills before preschool. Central and walkable from Ploenchit.",
    bookingRequired: true,
    facebook: "https://www.facebook.com/kidskingdomruamrudee/",
    website: "https://kidskingdom.ac.th/programs/",
    status: "confirmed",
    confirmedByOrganiser: true,
    sourceUrl: "https://www.facebook.com/kidskingdomruamrudee/",
    lastVerified: "2026-10-05",
  },
  {
    slug: "kids-kingdom-sukhumvit-47-playgroup",
    name: "Monday Playgroup, Kids Kingdom Sukhumvit 47",
    organiser: "Preschool or nursery",
    kind: "Drop-in playgroup",
    venue: "Kids Kingdom International Kindergarten, Sukhumvit 47",
    address: "22, 22/1 Sukhumvit Soi 47, Khlong Tan Nuea, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    sessions: [
      {
        days: ["Mon"],
        frequency: "weekly",
        start: "09:00",
        end: "11:15",
        minAgeMonths: 15,
        maxAgeMonths: 3 * Y,
        price: { amount: 600, unit: "session", note: "6 sessions 3,300 baht, 10 sessions 5,400 baht. Packages never expire. Snack provided." },
      },
    ],
    languages: ["English"],
    description:
      "The Sukhumvit 47 sister to the Ruamrudee session, running on Monday mornings for toddlers from 15 months to three. The morning starts outdoors with swings, slides, sand, cycling, water and messy play, alongside indoor role play, play dough, blocks and a reading corner. Then come music and movement with instruments, a provided snack, and songs, stories, puppets, crafts and parachute and bubble time before goodbye at 11.15.",
    worthKnowing: "Book in advance. Six and ten session packages bring the price down to 550 and 540 baht a session, and they never expire, so missed Mondays are not wasted. Special Saturday playgroups are announced on the school's Facebook page.",
    bookingRequired: true,
    email: "info@kidskingdom.ac.th",
    phone: "02 258 7242",
    website: "https://kidskingdom.ac.th/campuses/sukhumvit-47/",
    status: "confirmed",
    confirmedByOrganiser: true,
    sourceUrl: "https://kidskingdom.ac.th/campuses/sukhumvit-47/",
    lastVerified: "2026-10-06",
    finePrint: "Ask about discount for BAMBI members.",
  },
  {
    slug: "annabels-saturday-playgroup",
    name: "Saturday Playgroup, Annabel's Early Years",
    organiser: "Preschool or nursery",
    kind: "Drop-in playgroup",
    venue: "Annabel's Nursery",
    address: "19 Ekamai Soi 10, Sukhumvit 63, Phra Khanong Nuea, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    sessions: [
      {
        days: ["Sat"],
        frequency: "weekly",
        start: "09:30",
        end: "11:30",
        minAgeMonths: 6,
        maxAgeMonths: 3 * Y,
        price: { amount: 600, unit: "session", note: "Second sibling 400 baht." },
      },
    ],
    languages: ["English"],
    description:
      "Saturday morning sessions at Annabel's leafy Ekamai nursery for babies and toddlers from six months to three, led by qualified Early Years teachers. Children explore the mud kitchen and sandpit, get stuck into messy painting and small-world play, and spend time in the sensory room. Parking on site, and a chance for parents to meet while children play.",
    bookingRequired: true,
    bookingUrl: "https://annabels.ac.th/playgroups",
    email: "annabels@annabels.ac.th",
    phone: "02 391 8181",
    website: "https://www.annabels.ac.th/",
    schoolSlug: "annabels-early-years-international-school",
    status: "confirmed",
    confirmedByOrganiser: true,
    sourceUrl: "https://annabels.ac.th/playgroups",
    lastVerified: "2026-10-05",
    finePrint: "Ask about discount for BAMBI members.",
  },
  {
    slug: "abc-pathways-playgroup",
    name: "English and Mandarin Playgroups, ABC Pathways",
    organiser: "Preschool or nursery",
    kind: "Drop-in playgroup",
    venue: "ABC Pathways School",
    district: "Call for address",
    zone: "Sukhumvit",
    sessions: [
      {
        label: "English playgroup",
        days: ["Mon", "Wed"],
        frequency: "weekly",
        start: "09:30",
        end: "11:30",
        price: { amount: 450, unit: "session", note: "Snacks and craft materials included." },
      },
      {
        label: "Mandarin playgroup",
        days: ["Thu"],
        frequency: "weekly",
        start: "09:30",
        end: "11:30",
        price: { amount: 450, unit: "session" },
        language: ["Mandarin"],
      },
    ],
    languages: ["English", "Mandarin"],
    description:
      "Theme-based sessions built around twelve topics such as pets, family and musical instruments, with free play, snack, songs, story time, creative art, sensory play and early STEAM. One of only two places offering a Mandarin playgroup.",
    worthKnowing: "Tell the school which day you want and it will hold a place. Age range not published.",
    bookingRequired: true,
    email: "enquiry@abcpathways.co.th",
    phone: "02 260 6888",
    status: "check",
    sourceUrl: "https://www.bkkkids.com/blog/where-to-find-awesome-kids-playgroups-in-bangkok/",
    lastVerified: "2026-09-28",
  },
  {
    slug: "storytime-preschool-playgroup",
    name: "Mum & Me Playgroup at Storytime",
    organiser: "Preschool or nursery",
    kind: "Drop-in playgroup",
    venue: "Storytime Preschool",
    address: "85 Soi Samahan, Sukhumvit Soi 4",
    district: "Sukhumvit Soi 4",
    zone: "Sukhumvit",
    transit: "Free shuttle from BTS Nana (Sukhumvit Soi 6)",
    sessions: [
      {
        label: "Mum & Me Playgroup",
        days: ["Wed"],
        frequency: "weekly",
        start: "09:30",
        end: "11:00",
        minAgeMonths: 8,
        maxAgeMonths: 3 * Y + 6,
        price: { amount: 300, unit: "session" },
      },
      {
        label: "Monthly Saturday playgroup",
        days: ["Sat"],
        frequency: "monthly",
        start: "09:30",
        end: "11:30",
        minAgeMonths: 0,
        maxAgeMonths: 4 * Y,
        price: { amount: 250, to: 300, unit: "session", note: "Per child." },
      },
    ],
    languages: ["English"],
    description:
      "Every Wednesday morning, Storytime's teachers lead hands-on indoor and outdoor activities to spark curiosity and a love of learning. Sessions are semi-structured and theme-based, with gardening, light baking, Montessori activities, and music and movement, plus snack time and free play. Coffee and tea are on for parents, and children take home every craft they make.",
    worthKnowing:
      "The free shuttle leaves BTS Nana from about 9.15am and brings you back at 11am. Parking at the school is very limited.",
    bookingRequired: true,
    schoolSlug: "storytime-preschool",
    bookingUrl: "https://www.storytimepreschool.com/playgroups",
    phone: "081 646 4535",
    facebook: "https://www.facebook.com/storytimepreschool",
    website: "https://www.storytimepreschool.com/playgroups",
    status: "confirmed",
    confirmedByOrganiser: true,
    sourceUrl: "https://www.storytimepreschool.com/playgroups",
    lastVerified: "2026-10-07",
    finePrint: "Ask about discount for BAMBI members.",
  },
  {
    slug: "hei-music-club",
    name: "HEI Music Club, HEI Schools Bangkok",
    organiser: "Preschool or nursery",
    kind: "Class or course",
    venue: "HEI Schools Bangkok, Sukhumvit",
    address: "32 Sukhumvit 36, Khlong Tan, Khlong Toei",
    district: "Khlong Toei",
    zone: "Sukhumvit",
    sessions: [
      {
        label: "Tiny Tots",
        days: ["Sat"],
        frequency: "weekly",
        start: "09:00",
        end: "09:40",
        minAgeMonths: 10,
        maxAgeMonths: 2 * Y,
        price: { amount: 1000, unit: "session", note: "Or ฿5,400 for the full six-session course." },
      },
      {
        label: "Eager Explorers",
        days: ["Sat"],
        frequency: "weekly",
        start: "10:15",
        end: "11:05",
        minAgeMonths: 2 * Y,
        maxAgeMonths: 3 * Y,
        price: { amount: 1000, unit: "session", note: "Or ฿5,400 for the full six-session course." },
      },
    ],
    languages: ["English"],
    description:
      "A parent and child music class built on Finnish early childhood education, with a new theme each term. Children explore sounds, rhythm and instruments while working on motor, language and social skills. Capped at ten families a session.",
    worthKnowing:
      "This term's programme, Musical Adventures with Favourite Characters, runs on Saturdays 31 October, 7, 14, 21 and 28 November, and 12 December 2026.",
    bookingRequired: true,
    bookingUrl: "https://tinyurl.com/HEIMusicClubTerm1Year26-27",
    facebook: "https://www.facebook.com/share/p/19hMyY1VKp/",
    website: "https://www.heibangkok.com/hei-club",
    status: "confirmed",
    confirmedByOrganiser: true,
    sourceUrl: "https://www.heibangkok.com/hei-club",
    lastVerified: "2026-10-05",
  },
  {
    slug: "firefly-forest-school-playgroup",
    name: "Nature Playgroup, Firefly Forest School",
    organiser: "Preschool or nursery",
    kind: "Drop-in playgroup",
    venue: "Firefly Forest School",
    address: "Lat Phrao 35, Chatuchak",
    district: "Chatuchak",
    zone: "North",
    sessions: [
      {
        label: "Friday Seedlings",
        days: ["Fri"],
        frequency: "weekly",
        start: "10:00",
        end: "12:00",
        minAgeMonths: 18,
        maxAgeMonths: 2 * Y + 6,
        price: { amount: 1250, unit: "session", note: "Snacks and materials included." },
      },
      {
        label: "Saturday Explorers",
        days: ["Sat"],
        frequency: "weekly",
        start: "10:00",
        end: "12:00",
        minAgeMonths: 3 * Y,
        maxAgeMonths: 6 * Y,
        price: { amount: 1250, unit: "session", note: "Snacks and materials included." },
      },
    ],
    languages: ["English", "Thai"],
    description:
      "Bangkok's forest school option: two hours of mud, grass, sensory stations and songs in an enclosed natural setting. Fridays are a gentle, slow-paced group for young toddlers, and Saturdays are a more adventurous group for three to sixes. Bilingual Thai and English.",
    worthKnowing:
      "The most expensive drop-in playgroup in this directory, but no commitment is needed and the Saturday group is one of very few for children over three. Book via LINE.",
    bookingRequired: true,
    website: "https://firefly-forest-school.com/play-groups/",
    status: "confirmed",
    sourceUrl: "https://firefly-forest-school.com/play-groups/",
    lastVerified: "2026-09-28",
  },
  {
    slug: "outdoor-school-bangkok-playgroup",
    name: "Outdoor Playgroup, Outdoor School Bangkok",
    organiser: "Preschool or nursery",
    kind: "Drop-in playgroup",
    venue: "Outdoor School Bangkok",
    address: "Sukhumvit 46, Phra Khanong",
    district: "Khlong Toei",
    zone: "Sukhumvit",
    transit: "BTS Phra Khanong, a 5 minute walk",
    sessions: [
      {
        days: ["Thu"],
        frequency: "weekly",
        start: "10:00",
        end: "11:00",
        minAgeMonths: 6,
        maxAgeMonths: 3 * Y,
      },
    ],
    languages: ["English"],
    description:
      "An outdoor, nature-based hour with monthly themes guiding the stories, songs and play, gentle and sensory rather than busy. Children feel grass underfoot and meet the resident turtle, which is rare in central Bangkok.",
    worthKnowing: "Book through LINE on 097 092 0924. Price not published.",
    bookingRequired: true,
    phone: "097 092 0924",
    website: "https://outdoorschoolbangkok.com/programs/",
    status: "check",
    sourceUrl: "https://www.bambiweb.org/non-bambi-playgroups/outdoor-school-bangkok-0",
    lastVerified: "2026-09-28",
  },
  {
    slug: "first-steps-international-preschool-playgroup",
    name: "English Playgroup, First Steps International Preschool",
    organiser: "Preschool or nursery",
    kind: "Drop-in playgroup",
    venue: "First Steps International Preschool",
    address: "58/2 Sukhumvit 31 (Soi Sawasdee) Yaek 4, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "BTS Phrom Phong or Asok",
    sessions: [
      {
        days: ["Thu"],
        frequency: "weekly",
        start: "10:00",
        end: "11:15",
        minAgeMonths: 8,
        maxAgeMonths: 30,
      },
    ],
    languages: ["English"],
    description:
      "A structured English playgroup run by teaching staff, with main activities changing weekly: arts and crafts, splash day, puppet shows, music, dance and cooking. Families can stay and use the school grounds afterwards.",
    worthKnowing: "Price not published.",
    schoolSlug: "the-first-steps-international-school",
    status: "check",
    sourceUrl: "https://www.bambiweb.org/non-bambi-playgroups/first-steps-international-preschool",
    lastVerified: "2026-09-28",
  },
  {
    slug: "precious-learners-world-playgroup",
    name: "Playgroups, Precious Learners World",
    organiser: "Preschool or nursery",
    kind: "Drop-in playgroup",
    venue: "Precious Learners World Nursery and Kindergarten",
    address: "161/1 Soi Sukhumvit 101/1, Bang Chak, Phra Khanong",
    district: "Phra Khanong",
    zone: "Sukhumvit",
    transit: "Near BTS Punnawithi",
    sessions: [
      {
        days: ["Wed", "Fri"],
        frequency: "weekly",
        start: "10:00",
        minAgeMonths: 12,
        maxAgeMonths: 5 * Y,
        price: { amount: 500, unit: "session", note: "Per child. Siblings ฿400." },
      },
      {
        label: "Saturday playgroup",
        days: ["Sat"],
        frequency: "weekly",
        start: "10:00",
        end: "12:00",
        minAgeMonths: 12,
        maxAgeMonths: 4 * Y,
        price: { amount: 500, unit: "session", note: "Per child." },
      },
    ],
    languages: ["English"],
    description:
      "Themed indoor and outdoor playgroups run by the nursery's teachers, including a Saturday session. Handy for families living out along Sukhumvit toward Punnawithi and Udom Suk.",
    worthKnowing: "These details come from older listings. Confirm the current timetable and price first.",
    status: "check",
    sourceUrl: "https://www.bkkkids.com/listing/plw-funtastic-saturday-playgroups/",
    lastVerified: "2026-09-28",
  },
  {
    slug: "parry-kindergarten-playgroup",
    name: "Friday Playgroup, Parry Kindergarten",
    organiser: "Preschool or nursery",
    kind: "Drop-in playgroup",
    venue: "Parry Kindergarten",
    address: "447 Soi Phetchaburi 47, Bang Kapi, Huai Khwang",
    district: "Huai Khwang",
    zone: "Rama 9 and Ramkhamhaeng",
    sessions: [
      {
        days: ["Fri"],
        frequency: "weekly",
        start: "09:30",
        minAgeMonths: 0,
        maxAgeMonths: 5 * Y,
      },
    ],
    languages: ["English"],
    description: "A Friday morning playgroup at a small kindergarten off Phetchaburi Road, open to children from birth to five.",
    worthKnowing: "Details come from an older listing. Contact the kindergarten before going.",
    status: "check",
    sourceUrl: "https://www.bambiweb.org/non-bambi-playgroups?page=1",
    lastVerified: "2026-09-28",
  },

  // ------------------------------------------------------- Classes and courses
  {
    slug: "julia-gabriel-playnest-playclub",
    name: "PlayNest and PlayClub, Julia Gabriel Centre",
    organiser: "Play centre or cafe",
    kind: "Class or course",
    venue: "Julia Gabriel Centre Bangkok",
    address: "512/1 Soi Ramkhamhaeng 39, Pracha Uthit Road, Wang Thonglang",
    district: "Wang Thonglang",
    zone: "Rama 9 and Ramkhamhaeng",
    sessions: [
      {
        label: "PlayNest",
        frequency: "weekly",
        minAgeMonths: 6,
        maxAgeMonths: 18,
        language: ["English", "Mandarin"],
        note: "90 minutes, twice a week.",
      },
      {
        label: "PlayClub",
        frequency: "weekly",
        minAgeMonths: 18,
        maxAgeMonths: 3 * Y + 6,
        language: ["English", "Mandarin"],
        note: "Two hours, once or twice a week.",
      },
    ],
    languages: ["English", "Mandarin"],
    description:
      "The Bangkok branch of Singapore's Julia Gabriel runs adult-accompanied term programmes built on drama, storytelling, puppets, live music, art and craft. PlayNest is for babies, PlayClub for toddlers, and both are offered in English and Mandarin.",
    worthKnowing: "These are termly enrolments rather than drop-ins, and fees are not published. A free trial class is available.",
    bookingRequired: true,
    phone: "091 919 6222",
    lineId: "@juliagabrielbkk",
    website: "https://juliagabriel.co.th/enrichment/programmes/early-learning-programmes/playclub/",
    status: "check",
    sourceUrl: "https://juliagabriel.co.th/enrichment/programmes/early-learning-programmes/playclub/",
    lastVerified: "2026-09-28",
  },
  {
    slug: "little-pea-kids-commons",
    name: "Playgroups, Little Pea Kids Commons",
    organiser: "Play centre or cafe",
    kind: "Drop-in playgroup",
    venue: "Little Pea Kids Commons, theCOMMONS Thonglor",
    address: "theCOMMONS, Thong Lo Soi 17, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    sessions: [
      {
        label: "Parent & Baby Hangout",
        days: ["Tue", "Thu"],
        frequency: "weekly",
        start: "13:00",
        end: "14:00",
        minAgeMonths: 0,
        maxAgeMonths: 11,
        price: { amount: 550, unit: "session" },
        note: "Sensory play for babies and caregivers through music, movement and touch.",
      },
      {
        label: "Messy & Water Playgroup",
        days: ["Wed", "Fri", "Sun"],
        frequency: "weekly",
        start: "09:30",
        end: "11:00",
        minAgeMonths: 12,
        maxAgeMonths: 3 * Y + 6,
        price: { amount: 550, unit: "session" },
        note: "Outdoor sensory and water play for motor skills and hand-eye coordination.",
      },
      {
        label: "Wild Art & Sensory Playgroup",
        days: ["Mon", "Thu"],
        frequency: "weekly",
        start: "09:30",
        end: "11:00",
        minAgeMonths: 12,
        maxAgeMonths: 3 * Y + 6,
        price: { amount: 550, unit: "session" },
        note: "Shapes, colours and composition through multi-sensory toys, with a piece of art to take home.",
      },
      {
        label: "Preschool Prep Playgroup",
        days: ["Tue"],
        frequency: "weekly",
        start: "10:00",
        end: "11:00",
        minAgeMonths: 12,
        maxAgeMonths: 3 * Y + 6,
        price: { amount: 550, unit: "session" },
        note: "Eases toddlers into a school routine and builds independence.",
      },
      {
        label: "Music & Games Playgroup",
        days: ["Wed"],
        frequency: "weekly",
        start: "15:00",
        end: "16:00",
        minAgeMonths: 12,
        maxAgeMonths: 3 * Y + 6,
        price: { amount: 550, unit: "session" },
        note: "Singing, dancing and sensory games for language, self-expression and teamwork.",
      },
    ],
    languages: ["English"],
    description:
      "Little Pea runs five different playgroups through the week from its space at theCOMMONS Thonglor: a sensory hangout for babies under one, outdoor messy and water play, art and sensory play, a preschool prep session that eases toddlers into a school routine, and an afternoon music and games group.",
    worthKnowing:
      "The baby hangout and the Wednesday music and games group are among the few afternoon playgroups in town, handy around a morning nap. Open 9am to 6pm daily.",
    bookingRequired: true,
    bookingUrl: "https://www.littlepeabkk.com/book-online",
    phone: "065 392 5658",
    lineId: "@littlepeabkk",
    facebook: "https://www.facebook.com/littlepeabkk",
    website: "https://www.littlepeabkk.com/",
    status: "confirmed",
    confirmedByOrganiser: true,
    sourceUrl: "https://www.littlepeabkk.com/book-online",
    lastVerified: "2026-10-05",
  },
  {
    slug: "bumpsy-daisy-little-daisies",
    name: "Little Daisies and Baby Classes, Bumpsy Daisy",
    organiser: "Play centre or cafe",
    kind: "Drop-in playgroup",
    venue: "Bumpsy Daisy Parenting Cafe",
    address: "3/10 Soi Sawasdi 1, Sukhumvit 31, Khlong Toei Nuea, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "BTS Phrom Phong, then about 15 minutes on foot",
    sessions: [
      {
        label: "Little Daisies toddler playgroup",
        days: ["Thu"],
        frequency: "weekly",
        start: "09:30",
        end: "11:30",
        minAgeMonths: 15,
        maxAgeMonths: 3 * Y,
        price: { amount: 300, unit: "session" },
      },
      {
        label: "Tiddly Yoga",
        days: ["Mon"],
        frequency: "weekly",
        start: "10:00",
        end: "11:00",
        minAgeMonths: 12,
        maxAgeMonths: 3 * Y,
        price: { amount: 400, unit: "session" },
      },
    ],
    languages: ["English"],
    description:
      "A parenting cafe and community space near Phrom Phong with a busy timetable of toddler playgroups, music, yoga and cooking sessions for babies and toddlers up to about three, plus antenatal and first aid classes for parents. Cakes are homemade and the space is set up with good quality toys.",
    worthKnowing:
      "The timetable changes month to month and some classes have ended, so check the booking links first. Sessions book out; new classes are usually released on Facebook.",
    bookingRequired: true,
    bookingUrl: "https://linktr.ee/BumpsyDaisy",
    facebook: "https://www.facebook.com/bumpsydaisybkk/",
    status: "check",
    sourceUrl: "https://linktr.ee/BumpsyDaisy",
    lastVerified: "2026-09-28",
  },
  {
    slug: "play-stations-bkk-rama-9",
    name: "Play Station Kidz Club, The Nine Rama 9",
    organiser: "Play centre or cafe",
    kind: "Drop-in playgroup",
    venue: "Play Stations BKK",
    address: "B301, 3rd floor, The Nine Center Rama 9",
    district: "Suan Luang",
    zone: "Rama 9 and Ramkhamhaeng",
    sessions: [
      {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        frequency: "weekly",
        start: "10:00",
        minAgeMonths: 12,
        maxAgeMonths: 7 * Y,
      },
    ],
    languages: ["English"],
    description: "Weekday morning playgroups at an indoor play centre in The Nine mall on Rama 9, with parking on site.",
    worthKnowing: "Details come from an older listing. Contact the centre before going.",
    status: "check",
    sourceUrl: "https://www.bambiweb.org/non-bambi-playgroups?page=1",
    lastVerified: "2026-09-28",
  },
  {
    slug: "gymboree-play-and-music-bangkok",
    name: "Gymboree Play and Music",
    organiser: "Play centre or cafe",
    kind: "Class or course",
    venue: "Branches in Ari, Bang Na, Ramkhamhaeng, Rama 2 and Rama 3",
    district: "Various",
    zone: "Several locations",
    sessions: [
      {
        frequency: "weekly",
        minAgeMonths: 0,
        maxAgeMonths: 6 * Y,
      },
    ],
    languages: ["English", "Thai"],
    description:
      "The American franchise runs structured play, music and preschool-prep classes from newborn to six across several Bangkok branches. Classes are sold as packages and booked by age band, so it works more like a course than a drop-in playgroup.",
    worthKnowing:
      "The Chidlom branch has temporarily moved to Rama 3 and the Sukhumvit branch to Ari. Prices are not published; branches quote on LINE.",
    website: "https://www.gymboreeclasses-th.com/",
    facebook: "https://www.facebook.com/GymboreeThailand/",
    status: "check",
    sourceUrl: "https://www.facebook.com/GymboreeThailand/",
    lastVerified: "2026-09-28",
  },

  // ------------------------------------------------ Community and libraries
  {
    slug: "christ-church-tiny-tots",
    name: "Tiny Tots Playgroup, Christ Church Bangkok",
    organiser: "Community or library",
    kind: "Drop-in playgroup",
    venue: "Christ Church Bangkok",
    address: "Convent Road, Silom, Bang Rak",
    district: "Bang Rak",
    zone: "Central",
    transit: "BTS Sala Daeng or MRT Silom",
    sessions: [
      {
        days: ["Wed"],
        frequency: "weekly",
        start: "09:30",
        end: "11:30",
        minAgeMonths: 0,
        maxAgeMonths: 5 * Y,
      },
    ],
    languages: ["English"],
    description:
      "A long-running parents and tots group in Christ Church's big hall on Convent Road, with a large, changing set of toys, a craft and music. It is community-run and more relaxed than school playgroups.",
    worthKnowing:
      "The Wednesday session opens with a short Bible story. Details come from the group's Facebook page, so check it for holiday closures.",
    facebook: "https://www.facebook.com/TinyTotsatCCB/",
    status: "check",
    sourceUrl: "https://www.facebook.com/TinyTotsatCCB/",
    lastVerified: "2026-09-28",
  },
  {
    slug: "neilson-hays-library-storytime",
    name: "Storytime, Neilson Hays Library",
    organiser: "Community or library",
    kind: "Storytime",
    venue: "Neilson Hays Library",
    address: "195 Surawong Road, Bang Rak",
    district: "Bang Rak",
    zone: "Central",
    sessions: [
      {
        label: "Saturday Children's Story Time",
        days: ["Sat"],
        frequency: "weekly",
        start: "10:30",
        minAgeMonths: 2 * Y,
        maxAgeMonths: 7 * Y,
        price: { amount: 250, unit: "session", note: "Per child. Free for parents." },
        note: "Story followed by a craft, with a new theme each week.",
      },
    ],
    languages: ["English"],
    description:
      "Bangkok's historic English-language library, which has more than 8,000 children's books, runs a weekly Saturday story and craft session for two to sevens, led by volunteers. The building itself, from 1922, is worth the trip.",
    worthKnowing:
      "Each week's theme is posted on the library's Facebook page. Story times pause during the library's twice-yearly book sales.",
    phone: "02 233 4999",
    email: "info@neilsonhayslibrary.org",
    facebook: "https://www.facebook.com/NeilsonHaysLibrary/",
    website: "https://neilsonhayslibrary.org/events",
    status: "confirmed",
    confirmedByOrganiser: true,
    sourceUrl: "https://neilsonhayslibrary.org/events",
    lastVerified: "2026-10-05",
  },
];

// ------------------------------------------------------------------ helpers

/** "1", "1.5", "3" for whole and half years, or null when months read better. */
function yearsOnly(m: number): string | null {
  if (m < 12) return null;
  if (m % 12 === 0) return `${m / 12}`;
  if (m % 12 === 6 && m >= 24) return `${Math.floor(m / 12)}.5`;
  return null;
}

function monthsLabel(m: number): string {
  const y = yearsOnly(m);
  if (y === null) return `${m} months`;
  return y === "1" ? "1 year" : `${y} years`;
}

/**
 * Whole-year maxima are inclusive of that whole year of age: "up to 3"
 * covers a child of 3 years 11 months, which is how schools mean it.
 */
export function ageMatches(ageMonths: number, min?: number, max?: number): boolean {
  if (min === undefined || max === undefined) return true;
  const upper = max % 12 === 0 && max >= 24 ? max + 11 : max;
  return ageMonths >= min && ageMonths <= upper;
}

export function ageLabel(min?: number, max?: number): string | null {
  if (min === undefined || max === undefined) return null;
  const hi = monthsLabel(max);
  if (min === 0) return `Birth to ${hi}`;
  const loYears = yearsOnly(min);
  const hiYears = yearsOnly(max);
  if (loYears !== null && hiYears !== null) return `${loYears} to ${hiYears} years`;
  if (loYears === null && hiYears === null) return `${min} to ${max} months`;
  return `${monthsLabel(min)} to ${hi}`;
}

export function timeLabel(start?: string, end?: string): string | null {
  if (!start) return null;
  const fmt = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const suffix = h >= 12 ? "pm" : "am";
    const hr = h % 12 === 0 ? 12 : h % 12;
    return m === 0 ? `${hr}${suffix}` : `${hr}.${String(m).padStart(2, "0")}${suffix}`;
  };
  return end ? `${fmt(start)} to ${fmt(end)}` : `from ${fmt(start)}`;
}

export function daysLabel(days?: Day[]): string | null {
  if (!days || days.length === 0) return null;
  const weekdays: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  if (days.length === 5 && weekdays.every((d) => days.includes(d))) return "Weekdays";
  if (days.length === 1) return `${DAY_LABEL[days[0]]}s`;
  return days.map((d) => DAY_LABEL[d]).join(", ").replace(/, ([^,]*)$/, " and $1");
}

export const FREQUENCY_LABEL: Record<Frequency, string> = {
  weekly: "Weekly",
  fortnightly: "Every other week",
  monthly: "Monthly",
  occasional: "Occasional",
};

export function priceLabel(p?: Price): string | null {
  if (!p) return null;
  if (p.free) return "Free";
  if (p.amount === undefined) return null;
  const base = p.to && p.to !== p.amount
    ? `฿${p.amount.toLocaleString()} to ฿${p.to.toLocaleString()}`
    : `฿${p.amount.toLocaleString()}`;
  const unit = p.unit === "year" ? " a year" : p.unit === "course" ? " a course" : " a session";
  return base + unit;
}

/** Cheapest per-session price across sessions, for the budget filter. */
export function lowestSessionPrice(pg: Playgroup): number | "free" | null {
  let best: number | null = null;
  for (const s of pg.sessions) {
    const p = s.price;
    if (!p) continue;
    if (p.free) return "free";
    if (p.unit !== "session" || p.amount === undefined) continue;
    best = best === null ? p.amount : Math.min(best, p.amount);
  }
  return best;
}

export const ALL_LANGUAGES = Array.from(
  new Set(PLAYGROUPS.flatMap((p) => p.languages)),
).sort((a, b) => (a === "English" ? -1 : b === "English" ? 1 : a.localeCompare(b)));

export const ORGANISERS: Organiser[] = [
  "International school",
  "Preschool or nursery",
  "Parents' group",
  "Play centre or cafe",
  "Community or library",
];
