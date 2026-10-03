"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

type NavLink = {
  href: string;
  label: string;
  /**
   * Full literal class strings so Tailwind's scanner picks them up.
   * `mobile` colours the two-column menu below lg, arranged as a
   * checkerboard so no two neighbouring blocks share a colour.
   * `desktop` colours the single ten-column bar from lg up.
   */
  mobile: string;
  desktop: string;
  hover: string;
  /** Colour of the active-page underline */
  bar: string;
};

const LINKS: NavLink[] = [
  { href: "/", label: "Home", mobile: "bg-orange text-purple-dark", desktop: "lg:bg-orange lg:text-purple-dark", hover: "hover:brightness-105", bar: "bg-purple-dark" },
  { href: "/schools", label: "Schools", mobile: "bg-teal text-purple-dark", desktop: "lg:bg-teal lg:text-purple-dark", hover: "hover:brightness-105", bar: "bg-purple-dark" },
  { href: "/learning-support", label: "Learning Support", mobile: "bg-purple text-white", desktop: "lg:bg-green lg:text-purple-dark", hover: "hover:brightness-110", bar: "bg-white lg:bg-purple-dark" },
  { href: "/camps", label: "Camps", mobile: "bg-green text-purple-dark", desktop: "lg:bg-purple lg:text-white", hover: "hover:brightness-110", bar: "bg-purple-dark lg:bg-white" },
  { href: "/playgroups", label: "Playgroups", mobile: "bg-teal text-purple-dark", desktop: "lg:bg-green lg:text-purple-dark", hover: "hover:brightness-105", bar: "bg-purple-dark" },
  { href: "/activities", label: "Activities", mobile: "bg-orange text-purple-dark", desktop: "lg:bg-orange lg:text-purple-dark", hover: "hover:brightness-110", bar: "bg-purple-dark" },
  { href: "/healthcare", label: "Healthcare", mobile: "bg-green text-purple-dark", desktop: "lg:bg-teal lg:text-purple-dark", hover: "hover:brightness-105", bar: "bg-purple-dark" },
  { href: "/blog", label: "Blog", mobile: "bg-purple text-white", desktop: "lg:bg-green lg:text-purple-dark", hover: "hover:brightness-110", bar: "bg-white lg:bg-purple-dark" },
  { href: "/contact", label: "Contact", mobile: "bg-orange text-purple-dark", desktop: "lg:bg-purple lg:text-white", hover: "hover:brightness-110", bar: "bg-purple-dark lg:bg-white" },
  { href: "/contact#advertise", label: "Advertise With Us", mobile: "bg-purple-dark text-white", desktop: "lg:bg-purple-dark lg:text-white", hover: "hover:brightness-150", bar: "bg-white" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the phone menu whenever the page changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        <p className="hidden text-sm italic text-neutral-500 lg:block">
          Your Bangkok Roadmap
        </p>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="main-nav"
          className="flex items-center gap-2 rounded-full border-2 border-purple-dark px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-purple-dark lg:hidden"
        >
          <span aria-hidden="true" className="flex w-4 flex-col gap-[3px]">
            <span className={`h-0.5 bg-purple-dark transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`h-0.5 bg-purple-dark transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 bg-purple-dark transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="main-nav"
        aria-label="Main"
        className={`${open ? "grid" : "hidden"} grid-cols-2 border-b-[3px] border-white lg:grid lg:grid-cols-10`}
      >
        {LINKS.map((l) => {
          const active = isActive(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`relative flex items-center justify-center px-1 py-4 text-center text-sm font-bold uppercase tracking-tight transition lg:px-2 lg:py-3 lg:text-[0.7rem] xl:tracking-wide ${l.mobile} ${l.desktop} ${l.hover}`}
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
