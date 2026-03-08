/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath: '',
    assetPrefix: '',
    typescript: {
        ignoreBuildErrors: true,
    },
    serverExternalPackages: ['shiki'],
    turbopack: {},
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
}

export default nextConfig
