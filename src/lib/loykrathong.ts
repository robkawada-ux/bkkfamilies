// Loy Krathong in Bangkok with kids. One page refreshed every year at the
// same URL (/blog/loy-krathong-in-bangkok-with-kids), so links and rankings
// carry over from year to year.
//
// Listings marked `confirmed` were announced for this year (BMA venues from
// The Nation, 31 Oct 2026; Wat Arun and Song Wat from Thansettakij, 3 Nov
// 2026; hotel dinners from the hotels). The rest are what ran on Loy
// Krathong LAST_YEAR (Wednesday 5 November 2025). When a venue announces this
// year's programme, update the item, set `confirmed: true`, and bump CHECKED.
//
// Next year: set the year, the full moon date and every date below, and
// move confirmed items back to last year's programme until they announce.

import type { FinderGroup, FinderItem, FinderMeter, FinderToggle, Poster } from "@/lib/festive";

export const LOY_SLUG = "loy-krathong-in-bangkok-with-kids";
export const LOY_PATH = `/blog/${LOY_SLUG}`;
export const LOY_YEAR = 2026;
export const LAST_YEAR = 2025;
/** The full moon night itself, Bangkok time. */
export const LOY_DAY = "2026-11-24";
export const CHECKED = "2026-11-03";

export const LOY_IMG_DIR = `/images/articles/${LOY_SLUG}`;
export const LOY_SHARE_IMAGE = `${LOY_IMG_DIR}/loy-krathong-in-bangkok-2026-family-guide.jpg`;

// ---------------------------------------------------------------- finder

export const PLACE_GROUPS: FinderGroup[] = [
  {
    id: "area",
    label: "Area",
    anyLabel: "Anywhere",
    options: [
      { id: "river", label: "On the river" },
      { id: "oldtown", label: "Old town" },
      { id: "parks", label: "City parks" },
      { id: "canals", label: "Canals, north" },
      { id: "sukhumvit", label: "Sukhumvit" },
    ],
  },
  {
    id: "kind",
    label: "Type",
    anyLabel: "Any",
    options: [
      { id: "float", label: "Just float a krathong" },
      { id: "festival", label: "Festival with shows" },
      { id: "dinner", label: "Dinner by the river" },
    ],
  },
];

export const PLACE_TOGGLES: FinderToggle[] = [
  { id: "free", label: "Free" },
  { id: "kids", label: "Kids' activities" },
  { id: "water", label: "Float your own" },
];

export const CROWD_METER: FinderMeter = {
  icon: "person",
  label: "Crowd level",
  names: ["Calm", "Busy", "Packed"],
};

const night = (y: number) => (y === LOY_YEAR ? { start: LOY_DAY, end: LOY_DAY } : { start: "2025-11-05", end: "2025-11-05" });
const range = (start: string, end: string) => ({ start, end });

