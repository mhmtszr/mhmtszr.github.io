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
  // Configure webpack to handle Node.js modules and optimize CSS
  webpack: (config, { dev, isServer }) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
    };

    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }

    return config;
  },
}

export default nextConfig
