// Health insurance section. One Insurer per PLACE YOU BUY COVER FROM.
//
// Same shape as the healthcare directory: a typed data file, a controlled
// feature vocabulary so an unrecognised tag fails the build, a filterable
// index and a detail page per entry. "Insurer" is used loosely: brokers and
// the Social Security Office are in here too, because to a family arriving
// in Bangkok they are all answers to the same question.
//
// PRICING RULE, same as the maternity table: a figure only appears if we can
// point at where it came from. Almost every international insurer quotes on
// request only, and on 17 September 2026 we ran the online quote tools for a
// sample family and found that Cigna, Pacific Cross and LUMA all ask for a
// name, email or phone number before showing any price. So those entries say
// "quote only" rather than carrying an estimate. A wrong premium is worse
// than no premium.
//
// SPONSORSHIP: nobody pays to be listed and ordering is alphabetical within
// each type. The `sponsored` field exists so a paid placement can be added
// later without restructuring, and anything carrying it renders a visible
// "Sponsored" label. Never set it on an entry that has not paid, and never
// let it change the editorial text or the order of the price table.
//
// MAINTENANCE: premiums change every year, usually in January. Every entry
// carries lastVerified and every price carries its own checked date.

export type InsurerType =
  | "government"
  | "thai-insurer"
  | "international"
  | "broker";

export const TYPE_LABEL: Record<InsurerType, string> = {
  government: "Government scheme",
  "thai-insurer": "Thai-licensed insurer",
  international: "International insurer",
  broker: "Broker",
};

export const TYPE_LABEL_PLURAL: Record<InsurerType, string> = {
  government: "government schemes",
  "thai-insurer": "Thai-licensed insurers",
  international: "international insurers",
  broker: "brokers",
};

export const TYPE_ORDER: InsurerType[] = [
  "government",
  "thai-insurer",
  "international",
  "broker",
];

/** Controlled vocabulary. Typed so a stray tag fails the build. */
export type Feature =
  | "family-plans"
  | "children-from-birth"
  | "outpatient-option"
  | "maternity-option"
  | "dental-option"
  | "worldwide-cover"
  | "usa-optional"
  | "thailand-only"
  | "direct-billing"
  | "deductible-options"
  | "pre-existing-considered"
  | "lifetime-renewal"
  | "visa-certificate"
  | "compares-insurers";

export const FEATURE_LABEL: Record<Feature, string> = {
  "family-plans": "Family plans",
  "children-from-birth": "Covers babies and young children",
  "outpatient-option": "Outpatient cover available",
  "maternity-option": "Maternity cover available",
  "dental-option": "Dental cover available",
  "worldwide-cover": "Worldwide cover",
  "usa-optional": "USA cover optional",
  "thailand-only": "Thailand only",
  "direct-billing": "Direct billing at Thai hospitals",
  "deductible-options": "Deductible options to lower the premium",
  "pre-existing-considered": "Pre-existing conditions considered",
  "lifetime-renewal": "Lifetime or long-term renewal",
  "visa-certificate": "Visa insurance certificate",
  "compares-insurers": "Compares several insurers",
};

export const ALL_FEATURES = Object.keys(FEATURE_LABEL) as Feature[];

/**
 * "published": the insurer (or its appointed agent) publishes a premium we
 * can cite. "contribution": a statutory contribution, not a premium.
 * "quote-only": we checked and there is no price without a personal quote.
 * "not-applicable": brokers, who do not set prices.
 */
export type PricingStatus =
  | "published"
  | "contribution"
  | "quote-only"
  | "not-applicable";

export interface PriceExample {
  /** Who and what, e.g. "Adult aged 40, 5M baht plan". */
  label: string;
  /** Annual figure in baht, unless `currency` says otherwise. */
  amount: number;
  /** Second figure where the insurer prices men and women differently. */
  amountAlt?: number;
  /** Labels for amount and amountAlt when both are set. */
  amountLabels?: [string, string];
  currency?: "THB" | "USD";
  period: "year" | "month";
  note?: string;
  sourceLabel: string;
  sourceUrl: string;
  checked: string;
}

export interface Plan {
  name: string;
  summary: string;
}