export const PLACES: FinderItem[] = [
  {
    name: "Loy Krathong Festival for kids",
    venue: "Bambini Villa, Sukhumvit 26",
    when: "Tue 24 Nov · 10am to 6pm",
    facets: { area: ["sukhumvit"], kind: ["festival"] },
    flags: ["kids", "water"],
    level: 1,
    confirmed: true,
    badges: [{ text: "Walk-ins only", tone: "plain" }, { text: "Krathong pond", tone: "kids" }],
    blurb:
      "A daytime festival built for small children: booth games, art and craft workshops, the BAMBii mascot, and a krathong floating pond, so little ones get the whole experience without a dark riverbank. No booking needed. Near BTS Phrom Phong.",
    contact: "LINE: @BambiniVilla",
    ...night(LOY_YEAR),
  },
  {
    name: "The Enchanting Waterways of Rattanakosin",
    venue: "Mahakan Fort, Phra Nakhon",
    when: "Mon 23 to Wed 25 Nov · 5pm to 10pm",
    facets: { area: ["oldtown"], kind: ["festival"] },
    flags: ["free", "kids", "water"],
    level: 2,
    confirmed: true,
    free: true,
    badges: [{ text: "Free Thai costume", tone: "free" }, { text: "Kids' Noppamas pageant", tone: "kids" }],
    blurb:
      "Our pick for families this year. The city's culture department links Mahakan Fort with Wat Saket, Wat Ratchanatdaram and Wat Thepthidaram: khon, likay and puppet shows, workshops making krathongs from natural materials, flower garlands and Thai sweets, period markets on land and water, a giant krathong on the canal and a children's Noppamas pageant. Borrow traditional Thai dress for free. MRT Sam Yot, then a short walk.",
    ...range("2026-11-23", "2026-11-25"),
  },
  {
    name: "Loy Krathong at the Golden Mount",
    venue: "Wat Saket, Phra Nakhon",
    when: "Tue 17 to Sun 29 Nov",
    facets: { area: ["oldtown"], kind: ["festival"] },
    flags: ["free", "kids"],
    level: 2,
    confirmed: true,
    free: true,
    blurb:
      "The city's opening venue, running alongside the Golden Mount's relic ceremonies (17 to 26 November). The temple fair here is the classic Bangkok version: food stalls, games and the lit golden chedi above it all. Easy to pair with Mahakan Fort next door.",
    ...range("2026-11-17", "2026-11-29"),
  },
  {
    name: "Phra Sumen Fort and Santichaiprakarn Park",
    venue: "Phra Athit, Phra Nakhon",
    when: "Mon 23 to Wed 25 Nov",
    facets: { area: ["oldtown", "river"], kind: ["float", "festival"] },
    flags: ["free", "water"],
    level: 3,
    confirmed: true,
    free: true,
    blurb:
      "A district office festival at the white fort on the river, with the riverside park beside it. Lovely, but it sits a few minutes from Khao San Road, so it gets packed and lively after dark. Go early with younger kids. Chao Phraya Express to Phra Arthit pier.",
    ...range("2026-11-23", "2026-11-25"),
  },
  {
    name: "Rama VIII Bridge riverside",
    venue: "Bang Phlat side, Chao Phraya",
    when: "Tue 17 to Sun 29 Nov",
    facets: { area: ["river"], kind: ["float", "festival"] },
    flags: ["free", "water"],
    level: 2,
    confirmed: true,
    free: true,
    blurb:
      "Bang Phlat district runs activities along the river under the lit-up bridge, with the Rama 8 park on the Thonburi bank giving children somewhere to run around. Roomier than the old town on the big night.",
    ...range("2026-11-17", "2026-11-29"),
  },
  {
    name: "Loy Krathong at the Temple of Dawn",
    venue: "Wat Arun, Thonburi",
    when: "Mon 23 to Tue 24 Nov",
    facets: { area: ["river"], kind: ["festival"] },
    flags: [],
    level: 3,
    confirmed: true,
    blurb:
      "The Ministry of Culture's Bangkok event, with the floodlit prang as the backdrop. The most photogenic spot in the city and one of the busiest. Cross by ferry from Tha Tien (MRT Sanam Chai) and agree a meeting point before you go.",
    ...range("2026-11-23", "2026-11-24"),
  },
  {
    name: "Digital Loy Krathong on Song Wat Road",
    venue: "Song Wat Road, Samphanthawong",
    when: "Mon 23 Nov",
    facets: { area: ["oldtown"], kind: ["festival"] },
    flags: ["free"],
    level: 2,
    confirmed: true,
    free: true,
    blurb:
      "A digital krathong activity on Bangkok's old warehouse street, the night before the full moon. Nothing goes in the water. Combine it with dinner in Chinatown. MRT Wat Mangkon.",
    ...range("2026-11-23", "2026-11-23"),
  },
  {
    name: "Canal-side Loy Krathong, Chatuchak",
    venue: "Khlong Prem Prachakon at Wat Samian Nari",
    when: "Mon 23 to Wed 25 Nov",
    facets: { area: ["canals"], kind: ["float", "festival"] },
    flags: ["free", "water"],
    level: 1,
    confirmed: true,
    free: true,
    blurb:
      "Run by the Chatuchak, Lat Phrao, Bang Sue and Dusit district offices beside a temple on the canal. A neighbourhood festival rather than a spectacle, which is exactly why it works with small children.",
    ...range("2026-11-23", "2026-11-25"),
  },
  {
    name: "Canal-side Loy Krathong, Don Mueang",
    venue: "Khlong Prem Prachakon by Don Mueang Police Station",
    when: "Mon 23 to Wed 25 Nov",
    facets: { area: ["canals"], kind: ["float", "festival"] },
    flags: ["free", "water"],
    level: 1,
    confirmed: true,
    free: true,
    blurb:
      "The northern districts' joint festival (Don Mueang, Lak Si, Bang Khen and Sai Mai). Worth knowing if you live near ISB or up toward the old airport.",
    ...range("2026-11-23", "2026-11-25"),
  },
  {
    name: "Lumpini Park lake",
    venue: "Lumpini Park, Pathum Wan",
    when: "Wed 5 Nov · open until midnight",
    facets: { area: ["parks"], kind: ["float"] },
    flags: ["free", "water"],
    level: 2,
    free: true,
    blurb:
      "The family default for central Bangkok: float a krathong on the big lake with skyscrapers behind it and food stalls along the paths. Bangkok kept 33 parks open until midnight last year. Foam krathongs, lanterns, fireworks and alcohol were banned. MRT Lumphini or Silom.",
    ...night(LAST_YEAR),
  },
  {
    name: "Benchakitti Park lake",
    venue: "Benchakitti Park, Khlong Toei",
    when: "Wed 5 Nov · open until midnight",
    facets: { area: ["parks"], kind: ["float"] },
    flags: ["free", "water"],
    level: 2,
    free: true,
    blurb:
      "A huge lake and plenty of space to spread out, so it feels calmer than Lumpini even when it is busy. Good for strollers on the wide paths. MRT Queen Sirikit National Convention Centre.",
    ...night(LAST_YEAR),
  },
  {
    name: "Benjasiri Park pond",
    venue: "Benjasiri Park, Sukhumvit 24",
    when: "Wed 5 Nov · evening",
    facets: { area: ["parks", "sukhumvit"], kind: ["float"] },
    flags: ["free", "water", "kids"],
    level: 1,
    free: true,
    blurb:
      "Small, central and right next to the Emporium, with a playground for the ones who lose interest after the floating. The easiest Loy Krathong in Sukhumvit with toddlers. BTS Phrom Phong.",
    ...night(LAST_YEAR),
  },
  {
    name: "Chatuchak and Rot Fai parks",
    venue: "Chatuchak Park and Wachirabenchathat Park",
    when: "Wed 5 Nov · open until midnight",
    facets: { area: ["parks"], kind: ["float"] },
    flags: ["free", "water"],
    level: 1,
    free: true,
    blurb:
      "Two big northern parks with lakes, both on the list of parks open late last year. Spread out and relaxed. MRT Chatuchak Park or Kamphaeng Phet.",
    ...night(LAST_YEAR),
  },
  {
    name: "ICONSIAM Thaiconic Loy Krathong",
    venue: "River Park, ICONSIAM",
    when: "Wed 5 Nov",
    facets: { area: ["river"], kind: ["festival"] },
    flags: [],
    level: 3,
    blurb:
      "Last year ICONSIAM held its Thaiconic Loy Krathong on the River Park, and its SookSiam pier was one of the river festival's floating points. The 2026 programme has not been announced yet. Expect huge crowds. BTS Gold Line to Charoen Nakhon.",
    link: "https://www.iconsiam.com/en",
    ...night(LAST_YEAR),
  },
  {
    name: "Bangkok River Festival piers",
    venue: "Asiatique, Tha Maharaj, Wat Pho and other piers",
    when: "Three nights around 5 Nov",
    facets: { area: ["river"], kind: ["float", "festival"] },
    flags: ["water"],
    level: 3,
    blurb:
      "Last year the river festival ran on nine piers including Wat Pho, Wat Arun, Wat Rakhang, Tha Maharaj, Asiatique and SookSiam at ICONSIAM, with krathongs floated into enclosed basins rather than the open river. Spectacular, and the most crowded option in the city. We will add 2026 when it is announced.",
    start: "2025-11-04",
    end: "2025-11-06",
  },
  {
    name: "Loy Krathong by the River of Kings",
    venue: "The Siam, Dusit",
    when: "Tue 24 Nov · 6pm to 11pm",
    facets: { area: ["river"], kind: ["dinner"] },
    flags: ["water"],
    level: 1,
    confirmed: true,
    badges: [{ text: "฿5,310++", tone: "price" }, { text: "10% off before 19 Nov", tone: "plain" }],
    blurb:
      "A set dinner on The Pier and Chon Lawn, with a krathong workshop using banana leaves and flowers, traditional dance, and your own krathong released into the Chao Phraya from the hotel's pier. No children's price is listed, so ask. The calm, grown-up version of the night.",
    link: "https://www.thesiamhotel.com/offers/loy-krathong",
    ...night(LOY_YEAR),
  },
  {
    name: "Loy Krathong by the river",
    venue: "Royal Orchid Sheraton Riverside, Si Phraya",
    when: "Tue 24 Nov · from 6pm",
    facets: { area: ["river"], kind: ["dinner"] },
    flags: [],
    level: 2,
    confirmed: true,
    badges: [{ text: "From ฿1,600++", tone: "price" }, { text: "Early bird to 20 Nov", tone: "plain" }],
    blurb:
      "Four restaurants with river views and fireworks: Feast's international buffet (฿1,600++ indoor, ฿2,500++ outdoor, free-flow soft drinks), Thara Thong's Royal Thai set (฿2,500 net), Giorgio's and Siam Yacht Club. One handcrafted krathong per couple. A good-value riverside option with kids.",
    ...night(LOY_YEAR),
  },
];

