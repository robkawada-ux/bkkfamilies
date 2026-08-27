export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO
  excerpt: string;
  body: string[]; // paragraphs
}

export const ARTICLES: Article[] = [
  {
    slug: "is-bangkok-safe-for-kids",
    title: "Is Bangkok Safe for Kids in 2026?",
    category: "Local Life",
    date: "2026-06-15",
    excerpt:
      "A practical look at everyday safety for families raising kids in Bangkok — traffic, health infrastructure, and neighborhood considerations.",
    body: [
      "Bangkok routinely comes up in expat forums as a surprisingly manageable city for families, and the reasons hold up: strong private healthcare, a large support network of other expat families, and neighborhoods built around condos and communities that cater specifically to households with young kids.",
      "The biggest everyday hazard isn't crime — it's traffic. Sidewalks can be uneven or motorbike-clogged, so families in high-traffic sois often invest in a good stroller with sturdy wheels and stay close to BTS/MRT-accessible neighborhoods like Thonglor, Ekkamai, Phrom Phong, or Sathorn.",
      "Air quality is worth planning around, particularly during the January–March burning season, when PM2.5 can spike. Many families keep an air quality app on hand and invest in air purifiers for kids' bedrooms during those months.",
      "On the whole, most parents in our 35,700-member community describe Bangkok as easier for family life than they expected — with the caveat that a little neighborhood research up front goes a long way.",
    ],
  },
  {
    slug: "top-5-hospitals-in-bangkok",
    title: "Top Hospitals in Bangkok for Family Care",
    category: "Fitness/Health",
    date: "2026-05-02",
    excerpt:
      "Bangkok's private hospital system is one of the best reasons to raise a family here — here's what families in our community rely on.",
    body: [
      "Choosing a hospital is one of the first things new families sort out after landing in Bangkok, and the good news is the private hospital system here is genuinely excellent — several JCI-accredited facilities offer English-speaking pediatric care, direct insurance billing, and maternity packages built for international patients.",
      "Families in our group most often mention Samitivej (multiple campuses, strong pediatric and maternity units), Bumrungrad International, BNH Hospital, Bangkok Hospital, and Praram 9 Hospital as their go-to options — each with slightly different strengths in specialty care and insurance network coverage.",
      "A few things worth confirming before you need them: whether your insurance direct-bills the hospital, where the nearest 24-hour pediatric ER is to your home, and whether your pediatrician does same-day sick visits.",
    ],
  },
  {
    slug: "staying-fit-in-bangkok",
    title: "Staying Fit in Bangkok: Easier Than You Think",
    category: "Fitness/Health",
    date: "2026-04-20",
    excerpt:
      "Heat and traffic make outdoor fitness feel daunting at first — here's how families actually make it work.",
    body: [
      "Bangkok's heat and congestion can make fitness feel like an uphill battle at first, but the city has quietly built up a strong infrastructure for it: condo gyms, boutique studios, and genuinely excellent public parks like Benjakitti and Lumpini that are shaded, walkable, and safe for family use in the early morning or evening.",
      "For families specifically, many condo developments now include kid-friendly pools and small play areas alongside adult gyms, which makes fitness a shared routine rather than something that requires separate childcare.",
      "If you're newer to the city, the early morning (before 8am) and evening (after 5pm) windows avoid both the worst heat and the worst air quality — most of our community's outdoor routines are built around those hours.",
    ],
  },
  {
    slug: "dental-health-for-families-in-bangkok",
    title: "Why Dental Health Matters More Than You'd Think in Bangkok",
    category: "Fitness/Health",
    date: "2026-03-11",
    excerpt:
      "Bangkok's dental care is excellent and affordable by international standards — worth prioritizing rather than putting off.",
    body: [
      "Dental care is one of the pleasant surprises of living in Bangkok — quality is high, English-speaking pediatric dentists are easy to find, and costs are typically a fraction of US or UK private rates, even at internationally accredited clinics.",
      "For families, the advice from our community is consistent: get kids into a routine of 6-month check-ups early, since it's both affordable and convenient here in a way it often isn't back home, and it heads off bigger issues before they become urgent (and much more expensive) problems.",
    ],
  },
  {
    slug: "15-things-to-do-in-bangkok-with-kids",
    title: "15 Things to Do in Bangkok With Kids (2026 Edition)",
    category: "Activities",
    date: "2026-07-08",
    excerpt:
      "An updated roundup of family-friendly Bangkok activities, from theme parks to museums to weekend markets.",
    body: [
      "Bangkok's family activity scene has only expanded over the past few years. A few standbys remain must-dos: Dream World and Siam Amazing Park for classic theme-park days, the Children's Discovery Museum for younger kids, and Lumpini Park's paddle boats for an easy, low-cost afternoon.",
      "For weekends, Chatuchak Market's pet section and toy stalls are a hit with younger kids, while older kids tend to gravitate toward the climbing gyms and trampoline parks that have opened across the city in the last few years.",
      "Rainy-day options have multiplied too — indoor play centers, cat cafés, and VR arcades are now common in most major malls, which makes planning around Bangkok's rainy season much easier than it used to be.",
    ],
  },
  {
    slug: "top-museums-for-kids-in-bangkok",
    title: "Top Museums for Kids in Bangkok",
    category: "Activities",
    date: "2026-02-18",
    excerpt:
      "Educational, air-conditioned, and genuinely fun — Bangkok's kid-focused museums are an underrated family outing.",
    body: [
      "The Children's Discovery Museum remains the anchor for younger kids, with hands-on science and art exhibits built specifically for their age group. For older kids, the Museum of Siam does a great job making Thai history interactive rather than a lecture.",
      "The Grand Palace and Wat Phra Kaew are worth the trip even with younger kids in tow, though the heat means an early-morning visit is far more manageable than a midday one.",
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
