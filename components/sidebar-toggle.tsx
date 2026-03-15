"use client"

import {useCallback, useEffect, useState} from "react"
import {PanelLeftClose, PanelLeftOpen} from "lucide-react"

export default function SidebarToggle() {
    const [sidebarHidden, setSidebarHidden] = useState(false)

    const toggleSidebar = useCallback(() => {
        setSidebarHidden(prev => !prev)
    }, [])

    useEffect(() => {
        const sidebar = document.querySelector<HTMLElement>(".md\\:w-64")
        const content = document.querySelector<HTMLElement>("#main-content")?.parentElement

        if (!sidebar || !content) return

        if (sidebarHidden) {
            sidebar.style.transform = "translateX(-100%)"
            sidebar.style.transition = "transform 300ms ease-in-out"
            content.style.marginLeft = "0"
            content.style.transition = "margin-left 300ms ease-in-out"
        } else {
            sidebar.style.transform = ""
            sidebar.style.transition = "transform 300ms ease-in-out"
            content.style.marginLeft = ""
            content.style.transition = "margin-left 300ms ease-in-out"
        }

        return () => {
            sidebar.style.transform = ""
            sidebar.style.transition = ""
            content.style.marginLeft = ""
            content.style.transition = ""
        }
    }, [sidebarHidden])

    return (
        <button
            onClick={toggleSidebar}
            aria-label={sidebarHidden ? "Show sidebar" : "Hide sidebar"}
            className="hidden md:flex fixed top-8 left-4 z-50 items-center justify-center p-2 rounded-lg transition-colors duration-200 bg-white/80 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 shadow-sm backdrop-blur-sm"
        >
            {sidebarHidden ? <PanelLeftOpen className="h-5 w-5"/> : <PanelLeftClose className="h-5 w-5"/>}
        </button>
    )
}
