import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone',
    images: {
        remotePatterns: [new URL(`${process.env.BACKEND_BASE_URL}/IMG/**`)],
    },
};

export default nextConfig;
