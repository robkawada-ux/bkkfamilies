// Christmas in Bangkok with kids. One page refreshed every year at the same
// URL (/blog/christmas-in-bangkok-with-kids), so links and rankings carry
// over from year to year.
//
// Listings start as what ran LAST_YEAR, with last year's prices, so the page
// is useful from October. As venues announce this year's programmes (usually
// early to mid November), update the item, set `confirmed: true`, and bump
// CHECKED. Confirmed items get a badge and Event structured data.

import type { FinderGroup, FinderItem, FinderMeter, FinderToggle, Poster } from "@/lib/festive";

export const CHRISTMAS_SLUG = "christmas-in-bangkok-with-kids";
export const CHRISTMAS_PATH = `/blog/${CHRISTMAS_SLUG}`;
export const CHRISTMAS_YEAR = 2026;
export const LAST_YEAR = 2025;
export const CHECKED = "2026-10-14";

/** Homepage hero box window, Bangkok time, inclusive. */
export const PROMO_FROM = "2026-11-02";
export const PROMO_UNTIL = "2026-12-25";

export const CHRISTMAS_IMG_DIR = `/images/articles/${CHRISTMAS_SLUG}`;
export const CHRISTMAS_SHARE_IMAGE = `${CHRISTMAS_IMG_DIR}/christmas-in-bangkok-2026-family-guide.jpg`;

// ---------------------------------------------------------------- dinners

export const DINNER_GROUPS: FinderGroup[] = [
  {
    id: "when",
    label: "When",
    anyLabel: "Any",
    options: [
      { id: "eve", label: "Christmas Eve dinner" },
      { id: "day", label: "Christmas Day lunch or brunch" },
    ],
  },
  {
    id: "budget",
    label: "Budget",
    anyLabel: "Any",
    options: [
      { id: "1", label: "Under ฿2,000" },
      { id: "2", label: "฿2,000 to ฿3,500" },
      { id: "3", label: "฿3,500 and up" },
    ],
  },
];

export const DINNER_TOGGLES: FinderToggle[] = [
  { id: "santa", label: "Santa drops in" },
  { id: "kids", label: "Kids' extras" },
  { id: "river", label: "River views" },
];

export const DINNER_METER: FinderMeter = {
  icon: "bauble",
  label: "Price per adult",
  names: ["Under ฿2,000", "฿2,000 to ฿3,500", "฿3,500 and up"],
};

const eve = (y: number) => ({ start: `${y}-12-24`, end: `${y}-12-24` });
const day = (y: number) => ({ start: `${y}-12-25`, end: `${y}-12-25` });
const both = (y: number) => ({ start: `${y}-12-24`, end: `${y}-12-25` });
const Y = LAST_YEAR;

