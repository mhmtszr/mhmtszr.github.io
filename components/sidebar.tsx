"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  User,
  Briefcase,
  Code,
  Presentation,
  FileText,
  ImageIcon,
  Menu,
  Github,
  Linkedin,
  BookOpen,
  BookOpenText,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "About", href: "/", icon: User },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Projects", href: "/projects", icon: Code },
  { name: "Speaking", href: "/speaking", icon: Presentation },
  { name: "Articles", href: "/articles", icon: BookOpenText },
  { name: "Photography", href: "/photography", icon: ImageIcon },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only show the sidebar after hydration to avoid layout shift
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Mobile Navigation */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 h-16 border-b md:!hidden bg-white dark:bg-gray-950">
        <Link href="/" className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700">
            <AvatarImage src="/photography/profile.jpg" alt="Profile photo" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <span className="font-bold text-xl">Mehmet Sezer</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] max-w-[300px] p-0 flex flex-col">
              <div className="flex flex-col h-full min-h-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu containing links to different sections of the website and social media profiles
                </SheetDescription>
                <div className="flex items-center gap-3 mt-4 mb-6 px-4">
                  <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
                    <AvatarImage src="/photography/profile.jpg" alt="Profile photo" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
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
                            onClick={() => setIsMobileNavOpen(false)}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                              isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
                            )}
                          >
                            <IconComponent className="h-5 w-5 flex-shrink-0" />
                            <span className="truncate">{item.name}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
                {/* Mobile Social Links */}
                <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-8 flex-shrink-0">
                  <div className="grid grid-cols-5 gap-2 px-4 mb-6">
                    <Link
                      href="https://github.com/mhmtszr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                    <Link
                      href="https://linkedin.com/in/mehmetsezerr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                      href="https://x.com/_mehmetsezer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link
                      href="https://medium.com/@mehmet.sezer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                      <BookOpenText className="h-5 w-5" />
                      <span className="sr-only">Medium</span>
                    </Link>
                    <a
                      href="/Mehmet_Sezer_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                      <FileText className="h-5 w-5" />
                      <span className="sr-only">CV</span>
                    </a>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center px-4">
                    &copy; 2025 Mehmet Sezer
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 h-full">
          <div className="flex-1 flex flex-col pt-5 overflow-y-auto">
            <div className="flex flex-col items-center px-6 mb-8">
              <div className="mb-4">
                <Avatar className="h-24 w-24 border-2 border-gray-200 dark:border-gray-700">
                  <AvatarImage src="/photography/profile.jpg" alt="Profile photo" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
              </div>
              <span className="font-bold text-xl text-center">Mehmet Sezer</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Senior Software Engineer</span>
              <div className="mt-2">
                <ThemeToggle />
              </div>
            </div>
            <nav className="flex-1 px-3 pb-4">
              <ul className="grid gap-1">
                {navItems.map((item) => {
                  const IconComponent = item.icon
                  const isActive = pathname !== null && (pathname === item.href || pathname.startsWith(`${item.href}/`))
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                          isActive && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
                        )}
                      >
                        <IconComponent className="h-5 w-5 flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
          {/* Desktop Social Links */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-center gap-4">
              <Link
                href="https://github.com/mhmtszr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/mehmetsezerr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://x.com/_mehmetsezer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://medium.com/@mehmet.sezer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <BookOpenText className="h-5 w-5" />
                <span className="sr-only">Medium</span>
              </Link>
              <a
                href="/Mehmet_Sezer_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <FileText className="h-5 w-5" />
                <span className="sr-only">CV</span>
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              &copy; 2025 Mehmet Sezer
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
