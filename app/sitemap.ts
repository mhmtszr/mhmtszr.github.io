import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/mdx'

// Configure for static generation
export const dynamic = "force-static"
export const revalidate = false

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()
  
  // Base URLs
  const baseUrls = [
    {
      url: 'https://msezer.dev',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://msezer.dev/articles',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://msezer.dev/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://msezer.dev/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://msezer.dev/experience',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://msezer.dev/speaking',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://msezer.dev/photography',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Convert article dates to Date objects for lastModified
  const articleUrls = articles.map((article) => {
    return {
      url: `https://msezer.dev/articles/${article.slug}`,
      lastModified: new Date(article.meta.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  })

  return [...baseUrls, ...articleUrls]
} 