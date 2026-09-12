"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

type NavLink = {
  href: string;
  label: string;
  /** Full literal class strings so Tailwind's scanner picks them up */
  block: string;
  hover: string;
  /** Colour of the active-page underline */
  bar: string;
};

const LINKS: NavLink[] = [
  {
    href: "/",
    label: "Home",
    block: "bg-orange text-purple-dark",
    hover: "hover:brightness-105",
    bar: "bg-purple-dark",
  },
  {
    href: "/schools",
    label: "Schools",
    block: "bg-teal text-purple-dark",
    hover: "hover:brightness-105",
    bar: "bg-purple-dark",
  },
  {
    href: "/activities",
    label: "Activities",
    block: "bg-green text-purple-dark",
    hover: "hover:brightness-105",
    bar: "bg-purple-dark",
  },
  {
    href: "/fitness-health",
    label: "Fitness/Health",
    block: "bg-purple text-white",
    hover: "hover:brightness-125",
    bar: "bg-white",
  },
  {
    href: "/learning-support",
    label: "Learning Support",
    block: "bg-orange text-purple-dark",
    hover: "hover:brightness-105",
    bar: "bg-purple-dark",
  },
  {
    href: "/blog",
    label: "Blog",
    block: "bg-teal text-purple-dark",
    hover: "hover:brightness-105",
    bar: "bg-purple-dark",
  },
  {
    href: "/contact",
    label: "Contact",
    block: "bg-green text-purple-dark",
    hover: "hover:brightness-105",
    bar: "bg-purple-dark",
  },
  {
    href: "/contact#advertise",
    label: "Advertise With Us",
    block: "bg-purple-dark text-white",
    hover: "hover:brightness-150",
    bar: "bg-white",
  },
];

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    if (path === "/") return pathname === "/";
    if (path === "/contact") return pathname === "/contact";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={36} />
          <span className="font-heading text-lg font-bold text-purple-dark sm:text-xl">
            BKK Families
          </span>
        </Link>
        <p className="hidden text-sm italic text-neutral-500 sm:block">
          Your Bangkok Roadmap
        </p>
      </div>

      <nav
        aria-label="Main"
        className="grid grid-cols-2 border-b-[3px] border-white sm:grid-cols-4 md:grid-cols-8"
      >
        {LINKS.map((l) => {
          const active = isActive(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`relative px-2 py-3 text-center text-xs font-bold uppercase tracking-wide transition md:text-[0.7rem] lg:text-xs ${l.block} ${l.hover}`}
            >
              {l.label}
              {active && (
                <span
                  className={`absolute inset-x-0 bottom-0 h-1 ${l.bar}`}
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
