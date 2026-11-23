"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../ui/Logo";

// Only sections that have a Thai version are worth linking; the whole set is
// listed here and the pages are built section by section.
// Full literal class strings so Tailwind's scanner picks them up.
const LINKS = [
  { href: "/th", label: "หน้าแรก", cls: "bg-orange text-purple-dark", hover: "hover:brightness-105" },
  { href: "/th/schools", label: "โรงเรียนนานาชาติ", cls: "bg-purple text-white", hover: "hover:brightness-110" },
  { href: "/th/playgroups", label: "เพลย์กรุ๊ป", cls: "bg-teal text-purple-dark", hover: "hover:brightness-105" },
  { href: "/th/camps", label: "แคมป์ปิดเทอม", cls: "bg-green text-purple-dark", hover: "hover:brightness-105" },
  { href: "/th/activities", label: "กิจกรรมครอบครัว", cls: "bg-orange text-purple-dark", hover: "hover:brightness-105" },
  { href: "/th/learning-support", label: "สนับสนุนการเรียนรู้", cls: "bg-teal text-purple-dark", hover: "hover:brightness-105" },
  { href: "/th/contact", label: "ติดต่อเรา", cls: "bg-purple-dark text-white", hover: "hover:brightness-150" },
] as const;

const PILL = "rounded-full border-2 border-purple-dark px-3 py-1 text-sm font-bold";
const PILL_OFF = `${PILL} text-purple-dark hover:bg-purple-dark hover:text-white`;
const PILL_ON = `${PILL} bg-purple-dark text-white`;

export default function ThNav({ zhTwins }: { zhTwins?: string[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/th" ? pathname === "/th" : pathname.startsWith(href);

  // The English twin of this page. Every /th page has one by construction.
  const enPath = pathname === "/th" ? "/" : pathname.replace(/^\/th/, "").replace(/\/$/, "") || "/";
  const zhHref = zhTwins && zhTwins.includes(enPath) ? (enPath === "/" ? "/zh" : `/zh${enPath}`) : null;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/th" className="flex items-center gap-2.5">
          <Logo size={36} />
          <span className="font-heading text-lg font-bold text-purple-dark sm:text-xl">
            BKK Families
          </span>
          <span className="hidden text-sm font-bold text-purple-dark/70 sm:inline">
            คู่มือครอบครัวในกรุงเทพฯ
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <span lang="th" aria-current="page" className={PILL_ON}>ไทย</span>
          {zhHref && (
            <Link href={zhHref} lang="zh-Hans" hrefLang="zh-Hans" className={PILL_OFF}>
              中文
            </Link>
          )}
          <Link href={enPath} hrefLang="en" lang="en" className={PILL_OFF}>
            EN
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="th-main-nav"
            className="flex items-center gap-2 rounded-full border-2 border-purple-dark px-4 py-1.5 text-sm font-bold text-purple-dark lg:hidden"
          >
            <span aria-hidden="true" className="flex w-4 flex-col gap-[3px]">
              <span className={`h-0.5 bg-purple-dark transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`h-0.5 bg-purple-dark transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-purple-dark transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
            {open ? "ปิด" : "เมนู"}
          </button>
        </div>
      </div>

      <nav
        id="th-main-nav"
        aria-label="เมนูหลัก"
        className={`${open ? "grid" : "hidden"} grid-cols-2 border-b-[3px] border-white lg:grid lg:grid-cols-7`}
      >
        {LINKS.map((l) => {
          const active = isActive(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`relative flex items-center justify-center px-1 py-4 text-center text-sm font-bold transition lg:py-3 ${l.cls} ${l.hover}`}
            >
              {l.label}
              {active && (
                <span className="absolute inset-x-0 bottom-0 h-1 bg-purple-dark" aria-hidden="true" />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
