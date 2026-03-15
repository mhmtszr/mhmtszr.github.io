"use client"

import {useCallback, useEffect, useRef, useState} from "react"
import {Maximize2, Minimize2} from "lucide-react"

export default function ElasticsearchInternalsPage() {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }
        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }, [])

    const toggleFullscreen = useCallback(() => {
        if (!iframeRef.current) return
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            iframeRef.current.requestFullscreen()
        }
    }, [])

    return (
        <div className="relative h-[calc(100vh-4rem)] md:h-screen">
            <button
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
                className="absolute bottom-4 right-4 z-10 p-2 rounded-full transition-colors duration-200 bg-white/80 text-gray-800 hover:bg-white dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700 shadow-sm backdrop-blur-sm"
            >
                {isFullscreen ? <Minimize2 className="h-4 w-4"/> : <Maximize2 className="h-4 w-4"/>}
            </button>
            <iframe
                ref={iframeRef}
                src="/presentations/elasticsearch-internals.html"
                title="How Elasticsearch Actually Works Under the Hood"
                allow="fullscreen"
                onLoad={() => iframeRef.current?.focus()}
                className="w-full h-full border-0"
            />
        </div>
    )
}
