/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      {
        // Moved into its own section on 17 September 2026.
        source: "/blog/health-insurance-expat-families-bangkok",
        destination: "/healthcare/insurance",
        permanent: true,
      },
      {
        source: "/fitness-health",
        destination: "/healthcare",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