// ---------------------------------------------------------------- page data

/** Krathongs the city collected from its waterways the morning after. */
export const KRATHONG_COUNTS = [
  { year: 2023, count: 639828 },
  { year: 2024, count: 514590 },
  { year: 2025, count: 391027 },
];

export const BY_AGE = [
  {
    who: "Toddlers, under 4",
    title: "Daytime and a pond",
    picks: [
      "Bambini Villa's krathong pond, in daylight, on the day",
      "Benjasiri Park at dusk, with the playground next door",
      "Make one at home and float it in a basin or the condo pool",
    ],
  },
  {
    who: "Ages 4 to 8",
    title: "Make it, then float it",
    picks: [
      "Krathong workshops at Mahakan Fort, 23 to 25 November",
      "Lumpini or Benchakitti lakes, at 6pm before the crowds",
      "Borrow a Thai outfit for free at Mahakan Fort",
    ],
  },
  {
    who: "Ages 9 to 12",
    title: "The full festival",
    picks: [
      "Wat Saket temple fair and the Golden Mount",
      "Khon and puppet shows at Mahakan Fort",
      "The kids' Noppamas pageant, if they are brave",
    ],
  },
  {
    who: "Teens",
    title: "The big river night",
    picks: [
      "Wat Arun or Phra Sumen Fort on the full moon",
      "The river festival piers, if they run again",
      "A riverside hotel dinner with fireworks",
    ],
  },
];

