"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { List, X } from "lucide-react"

interface TOCItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [isOpen, setIsOpen] = useState(false)
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const observer = useRef<IntersectionObserver | null>(null)
  const [buttonPosition, setButtonPosition] = useState({ left: '20px' })

  // Extract headings from the article and calculate button position
  useEffect(() => {
    const articleContent = document.querySelector(".prose")
    if (!articleContent) return

    // Calculate button position based on article content position
    const updateButtonPosition = () => {
      const container = document.querySelector('.container')
      if (container) {
        const rect = container.getBoundingClientRect()
        setButtonPosition({ left: `${Math.max(20, rect.left + 20)}px` })
      }
    }

    // Initial position
    updateButtonPosition()

    // Update on resize
    window.addEventListener('resize', updateButtonPosition)

    // Find all headings (h2, h3, h4) in the article
    const headings = articleContent.querySelectorAll("h2, h3, h4")
    
    const items: TOCItem[] = []
    
    headings.forEach((heading) => {
      // Get the ID (or create one if it doesn't exist)
      let id = heading.getAttribute("id") || ""
      
      if (!id) {
        id = heading.textContent?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || `heading-${items.length}`
        heading.setAttribute("id", id)
      }
      
      // Determine heading level
      const level = parseInt(heading.tagName.substring(1)) - 1 // Normalize: h2 -> 1, h3 -> 2, h4 -> 3
      
      items.push({
        id,
        text: heading.textContent || "",
        level
      })
    })
    
    setTocItems(items)
    
    // Set up intersection observer to track active heading
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActiveId(entry.target.id)
        }
      })
    }
    
    observer.current = new IntersectionObserver(observerCallback, {
      rootMargin: "0px 0px -80% 0px",
      threshold: 0.5
    })
    
    headings.forEach(heading => {
      observer.current?.observe(heading)
    })
    
    return () => {
      observer.current?.disconnect()
      window.removeEventListener('resize', updateButtonPosition)
    }
  }, [])

  // Handle scroll to section when TOC item is clicked
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveId(id)
      
      // On mobile, close the TOC after clicking
      if (window.innerWidth < 768) {
        setIsOpen(false)
      }
    }
  }

  if (tocItems.length === 0) return null

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-30 flex items-center justify-center p-3 rounded-full shadow-md bg-primary text-white bottom-20 hover:bg-primary/90 transition-all duration-300"
        style={{ left: buttonPosition.left }}
        aria-label="Table of Contents"
      >
        {isOpen ? <X size={20} /> : <List size={20} />}
      </button>
      
      {/* TOC Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 right-0 bg-black/50 md:bg-black/20 z-20 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* TOC Panel */}
            <motion.div
              initial={{ 
                opacity: 0,
                x: -50 
              }}
              animate={{ 
                opacity: 1,
                x: 0 
              }}
              exit={{ 
                opacity: 0,
                x: -50 
              }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 z-40 h-full w-64 md:w-72 bg-white dark:bg-gray-900 shadow-xl overflow-y-auto p-4"
            >
              <div className="sticky top-0 bg-white dark:bg-gray-900 pt-4 pb-2 border-b mb-3 flex justify-between items-center">
                <h3 className="text-lg font-bold">Table of Contents</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close Table of Contents"
                >
                  <X size={20} />
                </button>
              </div>
              
              <nav className="toc">
                <ul className="space-y-2">
                  {tocItems.map((item) => (
                    <li 
                      key={item.id}
                      className={`transition-all duration-200 ${
                        item.level > 1 ? "ml-4" : ""
                      } ${
                        item.level > 2 ? "ml-8" : ""
                      }`}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(item.id)
                        }}
                        className={`block py-1 px-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
                          activeId === item.id
                            ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 