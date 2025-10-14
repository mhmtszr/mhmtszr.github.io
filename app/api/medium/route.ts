import { NextResponse } from 'next/server'
import Parser from 'rss-parser'
import fallbackData from './fallback.json'

const MEDIUM_RSS_URL = 'https://medium.com/@mehmet.sezer/feed'

interface CustomFeedItem {
  title: string | undefined
  contentSnippet: string | undefined
  pubDate: string | undefined
  link: string | undefined
  content: string | undefined
  categories: string[] | undefined
}

// Force static generation
export const dynamic = 'force-static'
export const revalidate = false

export async function GET() {
  try {
    const parser = new Parser<any, CustomFeedItem>({
      customFields: {
        item: [
          ['content:encoded', 'content'],
          ['dc:creator', 'creator'],
          ['category', 'categories']
        ],
      },
    })

    const feed = await parser.parseURL(MEDIUM_RSS_URL)
    
    if (!feed.items?.length) {
      return NextResponse.json(fallbackData)
    }
    
    const articles = feed.items.map((item: CustomFeedItem) => {
      const imageMatch = item.content?.match(/<img[^>]+src="([^">]+)"/)
      const imageUrl = imageMatch ? imageMatch[1] : '/placeholder.svg?height=400&width=600&text=' + encodeURIComponent(item.title || '')

      return {
        title: item.title || '',
        description: item.contentSnippet || '',
        date: item.pubDate || '',
        imageUrl,
        url: item.link || '',
        tags: (item.categories || []).slice(0, 3),
      }
    })

    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Error fetching Medium articles:', error)
    return NextResponse.json(fallbackData)
  }
} 