export const DINNERS: FinderItem[] = [
  {
    name: "Christmas Day lunch with a kids' corner",
    venue: "The Mesh, Sukhumvit 22",
    when: "Thu 25 Dec · 12pm to 3pm",
    facets: { when: ["day"], budget: ["1"] },
    flags: ["santa", "kids"],
    level: 1,
    badges: [{ text: "฿1,900++", tone: "price" }, { text: "Kids ฿950++", tone: "kids" }, { text: "Santa lucky draw", tone: "santa" }],
    blurb: "Seafood, roasts and desserts with live music, carol singers, a Santa lucky draw and a proper children's corner. Our pick for families with little ones.",
    ...day(Y),
  },
  {
    name: "Christmas Eve dinner with Santa",
    venue: "InterContinental Bangkok, Ploenchit",
    when: "Wed 24 Dec · 6pm to 10:30pm",
    facets: { when: ["eve", "day"], budget: ["2"] },
    flags: ["santa", "kids"],
    level: 2,
    badges: [{ text: "฿2,540 net", tone: "price" }, { text: "Kids 4 to 11 ฿1,270", tone: "kids" }, { text: "Under 4 free", tone: "kids" }],
    blurb: "Carol singers and a visit from Santa at the Christmas Eve buffet, plus a Christmas Day lunch from noon. Last year's early-bird price ran until 14 December.",
    ...both(Y),
  },
  {
    name: "Santa, Santarina and gifts for the kids",
    venue: "The Sukhothai Bangkok, Sathorn",
    when: "Wed 24 Dec · 6pm to 10pm, brunch 25 Dec",
    facets: { when: ["eve", "day"], budget: ["3"] },
    flags: ["santa", "kids"],
    level: 3,
    badges: [{ text: "฿3,900++ Eve", tone: "price" }, { text: "฿4,900++ brunch", tone: "price" }, { text: "Gifts for children", tone: "santa" }],
    blurb: "Santa and Santarina hand out presents at the Christmas Eve dinner, with soft drinks, coffee and tea included. Christmas Day brunch runs 12pm to 3pm.",
    ...both(Y),
  },
  {
    name: "Grand Siam Christmas Brunch",
    venue: "Anantara Siam Bangkok, Ratchadamri",
    when: "Thu 25 Dec · 12pm to 3:30pm",
    facets: { when: ["eve", "day"], budget: ["3"] },
    flags: ["santa", "kids"],
    level: 3,
    badges: [{ text: "฿4,200++", tone: "price" }, { text: "Kids 5 to 11 ฿2,100++", tone: "kids" }, { text: "Under 4 free", tone: "kids" }],
    blurb: "The big lobby brunch, with Santa arriving mid-feast. Christmas Eve dinner in the Lobby Lounge was ฿3,800++ (kids ฿1,900++).",
    link: "https://www.anantara.com/en/siam-bangkok/festive-offers/grand-siam-christmas-brunch",
    ...both(Y),
  },
  {
    name: "Christmas Eve Feast on the River Barge",
    venue: "Chatrium Riverside Bangkok, Charoen Krung",
    when: "Wed 24 Dec · 6pm to 10pm",
    facets: { when: ["eve"], budget: ["2"] },
    flags: ["santa", "river"],
    level: 2,
    badges: [{ text: "฿3,450", tone: "price" }, { text: "Kids ฿1,725", tone: "kids" }, { text: "Santa and carols", tone: "santa" }],
    blurb: "Dinner on the hotel's River Barge on the Chao Phraya, with carols and a visit from Santa. About as Bangkok as Christmas gets.",
    link: "https://www.chatrium.com/stories/festive-feasts-and-sparkling-countdowns-across-chatrium-hotels",
    ...eve(Y),
  },
  {
    name: "Christmas Eve Miracles Buffet",
    venue: "Chatrium Sathon Bangkok, Flow",
    when: "Wed 24 Dec · 6pm to 9:30pm",
    facets: { when: ["eve", "day"], budget: ["1"] },
    flags: ["kids"],
    level: 1,
    badges: [{ text: "฿1,099", tone: "price" }, { text: "Kids ฿750", tone: "kids" }],
    blurb: "The best-value hotel buffet we found, and finished by bedtime. On Christmas Day the pool deck did a family sharing set for ฿1,099 per couple.",
    link: "https://www.chatrium.com/stories/festive-feasts-and-sparkling-countdowns-across-chatrium-hotels",
    ...both(Y),
  },
  {
    name: "Christmas Eve and Christmas Day at Savio",
    venue: "Chatrium Grand Bangkok",
    when: "Eve 6pm to 9:30pm · Day lunch 12pm to 2:30pm",
    facets: { when: ["eve", "day"], budget: ["1", "2"] },
    flags: ["kids"],
    level: 2,
    badges: [{ text: "Eve ฿2,999 net", tone: "price" }, { text: "Lunch ฿1,499 net", tone: "price" }, { text: "Child prices", tone: "kids" }],
    blurb: "An international buffet with free-flow soft drinks. The Christmas Day lunch is one of the cheapest big-hotel options in town.",
    link: "https://www.chatrium.com/stories/festive-feasts-and-sparkling-countdowns-across-chatrium-hotels",
    ...both(Y),
  },
  {
    name: "Goji Christmas buffets with a Santa visit",
    venue: "Bangkok Marriott Marquis Queen's Park, Sukhumvit 22",
    when: "24 and 25 Dec · lunch and dinner",
    facets: { when: ["eve", "day"], budget: ["1", "2"] },
    flags: ["santa"],
    level: 2,
    badges: [{ text: "Eve lunch ฿1,999++", tone: "price" }, { text: "Eve dinner ฿3,399++", tone: "price" }, { text: "Santa and gifts 24 Dec", tone: "santa" }],
    blurb: "One of Bangkok's biggest buffets: roast turkey, ham, Peking duck, live lobster and a dessert room. Santa visits families on Christmas Eve. Christmas Day brunch was ฿3,399++.",
    ...both(Y),
  },
  {
    name: "Nourish Christmas Eve dinner and Christmas Day brunch",
    venue: "Mövenpick BDMS Wellness Resort, Wireless Road",
    when: "Eve 6pm to 10pm · Brunch 25 Dec 12pm to 3pm",
    facets: { when: ["eve", "day"], budget: ["2"] },
    flags: [],
    level: 2,
    badges: [{ text: "฿2,600++ / ฿2,800++", tone: "price" }, { text: "Kids 6 to 12 ฿1,500++", tone: "kids" }],
    blurb: "A relaxed garden-side buffet near Lumpini. Prepaying by 15 December took 15% off last year.",
    ...both(Y),
  },
  {
    name: "Santa Stellar Christmas Eve buffet",
    venue: "Hyatt Regency Bangkok Sukhumvit, Market Café",
    when: "Wed 24 Dec · 6pm to 10pm",
    facets: { when: ["eve"], budget: ["2"] },
    flags: [],
    level: 2,
    badges: [{ text: "฿3,000++", tone: "price" }, { text: "Kids 6 to 12 ฿1,500++", tone: "kids" }],
    blurb: "A big international buffet right on Sukhumvit at Nana, easy to reach by BTS.",
    ...eve(Y),
  },
  {
    name: "Christmas Eve buffet up high",
    venue: "The Okura Prestige Bangkok, Up & Above",
    when: "Wed 24 Dec · 6pm to 10:30pm",
    facets: { when: ["eve"], budget: ["3"] },
    flags: [],
    level: 3,
    badges: [{ text: "฿3,800++", tone: "price" }, { text: "Kids 4 to 11 ฿1,900++", tone: "kids" }],
    blurb: "Live music and city views from the Park Ventures tower at Ploenchit. Drinks were extra.",
    ...eve(Y),
  },
  {
    name: "Dreamscape Christmas at Skyline",
    venue: "Avani+ Riverside Bangkok",
    when: "Eve dinner 6pm to 10pm · Day lunch 12pm to 3pm",
    facets: { when: ["eve", "day"], budget: ["2"] },
    flags: ["river"],
    level: 2,
    badges: [{ text: "฿2,799++", tone: "price" }, { text: "Kids 5 to 11 ฿1,200++", tone: "kids" }],
    blurb: "A buffet with a live band and river and skyline views from the top of the hotel, on both Christmas Eve and Christmas Day.",
    ...both(Y),
  },
  {
    name: "Seafood Christmas Eve at Amaya",
    venue: "Amari Bangkok, Phetchaburi",
    when: "Wed 24 Dec · 6pm to 10pm",
    facets: { when: ["eve"], budget: ["2"] },
    flags: [],
    level: 2,
    badges: [{ text: "฿2,500 net", tone: "price" }, { text: "Kids ฿750", tone: "kids" }],
    blurb: "Big cooking stations, seafood and entertainment, with one of the friendliest child prices around.",
    ...eve(Y),
  },
  {
    name: "Christmas buffets at One Ratchada",
    venue: "Avani Ratchada Bangkok",
    when: "Eve dinner · Christmas Day lunch",
    facets: { when: ["eve", "day"], budget: ["1"] },
    flags: [],
    level: 1,
    badges: [{ text: "Eve ฿1,500 net", tone: "price" }, { text: "Lunch ฿900 net", tone: "price" }, { text: "Discounted kids", tone: "kids" }],
    blurb: "Proper hotel buffets at proper bargain prices. Handy for families in Ratchada, Huai Khwang and Rama 9.",
    ...both(Y),
  },
  {
    name: "Christmas Eve dinner",
    venue: "Conrad Bangkok, Wireless Road",
    when: "Wed 24 Dec · 6pm to 10pm",
    facets: { when: ["eve"], budget: ["2"] },
    flags: [],
    level: 2,
    badges: [{ text: "฿2,200++", tone: "price" }, { text: "Kids ฿1,100++", tone: "kids" }],
    blurb: "A dependable, family-friendly buffet in the All Seasons Place towers by BTS Phloen Chit.",
    ...eve(Y),
  },
  {
    name: "The Peninsula Christmas Eve gala and brunch",
    venue: "The Peninsula Bangkok, riverside",
    when: "Eve from 7pm · Brunch 25 Dec 12pm to 3pm",
    facets: { when: ["eve", "day"], budget: ["3"] },
    flags: ["kids", "river"],
    level: 3,
    badges: [{ text: "Eve ฿7,900 to ฿8,900", tone: "price" }, { text: "Brunch ฿5,500", tone: "price" }, { text: "Ages 6 to 11 half price", tone: "kids" }, { text: "Under 6 free", tone: "kids" }],
    blurb: "The splurge. A gala buffet by the river on Christmas Eve and a famous Christmas brunch. Under-sixes eat free, which softens the bill a little.",
    ...both(Y),
  },
  {
    name: "Christmas by the River and Trader Vic's brunch",
    venue: "Anantara Riverside Bangkok Resort",
    when: "Dinner 24 and 25 Dec · Brunch 25 Dec 12pm to 3pm",
    facets: { when: ["eve", "day"], budget: ["3"] },
    flags: ["river"],
    level: 3,
    badges: [{ text: "Dinner ฿3,800 net", tone: "price" }, { text: "Brunch ฿4,400 net", tone: "price" }, { text: "Kids 5 to 11 ฿1,900 to ฿2,100", tone: "kids" }],
    blurb: "A riverside terrace buffet with cultural shows and free-flow drinks, or Trader Vic's famously long Christmas Day brunch.",
    link: "https://www.anantara.com/en/riverside-bangkok/offers/christmas-brunch",
    ...both(Y),
  },
  {
    name: "Christmas dinner cruise on a rice barge",
    venue: "Manohra Cruises, from Anantara Riverside pier",
    when: "24 and 25 Dec · evening",
    facets: { when: ["eve", "day"], budget: ["3"] },
    flags: ["river"],
    level: 3,
    badges: [{ text: "฿5,300 net", tone: "price" }, { text: "Kids 5 to 11 ฿3,100", tone: "kids" }],
    blurb: "A premium Thai set menu on a restored teak rice barge, gliding past the lit-up temples. Unforgettable with kids who can sit still for two hours.",
    ...both(Y),
  },
  {
    name: "Christmas Eve with Santa and a cookie workshop",
    venue: "Rosewood Bangkok, Ploenchit",
    when: "Wed 24 Dec · dinner",
    facets: { when: ["eve"], budget: ["3"] },
    flags: ["santa", "kids"],
    level: 3,
    badges: [{ text: "Santa visit", tone: "santa" }, { text: "Free kids' cookie decorating", tone: "kids" }],
    blurb: "A five-course dinner with oyster, lobster and prime rib stations and a Santa visit. Through December the hotel also ran a free cookie-decorating and crafts workshop for kids alongside its festive afternoon tea.",
    ...eve(Y),
  },
  {
    name: "NEXT2 Café Christmas Eve buffet",
    venue: "Shangri-La Bangkok, riverside",
    when: "Wed 24 Dec · dinner",
    facets: { when: ["eve", "day"] },
    flags: ["santa", "river"],
    level: 3,
    badges: [{ text: "Santa and carolers 24 to 25 Dec", tone: "santa" }, { text: "15% early bird by 30 Nov", tone: "warn" }],
    blurb: "A riverside international buffet, with Santa and carol singers around the hotel on Christmas Eve and Christmas Day.",
    ...both(Y),
  },
  {
    name: "Christmas Eve buffet and Home Alone",
    venue: "W Bangkok, Sathorn",
    when: "Wed 24 Dec · 6pm to 9pm",
    facets: { when: ["eve"], budget: ["2"] },
    flags: ["kids"],
    level: 2,
    badges: [{ text: "฿2,119 net food only", tone: "price" }, { text: "฿2,355 with soft drinks", tone: "price" }, { text: "Movie night", tone: "kids" }],
    blurb: "Dinner and a Christmas movie screening (Home Alone, then Four Christmases). The most fun Christmas Eve on this list for kids aged about 8 and up.",
    ...eve(Y),
  },
  {
    name: "Riverside Christmas Eve buffet",
    venue: "Millennium Hilton Bangkok, Flow",
    when: "Wed 24 Dec · from 6pm",
    facets: { when: ["eve"] },
    flags: ["santa", "river"],
    level: 2,
    badges: [{ text: "Santa sighting promised", tone: "santa" }, { text: "Soft drinks included", tone: "plain" }],
    blurb: "A riverside buffet with live music and, the hotel promised, Santa. Book before the end of November for the early-bird rate.",
    link: "https://www.hilton.com/en/hotels/bkkhitw-millennium-hilton-bangkok/experiences/festive/",
    ...eve(Y),
  },
  {
    name: "Christmas roast at the pub",
    venue: "The Londoner Brew Pub, Sukhumvit 33",
    when: "24 and 25 Dec",
    facets: { when: ["eve", "day"], budget: ["1"] },
    flags: ["kids"],
    level: 1,
    badges: [{ text: "฿1,999", tone: "price" }, { text: "Under 12 main and dessert ฿999", tone: "kids" }],
    blurb: "A full British Christmas roast in a relaxed, noisy, kid-tolerant pub. No dress code, no stress.",
    ...both(Y),
  },
  {
    name: "Three-course Christmas menu",
    venue: "The Old English, Sukhumvit",
    when: "24 and 25 Dec",
    facets: { when: ["eve", "day"], budget: ["1"] },
    flags: [],
    level: 1,
    badges: [{ text: "฿995 net", tone: "price" }, { text: "Kids ฿495", tone: "kids" }],
    blurb: "Pumpkin soup, roast turkey or honey-glazed ham with pigs in blankets, and a festive pudding. The cheapest proper Christmas dinner we found.",
    ...both(Y),
  },
  {
    name: "Zeta Café festive buffet",
    venue: "Holiday Inn Bangkok Sukhumvit, Sukhumvit 22",
    when: "Christmas season",
    facets: { when: ["eve", "day"], budget: ["1"] },
    flags: [],
    level: 1,
    badges: [{ text: "฿1,055 to ฿1,290 net", tone: "price" }],
    blurb: "Roasts, seafood on ice and festive desserts at a very gentle price. Described by the hotel as family-friendly, and it is.",
    ...both(Y),
  },
  {
    name: "Christmas carvery with a mini kids' carvery",
    venue: "The Deck, Sukhumvit 20",
    when: "Christmas Day",
    facets: { when: ["day"] },
    flags: ["kids"],
    level: 1,
    badges: [{ text: "Kids' mini carvery", tone: "kids" }, { text: "Early bird before 20 Nov", tone: "warn" }],
    blurb: "Roasts, Yorkshire puddings and seafood, with a smaller carvery at a smaller price for the kids. Optional free-flow for the grown-ups.",
    ...day(Y),
  },
  {
    name: "Christmas garden brunch",
    venue: "Bangkok Trading Post",
    when: "Thu 25 Dec · 11:30am to 3pm",
    facets: { when: ["day"] },
    flags: ["kids"],
    level: 1,
    badges: [{ text: "Garden", tone: "plain" }, { text: "Pet-friendly", tone: "plain" }],
    blurb: "A semi-buffet with salmon Wellington or slow-roast beef, a live band and a garden where the kids can actually move. Dogs welcome too.",
    ...day(Y),
  },
  {
    name: "German Christmas Eve dinner",
    venue: "Alexander's German Eatery, Ekkamai 12",
    when: "Wed 24 Dec · 6pm to 10pm",
    facets: { when: ["eve"], budget: ["1"] },
    flags: [],
    level: 1,
    badges: [{ text: "฿1,750++", tone: "price" }, { text: "Free drink if prepaid by 20 Dec", tone: "warn" }],
    blurb: "Hearty German Christmas cooking in a cosy Ekkamai restaurant. A good one for grandparents visiting from Europe.",
    ...eve(Y),
  },
];

