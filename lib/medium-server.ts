import type {MediumArticle} from './medium'

const MEDIUM_RSS_URL = 'https://medium.com/@mehmet.sezer/feed'

function getTextContent(parent: string, tag: string): string {
    const match = parent.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
    return match ? match[1].replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1').trim() : ''
}

export async function getMediumArticlesServer(): Promise<MediumArticle[]> {
    try {
        const res = await fetch(MEDIUM_RSS_URL)
        if (!res.ok) return []

        const xml = await res.text()
        const items = xml.match(/<item>([\s\S]*?)<\/item>/g)

        if (!items?.length) return []

        return items.map((item) => {
            const contentEncoded = getTextContent(item, 'content:encoded')
            const imageMatch = contentEncoded.match(/<img[^>]+src="([^">]+)"/)
            const imageUrl = imageMatch ? imageMatch[1] : '/images/placeholder-article.jpg'

            const description = getTextContent(item, 'description')
                .replace(/<[^>]+>/g, '')
                .slice(0, 200)

            const categories = [...item.matchAll(/<category><!\[CDATA\[(.*?)]]><\/category>/g)]
                .map(m => m[1])
                .slice(0, 3)

            return {
                title: getTextContent(item, 'title'),
                description,
                date: getTextContent(item, 'pubDate'),
                imageUrl,
                url: getTextContent(item, 'link'),
                tags: categories.length ? categories : ['medium'],
            }
        })
    } catch (error) {
        console.error('Error fetching Medium articles on server:', error)
        return []
    }
}
