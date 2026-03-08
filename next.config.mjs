/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    serverExternalPackages: ['shiki'],
    experimental: {
        optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog', 'class-variance-authority'],
        inlineCss: true,
    },
}

export default nextConfig
