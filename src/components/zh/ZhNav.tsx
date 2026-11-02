"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../ui/Logo";

// Only sections that have a Chinese version are listed. Add Schools and
// Healthcare here when they are translated.
// Full literal class strings so Tailwind's scanner picks them up.
const LINKS = [
  { href: "/zh", label: "首页", cls: "bg-orange text-purple-dark", hover: "hover:brightness-105" },
  { href: "/zh/playgroups", label: "亲子游戏小组", cls: "bg-teal text-purple-dark", hover: "hover:brightness-105" },
  { href: "/zh/camps", label: "假期营", cls: "bg-green text-purple-dark", hover: "hover:brightness-105" },
  { href: "/zh/activities", label: "亲子活动", cls: "bg-orange text-purple-dark", hover: "hover:brightness-105" },
  { href: "/zh/learning-support", label: "学习支持", cls: "bg-purple text-white", hover: "hover:brightness-110" },
] as const;

export default function ZhNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/zh" ? pathname === "/zh" : pathname.startsWith(href);

  // The English twin of this page. Every /zh page has one by construction.
  const englishHref = pathname === "/zh" ? "/" : pathname.replace(/^\/zh/, "") || "/";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/zh" className="flex items-center gap-2.5">
          <Logo size={36} />
          <span className="font-heading text-lg font-bold text-purple-dark sm:text-xl">
            BKK Families
          </span>
          <span className="hidden text-sm font-bold text-purple-dark/70 sm:inline">
            曼谷家庭指南
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={englishHref}
            hrefLang="en"
            lang="en"
            className="rounded-full border-2 border-purple-dark px-3 py-1 text-sm font-bold text-purple-dark hover:bg-purple-dark hover:text-white"
          >
            English
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="zh-main-nav"
            className="flex items-center gap-2 rounded-full border-2 border-purple-dark px-4 py-1.5 text-sm font-bold text-purple-dark lg:hidden"
          >
            <span aria-hidden="true" className="flex w-4 flex-col gap-[3px]">
              <span className={`h-0.5 bg-purple-dark transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`h-0.5 bg-purple-dark transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-purple-dark transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
            {open ? "关闭" : "菜单"}
          </button>
        </div>
      </div>

      <nav
        id="zh-main-nav"
        aria-label="主导航"
        className={`${open ? "grid" : "hidden"} grid-cols-2 border-b-[3px] border-white lg:grid lg:grid-cols-5`}
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
