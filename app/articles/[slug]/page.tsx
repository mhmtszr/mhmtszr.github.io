import { getArticleBySlug, getAllArticles } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import { Metadata } from 'next'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

// Generate metadata for the article page
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  
  if (!article) {
    return {}
  }

  const ogImage = article.meta.image || '/images/placeholder-article.jpg'
  
  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      type: 'article',
      publishedTime: article.meta.date,
      authors: ['Mehmet Sezer'],
      tags: article.meta.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta.title,
      description: article.meta.description,
      images: [ogImage],
    },
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