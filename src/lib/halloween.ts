// Halloween in Bangkok with kids. One page refreshed every October at the
// same URL (/blog/halloween-in-bangkok-with-kids), so links and rankings
// carry over from year to year.
//
// Each October: update HALLOWEEN_YEAR, the promo window, EVENTS and the
// dated copy on the page. Events are checked against organisers' own posts;
// set CHECKED to the date you last did that.

export const HALLOWEEN_SLUG = "halloween-in-bangkok-with-kids";
export const HALLOWEEN_PATH = `/blog/${HALLOWEEN_SLUG}`;
export const HALLOWEEN_YEAR = 2026;
export const CHECKED = "2026-10-14";

/**
 * The homepage hero box and the blog pin show from PROMO_FROM to PROMO_UNTIL
 * inclusive, Bangkok time. Homepage and blog re-render hourly, so both come
 * down on their own after Halloween weekend with no deploy.
 */
export const PROMO_FROM = "2026-10-01";
export const PROMO_UNTIL = "2026-11-01";

/** Today's date in Bangkok (UTC+7) as YYYY-MM-DD. */
export function bangkokToday(now: Date = new Date()): string {
  return new Date(now.getTime() + 7 * 3600 * 1000).toISOString().slice(0, 10);
}

export function isHalloweenSeason(now: Date = new Date()): boolean {
  const today = bangkokToday(now);
  return today >= PROMO_FROM && today <= PROMO_UNTIL;
}

/** Whole days from today (Bangkok) to Halloween. Negative once it has passed. */
export function daysToHalloween(now: Date = new Date()): number {
  const today = Date.parse(bangkokToday(now) + "T00:00:00Z");
  const hw = Date.parse(`${HALLOWEEN_YEAR}-10-31T00:00:00Z`);
  return Math.round((hw - today) / 86400000);
}

export type Day = "month" | "w1" | "fri30" | "sat31" | "sun1";
export type Age = "little" | "kids" | "teens";

export interface HalloweenEvent {
  name: string;
  venue: string;
  /** Human-readable when line shown on the card. */
  when: string;
  /** Filter tags. */
  days: Day[];
  ages: Age[];
  /** 1 Giggle (toddler safe), 2 Shiver (spooky but fun), 3 Scream (teens only). */
  fright: 1 | 2 | 3;
  price?: string;
  /** Free, or free to walk around. */
  free?: boolean;
  /** Age warning shown instead of age tags. */
  teen?: string;
  blurb: string;
  link?: string;
  contact?: string;
  /** ISO, for Event structured data. Date only, or date-time with +07:00. */
  start: string;
  end: string;
}

const ALL: Day[] = ["month", "w1", "fri30", "sat31", "sun1"];

export const DAY_FILTERS: { id: Day | "all"; label: string }[] = [
  { id: "all", label: "Any day" },
  { id: "month", label: "All month" },
  { id: "w1", label: "Sat 24 to Sun 25 Oct" },
  { id: "fri30", label: "Fri 30 Oct" },
  { id: "sat31", label: "Sat 31 Oct" },
  { id: "sun1", label: "Sun 1 Nov" },
];

export const AGE_FILTERS: { id: Age | "all"; label: string }[] = [
  { id: "all", label: "Everyone" },
  { id: "little", label: "Under 6" },
  { id: "kids", label: "6 to 12" },
  { id: "teens", label: "Teens" },
];

export const AGE_LABELS: Record<Age, string> = { little: "Under 6", kids: "6 to 12", teens: "Teens" };

