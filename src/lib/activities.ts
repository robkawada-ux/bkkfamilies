// Activities directory: days out and weekly classes for kids in Bangkok.
// One Activity per venue or provider, each with its own page at
// /activities/<slug>.
//
// HONESTY RULES, same as camps and playgroups:
// - Never guess a price, time or age. Omit the field and the UI says
//   "not published".
// - status "confirmed" means we read the details on the operator's own
//   current page. "check" means the best detail we have comes from a
//   recent guide or listing, and the UI tells parents to confirm first.
// - closedNote marks somewhere that is closed right now. It stays listed,
//   clearly flagged, because parents search for it by name.
//
// MAINTENANCE: re-check prices every six months, and closures monthly.
// Attraction prices online are often reseller discounts: record the
// walk-in or official price, not a booking-site deal.

export type ActivityType = "Day out" | "Weekly class";

export type Category =
  // Days out
  | "Indoor play"
  | "Trampolines, climbing and karts"
  | "Theme and water parks"
  | "Animals and aquariums"
  | "Museums and science"
  | "Parks and outdoors"
  | "Markets, culture and views"
  // Weekly classes
  | "Swimming"
  | "Football"
  | "Gymnastics"
  | "Dance"
  | "Fitness"
  | "Music"
  | "Art and science";

export const DAY_OUT_CATEGORIES: Category[] = [
  "Indoor play",
  "Trampolines, climbing and karts",
  "Theme and water parks",
  "Animals and aquariums",
  "Museums and science",
  "Parks and outdoors",
  "Markets, culture and views",
];

export const CLASS_CATEGORIES: Category[] = [
  "Swimming",
  "Football",
  "Gymnastics",
  "Dance",
  "Fitness",
  "Music",
  "Art and science",
];

export type Setting = "Indoor" | "Outdoor" | "Indoor and outdoor";

export type Zone =
  | "Sukhumvit"
  | "Central"
  | "Riverside and Thonburi"
  | "Rama 9 and east"
  | "Bang Na and south"
  | "North"
  | "Day trip outside Bangkok"
  | "Several locations";

export const ZONES: Zone[] = [
  "Sukhumvit",
  "Central",
  "Riverside and Thonburi",
  "Rama 9 and east",
  "Bang Na and south",
  "North",
  "Day trip outside Bangkok",
  "Several locations",
];

export type PriceUnit =
  | "entry"
  | "hour"
  | "session"
  | "term"
  | "course"
  | "month"
  | "activity";

export interface Price {
  /** Baht, for a child unless the note says otherwise. */
  from?: number;
  to?: number;
  unit: PriceUnit;
  free?: boolean;
  note?: string;
}

export interface Activity {
  slug: string;
  name: string;
  type: ActivityType;
  category: Category;
  /** Omit when we do not know. Only "Indoor" places count as rainy-day options. */
  setting?: Setting;
  /** Mall, park or building, when the name does not already say it. */
  venue?: string;
  address?: string;
  district: string;
  zone: Zone;
  transit?: string;
  /** Ages in years. Omit both when not published. */
  minAge?: number;
  maxAge?: number;
  hours?: string;
  price?: Price;
  description: string;
  worthKnowing?: string;
  /** Set when the place is closed right now. Shown as a banner. */
  closedNote?: string;
  /** Other branches, for chains. */
  branches?: string[];
  website?: string;
  phone?: string;
  lineId?: string;
  email?: string;
  facebook?: string;
  /** Slug of one of our own articles that covers this place. */
  relatedArticle?: string;
  status: "confirmed" | "check";
  sourceUrl: string;
  lastVerified: string;
}

const HONEYKIDS_PLAY =
  "https://honeykidsasia.com/thailand/indoor-playground-for-kids-in-bangkok/";
const NOMADMUM = "https://nomadmum.com/best-kids-activities-in-bangkok/";
const HONEYKIDS_SWIM =
  "https://honeykidsasia.com/thailand/best-kids-swim-lessons-bangkok/";
const MUSEUMS = "top-museums-for-kids-in-bangkok";
const NINE_THINGS = "9-things-to-do-in-bangkok-with-kids";
const OUR_MUSEUMS_ARTICLE = `https://www.bkkfamilies.com/blog/${MUSEUMS}`;
const OUR_NINE_THINGS = `https://www.bkkfamilies.com/blog/${NINE_THINGS}`;

