// Server Component (no "use client" directive)
import { getArticleBySlug, getAllArticles } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ArticleContentClient } from '@/components/ui/article-content-client'
import { generateArticleSchema } from '@/lib/schema'
import { PageContainer } from "../../components/page-container"
import { Breadcrumb } from "@/components/ui/breadcrumb"

// Generate metadata for the article page
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
): Promise<Metadata> {
  // Ensure params are awaited before accessing
  const resolvedParams = await Promise.resolve(params)
  const { slug } = resolvedParams
  
  try {
    const article = await getArticleBySlug(slug)
    
    if (!article) {
      return {}
    }

    const ogImage = article.meta.image || '/images/placeholder-article.jpg'
    
    return {
      title: article.meta.title,
      description: article.meta.metaDescription || article.meta.description,
      authors: [{ name: 'Mehmet Sezer' }],
      keywords: article.meta.keywords || article.meta.tags,
      alternates: {
        canonical: article.meta.canonical || `https://msezer.dev/articles/${slug}`,
      },
      openGraph: {
        title: article.meta.title,
        description: article.meta.metaDescription || article.meta.description,
        type: 'article',
        publishedTime: article.meta.date,
        modifiedTime: article.meta.modified,
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
        url: article.meta.canonical || `https://msezer.dev/articles/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.meta.title,
        description: article.meta.metaDescription || article.meta.description,
        images: [ogImage],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {}
  }
}

// Generate all possible article slugs at build time
export async function generateStaticParams() {
  try {
    const articles = await getAllArticles()
    return articles.map((article) => ({
      slug: article.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Server component for data fetching
export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string } 
}) {
  // Ensure params are awaited before accessing
  const resolvedParams = await Promise.resolve(params)
  const { slug } = resolvedParams
  
  if (!slug) {
    notFound()
  }

  try {
    const article = await getArticleBySlug(slug)
    
    if (!article) {
      notFound()
    }
  
    // Generate schema.org JSON-LD data
    const articleSchema = generateArticleSchema(article)
  
    // Render the client component with the article data
    return (
      <PageContainer>
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Articles', href: '/articles' },
            { label: article.meta.title, href: `/articles/${article.slug}`, isCurrent: true }
          ]}
        />
        <div className="space-y-8">
          <ArticleContentClient article={article} />
        </div>
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema)
          }}
        />
      </PageContainer>
    )
  } catch (error) {
    console.error(`Error rendering article page for slug: ${slug}`, error)
    notFound()
  }
} 