// New Year's Eve in Bangkok with kids. One page refreshed every year at the
// same URL (/blog/new-years-eve-in-bangkok-with-kids).
//
// Listings start as what ran LAST_YEAR (New Year's Eve 2025, the countdown
// to 2026). As venues announce this year's line-ups, update the item, set
// `confirmed: true`, and bump CHECKED.

import type { FinderGroup, FinderItem, FinderMeter, FinderToggle, Poster } from "@/lib/festive";

export const NYE_SLUG = "new-years-eve-in-bangkok-with-kids";
export const NYE_PATH = `/blog/${NYE_SLUG}`;
export const NYE_YEAR = 2026;
export const LAST_YEAR = 2025;
export const CHECKED = "2026-10-14";

/** Homepage hero box window, Bangkok time, inclusive. */
export const PROMO_FROM = "2026-12-26";
export const PROMO_UNTIL = "2027-01-01";

export const NYE_IMG_DIR = `/images/articles/${NYE_SLUG}`;
export const NYE_SHARE_IMAGE = `${NYE_IMG_DIR}/new-years-eve-bangkok-2026-family-guide.jpg`;

const Y = LAST_YEAR;
const nye = (y: number) => ({ start: `${y}-12-31`, end: `${y + 1}-01-01` });

// ---------------------------------------------------------------- countdowns

export const COUNTDOWN_GROUPS: FinderGroup[] = [
  {
    id: "area",
    label: "Where",
    anyLabel: "Anywhere",
    options: [
      { id: "river", label: "On the river" },
      { id: "downtown", label: "Downtown" },
      { id: "sukhumvit", label: "Sukhumvit" },
      { id: "out", label: "Further out" },
    ],
  },
  {
    id: "crowd",
    label: "Crowd",
    anyLabel: "Any size",
    options: [
      { id: "1", label: "Cosy" },
      { id: "2", label: "Busy" },
      { id: "3", label: "Mega" },
    ],
  },
];

export const COUNTDOWN_TOGGLES: FinderToggle[] = [
  { id: "fireworks", label: "Fireworks" },
  { id: "free", label: "Free" },
];

export const CROWD_METER: FinderMeter = {
  icon: "person",
  label: "Crowd level",
  names: ["Cosy", "Busy", "Mega"],
};

