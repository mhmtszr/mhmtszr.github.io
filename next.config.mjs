import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
    turbopack: {
        // Remove Next.js built-in polyfills for modern browsers.
        // browserslist targets Chrome 92+, Firefox 90+, Safari 15.4+, Edge 92+
        // which natively support all polyfilled APIs (Array.prototype.at,
        // Object.hasOwn, Array.prototype.flat/flatMap, Object.fromEntries, etc.)
        resolveAlias: {
            'next/dist/build/polyfills/polyfill-module':
                './lib/noop.js',
        },
    },
    experimental: {
        optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog', 'class-variance-authority'],
        inlineCss: true,
    },
    webpack: (config, { isServer, webpack }) => {
        if (!isServer) {
            const noopPath = path.resolve(__dirname, 'lib/noop.js')
            config.plugins.push(
                new webpack.NormalModuleReplacementPlugin(
                    /[\\/]polyfill-module\.js$/,
                    noopPath
                )
            )
        }
        return config
    },
}

export default nextConfig
