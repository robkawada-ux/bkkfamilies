// Shape of one school's Simplified Chinese (/zh) free text. Everything else
// (name, slug, curricula, areas, founded, website, address, map link, logo,
// photo) is read from the English record in src/lib/schools.ts.
export interface SchoolZh {
  /** Same number of paragraphs as the English description, joined with "\n\n". */
  description?: string;
  /** Translation of the English ageRange, when the English record has one. */
  ageRange?: string;
  /** Translation of the English languageOfInstruction, when present. */
  languageOfInstruction?: string;
  /** Translation of schoolStatedFee, when present (keep the figures identical). */
  schoolStatedFee?: string;
  /** Translation of feeRange, when present (keep the figures identical). */
  feeRange?: string;
}
