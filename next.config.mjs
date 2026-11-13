/** @type {import('next').NextConfig} */

// Legacy WordPress URLs recovered from the Wayback CDX index, 18 September 2026.
// 53 of 55 old /schools/ URLs match current slugs and are handled by Next's
// trailing-slash normalisation, so they are deliberately absent here.
const legacyRedirects = [
  // Already live before this map
  { source: "/blog/health-insurance-expat-families-bangkok", destination: "/healthcare/insurance" },
  { source: "/fitness-health", destination: "/blog/staying-fit-in-bangkok" },

  // Curriculum landing pages, the best-linked legacy assets on the old site
  { source: "/curricula/:slug", destination: "/schools" },

  // Posts whose slug survived intact
  { source: "/is-bangkok-safe-for-kids", destination: "/blog/is-bangkok-safe-for-kids" },
  { source: "/top-5-hospitals-in-bangkok", destination: "/blog/top-5-hospitals-in-bangkok" },

  // Posts renamed or rewritten
  { source: "/15-things-to-do-in-bangkok-with-kids-2023", destination: "/blog/9-things-to-do-in-bangkok-with-kids" },
  { source: "/top-5-museums-for-kids-in-bangkok", destination: "/blog/top-museums-for-kids-in-bangkok" },
  { source: "/which-international-school-is-best-for-you", destination: "/blog/how-to-choose-international-school-bangkok-2026" },
  { source: "/how-to-find-the-best-international-school-in-bangkok", destination: "/blog/how-to-choose-international-school-bangkok-2026" },
  { source: "/top-reasons-your-dental-health-matters", destination: "/blog/dental-health-for-families-in-bangkok" },

  // Fitness cluster, now Local Life
  { source: "/family-fitness-bangkok", destination: "/blog/staying-fit-in-bangkok" },
  { source: "/fitness-in-bangkok", destination: "/blog/staying-fit-in-bangkok" },
  { source: "/test-blog-fitness", destination: "/blog/staying-fit-in-bangkok" },
  { source: "/category/fitness-health", destination: "/blog/staying-fit-in-bangkok" },

  // Camps
  { source: "/top-5-summer-camps-in-bangkok-2022", destination: "/camps" },
  { source: "/winter-holiday-camp-guide", destination: "/camps" },
  { source: "/category/camps", destination: "/camps" },
  { source: "/category/camps/page/:num", destination: "/camps" },
  // October 2026 camps that have finished, and operators whose only listed week was October (taken down 10 Nov 2026)
  { source: "/camps/bangkok-dolphins", destination: "/camps" },
  { source: "/zh/camps/bangkok-dolphins", destination: "/zh/camps" },
  { source: "/camps/alliance-francaise-bangkok", destination: "/camps" },
  { source: "/zh/camps/alliance-francaise-bangkok", destination: "/zh/camps" },
  { source: "/camps/mandarin-house-bangkok", destination: "/camps" },
  { source: "/zh/camps/mandarin-house-bangkok", destination: "/zh/camps" },
  { source: "/camps/carroll-prep-october-camp", destination: "/camps" },
  { source: "/zh/camps/carroll-prep-october-camp", destination: "/zh/camps" },
  { source: "/camps/hoyhon-park-silom", destination: "/camps" },
  { source: "/zh/camps/hoyhon-park-silom", destination: "/zh/camps" },
  { source: "/camps/storytime-preschool-halloween-camp", destination: "/camps" },
  { source: "/zh/camps/storytime-preschool-halloween-camp", destination: "/zh/camps" },

  // Activities cluster
  { source: "/category/activities", destination: "/activities" },
  { source: "/category/local-attractions", destination: "/activities" },
  { source: "/category/special-events", destination: "/activities" },
  { source: "/bangkok-activities", destination: "/activities" },
  { source: "/bangkok-activities/:slug", destination: "/activities" },
  { source: "/bangkok-activities-cat/:slug", destination: "/activities" },
  { source: "/kid-friendly-activities-in-bangkok", destination: "/activities" },
  { source: "/activities-for-families-in-bangkok", destination: "/activities" },
  { source: "/the-best-of-the-best-fun-learning-ideas-in-bangkok", destination: "/activities" },
  { source: "/edutainment-activities-parents-and-kids-could-try-in-bangkok", destination: "/activities" },
  { source: "/cooking-class-bangkok", destination: "/activities" },
  { source: "/mega-cineplex-kids", destination: "/activities" },
  { source: "/a-kid-friendly-cinema-at-icon-cineconic", destination: "/activities" },
  { source: "/christmas-markets-in-bkk", destination: "/activities" },
  { source: "/valentines-day-2020-bangkok", destination: "/activities" },
  { source: "/simply-sports-academy", destination: "/activities" },
  { source: "/best-things-to-do-with-kids-in-bangkok-during-covid-19", destination: "/activities" },
  { source: "/bangkoks-new-normal-thailand-and-covid-in-2023", destination: "/activities" },
  { source: "/reasons-why-you-should-visit-thailand-and-why-youll-love-it", destination: "/activities" },

  // Orphaned school slugs
  { source: "/schools/ipc-international-kindergarten", destination: "/schools" },
  // VERSO closed in 2026; its campus reopened as Wycombe Abbey
  { source: "/schools/verso-international-school", destination: "/schools/wycombe-abbey-international-school-bangkok" },
  // UWC Thailand is in Phuket and was removed from the Bangkok directory
  { source: "/schools/uwc-thailand", destination: "/schools" },
  // Nov 2026: bilingual / Thai-curriculum schools removed (directory lists international schools only)
  { source: "/schools/chindamanee-school", destination: "/schools" },
  { source: "/schools/bangkok-bilingual-school", destination: "/schools" },
  { source: "/schools/interkids-bilingual-school", destination: "/schools" },
  { source: "/schools/sarasas-ektra-school", destination: "/schools" },
  { source: "/schools/lertlah-school", destination: "/schools" },
  { source: "/schools/satit-pattana-secondary-school", destination: "/schools" },
  { source: "/schools/satit-bilingual-school-of-rangsit-university", destination: "/schools" },
  // Global English School is the former name of International Christian School Nonthaburi
  { source: "/schools/global-english-school", destination: "/schools/international-christian-school-nonthaburi" },
  { source: "/zh/schools/chindamanee-school", destination: "/zh/schools" },
  { source: "/zh/schools/bangkok-bilingual-school", destination: "/zh/schools" },
  { source: "/zh/schools/interkids-bilingual-school", destination: "/zh/schools" },
  { source: "/zh/schools/sarasas-ektra-school", destination: "/zh/schools" },
  { source: "/zh/schools/lertlah-school", destination: "/zh/schools" },
  { source: "/zh/schools/satit-pattana-secondary-school", destination: "/zh/schools" },
  { source: "/zh/schools/satit-bilingual-school-of-rangsit-university", destination: "/zh/schools" },
  { source: "/zh/schools/global-english-school", destination: "/zh/schools/international-christian-school-nonthaburi" },
  { source: "/learning-support/spark-centre", destination: "/learning-support" },
  { source: "/playgroups/precious-learners-world-playgroup", destination: "/playgroups" },
  { source: "/activities/wild-spooky-rumpus-halloween-thecommons", destination: "/activities" },
  { source: "/schools/the-ideal-classroom-bangk", destination: "/schools" },

  // Structural
  { source: "/blog/page/:num", destination: "/blog" },
  { source: "/about-us", destination: "/" },
  { source: "/contacts", destination: "/contact" },
  { source: "/home", destination: "/" },
  { source: "/landing", destination: "/" },
  { source: "/amy-diener-bkk-families-interview", destination: "/blog" },
  { source: "/lazada-making-parenting-in-2020-easier", destination: "/blog" },
  { source: "/start-business-thailand", destination: "/blog" },

  // Remaining WordPress category archives. Must stay after the specific
  // /category/... rules above, which Next checks in order.
  { source: "/category/schools", destination: "/schools" },
  { source: "/category/:slug*", destination: "/blog" },
];

const nextConfig = {
  // The site has two root layouts, the English (en) group and /zh, so each can
  // set its own <html lang>. Next then has no single layout to wrap a 404 for
  // unmatched URLs; src/app/global-not-found.tsx supplies it.
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      ...legacyRedirects.map((r) => ({ ...r, permanent: true })),
      // Sponsored article previews, now published (13 Nov 2026).
      { source: "/blog/how-to-choose-a-level-subjects-expat-parents-260baf", destination: "/blog/how-to-choose-a-level-subjects-expat-parents", permanent: true },
      { source: "/blog/supporting-your-child-through-the-ib-diploma-54db3f", destination: "/blog/supporting-your-child-through-the-ib-diploma", permanent: true },
      // Advertiser short links, used in Facebook posts. Not permanent, so the
      // destination can change and browsers don't cache it.
      {
        source: "/go/evergreen",
        destination:
          "https://www.evergreen-hakuba.com/winter-kids-camps/?utm_source=bkkfamilies&utm_medium=sponsored_social&utm_campaign=wintercamp_2627&utm_content=pinned_post",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
