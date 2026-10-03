// Verified international school fees for bkkfamilies.com.
// Every figure was read from the school's own published schedule on 18 September 2026.
// Third-party aggregator figures are deliberately excluded: in checking, Doris, Schoozy,
// Tutopiya and The Thaiger were each found quoting prior-year figures as current.
//
// Schools that do not publish fees are absent from this file by design. They must render
// in a labelled block below the table, never inside it.
//
// IMPORTANT: never compare schools on a min/max range.
// The cheapest row in a schedule is rarely a comparable product. Harrow's is a
// parent-accompanied toddler session two mornings a week (146,300); Shrewsbury's
// is Nursery at the City Campus only (696,300). Sorting those against each other
// ranks a playgroup against a sixth form.
// Any comparison must be locked to one `stage`, which is why rows are stored per
// year group. Early years should be its own table: hours per week, parent
// attendance and meal inclusion all differ across those rows.

export type FeeStage =
  | 'early-years'
  | 'primary'
  | 'lower-secondary'
  | 'upper-secondary'
  | 'sixth-form';

export type FeeStatus = 'published' | 'on-enquiry' | 'unverified';

export type Inclusion =
  | 'lunch'
  | 'snacks'
  | 'textbooks'
  | 'residential-trips'
  | 'eal'
  | 'transport'
  | 'uniform'
  | 'exam-fees'
  | 'after-school';

export interface FeeRow {
  /** The school's own wording for the year group. */
  label: string;
  /** Our normalised stage, so schools with different year names can be compared. */
  stage: FeeStage;
  annual: number;
  /** Set to 2 for exam years billed over two terms rather than three. */
  billedTerms?: 2 | 3;
}

export interface OneTimeFees {
  application?: number;
  /** Entrance, admission, enrolment or guaranteed-place fee. */
  registration?: number;
  refundableDeposit?: number;
  /** Charged when a child passes assessment but no place is available. */
  waitingPool?: number;
}

export interface RecurringExtra {
  label: string;
  annualFrom: number;
  annualTo?: number;
  /** True where the school decides, not the parent. */
  compulsory: boolean;
}

export interface SchoolFees {
  status: FeeStatus;
  /** Academic year the schedule covers, e.g. '2026/27'. */
  feeYear: string;
  /** The page or PDF the figures were read from. Required when status is 'published'. */
  sourceUrl?: string;
  /** ISO date the source was last read. */
  verified?: string;
  rows?: FeeRow[];
  oneTime?: OneTimeFees;
  includes?: Inclusion[];
  excludes?: Inclusion[];
  extras?: RecurringExtra[];
  /** Shown as the 'worth knowing' caveat on the school's row. */
  note?: string;
}

