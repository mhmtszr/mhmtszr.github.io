'use client'

import { useEffect } from 'react'

export function ScrollToHash() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1) // Remove the '#'
      const element = document.getElementById(id)
      if (element) {
        // Use a small timeout to ensure the element is fully rendered and layout is stable
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100) // Adjust delay if needed
        
        return () => clearTimeout(timer) // Cleanup timer on unmount
      }
    }
  }, []) // Run only once on mount

  return null // This component doesn't render anything visual
} 