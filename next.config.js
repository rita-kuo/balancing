/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  redirects: async () => [
    {
      source: "/",
      destination: "/dashboard",
      permanent: true,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "profile.line-scdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