export interface Insurer {
  slug: string;
  name: string;
  /** Brand as people search it, for titles. Defaults to `name`. */
  shortName?: string;
  type: InsurerType;
  /** One line for the directory card. */
  tagline: string;
  /** Paragraphs separated by a blank line. Plain text. */
  description: string;
  /** The honesty box. What we would tell a friend, including the downsides. */
  worthKnowing?: string;
  /** Who this suits, one sentence. Editorial, not a ranking. */
  bestFor: string;
  pros: string[];
  cons: string[];
  features: Feature[];
  plans?: Plan[];
  /** Where the cover applies, in plain words. */
  coverArea?: string;
  /** The Thai company carrying the risk, where the brand is not the insurer. */
  underwriter?: string;
  /** Oldest age at which a new policy can start. */
  maxEntryAge?: string;
  pricing: PricingStatus;
  priceExamples?: PriceExample[];
  /** How to get a price when none is published. */
  quoteNote?: string;
  /**
   * "full": we have read the product documents and the entry reflects them.
   * "overview": the insurer publishes little beyond marketing pages, so the
   * entry says what kind of product it is and no more. Each overview entry
   * says so in its own text. Do not upgrade without doing the reading.
   */
  depth: "full" | "overview";
  website: string;
  phone?: string;
  lastVerified: string;
  /** Paid placement. Unset for everyone today. See the header comment. */
  sponsored?: { since: string; label?: string };
}

const CHECKED = "2026-09-17";