/** Our picks, shown above the dinner finder. */
export const DINNER_PICKS = [
  { award: "Best with little ones", name: "The Mesh", detail: "Kids' corner, carols and a Santa lucky draw, from ฿950++ for kids." },
  { award: "Best Santa moment", name: "The Sukhothai", detail: "Santa and Santarina bring presents to the table on Christmas Eve." },
  { award: "Most Bangkok", name: "Chatrium Riverside", detail: "Christmas Eve on a barge on the river, with Santa." },
  { award: "Best value", name: "Chatrium Sathon", detail: "A hotel buffet for ฿1,099, kids ฿750." },
  { award: "Most fun for 8+", name: "W Bangkok", detail: "Christmas Eve buffet plus a Home Alone screening." },
  { award: "The splurge", name: "The Peninsula", detail: "Riverside gala, and under-sixes eat free." },
];

// ---------------------------------------------------------------- events

export const EVENT_GROUPS: FinderGroup[] = [
  {
    id: "type",
    label: "What",
    anyLabel: "Everything",
    options: [
      { id: "santa", label: "Meet Santa" },
      { id: "lights", label: "Trees and lights" },
      { id: "market", label: "Markets" },
      { id: "show", label: "Shows and carols" },
      { id: "play", label: "Snow and play" },
    ],
  },
  {
    id: "when",
    label: "When",
    anyLabel: "Any time",
    options: [
      { id: "nov", label: "November" },
      { id: "early", label: "1 to 14 Dec" },
      { id: "mid", label: "15 to 23 Dec" },
      { id: "xmas", label: "Christmas and after" },
    ],
  },
];

