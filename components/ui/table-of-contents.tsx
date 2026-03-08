"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { List, X, PanelRightClose, PanelRightOpen } from "lucide-react"

interface TOCItem {
  id: string
  text: string
  level: number
}

const TOC_WIDTH = 208
const TOC_GAP = 48

export function TableOfContents() {
  const [isOpen, setIsOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState(true)
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [readingProgress, setReadingProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sidebarLeft, setSidebarLeft] = useState<number | null>(null)
  const headingsRef = useRef<Element[]>([])
  const articleRef = useRef<HTMLElement | null>(null)
  const tocScrollRef = useRef<HTMLDivElement | null>(null)

  const updateActiveHeading = useCallback(() => {
    const headings = headingsRef.current
    if (headings.length === 0) return

    const offset = 120
    let current = 0
    for (let i = 0; i < headings.length; i++) {
      if (headings[i].getBoundingClientRect().top <= offset) {
        current = i
      } else {
        break
      }
    }

    setActiveId(headings[current]?.getAttribute("id") || "")
    setActiveIndex(current)
  }, [])

  const updateProgress = useCallback(() => {
    const article = articleRef.current
    if (!article) return

    const rect = article.getBoundingClientRect()
    const articleTop = rect.top + window.scrollY
    const progress = Math.min(
      100,
      Math.max(0, ((window.scrollY + window.innerHeight - articleTop) / rect.height) * 100)
    )
    setReadingProgress(progress)
  }, [])

  const updateSidebarPosition = useCallback(() => {
    const container = document.querySelector(".prose")
    if (!container) return

    const rect = container.getBoundingClientRect()
    const left = rect.right + TOC_GAP

    if (left + TOC_WIDTH <= window.innerWidth - 16) {
      setSidebarLeft(left)
    } else {
      setSidebarLeft(null)
    }
  }, [])

  useEffect(() => {
    const articleContent = document.querySelector(".prose")
    if (!articleContent) return
    articleRef.current = articleContent as HTMLElement

    const headings = articleContent.querySelectorAll("h2, h3, h4, h5")
    const items: TOCItem[] = []

    headings.forEach((heading) => {
      let id = heading.getAttribute("id") || ""
      if (!id) {
        id =
          heading.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "") || `heading-${items.length}`
        heading.setAttribute("id", id)
      }
      items.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.substring(1)) - 1,
      })
    })

    setTocItems(items)
    headingsRef.current = Array.from(headings)

    updateActiveHeading()
    updateProgress()
    updateSidebarPosition()

    const handleScroll = () => {
      updateActiveHeading()
      updateProgress()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", updateSidebarPosition)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateSidebarPosition)
    }
  }, [updateActiveHeading, updateProgress, updateSidebarPosition])

  useEffect(() => {
    const container = tocScrollRef.current
    if (!activeId || !container) return
    const activeEl = container.querySelector(`a[href="#${CSS.escape(activeId)}"]`) as HTMLElement | null
    if (!activeEl) return

    const containerRect = container.getBoundingClientRect()
    const elRect = activeEl.getBoundingClientRect()
    const targetOffset = containerRect.height * 0.3

    const scrollTo = container.scrollTop + (elRect.top - containerRect.top) - targetOffset
    container.scrollTo({ top: Math.max(0, scrollTo), behavior: "smooth" })
  }, [activeId])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveId(id)
      const url = new URL(window.location.href)
      url.hash = id
      window.history.pushState({}, "", url.toString())
      if (!sidebarLeft) setIsOpen(false)
    }
  }

  if (tocItems.length === 0) return null

  const tocList = (
    <nav className="toc" aria-label="Table of Contents">
      <ul className="space-y-0.5">
        {tocItems.map((item) => (
          <li
            key={item.id}
            className={
              item.level === 2
                ? "ml-3"
                : item.level === 3
                  ? "ml-6"
                  : item.level >= 4
                    ? "ml-9"
                    : ""
            }
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(item.id)
              }}
              className={`block py-1 pl-3 text-[13px] leading-snug border-l-2 transition-all duration-300 ${
                activeId === item.id
                  ? "border-primary text-primary font-semibold"
                  : item.level === 1
                    ? "text-foreground/80 font-semibold hover:text-foreground hover:border-border border-transparent"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )

  const progressBar = (
    <div className="h-0.5 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  )

  const hasDesktopSpace = sidebarLeft !== null

  return (
    <>
      {/* Desktop: Sticky sidebar with toggle */}
      {hasDesktopSpace && (
        <div
          className="fixed z-30 top-24 hidden xl:block"
          style={{ left: sidebarLeft, width: TOC_WIDTH }}
        >
          <AnimatePresence mode="wait">
            {desktopOpen ? (
              <motion.div
                key="toc-panel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col max-h-[calc(100vh-8rem)]"
              >
                <div className="mb-3 shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      On this page
                    </span>
                    <button
                      onClick={() => setDesktopOpen(false)}
                      className="p-0.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Hide table of contents"
                    >
                      <PanelRightClose size={14} />
                    </button>
                  </div>
                  {progressBar}
                </div>
                <div ref={tocScrollRef} className="overflow-y-auto overflow-x-hidden pr-2 toc-scrollbar">
                  {tocList}
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="toc-toggle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => setDesktopOpen(true)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-background/95 backdrop-blur-sm shadow-sm border border-border hover:bg-accent text-muted-foreground hover:text-foreground transition-all"
                aria-label="Show table of contents"
              >
                <PanelRightOpen size={14} />
                <span className="text-xs font-medium">TOC</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Mobile / Tablet / Narrow desktop: Floating button + slide panel */}
      {!hasDesktopSpace && (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed z-40 top-16 left-4 md:left-[272px] flex items-center gap-1.5 px-3 py-2 rounded-lg bg-background/95 backdrop-blur-sm shadow-md border border-border hover:bg-accent text-foreground/80 transition-all duration-200"
            aria-label="Table of Contents"
          >
            <List size={16} />
            <span className="text-sm font-medium">Contents</span>
            <span className="text-xs text-muted-foreground ml-1 tabular-nums">
              {activeIndex + 1}/{tocItems.length}
            </span>
          </button>

          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 z-30"
                  onClick={() => setIsOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0, x: 260 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 260 }}
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  className="fixed top-0 right-0 z-40 h-full w-72 bg-background border-l border-border shadow-2xl overflow-y-auto"
                >
                  <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border px-4 pt-4 pb-3 z-10">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold">Table of Contents</h3>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setIsOpen(false)
                        }}
                        className="p-1 rounded-md hover:bg-accent transition-colors"
                        aria-label="Close"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${readingProgress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                        {Math.round(readingProgress)}%
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-3">{tocList}</div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  )
}
