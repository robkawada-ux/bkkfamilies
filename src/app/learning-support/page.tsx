import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import LearningSupportDirectory from "@/components/ui/LearningSupportDirectory";
import { PROVIDERS } from "@/lib/learningSupport";

export const metadata: Metadata = {
  title: "Learning Support in Bangkok",
  description:
    "A directory of learning support, assessment, therapy and special educational needs providers in Bangkok, with plain-English guidance on where to start.",
  alternates: {
    canonical: "https://www.bkkfamilies.com/learning-support",
  },
};

const FAQ = [
  {
    q: "My child's school says they are fine. I am not convinced. What do I do?",
    a: "Schools see one version of your child. You see another, usually the one that comes home exhausted. You do not need the school's permission to seek an independent assessment, and you do not need to tell them you are doing it. If the assessment confirms a need, the report gives you something the school has to respond to.",
  },
  {
    q: "Assessment, therapy, tutoring. What is the difference?",
    a: "An assessment tells you what is going on and produces a report. Therapy works on an underlying skill, such as speech, motor control, regulation or behaviour, and is usually delivered by a licensed clinician. Tutoring teaches the subject content your child is behind on. They are not substitutes for each other, and paying for tutoring when the problem is a language disorder wastes years.",
  },
  {
    q: "How much should I expect to pay?",
    a: "Private assessment in Bangkok typically runs into the tens of thousands of baht, and ongoing weekly therapy adds up quickly. Most expat health policies exclude developmental assessment and therapy even when the hospital is in network, so check the policy wording before you book. Rajanukul Institute is the public route and is far cheaper, though services are in Thai and waits are longer.",
  },
  {
    q: "Does my child need a diagnosis?",
    a: "Not always for support, but usually for anything formal. Exam access arrangements such as extra time, a place in a specialist programme, and an insurance claim all generally require a report from a properly qualified assessor. If your child is approaching IGCSEs or A Levels, get the assessment done well before the exam series, not in the term before.",
  },
  {
    q: "What should I ask a provider before booking?",
    a: "What are your staff's qualifications and who registers them. How many children with my child's profile have you worked with. What will you measure, and how will we know if it is working. Will you talk to my child's school. What happens if it is not working after three months. Any provider worth using will answer all five without hesitating.",
  },
  {
    q: "Is it too late? My child is already a teenager.",
    a: "No, but the goal shifts. For older teenagers the highest value work is often executive function coaching, exam access arrangements and transition planning toward work or further study rather than remediation of early skills. Steps and CARE both run programmes for young adults, which is unusual in Bangkok.",
  },
];

export default function LearningSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="You are not the only one"
        title="Learning Support in Bangkok"
        subtitle={`Assessment, therapy, specialist schools and parent support, all in one place. ${PROVIDERS.length} providers, checked and described honestly.`}
        color="purple"
        image="/images/learning-support/hero.jpg"
        imageAlt="A mother leaning over a homework book at the kitchen table, trying to explain something to her son, who has his chin in his hand and is looking away."
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Intro */}
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-neutral-700">
          <p>
            Something is not right. Maybe reading has stalled while everyone
            else in the class moved on. Maybe the teacher keeps using the word
            &ldquo;focus&rdquo;. Maybe your three-year-old still is not talking
            and your mother-in-law keeps telling you that boys are slow. Maybe
            you already know exactly what you are dealing with and you have just
            arrived in a city where you do not know a single phone number.
          </p>
          <p>
            Finding help in Bangkok is harder than it should be. The good
            providers do not advertise much, the directories that exist are
            mostly paid listings, and the difference between a speech therapist
            and a speech and drama class is not obvious until you have wasted a
            term on the wrong one. So we built this: every learning support
            provider we could verify, described in plain language, with the
            caveats included rather than removed.
          </p>
          <p>
            Nobody pays to be on this page. Where we could not confirm
            something, we say so. Where a provider looks miscategorised or their
            website has gone bad, we say that too.
          </p>
        </div>

        {/* Where to start */}
        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Where to start, in order
          </h2>
          <ol className="mt-4 space-y-4">
            {[
              {
                t: "Write down what you are actually seeing",
                d: "Specific, dated examples beat impressions. Reads a line, then loses the place. Meltdown after school on Tuesdays and Thursdays. Cannot copy from the board. This list is what a good assessor will ask for first, and it is what makes a school take you seriously.",
              },
              {
                t: "Talk to the school, and ask for it in writing",
                d: "Most international schools in Bangkok have some learning support. Ask what they have already noticed, what support they can provide in class, and who coordinates it. Ask for their response by email so there is a record.",
              },
              {
                t: "Get an assessment if the picture is unclear",
                d: "A paediatrician or child psychiatrist for a medical opinion, an educational psychologist or specialist assessor for a learning profile. This is the step families most often skip, and it is the one that saves the most money in the long run.",
              },
              {
                t: "Then choose the intervention, not before",
                d: "Therapy, specialist teaching, a different school, or simply better accommodations in the current one. The assessment tells you which. Choosing first and assessing later is how families end up two years and several hundred thousand baht down the wrong road.",
              },
              {
                t: "Find other parents",
                d: "The Rainbow Room and LEAP Bangkok both exist for this, both are free, and both will save you more time than any amount of searching. So will asking in our Facebook group, where a lot of families have already been where you are.",
              },
            ].map((s, i) => (
              <li
                key={s.t}
                className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-purple-dark">
                      {s.t}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                      {s.d}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Directory */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            The directory
          </h2>
          <p className="mb-8 mt-2 max-w-3xl text-neutral-600">
            Filter by the kind of support you need, by area, or by specialism.
            Every listing has its own page with contact details and an honest
            description of what the provider does and does not do.
          </p>
          <LearningSupportDirectory />
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Questions parents actually ask
          </h2>
          <div className="mt-6 space-y-4">
            {FAQ.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <h3 className="font-heading font-bold text-purple-dark">
                  {f.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Other resources */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">
            Other places worth looking
          </h2>
          <ul className="mt-4 space-y-3 text-neutral-700">
            <li>
              <a
                href="https://bangkokcommunityresources.isb.ac.th/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-orange"
              >
                Bangkok Community Resources
              </a>
              , a free public directory maintained by International School
              Bangkok covering counselling, psychiatry, allied health and
              learning needs. Open to anyone, not just ISB families.
            </li>
            <li>
              <Link href="/schools" className="font-semibold text-orange">
                Our schools directory
              </Link>
              , if the answer turns out to be a different school rather than a
              different therapist.
            </li>
            <li>
              <a
                href="https://www.facebook.com/groups/395501457186828"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-orange"
              >
                Bangkok Expat Families on Facebook
              </a>
              , where you can ask parents who have already used most of the
              providers on this page.
            </li>
          </ul>
        </div>

        {/* Corrections */}
        <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-black/5 bg-neutral-50 p-6">
          <h2 className="font-heading text-lg font-bold text-purple-dark">
            Something wrong, or something missing?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Details change, centres move, people move on. If you spot an error,
            know a provider we have missed, or you run one of these services and
            want your entry updated, tell us and we will fix it. This page is
            only useful if it is accurate.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Send us a correction
          </Link>
        </div>
      </div>
    </>
  );
}
