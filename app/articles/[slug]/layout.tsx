// No "use client" directive here for server components

import '../article-styles.css'

export default function ArticleDetailLayout({
                                                children,
                                            }: {
    children: React.ReactNode
}) {
    return <>{children}</>
} 