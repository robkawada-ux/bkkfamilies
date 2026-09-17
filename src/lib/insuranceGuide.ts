// The long-form guide on /healthcare/insurance.
//
// This started life as the article health-insurance-expat-families-bangkok
// (published 14 September 2026) and moved here on 17 September 2026, when
// insurance became its own section. The old URL 301s to this page. The
// original sections are kept in substance and new ones were added around
// them: Social Security, deductibles, visa insurance, and leaving Thailand.
//
// Paragraphs accept the RichText markup: [label](/path), **bold**.

export interface GuideSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export const GUIDE: GuideSection[] = [
  {
    id: "why-it-matters",
    heading: "Why this decision matters more than it looks",
    paragraphs: [
      "Health insurance is the least interesting thing on a relocation checklist and one of the most consequential. The policy you sign in your first month here is one you will probably keep for years, and by the time its limitations matter it is usually too late to change them.",
      "This is not advice on which insurer to use. It is the set of things worth understanding before you choose, and the options above are listed so you can compare them, not ranked.",
    ],
  },
  {
    id: "local-or-international",
    heading: "Local or international",
    paragraphs: [
      "The first real decision is between a local Thai policy and an international one, and they are different products rather than different prices for the same thing.",
      "Local policies are cheaper, sometimes much cheaper. They typically settle directly with most Thai hospitals, which is convenient. Their structure tends to cap individual benefits, a limit per night for a room, a limit per surgery, sometimes a limit per condition, rather than giving you one large annual ceiling. And they generally cannot follow you out of Thailand. Some, like [AIA's](/healthcare/insurance/aia-thailand), are sold as riders that have to sit on a life policy, which adds a premium of its own.",
      "International policies cost considerably more and buy a much higher annual limit, broader cover for serious illness, worldwide or near-worldwide validity, and in many cases a guarantee of lifetime renewal if you take the policy out before a cutoff age. If you move countries again, which expat families frequently do, the policy moves with you and your medical history stays continuous.",
      "The rough rule that holds up: if Thailand is a posting of a few years and you may well move on, an international policy is usually worth the difference. If you are settled here with no plans to leave and the budget is tight, a good local policy covering a defined hospital network is a reasonable choice.",
      "Whichever you choose, check the room allowance and the hospital network against where you would actually go. A cheap policy that pays 3,000 baht a night when the hospital ten minutes from your condo charges double is not cheap.",
    ],
  },
  {
    id: "social-security",
    heading: "If you are employed here: Social Security",
    paragraphs: [
      "Anyone on a Thai payroll is already enrolled in [Social Security](/healthcare/insurance/thai-social-security). You and your employer each pay 5% of your salary, capped at 875 baht a month from January 2026, and in return you get free necessary treatment at one registered hospital.",
      "**It covers the employee, not the family.** Your spouse and children get no medical cover from it. It is also tied to a single hospital, usually a large public or mid-tier private one, rather than the international hospitals most expat families end up using.",
      "So treat Social Security as a safety net you are paying for anyway, useful for yourself if something serious happens, and insure the rest of the family properly.",
    ],
  },
  {
    id: "school-insurance",
    heading: "What your school's insurance actually does",
    paragraphs: [
      "Most international schools in Bangkok require students to have health insurance, and many either include a policy in the fees or offer one as a group option. It is easy to read that as the box being ticked.",
      "It usually is not. School policies are typically thin. Cover is often limited to incidents on school premises or during school activities, the limits are low, and they frequently fail to cover a full hospital bill for anything serious.",
      "Treat the school policy as a supplement to proper family cover, not a replacement for it. Read what it actually covers, specifically whether it extends beyond school grounds, whether it covers outpatient care or only inpatient, and what the limits are. Boarding students are a different case and normally need full private cover regardless of nationality.",
    ],
  },
  {
    id: "maternity",
    heading: "The maternity waiting period",
    paragraphs: [
      "If there is one thing on this page to act on, it is this. **Maternity cover is almost always an add-on with a waiting period of around ten months, and sometimes considerably longer.**",
      "That means a policy bought after conception will not pay for the birth. This is standard across the market rather than one insurer being difficult, and it catches a remarkable number of families, because insurance tends to get sorted in the first chaotic month of a move and maternity feels like a problem for later.",
      "If having a baby in Thailand is even a possibility in the next couple of years, sort maternity cover before you conceive. If you are already pregnant without it, you will be paying for the birth yourself, and our [delivery price comparison](/healthcare/maternity) lists every published hospital package so you can budget properly.",
    ],
  },
  {
    id: "pre-existing",
    heading: "Tell them about pre-existing conditions",
    paragraphs: [
      "Insurers here assess pre-existing conditions individually rather than refusing outright, and the outcome is often a loading on the premium or an exclusion for that specific condition. A few products are built for this: [Pacific Cross](/healthcare/insurance/pacific-cross) Expat Care covers pre-existing conditions after a two-year moratorium.",
      "The temptation is to leave something off the form, particularly something minor or historic. Do not. A non-disclosure discovered later can void the policy from inception, which means not just declining that claim but unwinding the entire contract, potentially years in.",
      "The worst version of this is discovering it during a serious illness, when the policy you have been paying for turns out never to have existed. A premium loading is a far better outcome than that.",
    ],
  },
  {
    id: "deductibles",
    heading: "Deductibles are the budget lever",
    paragraphs: [
      "A deductible is the amount you pay each year before the insurer starts paying. Raising it is the single most effective way to bring a premium down, and in Bangkok it often makes more sense than it would at home.",
      "The reason is that routine care here is affordable to pay in cash. A GP visit, a course of antibiotics or a dental filling will not trouble a family budget, while a week in intensive care or a cancer diagnosis would. A policy with a high deductible protects you from the second kind of bill and leaves you paying for the first.",
      "The effect on price is large. AIA's children's plan offers a 10,000 or 30,000 baht deductible, and for a child aged 6 to 10 on the 5 million baht plan the higher one takes the premium from 39,400 baht to around 22,400. The catch is that you carry that first slice every year, so only choose a deductible you could pay tomorrow without noticing.",
    ],
  },
  {
    id: "direct-billing",
    heading: "Direct billing is worth more than it sounds",
    paragraphs: [
      "Direct billing means the hospital settles with your insurer and you walk out having signed a form, rather than paying a five figure bill and reclaiming it over the following weeks.",
      "The big international hospitals settle directly with most international insurers through their international patient desks. Mid-market Thai private hospitals work with a shorter panel. Small clinics generally do not, so expect to pay and claim. Each hospital in our [hospital directory](/healthcare/hospitals) says which group it falls into.",
      "Confirm your specific policy with your specific hospital before you need it, not on the day. Insurer names on a hospital's list do not always mean every product from that insurer, and an admissions desk at 2am is a bad place to find out.",
    ],
  },
  {
    id: "visa",
    heading: "Visa insurance",
    paragraphs: [
      "A few Thai visas require health insurance as a condition. The O-A long-stay retirement visa, for applicants aged 50 and over, requires cover of at least 3 million baht. The LTR long-term resident visa requires at least US$50,000 of cover. Several Thai insurers, including [Pacific Cross](/healthcare/insurance/pacific-cross), sell plans designed to meet these and issue the certificate immigration asks for.",
      "The visa routes most working families use have not carried this requirement, but rules change, so check the current position for your own visa with the embassy or immigration office. And remember a visa minimum is a floor set by immigration, not a judgement about what a family actually needs.",
    ],
  },
  {
    id: "leaving",
    heading: "What happens when you leave Thailand",
    paragraphs: [
      "This is the question almost nobody asks when buying, and the answer differs sharply by type.",
      "A local Thai policy normally ends when you leave, because it only covers treatment in Thailand. Employer group cover usually ends the day the job does. An international policy can typically carry on, sometimes with a change of area and price, which is one of the strongest arguments for it if another move is likely.",
      "Whatever you have, do not cancel it until the next policy has started. A gap resets waiting periods and can turn a condition diagnosed while you were covered into a pre-existing one that the new insurer excludes.",
      "Families moving to the United States should know that moving there from abroad is normally a qualifying event for a special enrolment period on the [federal marketplace](https://www.healthcare.gov/coverage-outside-open-enrollment/special-enrollment-period/), so you do not have to wait for open enrolment. Check the window before you fly, because it is short.",
    ],
  },
  {
    id: "checklist",
    heading: "What to check before you sign",
    paragraphs: [
      "Get clear answers on the annual limit, and whether the structure is one overall ceiling or a set of per-item caps, including the nightly room allowance.",
      "Check whether outpatient care is included or whether the policy is inpatient only, which matters enormously for families, since children generate far more outpatient visits than hospital admissions.",
      "Check the hospital network, the direct billing arrangements, the maternity waiting period even if maternity is not on your mind, and what happens to the policy if you leave Thailand or want to keep it into older age.",
      "Check whether a local policy has to sit on a life policy, and if so what that costs, because the headline health premium will not include it.",
      "And check whether cover renews for life or whether the insurer can decline to renew you after a claim, which is the difference between insurance and a year of good luck.",
    ],
  },
];