export const ACTIVITIES: Activity[] = [
  // ============================================================ Indoor play
  {
    slug: "mega-harborland-one-bangkok",
    name: "MEGA HarborLand, One Bangkok",
    type: "Day out",
    category: "Indoor play",
    setting: "Indoor",
    venue: "One Bangkok, Parade zone, 6th floor",
    address: "One Bangkok, 1877 Rama IV Road, Lumphini, Pathum Wan",
    district: "Pathum Wan",
    zone: "Central",
    transit: "MRT Lumphini, with a walkway straight into One Bangkok",
    hours: "Daily, 10.30am to 8pm",
    price: { from: 180, to: 760, unit: "entry", note: "Tiered by age, hourly or all day. The range is across HarborLand's Bangkok branches, for up to three hours." },
    description:
      "One of the biggest indoor playgrounds in the world at over 6,000 square metres, with separate soft play for toddlers, giant slides for children, and a rope course, zip line, sky monorail and Jumpz trampoline park that older kids and adults can do too. The walkway from MRT Lumphini makes it one of the easiest big days out to reach without a car.",
    worthKnowing:
      "Everyone in the adventure zones needs anti-slip socks, and staff run a safety briefing first. HarborLand also has branches at IconSiam and Gateway Ekamai.",
    branches: ["IconSiam", "Gateway Ekamai", "EmQuartier"],
    status: "check",
    sourceUrl: "https://www.onebangkok.com/en/blog/harborland-at-one-bangkok/",
    lastVerified: "2026-09-29",
  },
  {
    slug: "mega-harborland-iconsiam",
    name: "MEGA HarborLand, IconSiam",
    type: "Day out",
    category: "Indoor play",
    setting: "Indoor",
    venue: "IconSiam",
    address: "IconSiam, Charoen Nakhon Road, Khlong San",
    district: "Khlong San",
    zone: "Riverside and Thonburi",
    transit: "BTS Charoen Nakhon (Gold Line), or the free IconSiam shuttle boat from Sathorn Pier",
    hours: "Daily, 10.30am to 8pm",
    price: { from: 180, to: 760, unit: "entry", note: "Tiered by age, for up to three hours." },
    description:
      "The riverside HarborLand, with big slides and climbing zones that can genuinely fill an afternoon. Pair it with the river views and food halls at IconSiam and it becomes an easy whole day, especially when it is too hot or wet to be outside.",
    worthKnowing:
      "Weekends get busy. Budget at least two hours, and bring grip socks or buy them at the desk.",
    relatedArticle: NINE_THINGS,
    status: "check",
    sourceUrl: HONEYKIDS_PLAY,
    lastVerified: "2026-09-29",
  },
  {
    slug: "harborland-gateway-ekamai",
    name: "HarborLand, Gateway Ekamai",
    type: "Day out",
    category: "Indoor play",
    setting: "Indoor",
    venue: "Gateway Ekamai",
    address: "Gateway Ekamai, 982/22 Sukhumvit Road, Khlong Toei",
    district: "Khlong Toei",
    zone: "Sukhumvit",
    transit: "BTS Ekkamai, connected to the mall",
    hours: "Weekdays 10am to 8pm, weekends 10am to 9pm",
    price: { from: 350, unit: "entry", note: "Varies by age." },
    description:
      "A smaller HarborLand than the MEGA branches, but right on the BTS and with a dedicated area for younger children. Gateway Ekamai also has Kidzooona and WOW Park, so it works as a one-stop rainy day mall.",
    status: "check",
    sourceUrl: NOMADMUM,
    lastVerified: "2026-09-29",
  },
  {
    slug: "playmondo-centralworld",
    name: "Playmondo, CentralWorld",
    type: "Day out",
    category: "Indoor play",
    setting: "Indoor",
    venue: "CentralWorld",
    address: "CentralWorld, Rama I Road, Pathum Wan",
    district: "Pathum Wan",
    zone: "Central",
    transit: "BTS Chit Lom or Siam, via the skywalk",
    minAge: 0,
    maxAge: 13,
    hours: "Weekdays 11am to 8pm, weekends 10.30am to 8pm",
    price: { from: 660, to: 799, unit: "entry", note: "Three hours to all day. Parents pay a reduced rate. Cheaper at other branches, for example ฿290 to ฿390 at Central Rama 2." },
    description:
      "Four big play zones themed on desert, ocean, volcano and forest, with slides, obstacle courses, ball pits, trampolines and soft play. Children need to be at least 65cm tall. It runs a busy programme of themed workshops, particularly in school holidays.",
    branches: ["Central EastVille", "Central Ladprao", "Central Rama 2"],
    phone: "02 103 2455",
    email: "info@playmondo.com",
    website: "https://www.playmondo.com/",
    status: "check",
    sourceUrl: "https://www.bkkkids.com/listing/playmondo/",
    lastVerified: "2026-09-29",
  },
  {
    slug: "funarium",
    name: "Funarium",
    type: "Day out",
    category: "Indoor play",
    setting: "Indoor",
    address: "111/1 Sukhumvit Soi 26 (behind Big C)",
    district: "Khlong Toei",
    zone: "Sukhumvit",
    minAge: 0,
    maxAge: 13,
    hours: "Monday to Thursday 9am to 6pm, Friday to Sunday 9am to 7pm",
    price: { from: 200, to: 330, unit: "entry", note: "Under 105cm ฿200, taller children up to 13 ฿330. Unlimited on weekdays, three hours at weekends. Adults ฿110." },
    description:
      "Bangkok's long-running warehouse-sized play centre, with four zones for sports, sand and water, arts and crafts, and cooking. There is a parents' lounge and a cafe, so it suits a long weekday session. A Bangkok expat family classic for good reason.",
    worthKnowing: "Skate hire and cooking classes cost extra.",
    status: "check",
    sourceUrl: "https://touristbangkok.com/bangkok-kids/funarium/",
    lastVerified: "2026-09-29",
  },
  {
    slug: "playville-thonglor",
    name: "Playville",
    type: "Day out",
    category: "Indoor play",
    setting: "Indoor",
    venue: "49 Playscape, 2nd floor",
    address: "8/3 Sukhumvit 49, Khlong Tan Nuea, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "BTS Thong Lo, about a 7 minute walk",
    minAge: 0,
    maxAge: 6,
    hours: "Daily, 9am to 6pm",
    price: { from: 350, unit: "entry", note: "Per child for two hours. Adults about ฿100." },
    description:
      "A clean, calm indoor playground for babies and preschoolers, with a ball pit, climbing and slides, a reading corner and sand play, plus process art, slime making and story time sessions. There is a cafe with a kids' menu and a shop selling toys and baby products.",
    website: "https://www.playville.co.th/",
    status: "check",
    sourceUrl: HONEYKIDS_PLAY,
    lastVerified: "2026-09-29",
  },
  {
    slug: "wonder-woods-kids-cafe",
    name: "Wonder Woods Kids Cafe",
    type: "Day out",
    category: "Indoor play",
    setting: "Indoor and outdoor",
    address: "Soi Phatthanakan 51, Suan Luang",
    district: "Suan Luang",
    zone: "Rama 9 and east",
    transit: "MRT Hua Mak, about a 9 minute walk",
    minAge: 0,
    maxAge: 6,
    hours: "Daily, 9am to 7pm",
    price: { from: 550, unit: "entry", note: "Per child for three hours. Adults ฿200. Under 70cm free." },
    description:
      "A kids' cafe and co-learning space with indoor and outdoor play, a large ball pit, wooden play structures, a mushroom forest, and sand and water tables for properly messy play. Parents eat and drink at the cafe while children play. Bring a change of clothes.",
    facebook: "https://www.facebook.com/wonderwoodskidscafe",
    status: "check",
    sourceUrl: NOMADMUM,
    lastVerified: "2026-09-29",
  },
  {
    slug: "kidzooona-gateway-ekamai",
    name: "Kidzooona, Gateway Ekamai",
    type: "Day out",
    category: "Indoor play",
    setting: "Indoor",
    venue: "Gateway Ekamai, 4th floor",
    address: "Gateway Ekamai, 982/22 Sukhumvit Road, Khlong Toei",
    district: "Khlong Toei",
    zone: "Sukhumvit",
    transit: "BTS Ekkamai, connected to the mall",
    hours: "Daily, about 10.30am to 9pm",
    price: { from: 200, to: 360, unit: "entry", note: "Two hours or all day. Guides differ on the current rate. Under 90cm has been free." },
    description:
      "Aimed at babies and young children, and one of the best value play spaces in the city, with a separate under-twos area full of wooden toys and a pretend-play town for preschoolers.",
    branches: ["Paradise Park", "Central Pinklao"],
    status: "check",
    sourceUrl: HONEYKIDS_PLAY,
    lastVerified: "2026-09-29",
  },
  {
    slug: "meland-siam-paragon",
    name: "MELAND, Siam Paragon",
    type: "Day out",
    category: "Indoor play",
    setting: "Indoor",
    venue: "Siam Paragon, 5th floor, North Zone",
    address: "Siam Paragon, Rama I Road, Pathum Wan",
    district: "Pathum Wan",
    zone: "Central",
    transit: "BTS Siam, connected to the mall",
    hours: "Daily, about 10am to 9pm (later on some days)",
    price: { from: 750, unit: "entry", note: "For three hours." },
    description:
      "Bangkok's newest big indoor theme park, and the chain's first outside China: over 5,000 square metres split into seven themed zones, from a sky kingdom and ocean adventure to a role-play town, a STEM zone and motion-sensing sports, with more than 100 attractions. Plan three hours or more.",
    status: "check",
    sourceUrl: "https://www.trip.com/travel-guide/attraction/bangkok/meland-153412577/",
    lastVerified: "2026-09-29",
  },
  {
    slug: "yoyoland-seacon-square",
    name: "Yoyoland, Seacon Square",
    type: "Day out",
    category: "Indoor play",
    setting: "Indoor",
    venue: "Seacon Square",
    address: "Seacon Square, Srinakarin Road, Prawet",
    district: "Prawet",
    zone: "Rama 9 and east",
    transit: "MRT Suan Luang Rama 9 (Yellow Line)",
    hours: "Weekdays noon to 7pm, weekends 10.30am to 9.30pm",
    price: { from: 240, unit: "entry", note: "Adults ฿120." },
    description:
      "An indoor amusement park inside Seacon Square, with mini roller coasters, dinosaur rides and a fossil dig. A good option for families on the Srinakarin side who want rides without the trek to a full theme park.",
    status: "check",
    sourceUrl: HONEYKIDS_PLAY,
    lastVerified: "2026-09-29",
  },
  {
    slug: "kidzilla-nanglinchee",
    name: "Kidzilla",
    type: "Day out",
    category: "Indoor play",
    setting: "Indoor",
    venue: "Marketplace Nanglinchee",
    address: "Marketplace Nanglinchee, Nang Linchi Road, Yan Nawa",
    district: "Yan Nawa",
    zone: "Central",
    transit: "About 15 minutes from BTS Saint Louis",
    minAge: 0,
    maxAge: 5,
    hours: "Daily, 10am to 6pm",
    price: { from: 290, to: 400, unit: "entry", note: "For two hours. Adults ฿100." },
    description:
      "A play space for babies to five year olds that doubles as a learning centre, with art, English and even chess sessions alongside free play. Handy for Sathorn and Rama 3 families.",
    status: "check",
    sourceUrl: HONEYKIDS_PLAY,
    lastVerified: "2026-09-29",
  },
  {
    slug: "mari-go-round-kids-cafe",
    name: "Mari Go Round Premium Kids Cafe",
    type: "Day out",
    category: "Indoor play",
    setting: "Indoor",
    venue: "RQ Residence, ground floor, room 107",
    address: "Soi Sukhumvit 49/9, Khlong Tan Nuea, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    hours: "Daily, 10am to 7pm",
    price: { from: 350, to: 400, unit: "entry", note: "Approximate, per child." },
    description:
      "A small, design-led kids' cafe off Sukhumvit 49 with creative play structures, trampolines and a ball pit, and a proper cafe for parents. Socks are required.",
    status: "check",
    sourceUrl: NOMADMUM,
    lastVerified: "2026-09-29",
  },

  // ================================================= Trampolines, climbing, karts
  {
    slug: "bounce-emquartier",
    name: "BOUNCE, EmQuartier",
    type: "Day out",
    category: "Trampolines, climbing and karts",
    setting: "Indoor",
    venue: "EmQuartier, 4th floor",
    address: "The EmQuartier, Sukhumvit Road, Khlong Tan Nuea, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "BTS Phrom Phong, connected to the mall",
    minAge: 3,
    hours: "Weekdays 11am to 8pm, weekends 10am to 8pm or later",
    price: { from: 390, to: 490, unit: "session", note: "Per jump session of about an hour." },
    description:
      "Wall-to-wall trampolines, a foam pit, a dodgeball court and parkour runs. Best for school-age kids with energy to burn, and an hour is usually plenty.",
    worthKnowing:
      "Budget one to two hours, not a whole afternoon. Kids tire faster than you expect, and tired kids get scrapes. Plan something calm, like food, straight after.",
    branches: ["IconSiam"],
    relatedArticle: NINE_THINGS,
    status: "check",
    sourceUrl: NOMADMUM,
    lastVerified: "2026-09-29",
  },
  {
    slug: "stonegoat-the-parq",
    name: "Stonegoat Climbing, The Parq",
    type: "Day out",
    category: "Trampolines, climbing and karts",
    setting: "Indoor",
    venue: "The Parq",
    address: "The Parq, Rama IV Road, Khlong Toei",
    district: "Khlong Toei",
    zone: "Central",
    transit: "MRT Queen Sirikit National Convention Centre",
    minAge: 5,
    maxAge: 12,
    hours: "Daily, 10am to 10pm",
    price: { from: 250, unit: "session", note: "Per 30 minutes." },
    description:
      "An indoor climbing wall with sessions and classes aimed at five to twelve year olds, right next to Benjakitti Park. A good way to try climbing before committing to a course.",
    status: "check",
    sourceUrl: HONEYKIDS_PLAY,
    lastVerified: "2026-09-29",
  },
  {
    slug: "playerbox-siam-discovery",
    name: "Playerbox, Siam Discovery",
    type: "Day out",
    category: "Trampolines, climbing and karts",
    setting: "Indoor",
    venue: "Siam Discovery",
    address: "Siam Discovery, Rama I Road, Pathum Wan",
    district: "Pathum Wan",
    zone: "Central",
    transit: "BTS Siam or National Stadium",
    hours: "Daily, 10am to 10pm",
    price: { from: 150, to: 1200, unit: "activity", note: "Priced per activity." },
    description:
      "An electric go-kart track, a digger zone, VR experiences and an arcade, for kids who want speed rather than slides. Better suited to older children.",
    branches: ["Banthat Thong Road"],
    status: "check",
    sourceUrl: HONEYKIDS_PLAY,
    lastVerified: "2026-09-29",
  },
  {
    slug: "beat-active-bitec",
    name: "Beat Active, BITEC Bang Na",
    type: "Day out",
    category: "Trampolines, climbing and karts",
    setting: "Indoor",
    venue: "BITEC Bang Na",
    address: "BITEC, Bang Na-Trat Road, Bang Na",
    district: "Bang Na",
    zone: "Bang Na and south",
    transit: "BTS Bang Na",
    hours: "Daily, 10am to 7pm",
    price: { from: 350, to: 550, unit: "entry", note: "Four hours or all day." },
    description:
      "A big indoor sports hall with an ice skating rink, a football pitch and a basketball court, plus fitness activities. Suits sporty kids, and one of the few places in the city to skate.",
    status: "check",
    sourceUrl: HONEYKIDS_PLAY,
    lastVerified: "2026-09-29",
  },

  // ===================================================== Theme and water parks
  {
    slug: "dream-world",
    name: "Dream World",
    type: "Day out",
    category: "Theme and water parks",
    setting: "Outdoor",
    address: "Rangsit-Nakhon Nayok Road, Khlong 3, Thanyaburi, Pathum Thani",
    district: "Thanyaburi",
    zone: "Day trip outside Bangkok",
    hours: "Weekdays 9.30am to 5pm, weekends 9.30am to 6pm",
    price: { from: 800, to: 1200, unit: "entry", note: "Depending on the package. Under 90cm free." },
    description:
      "The classic Bangkok theme park, about an hour north of the city, with rides for young children and teenagers, a snow town and some rides that get you properly wet. Treat it as a full day, not a couple of hours.",
    worthKnowing:
      "Snow Town and the go-karts need a height of at least 155cm. Go on a weekday if you can, bring a change of clothes, and agree an obvious meeting point before anyone splits up, even for a bathroom trip.",
    relatedArticle: NINE_THINGS,
    status: "check",
    sourceUrl: OUR_NINE_THINGS,
    lastVerified: "2026-09-29",
  },
  {
    slug: "siam-amazing-park",
    name: "Siam Amazing Park",
    type: "Day out",
    category: "Theme and water parks",
    setting: "Outdoor",
    address: "203 Suan Siam Road, Khan Na Yao",
    district: "Khan Na Yao",
    zone: "Rama 9 and east",
    hours: "Daily, 10am to 6pm",
    price: { from: 850, to: 1000, unit: "entry", note: "Children 101 to 130cm ฿850, 131cm and over ฿1,000. Covers the rides and the water park. A year pass is ฿2,000." },
    description:
      "A theme park and water park in one, inside the city limits, with the Guinness-certified world's largest wave pool, speed and spiral slides, and big rides like the Boomerang and Vortex drop. Easier to reach than Dream World for families in the east of the city.",
    website: "https://www.siamamazingpark.com/en/promotion-price",
    status: "confirmed",
    sourceUrl: "https://www.siamamazingpark.com/en/promotion-price",
    lastVerified: "2026-09-29",
  },
  {
    slug: "pororo-aquapark-central-bangna",
    name: "Pororo AquaPark, Central Bangna",
    type: "Day out",
    category: "Theme and water parks",
    setting: "Outdoor",
    venue: "CentralPlaza Bangna, 6th floor (rooftop)",
    address: "CentralPlaza Bangna, Bang Na-Trat Road, Bang Na",
    district: "Bang Na",
    zone: "Bang Na and south",
    hours: "Weekdays 10.30am to 7pm, weekends and holidays 10am to 7pm. Ticket sales stop at 5pm, slides close at 6pm.",
    price: { from: 280, to: 400, unit: "entry", note: "Children 90 to 120cm about ฿280, adults about ฿400, under 90cm free." },
    description:
      "A rooftop water park on top of a shopping mall, themed on the Korean cartoon penguin, with slides and splash zones. It turns an ordinary mall trip into a water park day, and on a hot day it is hard to beat.",
    worthKnowing: "Several of the bigger slides need a height of at least 120cm, so check before promising the big one.",
    relatedArticle: NINE_THINGS,
    status: "check",
    sourceUrl: "https://www.thethaipass.com/activities/thailand-bangkok/pororo-aquapark",
    lastVerified: "2026-09-29",
  },

  // ===================================================== Animals and aquariums
  {
    slug: "sea-life-bangkok-ocean-world",
    name: "SEA LIFE Bangkok Ocean World",
    type: "Day out",
    category: "Animals and aquariums",
    setting: "Indoor",
    venue: "Siam Paragon, basement levels",
    address: "Siam Paragon, Rama I Road, Pathum Wan",
    district: "Pathum Wan",
    zone: "Central",
    transit: "BTS Siam, connected to the mall",
    hours: "Daily, 10am to 8pm (last entry 7pm)",
    price: { from: 799, to: 1199, unit: "entry", note: "Child aged 2 to 11: ฿799 booked online, ฿1,199 at the door. Combo tickets with Madame Tussauds and extras cost more." },
    description:
      "One of the largest aquariums in Southeast Asia, under Siam Paragon, with an ocean tunnel, sharks, jellyfish and coral reef zones, plus add-ons like a glass-bottom boat and a 4D cinema. Air conditioned and central, so a dependable rainy day plan.",
    worthKnowing: "Book online: it saves ฿400 per child on the door price.",
    website: "https://www.visitsealife.com/bangkok/en/",
    status: "confirmed",
    sourceUrl: "https://www.visitsealife.com/bangkok/en/tickets/",
    lastVerified: "2026-09-29",
  },
  {
    slug: "safari-world",
    name: "Safari World",
    type: "Day out",
    category: "Animals and aquariums",
    setting: "Outdoor",
    address: "99 Panya Indra Road, Sam Wa Tawan Tok, Khlong Sam Wa",
    district: "Khlong Sam Wa",
    zone: "North",
    hours: "Daily, about 9am to 4.30pm",
    description:
      "A drive-through safari park with giraffes, zebras, lions and tigers, plus a separate Marine Park with dolphin and sea lion shows. Plan most of a day. It is on the far north-eastern edge of the city, so a car or taxi is the realistic way there.",
    worthKnowing:
      "Ticket prices vary a lot by package and by where you book, so compare the official rate with reseller deals. We have not been able to confirm the current walk-in price.",
    status: "check",
    sourceUrl: "https://www.trip.com/travel-guide/attraction/bangkok/safari-world-bangkok-77027/",
    lastVerified: "2026-09-29",
  },
  {
    slug: "snake-farm-queen-saovabha",
    name: "Snake Farm, Queen Saovabha Memorial Institute",
    type: "Day out",
    category: "Animals and aquariums",
    setting: "Indoor and outdoor",
    address: "Corner of Henri Dunant Road and Rama IV Road, Pathum Wan",
    district: "Pathum Wan",
    zone: "Central",
    transit: "MRT Sam Yan or BTS Sala Daeng",
    hours: "Weekdays 8.30am to 4.30pm, with shows at 11am and 2.30pm. Weekends and holidays, show at 11am.",
    price: { from: 50, to: 200, unit: "entry", note: "Children ฿50, adults ฿200. Includes the museum and the show." },
    description:
      "The Thai Red Cross's snake farm, one of the oldest in the world, where antivenom is still produced. Kids can watch venom milking and a snake handling show, and look round a small snake museum. Cheap, central and genuinely memorable.",
    status: "check",
    sourceUrl: "https://touristbangkok.com/bangkok-kids/childrens-entertainment-attractions/the-snake-farm-queen-saovabha-memorial-institute/",
    lastVerified: "2026-09-29",
  },
  {
    slug: "siam-serpentarium",
    name: "Siam Serpentarium",
    type: "Day out",
    category: "Animals and aquariums",
    setting: "Indoor",
    address: "969 Luang Phaeng Road, Thap Yao, Lat Krabang",
    district: "Lat Krabang",
    zone: "Rama 9 and east",
    hours: "About 10am to 4pm",
    phone: "02 326 5800",
    description:
      "A modern, immersive snake museum near Suvarnabhumi airport, with more than 70 species, exhibitions on how snakes are born, hunt and survive, and live shows in a 400-seat theatre. It costs a lot more than the Red Cross snake farm but is genuinely educational.",
    worthKnowing: "Fits neatly into a day when you are already out towards the airport. Ticket prices are not published consistently, so call ahead.",
    relatedArticle: MUSEUMS,
    status: "check",
    sourceUrl: "https://au.trip.com/travel-guide/attraction/bangkok/siam-serpentarium-55986880/",
    lastVerified: "2026-09-29",
  },

  // ======================================================= Museums and science
  {
    slug: "childrens-discovery-museum-chatuchak",
    name: "Children's Discovery Museum, Chatuchak",
    type: "Day out",
    category: "Museums and science",
    setting: "Indoor and outdoor",
    address: "Kamphaeng Phet 4 Road, Chatuchak",
    district: "Chatuchak",
    zone: "North",
    transit: "MRT Chatuchak Park or BTS Mo Chit, five minutes on foot",
    minAge: 0,
    maxAge: 12,
    hours: "Normally Tuesday to Sunday, 10am to 4pm",
    price: { free: true, unit: "entry", note: "Register with a passport or ID at the door." },
    closedNote:
      "Closed from 1 October 2026 while the city appoints a new operator. The city says the closure is temporary but has not given a reopening date.",
    description:
      "When it is open, the best value museum in the city for children up to 12: four buildings split by age, a dinosaur dig, a climbing area and an outdoor water play zone with fountains and jets. Pack swimsuits and a towel, and pair it with the weekend market next door.",
    relatedArticle: MUSEUMS,
    status: "check",
    sourceUrl: OUR_MUSEUMS_ARTICLE,
    lastVerified: "2026-09-29",
  },
  {
    slug: "childrens-discovery-museum-thung-khru",
    name: "Children's Discovery Museum II, Thung Khru",
    type: "Day out",
    category: "Museums and science",
    setting: "Indoor and outdoor",
    address: "Pracha Uthit Road, Thung Khru",
    district: "Thung Khru",
    zone: "Riverside and Thonburi",
    minAge: 0,
    maxAge: 12,
    hours: "Normally Tuesday to Sunday, 10am to 4pm",
    price: { free: true, unit: "entry", note: "Register with a passport or ID at the door." },
    closedNote:
      "Closed from 1 October 2026, along with the Chatuchak branch, while the city appoints a new operator. No reopening date yet.",
    description:
      "The Thonburi-side branch runs the same model as Chatuchak: free, hands-on science, nature, art and technology zones, giant block building and weekend water play. The closest good indoor option by far for families on the Rama 2 side.",
    relatedArticle: MUSEUMS,
    status: "check",
    sourceUrl: OUR_MUSEUMS_ARTICLE,
    lastVerified: "2026-09-29",
  },
  {
    slug: "science-centre-for-education-ekkamai",
    name: "Science Centre for Education and Bangkok Planetarium",
    type: "Day out",
    category: "Museums and science",
    setting: "Indoor",
    address: "Sukhumvit Road, near Ekkamai, Khlong Toei",
    district: "Khlong Toei",
    zone: "Sukhumvit",
    transit: "BTS Ekkamai, exit 2",
    hours: "Tuesday to Sunday, 9am to 4pm",
    price: { from: 20, to: 30, unit: "entry", note: "About ฿20 for children and ฿30 for adults for the exhibitions." },
    description:
      "Exhibition halls on marine life, dinosaurs, insects and hands-on science that cost almost nothing, a short walk from the BTS. A cheap, air conditioned couple of hours, and home to the city's planetarium since 1964.",
    worthKnowing:
      "The planetarium dome closed on 30 March 2026 for a renovation of about eight months, with reopening expected late in 2026. The exhibitions stay open.",
    relatedArticle: MUSEUMS,
    status: "check",
    sourceUrl: OUR_MUSEUMS_ARTICLE,
    lastVerified: "2026-09-29",
  },
  {
    slug: "museum-siam",
    name: "Museum Siam",
    type: "Day out",
    category: "Museums and science",
    setting: "Indoor",
    address: "Sanam Chai Road, Phra Nakhon",
    district: "Phra Nakhon",
    zone: "Riverside and Thonburi",
    transit: "MRT Sanam Chai, exit 1",
    hours: "Tuesday to Sunday, 10am to 6pm",
    price: { free: true, unit: "entry", note: "Children under 15 have historically entered free, with a modest adult ticket." },
    description:
      "The museum that makes Thai history interesting for children, built around questions and interactive displays rather than glass cases. Plan 60 to 90 minutes, and combine it with Wat Pho, which is a short walk away.",
    relatedArticle: MUSEUMS,
    status: "check",
    sourceUrl: OUR_MUSEUMS_ARTICLE,
    lastVerified: "2026-09-29",
  },
  {
    slug: "wow-park-gateway-ekamai",
    name: "WOW Park, Gateway Ekamai",
    type: "Day out",
    category: "Museums and science",
    setting: "Indoor",
    venue: "Gateway Ekamai, 4th floor",
    address: "Gateway Ekamai, 982/22 Sukhumvit Road, Khlong Toei",
    district: "Khlong Toei",
    zone: "Sukhumvit",
    transit: "BTS Ekkamai, connected to the mall",
    hours: "Daily, 10am to 7pm or later",
    price: { from: 250, to: 599, unit: "entry", note: "Guides quote from ฿250 to ฿599 depending on the ticket." },
    description:
      "A hands-on science play centre with more than 40 interactive stations across 11 zones, including a bed of nails, a wind room and a vortex tunnel. Good for curious five to twelve year olds, with guided tours available.",
    status: "check",
    sourceUrl: NOMADMUM,
    lastVerified: "2026-09-29",
  },
  {
    slug: "national-science-museum",
    name: "National Science Museum",
    type: "Day out",
    category: "Museums and science",
    setting: "Indoor",
    address: "Technopolis, Khlong 5, Khlong Luang, Pathum Thani",
    district: "Khlong Luang",
    zone: "Day trip outside Bangkok",
    description:
      "The biggest science museum in the country, in a complex of several museums about an hour north of central Bangkok. The main building is the one kids remember. Treat it as a full day trip rather than an afternoon.",
    worthKnowing: "Hours and fees change, so check nsm.or.th before you go.",
    website: "https://www.nsm.or.th/",
    relatedArticle: MUSEUMS,
    status: "check",
    sourceUrl: OUR_MUSEUMS_ARTICLE,
    lastVerified: "2026-09-29",
  },
  {
    slug: "royal-thai-air-force-museum",
    name: "Royal Thai Air Force Museum",
    type: "Day out",
    category: "Museums and science",
    setting: "Indoor and outdoor",
    address: "Phahonyothin Road, Don Mueang",
    district: "Don Mueang",
    zone: "North",
    transit: "About 500 metres from Don Mueang railway station",
    hours: "Closed Mondays. Go in the morning.",
    price: { free: true, unit: "entry" },
    description:
      "Free, and a guaranteed hit with any child who likes planes: more than 50 aircraft across indoor hangars and an outdoor display, spanning a century of Thai aviation.",
    relatedArticle: MUSEUMS,
    status: "check",
    sourceUrl: OUR_MUSEUMS_ARTICLE,
    lastVerified: "2026-09-29",
  },
  {
    slug: "ancient-city-muang-boran",
    name: "Ancient City (Muang Boran)",
    type: "Day out",
    category: "Museums and science",
    setting: "Outdoor",
    address: "Sukhumvit Road, Bang Pu, Samut Prakan",
    district: "Mueang Samut Prakan",
    zone: "Day trip outside Bangkok",
    hours: "Daily, 9am to 7pm",
    price: { from: 350, to: 700, unit: "entry", note: "Foreign visitors: adults ฿700, children 6 to 14 ฿350, under 6 free. Bicycles included." },
    description:
      "An open-air museum of more than 115 replica buildings and monuments from around Thailand, spread over roughly 240 acres. Bicycles are included, so it becomes a long bike ride with something to look at every few minutes. Golf carts are available by the hour for children who cannot cycle.",
    worthKnowing: "There is very little shade. Go early or late.",
    relatedArticle: MUSEUMS,
    status: "check",
    sourceUrl: OUR_MUSEUMS_ARTICLE,
    lastVerified: "2026-09-29",
  },
  {
    slug: "bangkok-art-and-culture-centre",
    name: "Bangkok Art and Culture Centre (BACC)",
    type: "Day out",
    category: "Museums and science",
    setting: "Indoor",
    address: "Rama I Road, Pathum Wan",
    district: "Pathum Wan",
    zone: "Central",
    transit: "BTS National Stadium, by walkway",
    hours: "Tuesday to Sunday, 10am to 8pm",
    price: { free: true, unit: "entry" },
    description:
      "Free, central and open late, with rotating exhibitions that suit older children better than toddlers. A good evening option when the day has been too hot for anything outdoors.",
    relatedArticle: MUSEUMS,
    status: "check",
    sourceUrl: OUR_MUSEUMS_ARTICLE,
    lastVerified: "2026-09-29",
  },
  {
    slug: "moca-bangkok",
    name: "MOCA Bangkok (Museum of Contemporary Art)",
    type: "Day out",
    category: "Museums and science",
    setting: "Indoor",
    address: "499 Kamphaeng Phet 6 Road, Lat Yao, Chatuchak",
    district: "Chatuchak",
    zone: "North",
    hours: "Tuesday to Sunday, 10am to 6pm",
    price: { free: true, unit: "entry", note: "Free for children under 15. Adults ฿250." },
    description:
      "Five floors of Thai contemporary art in a striking building, with a good cafe. Better for school-age kids, and free for under 15s.",
    status: "check",
    sourceUrl: NOMADMUM,
    lastVerified: "2026-09-29",
  },
  {
    slug: "hsbc-childrens-library-lumpini",
    name: "HSBC Children's and Youth Library, Lumpini Park",
    type: "Day out",
    category: "Museums and science",
    setting: "Indoor",
    venue: "Lumpini Park",
    address: "Lumpini Park, Rama IV Road, Pathum Wan",
    district: "Pathum Wan",
    zone: "Central",
    transit: "MRT Lumphini or Silom",
    hours: "Tuesday to Saturday 8.30am to 7.30pm, Sunday 9am to 5.30pm",
    price: { free: true, unit: "entry" },
    description:
      "A free children's library inside Lumpini Park with more than 10,000 books and a slide, tunnel and climbing area. Pair it with the park's paddle boats for a cheap half day.",
    status: "check",
    sourceUrl: HONEYKIDS_PLAY,
    lastVerified: "2026-09-29",
  },

  // ======================================================= Parks and outdoors
  {
    slug: "lumpini-park",
    name: "Lumpini Park and paddle boats",
    type: "Day out",
    category: "Parks and outdoors",
    setting: "Outdoor",
    address: "Rama IV Road, Pathum Wan",
    district: "Pathum Wan",
    zone: "Central",
    transit: "MRT Lumphini or Silom, BTS Sala Daeng",
    price: { free: true, unit: "entry", note: "Paddle boats cost a few hundred baht for half an hour." },
    description:
      "Central Bangkok's big green space. Hiring a paddle boat on the lake is cheap and never gets old, the monitor lizards are a highlight for most kids, and the free children's library is inside the park.",
    worthKnowing: "Go in the late afternoon, when the heat is more bearable and the light is better.",
    relatedArticle: NINE_THINGS,
    status: "check",
    sourceUrl: OUR_NINE_THINGS,
    lastVerified: "2026-09-29",
  },
  {
    slug: "benjakitti-forest-park",
    name: "Benjakitti Forest Park",
    type: "Day out",
    category: "Parks and outdoors",
    setting: "Outdoor",
    address: "Ratchadaphisek Road, Khlong Toei",
    district: "Khlong Toei",
    zone: "Sukhumvit",
    transit: "MRT Queen Sirikit National Convention Centre, or a walk from BTS Asok",
    hours: "Daily, 4.30am to 10pm",
    price: { free: true, unit: "entry" },
    description:
      "A restored wetland park near Asok with elevated wooden skywalks over the water that work with a stroller, wide cycling and scooter tracks, and open lawns for running around. One of the best places in central Bangkok to let kids move.",
    worthKnowing: "Shade is limited. Go early in the morning or late in the afternoon.",
    status: "check",
    sourceUrl: "https://honeykidsasia.com/thailand/benjakitti-forest-park-bangkok/",
    lastVerified: "2026-09-29",
  },

  // ============================================== Markets, culture and views
  {
    slug: "chatuchak-weekend-market",
    name: "Chatuchak Weekend Market",
    type: "Day out",
    category: "Markets, culture and views",
    setting: "Indoor and outdoor",
    address: "Kamphaeng Phet 2 Road, Chatuchak",
    district: "Chatuchak",
    zone: "North",
    transit: "MRT Chatuchak Park or Kamphaeng Phet, BTS Mo Chit",
    hours: "Weekends",
    price: { free: true, unit: "entry" },
    description:
      "Chaotic in a good way. The pet section and toy stalls keep younger kids interested, and it is an easy introduction to a proper Bangkok market.",
    worthKnowing: "Go before 10am, for the heat and because it gets seriously crowded by early afternoon.",
    relatedArticle: NINE_THINGS,
    status: "check",
    sourceUrl: OUR_NINE_THINGS,
    lastVerified: "2026-09-29",
  },
  {
    slug: "taling-chan-floating-market",
    name: "Taling Chan Floating Market",
    type: "Day out",
    category: "Markets, culture and views",
    setting: "Outdoor",
    address: "Chak Phra Road, Khlong Chak Phra, Taling Chan",
    district: "Taling Chan",
    zone: "Riverside and Thonburi",
    hours: "Saturday and Sunday, 8am to 5pm",
    price: { free: true, unit: "entry" },
    description:
      "A small, local floating market on the Thonburi side, with freshly cooked seafood, boats selling snacks and traditional music. Much easier with kids than the big tourist floating markets outside the city.",
    status: "check",
    sourceUrl: NOMADMUM,
    lastVerified: "2026-09-29",
  },
  {
    slug: "khlong-lat-mayom-floating-market",
    name: "Khlong Lat Mayom Floating Market",
    type: "Day out",
    category: "Markets, culture and views",
    setting: "Outdoor",
    address: "15 Bang Ramat Road, Bang Ramat, Taling Chan",
    district: "Taling Chan",
    zone: "Riverside and Thonburi",
    hours: "Saturday and Sunday, 9.30am to 4.30pm",
    price: { free: true, unit: "entry" },
    description:
      "A greener, quieter floating market than most, close to the city, with a wide range of food and traditional Thai goods.",
    status: "check",
    sourceUrl: NOMADMUM,
    lastVerified: "2026-09-29",
  },
  {
    slug: "grand-palace-wat-phra-kaew",
    name: "The Grand Palace and Wat Phra Kaew",
    type: "Day out",
    category: "Markets, culture and views",
    setting: "Outdoor",
    address: "Na Phra Lan Road, Phra Nakhon",
    district: "Phra Nakhon",
    zone: "Riverside and Thonburi",
    transit: "MRT Sanam Chai, or Tha Chang pier",
    hours: "Daily, 8.30am to 3.30pm",
    price: { from: 500, unit: "entry", note: "Per person for foreign visitors." },
    description:
      "Worth doing once, even with younger children, for the Temple of the Emerald Buddha and the palace buildings.",
    worthKnowing:
      "Go at opening time. By late morning the heat and crowds make it hard work for small children. Shoulders and knees must be covered, including for kids.",
    relatedArticle: MUSEUMS,
    status: "check",
    sourceUrl: NOMADMUM,
    lastVerified: "2026-09-29",
  },
  {
    slug: "mahanakhon-skywalk",
    name: "Mahanakhon SkyWalk",
    type: "Day out",
    category: "Markets, culture and views",
    setting: "Indoor and outdoor",
    address: "114 Naradhiwas Rajanagarindra Road, Silom, Bang Rak",
    district: "Bang Rak",
    zone: "Central",
    transit: "BTS Chong Nonsi, connected",
    hours: "Daily, 10am to 7pm (last entry 6.30pm)",
    price: { from: 350, unit: "entry", note: "Children 3 to 12 ฿350. Adults ฿880 in the day, ฿1,080 at sunset." },
    description:
      "The 78th-floor observation deck with a glass floor you can walk across, and 360-degree views of the city. Most kids find the glass floor thrilling, some find it terrifying.",
    status: "check",
    sourceUrl: NOMADMUM,
    lastVerified: "2026-09-29",
  },

  // ============================================================== Swimming
  {
    slug: "bangkok-dolphins",
    name: "Bangkok Dolphins",
    type: "Weekly class",
    category: "Swimming",
    district: "Six pools",
    zone: "Several locations",
    minAge: 0,
    price: { from: 10500, unit: "term" },
    description:
      "One of Bangkok's best known swim schools, teaching from babies of three to six months through to competitive squads. Children move through the Seahorse, Octopus and Seal levels, and the school also runs parent and child classes, intensives and holiday camps.",
    branches: ["Sukhumvit 49", "Sukhumvit 39", "Udomsuk", "Yen Akat", "Goethe Institut, Sathorn", "HEI Schools"],
    worthKnowing: "Payment is by card at the office or bank transfer only, no cash.",
    website: "https://bangkokdolphins.com/learn-to-swim/",
    phone: "080 565 7558 (Sukhumvit 49)",
    status: "check",
    sourceUrl: "https://bangkokdolphins.com/learn-to-swim/",
    lastVerified: "2026-09-29",
  },
  {
    slug: "lets-asia-swim",
    name: "Lets Asia Swim School",
    type: "Weekly class",
    category: "Swimming",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "About 20 minutes on foot from EmQuartier",
    minAge: 0,
    hours: "Weekdays 9am to 6pm, Saturday 8.30am to 6pm, closed Sunday",
    price: { from: 6500, unit: "term" },
    description:
      "Lessons from four months old through to adults, with Little Splashers for babies, skill-based levels, competitive training, holiday camps and pool parties.",
    phone: "02 258 8085",
    status: "check",
    sourceUrl: HONEYKIDS_SWIM,
    lastVerified: "2026-09-29",
  },
  {
    slug: "little-fins-pool",
    name: "Little Fins Pool",
    type: "Weekly class",
    category: "Swimming",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "About 10 minutes on foot from BTS Thong Lo",
    minAge: 0,
    maxAge: 10,
    hours: "Tuesday to Friday 10am to 6pm, weekends 9am to 6pm, closed Monday",
    price: { from: 10200, unit: "course" },
    description:
      "A dedicated children's pool near Thong Lo teaching from three months to ten years, mixing technique with playful water activities and water survival skills.",
    phone: "061 645 5437",
    status: "check",
    sourceUrl: HONEYKIDS_SWIM,
    lastVerified: "2026-09-29",
  },
  {
    slug: "baby-pool-thailand",
    name: "Baby Pool",
    type: "Weekly class",
    category: "Swimming",
    district: "Three pools",
    zone: "Several locations",
    minAge: 0,
    price: { from: 10500, unit: "course" },
    description:
      "Australian and British certified swim teaching from babies and toddlers through a four-strokes programme to a swim club.",
    branches: ["Ekkamai", "Sukhumvit 71", "Bang Na"],
    website: "https://babypoolthailand.com/",
    status: "check",
    sourceUrl: HONEYKIDS_SWIM,
    lastVerified: "2026-09-29",
  },
  {
    slug: "bangkok-swim-academy",
    name: "Bangkok Swim Academy",
    type: "Weekly class",
    category: "Swimming",
    venue: "BEST Aquatic Centre",
    district: "Phra Khanong",
    zone: "Sukhumvit",
    transit: "About 5 minutes from BTS Phra Khanong",
    hours: "Weekdays 10am to 7pm, weekends 8am to 5pm",
    price: { from: 10220, unit: "course" },
    description:
      "A structured progression from the Aqua Bear programme for young children up to competitive training.",
    phone: "098 251 9649",
    status: "check",
    sourceUrl: HONEYKIDS_SWIM,
    lastVerified: "2026-09-29",
  },
  {
    slug: "aqua-tots-thailand",
    name: "Aqua-Tots Swim School",
    type: "Weekly class",
    category: "Swimming",
    district: "Three pools",
    zone: "Several locations",
    minAge: 0,
    maxAge: 12,
    price: { from: 3100, unit: "month" },
    description:
      "The American franchise's eight-level swim programme for four months to twelve years, with parent and tot classes, adaptive lessons and fast-track intensives. Billed monthly rather than by term.",
    branches: ["Central Pinklao", "Rama 3", "Thawi Watthana"],
    website: "https://thailand.aqua-tots.com/",
    status: "check",
    sourceUrl: HONEYKIDS_SWIM,
    lastVerified: "2026-09-29",
  },

  // ============================================================== Football
  {
    slug: "cuki-tots-football",
    name: "CUKI Tots Early Years Football",
    type: "Weekly class",
    category: "Football",
    setting: "Outdoor",
    district: "Several venues",
    zone: "Several locations",
    minAge: 2,
    maxAge: 5,
    description:
      "A pre-school football programme starting from age two: Lenny's Cubs for two and three year olds, with parents joining in, and Lenny's Lions for four and fives, who move on to playing independently. Also runs football and multi-sport holiday camps.",
    branches: ["Polo Football Park, Wireless Road", "Noah Park, Sukhumvit 26", "Harrow International School (weekends)"],
    website: "https://cukitots.com/",
    facebook: "https://www.facebook.com/CUKItots",
    status: "check",
    sourceUrl: "https://www.bkkkids.com/blog/cuki-tots-early-years-football-academy/",
    lastVerified: "2026-09-29",
  },
  {
    slug: "epa-bangkok-football-academy",
    name: "EPA Bangkok Football Academy",
    type: "Weekly class",
    category: "Football",
    setting: "Outdoor",
    venue: "EPA Football Development Centre",
    address: "Soi On Nut 67/3, Suan Luang",
    district: "Suan Luang",
    zone: "Rama 9 and east",
    minAge: 11,
    maxAge: 13,
    hours: "Youth academy: Tuesday to Thursday 4.30pm to 6.30pm, Saturday and Sunday 11am to 12.30pm",
    price: { from: 8560, unit: "course", note: "10-session pass, valid four months. A three-month pass is ฿16,050. First session free." },
    description:
      "Boys and girls of all abilities. Weekday sessions are two hours, with 30 minutes of optional free play before 90 minutes of structured coaching. EPA also runs groups for younger and older players.",
    phone: "065 294 6935",
    lineId: "@epabangkok",
    email: "kevin@epa-academy.com",
    website: "https://epa-academy.com/youth-academy.html",
    status: "confirmed",
    sourceUrl: "https://epa-academy.com/youth-academy.html",
    lastVerified: "2026-09-29",
  },
  {
    slug: "can-u-kick-it-soccer",
    name: "Can U Kick It Soccer Academy",
    type: "Weekly class",
    category: "Football",
    setting: "Outdoor",
    venue: "Polo Football Park and international schools",
    district: "Pathum Wan",
    zone: "Central",
    minAge: 6,
    maxAge: 12,
    hours: "After school on weekdays, and weekends",
    description:
      "The older sibling of CUKI Tots, coaching six to twelve year olds after school and at weekends, based at Polo Football Park off Wireless Road and at several international schools.",
    facebook: "https://www.facebook.com/canukickitsocceracademy",
    status: "check",
    sourceUrl: "https://www.bkkkids.com/blog/football-academies-for-kids-in-bangkok/",
    lastVerified: "2026-09-29",
  },

  // ============================================================ Gymnastics
  {
    slug: "the-little-gym-bangkok",
    name: "The Little Gym",
    type: "Weekly class",
    category: "Gymnastics",
    setting: "Indoor",
    district: "Several branches",
    zone: "Several locations",
    minAge: 0,
    maxAge: 12,
    description:
      "Gymnastics and movement classes from four months to twelve years: parent and child classes up to three, pre-school gymnastics for three to sevens, and grade school gymnastics for seven to twelves. Also runs holiday camps and birthday parties.",
    branches: ["EmQuartier", "Emporium", "Thonglor", "The Walk, Kaset Nawamin", "The Crystal", "Paradise Park"],
    lineId: "@thelittlegym",
    website: "https://www.thelittlegymbkk.com/english-menu/",
    status: "check",
    sourceUrl: "https://www.thelittlegymbkk.com/english-menu/",
    lastVerified: "2026-09-29",
  },

  // ================================================================= Dance
  {
    slug: "bangkok-dance-academy",
    name: "Bangkok Dance Academy",
    type: "Weekly class",
    category: "Dance",
    setting: "Indoor",
    venue: "CentralWorld",
    district: "Pathum Wan",
    zone: "Central",
    transit: "BTS Chit Lom or Siam",
    description: "Ballet, jazz, hip-hop and contemporary classes for children, in the middle of town at CentralWorld.",
    phone: "083 096 6784",
    email: "bangkokdanceacademy@gmail.com",
    status: "check",
    sourceUrl: "https://www.bkkkids.com/blog/dance-schools-for-kids-in-bangkok/",
    lastVerified: "2026-09-29",
  },
  {
    slug: "cala-dance-studio",
    name: "Cala Dance Studio",
    type: "Weekly class",
    category: "Dance",
    setting: "Indoor",
    venue: "Emporium Tower",
    address: "Emporium Tower, Sukhumvit 24, Khlong Toei",
    district: "Khlong Toei",
    zone: "Sukhumvit",
    transit: "BTS Phrom Phong",
    description: "Ballet, contemporary, jazz and K-pop classes in Emporium Tower, next to BTS Phrom Phong.",
    phone: "02 664 8985",
    facebook: "https://www.facebook.com/CalaDance/",
    status: "check",
    sourceUrl: "https://www.bkkkids.com/blog/dance-schools-for-kids-in-bangkok/",
    lastVerified: "2026-09-29",
  },
  {
    slug: "dance-centre-sukhumvit-33",
    name: "Dance Centre",
    type: "Weekly class",
    category: "Dance",
    setting: "Indoor",
    address: "Sukhumvit Soi 33, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "BTS Phrom Phong",
    description: "A Sukhumvit dance school teaching ballet, jazz, hip-hop, Latin and ballroom.",
    phone: "085 100 3050",
    status: "check",
    sourceUrl: "https://www.bkkkids.com/blog/dance-schools-for-kids-in-bangkok/",
    lastVerified: "2026-09-29",
  },
  {
    slug: "urban-dance-studio-bangkok",
    name: "Urban Dance Studio Bangkok",
    type: "Weekly class",
    category: "Dance",
    setting: "Indoor",
    address: "Sukhumvit Soi 23, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "BTS Asok or MRT Sukhumvit",
    description: "A multi-style dance studio near Asok with classes for children as well as adults.",
    phone: "02 664 4464",
    status: "check",
    sourceUrl: "https://www.bkkkids.com/blog/dance-schools-for-kids-in-bangkok/",
    lastVerified: "2026-09-29",
  },

  // =============================================================== Fitness
  {
    slug: "strongkiddo",
    name: "StrongKiddo",
    type: "Weekly class",
    category: "Fitness",
    setting: "Indoor",
    address: "Sukhumvit Soi 20, Khlong Toei",
    district: "Khlong Toei",
    zone: "Sukhumvit",
    transit: "BTS Asok or Phrom Phong",
    hours: "Daily, 9am to 6pm",
    price: { from: 10900, unit: "course", note: "12-class package." },
    description:
      "Kids' CrossFit: obstacle courses, strength and conditioning pitched at children. A good fit for high-energy kids who are not drawn to team sports.",
    status: "check",
    sourceUrl: HONEYKIDS_PLAY,
    lastVerified: "2026-09-29",
  },
  // ============================================================ Little Pea Kids Commons (organiser's own details, Oct 2026)
  {
    slug: "little-pea-music-together",
    name: "Music Together, Little Pea Kids Commons",
    type: "Weekly class",
    category: "Music",
    setting: "Indoor",
    venue: "Little Pea Kids Commons, theCOMMONS Thonglor",
    address: "theCOMMONS, Thong Lo Soi 17, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "BTS Thong Lo",
    minAge: 0,
    maxAge: 4,
    hours: "Wednesday and Sunday 10am to 11am. Babies under 1: Wednesday 11.15am to 12pm",
    price: { from: 650, unit: "session" },
    description:
      "Music Together is an early childhood music and movement programme for children up to four and their caregivers, built around singing, rhythm and movement to support language and emotional development. Little Pea runs the main class twice a week, plus a gentler, sensory-rich session for babies under one that focuses on bonding and first musical experiences.",
    phone: "065 392 5658",
    lineId: "@littlepeabkk",
    website: "https://www.littlepeabkk.com/service-page/music-together",
    status: "confirmed",
    sourceUrl: "https://www.littlepeabkk.com/service-page/music-together",
    lastVerified: "2026-10-07",
  },
  {
    slug: "little-pea-ballet-and-jazz",
    name: "Ballet and Jazz, Little Pea Kids Commons",
    type: "Weekly class",
    category: "Dance",
    setting: "Indoor",
    venue: "Little Pea Kids Commons, theCOMMONS Thonglor",
    address: "theCOMMONS, Thong Lo Soi 17, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "BTS Thong Lo",
    minAge: 2,
    maxAge: 12,
    hours: "Saturday: Baby Ballet (2 to 4) 9.30am and 10.30am, Level Up Ballet (4 to 6) 11.30am, Move & Groove Jazz (5 to 12) 1pm",
    price: { from: 600, unit: "session" },
    description:
      "Three Saturday dance classes by age. Baby Ballet introduces two to fours to classical dance while building coordination, motor and social skills. Level Up Ballet, with Ms. Lynn, is for four to sixes who already have a foundation and want to develop technique and confidence. Move & Groove Jazz teaches five to twelves energetic routines in a playful setting.",
    phone: "065 392 5658",
    lineId: "@littlepeabkk",
    website: "https://www.littlepeabkk.com/service-page/baby-ballet",
    status: "confirmed",
    sourceUrl: "https://www.littlepeabkk.com/service-page/baby-ballet",
    lastVerified: "2026-10-07",
  },
  {
    slug: "little-pea-little-scientists",
    name: "Little Scientists, Little Pea Kids Commons",
    type: "Weekly class",
    category: "Art and science",
    setting: "Indoor",
    venue: "Little Pea Kids Commons, theCOMMONS Thonglor",
    address: "theCOMMONS, Thong Lo Soi 17, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "BTS Thong Lo",
    minAge: 3,
    maxAge: 5,
    hours: "Sunday 11.30am to 12.30pm",
    price: { from: 600, unit: "session" },
    description:
      "A hands-on science class for three to fives, who mix, build, observe and run simple experiments, testing their own ideas and asking what happens if. The aim is curiosity and confidence rather than facts to memorise.",
    phone: "065 392 5658",
    lineId: "@littlepeabkk",
    website: "https://www.littlepeabkk.com/service-page/little-scientists",
    status: "confirmed",
    sourceUrl: "https://www.littlepeabkk.com/service-page/little-scientists",
    lastVerified: "2026-10-07",
  },
  {
    slug: "little-pea-creative-painting",
    name: "Creative Painting, Little Pea Kids Commons",
    type: "Weekly class",
    category: "Art and science",
    setting: "Indoor",
    venue: "Little Pea Kids Commons, theCOMMONS Thonglor",
    address: "theCOMMONS, Thong Lo Soi 17, Watthana",
    district: "Watthana",
    zone: "Sukhumvit",
    transit: "BTS Thong Lo",
    minAge: 5,
    maxAge: 12,
    hours: "Sunday 10.30am to 11.30am",
    price: { from: 950, unit: "session" },
    description:
      "A weekly studio session for five to twelves run by Pop Up Art Studio, led by a teacher and atelierista using the Reggio Emilia approach. It is more open-ended than a typical painting class: children learn to create, hesitate, retry and trust their own ideas, building creative confidence, fine motor skills and resilience along the way.",
    phone: "065 392 5658",
    lineId: "@littlepeabkk",
    website: "https://www.littlepeabkk.com/service-page/creative-painting-5-12-y",
    status: "confirmed",
    sourceUrl: "https://www.littlepeabkk.com/service-page/creative-painting-5-12-y",
    lastVerified: "2026-10-07",
  },
];