export const COUNTDOWNS: FinderItem[] = [
  {
    name: "Amazing Thailand Countdown",
    venue: "ICONSIAM, Charoen Nakhon",
    when: "28 to 31 Dec · fireworks at midnight",
    facets: { area: ["river"], crowd: ["3"] },
    flags: ["fireworks", "free"],
    level: 3,
    free: true,
    badges: [{ text: "Drones and fireworks", tone: "santa" }, { text: "Livestreamed", tone: "plain" }],
    blurb: "The city's headline show: a 4D sky show of eco-friendly fireworks along 1,400 m of river, drone formations and pyrotechnics, with Mark Tuan, Jeff Satur, Bodyslam and BUS on stage. Riverside areas are free but fill by late afternoon; some front zones need registration. Best with teens.",
    ...nye(Y),
  },
  {
    name: "CentralWorld Bangkok Countdown",
    venue: "CentralWorld, Ratchaprasong",
    when: "31 Dec · concerts all evening",
    facets: { area: ["downtown"], crowd: ["3"] },
    flags: ["fireworks", "free"],
    level: 3,
    free: true,
    badges: [{ text: "6 roads closed", tone: "warn" }, { text: "BTS Chit Lom or Siam", tone: "plain" }],
    blurb: "Bangkok's Times Square moment: concerts, giant screens and the midnight countdown on the plaza, after ten nights of the New Era Music Festival (21 to 30 Dec). Roads around it closed from 4pm. Brilliant for teens, hard with a stroller.",
    ...nye(Y),
  },
  {
    name: "One Bangkok Countdown",
    venue: "One Bangkok, Wireless Road",
    when: "31 Dec · register in advance",
    facets: { area: ["downtown"], crowd: ["2"] },
    flags: ["fireworks", "free"],
    level: 2,
    free: true,
    badges: [{ text: "QR registration, bring ID", tone: "warn" }, { text: "MRT Lumphini", tone: "plain" }],
    blurb: "Big Thai artists, surprise international acts, 360-degree fireworks and lasers. Entry was by QR code and your ID had to match the registered name, which kept the numbers manageable. A good step up for tweens.",
    ...nye(Y),
  },
  {
    name: "Wonder Countdown and Extravaganza Sukhumvit",
    venue: "EmQuartier, Asok, Phrom Phong, Benchasiri Park and Thong Lo",
    when: "31 Dec",
    facets: { area: ["sukhumvit"], crowd: ["2"] },
    flags: ["fireworks", "free"],
    level: 2,
    free: true,
    badges: [{ text: "Drones and lasers", tone: "santa" }, { text: "BTS Phrom Phong", tone: "plain" }],
    blurb: "A countdown strung along Sukhumvit with drones, lasers, searchlights and eco-friendly fireworks, and a concert at EmQuartier's Quartier Parc (J Jetrin, Three Man Down, Perses). Benchasiri Park gives kids grass to sit on instead of a road.",
    ...nye(Y),
  },
  {
    name: "Asiatique Thailand Countdown",
    venue: "Asiatique The Riverfront, Charoen Krung",
    when: "31 Dec · from 5pm",
    facets: { area: ["river"], crowd: ["2"] },
    flags: ["fireworks", "free"],
    level: 2,
    free: true,
    badges: [{ text: "Ferris wheel", tone: "kids" }, { text: "Laser show", tone: "plain" }],
    blurb: "River fireworks with a relaxed, open-air feel: concerts (Bodyslam, Zeal, Paradox), a laser show and plenty of places to eat. Come early, ride the wheel, and decide at 9pm whether you're staying.",
    ...nye(Y),
  },
  {
    name: "Samyan Mitrtown Countdown",
    venue: "Samyan Mitrtown, Rama 4",
    when: "3 days to 31 Dec",
    facets: { area: ["downtown"], crowd: ["2"] },
    flags: ["free"],
    level: 2,
    free: true,
    badges: [{ text: "Alcohol-free drinks zone", tone: "kids" }, { text: "MRT Sam Yan", tone: "plain" }],
    blurb: "Three days of free concerts at the Samyan junction, food stalls, and a POLYCAT countdown. There's a milk-and-soft-drinks zone, so it feels more family than party. No fireworks last year.",
    ...nye(Y),
  },
  {
    name: "Seacon Countdown",
    venue: "Seacon Square, Srinakarin",
    when: "30 and 31 Dec",
    facets: { area: ["out"], crowd: ["2"] },
    flags: ["fireworks", "free"],
    level: 2,
    free: true,
    badges: [{ text: "Free concert", tone: "free" }],
    blurb: "A free concert on the front lawn (POLYCAT, Three Man Down and Moderndog on the 31st) and fireworks at midnight. Handy for families out east near Bangna and Srinakarin.",
    ...nye(Y),
  },
  {
    name: "ChangChui Fest: Countdown",
    venue: "ChangChui Creative Park, Thonburi",
    when: "30 and 31 Dec",
    facets: { area: ["out"], crowd: ["1"] },
    flags: ["fireworks"],
    level: 1,
    badges: [{ text: "Restaurant in a plane", tone: "kids" }],
    blurb: "Live music, food, a Christmas tree and fireworks at the quirky creative park with a whole jet airliner in the middle. Smaller and calmer than downtown.",
    ...nye(Y),
  },
  {
    name: "Mega Bangna Countdown",
    venue: "Mega Bangna, Bang Na-Trat",
    when: "31 Dec",
    facets: { area: ["out"], crowd: ["2"] },
    flags: [],
    level: 2,
    badges: [{ text: "Seven-act concert", tone: "plain" }],
    blurb: "A countdown concert (Tilly Birds, Perses, Joey Boy and more) at the big family mall near Suvarnabhumi. Easy parking, easy exit.",
    ...nye(Y),
  },
  {
    name: "Happiness Countdown",
    venue: "Future Park, Rangsit",
    when: "31 Dec",
    facets: { area: ["out"], crowd: ["2"] },
    flags: [],
    level: 2,
    badges: [{ text: "Near Don Mueang", tone: "plain" }],
    blurb: "A mall concert countdown (MXFRUIT, BUS, URBOYTJ) for families living north of the city.",
    ...nye(Y),
  },
];

