// Which schools take children of nursery and kindergarten age. Feeds
// /schools/international-kindergartens-bangkok and the link to it from each
// qualifying school page.
//
// Two groups, kept apart on the page because parents choose differently:
// a dedicated early years setting is a few years' decision, a full school
// with a nursery is often a decision about the next fifteen.
//
// EVIDENCE RULE: a full school is only listed when the data proves it takes
// young children, either published early years fee rows or an age range
// that starts at three or younger. A school we merely suspect has a nursery
// stays off until one of those is filled in. Specialists are listed by hand
// because their descriptions, not their fields, say they stop at early years.

import { SCHOOLS, type School } from "./schools";
import { schoolFees, type FeeRow } from "./schoolFees";

/** Kindergartens, nurseries and preschools that stop before primary. */
export const EARLY_YEARS_SPECIALISTS: string[] = [
  "abc-pathways-international-kindergarten",
  "annabels-early-years-international-school",
  "associe-international-kindergarten-bangkok",
  "bernie-british-international-prep-kindergarten-early-years",
  "hampton-international-school",
  "kiddykare-international-kindergarten",
  "kids-academy-international-school",
  "kids-kingdom-international-kindergarten",
  "regents-international-school-bangkok-langsuan-campus",
  "storytime-preschool",
  "the-first-steps-international-school",
  "the-purple-elephant-55",
  "the-tiny-seeds-international-pre-school-bangkok",
  "thonglor-greenfield-nursery",
  "tiny-tots-international-school",
];

/**
 * Full schools whose early years are stated in the description rather than
 * in a field. Add a slug here only when the description says so plainly.
 */
const EARLY_YEARS_BY_DESCRIPTION: string[] = [
  "the-british-school-of-bangkok-topsy-turvy-international-school",
];

/** Published early years fee rows, in the school's own order. */
export function earlyYearsFees(slug: string): FeeRow[] {
  const f = schoolFees[slug];
  if (!f || f.status !== "published") return [];
  return (f.rows ?? []).filter((r) => r.stage === "early-years");
}

/** An age range that starts at three or younger, or names an early years stage. */
const YOUNG_START =
  /^(ages?\s*[123]\b|[123]\s*to\b|18 months|toddler|nursery|pre-?k|pre-?nursery|kindergarten|early years)/i;

export function startsInEarlyYears(s: School): boolean {
  if (earlyYearsFees(s.slug).length > 0) return true;
  if (s.ageRange && YOUNG_START.test(s.ageRange.trim())) return true;
  return EARLY_YEARS_BY_DESCRIPTION.includes(s.slug);
}

export const SPECIALIST_SCHOOLS: School[] = SCHOOLS.filter((s) =>
  EARLY_YEARS_SPECIALISTS.includes(s.slug),
).sort((a, b) => a.name.localeCompare(b.name));

export const SCHOOLS_WITH_EARLY_YEARS: School[] = SCHOOLS.filter(
  (s) => !EARLY_YEARS_SPECIALISTS.includes(s.slug) && startsInEarlyYears(s),
).sort((a, b) => a.name.localeCompare(b.name));

export function takesEarlyYears(slug: string): boolean {
  return (
    SPECIALIST_SCHOOLS.some((s) => s.slug === slug) ||
    SCHOOLS_WITH_EARLY_YEARS.some((s) => s.slug === slug)
  );
}

export const EARLY_YEARS_PATH = "/schools/international-kindergartens-bangkok";
