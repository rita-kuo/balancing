/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    redirects: async () => [
        {
            source: '/',
            destination: '/group',
            permanent: true,
        },
    ],
};

module.exports = nextConfig;
