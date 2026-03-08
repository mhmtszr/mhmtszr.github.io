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
        optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-avatar', 'class-variance-authority'],
        inlineCss: true,
    },
}

export default nextConfig