// ------------------------------------------------------------------ helpers

export function ageLabel(min?: number, max?: number): string | null {
  if (min === undefined && max === undefined) return null;
  if (min !== undefined && max === undefined) return min === 0 ? "All ages" : `${min} and up`;
  if (min === undefined) return `Up to ${max}`;
  if (min === 0) return `Babies to ${max}`;
  return `${min} to ${max}`;
}

export function ageMatches(age: number, a: Activity): boolean {
  if (a.minAge === undefined && a.maxAge === undefined) return true;
  const lo = a.minAge ?? 0;
  const hi = a.maxAge ?? 99;
  return age >= lo && age <= hi;
}

const UNIT_LABEL: Record<PriceUnit, string> = {
  entry: "",
  hour: " an hour",
  session: " a session",
  term: " a term",
  course: " a course",
  month: " a month",
  activity: " an activity",
};

export function priceLabel(p?: Price): string | null {
  if (!p) return null;
  if (p.free) return "Free";
  if (p.from === undefined) return null;
  const base =
    p.to && p.to !== p.from
      ? `฿${p.from.toLocaleString()} to ฿${p.to.toLocaleString()}`
      : `From ฿${p.from.toLocaleString()}`;
  return base + UNIT_LABEL[p.unit];
}

export type Budget = "free" | "under500" | "500to1000" | "over1000" | "unknown";

/** Entry-style budget band. Term and course fees always count as "over1000". */
export function budgetBand(a: Activity): Budget {
  const p = a.price;
  if (!p) return "unknown";
  if (p.free) return "free";
  if (p.from === undefined) return "unknown";
  if (p.from < 500) return "under500";
  if (p.from <= 1000) return "500to1000";
  return "over1000";
}

export const ALL_CATEGORIES_BY_TYPE = {
  "Day out": DAY_OUT_CATEGORIES,
  "Weekly class": CLASS_CATEGORIES,
} as const;
