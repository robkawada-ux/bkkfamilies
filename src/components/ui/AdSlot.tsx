import Link from "next/link";
import { activeAd, HOUSE_PROMOS, type AdSlotId } from "@/lib/ads";

const PROMO_COLORS = {
  teal: "border-teal bg-teal-50",
  green: "border-green bg-green-50",
  orange: "border-orange bg-orange-50",
} as const;

function SponsoredLabel() {
  return (
    <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
      Sponsored
    </span>
  );
}

/** Full-width homepage banner. Shows the booked sponsor, or an advertise-here panel. */
export function TopBanner() {
  const ad = activeAd("home-top");
  if (ad) {
    return (
      <a
        href={ad.href}
        target="_blank"
        rel="sponsored noopener"
        className="relative block overflow-hidden rounded-xl border border-black/10"
      >
        <picture>
          {ad.mobileImage && <source media="(max-width: 639px)" srcSet={ad.mobileImage} />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ad.image} alt={ad.alt} className="h-auto w-full" />
        </picture>
        <SponsoredLabel />
      </a>
    );
  }
  return (
    <Link
      href="/contact#advertise"
      className="flex flex-col items-start justify-between gap-3 rounded-xl border-2 border-dashed border-purple/30 bg-purple-50 px-6 py-5 transition hover:border-purple/60 sm:flex-row sm:items-center"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-purple">
          Advertise here
        </p>
        <p className="mt-1 font-heading text-lg font-bold text-purple-dark">
          Put your business in front of every family who visits BKK Families.
        </p>
        <p className="mt-0.5 text-sm text-neutral-600">
          The homepage top banner is sold to one advertiser at a time, never rotated.
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-purple px-5 py-2 text-sm font-semibold text-white">
        See options
      </span>
    </Link>
  );
}

/** A 300 x 250 sidebar slot. Shows the booked sponsor, or promotes one of our own sections. */
export function SidebarSlot({ slot }: { slot: Exclude<AdSlotId, "home-top"> }) {
  const ad = activeAd(slot);
  if (ad) {
    return (
      <a
        href={ad.href}
        target="_blank"
        rel="sponsored noopener"
        className="relative mx-auto block w-full max-w-[300px] overflow-hidden rounded-xl border border-black/10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ad.image} alt={ad.alt} width={300} height={250} className="h-auto w-full" />
        <SponsoredLabel />
      </a>
    );
  }
  const p = HOUSE_PROMOS[slot];
  return (
    <Link
      href={p.href}
      className={`block rounded-xl border-l-4 p-5 transition hover:shadow-md ${PROMO_COLORS[p.color]}`}
    >
      <p className="text-xs font-bold uppercase tracking-wide text-purple">{p.eyebrow}</p>
      <p className="mt-1 font-heading text-lg font-bold text-purple-dark">{p.title}</p>
      <p className="mt-1 text-sm text-neutral-600">{p.text}</p>
      <p className="mt-2 text-sm font-semibold text-orange">Open →</p>
    </Link>
  );
}
