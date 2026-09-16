// Healthcare directory. One Facility per PLACE YOU GO.
//
// Unlike camps, where a parent shops for a specific bookable week, a family
// choosing healthcare is choosing a building: where do I deliver, where do I
// take a feverish four year old at 11pm, who will my insurer pay directly.
// So the directory filters on facilities, not on services, and services are
// tags carried by the facility.
//
// The two views that matter most are the maternity filter and the paediatric
// filter. Both are just this list with a service tag applied, which is why
// maternity and paediatric detail live in their own optional blocks rather
// than being smeared across the top-level fields.
//
// MAINTENANCE: prices and phone numbers rot faster than anything else on
// this site. Every facility carries lastVerified, and the maternity block
// carries its own because package prices change on a different cycle from
// the rest of the entry. See isStale and STALE_AFTER_DAYS.
//
// EDITORIAL: nothing here is medical advice and no facility pays to be
// listed. Where a hospital does not publish a price we say so rather than
// estimating, because a wrong number on a maternity package is worse than
// no number at all. Every price below was read from the hospital's own
// published package page, and packageUrl is the receipt.

export type FacilityType =
  | "international-hospital"
  | "private-hospital"
  | "public-hospital"
  | "specialist-hospital"
  | "clinic"
  | "dental";

/**
 * Controlled vocabulary. Typed as a union so an unrecognised tag fails the
 * build rather than silently producing a filter option nobody selected.
 */
export type Service =
  | "maternity"
  | "nicu"
  | "fertility"
  | "paediatrics"
  | "paediatric-emergency"
  | "developmental-paediatrics"
  | "vaccinations"
  | "emergency-24h"
  | "family-medicine"
  | "mental-health"
  | "allergy"
  | "dermatology"
  | "physiotherapy"
  | "travel-medicine"
  | "dental"
  | "paediatric-dentistry"
  | "orthodontics";

/**
 * How much of the insurance admin the facility absorbs. "most" means the
 * international desk settles directly with the major expat insurers;
 * "some" means a short panel; "none" means pay and claim back.
 */
export type DirectBilling = "most" | "some" | "none" | "unknown";

/**
 * Why a hospital has no price in the comparison table. These are not the
 * same thing and the table must not conflate them: "on-enquiry" is a choice
 * the hospital made, "unverified" is unfinished work on our side.
 */
export type MaternityPricing = "published" | "on-enquiry" | "unverified";

export interface MaternityInfo {
  /** Defaults to "published" when packageFrom is set, "unverified" when not. */
  pricing?: MaternityPricing;
  /** Baht, published package for an uncomplicated vaginal delivery. */
  packageFrom?: number;
  /** Baht, top of the published range, normally the caesarean package. */
  packageTo?: number;
  /** What the package does and does not cover. Quoted fairly, not sold. */
  packageNote?: string;
  /** Where the price was read. The receipt for the number above. */
  packageUrl?: string;
  /** 2 = special care, 3 = full intensive care including ventilation. */
  nicuLevel?: 2 | 3;
  /** Whether a partner can stay overnight in the room. Asked constantly. */
  partnerCanStay?: boolean;
  waterBirth?: boolean;
  /** Vaginal birth after caesarean. Several Bangkok hospitals decline it. */
  vbacSupported?: boolean;
  /** Package prices move independently of the rest of the entry. */
  lastVerified: string;
}

export interface PaediatricInfo {
  /** A children's ER with its own entrance, not the adult ER with a nurse. */
  separateChildrensEr?: boolean;
  /** Opening hours of the children's service, when it is not 24h. */
  erHours?: string;
  /** Assessment and therapy for development, not just acute illness. */
  developmentalServices?: boolean;
  note?: string;
  lastVerified: string;
}

export interface Facility {
  slug: string;
  name: string;
  /** Thai name, where it helps a taxi driver or a Grab pin. */
  thaiName?: string;
  type: FacilityType;
  /** Bangkok district or well-known neighbourhood. Drives the area filter. */
  area: string;
  address?: string;
  /** Nearest BTS, MRT or ARL station, phrased as a parent would say it. */
  nearestTransit?: string;
  /**
   * Facility-supplied image, path under /public. Only with explicit
   * permission, same rule as camps and schools. No scraping.
   */
  photo?: string;
  photoAlt?: string;
  photoCredit?: string;
  photoCaption?: string;
  description: string;
  /** The honesty box. What we would tell a friend, including the downsides. */
  worthKnowing?: string;
  services: Service[];
  /** Languages reliably available, beyond Thai. */
  languages?: string[];
  directBilling?: DirectBilling;
  directBillingNote?: string;
  /** Joint Commission International accreditation. */
  jciAccredited?: boolean;
  maternity?: MaternityInfo;
  paediatrics?: PaediatricInfo;
  website?: string;
  email?: string;
  phone?: string;
  /** Separate emergency or ambulance line, where one is published. */
  emergencyPhone?: string;
  lineId?: string;
  facebook?: string;
  lastVerified: string;
}

/**
 * Display labels for the controlled vocabularies.
 *
 * These MUST live here rather than in the directory component. Next replaces
 * a "use client" module's exports with client references when a server
 * component imports them, so a label map defined in the client component
 * silently resolves to undefined on every server-rendered page. That shipped
 * once and produced empty service pills and nameless MedicalProcedure
 * entries in the structured data.
 */
export const SERVICE_LABEL: Record<Service, string> = {
  maternity: "Maternity",
  nicu: "Neonatal intensive care",
  fertility: "Fertility",
  paediatrics: "Paediatrics",
  "paediatric-emergency": "Children's emergency",
  "developmental-paediatrics": "Developmental",
  vaccinations: "Vaccinations",
  "emergency-24h": "24h emergency",
  "family-medicine": "Family medicine",
  "mental-health": "Mental health",
  allergy: "Allergy",
  dermatology: "Dermatology",
  physiotherapy: "Physiotherapy",
  "travel-medicine": "Travel medicine",
  dental: "Dental",
  "paediatric-dentistry": "Children's dentistry",
  orthodontics: "Orthodontics",
};

export const TYPE_LABEL: Record<FacilityType, string> = {
  "international-hospital": "International hospital",
  "private-hospital": "Private hospital",
  "public-hospital": "Public hospital",
  "specialist-hospital": "Specialist hospital",
  clinic: "Clinic",
  dental: "Dental",
};

/** Thailand's national emergency medical number. Surfaced on every page. */
export const EMERGENCY_NUMBER = "1669";

