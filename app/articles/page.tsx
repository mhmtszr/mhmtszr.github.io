"use client"

import {Suspense, useEffect, useState} from "react"
import {LayoutGrid, List} from "lucide-react"
import {ArticleCard} from "@/components/ui/article-card"
import {type ArticleMetadata} from "@/lib/mdx"
import {getMediumArticles, type MediumArticle} from "@/lib/medium"
import {motion} from "framer-motion"
import {PageContainer} from "../components/page-container"

interface Article {
    title: string
    description: string
    date: string
    imageUrl: string
    url: string
    tags: string[]
    source: "medium" | "website"
}

const container = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: {opacity: 0, y: 20},
    show: {opacity: 1, y: 0}
}

function ArticlesContent() {
    const [isDesktop, setIsDesktop] = useState(true)
    const [isListView, setIsListView] = useState(false)
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const mql = window.matchMedia("(min-width: 768px)")
        setIsDesktop(mql.matches)
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
        mql.addEventListener("change", handler)
        return () => mql.removeEventListener("change", handler)
    }, [])

    useEffect(() => {
        if (!isDesktop && isListView) {
            setIsListView(false)
        }
    }, [isDesktop, isListView])

    useEffect(() => {
        async function loadArticles() {
            try {
                setIsLoading(true)
                setError(null)

                // Get MDX articles from API
                const mdxResponse = await fetch('/api/articles')
                if (!mdxResponse.ok) {
                    throw new Error('Failed to fetch MDX articles')
                }
                const mdxArticles = await mdxResponse.json()

                const formattedMDXArticles: Article[] = mdxArticles.map((article: {
                    meta: ArticleMetadata,
                    slug: string
                }) => {
                    return {
                        title: article.meta.title,
                        description: article.meta.description || 'No description available',
                        date: article.meta.date,
                        imageUrl: article.meta.image || '/images/placeholder-article.jpg',
                        url: `/articles/${article.slug}`,
                        tags: article.meta.tags || [],
                        source: "website" as const,
                    }
                })


                // Get Medium articles
                const mediumArticles = await getMediumArticles()

                const formattedMediumArticles: Article[] = mediumArticles.map((article: MediumArticle) => ({
                    title: article.title,
                    description: article.description || article.title,
                    date: article.date,
                    imageUrl: article.imageUrl || '/images/placeholder-article.jpg',
                    url: article.url,
                    tags: article.tags || ['medium'],
                    source: "medium" as const,
                }))

                const allArticles = [...formattedMDXArticles, ...formattedMediumArticles].sort((a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )

                if (allArticles.length === 0) {
                    setError('No articles found')
                    return
                }

                setArticles(allArticles)
            } catch (error) {
                console.error('Error loading articles:', error)
                setError('Failed to load articles')
            } finally {
                setIsLoading(false)
            }
        }

        loadArticles()
    }, [])

    const ViewToggle = () => (
        <div className="hidden md:flex items-center gap-2">
            <button
                onClick={() => setIsListView(false)}
                className={`p-2 rounded-full transition-colors duration-200 ${
                    !isListView
                        ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
            >
                <LayoutGrid className="h-4 w-4"/>
            </button>
            <button
                onClick={() => setIsListView(true)}
                className={`p-2 rounded-full transition-colors duration-200 ${
                    isListView
                        ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                }`}
            >
                <List className="h-4 w-4"/>
            </button>
        </div>
    )

    if (isLoading) {
        return (
            <PageContainer title="Articles">
                <div className="flex justify-end mb-8">
                    <ViewToggle/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[300px] rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse"/>
                    ))}
                </div>
            </PageContainer>
        )
    }

    if (error) {
        return (
            <PageContainer title="Articles">
                <div className="flex justify-end mb-8">
                    <ViewToggle/>
                </div>
                <div
                    className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center">
                    <h2 className="text-2xl font-semibold mb-4">{error}</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Please try again later or check the console for more details.
                    </p>
                </div>
            </PageContainer>
        )
    }

    return (
        <PageContainer title="Articles">
            <div className="flex justify-end mb-8">
                <ViewToggle/>
            </div>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className={
                    isListView && isDesktop
                        ? "flex flex-col gap-6"
                        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                }
            >
                {articles.map((article, index) => (
                    <motion.div key={article.url} variants={item}>
                        <ArticleCard
                            title={article.title}
                            description={article.description}
                            date={article.date}
                            imageUrl={article.imageUrl}
                            url={article.url}
                            tags={article.tags || []}
                            source={article.source}
                            isListView={isListView && isDesktop}
                            index={index}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </PageContainer>
    )
}

export default function ArticlesPage() {
    return (
        <Suspense fallback={
            <div className="w-full py-12 pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <div className="max-w-[1400px] w-full mx-auto">
                    <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded mb-8"/>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i}
                                 className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                                <div className="h-52 bg-gray-200 dark:bg-gray-800 animate-pulse"/>
                                <div className="p-3 space-y-2">
                                    <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 animate-pulse rounded"/>
                                    <div className="h-5 w-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded"/>
                                    <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-800 animate-pulse rounded"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        }>
            <ArticlesContent/>
        </Suspense>
    )
}