export const EVENT_TOGGLES: FinderToggle[] = [{ id: "free", label: "Free" }];

const SEASON = ["nov", "early", "mid", "xmas"];

export const EVENTS: FinderItem[] = [
  {
    name: "Disney The Magical Stars and the Christmas Village",
    venue: "CentralWorld, Ratchaprasong",
    when: "14 Nov to 6 Jan · Santa on December weekends",
    facets: { type: ["lights", "santa", "show", "play"], when: SEASON },
    flags: ["free"],
    free: true,
    badges: [{ text: "Santa 3pm to 5pm weekends", tone: "santa" }, { text: "BTS Chit Lom", tone: "plain" }],
    blurb: "The classic Bangkok Christmas photo: a giant tree on the plaza, a Christmas village with fake snow, a tree-lighting show (25 Nov), a grand parade with school choirs (18 to 25 Dec) and Santa on weekend afternoons and on 24 and 25 Dec.",
    start: `${Y}-11-14`, end: `${Y + 1}-01-06`,
  },
  {
    name: "POP LAND castle, tree and bubble show",
    venue: "Siam Paragon, Siam",
    when: "11 Nov to 11 Jan · shows Fri to Sun 7pm, 8pm, 9pm",
    facets: { type: ["lights", "santa", "show"], when: SEASON },
    flags: ["free"],
    free: true,
    badges: [{ text: "Santa 2pm to 4pm weekends", tone: "santa" }, { text: "BTS Siam", tone: "plain" }],
    blurb: "A castle and Christmas tree to explore, a sparkly cascade tunnel, and a projection-mapping and bubble show on the castle every Friday to Sunday evening.",
    start: `${Y}-11-11`, end: `${Y + 1}-01-11`,
  },
  {
    name: "ICONSIAM Christmas lights",
    venue: "ICONSIAM, Charoen Nakhon",
    when: "19 Nov to 25 Dec · Santa on December weekends",
    facets: { type: ["lights", "santa"], when: ["nov", "early", "mid", "xmas"] },
    flags: ["free"],
    free: true,
    badges: [{ text: "Santa 3:30pm to 4:30pm weekends", tone: "santa" }, { text: "Free boat from BTS Saphan Taksin", tone: "plain" }],
    blurb: "A huge tree and riverside illuminations. Take the free shuttle boat from Sathorn Pier, which the kids will rate higher than the tree.",
    start: `${Y}-11-19`, end: `${Y}-12-25`,
  },
  {
    name: "The Wonder of Joy",
    venue: "EM District: Emporium, EmQuartier, EmSphere",
    when: "20 Nov to 5 Jan · parades every weekend",
    facets: { type: ["lights", "show"], when: SEASON },
    flags: ["free"],
    free: true,
    badges: [{ text: "Carols 24 to 25 Dec", tone: "plain" }, { text: "BTS Phrom Phong", tone: "plain" }],
    blurb: "An Enchanted Forest tree at EmQuartier, a fantasy character parade every weekend, and choirs singing carols on 24 and 25 December. Three linked malls, one walk.",
    start: `${Y}-11-20`, end: `${Y + 1}-01-05`,
  },
  {
    name: "Funny Little Mess with Sticky Monster Lab",
    venue: "Central Embassy, Phloen Chit",
    when: "13 Nov to 4 Jan · playground from 4 Dec",
    facets: { type: ["lights", "market", "play"], when: SEASON },
    flags: ["free"],
    free: true,
    badges: [{ text: "Free gift wrapping", tone: "free" }, { text: "BTS Phloen Chit", tone: "plain" }],
    blurb: "A 13 m Wishing Tree, an elf light tunnel, a Spying Tower where kids hunt for hidden ElfMon, a Christmas village of sweet vendors on level 5 and a ball-pit playground from 4 December.",
    start: `${Y}-11-13`, end: `${Y + 1}-01-04`,
  },
  {
    name: "ONEDEROUS Christmas: The Onedertale Christmas",
    venue: "One Bangkok, Wireless Road",
    when: "14 Nov to 4 Jan · Santa photos 25 to 28 Dec",
    facets: { type: ["lights", "santa", "market", "show"], when: SEASON },
    flags: ["free"],
    free: true,
    badges: [{ text: "Santa photos 25 to 28 Dec", tone: "santa" }, { text: "MRT Lumphini", tone: "plain" }],
    blurb: "A 52-day storybook Christmas with Santa, his reindeer, a snowman and a gingerbread family, plus parades, concerts, a Christmas market and a Santa photo corner after Christmas.",
    link: "https://www.onebangkok.com/en/whats-happening/onederous-christmas-2025--the-onedertale-christmas",
    start: `${Y}-11-14`, end: `${Y + 1}-01-04`,
  },
  {
    name: "Wat a Christmas: tuk-tuk sleigh",
    venue: "King Power Mahanakhon, Silom",
    when: "Through 31 Dec",
    facets: { type: ["lights"], when: SEASON },
    flags: [],
    badges: [{ text: "BTS Chong Nonsi", tone: "plain" }],
    blurb: "A Thai-style Santa shrine (Sala Santo) and a tuk-tuk sleigh to pose in. The most Bangkok Christmas photo of them all.",
    start: `${Y}-11-15`, end: `${Y}-12-31`,
  },
  {
    name: "Santa by the river",
    venue: "Asiatique The Riverfront, Charoen Krung",
    when: "December evenings · 5pm to 7pm",
    facets: { type: ["santa"], when: ["early", "mid", "xmas"] },
    flags: ["free"],
    free: true,
    badges: [{ text: "Evening Santa", tone: "santa" }],
    blurb: "An early-evening Santa slot, which suits kids who nap through the afternoon ones. Add the Ferris wheel and dinner and you have a whole outing.",
    start: `${Y}-12-01`, end: `${Y}-12-25`,
  },
  {
    name: "The Hope Fair: Giant Christmas Market",
    venue: "Rembrandt Hotel, Sukhumvit 18",
    when: "Wed 26 Nov · 11am to 7pm",
    facets: { type: ["market", "santa", "show"], when: ["nov"] },
    flags: [],
    badges: [{ text: "Santa 3:30pm", tone: "santa" }, { text: "100+ stalls", tone: "plain" }],
    blurb: "A huge charity market in the ballroom, with the Mercy Centre children's choir at noon and Santa mid-afternoon.",
    start: `${Y}-11-26`, end: `${Y}-11-26`,
  },
  {
    name: "German Christmas Market",
    venue: "Goethe-Institut Thailand, Sathorn Soi 1",
    when: "Sat 29 to Sun 30 Nov · from noon",
    facets: { type: ["market", "show"], when: ["nov"] },
    flags: [],
    badges: [{ text: "About ฿100 entry", tone: "price" }, { text: "Craft workshops", tone: "kids" }],
    blurb: "Mulled wine, sausages and stollen, plus kids' workshops for mini wreaths, Christmas cards and decorations, a wish tree, a Christmas sound playground and stage shows.",
    link: "https://www.goethe.de/ins/th/en/ver/wnp.html",
    start: `${Y}-11-29`, end: `${Y}-11-30`,
  },
  {
    name: "Bangkok Accueil Grand Christmas Market",
    venue: "Mövenpick hotel, Bangkok",
    when: "Sun 30 Nov",
    facets: { type: ["market", "santa"], when: ["nov"] },
    flags: ["free"],
    free: true,
    badges: [{ text: "Santa confirmed", tone: "santa" }],
    blurb: "The French-speaking community's big market, with gifts, food and a Santa appearance. Everyone is welcome.",
    start: `${Y}-11-30`, end: `${Y}-11-30`,
  },
  {
    name: "Danish Christmas Bazaar",
    venue: "Gaysorn, 19th floor, Ratchaprasong",
    when: "Sat 6 Dec · 11am to 6pm",
    facets: { type: ["market", "santa"], when: ["early"] },
    flags: ["free"],
    free: true,
    badges: [{ text: "Santa about 3pm", tone: "santa" }],
    blurb: "Danish Christmas treats, crafts and a creative kids' corner, with Santa Bill dropping in mid-afternoon. A charity favourite.",
    start: `${Y}-12-06`, end: `${Y}-12-06`,
  },
  {
    name: "The Christmas Wish Machine",
    venue: "Neilson Hays Library, Surawong",
    when: "Sun 7 Dec · 10am or 12pm",
    facets: { type: ["show"], when: ["early"] },
    flags: [],
    badges: [{ text: "฿500 · members ฿400", tone: "price" }],
    blurb: "A children's Christmas show in Bangkok's loveliest old library. Small audience, so book early.",
    start: `${Y}-12-07`, end: `${Y}-12-07`,
  },
  {
    name: "Objects of Desire Holiday Market",
    venue: "The Standard, Mahanakhon",
    when: "Fri 19 to Sun 21 Dec",
    facets: { type: ["market"], when: ["mid"] },
    flags: ["free"],
    free: true,
    badges: [{ text: "Workshops", tone: "kids" }, { text: "Pet-friendly", tone: "plain" }],
    blurb: "Two floors of local makers, art and gifts, with workshops and DJs. Good for last-minute presents that are not from a mall.",
    start: `${Y}-12-19`, end: `${Y}-12-21`,
  },
  {
    name: "Candlelight Carol Concert",
    venue: "Banyan Tree Bangkok, Sathorn",
    when: "Sun 21 Dec · 7pm",
    facets: { type: ["show"], when: ["mid"] },
    flags: [],
    badges: [{ text: "Calliope Chamber Choir", tone: "plain" }],
    blurb: "Carols in Latin and English by candlelight, under the baton of Somtow Sucharitkul. A lovely, calm hour for older children.",
    start: `${Y}-12-21`, end: `${Y}-12-21`,
  },
  {
    name: "Christmas Market in the Sukhothai garden",
    venue: "The Sukhothai Bangkok, Sathorn",
    when: "Sat 27 to Sun 28 Dec · 2pm to 9pm",
    facets: { type: ["market"], when: ["xmas"] },
    flags: ["free"],
    free: true,
    badges: [{ text: "Family activities", tone: "kids" }],
    blurb: "A garden market after Christmas, for when the kids are bored of their presents and you need somewhere pretty to walk.",
    start: `${Y}-12-27`, end: `${Y}-12-28`,
  },
  {
    name: "Snow Town",
    venue: "Dream World, Rangsit",
    when: "Open all year",
    facets: { type: ["play"], when: SEASON },
    flags: [],
    evergreen: true,
    badges: [{ text: "Real snow, indoors", tone: "kids" }],
    blurb: "The closest your kids will get to a white Christmas without a flight. Check the height rules first, which we cover in our things to do with kids guide.",
    link: "/blog/9-things-to-do-in-bangkok-with-kids",
    start: `${Y}-12-01`, end: `${Y}-12-31`,
  },
];