export const FACILITIES: Facility[] = [
  {
    slug: "bumrungrad-international-hospital",
    name: "Bumrungrad International Hospital",
    type: "international-hospital",
    area: "Watthana",
    address: "33 Sukhumvit 3 (Soi Nana Nuea), Watthana, Bangkok 10110",
    nearestTransit: "BTS Nana, about five minutes on foot up Soi 3",
    description:
      "The hospital most people outside Thailand have heard of, and for many expat families the default first stop. Bumrungrad runs at the scale of an airport terminal: interpreters in dozens of languages, a dedicated international floor, and a paediatrics centre that handles everything from a routine vaccination to complex specialist care. The machinery for foreign patients is the most practised in the country, which is exactly what you want at 2am in your first year here and exactly what you are paying for.",
    worthKnowing:
      "Bumrungrad is the most expensive of the mainstream options, and the delivery packages show it: 139,000 baht for a normal birth against 110,400 at Bangkok Hospital for the same thing. The gap buys the most practised international patient operation in the country rather than better obstetrics. Note also that the package prices are published as images rather than text on Bumrungrad's site, which is why most price comparison articles you will find either omit them or quote figures years out of date. Families who use Bumrungrad for everything tend to find routine paediatric visits cost noticeably more than the same visit at a good local private hospital.",
    services: [
      "maternity",
      "nicu",
      "fertility",
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
      "allergy",
      "dermatology",
      "travel-medicine",
      "dental",
    ],
    languages: ["English", "Japanese", "Arabic", "Mandarin", "German"],
    directBilling: "most",
    directBillingNote:
      "Direct settlement with most international insurers through the international patient desk. Confirm your specific policy before admission rather than on the day.",
    jciAccredited: true,
    maternity: {
      packageFrom: 139000,
      packageTo: 249000,
      packageNote:
        "Four published packages: normal delivery 139,000 baht over two nights, normal delivery with epidural block 165,000 over two nights, caesarean 169,000 over three nights, and twin caesarean 249,000 over three nights. Published as valid to 31 December 2026. Includes obstetrician and paediatrician fees, maternity accommodation, newborn screening for hypothyroidism and metabolic disorders, newborn hearing screening, pulse oximetry screening for congenital heart disease, and BCG and first hepatitis B vaccines. Each package covers a single uncomplicated birth. Read the complication clause carefully: if a complication affects the baby but not the mother, 15,000 baht is deducted from the package and all charges for the baby and the paediatrician revert to standard rates. Vaginal birth after caesarean is outside the package.",
      packageUrl: "https://www.bumrungrad.com/en/packages/normal-delivery",
      partnerCanStay: true,
      lastVerified: "2026-09-14",
    },
    paediatrics: {
      separateChildrensEr: false,
      note: "Paediatrics runs as a dedicated centre rather than a separate children's hospital, and out of hours children go through the main emergency department.",
      lastVerified: "2026-09-14",
    },
    website: "https://www.bumrungrad.com",
    phone: "+66 2066 8888",
    emergencyPhone: "+66 2011 5222, or 1378 within Thailand",
    lastVerified: "2026-09-14",
  },
  {
    slug: "samitivej-sukhumvit-hospital",
    name: "Samitivej Sukhumvit Hospital",
    type: "international-hospital",
    area: "Watthana",
    address: "133 Sukhumvit 49, Khlong Tan Nuea, Watthana, Bangkok 10110",
    nearestTransit: "BTS Thong Lor or Phrom Phong, then a short taxi up Soi 49",
    description:
      "The hospital the Sukhumvit international school crowd actually uses, and the one most often named in the Facebook group. Samitivej sits in the middle of the expat residential corridor, which is half its appeal, and it has built its reputation on children's and women's health specifically rather than on medical tourism generally. Paediatricians who speak English, Japanese and Arabic, walk-in appointments that usually work, and a children's wing that feels designed for children rather than retrofitted.",
    worthKnowing:
      "Convenience is the product here and it is priced accordingly, though it still undercuts Bumrungrad for routine visits. The Sukhumvit campus is the one families reach for, but the serious paediatric firepower, the PICU, the children's emergency department and the specialist units, is out at the Srinakarin campus rather than on Soi 49. Worth knowing before you drive to the wrong one with a sick child.",
    services: [
      "maternity",
      "nicu",
      "fertility",
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
      "allergy",
      "dermatology",
      "travel-medicine",
    ],
    languages: ["English", "Japanese", "Arabic"],
    directBilling: "most",
    jciAccredited: true,
    maternity: {
      packageFrom: 110000,
      packageTo: 230000,
      packageNote:
        "Four published packages. Platinum natural birth 110,000 baht for three nights, Platinum caesarean 135,500 for four nights, Exclusive natural birth 170,000 for four nights, Exclusive caesarean 230,000 for six nights. All include physician fees, medication, lab work, newborn vaccinations and lactation support. Prices published as valid to 31 December 2026. Elective surgery is not scheduled between 9pm and 7am, and packages cannot be combined with other promotions.",
      packageUrl:
        "https://www.samitivejhospitals.com/package/detail/childbirth-delivery-packages-svh",
      partnerCanStay: true,
      lastVerified: "2026-09-14",
    },
    paediatrics: {
      separateChildrensEr: false,
      note: "General paediatrics and walk-in consultations on site. The dedicated children's emergency department and intensive care are at the Srinakarin campus.",
      lastVerified: "2026-09-14",
    },
    website: "https://www.samitivejhospitals.com",
    phone: "+66 2022 2222",
    lastVerified: "2026-09-14",
  },
  {
    slug: "samitivej-international-childrens-hospital",
    name: "Samitivej International Children's Hospital",
    type: "specialist-hospital",
    area: "Suan Luang",
    address:
      "Samitivej Srinakarin campus, 488 Srinagarindra Road, Suan Luang, Bangkok 10250",
    nearestTransit:
      "No convenient rail link. Roughly 20 minutes by car from Suvarnabhumi and 30 or more from Sukhumvit depending on traffic",
    description:
      "Thailand's only private hospital built entirely for children, opened in March 2025 on the Samitivej Srinakarin campus. Eight floors and 111 beds, with private PICU and NICU rooms, a hybrid operating theatre for minimally invasive surgery, and separate air handling for infectious and non-infectious zones. The paediatric emergency department runs 24 hours with its own paediatricians rather than adult emergency doctors covering children, and there is a paediatric ground and air transport service. For a seriously ill child this is the most capable private facility in the city.",
    worthKnowing:
      "The location is the catch and it is a real one. From most of the international school corridor this is a long drive, and in the wrong traffic it is a very long drive, which is worth thinking through now rather than in an emergency. The trade is simple: Sukhumvit for convenience and routine care, Srinakarin when it is serious. Families in Bang Na, On Nut and the eastern suburbs get the best of it.",
    services: [
      "paediatrics",
      "paediatric-emergency",
      "developmental-paediatrics",
      "nicu",
      "vaccinations",
      "emergency-24h",
      "physiotherapy",
    ],
    languages: ["English", "Japanese", "Arabic"],
    directBilling: "most",
    paediatrics: {
      separateChildrensEr: true,
      erHours: "24 hours",
      developmentalServices: true,
      note: "Paediatric emergency department staffed by paediatricians around the clock, with PICU, NICU, a burns unit and paediatric surgery on site. Rehabilitation includes robot-assisted gait training, and there are dedicated services for epilepsy, neurological conditions and developmental delay.",
      lastVerified: "2026-09-14",
    },
    website: "https://www.samitivejhospitals.com/children-hospital",
    phone: "+66 2022 2222 press 1",
    emergencyPhone: "+66 2378 9420",
    lastVerified: "2026-09-14",
  },
  {
    slug: "bnh-hospital",
    name: "BNH Hospital",
    type: "international-hospital",
    area: "Bang Rak",
    address: "9/1 Convent Road, Silom, Bang Rak, Bangkok 10500",
    nearestTransit: "BTS Sala Daeng or MRT Si Lom, a few minutes down Convent Road",
    description:
      "Bangkok Nursing Home opened in 1898 and is the oldest private hospital in Thailand, which shows in the best way: it is small, personal and unhurried in a city where private healthcare often is not. The maternity service is its best known offering among expat families, and the draw is continuity, you see the same obstetrician through the pregnancy and that person delivers you. For families in Silom and Sathorn it is also simply the nearest good option.",
    worthKnowing:
      "BNH does not publish delivery package prices, so you will need to call the Women's Health Centre for a quote. Being small cuts both ways: the experience is more personal than the big international hospitals, but the range of paediatric sub-specialists is narrower, and a complex case may be referred on. Excellent for a straightforward pregnancy and routine family care, less so as a one-stop hospital for everything.",
    services: [
      "maternity",
      "nicu",
      "fertility",
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
    ],
    languages: ["English"],
    directBilling: "most",
    maternity: {
      pricing: "on-enquiry",
      packageNote:
        "BNH markets an all-inclusive maternity package but does not publish the price online, directing enquiries to staff instead. Call the Women's Health Centre on +662 022 0700 extension 4455 or 4456 for a written quote.",
      packageUrl: "https://www.bnhhospital.com/delivery-care/",
      partnerCanStay: true,
      lastVerified: "2026-09-14",
    },
    paediatrics: {
      separateChildrensEr: false,
      note: "Paediatric care built around seeing the same doctor each visit rather than whoever is on rota.",
      lastVerified: "2026-09-14",
    },
    website: "https://www.bnhhospital.com",
    phone: "+662 022 0700",
    emergencyPhone: "+662 632 1000",
    lastVerified: "2026-09-14",
  },
  {
    slug: "medpark-hospital",
    name: "MedPark Hospital",
    type: "international-hospital",
    area: "Khlong Toei",
    address: "3333 Rama IV Road, Khlong Toei, Bangkok 10110",
    nearestTransit:
      "MRT Khlong Toei exit 2, or MRT Queen Sirikit National Convention Centre exit 2 through The PARQ",
    description:
      "The newest of the big private hospitals and the most transparent about money, which is why it is worth a look even if you have never heard of it. MedPark publishes its delivery packages as a straightforward price list with the number of nights and the room type attached, something most of its competitors will not do. The maternity ward is on the sixteenth floor with river and lake views, and the building is new enough that everything still works.",
    worthKnowing:
      "The published prices carry a condition worth reading: they are reserved for Thai citizens and expatriates residing in Thailand, they require payment in advance in full, and they are non-refundable in all circumstances. The exclusions are also unusually specific, phototherapy for jaundice and any treatment of newborn complications are outside the package, and jaundice is common enough that it is worth budgeting for rather than being surprised by.",
    services: [
      "maternity",
      "nicu",
      "fertility",
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
      "allergy",
      "dermatology",
    ],
    languages: ["English"],
    directBilling: "most",
    maternity: {
      packageFrom: 118690,
      packageTo: 229000,
      packageNote:
        "Normal delivery 118,690 baht for two nights or 209,000 for five, caesarean 133,900 for three nights or 229,000 for five, twin caesarean 209,000 for three nights, all in an Executive room. Includes doctor fees, ward accommodation, newborn BCG, hepatitis B and vitamin K, birth certificate processing and lactation counselling. The five-night packages add an infant vaccination package covering one to eighteen months. Excludes phototherapy for jaundice, treatment of newborn complications, and personal items. Published as valid to 31 December 2026.",
      packageUrl:
        "https://www.medparkhospital.com/en-US/packages/labour-delivery-program",
      partnerCanStay: true,
      lastVerified: "2026-09-14",
    },
    paediatrics: {
      separateChildrensEr: false,
      lastVerified: "2026-09-14",
    },
    website: "https://www.medparkhospital.com",
    phone: "+662 023 3333",
    emergencyPhone: "+662 090 3000",
    lastVerified: "2026-09-14",
  },
  {
    slug: "bangkok-hospital-headquarters",
    name: "Bangkok Hospital (Soi Soonvijai)",
    type: "international-hospital",
    area: "Huai Khwang",
    address: "2 Soi Soonvijai 7, New Petchburi Road, Huai Khwang, Bangkok 10310",
    nearestTransit: "MRT Phetchaburi or ARL Makkasan, then a short taxi",
    description:
      "The flagship of the largest private hospital group in Thailand, and a genuine full-service hospital rather than a clinic with a good marketing department. It runs a dedicated children's health centre alongside combined paediatric and neonatal intensive care operating 24 hours, with ground and air emergency transport. Delivery packages are published openly, including an unusual tubal ligation add-on price for families who know they are finished.",
    worthKnowing:
      "The campus is large and spread across several buildings, and first visits often involve more walking and more desk-to-desk navigation than you expect. The children's intensive care is strong, but there is no separate paediatric emergency entrance, so out of hours a child goes through the general emergency department. The ELITE maternity packages are roughly double the standard ones and buy a seven-night stay rather than better clinical care.",
    services: [
      "maternity",
      "nicu",
      "fertility",
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
      "mental-health",
      "allergy",
      "dermatology",
      "physiotherapy",
    ],
    languages: ["English", "Arabic", "Japanese", "Mandarin"],
    directBilling: "most",
    jciAccredited: true,
    maternity: {
      packageFrom: 110400,
      packageTo: 288000,
      packageNote:
        "Normal labour 110,400 baht for two nights, caesarean 151,800 for three nights, caesarean twins 240,000 for three nights. The ELITE packages run seven nights at 262,200 for a normal delivery and 288,000 for a caesarean. Tubal ligation after delivery is a separate 38,000. Published as valid to 31 December 2026. Room types and detailed inclusions are not published, so ask.",
      packageUrl:
        "https://www.bangkokhospital.com/en/bangkok/package/obstetric-delivery-packages",
      nicuLevel: 3,
      partnerCanStay: true,
      lastVerified: "2026-09-14",
    },
    paediatrics: {
      separateChildrensEr: false,
      developmentalServices: true,
      note: "Combined paediatric and neonatal intensive care running 24 hours, covering preterm infants, congenital conditions and post-surgical care, with ground and air transport. Children are seen through the general emergency department out of hours.",
      lastVerified: "2026-09-14",
    },
    website: "https://www.bangkokhospital.com",
    phone: "+662 310 3005",
    lastVerified: "2026-09-14",
  },
  {
    slug: "praram-9-hospital",
    name: "Praram 9 Hospital",
    type: "private-hospital",
    area: "Huai Khwang",
    address: "99 Rama IX Road, Bang Kapi, Huai Khwang, Bangkok 10310",
    nearestTransit: "MRT Phetchaburi exit 1, with a free shuttle van from the station",
    description:
      "A solid mid-market private hospital that expat families in the Rama 9 and Ratchada corridor use as their everyday option, with an international desk and dedicated phone lines for foreign patients. Good for routine paediatric visits, vaccinations and the ordinary run of childhood illness without the international-hospital surcharge, and the free shuttle from the MRT is more useful than it sounds when you are carrying a sick toddler.",
    worthKnowing:
      "Less English signage and fewer interpreters than the Sukhumvit international hospitals, so the experience leans more Thai-hospital than concierge. The dedicated expat line is the shortcut, use it rather than the main switchboard.",
    services: [
      "maternity",
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
      "fertility",
    ],
    languages: ["English", "Mandarin", "Arabic"],
    directBilling: "some",
    paediatrics: {
      separateChildrensEr: false,
      lastVerified: "2026-09-14",
    },
    website: "https://praram9.com/en/",
    phone: "1270, or +66 63 329 5449 for the expat line",
    lastVerified: "2026-09-14",
  },
  {
    slug: "phyathai-2-hospital",
    name: "Phyathai 2 Hospital",
    type: "private-hospital",
    area: "Phaya Thai",
    address: "943 Phahonyothin Road, Samsen Nai, Phaya Thai, Bangkok 10400",
    nearestTransit: "BTS Victory Monument, a short walk or one stop by taxi",
    description:
      "A 550-bed private hospital near Victory Monument handling around 50,000 outpatients a month, and the practical choice for families living in Ari, Sanam Pao and the northern stretch of the BTS. Full range of specialties including paediatrics, at prices well below the Sukhumvit international hospitals.",
    worthKnowing:
      "Busy, and it feels it. Wait times at peak hours are longer than at the boutique international hospitals, and the English-language experience is patchier depending on which department you land in. Fine for routine care if you are nearby, and the emergency line is worth saving.",
    services: [
      "maternity",
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
    ],
    languages: ["English"],
    directBilling: "some",
    paediatrics: {
      separateChildrensEr: false,
      lastVerified: "2026-09-14",
    },
    website: "https://www.phyathai.com/en/pyt2",
    phone: "02 617 2444",
    emergencyPhone: "1772",
    lastVerified: "2026-09-14",
  },
  {
    slug: "vichaiyut-hospital",
    name: "Vichaiyut Hospital",
    type: "private-hospital",
    area: "Phaya Thai",
    address: "Sethsiri Road, Phaya Thai, Bangkok 10400",
    nearestTransit: "BTS Sanam Pao or Victory Monument",
    description:
      "A long-established private hospital in the Phaya Thai cluster, and the cheapest published delivery package of any hospital in this directory by a wide margin. If budget is the binding constraint and the pregnancy is straightforward, this is the number to compare everything else against.",
    worthKnowing:
      "The low headline price comes with conditions that matter. The package covers a single uncomplicated baby only, prenatal care is excluded entirely, and if complications such as pre-eclampsia or insulin-dependent gestational diabetes arise you revert to standard rates with a 10 percent discount rather than staying inside the package. Read the terms properly before treating this as a like-for-like comparison with the all-inclusive packages elsewhere.",
    services: [
      "maternity",
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
    ],
    languages: ["English"],
    directBilling: "some",
    maternity: {
      packageFrom: 63800,
      packageNote:
        "One published childbirth programme at 63,800 baht, covering delivery of a single uncomplicated baby and postpartum care, with a membership card giving 10 percent off outpatient and inpatient services. Prenatal care, take-home medication and supplies are excluded. Mothers may upgrade from normal to caesarean if needed. Published as valid from 30 December 2025 to 31 December 2026. The page does not break the price down by delivery type or nights, so confirm what you are actually buying.",
      packageUrl:
        "https://www.vichaiyut.com/en/healthpackage/delivery-package/pm313-24",
      lastVerified: "2026-09-14",
    },
    website: "https://www.vichaiyut.com/en/",
    phone: "0 2265 7777 for the Women's Health Centre",
    lastVerified: "2026-09-14",
  },
  {
    slug: "nakornthon-hospital",
    name: "Nakornthon Hospital",
    type: "private-hospital",
    area: "Bang Khun Thian",
    address: "1 Soi Phra Ram 2 Soi 56, Samae Dam, Bang Khun Thian, Bangkok 10150",
    nearestTransit: "No rail link. Car access from Rama II Road",
    description:
      "Out on Rama II and well away from the expat corridor, but included here because it publishes the clearest tiered delivery pricing in the city and the numbers are roughly half what the Sukhumvit hospitals charge. Three tiers for each delivery type, so you can see exactly what an extra 20,000 baht buys.",
    worthKnowing:
      "Location rules this out for most international school families, and English-language support is more limited than anywhere else in this list. It earns its place as a price benchmark and as a real option for families living on the Thonburi side. Note the 7,000 baht surcharge for an elective caesarean scheduled between 10pm and 7:59am, and the BMI 35 exclusion.",
    services: [
      "maternity",
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
    ],
    languages: ["English"],
    directBilling: "some",
    maternity: {
      packageFrom: 48900,
      packageTo: 99900,
      packageNote:
        "Three tiers. Perfect 48,900 baht for a normal delivery over two nights and 72,900 for a caesarean over three, Premium 58,900 and 82,900, Platinum 75,900 and 99,900. Includes room and meals for mother and baby, nursing and physician fees, medication, standard labs, and newborn jaundice, thyroid, blood typing, hearing and vaccination screening. Excludes infant complications, maternal complications, stays beyond the set duration, and a BMI above 35. An elective caesarean booked between 10pm and 7:59am adds 7,000 baht. Published as valid to 31 December 2026.",
      packageUrl: "https://en.nakornthon.com/package/detail/delivery-package",
      lastVerified: "2026-09-14",
    },
    website: "https://en.nakornthon.com",
    lastVerified: "2026-09-14",
  },
  {
    slug: "nonthavej-hospital",
    name: "Nonthavej Hospital",
    thaiName: "โรงพยาบาลนนทเวช",
    type: "private-hospital",
    area: "Nonthaburi",
    address: "432 Ngamwongwan Road, Bang Khen, Mueang Nonthaburi, Nonthaburi 11000",
    nearestTransit: "No direct rail link, car access from Ngamwongwan Road",
    description:
      "A long-established private hospital in Nonthaburi with a dedicated pregnancy centre covering pre-pregnancy planning, antenatal care, delivery and postpartum support, plus a neonatal intensive care unit staffed by neonatologists. It matters to this directory mostly for geography: it is one of the main private hospitals serving Nonthaburi, which is where a large number of international school families live, particularly around Nichada Thani.",
    worthKnowing:
      "This is a Thai private hospital rather than an international one, so expect less English and less hand-holding than at the Sukhumvit hospitals, and expect to pay considerably less for the same routine care. It does not publish delivery package prices online, so call the pregnancy centre for a quote. For families out in Nonthaburi it is the practical everyday option, and the drive to Sukhumvit in an emergency is long enough that knowing what is nearby genuinely matters.",
    services: [
      "maternity",
      "nicu",
      "fertility",
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
    ],
    languages: ["English"],
    directBilling: "some",
    maternity: {
      pricing: "on-enquiry",
      packageNote:
        "Nonthavej runs a dedicated pregnancy centre with antenatal classes, 4D ultrasound, high-risk pregnancy care and a NICU with neonatologists, but does not publish package prices online. Call for a quote, and ask what prenatal care costs separately from the delivery.",
      packageUrl:
        "https://www.nonthavej.co.th/quality-pregnancy-center-section-EN.php",
      lastVerified: "2026-09-14",
    },
    paediatrics: {
      separateChildrensEr: false,
      lastVerified: "2026-09-14",
    },
    website: "https://www.nonthavej.co.th",
    email: "contactus@nonthavej.co.th",
    phone: "+66 2596 7888",
    emergencyPhone: "+66 2951 8585",
    lastVerified: "2026-09-14",
  },
  {
    slug: "saint-louis-hospital",
    name: "Saint Louis Hospital",
    type: "private-hospital",
    area: "Sathon",
    address: "27 South Sathorn Road, Yan Nawa, Sathon, Bangkok 10120",
    nearestTransit: "BTS Surasak, a few minutes on foot",
    description:
      "A Catholic mission hospital on South Sathorn, and the budget-sensible option for families in the Sathorn and Silom area who do not need an international patient desk. Routine paediatric consultations run well below what the same visit costs a few stops up the BTS, and it is a genuinely useful alternative for checkups, minor illness and vaccinations.",
    worthKnowing:
      "Expect a Thai hospital experience rather than an international one: less English, more queueing, and a system that assumes you know how Thai hospitals work. Best treated as the sensible everyday option once you have found your feet here, not as your first week in Bangkok choice.",
    services: [
      "maternity",
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
    ],
    languages: ["English"],
    directBilling: "some",
    paediatrics: {
      separateChildrensEr: false,
      lastVerified: "2026-09-14",
    },
    lastVerified: "2026-09-14",
  },
  {
    slug: "camillian-hospital",
    name: "Camillian Hospital",
    type: "private-hospital",
    area: "Watthana",
    address:
      "423 Sukhumvit 55 (Thong Lor), Khlong Tan Nuea, Watthana, Bangkok 10110",
    nearestTransit: "BTS Thong Lor, then up Soi 55",
    description:
      "A small Catholic hospital sitting right in the middle of Thong Lor, which makes it the closest hospital to a large slice of the expat family population. Quieter and cheaper than the big names a few minutes away, with a 24-hour advice line, and a reasonable option for the ordinary run of family medicine when you do not want to spend an afternoon at Samitivej.",
    worthKnowing:
      "Small, so the specialist range is limited and anything complicated will be referred on. The value here is proximity and a shorter queue for straightforward things, not comprehensive care. Worth knowing it exists before the night you need somewhere within walking distance.",
    services: [
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
      "physiotherapy",
    ],
    languages: ["English"],
    directBilling: "some",
    website: "https://camillianhospital.org/en/",
    phone: "02 185 1444, 24-hour advice line",
    lastVerified: "2026-09-14",
  },
  {
    slug: "queen-sirikit-national-institute-of-child-health",
    name: "Queen Sirikit National Institute of Child Health",
    thaiName: "สถาบันสุขภาพเด็กแห่งชาติมหาราชินี",
    type: "public-hospital",
    area: "Ratchathewi",
    address:
      "420/8 Ratchawithi Road, Thung Phaya Thai, Ratchathewi, Bangkok 10400",
    nearestTransit: "BTS Victory Monument, then a short taxi",
    description:
      "Thailand's national children's hospital, universally known as Children's Hospital, and the country's deepest concentration of paediatric sub-specialists. This is where the rare conditions and the complex cases go, including referrals from the private hospitals when something is beyond them. Included here not as an everyday option but because it is the thing behind the private system, and it is worth knowing that it exists.",
    worthKnowing:
      "This is a public hospital and it runs like one: long waits, limited English, and a referral-led system that is hard to navigate as a walk-in foreigner. It is not a substitute for a private paediatrician for everyday illness. It is where you may end up, via referral, for something genuinely rare, and the expertise there is real.",
    services: [
      "paediatrics",
      "paediatric-emergency",
      "developmental-paediatrics",
      "nicu",
      "emergency-24h",
      "vaccinations",
    ],
    directBilling: "none",
    paediatrics: {
      separateChildrensEr: true,
      erHours: "24 hours",
      developmentalServices: true,
      note: "An entirely paediatric institution, so every service including the emergency department is designed for children.",
      lastVerified: "2026-09-14",
    },
    website: "https://www.childrenhospital.go.th/en/home/",
    phone: "1415",
    emergencyPhone: "1415 extension 2201 or 2202",
    lastVerified: "2026-09-14",
  },
  {
    slug: "manarom-hospital",
    name: "Manarom Hospital",
    type: "specialist-hospital",
    area: "Bang Na",
    address: "9 Sukhumvit 70/3, Bang Na Tai, Bang Na, Bangkok 10260",
    nearestTransit: "BTS Udom Suk or Bang Na, then a short taxi",
    description:
      "A dedicated psychiatric hospital covering children and adolescents from infancy to 18 as a distinct service rather than an afterthought on an adult ward. Psychiatric assessment, psychological and neuropsychological testing, and treatment for ADHD, autism, anxiety, mood disorders and eating disorders, with individual and family therapy and parent education programmes alongside.",
    worthKnowing:
      "The most substantial dedicated child and adolescent mental health provision in Bangkok, and listed on International School Bangkok's own community resource list, which is a meaningful endorsement. Bang Na is a long way from the Sukhumvit and Sathorn school corridor, so factor the journey into a course of weekly appointments rather than a single visit. Confirm English-speaking clinician availability when you book, since it varies by specialty.",
    services: ["mental-health", "developmental-paediatrics"],
    languages: ["English"],
    directBilling: "some",
    website: "https://www.manarom.com",
    email: "contact@manarom.com",
    phone: "+66 2 725 9595 or +66 2 032 9595",
    lastVerified: "2026-09-14",
  },
  {
    slug: "bangkok-mental-health-rehabilitation-and-recovery-center",
    name: "Bangkok Mental Health Rehabilitation and Recovery Center",
    type: "clinic",
    area: "Huai Khwang",
    address: "2 Soi Soonvijai 7, New Petchburi Road, Huai Khwang, Bangkok 10310",
    nearestTransit: "MRT Phetchaburi or ARL Makkasan, then a short taxi",
    description:
      "The mental health arm of Bangkok Hospital, with a child and adolescent psychiatry service running alongside adult and older-adult care. Being attached to a full hospital matters when a young person's presentation has a medical dimension, or when medication needs coordinating with other care.",
    worthKnowing:
      "Also on International School Bangkok's community resource list. Works in Thai and English. Being inside a large hospital campus means more process than a standalone clinic, but it also means continuity if your family already uses Bangkok Hospital.",
    services: ["mental-health"],
    languages: ["English"],
    directBilling: "most",
    website:
      "https://www.bangkokhospital.com/en/bangkok/center-clinic/brain/bangkok-mental-health-rehabilitation-and-recovery-center/child-and-adolescent-psychiatry-services",
    phone: "+66 2 310 3027 or +66 2 310 3751",
    lastVerified: "2026-09-14",
  },
  {
    slug: "merak-clinic",
    name: "Merak Clinic",
    type: "clinic",
    area: "Nonthaburi",
    address: "146/5 Tiwanon Road, Tha Sai, Mueang Nonthaburi, Nonthaburi 11000",
    description:
      "A small clinic working specifically with children and adolescents, in English and Thai. Standalone rather than hospital-attached, which usually means a shorter route to an actual appointment and a more consistent clinician than a large hospital rota provides.",
    worthKnowing:
      "Nonthaburi is outside Bangkok proper and a long trip from the southern and eastern school corridor, which is the main practical obstacle. Listed on International School Bangkok's community resource list. Small practices change hours and availability more often than hospitals, so call ahead rather than turning up.",
    services: ["mental-health", "developmental-paediatrics"],
    languages: ["English"],
    directBilling: "unknown",
    website: "https://merakclinic.com",
    email: "merakclinic@hotmail.com",
    phone: "084 733 0444",
    lastVerified: "2026-09-14",
  },
  {
    slug: "mind-and-body-clinic",
    name: "Mind & Body Clinic",
    type: "clinic",
    area: "Pathum Wan",
    address:
      "Chamchuri Square, 2nd floor room 253, Phayathai Road, Pathum Wan, Bangkok 10330",
    nearestTransit: "MRT Sam Yan, directly under the building",
    description:
      "A central, easy-to-reach mental health clinic working in English and Thai, sitting directly above an MRT station in Chamchuri Square. The location is the practical advantage: for a family coming from anywhere on the MRT it removes the taxi from the equation, which matters for appointments that repeat weekly.",
    worthKnowing:
      "Listed on International School Bangkok's community resource list. Confirm directly whether the clinicians available take children or adolescents, since that is not stated up front and varies by practitioner.",
    services: ["mental-health"],
    languages: ["English"],
    directBilling: "unknown",
    website: "https://bodyandmindclinicbkk.com",
    email: "bodyandmindclinic.bkk@gmail.com",
    phone: "+66 93 332 2511 or 02 160 5389",
    lastVerified: "2026-09-14",
  },
  {
    slug: "the-oasis",
    name: "The Oasis",
    type: "clinic",
    area: "Chatuchak",
    address:
      "1408/41 Phahonyothin Road, Chom Phon, Chatuchak, Bangkok 10900",
    nearestTransit: "BTS Mo Chit or MRT Chatuchak Park",
    description:
      "A counselling practice working in English and Thai with a defined age split, children from eight to twelve, then teenagers, then adults. The explicit age banding is unusual in Bangkok and useful, since it means a nine year old is not being seen by someone whose practice is really adult therapy.",
    worthKnowing:
      "Listed on International School Bangkok's community resource list. No published phone number, so contact goes through the website. Children under eight are not covered, which is worth knowing before you enquire.",
    services: ["mental-health"],
    languages: ["English"],
    directBilling: "unknown",
    website: "https://theoasiscare.com",
    lastVerified: "2026-09-14",
  },
  {
    slug: "bangkok-international-dental-hospital",
    name: "Bangkok International Dental Hospital (BIDH)",
    type: "dental",
    area: "Khlong Toei",
    address: "98 Sukhumvit Soi 2, Khlong Toei, Bangkok 10110",
    nearestTransit: "BTS Nana or Ploenchit",
    description:
      "A licensed dental hospital rather than a clinic, at the bottom of Sukhumvit Soi 2, offering paediatric dentistry within a full general and specialist service. Outpatient hours run late into the evening six days a week and through Sunday afternoon, which is the single most useful fact here for a working parent with school-age children.",
    worthKnowing:
      "Hospital status means it operates under hospital-grade safety and sterilisation standards and can handle treatment under general anaesthesia, which matters for a very young or very anxious child who cannot be treated in a normal dental chair. Run by the same group as BIDC, so pricing and standards are comparable. Open Monday to Saturday 9am to 8pm and Sunday 9am to 6pm.",
    services: ["dental", "paediatric-dentistry", "orthodontics"],
    languages: ["English"],
    directBilling: "some",
    website: "https://dentalhospitalthailand.com",
    email: "contact@dentalhospitalthailand.com",
    phone: "02 115 8977, WhatsApp +66 95 517 1587",
    lastVerified: "2026-09-14",
  },
  {
    slug: "bangkok-international-dental-center",
    name: "Bangkok International Dental Center (BIDC)",
    type: "dental",
    area: "Din Daeng",
    address: "157, 159 Ratchadaphisek Soi 7, Din Daeng, Bangkok 10400",
    nearestTransit: "MRT Ratchadaphisek or Sutthisan",
    description:
      "The first JCI-accredited dental centre in Thailand and one of the largest, on Ratchadaphisek. Strongest on orthodontics, with specialist orthodontists trained abroad and Invisalign Diamond Provider status, which makes it a common destination for teenagers starting braces.",
    worthKnowing:
      "The accreditation and the specialist-only orthodontics are the real differentiators, since plenty of Bangkok clinics let a general dentist run orthodontic cases. Paediatric dentistry is not advertised as a named specialty here, so for a young child BIDH on Sukhumvit 2, run by the same group, is the better first call. JCI accredited and ISO 9001:2015 certified.",
    services: ["dental", "orthodontics"],
    languages: ["English"],
    directBilling: "some",
    jciAccredited: true,
    website: "https://bangkokdentalcenter.com",
    email: "contact@bangkokdentalcenter.com",
    phone: "+66 2 692 4433",
    lastVerified: "2026-09-14",
  },
  {
    slug: "vejthani-hospital",
    name: "Vejthani Hospital",
    type: "international-hospital",
    area: "Bang Kapi",
    address: "1 Lat Phrao Soi 111, Lat Phrao Road, Khlong Chan, Bang Kapi, Bangkok 10240",
    nearestTransit:
      "No convenient rail link. Car access from Lat Phrao Road, and roughly 30 minutes from Suvarnabhumi",
    description:
      "A JCI-accredited private hospital out on Lat Phrao, running 24 hours with a paediatric service and a serious international patient operation, including hotline support in nine languages and a desk at Suvarnabhumi. For families living in the Lat Phrao, Bang Kapi and Ramkhamhaeng corridor it is the nearest hospital of this standard by a wide margin.",
    worthKnowing:
      "The accreditation and language support are genuinely at international-hospital level, and the prices generally are not, which is the appeal. The catch is location: from Sukhumvit or Sathorn this is a long drive for anything routine. It earns its place if you live on that side of the city, and rarely otherwise.",
    services: [
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
      "physiotherapy",
    ],
    languages: ["English", "Arabic", "Mandarin", "Khmer", "Vietnamese"],
    directBilling: "most",
    jciAccredited: true,
    website: "https://www.vejthani.com",
    phone: "+66 2734 0000",
    emergencyPhone: "+66 2734 0001",
    lastVerified: "2026-09-15",
  },
  {
    slug: "vibhavadi-hospital",
    name: "Vibhavadi Hospital",
    thaiName: "โรงพยาบาลวิภาวดี",
    type: "private-hospital",
    area: "Chatuchak",
    address: "51/3 Ngamwongwan Road, Lat Yao, Chatuchak, Bangkok 10900",
    nearestTransit: "MRT Phahon Yothin or Lat Phrao, then a short taxi",
    description:
      "A mid-market private hospital in Chatuchak with an unusually well developed children's department: twelve outpatient rooms, four dedicated checkup and vaccination rooms with play areas, a paediatric pharmacy, and sub-specialists across infectious disease, respiratory, allergy, cardiology, neurology and endocrinology. Paediatric outpatients run 7am to 9pm daily, with paediatricians available around the clock for emergencies.",
    worthKnowing:
      "This is the strongest paediatric offering in the directory outside the international hospitals and the dedicated children's hospitals, at noticeably lower prices. It also runs vaccination packages and school admission health assessments, which is the boring errand every international school family has to do each year. Ask for extension 4201 or 4221 to reach paediatrics directly rather than going through the main switchboard.",
    services: [
      "paediatrics",
      "vaccinations",
      "emergency-24h",
      "family-medicine",
      "allergy",
    ],
    languages: ["English"],
    directBilling: "some",
    paediatrics: {
      separateChildrensEr: false,
      erHours: "Paediatric outpatients 7am to 9pm, paediatricians on call 24 hours",
      note: "A one-stop children's department with its own pharmacy and play areas, covering general paediatrics plus sub-specialty clinics. Vaccination packages and school admission assessments are handled here too.",
      lastVerified: "2026-09-15",
    },
    website: "https://www.vibhavadi.com/en",
    phone: "02 058 1111, or 02 561 1111 extension 4201 or 4221 for paediatrics",
    lastVerified: "2026-09-15",
  },
  {
    slug: "bangkok-christian-hospital",
    name: "Bangkok Christian Hospital",
    type: "private-hospital",
    area: "Bang Rak",
    address: "124 Silom Road, Suriyawong, Bang Rak, Bangkok 10500",
    nearestTransit: "BTS Sala Daeng or Chong Nonsi, both a short walk along Silom",
    description:
      "A long-established mission hospital sitting directly on Silom, which makes it one of the most convenient options for families living or working in the Silom and Sathorn corridor. Smaller and considerably cheaper than the international hospitals a few stops away, and listed on the Australian Embassy's hospital list as an English-speaking facility.",
    worthKnowing:
      "We have verified its location, contact details and English-language support, but not the detail of its paediatric or maternity provision, so treat this entry as a starting point rather than a full profile. Call before making it your everyday choice for children, and tell us what you learn so we can fill the gap.",
    services: ["emergency-24h", "family-medicine"],
    languages: ["English"],
    directBilling: "some",
    website: "https://www.bch.in.th",
    phone: "+66 2625 9000",
    lastVerified: "2026-09-15",
  },
  {
    slug: "mission-hospital-bangkok",
    name: "Mission Hospital Bangkok",
    type: "private-hospital",
    area: "Dusit",
    address: "430 Phitsanulok Road, Si Yaek Maha Nak, Dusit, Bangkok 10300",
    nearestTransit: "No direct rail link. Car access from Phitsanulok Road",
    description:
      "One of the oldest private hospitals in Bangkok, run by the Seventh-day Adventist church and operating in English and Thai. It serves the Dusit and Phaya Thai side of the city, an area otherwise thin on private options in this directory.",
    worthKnowing:
      "Listed here on the strength of the Australian Embassy's hospital list, which verifies its address, phone and English support. We have not independently checked its paediatric or maternity services, so confirm directly before relying on it for children's care.",
    services: ["emergency-24h", "family-medicine"],
    languages: ["English"],
    directBilling: "unknown",
    phone: "+66 2282 1100",
    lastVerified: "2026-09-15",
  },
  {
    slug: "cgh-hospital-phaholyothin",
    name: "CGH Hospital Phaholyothin",
    type: "private-hospital",
    area: "Bang Khen",
    address: "290 Phahonyothin Road, Anusawari, Bang Khen, Bangkok 10220",
    nearestTransit: "BTS Wat Phra Sri Mahathat, then a short taxi",
    description:
      "A private hospital in northern Bangkok, useful mainly for families living out towards Bang Khen, Saphan Mai and the northern end of the BTS Green Line, where the options in this directory otherwise run out.",
    worthKnowing:
      "Included for geographic coverage. Address, phone and English-language support come from the Australian Embassy's hospital list; we have not verified its family services in detail. Worth a call before treating it as your everyday hospital.",
    services: ["emergency-24h", "family-medicine"],
    languages: ["English"],
    directBilling: "unknown",
    phone: "+66 2552 8777",
    lastVerified: "2026-09-15",
  },
  {
    slug: "siriraj-piyamaharajkarun-hospital",
    name: "Siriraj Piyamaharajkarun Hospital",
    thaiName: "โรงพยาบาลศิริราช ปิยมหาราชการุณย์",
    type: "private-hospital",
    area: "Bangkok Noi",
    address: "2 Wang Lang Road, Siriraj, Bangkok Noi, Bangkok 10700",
    nearestTransit:
      "MRT Siriraj, or the Wang Lang pier by Chao Phraya express boat",
    description:
      "The private wing of Siriraj, Thailand's oldest and most prestigious teaching hospital. The proposition is unusual and genuinely valuable: private-hospital service and scheduling, with access to the academic depth of Siriraj's specialists behind it. For families on the Thonburi side of the river it is also simply the best hospital nearby.",
    worthKnowing:
      "This is where the private system and the academic system meet, which makes it a serious option for a complex or rare condition where you want a subspecialist rather than a generalist. Expect more formality and process than at a Sukhumvit international hospital. Address and phone verified via the Australian Embassy's hospital list; family-specific services not yet checked in detail.",
    services: ["emergency-24h", "family-medicine", "paediatrics"],
    languages: ["English"],
    directBilling: "some",
    phone: "+66 2419 1000",
    lastVerified: "2026-09-15",
  },
  {
    slug: "ramathibodi-hospital",
    name: "Ramathibodi Hospital",
    thaiName: "โรงพยาบาลรามาธิบดี",
    type: "public-hospital",
    area: "Ratchathewi",
    address: "270 Rama VI Road, Thung Phaya Thai, Ratchathewi, Bangkok 10400",
    nearestTransit: "BTS Victory Monument, a short walk or quick taxi",
    description:
      "One of Thailand's two great university teaching hospitals, part of Mahidol University, and a national referral centre for complex paediatric cases. Like the national children's hospital, it belongs in this directory not as an everyday option but as the thing standing behind the private system: when a private hospital reaches the limit of what it can do, this is often where the referral goes.",
    worthKnowing:
      "A public teaching hospital, so expect long waits, limited English and a referral-led system that is hard to navigate as a walk-in foreigner. Not a substitute for a private paediatrician for ordinary illness. The expertise, particularly in rare and complex paediatric conditions, is among the best in the country.",
    services: ["paediatrics", "emergency-24h", "family-medicine"],
    directBilling: "none",
    website: "https://www.rama.mahidol.ac.th",
    phone: "+66 2201 1000",
    lastVerified: "2026-09-15",
  },
  {
    slug: "king-chulalongkorn-memorial-hospital",
    name: "King Chulalongkorn Memorial Hospital",
    thaiName: "โรงพยาบาลจุฬาลงกรณ์",
    type: "public-hospital",
    area: "Pathum Wan",
    address: "1873 Rama IV Road, Pathum Wan, Bangkok 10330",
    nearestTransit: "MRT Si Lom or BTS Sala Daeng, then a short walk",
    description:
      "The Thai Red Cross teaching hospital attached to Chulalongkorn University, and the other half of Thailand's academic medical establishment alongside Ramathibodi. Central, enormous, and the destination for a great many specialist referrals out of the private system.",
    worthKnowing:
      "Public hospital conditions apply: long queues, limited English, and a system that assumes you arrive with a referral and know how it works. Listed for the same reason as Ramathibodi, which is that knowing where the depth sits is worth something even if you never walk in.",
    services: ["paediatrics", "emergency-24h", "family-medicine"],
    directBilling: "none",
    phone: "+66 2256 4000",
    lastVerified: "2026-09-15",
  },
  {
    slug: "wellmed-bangkok-clinic",
    name: "WellMed Bangkok Clinic",
    type: "clinic",
    area: "Watthana",
    address:
      "Vasu 1 Building, Soi Sukhumvit 25, Khlong Toei Nuea, Watthana, Bangkok 10110",
    nearestTransit: "BTS Asok or MRT Sukhumvit, about three minutes on foot",
    description:
      "A small multilingual family clinic three minutes from Asok, covering children's checkups, growth and development monitoring, vaccinations and ordinary illness, with referral on to the hospitals when something needs more. Open 9am to 7pm every day including weekends.",
    worthKnowing:
      "This is the category the directory was thinnest on, and the one that saves families the most money and time: a proper clinic for the routine things that do not need a hospital. A vaccination or a well-child check here is a fraction of the cost of the same visit at an international hospital ten minutes away, and you are in and out. It is not the place for anything urgent or complex, and it says so itself by referring on.",
    services: [
      "paediatrics",
      "vaccinations",
      "family-medicine",
      "travel-medicine",
    ],
    languages: ["English"],
    directBilling: "some",
    paediatrics: {
      separateChildrensEr: false,
      note: "Outpatient only, 9am to 7pm daily. Children's health checks, growth and development monitoring, vaccinations and consultations, with referral to hospital for anything beyond that.",
      lastVerified: "2026-09-15",
    },
    website: "https://wellmedbangkok.com",
    email: "info@wellmedbangkok.com",
    phone: "+66 61 787 4000",
    lastVerified: "2026-09-15",
  },
  {
    slug: "thantakit-international-dental-center",
    name: "Thantakit International Dental Center",
    type: "dental",
    area: "Huai Khwang",
    address: "1939 New Petchburi Road, Bangkok",
    nearestTransit: "MRT Phetchaburi or ARL Makkasan, then a short taxi",
    description:
      "Thailand's longest established dental practice, operating since 1945, with more than forty English-speaking dentists trained in the US, UK, Europe and Australia. Full service including paediatric dentistry and a broad orthodontic range covering Invisalign, Damon and conventional braces. There is a second, smaller branch at All Seasons Place on Wireless Road.",
    worthKnowing:
      "Eighty years in one city buys a depth of specialists that newer clinics cannot match, and it is the third serious option alongside BIDH and BIDC rather than a step down from them. The Wireless Road branch is far more convenient for central Sukhumvit families but closes at weekends, so check which site your appointment is actually at before you travel.",
    services: ["dental", "paediatric-dentistry", "orthodontics"],
    languages: ["English"],
    directBilling: "some",
    website: "https://www.thantakit.com",
    email: "info@thantakit.com",
    phone: "+66 2718 0777",
    lastVerified: "2026-09-15",
  },
];