export const EVENTS: HalloweenEvent[] = [
  {
    name: "Spooky Town: Haunted Toy Village",
    venue: "Chocolate Ville, Kaset-Nawamin",
    when: "Now to Sun 1 Nov · activities 4pm to 10pm",
    days: ALL, ages: ["little", "kids", "teens"], fright: 1,
    blurb: "The storybook village turns into a haunted toy town with pumpkins, character parades and photo spots, plus a Ghostbusters show on the lake after dark. Go late afternoon so you catch the lights.",
    link: "https://chocolateville.co.th/", contact: "099 079 9888",
    start: "2026-08-23", end: "2026-11-01",
  },
  {
    name: "EM District Haunted Carnival",
    venue: "EmSphere, EmQuartier and Emporium, Sukhumvit",
    when: "All October · Spooky Parade Sat 31 Oct",
    days: ALL, ages: ["little", "kids"], fright: 1, free: true,
    blurb: "Halloween across all three malls. EMJOY runs kids' workshops every Saturday and Sunday until 1 Nov, and the Spooky Parade of kids in costume happens on Halloween itself. Pumpkin Club at EM Market Hall runs 27 Oct to 4 Nov.",
    link: "https://emsphere.co.th/event-em-district-haunted-carnival-2026/", contact: "02 269 1000",
    start: "2026-10-01", end: "2026-10-31",
  },
  {
    name: "Halloween Passport month",
    venue: "Sparkles & Sprinkles Kids' Cafe, Park Phloenchit B floor",
    when: "Now to Sat 31 Oct · 9am to 6pm",
    days: ["month", "w1", "fri30", "sat31"], ages: ["little"], fright: 1, price: "Regular entry",
    blurb: "Pick up a Halloween Passport and complete games, challenges and ghost hunts all month. Ideal for a hot weekday afternoon with a preschooler.",
    contact: "Sparklesandsprinklesbkk@gmail.com",
    start: "2026-10-01", end: "2026-10-31",
  },
  {
    name: "Halloween workshops and photo challenge",
    venue: "Playmondo, CentralWorld 2F and branches",
    when: "Now to Sat 31 Oct",
    days: ["month", "w1", "fri30", "sat31"], ages: ["little", "kids"], fright: 1,
    blurb: "Join a Halloween workshop, post your photo, and you could win free entry (10 winners, announced 6 Nov).",
    link: "https://www.playmondo.com/", contact: "LINE @playmondo",
    start: "2026-10-01", end: "2026-10-31",
  },
  {
    name: "UV colour-shifting magic slime",
    venue: "SlimeVille, CentralWorld 6F",
    when: "Every session in October",
    days: ["month", "w1", "fri30", "sat31"], ages: ["kids"], fright: 1, price: "฿1,190",
    blurb: "Make slime that changes colour under UV light, then decorate it. Messy, glowing, and somebody else cleans up.",
    link: "https://www.facebook.com/profile.php?id=61556098372364",
    start: "2026-10-01", end: "2026-10-31",
  },
  {
    name: "The Haunted House science weekends",
    venue: "Kidsdela, Lasalle's Avenue 1F",
    when: "Sat & Sun in Oct · 9am to 12pm or 1pm to 4pm",
    days: ["month", "w1"], ages: ["kids"], fright: 1,
    blurb: "Halloween-themed chemistry and physics experiments. Sneaky learning in a witch hat.",
    link: "https://www.kidsdela.com/", contact: "LINE @kidsdela7 · 099 142 3656",
    start: "2026-10-24", end: "2026-10-25",
  },
  {
    name: "MEGA Halloween: Haunted University",
    venue: "MEGA Plaza, MEGA Bangna",
    when: "Now to Sun 1 Nov · 12pm to 10pm",
    days: ALL, ages: ["teens"], fright: 3, price: "฿350", teen: "13+ only",
    blurb: "Six haunted \"faculties\" to escape, with clues to solve and a 100,000 THB prize pool. Come 12pm to 1pm for ฿100 off. Free ghost-story nights on Sat 24 and Sat 31 Oct, 6:30pm to 8:30pm (in Thai).",
    link: "https://x-pass.me/th/ticket/event/megabangna-haunted-universities/", contact: "02 105 1000",
    start: "2026-10-09", end: "2026-11-01",
  },
  {
    name: "The Ghost Halloween #3",
    venue: "MCC Hall 3F, The Mall Lifestore Bangkapi",
    when: "Fri 23 Oct to Sun 8 Nov",
    days: ["w1", "fri30", "sat31", "sun1"], ages: ["teens"], fright: 3, teen: "12+ recommended",
    blurb: "Four immersive haunted rides themed on a plane, a tour bus, a train and a ghost ship. The most intense scare on this list. Not for little ones.",
    link: "https://www.facebook.com/themalllifestorebangkapi", contact: "02 173 1000",
    start: "2026-10-23", end: "2026-11-08",
  },
  {
    name: "Trick or Freak weekends",
    venue: "Market Place Nanglinchee, Nawamin and Krungthep Kreetha",
    when: "17 to 18, 24 to 25 and 30 to 31 Oct",
    days: ["w1", "fri30", "sat31"], ages: ["kids", "teens"], fright: 1, price: "Free with spend",
    blurb: "Make your own aroma oil \"love potion\" (free with a ฿400 spend) and spin the lucky wheel (free with ฿100).",
    link: "https://www.facebook.com/MarketPlaceThepRak/", contact: "080 495 6888",
    start: "2026-10-17", end: "2026-10-31",
  },
  {
    name: "ABRA KA DA BOO! Magic School",
    venue: "Playville, Soi Klang, Watthana",
    when: "Sat 24 to Sun 25 Oct · 10am or 2pm",
    days: ["w1"], ages: ["little", "kids"], fright: 1, price: "฿990 child + adult",
    blurb: "A two-hour wizard school: make a wand, brew potions, face the three-headed guardian and graduate with a hat, badge, certificate and trick-or-treat broom.",
    link: "http://www.playville.co.th/", contact: "LINE @playville",
    start: "2026-10-24", end: "2026-10-25",
  },
  {
    name: "Little Halloween Contest",
    venue: "Central Pinklao",
    when: "Sat 24 Oct · 11am to 6pm",
    days: ["w1"], ages: ["little", "kids"], fright: 1, price: "Register online",
    blurb: "Costume competition for ages 3 to 12 with over 15,000 THB in prizes. Time to finally use that glue gun.",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSeXSaOAFad5-GCyxvFXufziAwEtv_YHchbY0fX0wn95cI6q0w/viewform", contact: "02 877 5000",
    start: "2026-10-24T11:00:00+07:00", end: "2026-10-24T18:00:00+07:00",
  },
  {
    name: "Petloween Parade and Awoooo! Pet Market",
    venue: "Central EastVille, Lat Phrao",
    when: "Parade Sat 24 Oct · market Fri 30 Oct to Sun 1 Nov",
    days: ["w1", "fri30", "sat31", "sun1"], ages: ["little", "kids", "teens"], fright: 1, free: true,
    blurb: "Dress the dog too. Outdoor, pet-friendly Halloween with a costume parade and a weekend pet market. Not scary unless you count a pug in a cape.",
    link: "https://www.facebook.com/CentralEastVilleFanpage", contact: "02 102 5000",
    start: "2026-10-24", end: "2026-11-01",
  },
  {
    name: "Halloween Monster House",
    venue: "Nine Square 1F, The Nine Center Rama 9",
    when: "Thu 22 Oct to Sun 1 Nov",
    days: ["w1", "fri30", "sat31", "sun1"], ages: ["little", "kids"], fright: 1, free: true,
    blurb: "A colourful, very un-scary monster house with activities and photo spots.",
    link: "https://www.thenine.co.th/rama9", contact: "02 853 9000",
    start: "2026-10-22", end: "2026-11-01",
  },
  {
    name: "Monster Dance",
    venue: "6th floor car park, Central Rama 9",
    when: "Thu 29 to Sat 31 Oct",
    days: ["fri30", "sat31"], ages: ["kids", "teens"], fright: 1, free: true,
    blurb: "Dress up and dance on the car park roof. Good for burning off the sugar.",
    contact: "02 103 5999",
    start: "2026-10-29", end: "2026-10-31",
  },
  {
    name: "Halloween Ghostmami",
    venue: "The Hill G floor, Central Northville, Nonthaburi",
    when: "Thu 29 Oct to Wed 4 Nov",
    days: ["fri30", "sat31", "sun1"], ages: ["little", "kids"], fright: 1, free: true,
    blurb: "A Halloween zone for families north of the city.",
    link: "https://www.centralnorthville.com/en", contact: "02 103 5777",
    start: "2026-10-29", end: "2026-11-04",
  },
  {
    name: "Halloween Wizard Town",
    venue: "K Village, Sukhumvit 26",
    when: "Fri 30 Oct to Sun 1 Nov · 10am to 8pm",
    days: ["fri30", "sat31", "sun1"], ages: ["little", "kids", "teens"], fright: 1, free: true,
    blurb: "Three days of magical Halloween fun at the community mall, right down the soi from Bambini Villa. Easy to do both.",
    link: "https://www.facebook.com/kvillagebkk",
    start: "2026-10-30T10:00:00+07:00", end: "2026-11-01T20:00:00+07:00",
  },
  {
    name: "Wicked Hallow balloon village",
    venue: "M Lifestyle Hall G, The Mall Lifestore Tha Phra",
    when: "Fri 30 Oct to Wed 4 Nov",
    days: ["fri30", "sat31", "sun1"], ages: ["little", "kids"], fright: 1, free: true,
    blurb: "A fantasy village made of balloons. Cute, colourful, and the best first Halloween outing for nervous little ones.",
    link: "https://www.facebook.com/themalllifestorethapra", contact: "02 469 1000",
    start: "2026-10-30", end: "2026-11-04",
  },
  {
    name: "Haunted Doll Factory",
    venue: "The Mall Lifestore Bangkae",
    when: "Tue 27 Oct to Sun 1 Nov",
    days: ["fri30", "sat31", "sun1"], ages: ["teens"], fright: 3, teen: "Older kids and teens",
    blurb: "A creepy-doll factory walk-through. If your child already distrusts porcelain dolls, this will not help.",
    contact: "02 487 1000",
    start: "2026-10-27", end: "2026-11-01",
  },
  {
    name: "Siam Halloween 2026",
    venue: "Siam Square",
    when: "Fri 30 Oct to Sun 1 Nov",
    days: ["fri30", "sat31", "sun1"], ages: ["teens"], fright: 2, free: true,
    blurb: "Free street festival with 100+ performers, Halloween activities and a cosplay contest. Big, loud and crowded. A teen's dream, a toddler's nightmare.",
    link: "https://www.facebook.com/SiamHalloween", contact: "02 218 9853",
    start: "2026-10-30", end: "2026-11-01",
  },
  {
    name: "Midnight Museum",
    venue: "Kensington Learning Space, Taling Chan",
    when: "Fri 30 Oct · 5pm to 7:30pm",
    days: ["fri30"], ages: ["little", "kids"], fright: 2, price: "฿3,200 (1 child + 2 adults)",
    blurb: "A museum that \"opens for one night\": insect trick-or-treat missions, haunted portraits, a night-time gym and a science show. Extra child ฿1,500, extra adult ฿500. Limited spaces.",
    link: "https://klearningspace.com/", contact: "LINE @KLearningSpace · 099 245 7777",
    start: "2026-10-30T17:00:00+07:00", end: "2026-10-30T19:30:00+07:00",
  },
  {
    name: "FOBP Halloween Spooktacular",
    venue: "Bangkok Prep, Sukhumvit 77",
    when: "Fri 30 Oct · 12pm to 5pm",
    days: ["fri30"], ages: ["kids"], fright: 2,
    blurb: "The Friends of Bangkok Prep's annual Halloween fair. This year's theme turns everything upside down. Check with the school about public entry.",
    link: "https://www.bangkokprep.ac.th", contact: "02 700 5858",
    start: "2026-10-30T12:00:00+07:00", end: "2026-10-30T17:00:00+07:00",
  },
  {
    name: "Little Wizards Halloween Academy",
    venue: "Bambini Villa, Sukhumvit 26",
    when: "Sat 31 Oct to Sun 1 Nov · 10am to 6pm",
    days: ["sat31", "sun1"], ages: ["little", "kids"], fright: 2, price: "Walk-in",
    blurb: "Magic classes, a haunted house, face painting, a wizard-maker room, shows and trick-or-treating. Walk-in only, no booking, so go early.",
    link: "https://bambinivilla.com/", contact: "090 969 9559",
    start: "2026-10-31T10:00:00+07:00", end: "2026-11-01T18:00:00+07:00",
  },
  {
    name: "Halloween Party for All",
    venue: "Bon Marché Market Park, Chatuchak",
    when: "Sat 31 Oct · 10am to 4pm",
    days: ["sat31"], ages: ["little", "kids"], fright: 2, price: "Register",
    blurb: "Hosted by Carroll Prep: trick-or-treat around the market, costume contest, kids' talent show and a kids-sized haunted house.",
    link: "https://www.carrollprep.ac.th/", contact: "LINE @carrollprep · 02 954 2168",
    start: "2026-10-31T10:00:00+07:00", end: "2026-10-31T16:00:00+07:00",
  },
  {
    name: "Wild Spooky Rumpus",
    venue: "theCOMMONS Thonglor",
    when: "Sat 31 Oct to Sun 1 Nov · 10am to 5pm",
    days: ["sat31", "sun1"], ages: ["little", "kids"], fright: 1, free: true,
    blurb: "Trick-or-treat trains (limited spots), crafts, face painting, a little monster hunt, a family market and free spooky storytime. A Halloween Fun Pass bundles the paid activities.",
    link: "https://shop.line.me/@littlepeabkk", contact: "065 392 5658",
    start: "2026-10-31T10:00:00+07:00", end: "2026-11-01T17:00:00+07:00",
  },
  {
    name: "Halloween Story Time",
    venue: "Neilson Hays Library, Surawong",
    when: "Sat 31 Oct · 10:30am",
    days: ["sat31"], ages: ["little", "kids"], fright: 1, price: "฿350 · free for members",
    blurb: "Spooky stories, crafts and decorations in Bangkok's loveliest old library. Costumes welcome. Registration opens Tue 27 Oct on the library's Facebook page and fills fast.",
    link: "http://neilsonhayslibrary.org/", contact: "info@neilsonhayslibrary.org",
    start: "2026-10-31T10:30:00+07:00", end: "2026-10-31T12:00:00+07:00",
  },
  {
    name: "Halloween Day & Night",
    venue: "PlayED, Thonglor 7",
    when: "Sat 31 Oct to Sun 1 Nov · day or sleepover",
    days: ["sat31", "sun1"], ages: ["kids"], fright: 2,
    blurb: "Pumpkin carving, a foam party, trick-or-treating and a Halloween disco. Brave overnighters add campfire stories and a movie under the stars. Day: Sat 1pm to 7pm or Sun 9am to 3pm.",
    link: "https://www.greengroupagency.com/", contact: "LINE @greengroupagency · 063 991 3663",
    start: "2026-10-31T13:00:00+07:00", end: "2026-11-01T15:00:00+07:00",
  },
  {
    name: "A Night at Hogwarts",
    venue: "Priyam's Kitchen Academy, Sathu Pradit Soi 19",
    when: "Sat 31 Oct · 4:30pm to 8:30pm",
    days: ["sat31"], ages: ["kids"], fright: 1,
    blurb: "Outdoor movie and dinner for young wizards. Only 20 places.",
    link: "https://priyamskitchenforkids.com/", contact: "LINE @pkacademy · 081 865 3343",
    start: "2026-10-31T16:30:00+07:00", end: "2026-10-31T20:30:00+07:00",
  },
  {
    name: "The Haunted Wonder",
    venue: "Wonder Woods Kids Café, Pattanakarn 51",
    when: "Sat 31 Oct to Sun 1 Nov",
    days: ["sat31", "sun1"], ages: ["little", "kids"], fright: 1, price: "฿1,600 child + adult",
    blurb: "A \"not-so-spooky\" day: a 90 m² Halloween maze, magic and story shows, a mascot walk, a sci-lab, six sensory stations and face and nail painting.",
    link: "https://www.facebook.com/wonderwoodskidscafe", contact: "062 592 8822",
    start: "2026-10-31", end: "2026-11-01",
  },
];

