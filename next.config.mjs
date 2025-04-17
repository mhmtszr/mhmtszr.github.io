/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Enable MDX
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true,
  },
  // Configure base path for GitHub Pages
  basePath: '',
  assetPrefix: '',
  // Disable linting and type checking during build (optional)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    mdxRs: true,
  },
  // Configure webpack to handle Node.js modules
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    return config;
  },
}

export default nextConfig