// ---------------------------------------------------------------- the rest

/** One-evening BTS walk past the big trees. */
export const TREE_TRAIL = [
  { stop: "Siam Paragon", station: "BTS Siam", what: "POP LAND castle and bubble show, Fri to Sun at 7pm, 8pm or 9pm." },
  { stop: "CentralWorld", station: "Skywalk, 5 min", what: "The giant plaza tree and the snowy Christmas Village." },
  { stop: "Gaysorn and Central Embassy", station: "Skywalk to BTS Phloen Chit", what: "The Wishing Tree, the elf tunnel and the ElfMon hunt." },
  { stop: "EM District", station: "BTS Phrom Phong, 4 stops", what: "The Enchanted Forest tree and three linked malls of lights." },
];

export const CHURCHES = [
  { name: "Church of the Holy Redeemer", tag: "Catholic · mostly English", text: "Soi Ruam Rudee, off Wireless Road. The main English-speaking Catholic parish, with Christmas Eve evening and Christmas morning masses." },
  { name: "Christ Church Bangkok", tag: "Anglican · English", text: "Convent Road, Silom. Carol services in December and family services at Christmas." },
  { name: "Assumption Cathedral", tag: "Catholic · Thai and English", text: "Oriental Avenue, Bang Rak. Bangkok's grand cathedral by the river, beautiful at Christmas." },
  { name: "St Louis Church", tag: "Catholic · Thai and English", text: "Sathorn. Masses on 24 and 25 December with Thai and English options." },
];

