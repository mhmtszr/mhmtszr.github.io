import { readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

interface ArticleFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  image?: string
}

export async function getArticleContent(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content/articles', `${slug}.mdx`)
    const source = await readFile(filePath, 'utf8')
    
    const { data: frontmatter, content } = matter(source)
    
    return {
      content,
      frontmatter: frontmatter as ArticleFrontmatter
    }
  } catch (error) {
    console.error('Error reading article:', error)
    return {
      content: null,
      frontmatter: null
    }
  }
} 