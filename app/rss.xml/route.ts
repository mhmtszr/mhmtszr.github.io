import { getAllArticles } from '@/lib/mdx'
import { NextResponse } from 'next/server'

// Configure for static generation
export const dynamic = "force-static"
export const revalidate = false

export async function GET() {
  const articles = await getAllArticles()

  // Filter out draft articles
  const publishedArticles = articles.filter(article => !article.meta.draft)

  // Build the RSS XML
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Mehmet Sezer's Blog</title>
    <link>https://msezer.dev/articles</link>
    <description>Technical articles and insights about software engineering, microservices, distributed systems, and software architecture by Mehmet Sezer.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://msezer.dev/rss.xml" rel="self" type="application/rss+xml"/>
    ${publishedArticles
      .map(
        article => `
    <item>
      <title><![CDATA[${article.meta.title}]]></title>
      <link>https://msezer.dev/articles/${article.slug}</link>
      <guid>https://msezer.dev/articles/${article.slug}</guid>
      <pubDate>${new Date(article.meta.date).toUTCString()}</pubDate>
      <description><![CDATA[${article.meta.description}]]></description>
      <content:encoded><![CDATA[Article by Mehmet Sezer - Read the full article at https://msezer.dev/articles/${article.slug}]]></content:encoded>
      ${article.meta.tags?.map(tag => `<category>${tag}</category>`).join('') || ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  // Return the RSS with the correct content type
  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  })
} 