import Link from "next/link";
import { CAMPS, isFinished } from "@/lib/camps";
import { EARLY_YEARS_PATH } from "@/lib/earlyYears";
import { PRIMARY_PATH } from "@/lib/primarySchools";

// Internal-links block for the holiday guides, which bring in over half the
// site's Google clicks. Lists every camp with CONFIRMED winter break dates
// (straight from camps.ts, so it updates itself and drops camps once they
// finish), plus the school landing pages for families planning an August
// start during January admissions season.

const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function day(iso: string): string {
  const [, m, d] = iso.split("-").map(Number);
  return `${d} ${SHORT[m - 1]}`;
}

export default function WinterCampsStrip({
  accent = "text-orange",
  heading = "Winter break camps with confirmed dates",
}: {
  accent?: string;
  heading?: string;
}) {
  const camps = CAMPS.map((camp) => {
    const s = camp.sessions
      .filter((x) => x.window === "winter-2026" && x.dateStatus === "confirmed" && x.startDate && x.endDate && !isFinished(x))
      .sort((a, b) => (a.startDate! < b.startDate! ? -1 : 1));
    if (s.length === 0) return null;
    const first = s[0].startDate!;
    const last = s.reduce((m, x) => (x.endDate! > m ? x.endDate! : m), s[0].endDate!);
    return { camp, first, last };
  })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => (a.first < b.first ? -1 : 1));

  if (camps.length === 0) return null;

  return (
    <div className="mt-8 rounded-xl border border-black/5 bg-white p-5 shadow-sm">
      <h3 className="font-heading text-lg font-bold text-purple-dark">{heading}</h3>
      <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-[15px] sm:grid-cols-2">
        {camps.map(({ camp, first, last }) => (
          <li key={camp.slug}>
            <Link href={`/camps/${camp.slug}`} className={`font-semibold hover:underline ${accent}`}>
              {camp.name}
            </Link>
            <span className="text-neutral-500"> · {day(first)} to {day(last)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-neutral-600">
        All camps, prices and ages are in our{" "}
        <Link href="/camps" className={`font-semibold hover:underline ${accent}`}>holiday camps directory</Link>.
        Starting school in August? Applications open over the winter: see{" "}
        <Link href={EARLY_YEARS_PATH} className={`font-semibold hover:underline ${accent}`}>international kindergartens</Link> and{" "}
        <Link href={PRIMARY_PATH} className={`font-semibold hover:underline ${accent}`}>international primary schools</Link> in Bangkok.
      </p>
    </div>
  );
}
