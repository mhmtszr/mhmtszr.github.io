import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from 'next'

interface ArticleLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: "Articles by Mehmet Sezer - Software Engineering Insights",
    template: "%s | Mehmet Sezer's Blog"
  },
  description: "Technical articles and insights about software engineering, microservices, distributed systems, and software architecture by Mehmet Sezer.",
  openGraph: {
    title: "Articles by Mehmet Sezer - Software Engineering Insights",
    description: "Technical articles and insights about software engineering, microservices, distributed systems, and software architecture.",
    type: 'article',
    authors: ['Mehmet Sezer']
  }
}

export default function ArticleLayout({
  children,
}: ArticleLayoutProps) {
  return (
    <>{children}</>
  )
}
