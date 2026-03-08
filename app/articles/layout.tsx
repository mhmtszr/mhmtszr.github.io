import type React from "react"
import type {Metadata} from 'next'

interface ArticleLayoutProps {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: {
        default: "Articles",
        template: "%s | Mehmet Sezer",
    },
    description: "Technical articles and insights about software engineering, microservices, distributed systems, and software architecture by Mehmet Sezer.",
    alternates: {
        canonical: 'https://msezer.dev/articles',
    },
    openGraph: {
        title: "Articles | Mehmet Sezer",
        description: "Technical articles and insights about software engineering, microservices, distributed systems, and software architecture by Mehmet Sezer.",
        type: 'website',
        url: 'https://msezer.dev/articles',
        images: [{
            url: 'https://msezer.dev/opengraph-image.png',
            width: 1200,
            height: 630,
            alt: 'Mehmet Sezer - Articles',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Articles | Mehmet Sezer',
        description: 'Technical articles and insights about software engineering, microservices, distributed systems, and software architecture by Mehmet Sezer.',
        images: ['https://msezer.dev/opengraph-image.png'],
    },
}

export default function ArticleLayout({
                                          children,
                                      }: ArticleLayoutProps) {
    return (
        <>{children}</>
    )
}
