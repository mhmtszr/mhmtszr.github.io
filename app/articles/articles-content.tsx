"use client"

import {useEffect, useState} from "react"
import {LayoutGrid, List} from "lucide-react"
import {ArticleCard} from "@/components/ui/article-card"
import {getMediumArticles, type MediumArticle} from "@/lib/medium"
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

function sortByDate(articles: Article[]) {
    return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

interface ArticlesContentProps {
    initialArticles: Article[]
}

export function ArticlesContent({initialArticles}: ArticlesContentProps) {
    const [isDesktop, setIsDesktop] = useState(true)
    const [isListView, setIsListView] = useState(false)
    const [articles, setArticles] = useState<Article[]>(sortByDate(initialArticles))

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

    // Load Medium articles in the background
    useEffect(() => {
        let cancelled = false

        async function loadMediumArticles() {
            try {
                const mediumArticles = await getMediumArticles()
                if (cancelled) return

                const formattedMediumArticles: Article[] = mediumArticles.map((article: MediumArticle) => ({
                    title: article.title,
                    description: article.description || article.title,
                    date: article.date,
                    imageUrl: article.imageUrl || '/images/placeholder-article.jpg',
                    url: article.url,
                    tags: article.tags || ['medium'],
                    source: "medium" as const,
                }))

                if (formattedMediumArticles.length > 0) {
                    setArticles(prev => {
                        const existingUrls = new Set(prev.map(a => a.url))
                        const existingTitles = new Set(prev.map(a => a.title.toLowerCase().trim()))
                        const newArticles = formattedMediumArticles.filter(a =>
                            !existingUrls.has(a.url) && !existingTitles.has(a.title.toLowerCase().trim())
                        )
                        return newArticles.length > 0 ? sortByDate([...prev, ...newArticles]) : prev
                    })
                }
            } catch (error) {
                if (!cancelled) {
                    console.error('Error loading Medium articles:', error)
                }
            }
        }

        loadMediumArticles()
        return () => { cancelled = true }
    }, [])

    const ViewToggle = () => (
        <div className="hidden md:flex items-center gap-2" role="group" aria-label="View layout">
            <button
                onClick={() => setIsListView(false)}
                aria-label="Grid view"
                aria-pressed={!isListView}
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
                aria-label="List view"
                aria-pressed={isListView}
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

    return (
        <PageContainer title="Articles">
            <div className="flex justify-end mb-8">
                <ViewToggle/>
            </div>
            <div
                className={
                    isListView && isDesktop
                        ? "flex flex-col gap-6"
                        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                }
            >
                {articles.map((article, index) => (
                    <div key={article.url} className="animate-fade-in-up" style={{animationDelay: `${Math.min(index * 0.05, 0.5)}s`}}>
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
                    </div>
                ))}
            </div>
        </PageContainer>
    )
}
