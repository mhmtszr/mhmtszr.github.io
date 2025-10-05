"use client"

import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import { CodeCopyWrapper } from './code-copy-wrapper'
import { ScrollToHash } from '@/components/ui/ScrollToHash'
import { ArticleImageEnhancer } from './article-image-enhancer'
import { TableOfContents } from '@/components/ui/table-of-contents'
import { HeaderLinks } from '@/components/ui/header-link'
import { Toaster } from 'sonner'
import { useEffect } from 'react'
import Link from 'next/link'
import { generateArticleSchema } from '@/lib/schema'

interface ArticleContentProps {
  article: {
    meta: {
      title: string
      description: string
      date: string
      image?: string
      tags?: string[]
      modified?: string
      readingTime?: string
    }
    slug: string
    content: any
  }
}

export function ArticleContentClient({ article }: ArticleContentProps) {
  return (
    <article className="w-full">
      <ScrollToHash />
      <TableOfContents />
      <HeaderLinks />
      <Toaster position="bottom-right" />
      
      {/* Container for TOC positioning - matches the header section width */}
      <div className="container w-full max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col gap-4">
          {article.meta.image && (
            <div className="relative w-full flex items-center justify-center mb-6">
              <div className="cursor-pointer" data-image-key="hero-image">
                <Image
                  src={article.meta.image}
                  alt={article.meta.title || "Article featured image"}
                  width={1200}
                  height={630}
                  className="w-full max-h-[400px] md:max-h-[500px] object-contain"
                  priority
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            </div>
          )}
          <h1 className="text-4xl font-bold dark:text-[#f0f0f5]">{article.meta.title}</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <time dateTime={article.meta.date}>{new Date(article.meta.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</time>
            
            {article.meta.readingTime && (
              <span className="inline-flex items-center gap-1 ml-3">
                <span>•</span>
                <span>{article.meta.readingTime}</span>
              </span>
            )}
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

        {/* Article Content - Same container for consistent alignment */}
        <div className="prose prose-lg dark:prose-invert max-w-none mt-8 dark:text-[#d1d5db] [&_p]:dark:text-[#d1d5db] [&_h1]:dark:text-[#f0f0f5] [&_h2]:dark:text-[#f0f0f5] [&_h3]:dark:text-[#f0f0f5] [&_h4]:dark:text-[#f0f0f5] [&_h5]:dark:text-[#f0f0f5] [&_h6]:dark:text-[#f0f0f5] [&_li]:dark:text-[#d1d5db] [&_strong]:dark:text-[#f0f0f5] [&_b]:dark:text-[#f0f0f5] [&_em]:dark:text-[#d1d5db] [&_blockquote]:dark:text-[#d1d5db]">
          <CodeCopyWrapper>{article.content}</CodeCopyWrapper>
        </div>
      </div>
      
      {/* Image enhancer to make article images clickable with dialogs */}
      <ArticleImageEnhancer />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema(article))
        }}
      />
    </article>
  )
} 