export const schoolFees: Record<string, SchoolFees> = {
  "bangkok-patana-school": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.patana.ac.th/wp-content/uploads/2026/04/Fee-announcement-2026-7.pdf",
    verified: '2026-09-18',
    rows: [
      { label: "Nursery", stage: 'early-years', annual: 515000 },
      { label: "Foundation Stage 1", stage: 'early-years', annual: 577000 },
      { label: "Foundation Stage 2", stage: 'early-years', annual: 640000 },
      { label: "Year 1-2", stage: 'primary', annual: 749000 },
      { label: "Year 3", stage: 'primary', annual: 790000 },
      { label: "Year 4-5", stage: 'primary', annual: 796000 },
      { label: "Year 6", stage: 'primary', annual: 811000 },
      { label: "Year 7-9", stage: 'lower-secondary', annual: 842000 },
      { label: "Year 10", stage: 'upper-secondary', annual: 957000 },
      { label: "Year 11", stage: 'upper-secondary', annual: 707000, billedTerms: 2 },
      { label: "Year 12", stage: 'sixth-form', annual: 1014000 },
      { label: "Year 13", stage: 'sixth-form', annual: 749000, billedTerms: 2 },
    ],
    oneTime: { application: 4000, registration: 250000, refundableDeposit: 50000 },
    includes: ['lunch', 'residential-trips'],
    excludes: ['eal', 'transport', 'uniform', 'exam-fees'],
    extras: [
      { label: "Capital assessment fee", annualFrom: 30000, compulsory: true },
      { label: "EAL support Years 1-9", annualFrom: 105000, compulsory: true },
      { label: "School bus", annualFrom: 47000, annualTo: 120800, compulsory: false },
    ],
    note: "Application fee rises to 5,500 from 1 Aug 2026. Lunch included Nursery-Year 6 only. EAL is compulsory if the school judges it necessary.",
  },
  "international-school-bangkok-isb": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.isb.ac.th/admissions/fees",
    verified: '2026-09-18',
    rows: [
      { label: "Pre-Kindergarten", stage: 'early-years', annual: 659000 },
      { label: "Elementary KG-Grade 5", stage: 'primary', annual: 1015000 },
      { label: "Middle Grades 6-8", stage: 'lower-secondary', annual: 1137000 },
      { label: "High Grades 9-12", stage: 'upper-secondary', annual: 1197000 },
    ],
    oneTime: { application: 4700, registration: 260000 },
    excludes: ['lunch', 'transport'],
    extras: [
      { label: "Annual fee", annualFrom: 22000, compulsory: true },
      { label: "Life Centered Education programme", annualFrom: 980000, compulsory: false },
      { label: "School bus", annualFrom: 111300, annualTo: 178000, compulsory: false },
    ],
    note: "Life Centered Education is charged on top of tuition, so a Grade 5 place with it is about 2,000,000 THB a year. Non-profit; 80-85% of tuition goes to salaries.",
  },
  "shrewsbury-international-school-bangkok": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.shrewsbury.ac.th/admissions/fees/overview/",
    verified: '2026-09-18',
    rows: [
      { label: "Nursery (City Campus)", stage: 'early-years', annual: 696300 },
      { label: "EY1", stage: 'early-years', annual: 719400 },
      { label: "EY2", stage: 'early-years', annual: 757800 },
      { label: "Year 1-2", stage: 'primary', annual: 851400 },
      { label: "Year 3-4", stage: 'primary', annual: 913200 },
      { label: "Year 5-6", stage: 'primary', annual: 944700 },
      { label: "Year 7-9", stage: 'lower-secondary', annual: 976800 },
      { label: "Year 10", stage: 'upper-secondary', annual: 1252200 },
      { label: "Year 11", stage: 'upper-secondary', annual: 834800, billedTerms: 2 },
      { label: "Year 12", stage: 'sixth-form', annual: 1256700 },
      { label: "Year 13", stage: 'sixth-form', annual: 837800, billedTerms: 2 },
    ],
    oneTime: { application: 5000, registration: 225000, refundableDeposit: 225000 },
    includes: ['lunch', 'snacks', 'textbooks', 'after-school'],
    excludes: ['uniform', 'exam-fees', 'residential-trips', 'transport'],
    note: "Guaranteed Place Fee of 225,000 includes a 30,000 alumni association life membership. Refundable deposit is also 225,000, so cash at entry is 455,000 on top of first-term tuition.",
  },
  "harrow-international-school-bangkok": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.harrowschool.ac.th/admissions/tuition-fees",
    verified: '2026-09-18',
    rows: [
      { label: "Lion Cubs parent-toddler", stage: 'early-years', annual: 146300 },
      { label: "Lion Cubs toddler half day", stage: 'early-years', annual: 270750 },
      { label: "Lion Cubs toddler full day", stage: 'early-years', annual: 316350 },
      { label: "Pre-Nursery half day", stage: 'early-years', annual: 571100 },
      { label: "Pre-Nursery full day", stage: 'early-years', annual: 634600 },
      { label: "Nursery half day", stage: 'early-years', annual: 663900 },
      { label: "Nursery full day", stage: 'early-years', annual: 737600 },
      { label: "Reception", stage: 'early-years', annual: 757600 },
      { label: "Year 1-5", stage: 'primary', annual: 880300 },
      { label: "Year 6-8", stage: 'lower-secondary', annual: 961900 },
      { label: "Year 9-11", stage: 'upper-secondary', annual: 1040000 },
      { label: "Year 12-13", stage: 'sixth-form', annual: 1063000 },
    ],
    oneTime: { application: 5000, registration: 225000, refundableDeposit: 200000, waitingPool: 225000 },
    includes: ['lunch', 'snacks', 'textbooks', 'eal'],
    excludes: ['uniform', 'exam-fees', 'residential-trips', 'transport'],
    extras: [
      { label: "Boarding, weekly", annualFrom: 456700, compulsory: false },
      { label: "Boarding, full", annualFrom: 571100, compulsory: false },
      { label: "School bus", annualFrom: 125200, annualTo: 143000, compulsory: false },
    ],
    note: "Lunch, snacks and English language support are free. Textbooks free to Year 9. EAL free for up to three years, Pre-Nursery to Year 5, where Patana charges 105,000 a year. Waiting pool fee of 225,000 is forfeited if you decline an offered place.",
  },
  "berkeley-international-school-bangkok": {
    status: 'published',
    feeYear: "2026",
    sourceUrl: "emailed fee schedule from the school",
    verified: '2026-09-18',
    rows: [
      { label: "Pre-K", stage: 'early-years', annual: 524300 },
      { label: "Grades 9-11", stage: 'upper-secondary', annual: 847500 },
    ],
    oneTime: { application: 3000, registration: 200000, refundableDeposit: 30000 },
    excludes: ['lunch'],
    extras: [
      { label: "Lunch", annualFrom: 25400, annualTo: 28900, compulsory: false },
    ],
    note: "Figures supplied directly by the school in response to the photo outreach. Only the range endpoints were given.",
  },
  "bangkok-prep": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.bangkokprep.ac.th/admissions/tuition-fees",
    verified: '2026-09-18',
    rows: [
      { label: "Pre-Nursery full day", stage: 'early-years', annual: 384800 },
      { label: "Nursery", stage: 'early-years', annual: 595600 },
      { label: "Reception", stage: 'early-years', annual: 629800 },
      { label: "Year 1-2", stage: 'primary', annual: 706400 },
      { label: "Year 3-4", stage: 'primary', annual: 733100 },
      { label: "Year 5-6", stage: 'primary', annual: 749500 },
      { label: "Year 7-9", stage: 'lower-secondary', annual: 790800 },
      { label: "Year 10-11", stage: 'upper-secondary', annual: 846500 },
      { label: "Year 12", stage: 'sixth-form', annual: 862200 },
      { label: "Year 13", stage: 'sixth-form', annual: 771200 },
    ],
    oneTime: { application: 5000, registration: 160000, refundableDeposit: 60000 },
    includes: ['lunch', 'residential-trips'],
    excludes: ['uniform', 'exam-fees', 'transport'],
    extras: [
      { label: "Placement fee (one-time)", annualFrom: 30000, compulsory: true },
      { label: "EAL support", annualFrom: 0, compulsory: true },
    ],
    note: "Registration is tiered by entry point: 120,000 Early Years, 160,000 Years 1-6, 110,000 Years 7-12. Fees include meals, world languages, field trips, sports fixtures and the yearbook for most year groups.",
  },
  "ruamrudee-international-school-ris": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.rism.ac.th/wp-content/uploads/2026/02/Tuition-Fees-2026-2027.pdf",
    verified: '2026-09-18',
    rows: [
      { label: "Pre-K 2-4", stage: 'early-years', annual: 538400 },
      { label: "Kindergarten", stage: 'early-years', annual: 544400 },
      { label: "Grade 1", stage: 'primary', annual: 718400 },
      { label: "Grades 2-5", stage: 'primary', annual: 686000 },
      { label: "Grades 6-8", stage: 'lower-secondary', annual: 731000 },
      { label: "Grades 9-11", stage: 'upper-secondary', annual: 786000 },
      { label: "Grade 12", stage: 'sixth-form', annual: 790500 },
    ],
    oneTime: { application: 5000, registration: 200000, refundableDeposit: 50000 },
    includes: ['lunch'],
    excludes: ['uniform', 'exam-fees', 'transport'],
    extras: [
      { label: "Learning resources (one-time)", annualFrom: 40000, compulsory: true },
      { label: "English Language Development", annualFrom: 30000, annualTo: 40000, compulsory: false },
      { label: "Learning support", annualFrom: 7700, compulsory: false },
      { label: "Explore the Kingdom", annualFrom: 15000, compulsory: false },
    ],
    note: "Grade 1 at 718,400 is higher than Grades 2-5 at 686,000. The annual figure includes a 10,000 technology fee, lunch and snacks, and campus development.",
  },
  "st-andrews-international-school-bangkok": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.nordangliaeducation.com/sta-bangkok/admissions/tuition-fees",
    verified: '2026-09-18',
    rows: [
      { label: "Foundation Stage 2", stage: 'early-years', annual: 607200 },
      { label: "Foundation Stage 3", stage: 'early-years', annual: 636200 },
      { label: "Year 1", stage: 'primary', annual: 636200 },
      { label: "Year 2", stage: 'primary', annual: 654700 },
      { label: "Year 3-6", stage: 'primary', annual: 682000 },
      { label: "Year 7-9", stage: 'lower-secondary', annual: 757100 },
      { label: "Year 10", stage: 'upper-secondary', annual: 823700 },
      { label: "Year 11", stage: 'upper-secondary', annual: 730900, billedTerms: 2 },
      { label: "Year 12", stage: 'sixth-form', annual: 873800 },
      { label: "Year 13", stage: 'sixth-form', annual: 767800, billedTerms: 2 },
    ],
    oneTime: { application: 6500, registration: 160000 },
    includes: ['textbooks', 'exam-fees'],
    excludes: ['uniform', 'transport', 'residential-trips'],
    note: "Enrolment fee is waived entirely for Foundation Stage 2, Foundation Stage 3 and Year 1. Years 7-13 pay 90,000. Can be paid as 35,000 per term instead. Exam fees are included for Years 11 and 13.",
  },
  "regents-international-school-bangkok": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.nordangliaeducation.com/risb-bangkok/admissions/tuition-fees",
    verified: '2026-09-18',
    rows: [
      { label: "Pre-Nursery", stage: 'early-years', annual: 445500 },
      { label: "Nursery", stage: 'early-years', annual: 511200 },
      { label: "Reception", stage: 'early-years', annual: 525000 },
      { label: "Year 1-2", stage: 'primary', annual: 630000 },
      { label: "Year 3-6", stage: 'primary', annual: 668100 },
      { label: "Year 7-9", stage: 'lower-secondary', annual: 750000 },
      { label: "Year 10", stage: 'upper-secondary', annual: 769200 },
      { label: "Year 11", stage: 'upper-secondary', annual: 769200, billedTerms: 2 },
      { label: "Year 12-13", stage: 'sixth-form', annual: 780000, billedTerms: 2 },
    ],
    oneTime: { application: 5500, registration: 75000 },
    includes: ['residential-trips'],
    excludes: ['textbooks', 'after-school', 'exam-fees', 'transport'],
    extras: [
      { label: "Enrolment fee (one-time)", annualFrom: 95000, compulsory: true },
      { label: "Boarding Years 5-6", annualFrom: 335370, compulsory: false },
      { label: "Boarding Years 7+", annualFrom: 392070, compulsory: false },
      { label: "Boarding personal expenses", annualFrom: 90000, compulsory: false },
    ],
    note: "Three separate one-time charges: application 5,500, registration 75,000, enrolment 95,000, totalling 175,500. School has moved to Wang Thonglang. IGCSE and IB exam entry is excluded, unlike sister school St Andrews.",
  },
  "wells-international-school": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://wells.ac.th/school-fees/",
    verified: '2026-09-18',
    rows: [
      { label: "Nursery", stage: 'early-years', annual: 259000 },
      { label: "K1", stage: 'early-years', annual: 284000 },
      { label: "K2", stage: 'early-years', annual: 291000 },
      { label: "K3", stage: 'early-years', annual: 304000 },
      { label: "Grades 1-2", stage: 'primary', annual: 392000 },
      { label: "Grades 3-4", stage: 'primary', annual: 430000 },
      { label: "Grades 5-6", stage: 'primary', annual: 466000 },
      { label: "Grades 7-8", stage: 'lower-secondary', annual: 494000 },
      { label: "Grades 9-10", stage: 'upper-secondary', annual: 540000 },
      { label: "Grades 11-12", stage: 'sixth-form', annual: 570000 },
    ],
    oneTime: { application: 5000, registration: 140000, refundableDeposit: 35000 },
    excludes: ['lunch', 'eal', 'transport'],
    extras: [
      { label: "Campus development fee (one-time)", annualFrom: 70000, annualTo: 140000, compulsory: true },
      { label: "Lunch (mandatory)", annualFrom: 30000, compulsory: true },
      { label: "ESL / learning support", annualFrom: 56000, annualTo: 160000, compulsory: false },
      { label: "Transport", annualFrom: 38000, annualTo: 75000, compulsory: false },
    ],
    note: "The school advertises fees as all-inclusive with no hidden fees, but the schedule carries a 140,000 campus development fee, a 35,000 damage deposit, mandatory lunch at 15,000 a semester and ESL up to 80,000 a semester. Covers the On Nut, Thong Lo and Bang Na campuses; Chonburi has its own schedule.",
  },
  "denla-british-school": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.dbsbangkok.ac.th/fees-and-promotions/",
    verified: '2026-09-18',
    rows: [
      { label: "Mini Dragons (Pre-Nursery)", stage: 'early-years', annual: 548200 },
      { label: "Nursery EY1", stage: 'early-years', annual: 608100 },
      { label: "Reception EY2", stage: 'early-years', annual: 694000 },
      { label: "Year 1-5", stage: 'primary', annual: 826000 },
      { label: "Year 6-8", stage: 'lower-secondary', annual: 909300 },
      { label: "Year 9-11", stage: 'upper-secondary', annual: 965200 },
      { label: "Year 12-13", stage: 'sixth-form', annual: 1042500 },
    ],
    oneTime: { registration: 220000 },
    excludes: ['uniform', 'transport', 'exam-fees'],
    note: "Terms are billed unevenly at roughly 41/33/26 rather than equal thirds, so the first invoice is the largest. The 220,000 admission fee is waived under the Before One and Sixth Form promotions.",
  },
  "wellington-international-school-bangkok": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.wellingtoncollege.ac.th/school-fees",
    verified: '2026-09-18',
    rows: [
      { label: "Pre-Nursery", stage: 'early-years', annual: 639250 },
      { label: "Nursery", stage: 'early-years', annual: 702500 },
      { label: "Reception", stage: 'early-years', annual: 760000 },
      { label: "Year 1-2", stage: 'primary', annual: 882500 },
      { label: "Year 3-4", stage: 'primary', annual: 912975 },
      { label: "Year 5-6", stage: 'primary', annual: 945000 },
      { label: "Year 7-9", stage: 'lower-secondary', annual: 982500 },
      { label: "Year 10-11", stage: 'upper-secondary', annual: 1052500 },
      { label: "Year 12", stage: 'sixth-form', annual: 1283500 },
      { label: "Year 13", stage: 'sixth-form', annual: 855750, billedTerms: 2 },
    ],
    oneTime: { application: 6000, registration: 225000, refundableDeposit: 175000 },
    excludes: ['lunch', 'residential-trips', 'after-school', 'uniform'],
    extras: [
      { label: "School meals", annualFrom: 30600, annualTo: 34200, compulsory: false },
    ],
    note: "The most expensive verified fee in Bangkok at Year 12. Meals are charged separately, unlike Shrewsbury and Harrow which include them.",
  },
  "brighton-college-bangkok": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://brightoncollege.ac.th/file/53/1782355845/tution-fees-2026-27.pdf",
    verified: '2026-09-18',
    rows: [
      { label: "Pre-Nursery", stage: 'early-years', annual: 609200 },
      { label: "Nursery", stage: 'early-years', annual: 689600 },
      { label: "Reception", stage: 'early-years', annual: 733800 },
      { label: "Year 1-2", stage: 'primary', annual: 849900 },
      { label: "Year 3-4", stage: 'primary', annual: 881900 },
      { label: "Year 5-6", stage: 'primary', annual: 923400 },
      { label: "Year 7", stage: 'lower-secondary', annual: 928400 },
      { label: "Year 8-9", stage: 'lower-secondary', annual: 945900 },
      { label: "Year 10-11", stage: 'upper-secondary', annual: 1016600 },
      { label: "Year 12-13", stage: 'sixth-form', annual: 1050500 },
    ],
    oneTime: { application: 5000, registration: 200000, refundableDeposit: 150000 },
    includes: ['lunch'],
    excludes: ['residential-trips', 'transport', 'exam-fees', 'uniform'],
    note: "Figures are for the Krungthep Kreetha campus. Brighton also runs a separate Vibhavadi campus, opened August 2025, with its own fees and admissions team.",
  },
  "kings-college-international-school-bangkok": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.kingsbangkok.ac.th/en/admissions/fees-and-payments",
    verified: '2026-09-18',
    rows: [
      { label: "Pre-Nursery", stage: 'early-years', annual: 636500 },
      { label: "Nursery", stage: 'early-years', annual: 721300 },
      { label: "Reception", stage: 'early-years', annual: 781200 },
      { label: "Year 1-2", stage: 'primary', annual: 879400 },
      { label: "Year 3-4", stage: 'primary', annual: 942400 },
      { label: "Year 5-6", stage: 'primary', annual: 966500 },
      { label: "Year 7-9", stage: 'lower-secondary', annual: 999000 },
      { label: "Year 10", stage: 'upper-secondary', annual: 1098500 },
      { label: "Year 11", stage: 'upper-secondary', annual: 1023000 },
      { label: "Year 12", stage: 'sixth-form', annual: 1098500 },
      { label: "Year 13", stage: 'sixth-form', annual: 1023000 },
    ],
    oneTime: { application: 5000, registration: 225000, refundableDeposit: 200000, waitingPool: 225000 },
    includes: ['lunch', 'snacks', 'eal', 'after-school', 'textbooks'],
    excludes: ['uniform', 'exam-fees', 'residential-trips', 'transport'],
    note: "EAL and special educational needs support within school policy are included in tuition, where Patana charges 105,000 a year for EAL. The waitlist fee is refunded in full if no place opens within 12 months, unlike Harrow's.",
  },
  "singapore-international-school-of-bangkok": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://sisb.ac.th/admissions/tuition-fee/pracha-uthit-campus/",
    verified: '2026-09-18',
    rows: [
      { label: "Nursery 1-2", stage: 'early-years', annual: 401700 },
      { label: "Kindergarten 1-2", stage: 'early-years', annual: 429600 },
      { label: "Primary 1-3", stage: 'primary', annual: 429600 },
      { label: "Primary 4-6", stage: 'primary', annual: 470700 },
      { label: "Grade 7-8", stage: 'lower-secondary', annual: 609300 },
      { label: "Grade 9", stage: 'upper-secondary', annual: 650700 },
      { label: "Grade 10-11", stage: 'upper-secondary', annual: 789300 },
      { label: "Grade 12", stage: 'sixth-form', annual: 789300 },
    ],
    oneTime: { application: 5000, registration: 220000, refundableDeposit: 50000 },
    excludes: ['uniform', 'exam-fees', 'transport', 'after-school'],
    extras: [
      { label: "Assessment fee (one-time)", annualFrom: 5000, compulsory: true },
      { label: "Educational resources", annualFrom: 30500, annualTo: 84000, compulsory: true },
      { label: "ELS support", annualFrom: 40000, annualTo: 60000, compulsory: false },
      { label: "Snack and lunch", annualFrom: 17600, annualTo: 39000, compulsory: false },
    ],
    note: "Pracha Uthit campus. A 50% enrolment fee discount runs until 30 June 2027, worth 110,000. SISB operates six campuses, four in greater Bangkok, each with its own schedule.",
  },
  "international-community-school": {
    status: 'published',
    feeYear: "2027/28",
    sourceUrl: "https://www.ics.ac.th/s/Tuition-and-Fees-Schedule-SY27-28.pdf",
    verified: '2026-09-18',
    rows: [
      { label: "K4-Grade 5", stage: 'primary', annual: 556900 },
      { label: "Grades 6-8", stage: 'lower-secondary', annual: 600800 },
      { label: "Grades 9-12", stage: 'upper-secondary', annual: 659600 },
    ],
    oneTime: { application: 5000, registration: 225000 },
    excludes: ['lunch', 'eal'],
    extras: [
      { label: "Annual capital fee", annualFrom: 30000, compulsory: true },
      { label: "ESL course", annualFrom: 72100, compulsory: false },
      { label: "Elementary lunch plan", annualFrom: 21000, compulsory: false },
      { label: "Graduation fee (Grade 12)", annualFrom: 7000, compulsory: true },
    ],
    note: "ICS publishes a full year ahead of every other school; this is the 2027/28 schedule.",
  },
  "ascot-international-school": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://ascot.ac.th/en/tuition-fees/",
    verified: '2026-09-18',
    rows: [
      { label: "EY1", stage: 'early-years', annual: 331908 },
      { label: "EY2-3", stage: 'early-years', annual: 384516 },
      { label: "Year 1-2", stage: 'primary', annual: 447390 },
      { label: "Year 3-6", stage: 'primary', annual: 507687 },
      { label: "Year 7-9", stage: 'lower-secondary', annual: 543561 },
      { label: "Year 10-11", stage: 'upper-secondary', annual: 575688 },
      { label: "Year 12-13", stage: 'sixth-form', annual: 594969 },
    ],
    oneTime: { application: 6000, registration: 100000, refundableDeposit: 10000 },
    excludes: ['lunch', 'eal', 'exam-fees', 'residential-trips'],
    extras: [
      { label: "Re-enrolment security", annualFrom: 50000, compulsory: true },
    ],
    note: "Enrolment can be paid as 100,000 per child or 180,000 per family, the first per-family option found. Accident insurance up to 10,000 of medical expenses is free.",
  },
  "garden-international-school-bangkok": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://gardenbangkok.com/join-our-community/fees/",
    verified: '2026-09-18',
    rows: [
      { label: "Pre-Nursery half day", stage: 'early-years', annual: 142500 },
      { label: "Pre-Nursery full day", stage: 'early-years', annual: 260100 },
      { label: "Nursery", stage: 'early-years', annual: 324900 },
      { label: "Reception", stage: 'early-years', annual: 395400 },
      { label: "Year 1-6", stage: 'primary', annual: 431100 },
      { label: "Year 7-9", stage: 'lower-secondary', annual: 502500 },
      { label: "Year 10", stage: 'upper-secondary', annual: 505500 },
      { label: "Year 11", stage: 'upper-secondary', annual: 504600, billedTerms: 2 },
      { label: "Year 12-13", stage: 'sixth-form', annual: 514000, billedTerms: 2 },
    ],
    oneTime: { application: 5000, registration: 120000, refundableDeposit: 40000 },
    excludes: ['exam-fees', 'after-school', 'transport'],
    extras: [
      { label: "Education visa document fee", annualFrom: 15000, compulsory: false },
      { label: "School bus", annualFrom: 41400, annualTo: 99000, compulsory: false },
      { label: "EAL support", annualFrom: 17775, compulsory: true },
      { label: "French first language", annualFrom: 24750, compulsory: false },
    ],
    note: "The only school found that publishes an education visa document fee, at 15,000. Enrolment is 60,000 for Foundation Stage and 120,000 for Primary and Secondary. EAL is compulsory where identified.",
  },
  "heathfield-international-school": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://heathfield.ac.th/school-fee/",
    verified: '2026-09-18',
    rows: [
      { label: "Pre-Nursery", stage: 'early-years', annual: 263925 },
      { label: "Nursery and Reception", stage: 'early-years', annual: 312051 },
      { label: "Year 1-2", stage: 'primary', annual: 336582 },
      { label: "Year 3-4", stage: 'primary', annual: 361422 },
      { label: "Year 5", stage: 'primary', annual: 394335 },
      { label: "Year 6", stage: 'primary', annual: 392430 },
      { label: "Year 7-9", stage: 'lower-secondary', annual: 421167 },
      { label: "Year 10", stage: 'upper-secondary', annual: 424500 },
      { label: "Year 11", stage: 'upper-secondary', annual: 424500, billedTerms: 2 },
      { label: "Year 12-13", stage: 'sixth-form', annual: 503400, billedTerms: 2 },
    ],
    oneTime: { application: 2500, registration: 100000, refundableDeposit: 100000 },
    excludes: ['lunch'],
    extras: [
      { label: "Annual resource fee", annualFrom: 8000, annualTo: 40000, compulsory: true },
      { label: "School meals", annualFrom: 26000, annualTo: 39000, compulsory: false },
    ],
    note: "Two separate 100,000 charges at entry: an enrolment fee and an enrolment commitment fee, the latter refundable only with 120 school days notice. The Years 10-13 resource fee covers exam entry for up to 10 IGCSEs and 4 A-Levels. The school publishes its annual increase range of 3-6%.",
  },
  "amnuay-silpa-school": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.amnuaysilpa.ac.th/admissions/fees-entry-guide",
    verified: '2026-09-18',
    rows: [
      { label: "Nursery-Year 6 (Bilingual)", stage: 'primary', annual: 470000 },
      { label: "Year 7-8 (Bilingual)", stage: 'lower-secondary', annual: 495000 },
      { label: "Year 9-10 (Bilingual)", stage: 'upper-secondary', annual: 505000 },
      { label: "Year 11-13 (Bilingual)", stage: 'sixth-form', annual: 510000 },
      { label: "Year 7-8 (International)", stage: 'lower-secondary', annual: 556000 },
      { label: "Year 9-10 (International)", stage: 'upper-secondary', annual: 566500 },
      { label: "Year 11-13 (International)", stage: 'sixth-form', annual: 595000 },
    ],
    oneTime: { application: 3000, registration: 320000, refundableDeposit: 100000 },
    includes: ['lunch', 'snacks', 'exam-fees'],
    excludes: ['uniform', 'after-school'],
    extras: [
      { label: "Resource fee", annualFrom: 21300, annualTo: 41800, compulsory: true },
    ],
    note: "The 320,000 admission fee is the highest one-time charge found and is described as a non-refundable education donation. Two programmes run at different prices: International Bilingual and International.",
  },
  "thai-chinese-international-school": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.tcis.ac.th/admissions",
    verified: '2026-09-18',
    rows: [
      { label: "PK2-PK4", stage: 'early-years', annual: 390083 },
      { label: "Kindergarten", stage: 'early-years', annual: 390083 },
      { label: "Grade 1-2", stage: 'primary', annual: 430604 },
      { label: "Grade 3-5", stage: 'primary', annual: 458077 },
      { label: "Grade 6", stage: 'lower-secondary', annual: 489439 },
      { label: "Grade 7-9", stage: 'lower-secondary', annual: 489635 },
      { label: "Grade 10-11", stage: 'upper-secondary', annual: 516909 },
    ],
    oneTime: { application: 5000, registration: 100000, refundableDeposit: 100000 },
    excludes: ['textbooks', 'exam-fees', 'uniform'],
    extras: [
      { label: "ELL / EIP", annualFrom: 70000, compulsory: false },
      { label: "Chinese for Beginners", annualFrom: 60000, compulsory: false },
      { label: "Military training Grades 10-12", annualFrom: 3000, compulsory: false },
    ],
    note: "Semesters are unequal, with the second cheaper than the first. The 100,000 campus development fund is refundable, unusual in this market. Free insurance to 60,000 per accident.",
  },
  "australian-international-school-bangkok": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.australianisb.ac.th/fees",
    verified: '2026-09-18',
    rows: [
      { label: "Foundation", stage: 'early-years', annual: 413000 },
      { label: "Year 1", stage: 'primary', annual: 467000 },
      { label: "Year 2", stage: 'primary', annual: 484000 },
      { label: "Year 3-4", stage: 'primary', annual: 505000 },
      { label: "Year 5-6", stage: 'primary', annual: 522000 },
      { label: "Year 7-8", stage: 'lower-secondary', annual: 532000 },
      { label: "Year 9-10", stage: 'upper-secondary', annual: 542000 },
      { label: "Year 11-12", stage: 'sixth-form', annual: 554000 },
    ],
    oneTime: { application: 4000, registration: 90000 },
    includes: ['snacks'],
    excludes: ['lunch', 'transport', 'eal', 'after-school', 'exam-fees'],
    extras: [
      { label: "Years 7-9 camps deposit", annualFrom: 10000, compulsory: true },
      { label: "Education resources", annualFrom: 0, compulsory: true },
    ],
    note: "Soi 31 campus, covering Foundation to Year 12. The Soi 20 campus runs Nursery 1 to Year 1 on a separate schedule. Foreign languages, specialist classes, snacks and student insurance are included. 5% discount for full annual payment.",
  },
  "charter-international-school": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://charter.ac.th/admissions/",
    verified: '2026-09-18',
    rows: [
      { label: "Nursery", stage: 'early-years', annual: 292500 },
      { label: "KG-Reception", stage: 'early-years', annual: 447000 },
      { label: "Year 1-6", stage: 'primary', annual: 510000 },
      { label: "Year 7-9", stage: 'lower-secondary', annual: 582000 },
      { label: "Year 10-13", stage: 'upper-secondary', annual: 612000 },
    ],
    oneTime: { application: 2000, registration: 100000, refundableDeposit: 10000 },
    includes: ['lunch', 'snacks', 'eal', 'after-school'],
    excludes: ['uniform', 'textbooks'],
    extras: [
      { label: "Place guarantee deposit", annualFrom: 25000, compulsory: true },
    ],
    note: "Unusually inclusive: tuition covers lunch, snacks, English language support, learning support and after-school activities. Enrolment can be paid as 100,000 per child or 150,000 per family. 5% discount for full-year prepayment.",
  },
  "basis-international-school-bangkok": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://basis.ac.th/admissions/tuitions-fees/",
    verified: '2026-09-18',
    rows: [
      { label: "Nursery", stage: 'early-years', annual: 265000 },
      { label: "PreK 1-2", stage: 'early-years', annual: 653500 },
      { label: "Kindergarten", stage: 'early-years', annual: 680000 },
      { label: "Grades 1-3", stage: 'primary', annual: 810000 },
      { label: "Grades 4-5", stage: 'primary', annual: 820000 },
      { label: "Grades 6-8", stage: 'lower-secondary', annual: 936000 },
      { label: "Grades 9-12", stage: 'upper-secondary', annual: 1038000 },
    ],
    oneTime: { application: 5000, registration: 250000, refundableDeposit: 100000, waitingPool: 250000 },
    includes: ['lunch', 'snacks', 'textbooks'],
    excludes: ['transport', 'exam-fees', 'after-school', 'residential-trips'],
    extras: [
      { label: "Campus development fee", annualFrom: 22000, compulsory: true },
      { label: "Chinese or additional language", annualFrom: 40000, compulsory: false },
    ],
    note: "Tuition jumps 2.5x between Nursery at 265,000 and PreK1 at 653,500, which families entering at Nursery will not expect. Registration doubles as the waitlist fee.",
  },
  "xcl-american-school-of-bangkok": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.asbsk.ac.th/en/admission/tuition-and-fees",
    verified: '2026-09-18',
    rows: [
      { label: "Pre-Kindergarten 1", stage: 'early-years', annual: 476130 },
      { label: "Pre-Kindergarten 2", stage: 'early-years', annual: 539940 },
      { label: "Kindergarten", stage: 'early-years', annual: 539940 },
      { label: "Grades 1-5", stage: 'primary', annual: 677410 },
      { label: "Grades 6-8", stage: 'lower-secondary', annual: 762410 },
      { label: "Grades 9-12", stage: 'upper-secondary', annual: 836130 },
    ],
    oneTime: { registration: 180000 },
    excludes: ['eal', 'transport'],
    extras: [
      { label: "School development fund", annualFrom: 20000, compulsory: true },
      { label: "ELL programme", annualFrom: 113000, annualTo: 121000, compulsory: false },
    ],
    note: "ELL is charged per semester at 56,500 to 60,500, so 113,000 to 121,000 a year, the highest compulsory language-support charge found. The 180,000 school development fund is refundable after one academic year. Sukhumvit campus; Green Valley is separate.",
  },
  "bangkok-christian-international-school": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.bcis.ac.th/school-fees",
    verified: '2026-09-18',
    rows: [
      { label: "K1-K2", stage: 'early-years', annual: 267900 },
      { label: "K3", stage: 'early-years', annual: 273900 },
      { label: "Grade 1-2", stage: 'primary', annual: 255300 },
      { label: "Grade 3-4", stage: 'primary', annual: 281300 },
      { label: "Grade 5", stage: 'primary', annual: 282300 },
      { label: "Grade 6", stage: 'lower-secondary', annual: 285300 },
      { label: "Grade 7-8", stage: 'lower-secondary', annual: 326500 },
      { label: "Grade 9-10", stage: 'upper-secondary', annual: 337500 },
      { label: "Grade 11", stage: 'upper-secondary', annual: 339500 },
      { label: "Grade 12", stage: 'sixth-form', annual: 342500 },
    ],
    oneTime: { application: 5000, registration: 140000 },
    includes: ['lunch'],
    excludes: ['eal', 'uniform'],
    extras: [
      { label: "EFL support Grades 1-6", annualFrom: 38000, compulsory: false },
      { label: "Military training Grades 10-12", annualFrom: 5000, compulsory: false },
    ],
    note: "Grades 1-2 at 255,300 are cheaper than Kindergarten at 267,900. Admission fee is 120,000 for Kindergarten and 140,000 for Elementary and High School. Among the most affordable full K-12 international programmes in Bangkok.",
  },
  "trinity-international-school": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://trinity.ac.th/placement/",
    verified: '2026-09-18',
    rows: [
      { label: "K1-K3", stage: 'early-years', annual: 154250 },
      { label: "Grades 1-5", stage: 'primary', annual: 200250 },
      { label: "Grades 6-8", stage: 'lower-secondary', annual: 203900 },
      { label: "Grades 9-12", stage: 'upper-secondary', annual: 220870 },
    ],
    oneTime: { application: 4000, registration: 110000, refundableDeposit: 22000 },
    includes: ['lunch', 'snacks'],
    excludes: ['eal', 'transport', 'residential-trips'],
    extras: [
      { label: "General fees", annualFrom: 40100, annualTo: 78080, compulsory: true },
      { label: "Lunch and morning snack", annualFrom: 15550, annualTo: 24400, compulsory: true },
      { label: "Re-registration fee (every February)", annualFrom: 15000, compulsory: true },
      { label: "EAL support", annualFrom: 60000, compulsory: false },
    ],
    note: "The clearest fee document of any school, with a blank calculation worksheet for parents. The development deposit of 80,000-110,000 is struck through and waived until 31 July 2027. A 15,000 re-registration fee falls every February to hold next year's seat.",
  },
  "niva-american-international-school": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://www.niva.ac.th/fees",
    verified: '2026-09-18',
    rows: [
      { label: "Nursery", stage: 'early-years', annual: 273000 },
      { label: "K1", stage: 'early-years', annual: 308000 },
      { label: "K2", stage: 'early-years', annual: 313000 },
      { label: "K3", stage: 'early-years', annual: 323000 },
      { label: "Grade 1", stage: 'primary', annual: 335000 },
      { label: "Grade 2", stage: 'primary', annual: 344000 },
      { label: "Grade 3", stage: 'primary', annual: 348000 },
      { label: "Grade 4", stage: 'primary', annual: 354000 },
      { label: "Grade 5", stage: 'primary', annual: 358000 },
      { label: "Grade 6", stage: 'lower-secondary', annual: 370000 },
      { label: "Grade 7", stage: 'lower-secondary', annual: 378000 },
      { label: "Grade 8", stage: 'lower-secondary', annual: 384000 },
      { label: "Grade 9", stage: 'upper-secondary', annual: 396000 },
      { label: "Grade 10", stage: 'upper-secondary', annual: 402000 },
      { label: "Grade 11", stage: 'upper-secondary', annual: 408000 },
      { label: "Grade 12", stage: 'sixth-form', annual: 412000 },
    ],
    oneTime: { application: 5000, registration: 100000, refundableDeposit: 20000 },
    includes: ['lunch', 'textbooks', 'after-school', 'exam-fees'],
    excludes: ['transport', 'uniform'],
    extras: [
      { label: "Graduation fee (Grade 12)", annualFrom: 5000, compulsory: false },
    ],
    note: "The only school that publishes a true all-in annual total itself, combining tuition, a flat 60,000 miscellaneous fee and catering. The miscellaneous fee covers insurance, textbooks, software, lab fees, ECAs, library, swimming, sports and field trips.",
  },
  "dprep-bangkok": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://dprep.ac.th/admission/tuition-fees/",
    verified: '2026-09-18',
    rows: [
      { label: "Nursery N1-N2", stage: 'early-years', annual: 453880 },
      { label: "Kindergarten K1-K2", stage: 'early-years', annual: 535380 },
      { label: "Primary Grades 1-5", stage: 'primary', annual: 624860 },
      { label: "Middle Grades 6-8", stage: 'lower-secondary', annual: 676850 },
      { label: "High Grades 9-12", stage: 'upper-secondary', annual: 698290 },
    ],
    oneTime: { application: 3000, registration: 150000, refundableDeposit: 50000 },
    excludes: ['lunch', 'eal'],
    extras: [
      { label: "Food and utilities", annualFrom: 45000, compulsory: true },
      { label: "Development fund", annualFrom: 20000, compulsory: true },
    ],
    note: "The 45,000 food and utilities charge covers all school-day food, workbooks, learning materials, two daytime field trips from K1 and accident insurance.",
  },
  "rbis-international-school": {
    status: 'published',
    feeYear: "2026/27",
    sourceUrl: "https://rbis.ac.th/wp-content/uploads/2026/05/School-Fees-Structure-2026-2027.pdf",
    verified: '2026-09-18',
    rows: [
      { label: "Toddler", stage: 'early-years', annual: 264000 },
      { label: "Nursery", stage: 'early-years', annual: 294000 },
      { label: "Pre-Reception", stage: 'early-years', annual: 348000 },
      { label: "Reception", stage: 'early-years', annual: 348000 },
      { label: "Year 1-2", stage: 'primary', annual: 429000 },
      { label: "Year 3-6", stage: 'primary', annual: 444000 },
      { label: "Year 7-9", stage: 'lower-secondary', annual: 534000 },
      { label: "Year 10-11", stage: 'upper-secondary', annual: 570000 },
      { label: "Year 12-13", stage: 'sixth-form', annual: 564000, billedTerms: 2 },
    ],
    oneTime: { application: 5000, registration: 100000, refundableDeposit: 30000 },
    includes: ['residential-trips'],
    excludes: ['lunch', 'eal', 'exam-fees', 'transport'],
    extras: [
      { label: "Meals", annualFrom: 36000, annualTo: 42000, compulsory: true },
      { label: "Educational enhancement", annualFrom: 9000, annualTo: 18000, compulsory: true },
      { label: "EAL support", annualFrom: 30000, annualTo: 120000, compulsory: false },
      { label: "Nurture support", annualFrom: 120000, compulsory: false },
    ],
    note: "Registration can be paid as 40,000 per term over up to three terms instead of a lump sum. Residential trips are now mandatory but charged separately. Fee-in-advance discounts of 5% or 10% for paying 1-2 or 3 years ahead.",
  },
};

