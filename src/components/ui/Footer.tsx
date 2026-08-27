import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-purple-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Logo size={32} />
              <span className="font-heading text-lg font-bold">BKK Families</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-white/70">
              Your Bangkok Roadmap. A community of 35,700+ expat and Thai
              families sharing resources on schools, activities, and
              healthcare in Bangkok since 2012.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-orange">
              Explore
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li><Link href="/schools" className="hover:text-white">Schools</Link></li>
              <li><Link href="/activities" className="hover:text-white">Activities</Link></li>
              <li><Link href="/fitness-health" className="hover:text-white">Fitness/Health</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-orange">
              Contact
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>info@bkkfamilies.com</li>
              <li>02-136-5038</li>
              <li>
                <a
                  href="https://www.facebook.com/groups/bangkokexpatfamilies"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bangkok Expat Families on Facebook
                </a>
              </li>
              <li>
                <Link href="/contact" className="font-semibold text-teal hover:text-white">
                  Advertising Opportunities →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} BKK Families. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
