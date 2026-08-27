import Link from "next/link";
import Logo from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/schools", label: "Schools" },
  { href: "/activities", label: "Activities" },
  { href: "/fitness-health", label: "Fitness/Health" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={40} />
          <span className="font-heading text-lg font-bold text-purple-dark">
            BKK Families
          </span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-neutral-700 transition hover:text-orange"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 md:inline-block"
        >
          Advertise With Us
        </Link>
      </div>
      {/* mobile nav */}
      <nav className="flex gap-4 overflow-x-auto border-t border-black/5 px-4 py-2 md:hidden">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="whitespace-nowrap text-xs font-medium text-neutral-700"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
