import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import {compileMDX} from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import {estimateReadingTime} from './reading-time'

export interface ArticleMetadata {
    title: string
    description: string
    date: string
    image: string
    tags: string[]
    author?: string
    draft?: boolean
    modified?: string
    canonical?: string
    metaDescription?: string
    keywords?: string[]
    readingTime?: string
}

interface Article {
    meta: {
        title: string
        description: string
        date: string
        image?: string
        tags?: string[]
        draft?: boolean
        modified?: string
        canonical?: string
        metaDescription?: string
        keywords?: string[]
        readingTime?: string
    }
    slug: string
    content: any // MDX content
}

const articlesDirectory = path.join(process.cwd(), 'content/articles')

const prettyCodeOptions = {
    // Use more standard themes
    theme: 'material-theme',
    onVisitLine(node: any) {
        // Prevent lines from collapsing in `display: grid` mode
        if (node.children.length === 0) {
            node.children = [{type: 'text', value: ' '}]
        }
    },
    onVisitHighlightedLine(node: any) {
        node.properties.className = ['highlighted']
    },
    onVisitHighlightedWord(node: any) {
        node.properties.className = ['word']
    }
}

export async function getArticleBySlug(slug: string): Promise<Article> {
    try {
        // Try .md first, then .mdx if .md doesn't exist
        let fullPath = path.join(articlesDirectory, `${slug}.md`)

        // If .md doesn't exist, try .mdx
        if (!fs.existsSync(fullPath)) {
            fullPath = path.join(articlesDirectory, `${slug}.mdx`)
        }

        if (!fs.existsSync(fullPath)) {
            throw new Error(`Article ${slug} not found`)
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const {data: meta, content: rawContent} = matter(fileContents)

        // Ensure required fields are present
        if (!meta.title || !meta.description || !meta.date) {
            throw new Error(`Article ${slug} is missing required metadata fields`)
        }

        // Calculate reading time if not provided
        const readingTime = meta.readingTime || estimateReadingTime(rawContent)

        // Compile MDX content with rehype-pretty-code
        const {content} = await compileMDX({
            source: rawContent,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    rehypePlugins: [
                        rehypeSlug,
                        [
                            rehypeAutolinkHeadings,
                            {behavior: 'append'}
                        ],
                        [rehypePrettyCode, prettyCodeOptions]
                    ],
                }
            }
        })

        return {
            meta: {
                title: meta.title,
                description: meta.description,
                date: meta.date,
                image: meta.image,
                tags: meta.tags || [],
                draft: meta.draft || false,
                modified: meta.modified,
                canonical: meta.canonical,
                metaDescription: meta.metaDescription,
                keywords: meta.keywords || [],
                readingTime: readingTime
            },
            slug,
            content
        }
    } catch (error) {
        console.error(`Error getting article by slug ${slug}:`, error)
        throw error
    }
}

export interface ArticleMeta {
    meta: Article['meta']
    slug: string
}

export function getAllArticleMeta(): ArticleMeta[] {
    const fileNames = fs.readdirSync(articlesDirectory)
    const articles = fileNames
        .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
        .map(fileName => {
            const slug = fileName.replace(/\.(md|mdx)$/, '')
            const fullPath = path.join(articlesDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const {data: meta, content: rawContent} = matter(fileContents)

            return {
                meta: {
                    title: meta.title,
                    description: meta.description,
                    date: meta.date,
                    image: meta.image,
                    tags: meta.tags || [],
                    draft: meta.draft || false,
                    modified: meta.modified,
                    canonical: meta.canonical,
                    metaDescription: meta.metaDescription,
                    keywords: meta.keywords || [],
                    readingTime: meta.readingTime || estimateReadingTime(rawContent),
                },
                slug,
            }
        })

    return articles.sort((a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    )
}

export function getLatestArticles(allArticles: ArticleMeta[], count: number): ArticleMeta[] {
    return allArticles
        .filter((article) => !article.meta.draft)
        .slice(0, count)
} 