export const HOME_IDEAS = [
  {
    title: "The turkey question",
    points: [
      "Most big hotels sell takeaway roast turkey with all the trimmings. The stress-free route.",
      "Imported frozen turkeys appear at Villa Market, Gourmet Market and Foodland from late November.",
      "Measure your oven first. Bangkok condo ovens are small, and a turkey that won't fit is a very Bangkok Christmas problem.",
    ],
  },
  {
    title: "The tree and the trimmings",
    points: [
      "Real trees are rare and hate the heat, so nearly everyone goes artificial: IKEA, HomePro or the big department stores.",
      "Sampeng Lane in Chinatown sells lights and baubles by the bag at wholesale prices.",
      "Moving on soon? Ask the Facebook group in late November. Secondhand trees change hands every year.",
    ],
  },
  {
    title: "Tropical Christmas snacks",
    points: [
      "Coconut snowballs: rolled sticky rice in grated coconut. Snow you can eat in 32 °C.",
      "Strawberry Santas: a strawberry, a dab of cream, a strawberry hat.",
      "Pineapple Christmas tree: a whole pineapple studded with grapes and cheese cubes on cocktail sticks.",
    ],
  },
];

export const MOVIES: [string, string][] = [
  ["The Snowman", "All ages"],
  ["Arthur Christmas", "5+"],
  ["The Polar Express", "6+"],
  ["Klaus", "7+"],
  ["Elf", "7+"],
  ["Home Alone", "8+"],
  ["The Muppet Christmas Carol", "All ages"],
  ["Love Actually (after bedtime)", "Parents"],
];

