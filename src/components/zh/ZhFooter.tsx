import Link from "next/link";
import Logo from "../ui/Logo";

export default function ZhFooter() {
  return (
    <footer className="bg-purple-dark text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Logo size={28} />
              <span className="font-heading text-lg font-bold">BKK Families</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-white/70">
              <span className="font-bold text-white">您的曼谷生活指南。</span>
              自2012年起，近4万个外籍家庭和泰国家庭在这里分享曼谷的学校、活动和医疗资源。
            </p>
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold text-orange">浏览</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li><Link href="/zh/schools" className="hover:text-white">国际学校</Link></li>
              <li><Link href="/zh/playgroups" className="hover:text-white">亲子游戏小组</Link></li>
              <li><Link href="/zh/camps" className="hover:text-white">假期营</Link></li>
              <li><Link href="/zh/activities" className="hover:text-white">亲子活动</Link></li>
              <li><Link href="/zh/learning-support" className="hover:text-white">学习支持</Link></li>
              <li>
                <Link href="/" lang="en" hrefLang="en" className="hover:text-white">
                  English version
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-bold text-orange">联系我们</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li><Link href="/zh/contact" className="font-semibold text-teal hover:text-white">联系页面</Link></li>
              <li>info@bkkfamilies.com</li>
              <li>
                <a
                  href="https://line.me/ti/p/~bachsuites"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  LINE：bachsuites
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/groups/395501457186828"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook 社群：Bangkok Expat Families
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} BKK Families. 保留所有权利。
        </div>
      </div>
    </footer>
  );
}
