export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO
  excerpt: string;
  /**
   * Paragraphs. Plain text plus the minimal inline markup understood by
   * components/ui/RichText: [label](/path) and [label](https://...) for
   * links, **text** for bold. Nothing else is parsed. Headings and images
   * have their own arrays below rather than living in the body.
   */
  body: string[];
  heroImage?: string;
  images?: { src: string; alt: string; afterParagraph: number }[];
  headings?: { beforeParagraph: number; text: string }[];
  /** Answers accept the same inline markup as body paragraphs. */
  faq?: { question: string; answer: string }[];
  relatedSchools?: { name: string; slug: string }[];
  /** Slugs from lib/healthcare. Renders a link block into the directory. */
  relatedFacilities?: { name: string; slug: string }[];
  metaDescription?: string;
  keywords?: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: "bangkok-smog-season-kids",
    title: "Bangkok's Smog Season and Your Kids: What Actually Helps",
    category: "Healthcare",
    date: "2026-09-14",
    metaDescription:
      "We considered leaving Thailand for part of every year to escape it. The season and why it happens, why the AQI number you are reading may not mean what you think, how to size an air purifier properly, the mask fit problem in children, and what to ask your school.",
    keywords: ["Bangkok smog season", "Bangkok PM2.5", "air pollution Bangkok kids", "Bangkok AQI", "burning season Thailand", "air purifier Bangkok", "N95 mask children Bangkok", "school closures pollution Bangkok", "Thai AQI vs US AQI", "PM2.5 children health", "Bangkok air quality months"],
    excerpt:
      "I priced out moving the family to Australia for two or three months a year just to miss the worst of it. I never did it, but I thought about it seriously enough to know the smog talk is not overblown. Here is what actually helps.",
    headings: [
      { beforeParagraph: 6, text: "When it actually happens" },
      { beforeParagraph: 12, text: "The number you are looking at may not mean what you think" },
      { beforeParagraph: 19, text: "What it does to children" },
      { beforeParagraph: 24, text: "Masks, and the fit problem nobody mentions" },
      { beforeParagraph: 30, text: "Air purifiers, and how to size one properly" },
      { beforeParagraph: 39, text: "The school question" },
      { beforeParagraph: 43, text: "Should you leave for the season?" },
      { beforeParagraph: 49, text: "What actually works, in order" },
    ],
    relatedFacilities: [
      { name: "Samitivej International Children's Hospital", slug: "samitivej-international-childrens-hospital" },
      { name: "Samitivej Sukhumvit Hospital", slug: "samitivej-sukhumvit-hospital" },
      { name: "Bumrungrad International Hospital", slug: "bumrungrad-international-hospital" },
      { name: "Queen Sirikit National Institute of Child Health", slug: "queen-sirikit-national-institute-of-child-health" },
    ],
    body: [
      "We came close to moving the family out of Thailand for part of every year.",
      "Not permanently. The plan I kept turning over was two or three months in Australia, timed to miss the worst of the smog season and coming back once the air cleared. I never did it. But I thought about it seriously enough to price it out, and that tells you something about how bad it gets.",
      "My daughter has mild cerebral palsy, which leaves her lungs weaker than they should be. Watching both of my children breathe that air, knowing one of them had less margin than the other, was a genuinely awful feeling and not something I had thought about before we moved.",
      "It reached me too. In the bad weeks my chest felt tight and my eyes stung by the end of the day, and I am a healthy adult who was mostly indoors.",
      "And then there were the stretches when school was simply cancelled. Everyone stayed inside with air purifiers running around the clock, and children who should have been outside on a playground watched the sky instead.",
      "So if you have just arrived and you are wondering whether the smog talk is overblown, it is not. But it is also manageable, and almost everything that genuinely helps is cheap and unglamorous. Here is what is worth knowing.",
      "The bad air runs roughly from December through April, and the worst of it is usually January and February. The rest of the year, particularly the rainy season from about June to October, Bangkok's air is unremarkable and often good.",
      "The reason it concentrates in those months is meteorological rather than industrial. In the cool season a layer of cold air settles near the ground under a layer of warmer air, which caps the city and stops pollution dispersing upward. Wind drops off as well. The same emissions that vanish into the atmosphere in July simply sit on top of you in January.",
      "What fills that trapped layer is a mixture: vehicle exhaust from a city of ten million, industry around the edges, and crop stubble burning across the central plains and further north. The burning is the part that turns a bad week into a crisis week, and it is also the part nobody in Bangkok controls.",
      "This is why the seasonality is so sharp. It is not that Bangkok pollutes more in January. It is that in January there is nowhere for it to go.",
      "It is, slowly, getting better. Thailand's Pollution Control Department compared the November to early March window across two years and found Bangkok's average PM2.5 fell from 33 to 28 micrograms per cubic metre, a 15 percent improvement, while the number of days exceeding the Thai standard dropped from 65 to 29.",
      "That is real progress and worth acknowledging. It is also progress from a bad baseline. Twenty-nine days over the national standard in a single season is still most of a month during which the air is officially not fit to breathe, and the national standard is itself more permissive than the World Health Organization's.",
      "If you take one thing from this article, make it this, because it catches almost everyone and it is invisible until somebody points it out.",
      "**Thailand's AQI and the US AQI are different scales, and the same air produces different numbers on each.**",
      "Thailand revised its own index on 1 June 2023 to bring it closer to WHO guidance, lowering the PM2.5 threshold from 50 to 37.5 micrograms per cubic metre and the red alert level from 91 to 75.1. That was a genuine tightening. But the Thai index is still built from multiple pollutants, and as the US Embassy in Thailand states plainly, it does not directly correspond to the US EPA's AQI, which is PM2.5 only.",
      "The practical effect is that you can stand in one spot, open two apps, and see a comfortable-looking number on one and an alarming one on the other. Neither is lying. They are answering different questions.",
      "The fix is simple: pick one scale, learn what its numbers mean for your family, and stop switching between them. Most international apps, including the ones most expat families already have, report the US AQI. The US Embassy runs its own PM2.5 monitor in Bangkok at the Rama IV and Ratchadamri intersection, which is a useful second opinion on a given day.",
      "On the US scale the bands are 0 to 50 good, 51 to 100 moderate, 101 to 150 unhealthy for sensitive groups, 151 to 200 unhealthy for everyone, 201 to 300 very unhealthy, and above 300 hazardous.",
      "For a family the honest rule of thumb is that children count as a sensitive group. That means the band that matters to you is 101 to 150, not 151 and above. If you wait for the number that says unhealthy for everyone before changing plans, you have already spent several days above the line that was actually about your kids.",
      "Children are not small adults here, and the reasons are physiological rather than sentimental.",
      "They breathe faster than adults relative to their body size, so they take in proportionally more air and more of what is in it. Their lungs are still developing well into adolescence. They spend more time being physically active, which means breathing harder. And they are closer to the ground, where vehicle exhaust concentrates.",
      "The scale of exposure is not marginal. Reporting drawing on UNICEF data puts 13.6 million Thai children as regularly exposed to hazardous PM2.5 concentrations, and one analysis found Bangkok children exceeded WHO safety thresholds on 265 of 365 days in 2023, which is more than seven days in ten.",
      "The established effects are respiratory: more coughing, more asthma symptoms and diagnoses, more nosebleeds, more infections. Beyond that there is a growing body of research linking childhood exposure to effects on cognitive development and attention, though that work is younger and the picture is still filling in.",
      "The reasonable response is not alarm, it is action, because the protective measures are cheap relative to what they buy. A child with an existing respiratory vulnerability deserves a lower threshold for staying indoors than a child without one, and that is a conversation worth having with your paediatrician before the season rather than during it.",
      "Start with what does not work. A surgical mask, a cloth mask, or the black fabric masks sold at every BTS station do essentially nothing against particles this small. PM2.5 is fine enough to pass straight through a loose weave and around gaps.",
      "What works is a respirator-class mask: N95, KN95 or KF94. These are designed to filter at least 94 to 95 percent of fine particles, and they are widely available here and inexpensive.",
      "Now the part almost no article mentions. **On a child, the filtration rating matters far less than the fit.** A certified N95 that gapes at the cheeks or slides down a small nose performs worse than a cheaper mask that seals, because air takes the path of least resistance and that path is the gap, not the filter.",
      "Fit is a matter of face shape rather than age. Children's faces vary enormously at the same age, so buy by trying rather than by the number on the box, and expect to test two or three styles before one works. KF94 masks often suit smaller faces better than standard N95 shapes because of their folded three-dimensional construction.",
      "Test the seal at home. Have the child put the mask on and breathe out sharply: if you can feel air escaping around the nose or the sides, it is not sealing. Mask fitters, the elastic frames that go over a mask and pull it against the face, are cheap and can sharply cut leakage around a poor seal.",
      "Be realistic about what masks are for. They are for the walk to school, the wait on a platform, the taxi with the window down, and unavoidable time outdoors on a bad day. No child will wear one for eight hours, and they should not need to, because the answer for time at home is not a mask.",
      "If you buy one thing for smog season, buy a decent air purifier for wherever your children sleep. Bedrooms before living rooms, because that is where they spend eight to ten uninterrupted hours every night.",
      "Look for true HEPA filtration and ignore the marketing around ionisers, UV and plasma. Some of those technologies do very little and a few generate ozone, which is its own respiratory irritant. A plain HEPA filter and a decent fan is the whole product.",
      "The specification that matters is CADR, the Clean Air Delivery Rate, which tells you how much clean air the unit actually delivers rather than how well the filter performs in isolation. A high-grade filter in an underpowered machine cleans a small room slowly and a large room never.",
      "The standard sizing rule is to take the room's floor area in square feet and multiply by two thirds. That gives the minimum CADR for roughly five air changes an hour, which is the usual recommendation for allergy and asthma control.",
      "For smoke conditions, which is what Bangkok's season actually is, the guidance changes: **size the unit so its smoke CADR roughly equals the room's floor area in square feet**, giving around seven air changes an hour. The higher target exists because outdoor smoke keeps infiltrating, so you are not cleaning the room once, you are continuously outrunning what is coming in.",
      "In practice, for a bedroom of around 400 square feet, you want a smoke CADR somewhere around 250 to 400 rather than the 100 or so a cheap unit delivers. Two smaller units in the same room work perfectly well if that suits your budget, since CADR is additive.",
      "Run them continuously through the bad months rather than switching them on when the air looks bad, and keep the bedroom doors shut. A purifier fighting an open door and an open window is doing very little.",
      "Expect filters to need replacing considerably more often than the manufacturer's schedule suggests, because those schedules are written for cities with cleaner baseline air. Budget for it and keep a spare, because shops sell out during a bad spell.",
      "And be honest about the limit. None of this makes your home a clean room. A well-sized purifier in a closed bedroom will hold indoor levels far below outdoors, which is a real and worthwhile difference, but it is a reduction rather than an elimination.",
      "Schools vary enormously in how seriously they take this, and it is a fair thing to ask about directly, both before you enrol and during the season.",
      "The questions worth asking: do you monitor air quality on campus with your own equipment or rely on a city reading, which index do you use, at what threshold do activities move indoors or get cancelled, do classrooms have air purifiers and are they sized for the rooms, and is the policy written down where parents can read it.",
      "A school that answers those crisply has thought about it. A school that says it keeps an eye on things has not.",
      "This is not theoretical. In January 2025 the Bangkok Metropolitan Administration closed 194 of its 437 schools in a single day, the most since 2020, with PM2.5 reaching 122 micrograms per cubic metre against a WHO 24-hour guideline of 15. Across the wider crisis more than 350 schools closed. Most international schools stayed open with indoor policies and filtered classrooms, which is part of what you are paying for, but the disruption to sport, breaks and outdoor learning is real and it lasts weeks.",
      "So, the question I actually asked myself: is it worth leaving for the season?",
      "For most families, no, and I will be straightforward about why we did not. The disruption was what killed it. Moving a household twice a year is a serious undertaking on its own, but the part we never solved was school. Two or three months away means either pulling the children out or running online schooling from another country, and neither is a small thing to do to a child every single year.",
      "Set that against the cost of a rental abroad, the fact that it splits the family if one parent is working, and the plain reality that the measures above genuinely do work, and the sums stop being close. Two well-placed air purifiers cost a fraction of a few months somewhere else.",
      "There is a longer-run version of this question, though, and I should be honest about it because it is the one we ended up answering. We never left for the season. We eventually left Thailand. The air was not the only reason and it was not the biggest one, but it was on the list, and it was on the list because it stops feeling like two or three months when you are inside it year after year. It accumulates.",
      "For a small number of families it is worth considering seriously: a child with significant asthma or another respiratory condition that flares badly and predictably every season, where you have watched it happen more than once and the indoor measures were not enough. That is a medical conversation with a paediatrician who knows your child, not a decision to make from an article.",
      "There is also a middle option that costs far less and gets most of the benefit. Time your home leave, or any long trip, to land inside January and February rather than during the summer holidays when everyone else travels. Southern Thailand and the islands sit largely outside the burning belt and stay clear when Bangkok does not, so even a week or two out of the city during a bad spell is worth something. Splitting a few long weekends across the worst weeks is the realistic version of the plan I never carried out.",
      "In rough order of how much good they do per baht spent.",
      "Air purifiers in the bedrooms, sized properly by CADR rather than bought on price, running continuously through the season with the doors shut. This is the single biggest intervention and it is not close.",
      "Check one number every morning, on one scale, and let it set the day. Treat 101 and above as the line that concerns your children, not 151.",
      "On bad days move what you can indoors and accept it. Bangkok is unusually well equipped for this, with malls, indoor play centres, pools and climbing gyms, which is one of the few genuine consolations of the season.",
      "Keep properly fitting N95 or KF94 masks for unavoidable outdoor time, sized by trying them on rather than by age, and check the seal.",
      "And keep it in proportion, with one caveat. Two or three difficult months sit inside a year that is otherwise a genuinely good place to raise children, the trend is slowly improving, and the families who cope best are the ones who prepared in November rather than reacted in January. The caveat is the one above: seasons add up. It is worth asking yourself every year or two whether it still feels like a fair trade, rather than only ever asking in the middle of a bad February.",
    ],
    faq: [
      {
        question: "When is Bangkok's smog season?",
        answer: "Roughly December through April, with January and February usually the worst. The rest of the year, particularly the rainy season from about June to October, the air is unremarkable and often good. The seasonality is meteorological: in the cool season a layer of cold air traps pollution near the ground and the wind drops, so the same emissions that disperse in July accumulate in January. Crop stubble burning across the central plains adds the spikes that turn a bad week into a crisis week.",
      },
      {
        question: "Why do different apps show different air quality numbers for Bangkok?",
        answer: "Because Thailand's AQI and the US AQI are different scales. Thailand's index is built from multiple pollutants, while the US EPA's AQI used by most international apps is PM2.5 only, and the US Embassy in Thailand states plainly that the two do not directly correspond. Thailand tightened its own standard on 1 June 2023, lowering the PM2.5 threshold from 50 to 37.5 micrograms per cubic metre, but the scales still differ. Pick one and learn what its numbers mean rather than switching between them.",
      },
      {
        question: "What AQI level is unsafe for children in Bangkok?",
        answer: "On the US scale, treat 101 to 150, labelled unhealthy for sensitive groups, as the level that concerns your family, because children count as a sensitive group. Many parents wait for 151, unhealthy for everyone, and by then they have already spent days above the threshold that was actually about their kids. A child with an existing respiratory condition warrants a lower threshold still, which is worth agreeing with your paediatrician before the season starts.",
      },
      {
        question: "What kind of mask actually protects a child from PM2.5?",
        answer: "An N95, KN95 or KF94 respirator. Surgical masks, cloth masks and the black fabric masks sold around BTS stations do essentially nothing against particles this fine. The more important point is that on a child the fit matters more than the rating: a certified N95 that gapes at the cheeks performs worse than a cheaper mask that seals, because air takes the path of least resistance. Buy by trying rather than by age, since faces vary hugely at the same age, and test the seal by having them breathe out sharply to feel for escaping air.",
      },
      {
        question: "What size air purifier do I need for a Bangkok bedroom?",
        answer: "For smoke conditions, size it so the unit's smoke CADR roughly equals the room's floor area in square feet, which gives around seven air changes an hour. That is a higher target than the usual rule of floor area times two thirds, because outdoor smoke keeps infiltrating so you are continuously outrunning what comes in rather than cleaning the room once. For a 400 square foot bedroom that means a smoke CADR of roughly 250 to 400. Two smaller units in one room work fine, since CADR is additive. Look for true HEPA and ignore ioniser, UV and plasma marketing.",
      },
      {
        question: "Do Bangkok schools close because of air pollution?",
        answer: "Public schools do. In January 2025 the Bangkok Metropolitan Administration closed 194 of its 437 schools in one day, the most since 2020, with PM2.5 at 122 micrograms per cubic metre against a WHO 24-hour guideline of 15, and more than 350 schools closed across the wider crisis. Most international schools stay open with indoor policies and filtered classrooms, but outdoor sport, breaks and outdoor learning are disrupted for weeks. Ask your school which index it uses, at what threshold activities move indoors, and whether classrooms have properly sized purifiers.",
      },
      {
        question: "Should we leave Bangkok during the smog season?",
        answer: "For most families, no. It is expensive, it disrupts school badly, it often splits the family, and properly sized air purifiers in the bedrooms genuinely work for a fraction of the cost. It is worth considering seriously for a child with a significant respiratory condition that flares predictably every season despite indoor measures, and that is a conversation with a paediatrician who knows your child rather than a decision to make from an article. A cheaper middle path is to time home leave or long trips into January and February, and to take short breaks south, which sits largely outside the burning belt.",
      },
    ],
  },
  {
    slug: "having-a-baby-in-bangkok",
    title: "Having a Baby in Bangkok: What It Costs and What the Price Does Not Include",
    category: "Healthcare",
    date: "2026-09-14",
    metaDescription:
      "Published delivery package prices at Bangkok's private hospitals, from 48,900 to 230,000 baht, plus the exclusions that decide your actual bill, the insurance waiting period that catches most people, and the paperwork after the birth.",
    keywords: ["having a baby in Bangkok", "giving birth in Thailand", "Bangkok maternity package price", "delivery package Bangkok", "cost of giving birth in Thailand", "Bangkok hospital maternity", "expat pregnancy Bangkok", "maternity insurance Thailand", "birth registration Thailand", "best hospital to give birth Bangkok", "caesarean cost Bangkok", "prenatal care Bangkok"],
    excerpt:
      "We had a baby in Nonthaburi in 2012, and the whole thing from the second trimester to discharge after a caesarean came to about 80,000 baht. Here is what it costs now, with every published package price side by side, and the exclusions that actually decide your bill.",
    headings: [
      { beforeParagraph: 4, text: "What it actually costs" },
      { beforeParagraph: 11, text: "The exclusions are the real story" },
      { beforeParagraph: 18, text: "Prenatal care is usually a separate bill" },
      { beforeParagraph: 21, text: "Choosing a hospital" },
      { beforeParagraph: 27, text: "You are choosing a doctor, not just a building" },
      { beforeParagraph: 31, text: "Insurance, and the waiting period that catches everyone" },
      { beforeParagraph: 36, text: "Registering the birth" },
      { beforeParagraph: 41, text: "Your baby will need their own paperwork" },
      { beforeParagraph: 44, text: "The first weeks at home" },
      { beforeParagraph: 47, text: "What we would tell a friend" },
    ],
    relatedFacilities: [
      { name: "Samitivej Sukhumvit Hospital", slug: "samitivej-sukhumvit-hospital" },
      { name: "BNH Hospital", slug: "bnh-hospital" },
      { name: "MedPark Hospital", slug: "medpark-hospital" },
      { name: "Bangkok Hospital (Soi Soonvijai)", slug: "bangkok-hospital-headquarters" },
      { name: "Bumrungrad International Hospital", slug: "bumrungrad-international-hospital" },
      { name: "Samitivej International Children's Hospital", slug: "samitivej-international-childrens-hospital" },
      { name: "Vichaiyut Hospital", slug: "vichaiyut-hospital" },
      { name: "Nakornthon Hospital", slug: "nakornthon-hospital" },
      { name: "Nonthavej Hospital", slug: "nonthavej-hospital" },
    ],
    body: [
      "In 2012 we had a baby at [Nonthavej](/healthcare/hospitals/nonthavej-hospital), a private hospital in Nonthaburi just north of Bangkok. From the second trimester through to discharge after a caesarean, the whole thing came to somewhere around 80,000 baht.",
      "That number is not a like-for-like comparison with anything below, and it is worth saying why. It covered the prenatal care as well as the birth, where most of the packages in this article explicitly do not. It was fourteen years ago. And it was a Thai private hospital rather than one of the international names.",
      "But it points at something that is still true. At the top of the market today, a normal delivery package at [Bumrungrad](/healthcare/hospitals/bumrungrad-international-hospital) is 139,000 baht, which is roughly 5,000 US dollars. For that hospital, those facilities and those doctors, that is a remarkable figure by the standard of almost anywhere else in the world. Having a baby in Thailand is one of the genuine financial advantages of living here, and it is not close.",
      "The money is where it gets murky, though. Every hospital packages its pricing differently, some bury the figure in an image so it never shows up in a search, at least one will not publish a number at all, and the prices that are published cover only the birth that goes exactly to plan. So this guide does the part nobody else does: the real published prices next to each other, and then the exclusions, which are where your actual bill gets decided.",
      "Published delivery packages at Bangkok private hospitals currently run from about 48,900 baht at the cheapest end to 230,000 and beyond at the top. We keep the full list, updated with the date each figure was checked and a link to the hospital's own page, in the [hospital directory](/healthcare/hospitals).",
      "The mainstream band, where most expat families actually land, is roughly 110,000 to 155,000 baht for either a normal delivery or a caesarean at a well-known private hospital. [Samitivej Sukhumvit](/healthcare/hospitals/samitivej-sukhumvit-hospital) publishes 110,000 for a natural birth over three nights and 135,500 for a caesarean over four. [Bangkok Hospital](/healthcare/hospitals/bangkok-hospital-headquarters) publishes 110,400 and 151,800 for the equivalent. [MedPark](/healthcare/hospitals/medpark-hospital) publishes 118,690 and 133,900.",
      "Below that band the savings are real but conditional. [Nakornthon](/healthcare/hospitals/nakornthon-hospital) out on Rama II publishes a tiered structure starting at 48,900 for a normal delivery and 72,900 for a caesarean, roughly half the Sukhumvit price. [Vichaiyut](/healthcare/hospitals/vichaiyut-hospital) in Phaya Thai publishes a single childbirth programme at 63,800. Both are genuine options. Both come with conditions worth reading properly, which we get to below.",
      "At the top end, Samitivej's Exclusive packages reach 230,000 for a caesarean over six nights, and Bangkok Hospital's ELITE packages reach 288,000 over seven. It is worth being clear about what the extra money buys, because it is mostly nights and room, not better medicine. The clinical team is the same team.",
      "[Bumrungrad](/healthcare/hospitals/bumrungrad-international-hospital), the hospital most people have heard of, sits above the mainstream band: 139,000 baht for a normal delivery over two nights, 165,000 with an epidural block, 169,000 for a caesarean over three nights, and 249,000 for a twin caesarean. Those are published as valid to the end of 2026. Worth knowing that Bumrungrad puts its prices on the page as images rather than text, which is why a lot of comparison articles either skip it or quote figures that are years stale.",
      "[BNH](/healthcare/hospitals/bnh-hospital) is the one we know deliberately does not publish. It markets an all-inclusive maternity package and quotes on enquiry only, so you cannot compare it against anything without picking up the phone. If you are considering it, ask for a written quote early, and ask specifically what changes if you need a caesarean or the baby needs intensive care. Several smaller hospitals that deliver babies are also missing from the price table, and in those cases it is simply that we have not confirmed a published package yet rather than that none exists.",
      "One more thing on price before we move on: several hospitals restrict their published rates to Thai citizens and foreigners resident in Thailand. If you are considering flying in to give birth, the number on the website may not be the number you are offered.",
      "Here is the part that matters more than the headline figure. A delivery package is priced for a birth that goes to plan. Almost every line item that makes a bill unexpectedly large sits outside it.",
      "The clearest example is jaundice. MedPark's package explicitly excludes phototherapy for jaundice and any treatment of newborn complications. Newborn jaundice is common, it often needs a day or two under lights, and it is exactly the sort of ordinary complication that a first-time parent does not think to budget for.",
      "Bumrungrad's packages contain the most precisely worded version of this, and it is worth reading twice. If a complication affects the baby but not the mother, 15,000 baht is deducted from the package price and every charge for the baby and the paediatrician reverts to standard rates. In other words the package quietly stops applying to the person it was mostly about, and the refund is a rounding error against what neonatal care actually costs.",
      "Nakornthon's low prices carry two conditions people miss. An elective caesarean scheduled between 10pm and 7:59am adds 7,000 baht. A maternal BMI above 35 falls outside the package entirely.",
      "Vichaiyut's 63,800 figure is for the delivery only. Prenatal care is excluded, as are take-home medication and supplies. The package also covers a single uncomplicated baby, and if something like pre-eclampsia or insulin-dependent gestational diabetes develops, you revert to standard rates with a 10 percent discount rather than staying inside the package. That is not a criticism of the hospital, it is simply a different product from an all-inclusive package, and comparing the two numbers directly will mislead you.",
      "Samitivej does not schedule elective surgery between 9pm and 7am, which is worth knowing if you are planning a caesarean date.",
      "So when you call a hospital, these are the five questions that actually determine your bill. What happens to the price if a normal delivery becomes a caesarean. What happens if we stay longer than the package nights. Is newborn jaundice treatment included. What is and is not covered if the baby needs the NICU. And is prenatal care inside this price or separate.",
      "Most delivery packages cover the birth and the stay, not the nine months leading up to it. Prenatal care is usually billed separately, either visit by visit or as its own package, and it is a meaningful cost in its own right.",
      "A typical schedule runs monthly to around 28 weeks, then fortnightly, then weekly in the final month, with scans and blood work along the way. At a private hospital in Bangkok, budget for this as a second line in your planning rather than an afterthought.",
      "Some hospitals sell a prenatal package that bundles the visits at a discount against paying each time. If you know where you intend to deliver, and you are confident you will not move house or change your mind, that bundle is usually worth it. If you are not sure yet, pay per visit and keep the flexibility.",
      "For a straightforward pregnancy, the honest answer is that any of the private hospitals in our directory will deliver your baby safely. That is not a hedge, it is the actual situation, and it means the decision comes down to variables that are more personal than clinical.",
      "The first is the obstetrician, which we come to next, and which for most families ends up mattering more than the building.",
      "The second is distance, and in Bangkok that means traffic. A hospital that is twenty minutes away on a Sunday morning can be an hour on a weekday evening. Think about the journey at the worst realistic time, not the best, and think about who is driving.",
      "The third is money, and the spread above is wide enough that it is a legitimate deciding factor. Choosing a 63,800 baht birth over a 135,500 baht one is not choosing worse care, it is choosing a different hospital with a different location and a different level of English-language hand-holding.",
      "Where it stops being a matter of preference is if the pregnancy is high risk, if you are expecting twins, or if there is any indication the baby may need intensive care. Then the question becomes what level of neonatal care the hospital can provide without transferring you, and you should ask it directly and plainly. Bangkok Hospital runs combined paediatric and neonatal intensive care around the clock. Samitivej's [children's hospital](/healthcare/hospitals/samitivej-international-childrens-hospital) at the Srinakarin campus, which opened in 2025, has private NICU and PICU rooms and is the most capable private paediatric facility in the city, though it is a long way east of the usual expat neighbourhoods.",
      "Ask one more question that people forget: if the baby needs intensive care and the mother does not, will they be in the same building. The answer is usually yes at a large hospital and sometimes no at a small one.",
      "Most families who have given birth here will tell you the same thing, which is that they chose a doctor and the hospital came with them. The relationship runs nine months and ends with somebody you trust in the room at the hardest moment of it, so it is worth more effort than choosing a building with a nicer lobby.",
      "Ask other parents, and ask specifically rather than generally. A recommendation is much more useful when it comes with a reason attached, whether that is patience with questions, a straight answer about caesarean rates, or simply a manner that suits you.",
      "Then ask the doctor two questions directly. What is your approach to caesarean, and under what circumstances would you recommend one. And who delivers my baby if you are away when I go into labour. The second question is the one people skip and then regret, because the answer at some hospitals is whoever is on duty.",
      "[BNH](/healthcare/hospitals/bnh-hospital) builds its maternity service around continuity, the same obstetrician through the pregnancy and at the birth, which is a large part of why it keeps its reputation among expat families despite being smaller than its competitors.",
      "Now the thing that catches more people than anything else in this guide. **Maternity coverage almost always carries a waiting period of around ten months, and sometimes considerably longer.** That means a policy bought after you conceive will not pay for the birth.",
      "This is not fine print buried in one insurer's terms, it is how maternity cover works across the market. If having a baby in Thailand is something you might do in the next couple of years, the time to sort insurance is before you are pregnant, not after. If you are already pregnant and uninsured for maternity, plan to pay for the birth yourself and budget from the published packages above.",
      "Be straight on the application about anything pre-existing. Insurers assess these case by case, and leaving something out can void the policy from inception, which is a far worse outcome than a loading on the premium.",
      "Check whether your policy settles directly with the hospital or whether you pay and claim back. The big international hospitals settle directly with most international insurers through their international patient desks. Mid-market Thai private hospitals work with a shorter panel. Confirm your specific policy with the hospital before admission rather than discovering the answer on the day.",
      "One point specific to families with school-age children: the insurance your international school requires or offers is usually a thin policy, often covering the child only while on school premises. It is a supplement to proper family cover, not a substitute for it, and it will do nothing at all for a birth.",
      "The baby arrives and the paperwork starts. The good news is the Thai side is straightforward and the hospital does most of the work for you.",
      "A birth in Thailand must be registered within 30 days at a district office, the amphur. Offices generally run Monday to Friday, roughly 8:30am to 4pm, and it is worth arriving when they open.",
      "Take the documentation the hospital gives you, both parents' passports or ID cards, and your marriage certificate if you have one. The forms are provided at the office. Expect to wait while everything is checked, and expect the process to be conducted in Thai.",
      "The certificate you receive is in Thai. For almost anything you will do with it outside Thailand, including your own embassy, you will need a certified translation and often legalisation as well. Getting that done while you are still thinking about paperwork is easier than getting it done in a hurry two years later.",
      "Then register the birth with your own embassy, which is what establishes your child's citizenship and gets them a passport. Requirements and fees vary widely by country, so check your embassy's own page rather than relying on what another family did.",
      "The step people forget entirely: being born in Thailand does not by itself make your child Thai, and it does not give them permission to stay.",
      "Once they have a passport, your child needs their own immigration status, normally a visa or extension tied to yours. It is usually routine, but it is a separate process with its own timing, and it does not happen automatically because they were born here.",
      "Start it earlier than feels necessary. Immigration paperwork in Thailand rewards people who leave themselves margin.",
      "Bangkok is an unusually good place to have a newborn, and the reason is help. Household help and childcare are affordable and widely available in a way they are not in most of the countries expat parents come from, and the first weeks are much gentler for it.",
      "Some families arrange a confinement nanny for the first month, some hire a regular nanny, some simply keep the help they already have and add hours. If you are working out what that looks like, we wrote a [guide to finding a nanny in Bangkok](/blog/how-to-find-a-nanny-in-bangkok) based on our own years of doing exactly that.",
      "Most delivery packages include some lactation support, and it is worth using rather than politely declining. It is one of the more useful things included in the price.",
      "Get the insurance sorted before you conceive, because the waiting period is the single most expensive mistake available in this entire process.",
      "Choose the obstetrician first and let the hospital follow, then sanity check that the hospital's neonatal capability matches your pregnancy's risk.",
      "Ask the five exclusion questions in writing, and keep the reply. The gap between the advertised package and the final bill is almost entirely made of things on that list.",
      "And do not assume that the most expensive option is the best one for you. The care at the top of the market and the care in the middle of it is delivered by similarly qualified people. What the extra hundred thousand baht reliably buys is a longer stay, a nicer room, and more people who will speak to you in English, which for some families in their first year here is genuinely worth it, and for others is not.",
    ],
    faq: [
      {
        question: "How much does it cost to have a baby in Bangkok?",
        answer: "Published packages at private hospitals run from about 48,900 baht at the cheapest end to 230,000 or more for premium packages at the international hospitals. Most expat families land between 110,000 and 155,000 baht for a normal delivery or a caesarean at a well-known private hospital. Those figures are for an uncomplicated birth, and prenatal care is usually billed separately. Our [hospital directory](/healthcare/hospitals) lists the current published prices side by side with the date each was checked.",
      },
      {
        question: "Does health insurance cover giving birth in Thailand?",
        answer: "Only if you bought maternity cover well before conceiving. Maternity is typically an add-on with a waiting period of around ten months, and sometimes longer, so a policy taken out after a positive test will not pay for the birth. This is standard across the market rather than one insurer's quirk. If you are already pregnant without maternity cover, plan to pay for the birth yourself.",
      },
      {
        question: "What is not included in a Bangkok maternity package?",
        answer: "Typically: anything arising from complications for mother or baby, stays longer than the package nights, and take-home medication and supplies. Specific exclusions vary and matter more than the headline price. MedPark excludes phototherapy for newborn jaundice, which is a common condition. Nakornthon adds 7,000 baht for an elective caesarean booked between 10pm and 7:59am and excludes a maternal BMI above 35. Vichaiyut excludes prenatal care entirely. Ask each hospital in writing what happens if a normal delivery becomes a caesarean and what is covered if the baby needs the NICU.",
      },
      {
        question: "Which Bangkok hospital is best for giving birth?",
        answer: "For a straightforward pregnancy, any of the private hospitals in our directory will deliver your baby safely, so the decision usually comes down to the obstetrician you trust, how far you are willing to travel in labour, and what you want to pay. It stops being a matter of preference if the pregnancy is high risk, you are expecting twins, or the baby may need intensive care, in which case ask directly what level of neonatal care the hospital can provide without transferring you.",
      },
      {
        question: "How do I register my baby's birth in Thailand?",
        answer: "Within 30 days at a district office, the amphur, which generally opens Monday to Friday from around 8:30am to 4pm. Bring the documentation from the hospital, both parents' passports or ID cards, and your marriage certificate if you have one. The certificate is issued in Thai, so arrange a certified translation and, for most purposes abroad, legalisation. Then register the birth with your own embassy, which is what establishes your child's citizenship and passport.",
      },
      {
        question: "Does a baby born in Thailand get Thai citizenship?",
        answer: "Not automatically for a child of two foreign parents. Being born here also does not give your child permission to stay. Once they have a passport from your own country, they will need their own immigration status, normally a visa or extension tied to yours. It is usually routine but it is a separate process with its own timing, so start it earlier than feels necessary and check current requirements with immigration or a reputable visa agent rather than relying on what another family did.",
      },
      {
        question: "Do Bangkok hospitals let partners stay overnight?",
        answer: "At the major private hospitals, generally yes, and the maternity rooms are usually designed with that in mind. It is worth confirming with the specific hospital and room type when you book rather than assuming, since it can depend on which room grade your package includes.",
      },
    ],
  },
  {
    slug: "pharmacies-in-thailand-guide",
    title: "How Pharmacies Work in Thailand, and What You Cannot Bring Into the Country",
    category: "Healthcare",
    date: "2026-09-14",
    metaDescription:
      "Thai pharmacies sell far more over the counter than you are used to, but the rules on bringing your own medication in are stricter than most families realise. What is available, what needs a prescription, and the ADHD medication rule that catches expat families.",
    keywords: ["pharmacy Thailand", "Thai pharmacy over the counter", "bringing medication to Thailand", "Thailand medication import rules", "antibiotics Thailand pharmacy", "prescription drugs Thailand", "ADHD medication Thailand", "Adderall Thailand", "methylphenidate Thailand", "Boots Watsons Bangkok", "Thai FDA medication permit", "expat medication Bangkok"],
    excerpt:
      "Thai pharmacies sell a great deal over the counter that you would need a prescription for at home, which is convenient right up until it is not. And the rules on bringing your own medication into the country are stricter than most arriving families realise.",
    headings: [
      { beforeParagraph: 2, text: "The green cross on every corner" },
      { beforeParagraph: 6, text: "What you can buy without a prescription" },
      { beforeParagraph: 9, text: "The antibiotics question" },
      { beforeParagraph: 12, text: "Bringing your own medication in" },
      { beforeParagraph: 16, text: "The ADHD medication problem" },
      { beforeParagraph: 20, text: "When to skip the pharmacy" },
    ],
    relatedFacilities: [
      { name: "Bumrungrad International Hospital", slug: "bumrungrad-international-hospital" },
      { name: "Samitivej Sukhumvit Hospital", slug: "samitivej-sukhumvit-hospital" },
      { name: "Camillian Hospital", slug: "camillian-hospital" },
    ],
    body: [
      "Two things about medication in Thailand surprise almost every family that moves here, and they pull in opposite directions.",
      "The first is how much you can simply walk in and buy. The second is how strict the rules are about bringing your own supply into the country, which is the one that occasionally ruins somebody's arrival.",
      "Pharmacies here are everywhere, marked by a green cross, and they fall into two rough camps.",
      "The chains, Boots and Watsons most visibly, sit in every mall and on most busy corners. Staff in central Bangkok generally speak English, the stock is predictable, the shops are air conditioned and open into the evening. You pay for all of that, but not much.",
      "The independents are the small shops with a pharmacist behind a counter and stock to the ceiling. They are considerably cheaper, sometimes dramatically so for the same product, and the pharmacist is often more willing to actually advise you. English varies. For a family settling in, it is worth finding the good independent near your condo and also knowing where the nearest chain is for the evening you need something at 9pm.",
      "Hospital pharmacies are the expensive option by a wide margin. If you have a hospital prescription and no urgency, it is usually worth taking it to a pharmacy instead, though controlled items will have to stay with the hospital.",
      "A great deal is available over the counter that you would need to see a doctor for at home. Painkillers, antihistamines, cold and flu remedies, stomach and rehydration treatments, skin preparations, and contraceptive pills are all straightforward to buy.",
      "Prices are generally a fraction of Western equivalents, particularly for local generics, which are the same molecules made under Thai licence. If cost matters, ask the pharmacist for the Thai generic rather than the international brand and expect to pay considerably less.",
      "For minor illness, the pharmacist is a genuinely useful first stop rather than a fallback. A Thai pharmacist will happily look at a rash, listen to a description of a child's symptoms, and either sell you something sensible or tell you to go to a hospital. Using them this way will save you a great many unnecessary hospital visits in your first year.",
      "Antibiotics need their own paragraph, because the situation here is different from what most families are used to and it is easy to misread it as a convenience.",
      "In practice, antibiotics are widely sold in Thai pharmacies without a prescription, and amoxicillin in particular is cheap and easy to obtain. That is the reality on the ground rather than a recommendation.",
      "The reason to be careful is not legal risk to you, it is that self-prescribing antibiotics is how you end up treating a viral infection with a drug that cannot touch it, giving a child the wrong dose or the wrong duration, and contributing to a resistance problem that Thailand takes seriously. Most childhood fevers and coughs are viral and antibiotics do nothing for them. If you think your child needs an antibiotic, that judgement is worth a doctor rather than a counter conversation, and a consultation at a good local private hospital is not expensive.",
      "Now the direction that catches people out. Thailand regulates what you may bring in far more tightly than it regulates what you may buy once here, and the limits are based on the category the drug falls into rather than on whether you have a prescription.",
      "Broadly, ordinary prescription medication for personal use is limited to about a 30 day supply. Psychotropic substances are also capped at 30 days without a permit, and up to 90 days with a Thai FDA permit arranged in advance. Drugs classed as narcotics require a permit regardless of quantity.",
      "Where a permit is needed, the Thai FDA runs an online application, and the guidance is to apply at least 15 days before travel. You will generally need a doctor's certificate giving the patient's details, the diagnosis, the medication by both generic and brand name, the dosage and quantity, and the prescriber's licence number, along with your passport and travel details. Carry the certificate **printed and signed**, because a prescription on a phone screen is not what customs is looking for.",
      "Keep everything in its original labelled packaging. A month of loose tablets in a pill organiser with no box and no paperwork is the version of this that causes problems.",
      "This deserves its own section because it affects a lot of international school families and the answer is genuinely surprising.",
      "Methylphenidate, the active ingredient in Ritalin and Concerta, is a category 2 psychotropic substance in Thailand. It can be brought in for personal use in limited quantity, but only with a proper physician's certificate covering the patient, the diagnosis, the medication by both names, the dosage and the prescriber's licence number, printed and signed.",
      "Amphetamine-based medications are a different matter entirely. Adderall, dextroamphetamine and lisdexamfetamine fall under Thailand's category 1 narcotics, and importing them for personal use is not permitted under any circumstances. The penalties attached to that category are severe and are not softened by having a prescription from home.",
      "If your child is treated with an amphetamine-based medication, this is something to resolve deliberately with your prescribing doctor and a Thai paediatrician well before you move, not something to discover at the airport. The Thai FDA maintains an official checker for traveller medication permits, and your own embassy will usually confirm the current position. Rules in this area do change, so verify rather than relying on this article or on a forum thread.",
      "A pharmacy is the right first stop for minor, familiar things. It is the wrong stop for a few situations that are worth naming plainly.",
      "Go to a hospital instead for a fever in an infant, a fever that has lasted more than a couple of days in an older child, breathing difficulty, dehydration, a child who is unusually drowsy or unresponsive, any significant injury, and anything you are simply worried about and cannot explain. Private paediatric consultations in Bangkok are affordable enough that waiting it out to save money is a false economy.",
      "Our [hospital directory](/healthcare/hospitals) lists which places have a paediatric service and which have a children's emergency department staffed by paediatricians rather than a general emergency department that also sees children. It is worth knowing the difference before the night you need it.",
      "And keep a small home kit: paracetamol in a children's formulation, oral rehydration salts, a thermometer, antiseptic and plasters, and any regular medication with a comfortable buffer. Most of what a family needs at 11pm is not a pharmacy trip, it is a cupboard that was stocked in advance.",
    ],
    faq: [
      {
        question: "Can you buy antibiotics without a prescription in Thailand?",
        answer: "In practice antibiotics are widely sold over the counter in Thai pharmacies, and amoxicillin in particular is cheap and easy to obtain. That is a description of what happens rather than a recommendation. Most childhood fevers and coughs are viral, antibiotics do nothing for them, and getting the drug, dose or duration wrong causes real harm. If you think your child needs an antibiotic, see a doctor. A private paediatric consultation in Bangkok is not expensive.",
      },
      {
        question: "How much medication can I bring into Thailand?",
        answer: "Ordinary prescription medication for personal use is generally limited to around a 30 day supply. Psychotropic substances are capped at 30 days without a permit and up to 90 days with a Thai FDA permit arranged in advance, and narcotics require a permit regardless of quantity. Where a permit is needed, apply at least 15 days before travel, and carry a printed, signed doctor's certificate with the diagnosis, the medication by generic and brand name, the dosage and the prescriber's licence number. Keep everything in its original labelled packaging.",
      },
      {
        question: "Can I bring my child's ADHD medication to Thailand?",
        answer: "It depends entirely on which medication. Methylphenidate, the active ingredient in Ritalin and Concerta, is a category 2 psychotropic and can be brought in for personal use in limited quantity with a printed, signed physician's certificate. Amphetamine-based medications including Adderall, dextroamphetamine and lisdexamfetamine fall under Thailand's category 1 narcotics and cannot be imported for personal use at all, with severe penalties attached. If your child takes an amphetamine-based medication, sort this out with your prescriber and a Thai paediatrician before you move, and verify the current position with the Thai FDA or your embassy.",
      },
      {
        question: "Are Thai pharmacies cheaper than pharmacies at home?",
        answer: "Usually by a wide margin, especially for local generics, which are the same molecules manufactured under Thai licence. Independent pharmacies are cheaper than the Boots and Watsons chains, sometimes substantially, for identical products. Hospital pharmacies are the most expensive option, so if you have a hospital prescription and no urgency it is usually worth filling it elsewhere, though controlled items will have to stay with the hospital.",
      },
      {
        question: "Can I ask a Thai pharmacist for advice?",
        answer: "Yes, and you should. Thai pharmacists will look at a rash, listen to a description of symptoms and either recommend something sensible or tell you to go to a hospital. For minor illness they are a genuinely useful first stop rather than a fallback, and using them that way will save you a lot of unnecessary hospital visits. English is reliable at the chains in central Bangkok and varies at independents.",
      },
    ],
  },
  {
    slug: "health-insurance-expat-families-bangkok",
    title: "Health Insurance for Expat Families in Bangkok: What to Get and What to Check",
    category: "Healthcare",
    date: "2026-09-14",
    metaDescription:
      "Local versus international policies, what your international school's insurance actually covers, the maternity waiting period that catches everyone, and why disclosing pre-existing conditions matters more than the premium.",
    keywords: ["expat health insurance Thailand", "health insurance Bangkok family", "international school insurance Thailand", "maternity insurance Thailand waiting period", "direct billing hospital Thailand", "local vs international health insurance Thailand", "pre-existing conditions insurance Thailand", "family health insurance Bangkok cost"],
    excerpt:
      "The policy you buy in your first month here is one you will live with for years, and two of its most important features are ones nobody points out at the time: the maternity waiting period, and what happens to it when you leave.",
    headings: [
      { beforeParagraph: 2, text: "Local or international" },
      { beforeParagraph: 7, text: "What your school's insurance actually does" },
      { beforeParagraph: 10, text: "The maternity waiting period" },
      { beforeParagraph: 13, text: "Tell them about pre-existing conditions" },
      { beforeParagraph: 16, text: "Direct billing is worth more than it sounds" },
      { beforeParagraph: 19, text: "What to check before you sign" },
    ],
    relatedFacilities: [
      { name: "Bumrungrad International Hospital", slug: "bumrungrad-international-hospital" },
      { name: "Samitivej Sukhumvit Hospital", slug: "samitivej-sukhumvit-hospital" },
      { name: "BNH Hospital", slug: "bnh-hospital" },
      { name: "Praram 9 Hospital", slug: "praram-9-hospital" },
    ],
    body: [
      "Health insurance is the least interesting thing on a relocation checklist and one of the most consequential. The policy you sign in your first month here is one you will probably keep for years, and by the time its limitations matter it is usually too late to change them.",
      "This is not advice on which insurer to use, and we take no commission from any of them. It is the set of things worth understanding before you choose.",
      "The first real decision is between a local Thai policy and an international one, and they are genuinely different products rather than different prices for the same thing.",
      "Local policies are cheaper, sometimes much cheaper. They typically settle directly with most Thai hospitals, which is convenient. Their structure tends to cap individual benefits, a limit per night for a room, a limit per surgery, sometimes a limit per condition, rather than giving you one large annual ceiling. And they generally cannot follow you out of Thailand.",
      "International policies cost considerably more and buy a much higher annual limit, broader cover for serious illness, worldwide or near-worldwide validity, and in many cases a guarantee of lifetime renewal if you take the policy out before a cutoff age. If you move countries again, which expat families frequently do, the policy moves with you and your medical history stays continuous.",
      "The rough rule that holds up: if Thailand is a posting of a few years and you may well move on, an international policy is usually worth the difference. If you are settled here with no plans to leave and the budget is tight, a good local policy covering a defined hospital network is a reasonable choice.",
      "Whichever you choose, check the hospital network against where you would actually go. A cheap policy that excludes the hospital ten minutes from your condo is not cheap.",
      "Most international schools in Bangkok require students to have health insurance, and many either include a policy in the fees or offer one as a group option. It is easy to read that as the box being ticked.",
      "It usually is not. School policies are typically thin. Cover is often limited to incidents on school premises or during school activities, the limits are low, and they frequently fail to cover a full hospital bill for anything serious.",
      "Treat the school policy as a supplement to proper family cover, not a replacement for it. Read what it actually covers, specifically whether it extends beyond school grounds, whether it covers outpatient care or only inpatient, and what the limits are. Boarding students are a different case and normally need full private cover regardless of nationality.",
      "If there is one thing in this article to act on, it is this. **Maternity cover is almost always an add-on with a waiting period of around ten months, and sometimes considerably longer.**",
      "That means a policy bought after conception will not pay for the birth. This is standard across the market rather than one insurer being difficult, and it catches a remarkable number of families, because insurance tends to get sorted in the first chaotic month of a move and maternity feels like a problem for later.",
      "If having a baby in Thailand is even a possibility in the next couple of years, sort maternity cover before you conceive. If you are already pregnant without it, you will be paying for the birth yourself, and our guide to [having a baby in Bangkok](/blog/having-a-baby-in-bangkok) lists the published hospital package prices so you can budget properly.",
      "Insurers here assess pre-existing conditions individually rather than refusing outright, and the outcome is often a loading on the premium or an exclusion for that specific condition.",
      "The temptation is to leave something off the form, particularly something minor or historic. Do not. A non-disclosure discovered later can void the policy from inception, which means not just declining that claim but unwinding the entire contract, potentially years in.",
      "The worst version of this is discovering it during a serious illness, when the policy you have been paying for turns out never to have existed. A premium loading is a far better outcome than that.",
      "Direct billing means the hospital settles with your insurer and you walk out having signed a form, rather than paying a five figure bill and reclaiming it over the following weeks.",
      "The big international hospitals settle directly with most international insurers through their international patient desks. Mid-market Thai private hospitals work with a shorter panel. Small clinics generally do not, so expect to pay and claim.",
      "Confirm your specific policy with your specific hospital before you need it, not on the day. Insurer names on a hospital's list do not always mean every product from that insurer, and an admissions desk at 2am is a bad place to find out.",
      "Before you sign, get clear answers on the annual limit and whether the structure is one overall ceiling or a set of per-item caps.",
      "Check whether outpatient care is included or whether the policy is inpatient only, which matters enormously for families, since children generate far more outpatient visits than hospital admissions.",
      "Check the hospital network, the direct billing arrangements, the maternity waiting period even if maternity is not on your mind, and what happens to the policy if you leave Thailand or if you want to keep it into older age.",
      "And check whether cover renews for life or whether the insurer can decline to renew you after a claim, which is the difference between insurance and a year of good luck.",
    ],
    faq: [
      {
        question: "Do international schools in Bangkok require health insurance?",
        answer: "Most require it for foreign passport holders, and boarding students normally need full private medical insurance regardless of nationality. Many schools include a policy in the fees or offer a group option, but the cover is usually thin, often limited to incidents on school premises, with low limits that frequently fail to cover a full hospital bill. Treat it as a supplement to proper family cover rather than a replacement.",
      },
      {
        question: "Is local or international health insurance better in Thailand?",
        answer: "They are different products. Local policies are cheaper, settle directly with most Thai hospitals, tend to cap individual benefits rather than offering one large annual limit, and cannot follow you out of Thailand. International policies cost more and buy higher limits, broader serious-illness cover, worldwide validity and often a lifetime renewal guarantee. If Thailand is a posting of a few years, international usually justifies the difference. If you are settled here on a tight budget, a good local policy covering a network you would actually use is reasonable.",
      },
      {
        question: "Does health insurance in Thailand cover pregnancy?",
        answer: "Only as an add-on, and almost always with a waiting period of around ten months or longer, so a policy bought after you conceive will not pay for the birth. This is standard across the market. If having a baby in Thailand is a possibility in the next couple of years, arrange maternity cover before conceiving rather than after.",
      },
      {
        question: "Should I declare pre-existing conditions?",
        answer: "Yes, always. Insurers in Thailand assess them case by case and the usual outcome is a premium loading or an exclusion for that condition. Leaving something off the form can void the policy from inception, which unwinds the whole contract rather than just declining one claim, and it tends to surface during a serious illness. A loading is a much better outcome than a policy that turns out never to have existed.",
      },
      {
        question: "What is direct billing and does my hospital do it?",
        answer: "Direct billing means the hospital settles with your insurer and you sign rather than paying up front and reclaiming. The large international hospitals settle directly with most international insurers through their international patient desks, mid-market Thai private hospitals work with a shorter panel, and small clinics usually do not. Confirm your specific policy with your specific hospital in advance, because an insurer appearing on a hospital's list does not always mean every product from that insurer is covered.",
      },
    ],
  },
  {
    slug: "heatstroke-thailand-hot-season",
    title: "Heat and Kids in Thailand: The Hot Season, the Warning Levels, and What to Watch For",
    category: "Healthcare",
    date: "2026-09-14",
    metaDescription:
      "Thailand's heat index passed 51°C in Bangkok in 2026. The official Thai warning bands, what they mean for children, how to recognise heat exhaustion turning into heatstroke, and when to call 1669.",
    keywords: ["heatstroke Thailand", "Thailand hot season", "Bangkok heat index", "heat exhaustion children", "Thai summer heat kids", "avoiding heatstroke Thailand", "Bangkok hot season months", "heat safety children Thailand", "1669 emergency Thailand"],
    excerpt:
      "Thailand's hot season is not just uncomfortable, it is a measurable health risk, and the authorities publish warning bands most foreigners have never seen. Here is what the numbers mean and what they mean for children specifically.",
    headings: [
      { beforeParagraph: 2, text: "When the hot season actually is" },
      { beforeParagraph: 5, text: "The warning bands nobody tells you about" },
      { beforeParagraph: 10, text: "Why children are affected differently" },
      { beforeParagraph: 13, text: "Heat exhaustion, and the line it crosses" },
      { beforeParagraph: 18, text: "What to do, in order" },
      { beforeParagraph: 22, text: "School sport and the daily routine" },
    ],
    relatedFacilities: [
      { name: "Samitivej International Children's Hospital", slug: "samitivej-international-childrens-hospital" },
      { name: "Bumrungrad International Hospital", slug: "bumrungrad-international-hospital" },
      { name: "Queen Sirikit National Institute of Child Health", slug: "queen-sirikit-national-institute-of-child-health" },
    ],
    body: [
      "Most guides to the Thai hot season tell you to drink water and stay in the shade, which is true and not very useful.",
      "What is more useful is knowing that Thai authorities publish a heat index with defined warning bands, that Bangkok has spent long stretches of recent years inside the dangerous one, and that the advice attached to each band is specific. Once you can read the number, the decisions get easier.",
      "Thailand's hot season runs roughly from March through May, peaking in April. Songkran in mid-April lands almost exactly at the hottest point of the year, which is not a coincidence.",
      "It is worth being clear that this is not simply the warm end of a temperate summer. In 2026 Thai authorities warned that the national heat index could exceed 52°C, and Bangkok recorded a heat index of 51.9°C in late June, having already spent 18 consecutive days in the danger zone earlier in the year.",
      "The heat index matters more than the air temperature because it combines heat with humidity, and humidity is what stops sweat evaporating. In Bangkok, a 36°C day can carry a heat index well above 45°C, which is why the thermometer reading on your phone consistently understates how dangerous the afternoon actually is.",
      "Thai authorities use four bands, and they are worth knowing because the official advice attached to each is concrete.",
      "**Watch, 27 to 32.9°C.** Monitor heat alerts. Ordinary precautions.",
      "**Warning, 33 to 41.9°C.** Reduce outdoor activity between 11am and 3pm.",
      "**Danger, 42 to 51.9°C.** Monitor yourself and your children for symptoms actively. This is the band Bangkok sits in for much of the hot season.",
      "**Very dangerous, 52°C and above.** Avoid outdoor activity altogether.",
      "Thai health authorities name young children among the groups needing particular attention during heat warnings, alongside the elderly, pregnant women, outdoor workers and people with existing health conditions. There are physiological reasons for that.",
      "Children have a larger surface area relative to their body mass, so they absorb heat faster. They sweat less efficiently than adults. They take longer to acclimatise to a hot climate, which matters particularly for a family that has just arrived from somewhere cold. And crucially, young children do not reliably notice or report that they are overheating. They will keep playing.",
      "That last point is the one to internalise. With an adult you can generally rely on them to stop. With a six year old on a playground in April, the adult is the thermostat.",
      "Heat illness is a progression rather than an event, and the useful skill is recognising the earlier stage, because that is the one you can fix yourself.",
      "Heat exhaustion looks like heavy sweating, cool clammy skin, tiredness, dizziness, headache, nausea, muscle cramps, and a child who has gone quiet and floppy when they were fine twenty minutes ago. Irritability and unusual clinginess count too. This stage responds well to getting out of the heat, cooling down and drinking.",
      "Heatstroke is a medical emergency and it is different in character, not just degree. The distinguishing features are a very high body temperature, skin that may have gone hot and dry because sweating has stopped, confusion, slurred or strange speech, unsteadiness, vomiting, seizures, or loss of consciousness.",
      "The single most important distinction to hold onto: **if a child who has been in the heat becomes confused, stops making sense, or stops sweating, that is not tiredness. Call 1669.**",
      "Do not spend time deciding whether it qualifies. Heatstroke damages organs quickly and the cost of an unnecessary call is nothing.",
      "For heat exhaustion, move the child out of the sun and into air conditioning or genuine shade. Remove excess clothing.",
      "Cool them actively: cool water on the skin, a damp cloth at the neck, armpits and groin, a fan moving air across them. Cool rather than ice cold, since very cold water on a hot child can cause shivering that works against you.",
      "Give fluids if they are alert and able to drink. Water is fine, and oral rehydration salts are better if you have them, which is a good argument for keeping sachets in the cupboard through the hot season. Do not give fluids to a child who is drowsy, confused or vomiting.",
      "If they do not improve within a short time, or if any of the heatstroke signs appear, call **1669**, Thailand's national emergency medical number. It is free, works from any phone, and English-speaking dispatch is usually available. If your family already uses a particular hospital, its own ambulance line is worth saving too, because a private ambulance will take you to that hospital rather than the nearest one.",
      "International schools in Bangkok generally have hot-weather policies that move or cancel outdoor sport, and most handle this sensibly. It is still a reasonable question to ask, particularly if your child plays a sport that trains outdoors in the afternoon.",
      "Ask what measurement the school actually uses and at what threshold activity changes. A school working from the heat index rather than the air temperature is using the better number.",
      "For daily life, the practical shape of the hot season is that outdoor time moves to early morning and after about 5pm, and the middle of the day belongs indoors. That is why Bangkok's malls, indoor play centres and pools are as busy as they are in April, and leaning into that rather than fighting it makes the season much more pleasant.",
      "Two habits worth building. Send children out with water rather than assuming they will find some, because they will not. And watch the first few weeks after arriving from a cold country particularly closely, since acclimatisation takes time and a newly arrived child is more vulnerable than one who has been here a year.",
    ],
    faq: [
      {
        question: "When is the hot season in Thailand?",
        answer: "Roughly March through May, peaking in April. Songkran in mid-April falls almost exactly at the hottest point of the year. Heat can extend well beyond that window: Bangkok recorded a heat index of 51.9°C in late June 2026.",
      },
      {
        question: "What is the difference between heat exhaustion and heatstroke?",
        answer: "Heat exhaustion involves heavy sweating, cool clammy skin, tiredness, dizziness, headache, nausea and cramps, and it usually responds to getting out of the heat, cooling down and drinking. Heatstroke is a medical emergency with a very high body temperature, skin that may have gone hot and dry because sweating has stopped, confusion, slurred speech, unsteadiness, vomiting, seizures or loss of consciousness. If a child who has been in the heat becomes confused or stops sweating, call 1669 immediately rather than waiting to see if it passes.",
      },
      {
        question: "What are Thailand's heat index warning levels?",
        answer: "Thai authorities use four bands. Watch is 27 to 32.9°C, meaning monitor alerts. Warning is 33 to 41.9°C, meaning reduce outdoor activity between 11am and 3pm. Danger is 42 to 51.9°C, meaning actively monitor for symptoms, and Bangkok sits in this band for much of the hot season. Very dangerous is 52°C and above, meaning avoid outdoor activity altogether. The heat index combines heat and humidity, so it runs well above the air temperature your phone shows.",
      },
      {
        question: "Why are children more at risk from heat?",
        answer: "They have more surface area relative to body mass so they absorb heat faster, they sweat less efficiently than adults, they take longer to acclimatise to a hot climate, and they do not reliably notice or report overheating. A young child will keep playing well past the point an adult would stop, which means the adult has to be the one watching.",
      },
      {
        question: "What number do I call for a medical emergency in Thailand?",
        answer: "1669 is the national emergency medical number. It is free, works from any phone and English-speaking dispatch is usually available. If your family already uses a particular hospital, save its own ambulance line as well, since a private ambulance from your hospital will take you to that hospital rather than to the nearest one.",
      },
    ],
  },
  {
    slug: "third-culture-kids-bangkok-moving-back",
    title: "Third Culture Kids in Bangkok: What Happened When We Moved Ours Back to America",
    category: "Local Life",
    date: "2026-09-10",
    metaDescription: "We raised two third culture kids in Bangkok from 2012 to 2020, then moved them to the US. What the research gets right about re-entry, what it misses, and the one thing I would do differently.",
    keywords: ["third culture kids", "third culture kids Bangkok", "TCK", "expat kids Bangkok", "moving back from Thailand with kids", "repatriation with children", "reverse culture shock kids", "raising kids abroad Bangkok", "leaving Bangkok international school", "expat children adjusting", "third culture kid identity", "moving home from expat life"],
    excerpt:
      "My kids grew up in Bangkok and moved to America at 10 and 8, into a country they had only ever visited. Almost everything written about third culture kids covers helping them settle in. This is the other half: what the move out actually costs, and what I got wrong.",
    headings: [
      { beforeParagraph: 3, text: "What a third culture kid actually is" },
      { beforeParagraph: 6, text: "Ours barely counted as expats" },
      { beforeParagraph: 9, text: "The half everyone writes about" },
      { beforeParagraph: 13, text: "What the research says about leaving" },
      { beforeParagraph: 18, text: "We left excited, not grieving" },
      { beforeParagraph: 23, text: "Then we landed in a pandemic" },
      { beforeParagraph: 29, text: "The honest trade" },
      { beforeParagraph: 33, text: "The language mistake I could not fix" },
      { beforeParagraph: 37, text: "What I would do differently" },
      { beforeParagraph: 42, text: "Keeping the roots" },
      { beforeParagraph: 46, text: "Where they are now" },
    ],
    relatedSchools: [
      { name: "International School Bangkok (ISB)", slug: "international-school-bangkok-isb" },
      { name: "NIST International School Bangkok", slug: "nist-international-school-bangkok" },
      { name: "Bangkok Patana School", slug: "bangkok-patana-school" },
      { name: "KIS International School Bangkok", slug: "kis-international-school-bangkok" },
      { name: "St Andrews International School Bangkok", slug: "st-andrews-international-school-bangkok" },
      { name: "The American School of Bangkok (ASB)", slug: "the-american-school-of-bangkok-asb" },
    ],
    faq: [
      {
        question: "What is a third culture kid?",
        answer: "A third culture kid is a child who spends a significant part of their development outside their parents' passport country. The term was coined by sociologist Ruth Hill Useem in the 1950s. The first culture is the parents' home country, the second is the country the child actually grows up in, and the third is the shared culture of internationally mobile children, which is often where they feel they belong most. Nearly every child raised by expat parents in Bangkok is a third culture kid.",
      },
      {
        question: "Is it harder for a third culture kid to move back than to move abroad?",
        answer: "Usually yes. Research on repatriated third culture kids found that re-entry adjustment takes longer than the original move abroad, with one participant putting their own timeline at nine years. The same study found 87 percent felt fundamentally different from peers who had not lived overseas. The move abroad comes with obvious support and low expectations; the move back comes with an assumption that the child is going home, which for a child raised elsewhere is often not true.",
      },
      {
        question: "My child seems fine after the move. Does that mean they have adjusted?",
        answer: "Not necessarily. The central finding in the repatriation research is that assimilation is not the same as repatriation. Children pick up accent, slang and clothing quickly, which convinces the adults around them that the transition is complete, while identity questions continue underneath for months or years. Fast surface adaptation is normal and welcome, but it is not proof that the deeper adjustment has finished.",
      },
      {
        question: "How do I prepare my child to leave Bangkok?",
        answer: "The framework most international schools use is RAFT, from Pollock and Van Reken: Reconciliation, resolving what is unsaid before you go; Affirmation, telling people explicitly that they mattered; Farewells, saying goodbye properly to places as well as people; and Think destination, talking realistically about what is coming rather than only the good parts. Give the goodbyes real time. Saying goodbye to a nanny, a house or a school gate is not sentimental filler, it is the work.",
      },
      {
        question: "Will my child lose their Thai if we leave Thailand?",
        answer: "It depends almost entirely on whether Thai was a home language or a school subject. Children who spoke Thai at home tend to keep it. Children who learned it through school and tutoring keep much less unless you actively maintain it. If you are in a mixed family, the single highest-leverage thing you can do is have the Thai parent speak Thai with the children from the start. After a move, a local Thai temple or community is the most effective way to keep the language alive, because it provides Thai spoken by people who are not the parents.",
      },
      {
        question: "What should I ask Bangkok international schools about learning support?",
        answer: "Ask specific, staffing-level questions rather than reading the website. How many qualified learning support staff are there, what are their actual qualifications, what is the caseload per specialist, what assessment do they conduct in-house versus refer out, and can you speak to a current parent of a child receiving support. Provision varies enormously between schools here, far more than curriculum or facilities do, and it is one of the few areas where the marketing and the reality can diverge sharply.",
      },
      {
        question: "How long does it take a third culture kid to settle after moving back?",
        answer: "There is no fixed timeline, and the honest answer is longer than most parents plan for. Surface adjustment often happens within months. Identity settling is measured in years. Factors that genuinely help, according to the research, include strong family cohesion, permission to grieve openly without being told they are lucky, contact with other children who share the experience, and parents who are themselves settled and content with the move.",
      },
    ],
    body: [
      "Ask a western kid who grew up in Bangkok where they are from and watch how long the pause is. Mine still pause. One was born here, one was born in Massachusetts, both of them spent nearly their whole childhood in Thailand, and both of them now live in a country whose passport they have always held and whose schools they had never attended until they were 10 and 8 years old.",
      "There is a term for this. They are third culture kids, and if you are raising children in Bangkok, you are raising them too.",
      "There is a lot written about helping a third culture kid settle into a new country. There is almost nothing honest written about what happens when you take them out again. We did the whole loop, arrival to departure to the years afterward, and the second half was nothing like what I had read.",
      "The phrase was coined by the sociologist Ruth Hill Useem in the 1950s, and the three cultures are easier to understand than the name suggests. The first culture is the parents' passport country. The second is the country the child actually grows up in. The third is neither of those. It is the shared culture of internationally mobile kids, the one they build with each other, and it is very often the one where they feel most at home.",
      "That is the part parents underestimate. Your child's closest cultural peers may not be Thai and may not be American or British or Australian. They may be the other kids at their school who also live between two places and understand what that is like without needing it explained.",
      "It also means the passport country is not automatically home. That sounds obvious written down. It did not feel obvious to me until I watched my own kids try to live in one.",
      "My daughter was born in Bangkok in 2010. My son was born in Cambridge, Massachusetts in 2012. We lived in Thailand from 2012 until 2020, so for practical purposes both of them grew up entirely in Bangkok. International schools the whole way through. Their friends were from a dozen countries. Our nanny was part of the family for most of it.",
      "America was not home to them in any meaningful sense. It was a place they visited. We sent them to summer camp in the States for about two months a year, so their entire model of the United States was warm weather, lake swimming, and other kids being pleased to see them. They had never sat in an American classroom in their lives.",
      "That matters, and it is the thing that makes our version of this story different from the one in most of the research. When we left in 2020, we were not repatriating them. We were moving them to a foreign country that happened to be on their passports.",
      "The advice on helping a child settle into a new country is genuinely good, and I do not want to dismiss it. The framework most international schools use comes from David Pollock and Ruth Van Reken's book Third Culture Kids: Growing Up Among Worlds, and it is worth knowing by name because it gives you something concrete to do instead of just worrying.",
      "It is called RAFT. Reconciliation, meaning you deal with the things left unsaid and unresolved before you go, including the arguments and the fallings out. Affirmation, meaning you tell the people who mattered that they mattered, out loud and specifically. Farewells, meaning you say goodbye properly to people and also to places, to the pool, the school gate, the noodle shop on the corner. And Think destination, meaning you talk realistically about what is coming, not just the good parts.",
      "Pollock also described transition in five stages: involvement, leaving, transition, entering, and re-involvement. The single most useful thing in that model is the observation that the transition stage begins the day you announce the move and does not end when the plane lands. Parents consistently expect the hard part to finish on arrival. It does not.",
      "The research also identifies things that actually predict how well a child copes. A 2022 systematic review by Ooi and colleagues, pulling together fourteen studies, found that family cohesion significantly predicted both quality of life and sociocultural adjustment. Children aged around 10 tended to be more optimistic than 12 to 14 year olds, so age at the move matters. And one finding I did not expect: the parent's satisfaction with their own work predicted the child's adjustment. If the move is making you miserable, they will feel it.",
      "Here is where the reading gets scarcer and more interesting. The most useful thing I found on the return leg is a doctoral study out of Chapman University on the repatriation experiences of American third culture kids, and three of its findings have stayed with me.",
      "The first is that 87 percent of repatriated third culture kids reported feeling fundamentally different from peers who had not lived abroad. Not lonely, not unhappy necessarily, just different in a way that did not go away.",
      "The second is that re-entry adjustment takes longer than the original move abroad. One participant in that study put their own timeline at nine years before they felt psychologically settled.",
      "The third is the one I would put on a poster in every international school. Assimilation is not repatriation. Kids fit in on the surface fast. They pick up the accent, the slang, the clothes, the references, and every adult around them concludes they are fine. Underneath, the identity work is still running, sometimes for years. Fast surface adaptation is not evidence that the deeper adjustment has happened. It is often what hides it.",
      "There is a related finding that stung a bit when I read it. Third culture kid grief is invisible to the people around them, so it tends to get misread. When they talk about their old life, it can land as bragging. When they struggle, it can land as ingratitude. Neither reading is fair, and both are common.",
      "So here is where our experience departs from the tidy version of this story.",
      "My daughter was not devastated to leave Bangkok. She was excited. America was the warm place with summer camp, and she was going to live there. We threw a party. We said our goodbyes properly to people we loved, and there were real tears in that, but the mood in our house was mostly anticipation.",
      "My son was a different story, and I did not read it correctly at the time. He loved the time he had spent in the States, but he did not want to leave what he was building in Thailand. He had good friends, real relationships, and a genuine love of Thai food and the life around it. He was not looking for a fresh start. He was being moved away from one that was already working.",
      "That split is worth naming, because the TCK literature tends to describe a family as though it has one shared emotional experience of the move. Ours had two, under the same roof, on the same flight. If you are bracing for a child in mourning at the airport, you might get that. You might get a kid who is genuinely thrilled. You may well get both at once, and the loud one is easy to mistake for the whole picture.",
      "With my daughter, I quietly assumed the excitement meant the hard part had been skipped. It had not been skipped. It had been deferred. With my son, the hard part was visible from the start, and I still underestimated how much of it there was.",
      "We arrived in Massachusetts in 2020, and everything was shut.",
      "Their first year of American school, the first American school either of them had ever attended, was conducted remotely from our house. Two children who had just left every friend they had ever made were now expected to build a new social life through a screen, in a country they had only ever visited in summer, during a winter they had no clothes for.",
      "You could not invite anyone inside. That was the rule and we followed it. The way we actually met people was sledding. Outdoors, distanced, in the snow, which is how my kids made their first friends in America. I am aware of how that sounds. It was also genuinely the only thing that worked.",
      "I want to be honest about what this does to my ability to give you clean advice. Our re-entry is tangled up with a global pandemic, and I cannot fully separate what was hard because they were third culture kids from what was hard because the entire world was locked in its houses. Anyone who tells you they can cleanly separate those things for a 2020 or 2021 move is guessing.",
      "What I can tell you is that the isolation amplified everything the research predicts. The invisible grief had nowhere to go. The surface assimilation that normally happens fast, through playgrounds and lunch tables and sports, could not happen at all. They missed Thailand badly, and there was very little available to distract them from missing it.",
      "The culture was different in a hundred small ways. The weather was hostile. The food was not their food. And they had lost the thing that made them interesting, because in Bangkok being the kid from somewhere else is normal and in a Massachusetts elementary school it is either invisible or a spectacle, and neither is comfortable.",
      "And yet I would make the same decision again, and so would they, which is a sentence I could not have written in year one.",
      "The American education system, or at least the strong public system we landed in, is better than what we were paying a great deal of money for in Bangkok. It is more organized, more consistent, and it opens more doors for what comes next. My kids are old enough now to see that themselves, and they say it without me prompting them.",
      "One of my kids has additional learning needs, and the support available through a well-resourced American public school has been substantially better than anything we were able to access in Bangkok. That was not a minor consideration in the decision to move. It was one of the main ones.",
      "I raise it because it is a real gap and almost nobody in the Bangkok expat conversation talks about it. International schools here vary enormously in what learning support they actually provide, as opposed to what appears on the website, and it is worth asking hard, specific questions about staffing and assessment before you enroll rather than after. If your child needs meaningful support, that question deserves to sit alongside curriculum and commute when you build your shortlist.",
      "My son is fluent in Thai. My daughter is proficient. Neither of them got that at home.",
      "They learned Thai at school and from private teachers we paid for. Their mother is Thai and chose to speak English with them, and read to them in English, despite my arguing about it for years. I lost that argument. We are divorced now and I have no interest in relitigating it, but I am including it because I do not think we were unusual.",
      "In a lot of mixed families in Bangkok, the Thai parent defaults to English with the children, often for reasons that feel sensible at the time: the child's English will matter more for school, or English is simply the language the household already runs in. The result is a generation of half-Thai kids whose Thai is a school subject rather than a mother tongue.",
      "If that is your household and you have a choice in it, my strong advice is to fight harder than I did, earlier than I did. The Thai my kids do have is one of the most valuable things they carried out of that country, and they got it the expensive way.",
      "This is the one that took me five years to see clearly.",
      "From the beginning, I pushed America. Everything in our house was USA, USA, USA. American holidays, American summer camp, American frame of reference, an implicit sense that Thailand was the place we were living and America was the place we were from. I thought I was keeping them anchored to their real identity.",
      "What I was actually doing was teaching them that the country they lived in every day, the country their mother is from, the country where one of them was born, was somehow the secondary one. And when we moved, that framing gave them nothing to hold onto. They had been told for years that America was home, so when America turned out to be hard and cold and strange, there was no other identity available to fall back on.",
      "I should have shown strong love for both countries from the start. Not diplomatic neutrality, actual enthusiasm for both. A kid who has been taught to be proud of two places has somewhere to stand when one of them disappoints them. A kid who has been taught to be proud of one place has only that one.",
      "That is the thing I would change, and it is not a logistics change or a checklist item. It is a change in what you say at the dinner table for years before you ever book a flight.",
      "What we do now is deliberate, and it started later than it should have.",
      "Every Sunday we go to a large Thai temple here in Massachusetts. That gives them Thai spoken around them by people who are not their parents or their teachers, Thai food made properly, and the ordinary experience of being in a room where being half Thai is unremarkable. If you end up anywhere in America with a Thai community, find it. It does more than any amount of talking about heritage.",
      "We eat a lot of Thai food and I cook it myself. That sounds trivial next to identity and belonging, but food is the most reliable route back to a place I have found, and it is available on a Tuesday night.",
      "And we go back. They want to go every summer. We manage every year or two, which is a compromise driven by money and logistics rather than intent. Every single trip is worth it. Watching them slip back into Thai with people they have known since they were small is the clearest evidence I have that the Bangkok years are still load-bearing in who they are.",
      "They are 16 and 14. They talk about Bangkok. They miss it. They also have real friends here, real school lives, and a clear-eyed view that the education they are getting now is better than what they left.",
      "That combination is, I think, the actual third culture kid outcome, and it is neither the tragedy nor the triumph that gets written up. They hold two places at once. They are not fully at home in either and they are not homeless. They just carry more than one set of coordinates, which is a real advantage as an adult and a genuinely hard thing to be at 11.",
      "If you are about to move a family out of Bangkok, or into it, the honest summary of nine years and one hard landing is this. The move out is harder than the move in and takes longer than you expect. Fast surface adjustment is not the same as being fine. Your own state of mind about the move is more contagious than you think. And the single best thing you can do costs nothing and starts years early, which is to love both of their countries out loud, so that whichever one they are standing in, the other one is still theirs.",
    ],
  },
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
      "Concordian runs 626,400 to 963,400, Bromsgrove 259,100 to 680,100, Regent's 430,800 to 759,600, KIS 459,800 to 984,700, BASIS 545,000 to 998,000, and Berkeley 524,300 to 847,500. This is where a lot of genuinely strong academic options sit, often 20 to 30 percent cheaper than the premium tier for outcomes that are honestly not that different at the primary level. The gap widens more in the senior years.",
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
    title: "How to Choose a Hospital in Bangkok When You Have Just Arrived",
    category: "Healthcare",
    date: "2026-09-14",
    metaDescription:
      "A directory tells you what your options are. This answers the harder question: how do you actually pick one, which hospitals families name most, and the twenty minutes of homework to do before you need any of it.",
    keywords: ["choosing a hospital Bangkok", "best hospital Bangkok families", "Bangkok hospital expat", "paediatric hospital Bangkok", "Samitivej Bumrungrad BNH comparison", "Bangkok hospital direct billing", "children's emergency Bangkok", "new to Bangkok healthcare"],
    excerpt:
      "The private hospital system here is genuinely excellent, which is a lovely problem to have and no help at all when you are three weeks off the plane and trying to pick one. Here is how to narrow it down, and the homework worth doing before you need any of it.",
    headings: [
      { beforeParagraph: 2, text: "You are choosing two things, not one" },
      { beforeParagraph: 6, text: "Three questions that narrow it fast" },
      { beforeParagraph: 11, text: "The five families name most, and what each is for" },
      { beforeParagraph: 18, text: "The emergency question people get wrong" },
      { beforeParagraph: 22, text: "Twenty minutes of homework, now rather than later" },
    ],
    relatedFacilities: [
      { name: "Samitivej Sukhumvit Hospital", slug: "samitivej-sukhumvit-hospital" },
      { name: "Bumrungrad International Hospital", slug: "bumrungrad-international-hospital" },
      { name: "BNH Hospital", slug: "bnh-hospital" },
      { name: "Bangkok Hospital (Soi Soonvijai)", slug: "bangkok-hospital-headquarters" },
      { name: "Praram 9 Hospital", slug: "praram-9-hospital" },
      { name: "Samitivej International Children's Hospital", slug: "samitivej-international-childrens-hospital" },
      { name: "Saint Louis Hospital", slug: "saint-louis-hospital" },
      { name: "Camillian Hospital", slug: "camillian-hospital" },
    ],
    body: [
      "Bangkok's private hospitals are one of the genuinely good reasons to raise a family here. Several are internationally accredited, English-speaking paediatric care is normal rather than a premium extra, and the whole thing costs a fraction of private care in most of the countries families arrive from.",
      "Which is a lovely problem to have, and absolutely no help when you are three weeks off the plane with a feverish child and a list of names that all sound equally plausible. Our [hospital directory](/healthcare/hospitals) will tell you what your options are. This is about how to actually pick between them.",
      "The first thing to get straight is that you are making two decisions, and people tend to collapse them into one.",
      "The everyday hospital is where you go for a sick child, a vaccination, a checkup, a rash you want looked at. What matters here is that it is close, that getting seen is easy, and that the cost of a routine visit does not make you hesitate before going. You will use this place dozens of times.",
      "The emergency hospital is where you go at 2am, or where you would want to end up if something serious happened. What matters here is capability, not convenience, and it may well not be the same building.",
      "Plenty of families end up with a small hospital ten minutes away for the ordinary things and a large one further out for anything that frightens them. That is a sensible arrangement, not an indecisive one.",
      "**How far is it, in the traffic you will actually be in?** Look at the journey on a weekday at 6pm, not on a Sunday morning. A hospital that is fifteen minutes away in theory and fifty in practice is not a fifteen minute hospital. This single question eliminates more options than anything else, and it should.",
      "**Will your insurance settle directly with them?** Direct billing means you sign a form and leave. No direct billing means you pay a potentially large bill and reclaim it over the following weeks. The big international hospitals settle with most international insurers; mid-market Thai private hospitals work with a shorter panel; small clinics generally do not. Confirm your specific policy with the specific hospital, because an insurer appearing on a list does not always mean every product from that insurer.",
      "**How much English do you need right now?** This is the question people feel awkward asking and it is entirely legitimate. In your first year, with a sick child and no Thai, the international hospitals are worth what they cost, and a large part of what you are paying for is that somebody will explain things to you properly. Two years in, when you have found your feet, a good Thai private hospital at half the price often starts to look sensible for routine visits.",
      "Those three questions usually leave two or three realistic candidates rather than twenty.",
      "One more, if it applies: if anyone in the family has an ongoing condition, pick the hospital where that specialty is strong and let the rest follow.",
      "These are the names that come up most often in our community, with what each is actually good for rather than what its brochure says.",
      "[Samitivej Sukhumvit](/healthcare/hospitals/samitivej-sukhumvit-hospital) is the default for the international school corridor, and deservedly so. It sits in the middle of where expat families live, it has built its reputation specifically on children's and women's health, and walk-in paediatric appointments generally work. Convenience is the product and it is priced accordingly, though it still undercuts Bumrungrad for routine visits.",
      "[Bumrungrad](/healthcare/hospitals/bumrungrad-international-hospital) is the one everyone has heard of and the most practised in the world at handling foreign patients. Interpreters, an international floor, machinery that simply works. It is also the most expensive of the mainstream options, and families who use it for everything tend to notice how much a routine paediatric visit costs compared to the alternatives.",
      "[BNH](/healthcare/hospitals/bnh-hospital) is small, personal and the oldest private hospital in Thailand. It is best known among expat families for maternity, where the draw is continuity, the same obstetrician throughout. For families in Silom and Sathorn it is also just the nearest good option. Being small cuts both ways: the experience is better, the range of sub-specialists is narrower.",
      "[Bangkok Hospital](/healthcare/hospitals/bangkok-hospital-headquarters) on Soi Soonvijai is a genuine full-service hospital with combined paediatric and neonatal intensive care running around the clock, plus ground and air emergency transport. The campus is large and first visits involve more walking than you expect.",
      "[Praram 9](/healthcare/hospitals/praram-9-hospital) is the sensible mid-market option for families in the Rama 9 and Ratchada corridor, with an international desk and a dedicated expat phone line. Less English signage than the Sukhumvit hospitals, noticeably lower bills.",
      "Worth knowing beyond the usual five: [Saint Louis](/healthcare/hospitals/saint-louis-hospital) on South Sathorn is a solid budget option for routine visits, and [Camillian](/healthcare/hospitals/camillian-hospital) is a small hospital right in Thong Lor, which makes it the closest option to a large slice of the expat population.",
      "Here is the distinction almost nobody makes when they arrive, and it is the one that matters most at 2am.",
      "There is a real difference between a hospital that sees children in its general emergency department and a hospital with a paediatric emergency department staffed by paediatricians. Most Bangkok hospitals are the first kind. That is usually fine. It is less fine for a very sick small child.",
      "In Bangkok the dedicated children's emergency services are at [Samitivej's children's hospital](/healthcare/hospitals/samitivej-international-childrens-hospital) at the Srinakarin campus, which opened in 2025 as Thailand's only private hospital built entirely for children, and at the [national children's hospital](/healthcare/hospitals/queen-sirikit-national-institute-of-child-health) in Ratchathewi. Note that the Samitivej children's hospital is at Srinakarin, not on Sukhumvit, which is a long drive from most of the school corridor and exactly the sort of thing to know in advance rather than discover while driving.",
      "For anything genuinely critical, the national ambulance number is **1669**. It is free and works from any phone.",
      "Do this on a quiet evening rather than in a crisis, because all of it is useless the moment you actually need it.",
      "Pick your everyday hospital and your emergency hospital, and check the drive to each at a bad hour. Put both numbers in your phone, including the hospital's own ambulance line if it publishes one, since a private ambulance from your hospital takes you to that hospital rather than to the nearest.",
      "Call your insurer and confirm, for those two specific hospitals, whether they direct bill. Write down what they tell you.",
      "Find a paediatrician rather than relying on whoever is free. Ask whether they do same-day sick visits, and what happens when they are away.",
      "Then forget about it. The point of the twenty minutes is that you never have to think about any of this again until the night you are glad you did.",
    ],
    faq: [
      {
        question: "Which hospital is best for families in Bangkok?",
        answer: "There is no single answer, and the useful reframe is that you are choosing two hospitals: an everyday one that is close and easy, and an emergency one chosen for capability rather than convenience. They are often not the same building. Samitivej Sukhumvit is the most common everyday choice for the international school corridor, while Bangkok Hospital and Samitivej's children's hospital at Srinakarin carry the most paediatric intensive care capability.",
      },
      {
        question: "Where do I take a sick child at 2am in Bangkok?",
        answer: "Any 24-hour hospital will see a child, but there is a real difference between a general emergency department that also sees children and a paediatric emergency department staffed by paediatricians. In Bangkok the dedicated children's emergency services are at Samitivej's children's hospital at the Srinakarin campus and the national children's hospital in Ratchathewi. Note Srinakarin is a long drive from Sukhumvit. For anything critical, call 1669.",
      },
      {
        question: "Do I need an international hospital or will a Thai private hospital do?",
        answer: "In your first year, with no Thai and a sick child, the international hospitals are usually worth the premium, and much of what you are paying for is somebody explaining things to you properly. Once you have found your feet, a good Thai private hospital at a considerably lower price is often sensible for routine visits. Many families end up using both for different things.",
      },
      {
        question: "What should I check before I need a hospital?",
        answer: "Four things, and they take about twenty minutes. Check the drive to your chosen hospitals at a bad traffic hour rather than a good one. Confirm with your insurer whether they direct bill those specific hospitals. Save the hospital's own ambulance line as well as 1669, since a private ambulance takes you to that hospital rather than the nearest. And find a paediatrician in advance, asking whether they offer same-day sick visits and who covers when they are away.",
      },
    ],
  },
  {
    slug: "staying-fit-in-bangkok",
    title: "Staying Fit in Bangkok: Two Places That Actually Worked For Us",
    category: "Local Life",
    date: "2026-09-14",
    metaDescription:
      "Heat and traffic make fitness in Bangkok feel impossible at first. It is not. The two daily windows that make outdoor exercise work, the parks worth the trip, and honest writeups of The Movement Playground for kids and F45 for adults.",
    keywords: ["fitness Bangkok", "gym Bangkok expat", "Movement Playground Bangkok", "parkour kids Bangkok", "ninja class Bangkok", "F45 Bangkok", "kids activities Bangkok active", "Benjakitti park running", "Lumpini park exercise", "staying fit Bangkok heat", "family fitness Bangkok"],
    excerpt:
      "The heat and the traffic make exercise here feel like a losing battle for about your first month. Then you learn the rhythms. Here is what worked for our family, including the parkour gym my kids loved and the training programme that got me back in shape.",
    headings: [
      { beforeParagraph: 2, text: "The two windows" },
      { beforeParagraph: 6, text: "The parks are better than you expect" },
      { beforeParagraph: 10, text: "The Movement Playground, for kids who cannot sit still" },
      { beforeParagraph: 16, text: "F45, if you want the thing that actually works" },
      { beforeParagraph: 22, text: "Making it stick" },
    ],
    body: [
      "For about your first month in Bangkok, exercise feels like a losing battle. It is too hot to run, the pavements are an obstacle course, getting anywhere takes an hour, and the default settles quickly into air conditioning and food delivery.",
      "Then you learn the city's rhythms and it turns out to be a genuinely good place to be fit, as long as you stop trying to do it the way you did at home.",
      "Almost all outdoor exercise in Bangkok happens in one of two windows: before about 8am, or after about 5pm. That is not a preference, it is the whole game.",
      "The middle of the day in the hot season is not merely uncomfortable, it is a measurable health risk. Bangkok's heat index spends much of March to May in the band Thai authorities classify as dangerous, and the official advice during a warning is explicitly to reduce outdoor activity between 11am and 3pm. If you are new here, our guide to [heat and kids in Thailand](/blog/heatstroke-thailand-hot-season) explains the warning bands and what to watch for.",
      "The same two windows also happen to dodge the worst of the traffic pollution, which is a second reason the locals have organised their exercise this way for decades.",
      "Once you accept the windows rather than fight them, the city opens up considerably. Early mornings in Bangkok are genuinely lovely, and at 6am the parks are full of people who worked this out long before you arrived.",
      "Bangkok's public parks are much better than most arriving families expect, and they are free.",
      "Lumpini is the famous one, with a running loop, outdoor gym equipment, and a monitor lizard population that children find far more exciting than the exercise. Benjakitti, since its expansion, is the better run: an elevated walkway over reclaimed wetland, a proper circuit, and a connection through to Lumpini that makes a longer route possible without touching a road.",
      "Both are shaded, safe, walkable and busy in the early morning and evening, which is precisely when you should be there.",
      "Many condo developments also include a gym and a pool, and increasingly a small children's pool or play area alongside. If yours does, use it. A five minute lift ride removes the single biggest obstacle to exercising with children, which is the logistics of getting everybody somewhere.",
      "This is the one I recommend hardest, because my own kids did it and loved it in a way that nothing else on the timetable managed.",
      "The Movement Playground on Soi Sukhumvit 69 describes itself as a parkour and obstacle course training hub, which undersells it slightly. What children actually do there is vault, climb, swing, balance, roll and land, on monkey bars and platforms and structures at varying heights, with coaches teaching them how to do all of it without hurting themselves.",
      "If your child has watched ninja obstacle course shows and then attempted to recreate them on your furniture, this is the place that redirects all of that somewhere useful. It is the rare activity that is unmistakably exercise and does not feel to the child like exercise at all.",
      "Classes are split into Little Kids at ages four to five, Kids at six to twelve, and Teens at thirteen to fifteen, with private training and adult parkour and obstacle course racing classes as well. It runs weekday afternoons into the evening and most of the day at weekends, which fits around school.",
      "Two honest practicalities. Drop-in classes start around 590 baht, and the training floor is concrete rather than padded matting, which is a deliberate choice about learning real landing technique rather than an oversight, but it is worth knowing before you walk in expecting a soft-play centre. There is no air conditioning either, so the early and late sessions are noticeably more pleasant.",
      "It suits children with energy to burn and no particular interest in team sport. It is the wrong fit for a child who wants a league, a fixture list and a trophy at the end of the season.",
      "For adults, the thing that worked for me was F45, and the reason is worth explaining because it generalises.",
      "F45 runs 45-minute group classes built around functional training, mixing cardio and resistance work, with certified trainers running the floor and the workout rotating constantly so you are rarely doing the same session twice. The format removes the two things that kill most gym habits: deciding what to do, and doing it alone.",
      "I started with F45 in Boston and it got me properly fit. The part that matters for an expat family is that it is a global franchise running the same programming everywhere, so the class in Bangkok is recognisably the class you left behind. If you had something that worked at home, arriving in a new city and finding it unchanged is worth a great deal more than it sounds. Continuity is most of what makes a fitness habit survive a move.",
      "The Bangkok studio is at Asok, on Sukhumvit 16. Studio locations do change, so check the F45 site for what is currently open before planning around one.",
      "They offer a free trial class, which is the right way to find out whether the format suits you.",
      "One honest warning: the intensity is real and the first session is humbling if you have been sedentary through a relocation. That is normal, everyone scales, and the trainers expect it. Go anyway, and go twice before deciding.",
      "The families who stay active here are not the disciplined ones, they are the ones who removed friction.",
      "That usually means something within walking distance or one short ride, something at a time that already exists in the day rather than a new slot carved out of nothing, and, if you have children, something they actively want to go to rather than something you have to negotiate them into.",
      "The last point is the one worth spending money on. An activity a child asks to attend is worth three they tolerate, because it is the only one that will still be happening in six months.",
    ],
    faq: [
      {
        question: "When is it safe to exercise outdoors in Bangkok?",
        answer: "Before about 8am or after about 5pm. The middle of the day in the hot season is a genuine health risk rather than just uncomfortable, and Thai authorities advise reducing outdoor activity between 11am and 3pm during heat warnings. Those same windows also avoid the worst traffic pollution.",
      },
      {
        question: "What is The Movement Playground?",
        answer: "A parkour and obstacle course training gym on Soi Sukhumvit 69, near BTS Phra Khanong, where children learn to vault, climb, swing, balance, roll and land under coaching. Classes run for Little Kids aged four to five, Kids aged six to twelve and Teens aged thirteen to fifteen, with adult parkour and obstacle course racing classes too. Drop-ins start around 590 baht. The floor is concrete rather than padded matting, which is deliberate for learning landing technique, and there is no air conditioning, so earlier and later sessions are more comfortable.",
      },
      {
        question: "Is there F45 in Bangkok?",
        answer: "Yes, with a studio at Asok on Sukhumvit 16. F45 runs 45-minute functional training classes in a group format with rotating workouts and trainers on the floor. Because it is a global franchise running the same programming everywhere, the Bangkok class is recognisably the same as one you may already know from home, which makes it unusually easy to pick a habit back up after a move. They offer a free trial class.",
      },
      {
        question: "What are the best parks in Bangkok for exercise?",
        answer: "Lumpini is the best known, with a running loop, outdoor gym equipment and the monitor lizards children come for. Benjakitti is the better run since its expansion, with an elevated walkway over reclaimed wetland and a connection through to Lumpini that allows a longer route without crossing roads. Both are free, shaded and busy early morning and evening.",
      },
      {
        question: "How do families with young children fit exercise in?",
        answer: "Mostly by removing friction rather than by being disciplined. Use the condo gym and pool if you have one, since a lift ride eliminates the logistics that stop most attempts. Pick activities children genuinely want to attend rather than ones they tolerate. And attach exercise to a time that already exists in your day rather than trying to create a new slot.",
      },
    ],
  },
  {
    slug: "dental-health-for-families-in-bangkok",
    title: "Dental Care for Families in Bangkok: What It Actually Costs",
    category: "Healthcare",
    date: "2026-09-14",
    metaDescription:
      "Published Bangkok dental prices against US averages: a cleaning at 1,500 baht, a filling at 1,200, a molar root canal at 17,000, braces from 65,000. Plus the school rates nobody advertises and the one risk worth knowing about.",
    keywords: ["dental care Bangkok", "Bangkok dentist prices", "dental cost Thailand", "braces Bangkok cost", "children's dentist Bangkok", "paediatric dentist Bangkok", "Invisalign Bangkok price", "dental Thailand vs US cost", "BIDC BIDH prices", "expat dentist Bangkok"],
    excerpt:
      "Dental care is one of the genuine financial upsides of living here, and the mistake families make is saving it up for a trip home. Here are the published Bangkok prices against US averages, including the numbers for braces.",
    headings: [
      { beforeParagraph: 2, text: "What it costs, in actual numbers" },
      { beforeParagraph: 8, text: "Braces are where the money really is" },
      { beforeParagraph: 12, text: "Children specifically" },
      { beforeParagraph: 16, text: "The school rates nobody advertises" },
      { beforeParagraph: 19, text: "Clinic or dental hospital" },
      { beforeParagraph: 23, text: "The one risk worth naming" },
    ],
    relatedFacilities: [
      { name: "Bangkok International Dental Hospital (BIDH)", slug: "bangkok-international-dental-hospital" },
      { name: "Bangkok International Dental Center (BIDC)", slug: "bangkok-international-dental-center" },
    ],
    body: [
      "Dental care is one of the few things about expat life in Bangkok that is straightforwardly, unambiguously better than at home. The quality is high, English-speaking dentists are normal rather than a search, appointments happen this week rather than next month, and the prices are a fraction of what most families are used to.",
      "Which makes the most common mistake a slightly odd one: saving dental work up for a trip home. A lot of families do it out of habit, and it costs them both money and, occasionally, a small problem that became a large one while they waited.",
      "Here is the comparison that makes the point, using published Bangkok prices against US averages for the same procedure without insurance. Bangkok figures below are from [BIDC's](/healthcare/hospitals/bangkok-international-dental-center) published fee list, checked in September 2026.",
      "A **cleaning and polish** runs 1,500 to 2,800 baht in Bangkok. The US average without insurance is roughly 75 to 200 dollars, so this is broadly comparable at the cheap end and better at the expensive end.",
      "A **filling** is 1,200 baht per surface, against a US average of 100 to 400 dollars or more per tooth.",
      "A **simple extraction** is 1,300 to 2,000 baht, against 100 to 400 dollars in the US.",
      "A **root canal** is where it starts to get striking: 11,000 baht for a front tooth, 14,000 for a premolar, 17,000 for a molar. The US average is 700 to 2,000 dollars. A molar root canal in Bangkok is roughly 500 dollars.",
      "A **crown** is 18,500 to 19,500 baht for all-ceramic, against a US range of 800 to 2,500 dollars or more. An X-ray is 250 baht for a single tooth or 1,400 for a full panoramic. Consultations at BIDC are free.",
      "If you have a teenager, this is the number that matters more than all the others combined.",
      "**Metal braces run 65,000 to 75,000 baht at BIDC and 70,000 to 80,000 at [BIDH](/healthcare/hospitals/bangkok-international-dental-hospital).** That is roughly 2,000 to 2,400 dollars for full orthodontic treatment. The US average is 3,000 to 7,000 dollars or more.",
      "Invisalign is priced in tiers. Invisalign Go, for simpler cases, is around 69,000 to 79,000 baht. Full comprehensive Invisalign runs roughly 135,000 to 185,000 depending on complexity and provider.",
      "The catch with orthodontics is not price, it is time. Treatment runs eighteen months to three years, which means starting braces in Bangkok commits you to finishing them here or handing the case to an orthodontist in another country partway through. If you are on a two-year posting with a twelve year old, that is a conversation to have with the orthodontist at the start rather than at the end.",
      "The standard advice is a checkup every six months, and here it is easy enough that there is no reason to drift. Get children into the rhythm early and the whole thing stays boring, which is the goal.",
      "Beyond checkups, the two preventive treatments worth asking about for children are fissure sealants on the back teeth and fluoride application. Both are cheap, both are quick, and both prevent the kind of decay that later turns into a filling or worse.",
      "BIDH publishes a children's package starting from 1,500 baht, and paediatric cleaning in the 1,200 to 2,000 range depending on how much there is to remove.",
      "For a very young child, or an older one who is genuinely frightened, ask specifically about treatment under sedation or general anaesthesia. This is where a licensed dental hospital has an advantage over a clinic, because it is set up for it. It is not something to improvise with a scared six year old in an ordinary dental chair.",
      "Here is something that is not advertised and is worth asking about directly.",
      "The larger dental groups run rate agreements with specific Bangkok international schools, giving students, parents and staff discounted pricing on production of a school ID. BIDH has run exactly this arrangement with International School Bangkok, covering free checkups, reduced paediatric cleaning, discounted orthodontics and percentage discounts on fillings and extractions.",
      "These arrangements change and expire, so do not assume a rate you read somewhere still stands. The useful move is simply to ask, at your school office and at the dental practice, whether an agreement exists for your school. It takes one question and it is occasionally worth tens of thousands of baht on a course of braces.",
      "Both kinds of provider are good here, and the distinction is narrower than the names suggest.",
      "A licensed dental hospital, such as BIDH on Sukhumvit Soi 2, operates under hospital-grade safety and sterilisation standards and can handle treatment under general anaesthesia. It also keeps unusually long hours, into the evening six days a week and through Sunday afternoon, which is the single most useful fact for a working parent with school-age children.",
      "A large accredited clinic, such as BIDC on Ratchadaphisek, covers essentially everything else and is strongest on orthodontics, where specialist orthodontists rather than general dentists run the cases. That distinction is worth checking wherever you go, because plenty of practices let a general dentist take orthodontic work.",
      "Neighbourhood Thai dental clinics are substantially cheaper again and often excellent for routine work. English varies. Many expat families end up using one of these for cleanings and a larger practice for anything complicated, which is a perfectly sensible split.",
      "One honest caution, because this article is otherwise very positive and the risk is real.",
      "Bangkok has a large dental tourism market, most patients pay cash rather than through an insurer, and that combination creates a commercial incentive toward treatment plans that are more extensive than they strictly need to be. Most practices are entirely straight. But if you walk in for a cleaning and walk out with a plan for six crowns and a set of veneers, that is worth a second opinion from an unconnected practice before you agree to any of it.",
      "The same applies to cosmetic work generally. Veneers in particular are irreversible, since preparing the tooth removes enamel that does not come back, and a decision that looks attractively cheap at Bangkok prices is still permanent.",
      "Ask what happens if you do nothing, and ask what the most conservative option is. A good dentist will answer both questions without getting defensive, and the answer tells you a great deal about the practice.",
      "Finally, check your insurance rather than assuming. Most expat health policies exclude routine dental entirely or cover it only as a small annual allowance on an upgraded plan. At these prices that is usually fine to absorb, but it is better known in advance than discovered at the desk.",
    ],
    faq: [
      {
        question: "How much does a dentist cost in Bangkok?",
        answer: "Using BIDC's published fees checked in September 2026: a cleaning and polish is 1,500 to 2,800 baht, a filling 1,200 baht per surface, a simple extraction 1,300 to 2,000, a root canal 11,000 for a front tooth up to 17,000 for a molar, and an all-ceramic crown 18,500 to 19,500. A single-tooth X-ray is 250 baht and consultations are free. US averages without insurance for the same work run roughly 700 to 2,000 dollars for a root canal and 800 to 2,500 for a crown.",
      },
      {
        question: "How much do braces cost in Bangkok?",
        answer: "Metal braces run about 65,000 to 75,000 baht at BIDC and 70,000 to 80,000 at BIDH, which is roughly 2,000 to 2,400 US dollars for full treatment against a US average of 3,000 to 7,000 or more. Invisalign Go for simpler cases is around 69,000 to 79,000 baht, and full comprehensive Invisalign runs roughly 135,000 to 185,000. The real constraint is time rather than money: treatment takes eighteen months to three years, so discuss your likely posting length with the orthodontist before starting.",
      },
      {
        question: "Are there dental discounts for international school families in Bangkok?",
        answer: "Often, and they are not advertised. The larger dental groups run rate agreements with specific Bangkok international schools giving students, parents and staff discounted pricing on production of a school ID. BIDH has run such an arrangement with International School Bangkok covering free checkups, reduced paediatric cleaning and discounted orthodontics. These agreements change and expire, so ask at both your school office and the practice rather than relying on a published rate.",
      },
      {
        question: "Is dental care in Bangkok safe and good quality?",
        answer: "Generally yes. Bangkok has internationally accredited dental facilities, including a JCI-accredited dental centre and a licensed dental hospital operating to hospital-grade sterilisation standards, and English-speaking dentists are normal. The risk worth knowing about is commercial rather than clinical: a large cash-paying tourism market creates some incentive toward over-extensive treatment plans. If a routine visit produces a plan for extensive crowns or veneers, get a second opinion from an unconnected practice first.",
      },
      {
        question: "Does expat health insurance cover dental in Thailand?",
        answer: "Usually not, or only as a small annual allowance on an upgraded plan. Routine dental is commonly excluded from expat health policies entirely. At Bangkok prices that is generally manageable to pay out of pocket, but check your policy before treatment rather than at the desk afterwards.",
      },
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
    keywords: ["international school Bangkok", "British school Bangkok", "American school Bangkok", "IB school Bangkok", "Bangkok Patana", "Shrewsbury Bangkok", "ISB Nonthaburi", "NIST Bangkok", "KIS Bangkok", "Ruamrudee International School Bangkok", "RIS Bangkok"],
    headings: [
      { beforeParagraph: 1, text: "Which curriculum should you choose?" },
      { beforeParagraph: 2, text: "British curriculum: Bangkok Patana and Shrewsbury" },
      { beforeParagraph: 3, text: "American curriculum: ISB and Ruamrudee (RIS)" },
      { beforeParagraph: 4, text: "Full IB continuum: NIST and KIS Bangkok" },
      { beforeParagraph: 5, text: "Why location matters more in Bangkok than almost anywhere" },
      { beforeParagraph: 6, text: "Waiting lists at Bangkok's most popular schools" },
      { beforeParagraph: 7, text: "The fee conversation nobody advertises" },
    ],
    relatedSchools: [
      { name: "Bangkok Patana School", slug: "bangkok-patana-school" },
      { name: "Shrewsbury International School Bangkok", slug: "shrewsbury-international-school-bangkok" },
      { name: "International School Bangkok (ISB)", slug: "international-school-bangkok-isb" },
      { name: "Ruamrudee International School (RIS)", slug: "ruamrudee-international-school-ris" },
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
      "On the American side, International School Bangkok (ISB) and Ruamrudee International School (RIS) are the two names worth putting side by side. ISB, founded in 1951, is one of the oldest international schools in the country and occupies a large, self contained campus in Nichada Thani, Nonthaburi, effectively its own suburb, popular with families who want space and a tight knit expat community outside the city center. RIS, founded in 1957 by a group of Redemptorist priests and based in Min Buri on the eastern edge of the city, is one of the largest international schools in Bangkok by enrollment and one of the few that lets your child pick an exit route rather than inheriting one: a US high school diploma with AP courses, or the IB Diploma Programme in the final two years. On fees, RIS starts below ISB in the youngest grades while its senior year figures run higher, so compare the two grade by grade rather than on a headline range. The practical difference for most families is geography, since ISB pulls you toward Nonthaburi in the northwest and RIS toward Min Buri in the east, and in Bangkok that choice shapes where you live as much as where your child studies.",
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

/**
 * Fail the build on article data that would render wrong but not crash.
 *
 * headings and images are positioned by paragraph index, so an index past
 * the end of body simply never renders: the heading silently disappears and
 * the article ships with a missing section. Types cannot catch that, and the
 * page still builds, so it has to be asserted. Duplicate slugs are checked
 * here too, since two articles sharing one would quietly shadow each other
 * in generateStaticParams.
 *
 * Runs at module load, which means during next build.
 */
(function validateArticles() {
  const seen = new Set<string>();

  for (const a of ARTICLES) {
    if (seen.has(a.slug)) {
      throw new Error(`articles.ts: duplicate slug "${a.slug}"`);
    }
    seen.add(a.slug);

    const last = a.body.length - 1;

    for (const h of a.headings ?? []) {
      if (h.beforeParagraph < 0 || h.beforeParagraph > last) {
        throw new Error(
          `articles.ts: "${a.slug}" heading "${h.text}" points at paragraph ` +
            `${h.beforeParagraph}, but body has ${a.body.length} paragraphs ` +
            `(0 to ${last}). The heading would never render.`
        );
      }
    }

    for (const img of a.images ?? []) {
      if (img.afterParagraph < 0 || img.afterParagraph > last) {
        throw new Error(
          `articles.ts: "${a.slug}" image "${img.src}" points at paragraph ` +
            `${img.afterParagraph}, but body has ${a.body.length} paragraphs ` +
            `(0 to ${last}). The image would never render.`
        );
      }
    }
  }
})();