export const FAQ: { question: string; answer: string }[] = [
  {
    question: "Is Christmas a public holiday in Thailand?",
    answer: "No. Thailand is mostly Buddhist and 25 December is a normal working day, so banks, offices and government services stay open. In 2026 Christmas Day is a Friday. International schools are on their winter break, which runs from mid December into the second week of January.",
  },
  {
    question: "Where can I get Christmas dinner in Bangkok with kids?",
    answer: "Almost every big hotel runs a Christmas Eve dinner and a Christmas Day lunch or brunch. Last year family favourites included The Mesh on Sukhumvit 22 (kids' corner and Santa lucky draw), InterContinental Bangkok (Santa and carols, under 4s free), The Sukhothai (Santa and Santarina with gifts) and Chatrium Riverside (Christmas Eve on a river barge). Book by the end of November.",
  },
  {
    question: "How much does Christmas dinner cost in Bangkok?",
    answer: "Last year a hotel Christmas buffet ran from about ฿1,000 to ฿3,500 per adult, with children usually around half price and the youngest often free. Pubs did three-course Christmas dinners from about ฿995. Luxury riverside galas reached ฿8,900. Prices marked ++ add 10% service and 7% VAT.",
  },
  {
    question: "Where can kids meet Santa in Bangkok?",
    answer: "The big malls run free Santa sessions on December weekends. Last year CentralWorld ran 3pm to 5pm, Siam Paragon 2pm to 4pm, ICONSIAM 3:30pm to 4:30pm and Asiatique The Riverfront 5pm to 7pm. Christmas markets such as the Danish Christmas Bazaar and The Hope Fair bring Santa in too, and several hotels have Santa at Christmas Eve dinner.",
  },
  {
    question: "Is there a Christmas market in Bangkok?",
    answer: "Yes, several. Last year's included The Hope Fair at the Rembrandt (26 November), the German Christmas Market at the Goethe-Institut (29 to 30 November), the Bangkok Accueil market (30 November), the Danish Christmas Bazaar at Gaysorn (6 December) and a garden market at The Sukhothai (27 to 28 December).",
  },
  {
    question: "Where are the best Christmas lights in Bangkok?",
    answer: "CentralWorld, Siam Paragon, Central Embassy, the EM District at Phrom Phong, ICONSIAM and One Bangkok put on the biggest displays, usually from mid November to early January. Go after dark on a weekday. You can walk from Siam Paragon to CentralWorld and Central Embassy on the skywalk in one evening.",
  },
  {
    question: "Are there English Christmas church services in Bangkok?",
    answer: "Yes. The Church of the Holy Redeemer on Soi Ruam Rudee, Christ Church Bangkok on Convent Road, Assumption Cathedral in Bang Rak and St Louis Church in Sathorn all hold Christmas services in English. Christmas Eve services fill up, so arrive early.",
  },
  {
    question: "What is the weather like in Bangkok at Christmas?",
    answer: "December is the cool season and the best weather of the year: dry, sunny and less humid, with highs around 31 °C and comfortable evenings. It is also the start of the smog season, so check the air quality before long outdoor plans.",
  },
];

