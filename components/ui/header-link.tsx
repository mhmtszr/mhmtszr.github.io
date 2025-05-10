"use client"

import { useEffect, useState } from "react"
import { Copy, Check, Link } from "lucide-react"
import { toast } from "sonner"

export function HeaderLinks() {
  const [hasCopied, setHasCopied] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Get all headers in the prose section
    const headers = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6')
    
    headers.forEach(header => {
      // Skip if already processed
      if (header.classList.contains('header-link-processed')) return
      
      // Make sure the header has an id
      if (!header.id) {
        const headerId = header.textContent?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || ""
        header.id = headerId
      }
      
      // Mark as processed
      header.classList.add('header-link-processed')
      
      // Create link button container
      const linkContainer = document.createElement('span')
      linkContainer.className = 'header-link-container ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center'
      
      // Create the copy button
      const copyButton = document.createElement('button')
      copyButton.className = 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
      copyButton.title = 'Copy link to section'
      
      // Copy icon
      const copyIcon = document.createElement('span')
      copyIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`
      copyButton.appendChild(copyIcon)
      
      // Add click handler to copy the URL
      copyButton.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        const url = new URL(window.location.href)
        url.hash = header.id
        
        // Copy to clipboard
        navigator.clipboard.writeText(url.toString()).then(() => {
          // Show success message
          toast.success('Link copied to clipboard')
          
          // Update the URL hash without causing a page jump
          window.history.pushState({}, '', url.toString())
          
          // Briefly show the check icon
          copyIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
          
          // Return to link icon after a short delay
          setTimeout(() => {
            copyIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`
          }, 2000)
        })
      })
      
      linkContainer.appendChild(copyButton)
      
      // Add wrapper to make original header text and link button a hover group
      const wrapper = document.createElement('span')
      wrapper.className = 'group relative hover:cursor-pointer'
      
      // Clone the header content, then clear and rebuild it
      const headerContent = header.innerHTML
      header.innerHTML = ''
      
      wrapper.innerHTML = headerContent
      
      // Add click handler for the header itself
      wrapper.addEventListener('click', (e) => {
        const url = new URL(window.location.href)
        url.hash = header.id
        window.history.pushState({}, '', url.toString())
      })
      
      header.appendChild(wrapper)
      header.appendChild(linkContainer)
    })
  }, [])
  
  // This component doesn't render anything itself, it just attaches behavior
  return null
} 