// ---------------------------------------------------------------- dinners

export const DINNER_GROUPS: FinderGroup[] = [
  {
    id: "type",
    label: "Style",
    anyLabel: "Any",
    options: [
      { id: "early", label: "Early dinner" },
      { id: "view", label: "Fireworks view" },
      { id: "cruise", label: "River cruise" },
      { id: "fun", label: "Family fun" },
    ],
  },
  {
    id: "budget",
    label: "Budget",
    anyLabel: "Any",
    options: [
      { id: "1", label: "Under ฿3,000" },
      { id: "2", label: "฿3,000 to ฿6,000" },
      { id: "3", label: "฿6,000 and up" },
    ],
  },
];

export const DINNER_TOGGLES: FinderToggle[] = [
  { id: "fireworks", label: "See the fireworks" },
  { id: "kids", label: "Kids' price or extras" },
];

export const PRICE_METER: FinderMeter = {
  icon: "star",
  label: "Price per adult",
  names: ["Under ฿3,000", "฿3,000 to ฿6,000", "฿6,000 and up"],
};

export const DINNERS: FinderItem[] = [
  {
    name: "Carnival of Joy buffet",
    venue: "Crowne Plaza Bangkok Lumpini Park, Panorama",
    when: "31 Dec · 6:30pm to 10pm",
    facets: { type: ["early", "fun"] },
    flags: ["kids"],
    level: 2,
    badges: [{ text: "Clowns and juggling", tone: "kids" }],
    blurb: "A New Year's Eve buffet with clowns, balloon juggling and family entertainment all evening, finishing at 10pm. Made for families, overlooking Lumpini.",
    ...nye(Y),
  },
  {
    name: "A Grand New Year's Eve",
    venue: "Chatrium Grand Bangkok, Savio",
    when: "31 Dec · 6pm to 9pm",
    facets: { type: ["early"], budget: ["2"] },
    flags: [],
    level: 2,
    badges: [{ text: "฿3,499 net", tone: "price" }],
    blurb: "An international buffet that's over by nine. The sweet spot with small children: a festive dinner, home for bed, fireworks from the balcony.",
    link: "https://www.chatrium.com/stories/festive-feasts-and-sparkling-countdowns-across-chatrium-hotels",
    ...nye(Y),
  },
  {
    name: "Barbecue Countdown with a balloon release",
    venue: "Chatrium Sathon Bangkok, Flow",
    when: "31 Dec · until midnight",
    facets: { type: ["fun"], budget: ["1"] },
    flags: ["kids"],
    level: 1,
    badges: [{ text: "Skewers from ฿899", tone: "price" }, { text: "Balloon release", tone: "kids" }],
    blurb: "A relaxed poolside barbecue with entertainment and a balloon release at the countdown. The cheapest hotel New Year's Eve we found.",
    link: "https://www.chatrium.com/stories/festive-feasts-and-sparkling-countdowns-across-chatrium-hotels",
    ...nye(Y),
  },
  {
    name: "Countdown to 2026 family day",
    venue: "The Londoner Brew Pub, Sukhumvit 33",
    when: "31 Dec · all day",
    facets: { type: ["early", "fun"], budget: ["1"] },
    flags: ["kids"],
    level: 1,
    badges: [{ text: "Family-friendly day", tone: "kids" }],
    blurb: "A pub that billed New Year's Eve as a family day, with food from lunchtime and prosecco for the grown-ups. Leave whenever the little ones flag.",
    ...nye(Y),
  },
  {
    name: "New Year's Eve buffet at 57th Street",
    venue: "Bangkok Marriott Hotel Sukhumvit, Thong Lo",
    when: "31 Dec · from 6pm",
    facets: { type: ["early"], budget: ["2"] },
    flags: [],
    level: 2,
    badges: [{ text: "฿3,390", tone: "price" }],
    blurb: "A big lobby-floor buffet near BTS Thong Lo, close to the Sukhumvit countdown if you want to walk out for midnight.",
    ...nye(Y),
  },
  {
    name: "New Year's Eve gala buffet",
    venue: "Ventisi, Centara Grand at CentralWorld",
    when: "31 Dec",
    facets: { type: ["view"], budget: ["1"] },
    flags: [],
    level: 1,
    badges: [{ text: "From ฿2,999", tone: "price" }, { text: "Inside the road closures", tone: "warn" }],
    blurb: "Dinner right above the CentralWorld countdown. Great for being in the thick of it, but the roads around it close at 4pm, so plan to arrive by BTS.",
    ...nye(Y),
  },
  {
    name: "Neon Glow Countdown buffet on the barge",
    venue: "Chatrium Riverside Bangkok, River Barge",
    when: "31 Dec · 7pm to 1am",
    facets: { type: ["view"], budget: ["3"] },
    flags: ["kids"],
    level: 3,
    badges: [{ text: "฿9,200", tone: "price" }, { text: "Kids ฿4,600", tone: "kids" }],
    blurb: "A countdown buffet on the hotel's River Barge. The hotel's rooftop Cloud 36 and Flow also sold fireworks-view packages from 10:30pm.",
    link: "https://www.chatrium.com/stories/festive-feasts-and-sparkling-countdowns-across-chatrium-hotels",
    ...nye(Y),
  },
  {
    name: "Carnival de Riverside gala",
    venue: "Anantara Riverside Bangkok Resort",
    when: "31 Dec · from 7pm",
    facets: { type: ["view", "fun"], budget: ["3"] },
    flags: ["fireworks"],
    level: 3,
    badges: [{ text: "Riverfront fireworks", tone: "santa" }],
    blurb: "A carnival-themed gala buffet with barbecue and seafood, and a fireworks display on the riverfront. Resort gardens give kids room to roam.",
    ...nye(Y),
  },
  {
    name: "Grand Countdown with Chao Phraya fireworks",
    venue: "Royal Orchid Sheraton Riverside",
    when: "31 Dec · from 7pm",
    facets: { type: ["view"], budget: ["3"] },
    flags: ["fireworks"],
    level: 3,
    badges: [{ text: "From ฿12,888++", tone: "price" }],
    blurb: "Dinner across the hotel's riverside restaurants with a view of the river fireworks. A splurge, but you skip the crowds entirely.",
    ...nye(Y),
  },
  {
    name: "New Year's Eve aboard Manohra",
    venue: "Manohra Cruises, from Anantara Riverside pier",
    when: "Thu 31 Dec 2026 · 7pm or 10:30pm",
    facets: { type: ["cruise", "view", "early"], budget: ["3"] },
    flags: ["fireworks", "kids"],
    level: 3,
    confirmed: true,
    badges: [{ text: "Early sailing ฿10,500 net", tone: "price" }, { text: "Fireworks sailing ฿17,900 net", tone: "price" }, { text: "Kids 5 to 11 ฿6,500", tone: "kids" }],
    blurb: "Already announced for this year. The 7pm sailing gives you a sunset and a multi-course dinner and is back by nine. The 10:30pm sailing has front-row views of the midnight fireworks. Early bird until 30 November.",
    link: "https://www.anantara.com/en/riverside-bangkok/festive/new-years-eve-aboard-manohra-cruises",
    start: "2026-12-31T19:00:00+07:00",
    end: "2027-01-01T00:30:00+07:00",
  },
  {
    name: "Cowboy Spirits and Midnight Cheers",
    venue: "Historic boat on the Chao Phraya",
    when: "31 Dec · sails 6pm, back after midnight",
    facets: { type: ["cruise", "view"] },
    flags: ["fireworks"],
    level: 2,
    badges: [{ text: "Fairly family-friendly", tone: "kids" }],
    blurb: "A Wild West themed river trip that stays out for the midnight fireworks. Fun for older kids who can make it past midnight.",
    ...nye(Y),
  },
  {
    name: "Pink Giraffe countdown",
    venue: "Topgolf Megacity, Bang Na",
    when: "31 Dec · from 9pm",
    facets: { type: ["fun"] },
    flags: ["fireworks"],
    level: 2,
    badges: [{ text: "Great with teens", tone: "kids" }],
    blurb: "Golf bays, a buffet and fireworks. Teenagers get something to do besides wait for midnight, and nobody has to stand in a crowd.",
    ...nye(Y),
  },
];

