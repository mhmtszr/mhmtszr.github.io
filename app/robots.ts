import { MetadataRoute } from 'next'

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