"use client"

import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import { CodeCopyWrapper } from '@/components/ui/code-copy-wrapper'
import { ScrollToHash } from '@/components/ui/ScrollToHash'
import { ArticleImageEnhancer } from '@/components/ui/article-image-enhancer'
import { TableOfContents } from '@/components/ui/table-of-contents'
import { HeaderLinks } from '@/components/ui/header-link'
import { Toaster } from 'sonner'

interface ArticleContentProps {
  article: any
}

export function ArticleContentClient({ article }: ArticleContentProps) {
  return (
    <article className="container py-8">
      <ScrollToHash />
      <TableOfContents />
      <HeaderLinks />
      <Toaster position="bottom-right" />
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
        <h1 className="text-4xl font-bold dark:text-[#f0f0f5]">{article.meta.title}</h1>
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
      <div className="prose dark:prose-invert max-w-none mt-8 dark:text-[#d1d5db] [&_p]:dark:text-[#d1d5db] [&_h1]:dark:text-[#f0f0f5] [&_h2]:dark:text-[#f0f0f5] [&_h3]:dark:text-[#f0f0f5] [&_h4]:dark:text-[#f0f0f5] [&_h5]:dark:text-[#f0f0f5] [&_h6]:dark:text-[#f0f0f5] [&_li]:dark:text-[#d1d5db] [&_strong]:dark:text-[#f0f0f5] [&_b]:dark:text-[#f0f0f5] [&_em]:dark:text-[#d1d5db] [&_blockquote]:dark:text-[#d1d5db]">
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