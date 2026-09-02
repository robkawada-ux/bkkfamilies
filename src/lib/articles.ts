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
    slug: "how-to-find-a-nanny-in-bangkok",
    title: "How to Find a Nanny in Bangkok: What Nine Years and Four Hires Taught Me",
    category: "Local Life",
    date: "2026-09-02",
    metaDescription: "What a nanny really costs in Bangkok, where to find one, and how to vet her. Written by a parent who employed nannies here from 2011 to 2020, not by an agency selling placements.",
    keywords: ["nanny Bangkok", "how to find a nanny in Bangkok", "nanny cost Bangkok", "Bangkok nanny salary", "live-in nanny Bangkok", "maid Bangkok cost", "hiring a nanny in Thailand", "Bangkok housekeeper salary", "English speaking nanny Bangkok", "Filipino nanny Thailand legal", "domestic helper Bangkok", "nanny agency Bangkok"],
    excerpt:
      "I had nannies in my home in Bangkok from 2011 to 2020 and went through three or four before I found the two who stayed. Here is what they actually cost, where to find one, and how to know who to trust, from someone who was never paid a placement fee.",
    heroImage: "/images/articles/how-to-find-a-nanny-in-bangkok/finding-a-nanny-in-bangkok-hero.jpg",
    images: [
      { src: "/images/articles/how-to-find-a-nanny-in-bangkok/kids-with-the-dog-bangkok.jpg", alt: "Two kids lying on the floor with the family dog at home in Thailand", afterParagraph: 4 },
      { src: "/images/articles/how-to-find-a-nanny-in-bangkok/christmas-with-our-nanny-bangkok.jpg", alt: "Our nanny in a Santa hat with my two kids in Christmas pyjamas at our home in Bangkok", afterParagraph: 40 },
    ],
    headings: [
      { beforeParagraph: 3, text: "First, know what you are hiring" },
      { beforeParagraph: 6, text: "Where to actually find someone" },
      { beforeParagraph: 14, text: "What to pay" },
      { beforeParagraph: 21, text: "Live-in or live-out" },
      { beforeParagraph: 25, text: "Languages, and the English question" },
      { beforeParagraph: 29, text: "Trust, which is the real question" },
      { beforeParagraph: 36, text: "Worth knowing, briefly" },
      { beforeParagraph: 38, text: "Ending it well" },
    ],
    faq: [
      {
        question: "How much does a nanny cost in Bangkok in 2026?",
        answer: "A full time live-in nanny realistically costs 15,000 to 20,000 baht a month, and a full time live-out nanny 18,000 to 22,000, since she covers her own rent and transport. A combined nanny and housekeeper runs 18,000 to 24,000. Agencies quote higher, often 25,000 to 35,000 and above, and one agency site puts the Bangkok average at 41,800 baht, which is well above what most families here actually pay. Budget separately for a year-end bonus, Songkran money, food and transport.",
      },
      {
        question: "Where is the best place to find a nanny in Bangkok?",
        answer: "Word of mouth first. A recommendation from a family who has actually employed someone for a year beats any agency screening. After that, Facebook groups like Bangkok Expat Families are the volume channel, where one plain post can draw fifty or more replies. Agencies are the convenience option if you are arriving cold with no network, charging a one-off placement fee of roughly 5,000 to 25,000 baht.",
      },
      {
        question: "Should I hire a live-in or live-out nanny in Bangkok?",
        answer: "Geography usually decides it. Condo families in central areas like Phrom Phong and Ekkamai often manage with part time or live-out help, while families in houses in Bang Na, Nichada Thani and the outer neighbourhoods lean live-in because nobody can reliably commute to a 6:30am start. Live-in is cheaper per hour and more flexible, but it requires a proper room with a door and a lock, and real discipline about the weekly day off.",
      },
      {
        question: "Can I hire a Filipino nanny in Thailand?",
        answer: "Household work is on Thailand's restricted-occupation list for foreigners. The only foreign nationals who can legally hold a work permit for domestic work are citizens of Myanmar, Laos and Cambodia under a long-standing MOU arrangement. Filipina nannies are widely sought and widely employed in Bangkok, but almost always outside that framework, and the employer carries the legal exposure. Enforcement is uncommon, but it is worth knowing which arrangement you are in.",
      },
      {
        question: "How do I check whether a nanny in Bangkok is trustworthy?",
        answer: "There is no licensing body or certification for this job in Thailand, so a certified nanny claim means whatever the agency decided it means. What works instead is a police clearance certificate from the Royal Thai Police, copies of the ID card and house registration, a reference call made in Thai rather than English, and a paid trial week with you at home.",
      },
      {
        question: "Do nannies in Bangkok speak English?",
        answer: "Some do, but English-speaking means very different things to different people and it is the easiest thing on a CV to overstate. Expect three broad tiers: enough English to follow simple instructions, enough to discuss a day and a problem, and enough to be a genuinely bilingual presence for your child. That top tier commands a large premium. Test it by interviewing in English without simplifying, then running a paid trial day.",
      },
    ],
    body: [
      "Barely a week goes by in the Bangkok Expat Families group without someone asking about nannies. Where do I find one. What should I pay. Live-in or live-out. Is 18,000 too much, is 12,000 insulting, does she need to speak English, can I trust a stranger in my house with my kids.",
      "I ran that group while I was living the answer. From 2011 to 2020 I had nannies in my home, first in Nonthaburi and then in Bangkok. I went through three or four before I found the two who stuck, and both of them became part of our family in a way I did not expect when I first typed a post asking for help. We moved back to the States years ago and we still visit both of them when we come to Thailand. We take them out for lunch.",
      "So this is not a guide written by an agency that gets paid when you hire someone. Nearly every article that outranks this one on Google is. Search for a nanny in Bangkok and you will find HelloNanny, FamBear, Carenest, Kiidu, ThaiHelper, Madawa and Ayasan, and every one of them earns a placement fee when you take their advice. One of those sites claims the average Bangkok nanny costs 41,800 baht a month. I want to be polite about this, so I will just say that number would have surprised every family I knew in nine years.",
      "Expats arrive with three separate job titles in their head: nanny, maid, housekeeper. In most Bangkok households they are one person. The Thai word is phi liang, which literally means the older sibling who raises you, and that tells you most of what you need to know about how the role is understood here. It is not a babysitter who watches the kids and leaves. It is a person who becomes part of the running of your house.",
      "Our arrangement was typical. Childcare first, then cooking, cleaning, help with the grocery shopping, the dog, and the school run maybe twice a month when neither of us could make it. If you go into this expecting someone who does childcare and nothing else, you will pay more and you will find fewer candidates, because that is not how the job is understood in this market.",
      "Decide the scope before you post anything, and write it down. The families I saw struggle were almost always the ones who hired for one job and slowly expected three.",
      "Word of mouth is still the best channel. Our first nanny, Pa Aoy, came through a family recommendation. Pa is the respectful word for an older woman, and that is what our kids called her from the first week. A recommendation from someone who has actually watched a person work for a year is worth more than any agency screening, because it is the only reference that has been stress tested by time.",
      "So ask everyone. Colleagues, condo juristic staff, other parents at the school gate, your building's security guards. Nannies in Bangkok have wide networks and they will refer their friends and cousins, which is a channel most expats never think to use.",
      "Facebook groups are the volume channel. When we needed our second nanny I posted in the group. The post was not clever. It said we needed a nanny to look after our kids, cook and clean. That was it. We got more than fifty replies.",
      "Which sounds like a great problem until you try to process fifty replies. We narrowed it to about ten interviews, and a good number of those simply did not show up. No message, no explanation. This is normal and it is not personal. Many candidates are messaging every family who posts, some are already employed and testing the water, and some decide the commute is impossible once they look at the map. Budget for the no-show rate. If you want to meet ten people, line up fifteen.",
      "Here is something I can tell you that the agency guides cannot, because I moderate that group. I get roughly three times as many post requests from nannies looking for work as I do from families looking for a nanny. I do not approve most of the nanny-side ones, because there are so many that the group would turn into a job board overnight. I also limit how many looking-for-a-nanny posts go up in a given week, for the same reason. If your post has ever sat in the queue for a bit, that is why.",
      "That ratio is the single most useful thing I know about this market. It is supply-heavy. There are far more people wanting this work than there are families offering it, which is why one plain post got me fifty replies, and it means you have more room to be selective and more time to get it right than the panic of the search makes it feel. The exception is the specialist end: strong English, Mandarin or Japanese, newborn experience, or a driving licence. Those candidates are genuinely scarce and they know it, and that is where the market flips and you are the one competing.",
      "Agencies are the convenience channel. They charge a one-off placement fee, usually somewhere between 5,000 and 25,000 baht, and in return you get a shortlist, some paperwork help and often a replacement guarantee if it does not work out in the first month or two. The agencies and booking platforms operating in this space include Ayasan, Kiidu, FamBear, Carenest, HelloNanny, ThaiHelper, Madawa and BeNeat, some placing full-time staff and some closer to on-demand cleaning and sitting. I am listing them without recommending any of them, because I never used one.",
      "An agency is worth the money if you are arriving cold with no network and no Thai, or if you need someone next week. Just understand that the agency is also advising you on the salary, and the agency's fee often scales with that salary. Read their pay guidance accordingly.",
      "This is the question everyone actually wants answered, so here are real numbers. We paid 15,000 baht a month for a live-in nanny, all meals included, one day off a week, and a one month bonus at the end of the year. That was our arrangement across those nine years.",
      "I want to be honest about that figure rather than present it as a benchmark, because two things are true about it. First, 15,000 baht in 2011 is worth roughly 17,600 baht in today's money, and the same 15,000 in 2020 is worth about 16,200 today. Second, we kept it at 15,000 across the whole period, and looking back that is the one thing I would do differently. A flat salary quietly shrinks every year. If you are hiring now, build in a review, even a small one, and say so at the start.",
      "Here is where the market sits in 2026. For a full time live-in nanny, agencies quote 16,000 to 25,000 baht a month, and the families I know actually pay 15,000 to 20,000. Live-out full time is quoted at 15,000 to 30,000 and really lands around 18,000 to 22,000, since she is covering her own rent and transport out of it. A maid or housekeeper with no childcare runs 12,000 to 18,000. Combine the two roles, which is what most families actually want, and you are looking at 18,000 to 24,000.",
      "The specialist rates sit well above that. Strong English gets quoted as high as 50,000 and realistically costs 25,000 to 35,000. Mandarin or Japanese is genuinely scarce and genuinely expensive, usually 25,000 to 35,000 and often more. A newborn specialist runs 22,000 to 30,000. Part time and hourly work is quoted at 350 baht an hour by the agencies, while the real rate is closer to 200 to 300 an hour, or 800 to 1,200 for a full day.",
      "Location moves the number too. Central Sukhumvit runs roughly 20 to 30 percent above outer Bangkok. A live-out nanny in Phrom Phong costs meaningfully more than the same person in Bang Na, partly because of what she has to spend and how long she has to travel to get to you.",
      "One useful floor: Bangkok's minimum wage went to 400 baht a day on 1 July 2025. Nobody in this market is auditing household payroll, but it does tell you where the wider labour market has moved, and it means anything under about 12,000 a month now reads as low even for a live-in role with meals. Take it as a pricing signal rather than a legal one.",
      "Then there are the extras people forget when they budget. A thirteenth month or year-end bonus is not required and is effectively expected, and we paid one month. Songkran money runs 1,000 to 5,000 baht, more for long service. For a live-in you either feed her properly or pay 2,000 to 3,000 a month for food, and feeding her properly is better and costs about the same. For a live-out, 1,000 to 2,000 a month toward transport is normal. And for someone from Isaan or from across the border, helping with the fare home at Songkran and New Year matters more than the amount suggests.",
      "Both of ours lived with us, and geography is why. We were in Nonthaburi first, out toward the international school side of the river, and then in Bangkok. Anywhere with a house and a real commute pushes you toward live-in almost by default. Nobody is going to reliably reach you at 6:30 in the morning from the far end of a BTS line.",
      "Broadly, the pattern across the city looks like this. Condo families in Phrom Phong and Ekkamai lean part time or live-out. Sathorn and Ari lean full time, usually because of cross-town school runs. Bang Na, Nichada Thani and the outer house neighbourhoods lean live-in.",
      "Live-in is cheaper per hour, more flexible, and far more likely to turn into a real relationship with your family. It also means someone else lives in your home, which changes the house. You need a genuine room with a door and a lock, not a converted store cupboard, and you need to be disciplined about the day off actually being a day off. The single fastest way to lose a good live-in nanny is to let she is here anyway turn into a seven day week.",
      "Live-out gives you your evenings back and a cleaner separation between employer and family. You pay more for it and you lose the flexibility. If your childcare need includes early mornings, late dinners or travel, be realistic about whether live-out actually covers it.",
      "Our first nanny was Isaan Thai. Our second, Sarapao, was Burmese and spoke Thai. That combination is very common in Bangkok households and worth understanding. A large share of the domestic workforce here is Thai from Isaan or migrant from Myanmar, and Thai is the working language in both cases. Our kids grew up with Thai in the house, which I now consider one of the better accidents of the whole arrangement.",
      "English is where families overpay. English-speaking means completely different things to different people, and it is the single easiest thing for a candidate to overstate. There are really three tiers: enough English to follow simple instructions, enough to talk through a day and a problem, and enough to be a genuinely bilingual presence for your child. The gap between the first and the third is 15,000 baht a month.",
      "Test it properly, because a CV will not. Do the interview in English without slowing down or simplifying. Ask her to describe what she would do if your child had a fever, or refused to eat, or fell at the playground. Then do a paid trial day and see whether she can actually follow you in real time in your real house. And when you check references, ask specifically whether communication worked in practice, not whether her English was good.",
      "One note on nationality while we are here. Household work is on Thailand's restricted-occupation list for foreigners, and the only foreign nationals who can legally hold a work permit for it are from Myanmar, Laos and Cambodia under a long-standing MOU arrangement. Filipina nannies are widely sought in this city and widely employed, but they are almost always working outside that framework, and it is the employer who carries the exposure. I am not going to pretend enforcement is common, because it is not. Just go in knowing which arrangement you are actually in.",
      "There is no licensing body for this job in Thailand. No certification, no register, no qualification. When an agency describes someone as a certified nanny, that means whatever the agency has decided it means. So you build trust the slow way.",
      "Get a police clearance certificate. Thai nationals can obtain one from the Royal Thai Police. It is cheap, it is routine, and asking for it is not an insult.",
      "Call the references, in Thai. Copies of the ID card and house registration are standard, but the phone call is what matters. Get someone who speaks Thai to make it if you do not, because the previous employer may well be a Thai family and the honest version of the answer will not come out in English.",
      "Run a paid trial week. Not a trial hour. A week, paid properly, with you around. This is where you learn everything the interview could not tell you.",
      "Then expect to correct things, because you will. Sarapao was wonderful with our kids and there were still real things to work through. Sometimes the cleaning was not to the standard we wanted and we had to say so. She was too lenient with screen time and would let the kids have it when we had said no. Neither of those things made her a bad hire. She learned quickly how we wanted the house run, and the reason she learned quickly is that we told her clearly and early.",
      "That is the part I would push hardest on. Almost every nanny horror story I heard in nine years started with a family that was too polite to say what they wanted and then got quietly resentful about not getting it. Say it in week one. Say it kindly and say it plainly. And remember that in Thai workplace culture, direct criticism lands harder than you intend, so lead with what is going well.",
      "Also worth saying: we went through three or four people before we settled. That is not failure, it is the normal shape of this. A hire that does not work is a mismatch, not a betrayal, and the sooner you act on it the better for everyone, including her.",
      "Thai law was updated in April 2024 and domestic workers now formally have minimum wage coverage, an eight hour day, one full rest day a week, thirteen public holidays, six days of annual leave after a year, up to thirty days of paid sick leave and maternity protection. Domestic workers remain outside the social security system, which means no state healthcare or pension attached to the job, and severance rules do not apply.",
      "Realistically, almost no household in Bangkok is administering any of this and nobody is checking. I mention it for two reasons. It tells you roughly what a fair arrangement looks like, and the social security gap is a genuine hole worth filling yourself. Private health cover for someone who lives in your home and looks after your children is not expensive, and it is the right thing to do.",
      "Ours ended because we moved. Pa Aoy did not come with us when we left Nonthaburi for Bangkok. Sarapao did not come with us when we left Bangkok for the States.",
      "The law required us to pay nothing. We gave Sarapao two months of salary as a leaving bonus, made sure everyone we knew heard she was available, and she had a new family within weeks. That is what a good reference from a settled family in this city is actually worth, and it costs you nothing to give.",
      "If you take one thing from all of this, take that. The families who had the best experiences with nannies in Bangkok were not the ones who paid the most or screened the hardest. They were the ones who treated it as a real relationship with a real person, said what they wanted early, paid a bit above what they had to, and protected the day off.",
      "We left Thailand years ago. We still visit Pa Aoy and Sarapao when we go back, and we still take them out for lunch. Nine years on, that is the part I would tell you about first.",
      "If you have a nanny you would recommend, or a question this did not answer, the Bangkok Expat Families group on Facebook is still the best place in the city to ask.",
    ],
  },
  {
    slug: "what-does-international-school-actually-cost-bangkok-2026",
    title: "Bangkok International School Fees 2026/2027: What Tuition Actually Costs",
    category: "Schools",
    date: "2026-08-31",
    metaDescription: "How much is tuition at international schools in Bangkok for 2026/2027? Real published fee ranges from 45+ schools, broken down by tier, plus the hidden costs most guides leave out.",
    keywords: ["Bangkok school fees", "Thailand international school fees", "Bangkok international school tuition", "how much is tuition Bangkok international school", "international school fees Bangkok 2026", "international school fees Bangkok 2027", "cheapest international school Bangkok"],
    excerpt:
      "From 2014 to 2020 I sent my own kids through three different Bangkok international schools, and worked in marketing and admissions for two of them. Here is what families actually pay for the 2026/2027 school year, by tier, using real published numbers instead of vague marketing ranges.",
    heroImage: "/images/articles/what-does-international-school-actually-cost-bangkok-2026/hero-skyline.jpg",
    images: [
      { src: "/images/articles/what-does-international-school-actually-cost-bangkok-2026/students-walking.jpg", alt: "International school students in Bangkok", afterParagraph: 2 },
    ],
    headings: [
      { beforeParagraph: 3, text: "Premium tier: over 900,000 THB" },
      { beforeParagraph: 4, text: "Upper mid tier: 400,000 to 800,000 THB" },
      { beforeParagraph: 5, text: "Mid tier: 250,000 to 550,000 THB" },
      { beforeParagraph: 6, text: "Value tier: under 350,000 THB" },
      { beforeParagraph: 7, text: "The hidden fees nobody puts on the front page" },
      { beforeParagraph: 9, text: "How to actually save money on Bangkok school fees" },
    ],
    relatedSchools: [
      { name: "Ruamrudee International School (RIS)", slug: "ruamrudee-international-school-ris" },
      { name: "KIS International School Bangkok", slug: "kis-international-school-bangkok" },
      { name: "The American School of Bangkok (ASB)", slug: "the-american-school-of-bangkok-asb" },
      { name: "International Community School", slug: "international-community-school" },
      { name: "Bangkok Christian International School", slug: "bangkok-christian-international-school" },
      { name: "Sarasas Ektra School", slug: "sarasas-ektra-school" },
    ],
    faq: [
      {
        question: "How much is tuition at international schools in Bangkok for 2026/2027?",
        answer: "It depends heavily on tier. Value tier schools like Bangkok Christian International and Sarasas Ektra run from around 67,000 to 260,000 THB a year. Mid and upper mid tier schools generally fall between 250,000 and 800,000 THB. Premium schools like ISB, NIST, Wellington, and Ruamrudee run from around 550,000 up to 1,500,000 THB a year depending on grade level.",
      },
      {
        question: "What is the cheapest international school in Bangkok?",
        answer: "Among schools with published fees, Sarasas Ektra and Bangkok Christian International School are among the lowest, both with entry level fees under 150,000 THB a year. These are genuine international curriculum schools, not just low cost by accident, but families should compare curriculum and outcomes alongside price.",
      },
      {
        question: "Are there hidden fees beyond tuition at Bangkok international schools?",
        answer: "Yes, almost always. Expect an application fee, a separate registration or enrollment fee that can run into six figures at some schools, and possibly a capital or development levy. Add transport, exam registration fees in IGCSE, IB, or AP years, and boarding if relevant. Tuition alone is usually only 75 to 85 percent of the real first year cost.",
      },
      {
        question: "Do Bangkok international schools offer sibling discounts?",
        answer: "Many do, typically 5 to 15 percent starting from the second child, though this varies by school and does not always stack with scholarships. Always ask directly rather than assuming.",
      },
    ],
    body: [
      "From 2014 to 2020, I sent my two kids to different international schools in Bangkok: The American School of Bangkok, KIS International School, and The International Community School (ICS). Each school came with its positives and challenges, but my kids greatly benefited from their time spent there. Ultimately we ended up moving back to the USA for a number of reasons, but that is something I will get into later.",
      "I also worked in marketing and admissions for both The American School of Bangkok and for KIS International School. This required me to know a lot about not only those schools, but the international school landscape in Bangkok and the surrounding areas. I can tell you that the biggest three factors when choosing a school are typically these: price, location, and curriculum.",
      "While there are many other factors, let us dive into the first one, price. Every guide to Bangkok school fees I have read gives you a vague band, something like 400,000 to 900,000 baht a year, and calls it a day. That is not actually useful when you are trying to budget for a specific child at a specific school for the 2026/2027 school year. So instead of estimating, I pulled the real published tuition ranges for more than 45 schools in our own directory and sorted them by tier. These are actual numbers schools have published for the current fee cycle, not averages I made up.",
      "This is Ruamrudee at 548,400 to 1,527,000 baht a year, Wellington at 615,250 to 1,240,137, Shrewsbury at 691,800 to 1,208,400, International School Bangkok at 681,000 to 1,219,000, and NIST at 650,200 to 1,132,800. Harrow, Bangkok Patana, and King's College all land in a similar range, roughly 545,000 to just over a million depending on year group. These are the schools with decades of history, extensive facilities, and university counseling offices that genuinely know how to get kids into competitive programs abroad. You are paying for that infrastructure as much as the classroom itself.",
      "Concordian runs 626,400 to 963,400, Bromsgrove 259,100 to 680,100, Regent's 430,800 to 759,600, KIS 459,800 to 984,700, BASIS 545,000 to 998,000, and Berkeley 519,200 to 839,200. This is where a lot of genuinely strong academic options sit, often 20 to 30 percent cheaper than the premium tier for outcomes that are honestly not that different at the primary level. The gap widens more in the senior years.",
      "Astra Academy sits at 516,600 to 550,200, Australian International School Bangkok at 322,000 to 520,000, Charter at 270,000 to 594,000, DPREP at 320,000 to 580,000, and Traill at 358,200 to 558,000. Hampton, a Reggio Emilia early years school, runs 326,000 to 494,000, which tells you early years pricing does not always track with primary and secondary the way you would expect.",
      "This is where the real savings live if the specific curriculum and campus fit your family. Modern International School Bangkok runs 199,500 to 260,100, Raffles American School 198,000 to 297,000, Trinity 198,000 to 220,870, Canadian International School of Thailand 198,500 to 545,000 depending heavily on year group, and Bangkok Christian International School as low as 84,000 to 136,000. Sarasas Ektra, a bilingual Thai English school, runs just 67,000 to 151,200 a year, which is a fraction of what the premium schools charge for a genuinely different but still solid academic option.",
      "Tuition is usually only 75 to 85 percent of what you will actually pay in year one. Almost every school charges an application fee, typically 5,000 to 15,000 baht, plus a registration or enrollment fee that can run anywhere from 50,000 to 250,000 baht depending on the school, and this is separate from tuition and rarely refundable. On top of that, expect a capital or development levy at some schools, another 100,000 to 400,000 baht, sometimes partially refundable if you stay long enough, sometimes not refundable at all. Always ask which category you are in before you sign anything.",
      "Beyond the entry fees, budget for a school bus if you need one, typically 45,000 to 85,000 baht a year depending on distance, and factor in that Bangkok traffic means a bus route that looks reasonable on a map can still mean an hour each way. Exam registration for IGCSE, IB Diploma, or AP years is usually billed separately too, often 30,000 to 80,000 baht in the relevant year, and boarding, where it is offered at all, adds another 300,000 to 600,000 baht on top of day tuition.",
      "A few practical things I have learned the hard way. Sibling discounts are common, usually 5 to 15 percent starting from the second child, but they do not always stack with scholarships, so ask specifically. Most schools invoice in three terms and offer a small discount if you pay the full year upfront in August. If your employer is covering tuition as part of a relocation package, get in writing whether that covers just tuition or the capital levy and registration fees too, since that single detail can move your real out of pocket cost by six figures.",
      "If you are earning in a currency other than baht, keep an eye on timing. Almost every school here invoices in THB only, and a 3 percent swing in the exchange rate between accepting a place and your first invoice is a real number, not a rounding error. A few schools let you lock in an advance payment at a fixed rate, which is worth asking about if your income is in USD, GBP, EUR, or SGD.",
      "My honest advice: shortlist three to five schools across at least two different tiers before you start touring campuses. It is the only way to actually see whether the extra 300,000 or 400,000 baht a year at the premium tier is buying you something your family genuinely needs, or whether a strong mid tier or value tier option gets your kid to the same place for a lot less money. You can browse our full directory, with real 2026/2027 fee ranges where we have them, to start building that shortlist yourself.",
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
