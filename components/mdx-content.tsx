"use client"

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { cn } from '@/lib/utils'

interface MDXContentProps {
  source: MDXRemoteSerializeResult
  className?: string
}

export function MDXContent({ source, className }: MDXContentProps) {
  return (
    <article className={cn('prose prose-slate dark:prose-invert max-w-none dark:text-[#d1d5db] [&_p]:dark:text-[#d1d5db] [&_h1]:dark:text-[#f0f0f5] [&_h2]:dark:text-[#f0f0f5] [&_h3]:dark:text-[#f0f0f5] [&_h4]:dark:text-[#f0f0f5] [&_h5]:dark:text-[#f0f0f5] [&_h6]:dark:text-[#f0f0f5] [&_li]:dark:text-[#d1d5db] [&_strong]:dark:text-[#f0f0f5] [&_b]:dark:text-[#f0f0f5] [&_em]:dark:text-[#d1d5db] [&_blockquote]:dark:text-[#d1d5db]', className)}>
      <MDXRemote {...source} />
    </article>
  )
} 