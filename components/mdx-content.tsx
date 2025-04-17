"use client"

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { cn } from '@/lib/utils'

interface MDXContentProps {
  source: MDXRemoteSerializeResult
  className?: string
}

export function MDXContent({ source, className }: MDXContentProps) {
  return (
    <article className={cn('prose prose-slate dark:prose-invert max-w-none', className)}>
      <MDXRemote {...source} />
    </article>
  )
} 