// ---------------------------------------------------------------- the rest

export const BY_AGE = [
  {
    who: "Toddlers",
    title: "Lights out by nine",
    picks: ["The 8pm Sydney midnight trick at home", "An early buffet, like Savio, 6pm to 9pm", "Balcony fireworks at midnight (if anyone's awake)"],
  },
  {
    who: "Ages 4 to 9",
    title: "Early fireworks fans",
    picks: ["Crowne Plaza's Carnival of Joy, with clowns", "Asiatique early evening and the Ferris wheel", "Benchasiri Park for the Sukhumvit drone show"],
  },
  {
    who: "Ages 10 to 12",
    title: "Midnight or bust",
    picks: ["One Bangkok (register first)", "Seacon Square's free concert and fireworks", "Topgolf Megacity's countdown"],
  },
  {
    who: "Teens",
    title: "The full countdown",
    picks: ["ICONSIAM by the river", "CentralWorld's street party", "The Manohra fireworks sailing"],
  },
];

/** Where midnight lands, in Bangkok time, on 31 December. */
export const TIMEZONES = [
  { city: "Auckland", bkk: "6pm", note: "First big city into the new year" },
  { city: "Sydney", bkk: "8pm", note: "The famous Harbour Bridge fireworks" },
  { city: "Tokyo and Seoul", bkk: "10pm", note: "For older kids who want to push it" },
  { city: "Singapore and Hong Kong", bkk: "11pm", note: "One hour to go" },
  { city: "Bangkok", bkk: "Midnight", note: "Sawasdee Pi Mai!" },
];

