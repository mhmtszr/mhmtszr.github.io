import '../article-styles.css'
import SidebarToggle from "@/components/sidebar-toggle"

export default function ArticleDetailLayout({
                                                children,
                                            }: {
    children: React.ReactNode
}) {
    return (
        <>
            <SidebarToggle/>
            {children}
        </>
    )
} 