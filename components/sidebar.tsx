import Link from "next/link"
import {
    BookOpenText,
    Briefcase,
    Code,
    FileText,
    Github,
    ImageIcon,
    Linkedin,
    Presentation,
    Twitter,
    User,
} from "lucide-react"
import {MediumIcon} from "@/components/icons/medium"
import {ThemeToggle} from "@/components/theme-toggle"
import {NavLink} from "@/components/nav-link"
import MobileNav from "@/components/mobile-nav"

const navItems = [
    {name: "About", href: "/", icon: <User className="h-5 w-5"/>},
    {name: "Experience", href: "/experience", icon: <Briefcase className="h-5 w-5"/>},
    {name: "Projects", href: "/projects", icon: <Code className="h-5 w-5"/>},
    {name: "Speaking", href: "/speaking", icon: <Presentation className="h-5 w-5"/>},
    {name: "Articles", href: "/articles", icon: <BookOpenText className="h-5 w-5"/>},
    {name: "Photography", href: "/photography", icon: <ImageIcon className="h-5 w-5"/>},
]

export default function Sidebar() {
    return (
        <>
            {/* Mobile Navigation */}
            <MobileNav/>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:w-64 lg:w-72 md:flex-col md:fixed md:inset-y-0 font-sans">
                <div
                    className="flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 h-full">
                    <div className="flex-1 flex flex-col pt-5 overflow-y-auto">
                        <div className="flex flex-col items-center px-6 mb-8">
                            <div className="mb-4">
                                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
                                    <img src="/photography/profile.jpg" alt="Mehmet Sezer"
                                         className="aspect-square h-full w-full object-cover" fetchPriority="high"/>
                                </div>
                            </div>
                            <span className="font-bold text-xl text-center">Mehmet Sezer</span>
                            <span
                                className="text-sm text-gray-500 dark:text-gray-400">Senior Software Engineer</span>
                            <div className="mt-2">
                                <ThemeToggle/>
                            </div>
                        </div>
                        <nav aria-label="Main navigation" className="flex-1 px-3 pb-4">
                            <ul className="grid gap-1">
                                {navItems.map((item) => (
                                    <NavLink key={item.name} href={item.href} icon={item.icon}>
                                        {item.name}
                                    </NavLink>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    {/* Desktop Social Links */}
                    <footer className="border-t border-gray-200 dark:border-gray-800 p-6">
                        <div className="flex items-center justify-center gap-4">
                            <Link
                                href="https://github.com/mhmtszr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            >
                                <Github className="h-5 w-5"/>
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link
                                href="https://linkedin.com/in/mehmetsezerr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            >
                                <Linkedin className="h-5 w-5"/>
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link
                                href="https://x.com/_mehmetsezer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            >
                                <Twitter className="h-5 w-5"/>
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="https://medium.com/@mehmet.sezer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            >
                                <MediumIcon className="h-5 w-5"/>
                                <span className="sr-only">Medium</span>
                            </Link>
                            <a
                                href="/Mehmet_Sezer_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            >
                                <FileText className="h-5 w-5"/>
                                <span className="sr-only">CV</span>
                            </a>
                        </div>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center"
                           suppressHydrationWarning>
                            &copy; {new Date().getFullYear()} Mehmet Sezer
                        </p>
                    </footer>
                </div>
            </div>
        </>
    )
}
