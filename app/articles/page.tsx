import {getAllArticleMeta} from "@/lib/mdx"
import {getMediumArticlesServer} from "@/lib/medium-server"
import {ArticlesContent} from "./articles-content"
import {generateItemListSchema} from "@/lib/schema"

export default async function ArticlesPage() {
    const allArticles = getAllArticleMeta()
    const mdArticles = allArticles.map((article) => ({
        title: article.meta.title,
        description: article.meta.description || 'No description available',
        date: article.meta.date,
        imageUrl: article.meta.image || '/images/placeholder-article.jpg',
        url: `/articles/${article.slug}`,
        tags: article.meta.tags || [],
        source: "website" as const,
    }))

    let mediumArticles: { title: string; description: string; date: string; imageUrl: string; url: string; tags: string[]; source: "medium" | "website" }[] = []
    try {
        const raw = await getMediumArticlesServer()
        mediumArticles = raw.map((a) => ({
            title: a.title,
            description: a.description || a.title,
            date: a.date,
            imageUrl: a.imageUrl || '/images/placeholder-article.jpg',
            url: a.url,
            tags: a.tags || ['medium'],
            source: "medium" as const,
        }))
    } catch {
        // Medium fetch failed, continue with MD articles only
    }

    const existingTitles = new Set(mdArticles.map(a => a.title.toLowerCase().trim()))
    const uniqueMedium = mediumArticles.filter(a => !existingTitles.has(a.title.toLowerCase().trim()))
    const initialArticles = [...mdArticles, ...uniqueMedium].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    const itemListSchema = generateItemListSchema(
        initialArticles.map(a => ({title: a.title, url: a.url, image: a.imageUrl}))
    )

    return (
        <>
            <ArticlesContent initialArticles={initialArticles}/>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(itemListSchema)}}/>
        </>
    )
}
