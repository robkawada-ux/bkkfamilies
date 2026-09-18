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
];

const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
