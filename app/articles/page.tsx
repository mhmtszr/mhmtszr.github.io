import {getAllArticles} from "@/lib/mdx"
import {ArticlesContent} from "./articles-content"

export default async function ArticlesPage() {
    let initialArticles: {
        title: string
        description: string
        date: string
        imageUrl: string
        url: string
        tags: string[]
        source: "medium" | "website"
    }[] = []

    try {
        const allArticles = await getAllArticles()
        initialArticles = allArticles.map((article) => ({
            title: article.meta.title,
            description: article.meta.description || 'No description available',
            date: article.meta.date,
            imageUrl: article.meta.image || '/images/placeholder-article.jpg',
            url: `/articles/${article.slug}`,
            tags: article.meta.tags || [],
            source: "website" as const,
        }))
    } catch {
        initialArticles = []
    }

    return <ArticlesContent initialArticles={initialArticles}/>
}