export const TRADITIONS = [
  {
    thai: "ลอยกระทง",
    title: "What the words mean",
    text: "Loy means to float, and a krathong is the little raft: a slice of banana trunk wrapped in folded banana leaves, topped with flowers, a candle and three incense sticks. Families float them on the full moon of the twelfth Thai lunar month, when the rivers are high after the rains.",
  },
  {
    thai: "พระแม่คงคา",
    title: "Saying thank you to the water",
    text: "The krathong is an offering to Phra Mae Khongkha, the goddess of water. It thanks her for the water that makes life possible and apologises for polluting it, which makes it a natural moment to talk to children about keeping rivers clean.",
  },
  {
    thai: "ปล่อยทุกข์",
    title: "Letting go and making a wish",
    text: "Many people tuck a strand of hair or a nail clipping into the krathong, to float away the bad luck of the past year, and some add a coin. You make a wish as it drifts off. Children love this part, and it needs no explaining.",
  },
  {
    thai: "นางนพมาศ",
    title: "Nang Noppamas and Sukhothai",
    text: "The story Thai children learn is that Nang Noppamas, a consort at the court of Sukhothai, made the first lotus-shaped krathong. Historians date that text to the 1800s, so treat it as legend, but it is why schools and festivals crown a Noppamas queen, and why Sukhothai still holds the grandest celebration.",
  },
  {
    thai: "เพลงลอยกระทง",
    title: "The song every child knows",
    text: "Expect to hear the Loy Krathong song everywhere. Written in 1949, it is the tune Thai schools teach every November, so if your child goes to a local or bilingual school they may well be singing it at home already.",
  },
  {
    thai: "ยี่เป็ง",
    title: "Lanterns are a northern thing",
    text: "The sky lanterns in the photos are Yi Peng, the Lanna festival of Chiang Mai, held at the same full moon. In Bangkok the tradition is floating on water, and the city bans floating lanterns, fireworks and firecrackers on the night.",
  },
];

