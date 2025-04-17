import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/mdx'

export async function GET() {
  try {
    const articles = await getAllArticles()
    console.log('API - Articles loaded:', articles)
    return NextResponse.json(articles)
  } catch (error) {
    console.error('API - Error loading articles:', error)
    return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 })
  }
} 