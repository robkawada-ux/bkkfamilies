export type Budget = "under400k" | "over400k";

export interface School {
  name: string;
  slug: string;
  curricula: string[];
  budget: Budget;
}

// Curriculum + budget tags carried over from the existing BKK Families
// schools directory. Budget is average annual cost across all grades,
// split at 400,000 THB/year. Descriptions/photos are NOT copied from the
// old site — those should be written fresh per school as you re-verify
// each listing's current details.
export const SCHOOLS: School[] = [
  { name: "ABC Pathways International Kindergarten", slug: "abc-pathways-international-kindergarten", curricula: ["British"], budget: "under400k" },
  { name: "Anglo Singapore International School", slug: "anglo-singapore-international-school", curricula: ["British", "Singaporean"], budget: "under400k" },
  { name: "Annabel's Early Years International School", slug: "annabels-early-years-international-school", curricula: ["British"], budget: "under400k" },
  { name: "Ascot International School", slug: "ascot-international-school", curricula: ["British", "International Baccalaureate"], budget: "under400k" },
  { name: "Associe International Kindergarten Bangkok", slug: "associe-international-kindergarten-bangkok", curricula: ["American", "Japanese", "Thai"], budget: "under400k" },
  { name: "Bangkok Christian International School", slug: "bangkok-christian-international-school", curricula: ["American"], budget: "under400k" },
  { name: "Bangkok Grace International School (BGIS)", slug: "bangkok-grace-international-school-bgis", curricula: ["Christian"], budget: "under400k" },
  { name: "Bangkok Patana School", slug: "bangkok-patana-school", curricula: ["British", "International Baccalaureate"], budget: "over400k" },
  { name: "Bangkok Prep", slug: "bangkok-prep", curricula: ["British", "International Baccalaureate"], budget: "over400k" },
  { name: "Basis International School Bangkok", slug: "basis-international-school-bangkok", curricula: ["American"], budget: "over400k" },
  { name: "Berkeley International School Bangkok", slug: "berkeley-international-school-bangkok", curricula: ["American"], budget: "over400k" },
  { name: "BERNIE British International Prep & Early Years", slug: "bernie-british-international-prep-kindergarten-early-years", curricula: ["British"], budget: "under400k" },
  { name: "Bright Skies International School", slug: "bright-skies-international-school", curricula: ["British"], budget: "under400k" },
  { name: "Brighton College Bangkok", slug: "brighton-college-bangkok", curricula: ["British"], budget: "over400k" },
  { name: "British Columbia International School", slug: "british-columbia-international-school", curricula: ["Canadian"], budget: "over400k" },
  { name: "Bromsgrove International School Thailand", slug: "bromsgrove-international-school-thailand", curricula: ["British"], budget: "under400k" },
  { name: "Canadian International School of Thailand", slug: "canadian-international-school-of-thailand", curricula: ["Canadian"], budget: "under400k" },
  { name: "Centurion International School Bangkok", slug: "centurion-international-school-bangkok", curricula: ["British"], budget: "under400k" },
  { name: "Charter International School", slug: "charter-international-school", curricula: ["British"], budget: "over400k" },
  { name: "Concordian International School Bangkok", slug: "concordian-bangkok-concordian-international-school-bangkok", curricula: ["International Baccalaureate"], budget: "over400k" },
  { name: "Denla British School", slug: "denla-british-school", curricula: ["British"], budget: "over400k" },
  { name: "DPREP Bangkok", slug: "dprep-bangkok", curricula: ["International Baccalaureate"], budget: "over400k" },
  { name: "Ekamai International School", slug: "ekamai-international-school", curricula: ["American"], budget: "under400k" },
  { name: "Garden International School Bangkok", slug: "garden-international-school-bangkok", curricula: ["British"], budget: "under400k" },
  { name: "Global English School", slug: "global-english-school", curricula: ["Blended Learning"], budget: "under400k" },
  { name: "Global Indian International School", slug: "global-indian-international-school", curricula: ["Indian"], budget: "under400k" },
  { name: "Glory Singapore International School", slug: "glory-singapore-international-school", curricula: ["British", "Singaporean"], budget: "under400k" },
  { name: "Hampton International School", slug: "hampton-international-school", curricula: ["British"], budget: "over400k" },
  { name: "Harrow International School Bangkok", slug: "harrow-international-school-bangkok", curricula: ["British"], budget: "over400k" },
  { name: "Heathfield International School", slug: "heathfield-international-school", curricula: ["British"], budget: "under400k" },
  { name: "International Community School", slug: "international-community-school", curricula: ["American"], budget: "over400k" },
  { name: "International Montessori Center", slug: "international-montessori-center", curricula: ["British", "Montessori"], budget: "under400k" },
  { name: "International Pioneers School", slug: "international-pioneers-school", curricula: ["British"], budget: "under400k" },
  { name: "IPC International Kindergarten", slug: "ipc-international-kindergarten", curricula: ["British"], budget: "under400k" },
  { name: "Kevalee International School", slug: "kevalee-international-school", curricula: ["American"], budget: "under400k" },
  { name: "KiddyKare International Kindergarten", slug: "kiddykare-international-kindergarten", curricula: ["British"], budget: "under400k" },
  { name: "KIS International School Bangkok", slug: "kis-international-school-bangkok", curricula: ["International Baccalaureate"], budget: "under400k" },
  { name: "KPIS International School", slug: "kpis-international-school", curricula: ["American"], budget: "under400k" },
  { name: "MYIS International School", slug: "magic-years-international-school-thailand", curricula: ["International Baccalaureate"], budget: "under400k" },
  { name: "NIST International School Bangkok", slug: "nist-international-school-bangkok", curricula: ["International Baccalaureate"], budget: "over400k" },
  { name: "The American School of Bangkok (ASB)", slug: "the-american-school-of-bangkok-asb", curricula: ["American"], budget: "over400k" },
  { name: "The British School of Bangkok (Topsy Turvy)", slug: "the-british-school-of-bangkok-topsy-turvy-international-school", curricula: ["British"], budget: "under400k" },
  { name: "The Country School by ELC", slug: "the-country-school-by-elc", curricula: ["British"], budget: "under400k" },
  { name: "The First Steps International School", slug: "the-first-steps-international-school", curricula: ["British"], budget: "under400k" },
  { name: "The Purple Elephant 55", slug: "the-purple-elephant-55", curricula: ["English Program"], budget: "under400k" },
  { name: "The Tiny Seeds International Pre-School", slug: "the-tiny-seeds-international-pre-school-bangkok", curricula: ["English Program"], budget: "under400k" },
  { name: "The Village International Education Centre (VIE)", slug: "the-village-international-education-centre-vie", curricula: ["British"], budget: "over400k" },
  { name: "Thonglor Greenfield Nursery", slug: "thonglor-greenfield-nursery", curricula: ["British"], budget: "under400k" },
  { name: "Tiny Tots International School", slug: "tiny-tots-international-school", curricula: ["British", "Indian"], budget: "under400k" },
  { name: "Traill International School", slug: "traill-international-school", curricula: ["British"], budget: "under400k" },
  { name: "Trinity International School", slug: "trinity-international-school", curricula: ["American"], budget: "under400k" },
  { name: "Verso International School", slug: "verso-international-school", curricula: ["American"], budget: "over400k" },
  { name: "Wellington International School Bangkok", slug: "wellington-international-school-bangkok", curricula: ["British"], budget: "over400k" },
];

export const ALL_CURRICULA = Array.from(
  new Set(SCHOOLS.flatMap((s) => s.curricula))
).sort();