export const ALL_AREAS: string[] = Array.from(
  new Set(FACILITIES.map((f) => f.area))
).sort();

export const ALL_SERVICES: Service[] = Array.from(
  new Set(FACILITIES.flatMap((f) => f.services))
).sort();

export const ALL_TYPES: FacilityType[] = Array.from(
  new Set(FACILITIES.map((f) => f.type))
).sort();

/** Facilities that deliver babies, the highest-intent view in the section. */
export const MATERNITY_FACILITIES: Facility[] = FACILITIES.filter((f) =>
  f.services.includes("maternity")
);

/** Facilities with a paediatric service, the other high-intent view. */
export const PAEDIATRIC_FACILITIES: Facility[] = FACILITIES.filter((f) =>
  f.services.includes("paediatrics")
);

/** Days since an entry was last checked. Drives the staleness warning. */
export function daysSinceVerified(iso: string, now: Date = new Date()): number {
  const then = new Date(`${iso}T00:00:00Z`).getTime();
  return Math.floor((now.getTime() - then) / 86_400_000);
}

/**
 * Shorter than the camps window. Camp dates are annual; a phone number or a
 * package price can change any week, and health content carries a higher
 * trust bar than a football camp.
 */
export const STALE_AFTER_DAYS = 60;

export function isStale(iso: string, now: Date = new Date()): boolean {
  return daysSinceVerified(iso, now) > STALE_AFTER_DAYS;
}

export function facilityBySlug(slug: string): Facility | undefined {
  return FACILITIES.find((f) => f.slug === slug);
}

/** Lowest published delivery package across the directory, for the intro copy. */
export function lowestPublishedPackage(): number | null {
  const prices = FACILITIES.map((f) => f.maternity?.packageFrom).filter(
    (p): p is number => typeof p === "number"
  );
  return prices.length ? Math.min(...prices) : null;
}

/** Highest published delivery package across the directory. */
export function highestPublishedPackage(): number | null {
  const prices = FACILITIES.flatMap((f) =>
    [f.maternity?.packageFrom, f.maternity?.packageTo].filter(
      (p): p is number => typeof p === "number"
    )
  );
  return prices.length ? Math.max(...prices) : null;
}
