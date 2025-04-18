import { getArticleBySlug, getAllArticles } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for the article page
export async function generateMetadata(
  { params }: ArticlePageProps
): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const article = await getArticleBySlug(slug)
    
    if (!article) {
      return {}
    }

    const ogImage = article.meta.image || '/images/placeholder-article.jpg'
    
    return {
      title: article.meta.title,
      description: article.meta.description,
      authors: [{ name: 'Mehmet Sezer' }],
      keywords: article.meta.tags,
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
  } catch (error) {
    return {}
  }
}

// Generate all possible article slugs at build time
export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage(
  { params }: ArticlePageProps
) {
  const { slug } = await params
  
  if (!slug) {
    notFound()
  }

  const article = await getArticleBySlug(slug)
  
  if (!article) {
    notFound()
  }

  return (
    <article className="container py-8">
      <div className="flex flex-col gap-4">
        {article.meta.image && (
          <div className="relative w-full flex items-center justify-center mb-6">
            <Image
              src={article.meta.image}
              alt={article.meta.title}
              width={1200}
              height={630}
              className="w-full max-h-[400px] md:max-h-[500px] object-contain"
              priority
            />
          </div>
        )}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.meta.title,
            description: article.meta.description,
            author: {
              '@type': 'Person',
              name: 'Mehmet Sezer',
              url: 'https://msezer.dev'
            },
            datePublished: article.meta.date,
            image: article.meta.image,
            publisher: {
              '@type': 'Person',
              name: 'Mehmet Sezer',
              url: 'https://msezer.dev'
            }
          })
        }}
      />
    </article>
  )
} 