export const MAKE_STEPS = [
  { title: "Cut a base", text: "A slice of banana trunk about two fingers thick is traditional. Bread floats but the city now asks people not to use it, because uneaten bread fouls the water." },
  { title: "Fold the leaves", text: "Fold strips of banana leaf into little points and pin them around the edge with toothpicks or pins. This is the fiddly part, so let older kids do the folding and little ones do the pinning with help." },
  { title: "Decorate", text: "Marigolds, orchids, jasmine, whatever the flower market has. Fruit, leaves from the garden and nothing plastic, ever." },
  { title: "Candle and incense", text: "A short candle in the middle and three incense sticks. A grown-up lights them at the water's edge." },
  { title: "Add your wish", text: "A strand of hair, a nail clipping or a coin if you like, and a wish as it floats away." },
];

export const SAFETY_TIPS = [
  { title: "Hold hands at the water", text: "Pier steps and park edges get wet and slippery, and they are crowded and dark. A grown-up does the floating, or holds on while the child does." },
  { title: "Mind the flames", text: "Every krathong has a lit candle and incense. Tie back long hair, watch little hands, and keep the lighter in an adult's pocket." },
  { title: "Agree a meeting point", text: "Pick one before you arrive and write your phone number on younger children's arms. The river spots are the easiest places in Bangkok to lose someone." },
  { title: "Bring repellent and a torch", text: "Parks and canals are mosquito country after dark, and a phone torch helps on uneven paths." },
  { title: "Go at 6pm, leave by 8", text: "It is busiest from about 7pm to 10pm on the full moon. Early is calmer, cooler and easier on a school night." },
  { title: "Take the train", text: "Traffic near the river and the old town is grim on the night. Use the MRT, BTS or river boats, and walk the last stretch." },
];

export const BEYOND = [
  {
    where: "Sukhothai",
    when: "15 to 24 November",
    text: "The Loy Krathong and candle festival at Sukhothai Historical Park is the grandest in the country, with light and sound shows among the ruins. A long weekend trip.",
  },
  {
    where: "Chiang Mai",
    when: "23 to 25 November",
    text: "Yi Peng and the sky lanterns. Lanterns are allowed only on 24 and 25 November, 7pm to 1am this year. Book early: it is the busiest week of Chiang Mai's year.",
  },
  {
    where: "Nonthaburi",
    when: "24 November to 2 December",
    text: "Wat Choeng Lem's temple fair combines Loy Krathong with its gold-leafing ceremony. Handy for families living near ISB.",
  },
];

