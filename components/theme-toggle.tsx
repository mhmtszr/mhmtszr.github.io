"use client"

import {useEffect, useState} from "react"
import {Moon, Sun} from "lucide-react"

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"))
    }, [])

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
            setIsDark(false)
        } else {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
            setIsDark(true)
        }
    }

    return (
        <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            aria-label="Toggle theme"
        >
            {isDark ? <Sun className="h-[1.2rem] w-[1.2rem]"/> : <Moon className="h-[1.2rem] w-[1.2rem]"/>}
        </button>
    )
}
