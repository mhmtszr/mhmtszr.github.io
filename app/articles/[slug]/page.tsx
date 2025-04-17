import { getArticleBySlug, getAllArticles } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

// Generate all possible article slugs at build time
export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  if (!params?.slug) {
    notFound()
  }

  const article = await getArticleBySlug(params.slug)
  
  if (!article) {
    notFound()
  }

  return (
    <article className="container py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">{article.meta.title}</h1>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <time className="text-sm text-muted-foreground">
            {new Date(article.meta.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        {article.meta.tags && article.meta.tags.length > 0 && (
          <div className="flex gap-2">
            {article.meta.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="prose dark:prose-invert max-w-none mt-8">
        {article.content}
      </div>
    </article>
  )
} 