/** Schools checked on 18 September 2026 that publish no fee figures at all. */
export const feesOnEnquiry: Record<string, { checked: string; detail: string }> = {
  "nist-international-school-bangkok": { checked: '2026-09-18', detail: "The tuition page explains the not-for-profit model but gives no figures and directs families to admissions@nist.ac.th." },
  "concordian-bangkok-concordian-international-school-bangkok": { checked: '2026-09-18', detail: "The admissions section covers the application form, tours, schedule and scholarships. There is no fees page." },
  "dulwich-college-international-school-bangkok": { checked: '2026-09-18', detail: "The admissions section offers enquire, apply and visit only. No fees page exists." },
  "anglo-singapore-international-school": { checked: '2026-09-18', detail: "The fees page lists what tuition covers, then directs families to the admissions department for figures." },
  "sarasas-ektra-school": { checked: '2026-09-18', detail: "No fee figures on the English site." },
  "bromsgrove-international-school-thailand": { checked: '2026-09-18', detail: "Publishes deposits, EAL rates, sibling discounts, exam and residential trip fees, but not the tuition table itself." },
};


// ---------------------------------------------------------------------------
// Helpers. Everything the site displays about a school's fees goes through
// these, so schoolFees above is the single source of truth.
// ---------------------------------------------------------------------------