export const INSURERS: Insurer[] = [
  // ------------------------------------------------------------------
  // Government
  // ------------------------------------------------------------------
  {
    slug: "thai-social-security",
    name: "Thai Social Security (Section 33)",
    shortName: "Thai Social Security",
    type: "government",
    tagline:
      "Compulsory if you are on a Thai payroll. Cheap, covers you, and does not cover your children.",
    description:
      "If you work for a Thai-registered employer, you are enrolled in the Social Security Fund under Section 33 whether you plan to use it or not. Both you and your employer contribute 5% of your salary, capped at a wage ceiling that rose to 17,500 baht a month on 1 January 2026, so the most you pay is 875 baht a month. The ceiling is scheduled to rise again to 20,000 baht in 2029 and 23,000 baht in 2032.\n\nIn return you get medical treatment at one registered hospital that you choose when you enrol, and can change once a year. Treatment there that a doctor considers necessary is free, including for pre-existing conditions. The scheme also pays a maternity benefit, a small dental allowance, a child allowance for young children, and income replacement during sickness and unemployment.\n\nIf you leave your job but stay in Thailand, you can usually keep paying in voluntarily under Section 39, provided you have contributed for at least a year and apply within six months of leaving.",
    worthKnowing:
      "Social Security is medical cover for the employee, not for the family. Your spouse and children get no medical treatment from it. It is also tied to one hospital, and the recommended choices tend to be large public or mid-tier private hospitals with long waits, not the international hospitals most expat families use. Treat it as a safety net that you are paying for anyway, and insure your family separately.",
    bestFor:
      "Anyone employed on a Thai payroll, as a safety net for themselves.",
    pros: ["Very cheap, capped at 875 baht a month in 2026", "Covers pre-existing conditions", "Includes maternity, dental and sickness pay benefits"],
    cons: ["No medical cover for your spouse or children", "Tied to one registered hospital, changeable once a year", "Registered hospitals are usually busy public or mid-tier private ones"],
    features: ["thailand-only", "pre-existing-considered"],
    coverArea: "Thailand, at your registered hospital",
    pricing: "contribution",
    priceExamples: [
      {
        label: "Employee contribution at the 2026 wage ceiling",
        amount: 875,
        period: "month",
        note: "5% of salary up to 17,500 baht a month. Your employer pays the same again. Covers the employee only.",
        sourceLabel: "RBA Group, Thailand Social Security 2026",
        sourceUrl: "https://rba-asia.com/news-insights/thailand-social-security-2026/",
        checked: CHECKED,
      },
    ],
    depth: "full",
    website: "https://www.sso.go.th",
    phone: "1506",
    lastVerified: CHECKED,
  },

  // ------------------------------------------------------------------
  // Thai-licensed insurers
  // ------------------------------------------------------------------
  {
    slug: "aia-thailand",
    name: "AIA Thailand",
    shortName: "AIA Health Happy",
    type: "thai-insurer",
    tagline:
      "One of Thailand's largest life insurers. Health cover sold as a rider, with a separate plan for children from 15 days old.",
    description:
      "AIA sells health cover in Thailand as riders, add-on contracts that sit on top of a life policy, through a very large network of agents. The two relevant to families are AIA Health Happy for ages 11 to 75, renewable to 98, and AIA Health Happy Kids for children from 15 days to 10 years old.\n\nBoth come in four annual limits: 1, 5, 15 and 25 million baht. The daily room allowance rises with the plan, from 1,500 baht a night on the smallest to 9,000 baht on the largest, so the plan you pick decides which hospitals you can stay in without topping up. Only the 25 million plan adds outpatient cover, at 2,000 baht a visit for up to 30 visits a year.\n\nThe children's plan offers a deductible of 10,000 or 30,000 baht a year, which makes a large difference to the premium. From age 11 it converts to the adult plan without a deductible.\n\nAIA publishes the product brochures, and its agents publish the premium tables. Those tables are why this is one of the few entries in this section with real numbers.",
    worthKnowing:
      "Premiums for babies and toddlers are the highest a child will ever cost, often higher than a parent's, because that is when children are admitted most. Check the room allowance against the hospital you would actually use: 3,000 baht a night is unlikely to cover a standard room at the big international hospitals. And ask your agent what base life policy the rider has to sit on, because that is an extra premium on top of the figures below.",
    bestFor:
      "Families settled in Thailand who want high-limit hospital cover through a local agent.",
    pros: ["Published premium tables, so you can budget before talking to anyone", "Plans for children from 15 days old", "Annual limits up to 25 million baht, renewable to 98"],
    cons: ["Sold as a rider, so a base life policy adds to the cost", "Outpatient only on the top 25M plan", "Room allowance on the smaller plans is below international hospital rates"],
    features: [
      "family-plans",
      "children-from-birth",
      "thailand-only",
      "direct-billing",
      "deductible-options",
      "lifetime-renewal",
    ],
    plans: [
      {
        name: "AIA Health Happy",
        summary:
          "Ages 11 to 75, renewable to 98. Annual limit 1M, 5M, 15M or 25M baht. Outpatient only on the 25M plan.",
      },
      {
        name: "AIA Health Happy Kids",
        summary:
          "Ages 15 days to 10 years. Same four limits, with a 10,000 or 30,000 baht annual deductible.",
      },
    ],
    coverArea: "Thailand",
    maxEntryAge: "75",
    pricing: "published",
    priceExamples: [
      {
        label: "Adult aged 40, Health Happy 5M baht plan",
        amount: 20800,
        amountAlt: 25100,
        amountLabels: ["Male", "Female"],
        period: "year",
        note: "Rider premium only. A base life policy is required on top.",
        sourceLabel: "AIA agent's published premium table",
        sourceUrl: "https://aia-fa.com/aia-health-happy/",
        checked: CHECKED,
      },
      {
        label: "Child aged 6 to 10, Health Happy Kids 5M plan, 10,000 baht deductible",
        amount: 39400,
        amountAlt: 34500,
        amountLabels: ["Boy", "Girl"],
        period: "year",
        note: "Rider premium only.",
        sourceLabel: "AIA agent's published premium table",
        sourceUrl: "https://aia-fa.com/aia-health-happy-kids/",
        checked: CHECKED,
      },
      {
        label: "Child aged 0 to 5, Health Happy Kids 5M plan, 10,000 baht deductible",
        amount: 73900,
        amountAlt: 64400,
        amountLabels: ["Boy", "Girl"],
        period: "year",
        note: "Rider premium only. The 64,400 figure also appears as the worked example in AIA's own July 2025 brochure.",
        sourceLabel: "AIA Health Happy Kids brochure",
        sourceUrl:
          "https://www.aia.co.th/content/dam/th-wise/forms/th/our-products/aia-health-happy-kids/AIA-Health-Happy-Kids-brochure.pdf",
        checked: CHECKED,
      },
    ],
    depth: "full",
    website: "https://www.aia.co.th/en/our-products/health",
    phone: "1581",
    lastVerified: CHECKED,
  },
  {
    slug: "luma",
    name: "LUMA",
    type: "thai-insurer",
    tagline:
      "Bangkok-based health insurance built for expats, with a local plan and an international one.",
    description:
      "LUMA has been designing and servicing expat health insurance in Thailand since 2012. Its own plans are underwritten by Navakij Insurance, a Thai insurer, and LUMA also arranges cover from AXA, Allianz Ayudhya and Pacific Cross.\n\nLUMA Hi5 is the local plan: a 5 million baht annual limit with a choice of 5,000 or 8,000 baht a night for the room, and optional outpatient, dental, maternity and vision cover on top. It accepts ages 0 to 70, and children under 18 have to be on a parent's policy.\n\nLUMA PRIME is the step up, with annual limits from 10 million to 50 million baht, international cover, direct billing, and renewal guaranteed to age 99.",
    worthKnowing:
      "Hi5's outpatient option comes in two sizes, and the smaller one carries a 50% co-payment, so you pay half of every GP visit yourself. For a family with young children, who generate far more outpatient visits than admissions, that difference matters more than the headline limit. Prices are by quote only, and the online form hands you to a consultant who replies within a business day.",
    bestFor:
      "Expat families who want a local plan with optional outpatient, dental and maternity, designed and serviced in English.",
    pros: ["Built for expats, with English-speaking service in Bangkok", "Hi5 lets you add outpatient, dental, maternity and vision", "PRIME renews to age 99 and includes international cover"],
    cons: ["No published prices", "The smaller Hi5 outpatient option has a 50% co-payment", "Children under 18 must be on a parent's policy"],
    features: [
      "family-plans",
      "children-from-birth",
      "outpatient-option",
      "maternity-option",
      "dental-option",
      "direct-billing",
      "deductible-options",
      "lifetime-renewal",
    ],
    plans: [
      {
        name: "LUMA Hi5",
        summary:
          "5M baht a year, Thailand. Room 5,000 or 8,000 baht a night. Optional outpatient (40,000 baht with 50% co-pay, or 200,000 baht), dental, maternity (200,000 or 300,000 baht) and vision.",
      },
      {
        name: "LUMA PRIME",
        summary:
          "10M to 50M baht a year with international cover and renewal guaranteed to 99.",
      },
    ],
    coverArea: "Hi5: Thailand. PRIME: international",
    underwriter: "Navakij Insurance (LUMA's own plans)",
    maxEntryAge: "70 (Hi5)",
    pricing: "quote-only",
    quoteNote:
      "No published prices. The quote form asks for your details and a consultant replies within 24 business hours.",
    depth: "full",
    website: "https://www.lumahealth.com/health-insurance/thailand/",
    phone: "+66 2 494 3600",
    lastVerified: CHECKED,
  },
  {
    slug: "pacific-cross",
    name: "Pacific Cross Health Insurance",
    shortName: "Pacific Cross",
    type: "thai-insurer",
    tagline:
      "Thai-licensed health specialist with a wide plan range, direct billing at 550+ hospitals and plans for pre-existing conditions.",
    description:
      "Pacific Cross is a Thai-licensed insurer that specialises in health, travel and accident cover, and it is a name expats in Thailand mention often. It sells to Thais and foreigners alike, accepts new applicants up to age 80, offers lifetime renewal, and settles directly with more than 550 hospitals in Thailand and across Asia.\n\nThe range runs from inpatient-focused local plans to full international ones. Maxima (5 million baht) and Maxima Plus (10 million baht) are the local inpatient workhorses. Premier (US$500,000), Standard (US$2 million) and Comprehensive (US$3 million) add outpatient and wider cover. Expat Care, with a 50 million baht annual limit, is designed for people with pre-existing conditions and covers them after a two-year moratorium. Premier Plus meets the 3 million baht requirement for the O-A retirement visa.\n\nDeductibles and removing outpatient cover are the main levers on price, and families get a discount. According to one broker, Pacific Cross did not expect to raise premiums for 2026, after an average 6% increase in 2025.",
    worthKnowing:
      "Pacific Cross does not publish premium tables for family ages, and its online application asks for your name, email and phone number before quoting. Brokers can run comparisons for you. If anyone in the family has a pre-existing condition, Expat Care is worth asking about specifically, since most insurers simply exclude the condition.",
    bestFor:
      "Families who want a Thai-licensed specialist, and anyone with a pre-existing condition to cover.",
    pros: ["Direct billing at 550+ hospitals in Thailand and Asia", "Expat Care covers pre-existing conditions after two years", "New policies accepted up to age 80, with lifetime renewal"],
    cons: ["No published family premiums", "Quote form requires name, email and phone", "A wide plan range makes like-for-like comparison harder"],
    features: [
      "family-plans",
      "outpatient-option",
      "worldwide-cover",
      "direct-billing",
      "deductible-options",
      "pre-existing-considered",
      "lifetime-renewal",
      "visa-certificate",
    ],
    plans: [
      { name: "Maxima / Maxima Plus", summary: "5M or 10M baht a year, inpatient focused, 8,000 or 10,000 baht a night for the room." },
      { name: "Premier", summary: "US$500,000 a year, mid-level cover with an optional treatment-area limit." },
      { name: "Standard", summary: "US$2 million a year, flexible base plan with 20% co-payment options." },
      { name: "Comprehensive", summary: "US$3 million a year, the fullest inpatient and outpatient plan." },
      { name: "Expat Care 1, 2, 3", summary: "50M baht a year, 75M lifetime, pre-existing conditions covered after two years." },
      { name: "Premier Plus", summary: "Meets the O-A retirement visa minimum of 3M baht." },
    ],
    coverArea: "Thailand, Asia or worldwide depending on plan",
    maxEntryAge: "80",
    pricing: "quote-only",
    quoteNote:
      "No published family premiums. The online application requires name, email and phone before a quote.",
    depth: "full",
    website: "https://www.pacificcrosshealth.com/en/all-plans",
    phone: "+66 2 401 9189",
    lastVerified: CHECKED,
  },

  // ------------------------------------------------------------------
  // International insurers
  // ------------------------------------------------------------------
  {
    slug: "allianz-care",
    name: "Allianz Care",
    type: "international",
    tagline:
      "The international health arm of Allianz Partners, sold to individuals, families and employers.",
    description:
      "Allianz Care sells international private medical insurance to individuals and families living abroad, and also sells group cover that employers buy for expat staff. If your employer insures you in Bangkok, it may well be through Allianz Care or one of the other names in this list.\n\nThis is an overview entry. Allianz Care publishes its tables of benefits as documents and quotes by application, and we have not yet read the individual plan documents closely enough to summarise the tiers here.",
    worthKnowing:
      "Do not confuse Allianz Care with Allianz Ayudhya, which is a separate Thai-licensed company selling local policies through agents. The products, prices and networks are different.",
    bestFor:
      "Families who want an international plan from a large global insurer, or whose employer already uses one.",
    pros: ["Large international insurer with individual and group plans", "Optional outpatient, maternity and dental cover"],
    cons: ["No published prices", "Easily confused with Allianz Ayudhya, a separate Thai company"],
    features: ["family-plans", "outpatient-option", "maternity-option", "dental-option", "worldwide-cover"],
    coverArea: "International",
    pricing: "quote-only",
    quoteNote: "Quote by online form or through a broker.",
    depth: "overview",
    website: "https://www.allianzcare.com/en/personal-international-health-insurance.html",
    lastVerified: CHECKED,
  },
  {
    slug: "april-international",
    name: "APRIL International",
    type: "international",
    tagline:
      "French-owned expat health insurer with a long-standing presence in Thailand.",
    description:
      "APRIL International specialises in health insurance for people living outside their home country, and has been active in Thailand for years, both directly and through the major Bangkok brokers.\n\nThis is an overview entry. APRIL does not publish prices, and we have not yet read the plan documents closely enough to summarise the tiers here.",
    bestFor:
      "Expat families comparing international plans through a Bangkok broker.",
    pros: ["Specialist in cover for people living abroad", "Long-standing presence in Thailand"],
    cons: ["No published prices", "We have not yet reviewed the plan documents in detail"],
    features: ["family-plans", "outpatient-option", "maternity-option", "worldwide-cover"],
    coverArea: "International",
    pricing: "quote-only",
    quoteNote: "Quote on request, directly or through a broker.",
    depth: "overview",
    website: "https://www.april-international.com/en/",
    lastVerified: CHECKED,
  },
  {
    slug: "axa-global-healthcare",
    name: "AXA Global Healthcare",
    type: "international",
    tagline:
      "Five levels of international cover, from a low-cost Foundation plan to Prestige.",
    description:
      "AXA Global Healthcare sells international health insurance at five levels of cover, starting with Foundation, which it launched in 2019 as a lower-cost entry point, and rising through Standard and Comprehensive to Prestige and Prestige Plus. Every level includes hospital stays, cancer treatment, and medical evacuation and repatriation. Outpatient treatment and routine dental are optional extras, and the USA can be excluded to bring the price down.\n\nThis is an overview entry. We have not yet read the full benefit tables, so the annual limits for each level are not given here.",
    worthKnowing:
      "AXA Global Healthcare is not the same company as Krungthai-AXA Life, the Thai joint venture that sells local policies through agents and bank branches.",
    bestFor:
      "Families who want to choose a level of international cover and exclude the USA to save money.",
    pros: ["Five levels, from a low-cost Foundation plan to Prestige", "Cancer care and evacuation included at every level", "USA cover can be excluded"],
    cons: ["No published prices", "Not the same company as Krungthai-AXA Life"],
    features: ["family-plans", "outpatient-option", "maternity-option", "dental-option", "worldwide-cover", "usa-optional"],
    plans: [
      { name: "Foundation", summary: "The entry level, launched in 2019." },
      { name: "Standard and Comprehensive", summary: "The middle levels." },
      { name: "Prestige and Prestige Plus", summary: "The top levels." },
    ],
    coverArea: "Worldwide, with or without the USA",
    pricing: "quote-only",
    quoteNote: "Quote online or through a broker.",
    depth: "overview",
    website: "https://www.axaglobalhealthcare.com/en/international-health-insurance/",
    lastVerified: CHECKED,
  },
  {
    slug: "bupa-global",
    name: "Bupa Global",
    type: "international",
    tagline:
      "Premium international health insurance from the UK-founded Bupa group.",
    description:
      "Bupa Global sells international health insurance aimed at the upper end of the market, with high limits and worldwide networks. It is widely used by globally mobile families and is available in Thailand, usually through brokers.\n\nThis is an overview entry. We have not yet read Bupa Global's current plan documents, so no tiers or limits are given here.",
    bestFor:
      "Families who want premium, high-limit international cover and are comparing top-end plans.",
    pros: ["Premium international insurer with worldwide networks"],
    cons: ["No published prices", "Positioned at the expensive end of the market"],
    features: ["family-plans", "worldwide-cover"],
    coverArea: "International",
    pricing: "quote-only",
    quoteNote: "Quote on request, usually through a broker.",
    depth: "overview",
    website: "https://www.bupaglobal.com",
    lastVerified: CHECKED,
  },
  {
    slug: "cigna-global",
    name: "Cigna Healthcare (Cigna Global)",
    shortName: "Cigna Global",
    type: "international",
    tagline:
      "Build-your-own international cover in three tiers, with optional outpatient, evacuation and dental modules.",
    description:
      "Cigna Global Health Options is modular. You choose a core inpatient plan at one of three levels, then add only the modules you want. Silver has a US$1 million annual limit for inpatient and day-patient treatment, Gold US$2 million, and Platinum pays in full. All three include cancer care, mental health support and telehealth.\n\nThe optional modules are International Outpatient (from US$15,000 a year on Silver up to paid in full on Platinum), Medical Evacuation and Repatriation, Health and Wellbeing, and Vision and Dental (annual maximums from US$1,250 to US$5,500). You can choose worldwide cover or worldwide excluding the USA, which makes a large difference to the price.",
    worthKnowing:
      "Because everything beyond inpatient is a separate module, a cheap-looking Cigna quote can be inpatient only. For a family, check that the outpatient module is in the quote before comparing it with anything else. The online quote tool asks for your name before it shows a price.",
    bestFor:
      "Families who want to build international cover module by module.",
    pros: ["Three clear tiers: Silver US$1M, Gold US$2M, Platinum paid in full", "Add only the modules you need", "Worldwide cover with or without the USA"],
    cons: ["Outpatient is a separate module, so cheap quotes can be inpatient only", "The online quote tool asks for your name before any price", "No published prices"],
    features: ["family-plans", "outpatient-option", "dental-option", "worldwide-cover", "usa-optional"],
    plans: [
      { name: "Silver", summary: "US$1M a year inpatient and day-patient." },
      { name: "Gold", summary: "US$2M a year inpatient and day-patient." },
      { name: "Platinum", summary: "Inpatient and day-patient paid in full." },
    ],
    coverArea: "Worldwide, with or without the USA",
    pricing: "quote-only",
    quoteNote: "Online quote tool, which asks for your name first, or through a broker.",
    depth: "full",
    website: "https://www.cignaglobal.com/international-health-plans",
    lastVerified: CHECKED,
  },
  {
    slug: "william-russell",
    name: "William Russell",
    type: "international",
    tagline: "UK-based international health insurer selling direct to expats.",
    description:
      "William Russell sells international health insurance directly to individuals and families living abroad, with an emphasis on online service.\n\nThis is an overview entry. When we checked on 17 September 2026 its quote page was not loading, and we have not yet read the plan documents, so no tiers or prices are given here.",
    bestFor:
      "Families comfortable buying international cover direct and online.",
    pros: ["Sells direct to individuals and families abroad"],
    cons: ["No published prices", "Quote page was not loading when we checked"],
    features: ["family-plans", "worldwide-cover"],
    coverArea: "International",
    pricing: "quote-only",
    quoteNote: "Quote on request.",
    depth: "overview",
    website: "https://www.william-russell.com",
    lastVerified: CHECKED,
  },

  // ------------------------------------------------------------------
  // Brokers
  // ------------------------------------------------------------------
  {
    slug: "aa-insurance-brokers",
    name: "AA Insurance Brokers",
    type: "broker",
    tagline:
      "Long-established licensed Thai broker for expats, in Bangkok and the resort towns.",
    description:
      "AA Insurance Brokers is a licensed Thai insurance broker, licence ว00023/2550, that has served expats in Thailand for more than twenty years. It arranges health insurance from several insurers, alongside car, home and other cover, and lists contacts in Bangkok, Hua Hin, Pattaya, Phuket and Samut Prakan.\n\nA broker does not set prices. It compares policies from the insurers it works with, and is paid commission by the insurer rather than a fee by you, which is worth confirming when you speak to one.",
    bestFor:
      "Families who want a long-established Thai broker, including outside Bangkok, to compare policies.",
    pros: ["Licensed Thai broker, more than twenty years in business", "Contacts in Bangkok, Hua Hin, Pattaya, Phuket and Samut Prakan"],
    cons: ["Does not name the insurers it works with on its homepage", "No published prices"],
    features: ["compares-insurers", "family-plans"],
    pricing: "not-applicable",
    quoteNote: "Quote by online form.",
    depth: "overview",
    website: "https://www.aainsure.net",
    lastVerified: CHECKED,
  },
  {
    slug: "pacific-prime-thailand",
    name: "Pacific Prime Thailand",
    type: "broker",
    tagline:
      "Regional expat insurance broker with a Bangkok office on Ploenchit Road.",
    description:
      "Pacific Prime is an international health insurance broker with an office at One City Centre on Ploenchit Road. It compares plans from insurers including Allianz Ayudhya, APRIL International, AXA and LUMA, and says its broking, claims and renewal help are free of charge to clients.\n\nPacific Prime also publishes an annual cost of international health insurance report. Its most recent figures, for 2024, put the average international plan in Thailand at US$4,695 a year for an individual and US$18,027 for a family, with individual premiums up 31% on the year before.",
    worthKnowing:
      "Brokers are paid by the insurers they place you with, so ask which insurers a broker works with before assuming its comparison covers the whole market. The averages above are Pacific Prime's own figures for the international plans it arranges, which lean towards comprehensive cover, so treat them as the top of a realistic budget rather than a starting point.",
    bestFor:
      "Families who want several international and local quotes compared at once, in central Bangkok.",
    pros: ["Bangkok office on Ploenchit Road", "Says broking, claims and renewal help are free to clients", "Publishes an annual cost-of-insurance report"],
    cons: ["Paid by insurers, so its comparison covers only the insurers it works with", "Its average costs reflect the plans it sells, which lean comprehensive"],
    features: ["compares-insurers", "family-plans"],
    pricing: "not-applicable",
    priceExamples: [
      {
        label: "Average international plan, family, Thailand",
        amount: 18027,
        currency: "USD",
        period: "year",
        note: "2024 average across the international plans Pacific Prime arranges. About 565,000 baht.",
        sourceLabel: "Pacific Prime, health insurance cost in Thailand",
        sourceUrl: "https://www.pacificprime.com/blog/health-insurance-cost-in-thailand.html",
        checked: CHECKED,
      },
      {
        label: "Average international plan, individual, Thailand",
        amount: 4695,
        currency: "USD",
        period: "year",
        note: "2024 average. About 147,000 baht.",
        sourceLabel: "Pacific Prime, health insurance cost in Thailand",
        sourceUrl: "https://www.pacificprime.com/blog/health-insurance-cost-in-thailand.html",
        checked: CHECKED,
      },
    ],
    quoteNote: "Quote by online form or by phone.",
    depth: "full",
    website: "https://www.pacificprime.co.th/international-health-insurance/",
    lastVerified: CHECKED,
  },
];

