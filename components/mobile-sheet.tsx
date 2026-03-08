"use client"

import Link from "next/link"
import {cn} from "@/lib/utils"
import {
    BookOpenText,
    Briefcase,
    Code,
    FileText,
    Github,
    ImageIcon,
    Linkedin,
    Menu,
    Presentation,
    Twitter,
    User,
} from "lucide-react"
import {MediumIcon} from "@/components/icons/medium"
import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet"

const navItems = [
    {name: "About", href: "/", icon: User},
    {name: "Experience", href: "/experience", icon: Briefcase},
    {name: "Projects", href: "/projects", icon: Code},
    {name: "Speaking", href: "/speaking", icon: Presentation},
    {name: "Articles", href: "/articles", icon: BookOpenText},
    {name: "Photography", href: "/photography", icon: ImageIcon},
]

export default function MobileSheet({
    isOpen,
    onOpenChange,
    pathname,
}: {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    pathname: string | null
}) {
    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium font-sans ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                >
                    <Menu className="h-6 w-6"/>
                    <span className="sr-only">Toggle menu</span>
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] max-w-[300px] p-0 flex flex-col">
                <div className="flex flex-col h-full min-h-0">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <SheetDescription className="sr-only">
                        Navigation menu containing links to different sections of the website and social
                        media profiles
                    </SheetDescription>
                    <div className="flex items-center gap-3 mt-4 mb-6 px-4">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
                            <img src="/photography/profile.jpg" alt="Mehmet Sezer" className="aspect-square h-full w-full object-cover"/>
                        </div>
                        <span className="font-bold text-lg">Mehmet Sezer</span>
                    </div>
                    <nav className="flex-1 overflow-y-auto min-h-0">
                        <ul className="grid gap-0.5 px-2">
                            {navItems.map((item) => {
                                const IconComponent = item.icon
                                const isActive = pathname !== null && (pathname === item.href || pathname.startsWith(`${item.href}/`))
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            onClick={() => onOpenChange(false)}
                                            aria-current={isActive ? "page" : undefined}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                                isActive && "bg-blue-50 text-blue-700 border-l-2 border-blue-600 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-400",
                                            )}
                                        >
                                            <IconComponent
                                                className={cn("h-5 w-5 shrink-0", isActive && "text-blue-600 dark:text-blue-400")}/>
                                            <span className="truncate">{item.name}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                    <footer
                        className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-8 shrink-0">
                        <div className="grid grid-cols-5 gap-2 px-4 mb-6">
                            <Link href="https://github.com/mhmtszr" target="_blank" rel="noopener noreferrer"
                                  className="flex justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                <Github className="h-5 w-5"/>
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href="https://linkedin.com/in/mehmetsezerr" target="_blank" rel="noopener noreferrer"
                                  className="flex justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                <Linkedin className="h-5 w-5"/>
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link href="https://x.com/_mehmetsezer" target="_blank" rel="noopener noreferrer"
                                  className="flex justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                <Twitter className="h-5 w-5"/>
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="https://medium.com/@mehmet.sezer" target="_blank" rel="noopener noreferrer"
                                  className="flex justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                <MediumIcon className="h-5 w-5"/>
                                <span className="sr-only">Medium</span>
                            </Link>
                            <a href="/Mehmet_Sezer_Resume.pdf" target="_blank" rel="noopener noreferrer"
                               className="flex justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                <FileText className="h-5 w-5"/>
                                <span className="sr-only">CV</span>
                            </a>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center px-4"
                           suppressHydrationWarning>
                            &copy; {new Date().getFullYear()} Mehmet Sezer
                        </p>
                    </footer>
                </div>
            </SheetContent>
        </Sheet>
    )
}
