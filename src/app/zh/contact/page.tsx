import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { SLOT_SPECS } from "@/lib/ads";
import { zhMetadata } from "@/lib/i18n";

export const metadata: Metadata = zhMetadata({
  title: "联系我们与广告合作",
  description:
    "联系 BKK Families，或了解如何通过广告触达我们近4万名成员的曼谷家庭社群。",
  enPath: "/contact",
});

export default function ZhContactPage() {
  return (
    <>
      <PageHero
        eyebrow="找到适合您的方案"
        title="联系我们"
        subtitle="更正信息、收录申请或广告合作，都欢迎联系我们。我们可以根据您的需要定制广告方案。"
        color="purple"
      />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="mailto:info@bkkfamilies.com"
            className="rounded-xl bg-teal p-6 text-center text-white transition hover:opacity-90"
          >
            <p className="text-xs uppercase tracking-wide text-white/80">电子邮件</p>
            <p className="mt-1 font-heading text-lg font-bold">info@bkkfamilies.com</p>
          </a>
          <a
            href="https://line.me/ti/p/~bachsuites"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-orange p-6 text-center text-white transition hover:opacity-90"
          >
            <p className="text-xs uppercase tracking-wide text-white/80">LINE</p>
            <p className="mt-1 font-heading text-lg font-bold">bachsuites</p>
          </a>
          <a
            href="https://www.facebook.com/groups/395501457186828"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-green p-6 text-center text-white transition hover:opacity-90"
          >
            <p className="text-xs uppercase tracking-wide text-white/80">Facebook 社群</p>
            <p className="mt-1 font-heading text-lg font-bold">Bangkok Expat Families</p>
          </a>
        </div>

        <p className="mt-6 text-sm text-neutral-600">
          我们的回复通常使用英文。您也可以用中文来信，我们会尽量回复。
        </p>

        {/* Corrections and listings */}
        <div className="mt-16 rounded-2xl bg-purple-50 p-8">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">更正信息或申请收录</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
            如果您发现学校、游戏小组、假期营或活动的信息有误或已过时，或者希望您的机构被收录，请发邮件告诉我们，并附上页面链接和正确的信息。收录是免费的，付费广告从不影响收录内容或排序。
          </p>
        </div>

        {/* Why advertise */}
        <div id="advertise" className="mt-20 scroll-mt-32">
          <p className="text-xs font-bold uppercase tracking-wide text-orange">广告合作</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-purple-dark md:text-4xl">
            让近4万个家庭看到您的品牌，他们正在为您提供的服务做决定。
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-neutral-600">
            Bangkok Expat Families 是曼谷同类社群中规模最大、历史最久的一个，外籍家庭和泰国家庭都在这里，围绕每位家长都要面对的决定展开交流：选哪所学校、看哪位医生、参加哪些活动、买哪种保险。成员在研究这些问题时，会先来问我们。
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-purple p-6 text-white">
              <p className="font-heading text-3xl font-bold">近4万</p>
              <p className="mt-1 text-sm text-white/80">名成员，每周新增约120个家庭</p>
            </div>
            <div className="rounded-xl bg-teal p-6 text-white">
              <p className="font-heading text-3xl font-bold">81%</p>
              <p className="mt-1 text-sm text-white/80">
                的成员有孩子
                <span className="mt-2 block text-xs text-white/70">来源：BKK Families 成员调查</span>
              </p>
            </div>
            <div className="rounded-xl bg-green p-6 text-white">
              <p className="font-heading text-3xl font-bold">14年</p>
              <p className="mt-1 text-sm text-white/80">
                自2012年起建立的社群信任，而不是按月租来的付费受众
              </p>
            </div>
          </div>
        </div>

        {/* Who it's for */}
        <div className="mt-20">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">为家庭真正在找的机构而设</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">学校</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                每周都有家长在社群里问该选哪所学校、某个校区值不值这个学费、学年中途哪里还有学位。您的学校可以成为他们最先看到的答案。
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">诊所与医疗保险</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                刚搬到曼谷的家庭几乎马上就需要儿科医生、牙医和医疗保险，而他们更相信其他家长的推荐，而不是网上的广告。这份信任正是这个社群的基础。
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">家庭服务及其他</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                补习老师、活动中心、房产中介、搬家公司、摄影师、欢迎孩子的餐厅。只要是在曼谷生活的家庭需要的，我们的成员此刻就在互相打听推荐。
              </p>
            </div>
          </div>
        </div>

        {/* How to reach them */}
        <div className="mt-20">
          <h2 className="font-heading text-2xl font-bold text-purple-dark">广告形式</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">Facebook 社群广告</h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                <li>✓ 置顶赞助帖（每次一周）</li>
                <li>✓ 社群封面横幅（每月一家广告主）</li>
              </ul>
            </div>
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-purple-dark">网站首页广告</h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                <li>✓ 顶部横幅（独家展示，从不轮播）</li>
                <li>✓ 侧栏广告位（上、中、下三个位置）</li>
              </ul>
              <p className="mt-3 text-xs text-neutral-500">
                横幅尺寸：顶部横幅 {SLOT_SPECS["home-top"].size}，侧栏 {SLOT_SPECS["home-sidebar-top"].size}。所有横幅都标注为赞助内容。
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-neutral-600">
            我们的评测从不出售。赞助文章由广告主撰写、我们编辑，所有付费内容都清楚标注为赞助。
          </p>
          <a
            href="/bkk-families-media-kit.pdf"
            hrefLang="en"
            className="mt-6 inline-block rounded-full bg-orange px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            下载媒体资料（PDF，英文）
          </a>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-2xl bg-purple-dark px-8 py-12 text-center text-white">
          <h2 className="font-heading text-3xl font-bold">让曼谷的家庭认识您的机构。</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            告诉我们您提供什么服务，我们会为您量身定制一个符合目标和预算的方案。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:info@bkkfamilies.com"
              className="rounded-full bg-orange px-8 py-3 font-semibold text-white transition hover:opacity-90"
            >
              发邮件至 info@bkkfamilies.com
            </a>
            <a
              href="https://line.me/ti/p/~bachsuites"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-purple-dark"
            >
              加 LINE：bachsuites
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
