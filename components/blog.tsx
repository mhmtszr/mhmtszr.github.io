"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar } from "lucide-react"
import Link from "next/link"

interface Article {
  title: string
  link: string
  pubDate: string
  thumbnail: string
  categories: string[]
}

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Using a proxy service to fetch Medium RSS feed and convert to JSON
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mehmet.sezer",
        )
        const data = await response.json()

        if (data.status === "ok") {
          setArticles(data.items)
        }
      } catch (error) {
        console.error("Error fetching Medium articles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Blog</h2>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <Link href={article.link} target="_blank" rel="noopener noreferrer">
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gray-200 relative">
                      <img
                        src={
                          article.thumbnail ||
                          `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(article.title)}`
                        }
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(article.pubDate)}
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found. Check back later!</p>
          </div>
        )}
      </div>
    </section>
  )
}