export const FAQ: { question: string; answer: string }[] = [
  {
    question: "When is Halloween 2026 in Bangkok?",
    answer: "Halloween falls on Saturday 31 October 2026. Most family events run from Friday 30 October to Sunday 1 November, and the big mall displays run through October.",
  },
  {
    question: "Do people celebrate Halloween in Thailand?",
    answer: "It isn't a Thai tradition, but Bangkok celebrates it enthusiastically. Malls build haunted houses and costume parades, international schools hold Halloween fairs, and many condos and housing estates run their own trick-or-treat trails.",
  },
  {
    question: "Where can kids go trick-or-treating in Bangkok?",
    answer: "Trick-or-treating happens in condo buildings, gated moo baan housing estates and organised trails rather than door to door on the street. In 2026 there are trails at Wild Spooky Rumpus at theCOMMONS Thonglor, Carroll Prep's party at Bon Marché Market Park and Bambini Villa on Sukhumvit 26.",
  },
  {
    question: "What are the best free Halloween events in Bangkok for families?",
    answer: "Free picks for 2026 include the EM District Spooky Parade on 31 October, entry to Wild Spooky Rumpus at theCOMMONS Thonglor, the Siam Halloween street festival at Siam Square, and the mall displays at The Nine Rama 9, K Village and Central EastVille.",
  },
  {
    question: "Which Bangkok haunted houses are suitable for teenagers?",
    answer: "MEGA Bangna's Haunted University (13+, ฿350, until 1 November), The Ghost Halloween at The Mall Lifestore Bangkapi (12+, 23 October to 8 November) and the Haunted Doll Factory at The Mall Lifestore Bangkae are built for teens and adults, not young children.",
  },
  {
    question: "Where can I buy a Halloween costume in Bangkok?",
    answer: "Platinum Fashion Mall in Pratunam and Sampeng Lane in Chinatown are the cheapest places for costumes and decorations. For kids' costumes try Ri-Tah-Rae Costume Shop on Sukhumvit 50 or Petit Mask, and for rentals try Alex Costume, Enjoy Suite or Dreambox.",
  },
];
