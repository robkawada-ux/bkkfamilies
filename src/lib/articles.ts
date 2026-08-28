export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO
  excerpt: string;
  body: string[]; // paragraphs
  heroImage?: string;
  images?: { src: string; alt: string; afterParagraph: number }[];
  headings?: { beforeParagraph: number; text: string }[];
  faq?: { question: string; answer: string }[];
  relatedSchools?: { name: string; slug: string }[];
  metaDescription?: string;
  keywords?: string[];
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
  {
    slug: "how-to-choose-international-school-bangkok-2026",
    title: "How to Choose the Right International School in Bangkok: A 2026 Parent's Roadmap",
    category: "Schools",
    date: "2026-08-28",
    heroImage: "/images/articles/how-to-choose-international-school-bangkok-2026/hero-kids.jpg",
    metaDescription: "Choosing an international school in Bangkok? A parent of two who spent 8 years in Bangkok's international schools breaks down British, American, and IB options, location and traffic, waiting lists, and fee negotiation.",
    keywords: ["international school Bangkok", "British school Bangkok", "American school Bangkok", "IB school Bangkok", "Bangkok Patana", "Shrewsbury Bangkok", "ISB Nonthaburi", "NIST Bangkok", "KIS Bangkok", "Berkeley International School Bangkok"],
    headings: [
      { beforeParagraph: 1, text: "Which curriculum should you choose?" },
      { beforeParagraph: 2, text: "British curriculum: Bangkok Patana and Shrewsbury" },
      { beforeParagraph: 3, text: "American curriculum: ISB and Berkeley" },
      { beforeParagraph: 4, text: "Full IB continuum: NIST and KIS Bangkok" },
      { beforeParagraph: 5, text: "Why location matters more in Bangkok than almost anywhere" },
      { beforeParagraph: 6, text: "Waiting lists at Bangkok's most popular schools" },
      { beforeParagraph: 7, text: "The fee conversation nobody advertises" },
    ],
    relatedSchools: [
      { name: "Bangkok Patana School", slug: "bangkok-patana-school" },
      { name: "Shrewsbury International School Bangkok", slug: "shrewsbury-international-school-bangkok" },
      { name: "International School Bangkok (ISB)", slug: "international-school-bangkok-isb" },
      { name: "Berkeley International School Bangkok", slug: "berkeley-international-school-bangkok" },
      { name: "NIST International School Bangkok", slug: "nist-international-school-bangkok" },
      { name: "KIS International School Bangkok", slug: "kis-international-school-bangkok" },
    ],
    faq: [
      {
        question: "Which curriculum is best for a highly mobile family in Bangkok?",
        answer: "The IB continuum, offered by schools like NIST and KIS, tends to transfer most cleanly between countries, which is why it appeals to families who expect to relocate again. British and American curricula are also widely recognized internationally, so the better question is usually which specific school fits your child and your commute, not just which curriculum.",
      },
      {
        question: "How far in advance should I apply to an international school in Bangkok?",
        answer: "Start 9 to 12 months ahead for a normal move, and 12 to 18 months ahead if you are targeting a popular year group or a premium school like Patana, ISB, or NIST. Waiting lists are real at the most in demand schools.",
      },
      {
        question: "Can you negotiate international school fees in Bangkok?",
        answer: "At the very top tier (Patana, ISB, NIST level schools) generally no. But many mid tier and smaller schools will flex on registration or enrollment fees for families who ask directly, especially when enrolling more than one child or applying outside the August intake. It is rarely advertised, so you have to ask admissions in person.",
      },
      {
        question: "Does school location really matter that much in Bangkok?",
        answer: "Yes. Bangkok traffic can turn an appealing school into a 45 to 75 minute commute each way during peak hours. Map the actual drive time from where you plan to live, at school run hours, before committing to a school.",
      },
    ],
    images: [
      { src: "/images/articles/how-to-choose-international-school-bangkok-2026/school-life.jpg", alt: "International school life in Bangkok", afterParagraph: 0 },
      { src: "/images/articles/how-to-choose-international-school-bangkok-2026/british-school.jpg", alt: "British curriculum school in Bangkok", afterParagraph: 2 },
      { src: "/images/articles/how-to-choose-international-school-bangkok-2026/isb-nonthaburi.jpg", alt: "International school campus in Nonthaburi", afterParagraph: 3 },
      { src: "/images/articles/how-to-choose-international-school-bangkok-2026/ib-school.jpg", alt: "IB school in Bangkok", afterParagraph: 4 },
      { src: "/images/articles/how-to-choose-international-school-bangkok-2026/school-commute.jpg", alt: "Bangkok school commute traffic", afterParagraph: 5 },
    ],
    excerpt:
      "My family spent 8 years in international schools in Bangkok. Here is the framework I wish someone had given me on curriculum, location, waiting lists, and the fee conversations nobody advertises.",
    body: [
      "My kids are 16 and 14 now, and between the two of them my family has spent about 8 years navigating international schools here in Bangkok. I have sat through the tours, compared the fee schedules, and made the mistake of picking a school before I really understood the commute. This is the framework I put together based on what I actually learned, not just what the brochures say.",
      "Curriculum is usually the first thing to sort out. British schools follow the National Curriculum for England through IGCSE and A Levels. American schools lead to a US high school diploma, often with AP courses layered in during the later years. IB schools offer some or all of the Primary Years, Middle Years, and Diploma Programmes, which is a big draw for families who move around a lot since the IB transfers cleanly between countries. One thing I'd tell any parent starting this search: check whether a school calling itself an IB school actually teaches the full continuum, or only the Diploma Programme in the last two years. The experience for a 6 year old is completely different depending on which it is.",
      "On the British side, Bangkok Patana School and Shrewsbury International School Bangkok are two of the names that come up again and again. Patana, founded in 1957, is Thailand's oldest and largest British school, run as a not for profit under parent governance on a roughly 40 acre campus in Bang Na. Shrewsbury, affiliated with the 500 year old UK school of the same name, operates two campuses, a riverside site and a second City Campus, and has built a reputation as one of the more academically competitive British options in the city.",
      "On the American side, International School Bangkok (ISB) and Berkeley International School Bangkok sit at different points on the spectrum. ISB, founded in 1951, is one of the oldest international schools in the country and occupies a large, self contained campus in Nichada Thani, Nonthaburi, effectively its own suburb, popular with families who want space and a tight knit expat community outside the city center. Berkeley, a newer American school founded in 2010, earned full WASC accreditation in 2014 and has built out strong athletics and arts facilities, including competition standard swimming pools, which appeals to families who want a college preparatory American track without the scale of ISB.",
      "For families who specifically want the full IB continuum, not just the Diploma Programme bolted onto a British or American base, NIST International School and KIS International School Bangkok are two of the clearest options. NIST, founded in 1992 with support from Bangkok's UN community, was Thailand's first full IB World School, teaching the PYP, MYP, and DP as one continuous program from a central Sukhumvit campus. KIS, closer to the city center near Huai Khwang, is smaller and more intimate by design, and is generally regarded as delivering strong IB exam results within a tighter knit community than the larger IB schools in the city.",
      "If there is one thing I would tell my past self, it is that location matters more in Bangkok than almost anywhere else, because of the traffic. A school that looks perfect on a map can mean a 45 to 75 minute commute each way during peak hours, every single school day, for years. Families based in Sukhumvit (Asoke, Phrom Phong, Thong Lo, Ekkamai) tend to gravitate toward schools clustered in that corridor, while families who choose ISB often end up living inside or near Nichada Thani specifically to avoid the cross town commute. Before you fall in love with a school, map out the actual drive time from where you plan to live, at the time of day you would really be doing the school run, not the optimistic Google Maps estimate.",
      "The most popular schools in each category, including all six I named above, routinely run waiting lists, particularly for the more commonly requested year groups like early primary and the start of secondary. If a specific school is a priority for your family, apply well before you need a place. Many advisors recommend starting 9 to 12 months ahead for a normal move, and 12 to 18 months ahead if you are targeting a popular year group or a premium school specifically. I would still call admissions directly even when a website lists a firm deadline, since places do open up at different points in the year as other families' plans change.",
      "Here is something that never shows up in any school's marketing. Mid tier and smaller schools will often negotiate on fees, especially registration or enrollment fees, for families who ask directly. This is not advertised publicly, and you will not find it mentioned on a website or in a brochure. It tends to come up only in an in person conversation with admissions, particularly if you are enrolling more than one child, applying outside the main August intake, or a school is trying to fill a specific year group. It rarely happens at the very top tier, schools like Patana, ISB, or NIST generally do not need to negotiate. But for many of the schools in the middle of the market, it is worth simply asking the admissions team in person whether any flexibility exists on the registration or enrollment fee before you commit.",
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