/** Last year's road closures for the CentralWorld countdown. */
export const ROAD_CLOSURES = [
  "Ratchadamri Road, Pratunam to Ratchaprasong, from noon",
  "Ratchadamri Road, Ratchaprasong towards Lumpini, from 4pm",
  "Rama I Road, Chaloem Phao to Ratchaprasong, from 4pm",
  "Phloen Chit Road, Ratchaprasong to Chidlom, from 4pm",
  "Ratchaprarop Road, Makkasan to Pratunam, from 4pm",
  "Phetchaburi Road, Chidlom to Pratunam, from 4pm",
];

export const SAFETY_TIPS = [
  { title: "Pick a meeting point first", text: "Somewhere obvious and easy to describe, agreed before you arrive. Every child should know it by heart." },
  { title: "Put your number on them", text: "A wristband, a sticker on the back of the shirt, or pen on the arm. Any adult or police officer can then call you." },
  { title: "Bring ear defenders", text: "Fireworks this close are seriously loud. Kids' ear defenders are cheap and make small children far happier." },
  { title: "Leave the stroller at home", text: "A carrier or a pair of shoulders beats wrestling a pram along a closed road at half past midnight." },
  { title: "Check the air", text: "New Year sits in the smog season, and a city full of fireworks doesn't help. On a bad AQI night, watch from a balcony." },
  { title: "Leave at 11:45", text: "With little ones, the best exit plan is going early and watching the fireworks over your shoulder from somewhere quieter." },
];

export const TEMPLE = [
  { thai: "สวดมนต์ข้ามปี · Suad Mon Kham Pi", title: "Chanting into the new year", text: "Thousands of Thai families see in the new year at a temple, chanting through midnight instead of partying. Many temples welcome visitors; dress modestly and sit quietly at the back." },
  { thai: "ตักบาตร · Tak Bat", title: "Giving alms on New Year's morning", text: "Early on 1 January, families line up to offer food to monks. It's a calm, beautiful start to the year, and kids love handing over the rice." },
  { thai: "ไหว้พระ ๙ วัด · Wai Phra 9 Wat", title: "The nine-temple merit route", text: "A New Year favourite: visiting nine temples for luck, often Wat Phra Kaew, Wat Pho, Wat Arun, Wat Saket and Wat Bowonniwet among them. Go early, before the heat." },
  { thai: "กระเช้าปีใหม่ · Krachao Pi Mai", title: "New Year gift baskets", text: "Baskets of snacks, fruit and drinks are the classic Thai New Year gift. Expect one from the office or your building, and consider one for your nanny, driver or the security team." },
  { thai: "สวัสดีปีใหม่ · Sawasdee Pi Mai", title: "Say it like a local", text: "\"Happy New Year\" in Thai. Teach the kids to say it with a wai to the condo staff and watch everyone's face light up." },
];

