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
};

module.exports = nextConfig;