/**
 * Posters shown on the guide. Each has a .webp (on-page) and a .jpg
 * (full-size download, image sitemap, structured data). File names lead
 * with "christmas-in-bangkok-2026".
 */
export const CHRISTMAS_POSTERS: Poster[] = [
  {
    file: "christmas-in-bangkok-2026-kids-cheat-sheet",
    w: 1080,
    h: 1350,
    title: "Christmas in Bangkok 2026 cheat sheet",
    use: "Best for Facebook posts and class WhatsApp or LINE groups",
    alt: "Christmas in Bangkok 2026 with kids cheat sheet: Christmas dinner, meeting Santa, the tree trail, markets, Christmas Day and church",
  },
  {
    file: "christmas-in-bangkok-2026-family-christmas-dinners",
    w: 1080,
    h: 1080,
    title: "28 family Christmas dinners",
    use: "Best for Instagram and Facebook feeds",
    alt: "Christmas dinner in Bangkok 2026: 28 family Christmas dinners and brunches, from ฿995 pub roasts to riverside galas",
  },
  {
    file: "christmas-in-bangkok-2026-where-to-meet-santa",
    w: 1080,
    h: 1920,
    title: "Where to meet Santa in Bangkok",
    use: "Best for Instagram and Facebook stories",
    alt: "Where to meet Santa in Bangkok at Christmas 2026: malls, Christmas markets and Christmas Eve dinners with Santa",
  },
];
