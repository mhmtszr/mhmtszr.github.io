"use client"

import dynamic from 'next/dynamic'
import Image from 'next/image'
import {Badge} from '@/components/ui/badge'
import {Calendar} from 'lucide-react'
import {CodeCopyWrapper} from './code-copy-wrapper'
import {ScrollToHash} from '@/components/ui/ScrollToHash'
import {HeaderLinks} from '@/components/ui/header-link'

const TableOfContents = dynamic(() => import('@/components/ui/table-of-contents').then(m => ({default: m.TableOfContents})), {ssr: false})
const ArticleImageEnhancer = dynamic(() => import('./article-image-enhancer').then(m => ({default: m.ArticleImageEnhancer})), {ssr: false})

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

export function ArticleContentClient({article}: ArticleContentProps) {
    return (
        <article className="w-full">
            <ScrollToHash/>
            <TableOfContents/>
            <HeaderLinks/>

            {/* Article container — optimized for long-form reading */}
            <div className="w-full max-w-[740px] mx-auto px-5 sm:px-8 pt-8 pb-16">
                {/* Header section */}
                <header className="mb-10">
                    {article.meta.image && (
                        <div className="relative w-full flex items-center justify-center mb-8">
                            <div className="cursor-pointer w-full" data-image-key="hero-image">
                                <Image
                                    src={article.meta.image}
                                    alt={article.meta.title || "Article featured image"}
                                    width={1200}
                                    height={630}
                                    className="w-full max-h-[400px] md:max-h-[500px] object-contain rounded-lg"
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                />
                            </div>
                        </div>
                    )}

                    <h1 className="text-5xl sm:text-6xl font-bold font-serif leading-tight tracking-tight dark:text-white">
                        {article.meta.title}
                    </h1>

                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 shrink-0"/>
                        <time dateTime={article.meta.date}>{new Date(article.meta.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</time>
                        {article.meta.readingTime && (
                            <span className="inline-flex items-center gap-1.5 ml-2 text-gray-500 dark:text-gray-400">
                <span aria-hidden="true">·</span>
                <span>{article.meta.readingTime}</span>
              </span>
                        )}
                    </div>

                    {article.meta.tags && article.meta.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {article.meta.tags.map((tag: string) => (
                                <Badge key={tag} variant="outline" className="bg-gray-50 dark:bg-gray-800 text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Subtle separator between header and body */}
                    <div className="mt-8 border-t border-gray-200 dark:border-gray-700/60"/>
                </header>

                {/* Article body — serif body text for comfortable long-form reading */}
                <div className="article-body prose prose-lg dark:prose-invert max-w-none">
                    <CodeCopyWrapper>{article.content}</CodeCopyWrapper>
                </div>
            </div>

            {/* Image enhancer to make article images clickable with dialogs */}
            <ArticleImageEnhancer/>
        </article>
    )
} 