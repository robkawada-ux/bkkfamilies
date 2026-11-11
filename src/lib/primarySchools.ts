// Which schools teach primary-age children. Feeds
// /schools/international-primary-schools-bangkok and the link to it from each
// qualifying school page.
//
// Every school in the directory teaches primary except the early years
// specialists (earlyYears.ts), schools whose stated range stops before age
// six, and secondary-only schools. Primary-only schools are picked out by
// their stated age range, as on the British curriculum page.
//
// FEES: compared on ONE year group, the year a child turns six to seven:
// British Year 2, American Grade 1, Singapore Primary 1. Schools label that
// year differently, so the row is found by reading the label's system and
// range (a "Year 1-2" row covers Year 2, "K4-Grade 5" covers Grade 1).

import { SCHOOLS, type School } from "./schools";
import { schoolFees, type FeeRow } from "./schoolFees";
import { EARLY_YEARS_SPECIALISTS } from "./earlyYears";

export const PRIMARY_PATH = "/schools/international-primary-schools-bangkok";

const main = (s: School) => (s.ageRange ?? "").split("(")[0];

/** Ranges that stop before primary, e.g. "18 months to 6 years". */
const ENDS_IN_EARLY_YEARS = /to [1-6] years\b|to year 1\b/i;
/** Ranges that start at secondary, e.g. "Years 7 to 13". */
const SECONDARY_ONLY = /^years? (7|8|9|10)\b/i;

export const PRIMARY_SCHOOLS: School[] = SCHOOLS.filter(
  (s) =>
    !EARLY_YEARS_SPECIALISTS.includes(s.slug) &&
    !ENDS_IN_EARLY_YEARS.test(main(s)) &&
    !SECONDARY_ONLY.test(main(s).trim()),
).sort((a, b) => a.name.localeCompare(b.name));

const PRIMARY_END = /to (year 6|grade 6|11|12)\b|primary 6/i;
const PRIMARY_ONLY_BY_DESCRIPTION = ["the-british-school-of-bangkok-topsy-turvy-international-school"];

export const PRIMARY_ONLY: School[] = PRIMARY_SCHOOLS.filter(
  (s) => PRIMARY_END.test(main(s)) || PRIMARY_ONLY_BY_DESCRIPTION.includes(s.slug),
);

export const ALL_THROUGH: School[] = PRIMARY_SCHOOLS.filter((s) => !PRIMARY_ONLY.includes(s));

export function teachesPrimary(slug: string): boolean {
  return PRIMARY_SCHOOLS.some((s) => s.slug === slug);
}

/** True when a fee row's label covers the year a child turns six to seven. */
function coversAgeSix(label: string): boolean {
  const l = label.toLowerCase();
  const system = /year/.test(l) ? "year" : /(grade|primary|standard|\bp\d|\bg\d|pyp)/.test(l) ? "grade" : null;
  if (!system) return false;
  const target = system === "year" ? 2 : 1;
  const nums = (l.match(/\d+/g) ?? []).map(Number).filter((n) => n <= 13);
  if (nums.length === 0) return false;
  const lo = /(k\d|kg|nursery|reception|pre)/.test(l) ? 0 : Math.min(...nums);
  return lo <= target && target <= Math.max(...nums);
}

/** The school's published fee row for the age six to seven year, if any. */
export function ageSixFee(slug: string): FeeRow | null {
  const f = schoolFees[slug];
  if (!f || f.status !== "published") return null;
  return (f.rows ?? []).find((r) => r.stage === "primary" && coversAgeSix(r.label)) ?? null;
}
