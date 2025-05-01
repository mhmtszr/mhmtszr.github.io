"use client"

import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import { CodeCopyWrapper } from '@/components/ui/code-copy-wrapper'
import { ScrollToHash } from '@/components/ui/ScrollToHash'
import { ArticleImageEnhancer } from '@/components/ui/article-image-enhancer'

interface ArticleContentProps {
  article: any
}

export function ArticleContentClient({ article }: ArticleContentProps) {
  return (
    <article className="container py-8">
      <ScrollToHash />
      <div className="flex flex-col gap-4">
        {article.meta.image && (
          <div className="relative w-full flex items-center justify-center mb-6">
            <div className="cursor-pointer" data-image-key="hero-image">
              <Image
                src={article.meta.image}
                alt={article.meta.title}
                width={1200}
                height={630}
                className="w-full max-h-[400px] md:max-h-[500px] object-contain"
                priority
              />
            </div>
          </div>
        )}
        <h1 className="text-4xl font-bold">{article.meta.title}</h1>
        <div className="flex flex-wrap items-center gap-4">
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
        </div>
        {article.meta.tags && article.meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.meta.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="prose dark:prose-invert max-w-none mt-8">
        <CodeCopyWrapper>{article.content}</CodeCopyWrapper>
      </div>
      
      {/* Image enhancer to make article images clickable with dialogs */}
      <ArticleImageEnhancer />
      
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