export const FAQ: { question: string; answer: string }[] = [
  {
    question: "Where is the best place to watch the New Year's Eve fireworks in Bangkok with kids?",
    answer: "ICONSIAM has the biggest display, over the Chao Phraya, but the biggest crowd too, so it suits teens. With younger children, Asiatique The Riverfront, the Sukhumvit countdown around Benchasiri Park, a smaller local countdown such as Seacon Square, or a riverside restaurant or cruise with a view are much easier.",
  },
  {
    question: "What time are the New Year's Eve fireworks in Bangkok?",
    answer: "The main fireworks go off at midnight. Countdown events usually start in the early evening with concerts, and people start claiming riverside spots at ICONSIAM in the afternoon. Some venues run drone shows before midnight.",
  },
  {
    question: "Is New Year's Eve a public holiday in Thailand?",
    answer: "Yes. Both 31 December and 1 January are public holidays. In 2026 they fall on a Thursday and a Friday, so many people get a four-day weekend and a lot of Bangkok leaves for the provinces.",
  },
  {
    question: "Do the BTS and MRT run late on New Year's Eve?",
    answer: "Last year the MRT Blue, Purple, Yellow and Pink lines ran until 2am on New Year's Eve, and the BTS has usually extended its hours too. Confirm both closer to the date, and expect stations near the fireworks to be packed straight after midnight.",
  },
  {
    question: "Is the CentralWorld countdown OK for young children?",
    answer: "It's a huge, loud crowd, and last year six roads around it closed from 4pm, so it works best for teenagers. If you take younger children, stay near the edges, agree a meeting point, put your phone number on them and bring ear defenders.",
  },
  {
    question: "How can young kids celebrate New Year if they can't stay up until midnight?",
    answer: "Celebrate with Sydney. It's four hours ahead of Bangkok in late December, so its midnight fireworks go off at 8pm Bangkok time. Watch the livestream, count down together, and everyone is in bed by half past eight.",
  },
  {
    question: "Can you watch the Bangkok New Year fireworks from a river cruise?",
    answer: "Yes. Dinner cruises run New Year's Eve sailings timed for the midnight fireworks. Manohra Cruises has already announced 2026: a 7pm sailing at ฿10,500 without fireworks and a 10:30pm fireworks sailing at ฿17,900, with children aged 5 to 11 at ฿6,500.",
  },
];

export const NYE_POSTERS: Poster[] = [
  {
    file: "new-years-eve-bangkok-2026-family-countdown-cheat-sheet",
    w: 1080,
    h: 1350,
    title: "New Year's Eve in Bangkok cheat sheet",
    use: "Best for Facebook posts and class WhatsApp or LINE groups",
    alt: "New Year's Eve in Bangkok 2026 with kids cheat sheet: six countdown spots rated by crowd level, plus getting home after midnight",
  },
  {
    file: "new-years-eve-bangkok-2026-8pm-midnight-trick",
    w: 1080,
    h: 1080,
    title: "The 8pm midnight trick",
    use: "Best for Instagram and Facebook feeds",
    alt: "The 8pm midnight trick for New Year's Eve in Bangkok: Sydney's midnight fireworks happen at 8pm Bangkok time",
  },
  {
    file: "new-years-eve-bangkok-2026-best-countdowns-by-age",
    w: 1080,
    h: 1920,
    title: "Best New Year's Eve plans by age",
    use: "Best for Instagram and Facebook stories",
    alt: "Best New Year's Eve plans in Bangkok 2026 by age, from toddlers to teens",
  },
];
