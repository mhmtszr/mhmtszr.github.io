import type {MediumArticle} from './medium'

const MEDIUM_RSS_URL = 'https://medium.com/@mehmet.sezer/feed'

export async function getMediumArticlesServer(): Promise<MediumArticle[]> {
    try {
        const Parser = (await import('rss-parser')).default
        const parser = new Parser({
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
            return []
        }

        return feed.items.map((item: any) => {
            const imageMatch = item.content?.match(/<img[^>]+src="([^">]+)"/)
            const imageUrl = imageMatch ? imageMatch[1] : '/images/placeholder-article.jpg'

            return {
                title: item.title || '',
                description: item.contentSnippet || '',
                date: item.pubDate || '',
                imageUrl,
                url: item.link || '',
                tags: (item.categories || []).slice(0, 3),
            }
        })
    } catch (error) {
        console.error('Error fetching Medium articles on server:', error)
        return []
    }
}
