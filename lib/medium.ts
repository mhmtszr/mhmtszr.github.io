import Parser from 'rss-parser'

export interface MediumArticle {
  title: string
  description: string
  date: string
  imageUrl: string
  url: string
  tags: string[]
}

interface CustomFeedItem {
  title: string | undefined
  contentSnippet: string | undefined
  pubDate: string | undefined
  link: string | undefined
  content: string | undefined
  categories: string[] | undefined
}

// Using the correct Medium RSS feed URL format
const MEDIUM_RSS_URL = 'https://medium.com/@mehmet.sezer/feed'

export async function getMediumArticles(): Promise<MediumArticle[]> {
  try {
    const response = await fetch('/api/medium')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    return data.articles || []
  } catch (error) {
    console.error('Error fetching Medium articles:', error)
    return []
  }
} 