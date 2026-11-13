import type { Article } from "./articles";

/**
 * Private previews of sponsored articles waiting for the sponsor's approval.
 *
 * These are NOT in ARTICLES, so they stay out of /blog, the homepage, the
 * sitemap and related links. The blog page still renders them at
 * /blog/<slug> (on demand) with noindex and a "private preview" banner, so
 * the sponsor can see exactly how the article will look. The slugs end in a
 * random suffix so nobody stumbles on them.
 *
 * To publish: move the entry into ARTICLES, drop the suffix from the slug,
 * set date to the publish date, and delete it here.
 */
export const PREVIEW_ARTICLES: Article[] = [
  {
    slug: "how-to-choose-a-level-subjects-expat-parents-260baf",
    title: "How to Choose A-Level Subjects: A Guide for Expat Parents",
    category: "Schools",
    date: "2026-11-13",
    sponsored: { sponsor: "Top A Level Tutors", logo: "/images/sponsors/top-a-level-tutors.png" },
    metaDescription:
      "How expat parents can help their child choose A-Level subjects: start from university entry requirements, play to real strengths, understand the exam boards and get support early. From Top A Level Tutors.",
    keywords: ["how to choose A-Level subjects", "A-Levels for expat families", "A-Level subjects university requirements", "A-Levels Bangkok", "Top A Level Tutors"],
    excerpt:
      "The A-Level subjects your child picks at 16 shape their university options in the UK, Thailand and beyond. Top A Level Tutors explains how to choose well, even if A-Levels are new to you.",
    body: [
      "Choosing A-Level subjects is one of the first big academic decisions a secondary school student makes. For expat families, the choice can feel even bigger: A-Levels may be new to you, and the subjects your child picks at 16 will shape their university options in the UK, Thailand and beyond.",
      "**A note from BKK Families:** in Bangkok, most British-curriculum international schools take students through IGCSE at 16 and then A-Levels in the final two years, though some, Bangkok Patana among them, offer the IB Diploma instead. Our [guide to British curriculum schools in Bangkok](/schools/british-curriculum-schools-bangkok) shows which route each school follows.",
      "**Start with where your child wants to end up.** The most useful starting point is not “which subjects are easiest” but “which subjects keep the right doors open”. Many degree courses name required A-Level subjects, and the requirements vary by university and course. For example, current UCAS listings show medicine degrees commonly require Chemistry, and many also require Biology or another science or Maths, while engineering degrees commonly require Maths and Physics. If your child has a degree or career in mind, look up the current entry requirements for a few real courses now, not in the final year. UCAS course pages list them, and the Russell Group’s Informed Choices website lets you check which degrees different A-Level subjects lead to.",
      "**If they do not know yet, that is normal.** Rather than any fixed list of “approved” subjects (the Russell Group retired its old list some years ago), the practical advice is to keep a balanced combination of subjects your child is genuinely good at and enjoys, and to check that the combination does not close off the broad areas they might want.",
      "**Play to genuine strengths.** A-Levels go into real depth, so interest matters as much as grades. A student who enjoys a subject is more likely to sustain the independent study it demands. Look at which GCSE or IGCSE subjects your child actually engages with, not just the ones they score well in.",
      "**Three strong subjects beat four stretched ones.** Most universities make offers on three A-Levels. It is also worth checking that the combination tells a coherent story for the courses your child might target, for example Maths and Physics alongside Computer Science for technical degrees.",
      "**Understand the exam boards.** International schools may follow different exam boards, such as Cambridge International, Edexcel International or Oxford AQA, and the content and assessment style differ between them. Knowing which board your child sits helps with everything from textbooks to past papers.",
      "**Get support early.** The step up from IGCSE to A-Level is bigger than many students expect. If your child is finding the pace difficult, it is worth acting early in the course rather than waiting for the final exams.",
      "**About Top A Level Tutors:** Top A Level Tutors provides online one-to-one tutoring for A-Level, AS, GCSE and IGCSE students in the UK and worldwide, covering UK and international exam boards. Learn more at [www.topaleveltutors.com](https://www.topaleveltutors.com).",
    ],
  },
  {
    slug: "supporting-your-child-through-the-ib-diploma-54db3f",
    title: "Supporting Your Child Through the IB Diploma: IAs, the Extended Essay and Exam Preparation",
    category: "Schools",
    date: "2026-11-13",
    sponsored: { sponsor: "Top IB Tutors", logo: "/images/sponsors/top-ib-tutors.png" },
    metaDescription:
      "What the IB Diploma's Internal Assessments, Extended Essay, TOK, CAS and final exams involve, and how parents can help without breaking the IB's academic integrity rules. From Top IB Tutors.",
    keywords: ["IB Diploma guide for parents", "IB Internal Assessment", "IB Extended Essay", "IB schools Bangkok", "Top IB Tutors"],
    excerpt:
      "IA, EE, TOK, CAS: parents often hear the acronyms before they understand them. Top IB Tutors explains what each part of the IB Diploma involves and how families can help.",
    headings: [
      { beforeParagraph: 2, text: "Internal Assessments (IAs)" },
      { beforeParagraph: 3, text: "The Extended Essay (EE)" },
      { beforeParagraph: 4, text: "A word on academic integrity" },
      { beforeParagraph: 5, text: "Theory of Knowledge and CAS" },
      { beforeParagraph: 6, text: "Final exams" },
    ],
    body: [
      "The IB Diploma is a demanding two-year programme, and parents often hear the acronyms before they understand them: IA, EE, TOK, CAS. Here is what the main components involve and how families can help.",
      "**A note from BKK Families:** 22 schools in our Bangkok directory teach the International Baccalaureate, and a few, including [Ascot](/schools/ascot-international-school), [KIS](/schools/kis-international-school-bangkok) and [NIST](/schools/nist-international-school-bangkok), offer it all the way from primary to the Diploma. You can compare them in our [schools directory](/schools).",
      "Most IB subjects include an internally assessed component, marked by the school and moderated by the IB. The format varies widely by subject: it might be a research investigation, a portfolio, or an individual oral in a language course. Depending on the subject, it typically counts for roughly a fifth to a third of the final grade, so it rewards early planning. Encourage your child to agree a realistic timeline with their teacher rather than leaving it to the final term.",
      "The Extended Essay is a compulsory piece of independent research, culminating in a paper of up to 4,000 words. It is often a student’s first taste of university-style research: forming a question, planning, drafting and refining over several months. Students do best when they pick a focused question in a subject they enjoy and use the feedback sessions with their school supervisor well. Note that the IB is introducing an updated Extended Essay model with first assessment in 2027, so check the current requirements with your school.",
      "Assessed coursework must be the student’s own work. The IB’s academic integrity policy treats help from private tutors with completing or editing assessed work as non-permitted assistance, and the rules for the Extended Essay are stricter still: feedback beyond what the school supervisor provides is not allowed. If your child works with a tutor, keep that support to understanding the syllabus, building skills and preparing for exams, and ask the school what is permitted for assessed components.",
      "Theory of Knowledge (TOK) asks students to reflect on how knowledge works, and CAS (Creativity, Activity, Service) takes learning beyond the classroom. Both are required parts of the Diploma core, and TOK and the Extended Essay together can contribute up to 3 bonus points toward the 45-point total.",
      "For most subjects, written examinations at the end of the two years form the basis of the final grade. Steady revision over the course, including past papers under timed conditions, tends to serve students better than last-minute cramming.",
      "**About Top IB Tutors:** Top IB Tutors is an online IB tutoring company supporting students worldwide with subject teaching and exam preparation. Its academic tutors are high-achieving IB graduates with an average IB score of 43. Tutoring is pay-as-you-go with no lock-in contracts. Learn more at [www.topibtutors.com](https://www.topibtutors.com).",
    ],
  },
];

export function getPreviewArticle(slug: string) {
  return PREVIEW_ARTICLES.find((a) => a.slug === slug);
}
