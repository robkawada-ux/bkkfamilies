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
    slug: "what-does-international-school-actually-cost-bangkok-2026",
    title: "What Does International School Actually Cost in Bangkok? A 2026 Fee Breakdown",
    category: "Schools",
    date: "2026-08-31",
    excerpt:
      "I pulled real published fee ranges from over 45 schools in our own directory instead of relying on vague marketing numbers. Here is what families are actually paying by tier, and the hidden costs nobody warns you about.",
    body: [
      "Every guide to Bangkok school fees I have read gives you a vague band, something like 400,000 to 900,000 baht a year, and calls it a day. That is not actually useful when you are trying to budget for a specific child at a specific school. So instead of estimating, I pulled the real published tuition ranges for more than 45 schools in our own directory and sorted them by tier. These are actual numbers schools have published, not averages I made up.",
      "Premium tier, generally over 900,000 baht at the top end. This is Ruamrudee at 548,400 to 1,527,000 baht a year, Wellington at 615,250 to 1,240,137, Shrewsbury at 691,800 to 1,208,400, International School Bangkok at 681,000 to 1,219,000, and NIST at 650,200 to 1,132,800. Harrow, Bangkok Patana, and King's College all land in a similar range, roughly 545,000 to just over a million depending on year group. These are the schools with decades of history, extensive facilities, and university counseling offices that genuinely know how to get kids into competitive programs abroad. You are paying for that infrastructure as much as the classroom itself.",
      "Upper mid tier, generally 400,000 to 800,000 baht depending on year group. Concordian runs 626,400 to 963,400, Bromsgrove 259,100 to 680,100, Regent's 430,800 to 759,600, KIS 459,800 to 984,700, BASIS 545,000 to 998,000, and Berkeley 519,200 to 839,200. This is where a lot of genuinely strong academic options sit, often 20 to 30 percent cheaper than the premium tier for outcomes that are honestly not that different at the primary level. The gap widens more in the senior years.",
      "Mid tier, generally 250,000 to 550,000 baht. Astra Academy sits at 516,600 to 550,200, Australian International School Bangkok at 322,000 to 520,000, Charter at 270,000 to 594,000, DPREP at 320,000 to 580,000, and Traill at 358,200 to 558,000. Hampton, a Reggio Emilia early years school, runs 326,000 to 494,000, which tells you early years pricing does not always track with primary and secondary the way you would expect.",
      "Value tier, generally under 350,000 baht. This is where the real savings live if the specific curriculum and campus fit your family. Modern International School Bangkok runs 199,500 to 260,100, Raffles American School 198,000 to 297,000, Trinity 198,000 to 220,870, Canadian International School of Thailand 198,500 to 545,000 depending heavily on year group, and Bangkok Christian International School as low as 84,000 to 136,000. Sarasas Ektra, a bilingual Thai English school, runs just 67,000 to 151,200 a year, which is a fraction of what the premium schools charge for a genuinely different but still solid academic option.",
      "Here is the thing nobody puts on the front page: tuition is usually only 75 to 85 percent of what you will actually pay in year one. Almost every school charges an application fee, typically 5,000 to 15,000 baht, plus a registration or enrollment fee that can run anywhere from 50,000 to 250,000 baht depending on the school, and this is separate from tuition and rarely refundable. On top of that, expect a capital or development levy at some schools, another 100,000 to 400,000 baht, sometimes partially refundable if you stay long enough, sometimes not refundable at all. Always ask which category you are in before you sign anything.",
      "Beyond the entry fees, budget for a school bus if you need one, typically 45,000 to 85,000 baht a year depending on distance, and factor in that Bangkok traffic means a bus route that looks reasonable on a map can still mean an hour each way. Exam registration for IGCSE, IB Diploma, or AP years is usually billed separately too, often 30,000 to 80,000 baht in the relevant year, and boarding, where it is offered at all, adds another 300,000 to 600,000 baht on top of day tuition.",
      "A few practical things I have learned the hard way. Sibling discounts are common, usually 5 to 15 percent starting from the second child, but they do not always stack with scholarships, so ask specifically. Most schools invoice in three terms and offer a small discount if you pay the full year upfront in August. If your employer is covering tuition as part of a relocation package, get in writing whether that covers just tuition or the capital levy and registration fees too, since that single detail can move your real out of pocket cost by six figures.",
      "If you are earning in a currency other than baht, keep an eye on timing. Almost every school here invoices in THB only, and a 3 percent swing in the exchange rate between accepting a place and your first invoice is a real number, not a rounding error. A few schools let you lock in an advance payment at a fixed rate, which is worth asking about if your income is in USD, GBP, EUR, or SGD.",
      "My honest advice: shortlist three to five schools across at least two different tiers before you start touring campuses. It is the only way to actually see whether the extra 300,000 or 400,000 baht a year at the premium tier is buying you something your family genuinely needs, or whether a strong mid tier or value tier option gets your kid to the same place for a lot less money. You can browse our full directory, with real fee ranges where we have them, to start building that shortlist yourself.",
    ],
  },

  {
    slug: "is-bangkok-safe-for-kids",
    title: "Is Bangkok Safe for Kids in 2026?",
    category: "Local Life",
    date: "2026-08-28",
    excerpt:
      "My honest answer after 8 years raising kids here: Bangkok is very, very safe, safer than most major cities I have lived in or visited. The one real exception is traffic.",
    body: [
      "People ask me this a lot, usually before they move here, and my honest answer is always the same. Bangkok is very, very safe for kids. Safer than most major cities I have lived in or visited, and safer than most people expect before they arrive. I say that after 8 years of actually raising my own two kids here, not from a guidebook.",
      "Crime is the thing people worry about most before they move, and it is genuinely low on the list of real concerns once you are actually living here. Violent crime aimed at families or kids is rare, and it is not the kind of city where you hear about it happening to people you know. Petty theft exists, as it does in any major city, but I have never felt unsafe walking around with my kids at night in the neighborhoods where families actually live, which is more than I can say for a lot of cities back home. I have had my kids out late at markets, at night events, walking home from a friend's condo, and it has never once felt like the kind of risk it might feel like in other big cities I have lived in.",
      "Healthcare is another reason Bangkok feels safe rather than risky. The private hospital system here is genuinely excellent, English speaking pediatric care is easy to find, and it is fast. If my kid needed a doctor on a Sunday, I never once worried about whether we could get seen. That alone removes a huge amount of the low level anxiety that comes with raising kids somewhere unfamiliar.",
      "The one place I will not sugarcoat anything: traffic. This is the actual danger in Bangkok, not crime, not the food, not anything else people ask me about. Drivers here do not reliably stop for pedestrians, even at marked zebra crossings with the little pedestrian signs. I cannot count the number of times I have been standing at a crosswalk with my kids, clearly waiting to cross, and had a car or motorbike just keep going. You cannot assume a zebra crossing means you have the right of way here the way you might elsewhere. You have to make eye contact with drivers, wait for a real gap, and physically hold your kid's hand until you are fully across, every single time, no exceptions, even when they are old enough that you would normally let them cross on their own.",
      "Sidewalks add to this. They are often uneven, sometimes blocked by motorbikes parked on them, and not always continuous. When my kids were younger and still in strollers, this was the single biggest daily hassle, more than the heat, more than anything else. If you are moving here with young kids, get a stroller with real wheels that can handle uneven pavement, not something built for smooth suburban sidewalks.",
      "Air quality is worth knowing about too, though it is seasonal rather than constant. Between roughly January and March, Bangkok goes through a burning season where PM2.5 levels can spike noticeably. We keep an air quality app on our phones during those months and run air purifiers in the kids' rooms. It is not something that affects daily life the rest of the year, but it is real during that window and worth planning around rather than being surprised by.",
      "If I am being completely honest, the biggest adjustment for us was never really about safety. It was logistics, mainly the traffic and the commute times to school, which I have written about elsewhere. The actual day to day safety of raising kids in Bangkok has been better than I expected when we first moved here, and after 8 years and two kids now 16 and 14, that has held up the entire time. When people from home ask me if it is safe to raise kids here, I tell them the truth. It is safer than most of the major cities I could have picked instead. Just take crosswalks seriously, hold your kid's hand every time, and do not assume a driver sees you just because you are standing in a marked crossing. That is the one piece of advice I would want every new parent here to actually hear before they need it.",
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
    slug: "9-things-to-do-in-bangkok-with-kids",
    title: "9 Things to Do in Bangkok With Kids (2026 Edition)",
    category: "Activities",
    date: "2026-08-28",
    excerpt:
      "From the theme parks my kids loved at 6 to the mall waterparks they still ask for now, plus real prices, real tips, and a scary few minutes at Dream World I still think about.",
    heroImage: "/images/articles/9-things-to-do-in-bangkok-with-kids/dream-world.jpg",
    images: [
      { src: "/images/articles/9-things-to-do-in-bangkok-with-kids/lumpini-paddle-boats.jpg", alt: "Paddle boats at Lumpini Park Bangkok", afterParagraph: 3 },
      { src: "/images/articles/9-things-to-do-in-bangkok-with-kids/discovery-museum-splash.jpg", alt: "Outdoor water spray area at Children's Discovery Museum Bangkok", afterParagraph: 4 },
    ],
    body: [
      "My kids have been going on Bangkok outings with me since they were about 6 years old, and this is the list I actually stand behind, not just what shows up in every generic roundup. Some of these we have done a dozen times over the years, and I have picked up enough tips along the way that I figured they were worth writing down properly, prices included.",
      "1. Dream World. This was one of our very first big outings when my kids were little, and it is still a classic for a reason. It is a proper day trip, not a couple of hours, so plan for that. Standard entry with unlimited rides runs somewhere around 800 to 1,200 baht depending on the package, and kids under 90cm tall get in free. If you want Snow Town or the go karts, know that those specifically require a height of at least 155cm, so a younger kid can ride most of the park but will be watching from the sidelines for those two. Go on a weekday if you possibly can. Weekends get genuinely packed, and Bangkok heat plus a long queue is not a combination anyone enjoys with kids in tow. Bring a change of clothes too, some of the rides get you properly wet.",
      "I will be honest about one thing that happened to us there, because I think it is worth sharing rather than glossing over. When my daughter was 9, we were all waiting right outside the bathrooms for her to come out, and somehow she slipped past us before we noticed. We asked the staff for help right away, and they searched inside the bathroom area along with a few friendly Thai visitors who jumped in to help without us even asking. Before we knew it, she came back out and found us waiting right where we said we would be. It rattled me more than it rattled her. What I do differently now: we pick an obvious, easy to describe meeting point before we split up for anything, even a bathroom trip, and I make sure my kids know that if they get turned around, the move is to head straight back to that spot. Dream World's staff and the strangers who helped that day were genuinely great, and I have no complaints about how it was handled, but I would rather other parents have that plan in place before they need it, not after.",
      "2. Lumpini Park paddle boats. This is the low key, low cost option we would do on an ordinary weekend. Renting a paddle boat for half an hour is cheap, genuinely just a few hundred baht for the boat, and just being out on the water in the middle of the city is simple, but my kids never got tired of it. Go in the late afternoon if you can, the heat is more manageable and the light is nicer.",
      "3. Children's Discovery Museum. Great for the younger end of the age range especially, and the best value on this entire list since entry is completely free, you just register with an ID at the door. Hands on exhibits that hold a 6 or 7 year old's attention for hours, and it is air conditioned, which matters more than people think in Bangkok. There is also an outdoor water spray area with fountains and jets that my kids ran through for a solid hour, so if you go, pack swimsuits and a towel just in case.",
      "4. IconSiam. Beyond the shopping and the river views, Mega HarborLand inside IconSiam is genuinely one of the better indoor playgrounds we have found in the city, with big slides and climbing zones. Pricing at these indoor playgrounds is usually by the hour with a day cap, so check current rates before you go since they do change, but budget for at least two hours if your kids are anything like mine were. They could spend an entire afternoon there and did, more than once.",
      "5. Terminal 21. The international themed floors are honestly half the fun for kids, walking from a Tokyo themed level to a San Francisco themed level and noticing the little details on each one. There is also a HarborLand branch here, so if IconSiam is out of the way that day, Terminal 21 covers the same kind of indoor play need without the crowds you sometimes get at IconSiam on weekends.",
      "6. Malls with rooftop water parks. This was a genuine surprise to us when we first found it. Pororo Aquapark on top of Central Bangna turns an ordinary shopping mall trip into an actual water park day, slides and all, without leaving the mall complex. Adult entry is around 400 baht, kids between 90 and 120cm are around 280 baht, and under 90cm is free. Just know that several of the bigger slides have a 120cm minimum height, so check that against your kid's height before you promise them the big one. On a hot day this is genuinely hard to beat.",
      "7. Chatuchak Market on a weekend. Chaotic, but in a good way, and entry itself is free, you are only paying for whatever you buy. The pet section and the toy stalls are what kept my kids interested when they were younger, and it doubles as an easy way to introduce them to a proper Bangkok market experience. Go early, before 10am if you can manage it, both for the heat and because it gets seriously crowded by early afternoon.",
      "8. Climbing gyms and trampoline parks. As my kids got older, these became the go to option over the toddler style playgrounds. My honest feedback after a lot of visits: budget for one to two hours, not a full afternoon. Kids get genuinely tired faster at these than you would expect, the climbing and jumping is a real workout, and past that two hour mark you tend to get diminishing returns, more complaining, more minor scrapes from tired kids not paying attention. Plan something calmer for after, food nearby works well, rather than stacking two high energy activities back to back.",
      "9. Rainy day options: cat cafes and VR arcades. Bangkok's rainy season used to mean cancelled plans. Now most major malls have an indoor play center, a cat cafe, or a VR arcade, so we stopped worrying about the forecast and just picked whichever mall was closest. Cat cafes usually charge a cover fee that includes a drink, and most VR arcades charge per session or per game, so neither one requires much planning ahead, which is exactly what you want on a day the weather already ruined your original plan.",
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
