"use client"

import { Calendar, Tag } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"
import { MDXContent } from "./mdx-content"

interface MDXArticleProps {
  title: string
  date: string
  tags: string[]
  content: any // MDX content
}

export function MDXArticle({ title, date, tags, content }: MDXArticleProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="p-8 bg-white dark:bg-gray-800">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={date}>{formattedDate}</time>
            </div>
            {tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4" />
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </header>

        <MDXContent content={content} />
      </article>
    </Card>
  )
}