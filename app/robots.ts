import { MetadataRoute } from 'next'

// Configure for static generation
export const dynamic = "force-static"
export const revalidate = false

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/', 
        '/_next/',
        '/private/',
      ],
    },
    sitemap: 'https://msezer.dev/sitemap.xml',
    host: 'https://msezer.dev',
  }
} 