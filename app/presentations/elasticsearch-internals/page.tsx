"use client"

import {useRef} from "react"
import SidebarToggle from "@/components/sidebar-toggle"

export default function ElasticsearchInternalsPage() {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    return (
        <div className="relative h-[calc(100vh-4rem)] md:h-screen">
            <SidebarToggle/>
            <iframe
                ref={iframeRef}
                src="/presentations/elasticsearch-internals-slides.html"
                title="How Elasticsearch Actually Works Under the Hood"
                onLoad={() => iframeRef.current?.focus()}
                className="w-full h-full border-0"
            />
        </div>
    )
}