// Build-time guard, same principle as articles.ts: a duplicate slug or a
// price example without a source fails the build instead of shipping.
{
  const seen = new Set<string>();
  for (const i of INSURERS) {
    if (seen.has(i.slug)) throw new Error(`insurance.ts: duplicate slug ${i.slug}`);
    seen.add(i.slug);
    for (const p of i.priceExamples ?? []) {
      if (!p.sourceUrl) throw new Error(`insurance.ts: unsourced price on ${i.slug}`);
    }
    if (i.pricing === "published" && !(i.priceExamples ?? []).length) {
      throw new Error(`insurance.ts: ${i.slug} is "published" with no price`);
    }
  }
}

export function insurerBySlug(slug: string): Insurer | undefined {
  return INSURERS.find((i) => i.slug === slug);
}

/** Directory order: by type, then alphabetical. Sponsorship never reorders. */
export const INSURERS_SORTED: Insurer[] = [...INSURERS].sort(
  (a, b) =>
    TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type) ||
    a.name.localeCompare(b.name)
);

export const QUOTE_ONLY: Insurer[] = INSURERS_SORTED.filter(
  (i) => i.pricing === "quote-only"
);

export function formatMoney(amount: number, currency: "THB" | "USD" = "THB"): string {
  return currency === "USD"
    ? `US$${amount.toLocaleString("en-US")}`
    : `฿${amount.toLocaleString("en-US")}`;
}

