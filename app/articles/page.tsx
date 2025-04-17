"use client"

import { useState, useEffect } from "react"
import { LayoutGrid, List } from "lucide-react"
import { ArticleCard } from "@/components/ui/article-card"
import { Button } from "@/components/ui/button"
import { type ArticleMetadata } from "@/lib/mdx"
import { getMediumArticles, type MediumArticle } from "@/lib/medium"
import { motion } from "framer-motion"
import { useMediaQuery } from "../../hooks/use-media-query"

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
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function ArticlesPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [isListView, setIsListView] = useState(false)
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        console.log('Fetching MDX articles...')
        const mdxResponse = await fetch('/api/articles')
        if (!mdxResponse.ok) {
          throw new Error('Failed to fetch MDX articles')
        }
        const mdxArticles = await mdxResponse.json()
        console.log('MDX articles fetched:', mdxArticles)

        const formattedMDXArticles: Article[] = mdxArticles.map((article: { meta: ArticleMetadata, slug: string }) => {
          console.log('Processing MDX article:', article)
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

        console.log('Formatted MDX articles:', formattedMDXArticles)

        // Get Medium articles
        console.log('Fetching Medium articles...')
        const mediumArticles = await getMediumArticles()
        console.log('Medium articles fetched:', mediumArticles)

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

        console.log('All articles:', allArticles)

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
    <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-2">
      <Button
        variant={isListView ? "outline" : "default"}
        size="icon"
        onClick={() => setIsListView(false)}
        className="w-8 h-8"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant={isListView ? "default" : "outline"}
        size="icon"
        onClick={() => setIsListView(true)}
        className="w-8 h-8"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Articles</h1>
            <ViewToggle />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[350px] rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Articles</h1>
            <ViewToggle />
          </div>
          <div className="rounded-lg border bg-card p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">{error}</h2>
            <p className="text-muted-foreground">
              Please try again later or check the console for more details.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Articles</h1>
          <ViewToggle />
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={
            isListView && isDesktop 
              ? "flex flex-col gap-6" 
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
