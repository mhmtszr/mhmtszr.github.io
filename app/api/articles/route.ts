import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/mdx'

// Force static generation
export const dynamic = 'force-static'
export const revalidate = false

export async function GET() {
  try {
    const articles = await getAllArticles()
    return NextResponse.json(articles)
  } catch (error) {
    console.error('API - Error loading articles:', error)
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 })
  }
} 