/**
 * The six ways a family in Bangkok ends up covered. Rendered as the cards at
 * the top of /healthcare/insurance. `types` links a card to directory
 * entries, where one exists.
 */
export interface InsuranceOption {
  id: string;
  title: string;
  whoFor: string;
  cost: string;
  good: string;
  watch: string;
  types?: InsurerType[];
}

export const INSURANCE_OPTIONS: InsuranceOption[] = [
  {
    id: "international",
    title: "International expat plan",
    whoFor: "Families on a posting of a few years who may move again.",
    cost: "The most expensive option. Pacific Prime's 2024 average for a family was about US$18,000 a year.",
    good: "High limits, cover outside Thailand, and the policy moves with you when you do.",
    watch: "Outpatient, maternity and dental are often add-ons, so compare like with like.",
    types: ["international"],
  },
  {
    id: "local",
    title: "Thai-licensed local plan",
    whoFor: "Families settled in Thailand who want solid hospital cover for less.",
    cost: "Roughly 20,000 to 25,000 baht a year for a 40-year-old on a 5 million baht plan, before any base life policy. More for young children.",
    good: "Much cheaper, and direct billing with most Thai private hospitals.",
    watch: "Room-rate and per-item caps, Thailand-only cover, and some are riders that need a life policy.",
    types: ["thai-insurer"],
  },
  {
    id: "employer",
    title: "Employer or school group plan",
    whoFor: "Anyone whose job, or whose child's school, provides cover.",
    cost: "Often free to you, sometimes with a charge to add dependants.",
    good: "No medical underwriting, so pre-existing conditions are usually covered.",
    watch: "School policies are thin, and group cover usually ends the day the job does.",
  },
  {
    id: "social-security",
    title: "Thai Social Security",
    whoFor: "Compulsory for anyone on a Thai payroll.",
    cost: "5% of salary, capped at 875 baht a month in 2026.",
    good: "Very cheap, and pre-existing conditions are covered.",
    watch: "Covers the employee only, at one registered hospital. Children get nothing.",
    types: ["government"],
  },
  {
    id: "high-deductible",
    title: "High deductible, pay for the small stuff",
    whoFor: "Families with savings who mainly want protection from a big hospital bill.",
    cost: "A deductible can cut a premium sharply. In one broker's worked Pacific Cross example for a 60-year-old, moving from a 40,000 to a 300,000 baht deductible took about a third off.",
    good: "Bangkok GP visits and dentistry are affordable to pay in cash.",
    watch: "You carry the first slice of every claim year, so keep that amount in the bank.",
  },
  {
    id: "visa",
    title: "Visa-required insurance",
    whoFor: "Mainly the O-A retirement visa (ages 50 and over) and the LTR visa.",
    cost: "O-A needs cover of at least 3 million baht. LTR needs at least US$50,000.",
    good: "Several Thai insurers issue the certificate immigration asks for.",
    watch: "It is a minimum, not a recommendation. The visas most working families use do not carry this requirement, but check yours.",
  },
];