export const FAQ: { question: string; answer: string }[] = [
  {
    question: "When is Loy Krathong 2026 in Bangkok?",
    answer:
      "Loy Krathong 2026 is on Tuesday 24 November, the full moon of the twelfth Thai lunar month. Bangkok's official events run from 17 to 29 November, with most of them on 23 to 25 November.",
  },
  {
    question: "Is Loy Krathong a public holiday?",
    answer:
      "No. Schools, offices and banks are open, and in 2026 it falls on a Tuesday, so plan an early evening and an early bedtime. Many schools celebrate during the day with Thai dress and krathong making.",
  },
  {
    question: "What is the meaning of Loy Krathong?",
    answer:
      "Loy means to float and a krathong is a small raft of banana trunk, leaves and flowers. Floating one thanks Phra Mae Khongkha, the goddess of water, apologises for polluting it, and lets go of the bad luck of the past year.",
  },
  {
    question: "Where can kids float a krathong in Bangkok?",
    answer:
      "The calmest places are the city park lakes, such as Lumpini, Benchakitti and Benjasiri, which stayed open until midnight last year. Mahakan Fort has krathong workshops for children on 23 to 25 November, and Bambini Villa on Sukhumvit 26 has a krathong pond on 24 November.",
  },
  {
    question: "Can you release sky lanterns in Bangkok?",
    answer:
      "No. Bangkok bans floating lanterns, fireworks and firecrackers on Loy Krathong. Sky lanterns belong to Yi Peng in Chiang Mai, where they are allowed only at set hours on 24 and 25 November 2026.",
  },
  {
    question: "What do you put in a krathong?",
    answer:
      "A base of banana trunk, folded banana leaves, flowers, a candle and three incense sticks. Many people add a strand of hair, a nail clipping or a coin. Avoid foam and plastic, and the city now discourages bread too.",
  },
  {
    question: "How much does a krathong cost and where do I buy one?",
    answer:
      "Simple krathongs sell for about 20 to 100 baht from stalls near every park, pier and temple on the night, and elaborate ones for a few hundred. Making your own with the kids costs less and is more fun.",
  },
  {
    question: "What is the difference between Loy Krathong and Yi Peng?",
    answer:
      "They happen on the same full moon. Loy Krathong is the nationwide festival of floating krathongs on water. Yi Peng is the northern Lanna festival of sky lanterns, centred on Chiang Mai.",
  },
  {
    question: "Is Loy Krathong safe for children?",
    answer:
      "Yes, with care. The risks are crowds, slippery water's edges and open flames. Choose a park rather than the river with younger children, go at about 6pm, hold hands at the water, and agree a meeting point.",
  },
];

export const LOY_POSTERS: Poster[] = [
  {
    file: "loy-krathong-in-bangkok-2026-where-to-float-with-kids",
    w: 1080,
    h: 1350,
    title: "Where to float a krathong with kids",
    use: "One-page cheat sheet",
    alt: "Loy Krathong in Bangkok 2026 cheat sheet: six family places to float a krathong rated by crowd level, Tuesday 24 November",
  },
  {
    file: "loy-krathong-2026-how-to-make-a-krathong-with-kids",
    w: 1080,
    h: 1350,
    title: "How to make a krathong with kids",
    use: "Step by step, print it out",
    alt: "How to make a krathong with kids for Loy Krathong 2026: five steps from banana trunk base to candle, incense and a wish",
  },
  {
    file: "loy-krathong-2026-traditions-explained-for-kids",
    w: 1080,
    h: 1920,
    title: "Loy Krathong explained for kids",
    use: "Story size, for phones",
    alt: "Loy Krathong traditions explained for kids: thanking the water goddess, letting go of bad luck, Nang Noppamas and why Bangkok has no lanterns",
  },
];