/** Rows billed for a full year. Exam years billed over two terms are left out
 *  of headline figures because their lower total is not a cheaper product. */
function fullYearRows(f: SchoolFees): FeeRow[] {
  return (f.rows ?? []).filter((r) => r.billedTerms !== 2);
}

export interface FeeSummary {
  /** First primary-stage row (usually Year 1 or Grade 1), the comparable headline. */
  primary?: FeeRow;
  from: FeeRow;
  to: FeeRow;
  feeYear: string;
  verified?: string;
  sourceUrl?: string;
}

/** Lowest and highest full-year fee, each with the school's own year-group label. */
export function feeSummary(slug: string): FeeSummary | null {
  const f = schoolFees[slug];
  if (!f || f.status !== "published") return null;
  const rows = fullYearRows(f);
  if (rows.length === 0) return null;
  const from = rows.reduce((a, b) => (b.annual < a.annual ? b : a));
  const to = rows.reduce((a, b) => (b.annual > a.annual ? b : a));
  const primary = rows.find((r) => r.stage === "primary");
  return { primary, from, to, feeYear: f.feeYear, verified: f.verified, sourceUrl: f.sourceUrl };
}

/**
 * Budget tag for a verified school, read from its first primary-stage fee
 * (Year 1 or Grade 1 in most schedules). Locking to one stage follows the
 * rule above: early years rows mix half days, parent sessions and meal plans,
 * so an average across every row is not comparable between schools. Schools
 * with no primary row fall back to the mean of their full-year rows.
 */
export function verifiedBudget(slug: string): "under400k" | "over400k" | null {
  const f = schoolFees[slug];
  if (!f || f.status !== "published") return null;
  const rows = fullYearRows(f);
  if (rows.length === 0) return null;
  const primary = rows.find((r) => r.stage === "primary");
  const basis = primary
    ? primary.annual
    : rows.reduce((sum, r) => sum + r.annual, 0) / rows.length;
  return basis >= 400000 ? "over400k" : "under400k";
}

export function formatThb(n: number): string {
  return n.toLocaleString("en-US");
}

/** "18 September 2026" from an ISO date, without timezone drift. */
export function formatVerifiedDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

export const INCLUSION_LABEL: Record<Inclusion, string> = {
  lunch: "Lunch",
  snacks: "Snacks",
  textbooks: "Textbooks",
  "residential-trips": "Residential trips",
  eal: "English language support",
  transport: "School bus",
  uniform: "Uniform",
  "exam-fees": "Exam fees",
  "after-school": "After-school activities",
};

export const ONE_TIME_LABEL: Record<keyof OneTimeFees, string> = {
  application: "Application fee",
  registration: "Registration or entrance fee",
  refundableDeposit: "Refundable deposit",
  waitingPool: "Waiting pool fee",
};
