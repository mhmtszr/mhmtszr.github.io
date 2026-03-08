"use client"

import {useState, lazy, Suspense} from "react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {Menu} from "lucide-react"
import {ThemeToggle} from "@/components/theme-toggle"

const LazySheet = lazy(() => import("@/components/mobile-sheet"))

export default function MobileNav() {
    const pathname = usePathname()
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

    return (
        <div
            className="sticky top-0 z-40 flex items-center justify-between px-4 h-16 border-b md:hidden! bg-white dark:bg-gray-950 font-sans">
            <Link href="/" className="flex items-center gap-3">
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
                    <img src="/photography/profile.jpg" alt="Mehmet Sezer" className="aspect-square h-full w-full object-cover" fetchPriority="high"/>
                </div>
                <span className="font-bold text-xl">Mehmet Sezer</span>
            </Link>
            <div className="flex items-center gap-2">
                <ThemeToggle/>
                {isMobileNavOpen ? (
                    <Suspense fallback={null}>
                        <LazySheet
                            isOpen={isMobileNavOpen}
                            onOpenChange={setIsMobileNavOpen}
                            pathname={pathname}
                        />
                    </Suspense>
                ) : (
                    <button
                        onClick={() => setIsMobileNavOpen(true)}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium font-sans ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
                        <Menu className="h-6 w-6"/>
                        <span className="sr-only">Toggle menu</span>
                    </button>
                )}
            </div>
        </div>
    )
}
