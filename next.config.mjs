/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      {
        source: "/fitness-health",
        destination: "/healthcare",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
