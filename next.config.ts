import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    experimental: {
        turbopackFileSystemCacheForDev: true
    },
    reactStrictMode: false,
    async rewrites() {
        if (process.env.NODE_ENV !== 'production') {
            return [
                {
                    source: '/test/:path*',
                    destination: '/_tests/:path*',
                },
            ];
        }
        return [];
    }

};

export default nextConfig;