export const INSURANCE_FAQ: { question: string; answer: string }[] = [
  {
    question: "How much does health insurance cost for a family in Bangkok?",
    answer:
      "It depends mostly on whether you choose local or international cover. On AIA's published rates, a 40-year-old on a 5 million baht local plan pays about 20,000 to 25,000 baht a year and a child aged 6 to 10 about 35,000 to 39,000, before any base life policy, so two parents and two children in that age band land at around 120,000 baht. Pacific Prime's 2024 average for an international family plan in Thailand was US$18,027, about 565,000 baht. Deductibles and dropping outpatient cover bring both figures down.",
  },
  {
    question: "Do international schools in Bangkok require health insurance?",
    answer:
      "Most require it for foreign passport holders, and boarding students normally need full private medical insurance regardless of nationality. Many schools include a policy in the fees or offer a group option, but the cover is usually thin, often limited to incidents on school premises, with low limits that frequently fail to cover a full hospital bill. Treat it as a supplement to proper family cover rather than a replacement.",
  },
  {
    question: "Is local or international health insurance better in Thailand?",
    answer:
      "They are different products. Local policies are cheaper, settle directly with most Thai hospitals, tend to cap individual benefits rather than offering one large annual limit, and cannot follow you out of Thailand. International policies cost more and buy higher limits, broader serious-illness cover, worldwide validity and often a lifetime renewal guarantee. If Thailand is a posting of a few years, international usually justifies the difference. If you are settled here on a tight budget, a good local policy covering a network you would actually use is reasonable.",
  },
  {
    question: "Does Thai Social Security cover my children?",
    answer:
      "No. Social Security gives medical cover to the employee who contributes, at one registered hospital. It pays a small child allowance for young children but provides no medical treatment for a spouse or children, so the rest of the family needs its own insurance.",
  },
  {
    question: "Does health insurance in Thailand cover pregnancy?",
    answer:
      "Only as an add-on, and almost always with a waiting period of around ten months or longer, so a policy bought after you conceive will not pay for the birth. This is standard across the market. If having a baby in Thailand is a possibility in the next couple of years, arrange maternity cover before conceiving rather than after.",
  },
  {
    question: "Should I declare pre-existing conditions?",
    answer:
      "Yes, always. Insurers in Thailand assess them case by case and the usual outcome is a premium loading or an exclusion for that condition. Leaving something off the form can void the policy from inception, which unwinds the whole contract rather than just declining one claim, and it tends to surface during a serious illness. A loading is a much better outcome than a policy that turns out never to have existed.",
  },
  {
    question: "What is direct billing and does my hospital do it?",
    answer:
      "Direct billing means the hospital settles with your insurer and you sign rather than paying up front and reclaiming. The large international hospitals settle directly with most international insurers through their international patient desks, mid-market Thai private hospitals work with a shorter panel, and small clinics usually do not. Confirm your specific policy with your specific hospital in advance, because an insurer appearing on a hospital's list does not always mean every product from that insurer is covered.",
  },
  {
    question: "Why are there no prices for Cigna, Allianz, Bupa and the others?",
    answer:
      "Because they do not publish any. We ran the online quote tools for a sample family, and the ones that worked asked for a name, email or phone number before showing a price. We would rather show that gap than fill it with an estimate. A broker can run several quotes for you at once, and if you get a quote you are happy to share, send it over.",
  },
];
