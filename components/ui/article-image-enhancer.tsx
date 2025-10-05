"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

export function ArticleImageEnhancer() {
  const [imageMappings, setImageMappings] = useState<{[key: string]: { src: string, alt: string, element: HTMLElement }}>({})
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Function to enhance images with alt text
  const enhanceImagesWithAltText = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // If the image doesn't have alt text, try to use caption or parent element text
      if (!img.alt || img.alt === '') {
        // Try to find a caption
        const figcaption = img.closest('figure')?.querySelector('figcaption');
        if (figcaption && figcaption.textContent) {
          img.alt = figcaption.textContent.trim();
        } else {
          // Try to use parent heading or paragraph text
          const parent = img.parentElement;
          const prevHeading = parent?.previousElementSibling;
          if (prevHeading && 
              (prevHeading.tagName === 'H1' || 
               prevHeading.tagName === 'H2' || 
               prevHeading.tagName === 'H3') && 
              prevHeading.textContent) {
            img.alt = prevHeading.textContent.trim();
          } else {
            img.alt = 'Image in article content';
          }
        }
      }
      
      // Add loading attribute for better performance
      if (!img.getAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  };

  useEffect(() => {
    // Only run in the browser
    if (typeof window === "undefined") return
    
    // Add global styles to remove focus outlines for images
    const style = document.createElement('style')
    style.innerHTML = `
      .prose img {
        outline: none !important;
      }
      .prose img:focus, 
      .prose img:focus-visible,
      img[data-image-key], 
      img[data-image-key]:focus,
      img[data-image-key]:focus-visible,
      [data-image-key="hero-image"] img,
      [data-image-key="hero-image"] img:focus,
      [data-image-key="hero-image"] img:focus-visible {
        outline: none !important;
        box-shadow: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
    `
    document.head.appendChild(style)
    
    // Find the main hero image
    const heroImage = document.querySelector('[data-image-key="hero-image"] img')
    
    // Find all images in the article content
    const articleContent = document.querySelector(".prose")
    if (!articleContent && !heroImage) return
    
    // Process each image and store its details
    const mappings: {[key: string]: { src: string, alt: string, element: HTMLElement }} = {}
    
    // Process hero image if it exists
    if (heroImage) {
      const src = heroImage.getAttribute("src") || ""
      const alt = heroImage.getAttribute("alt") || "Hero image"
      
      if (src) {
        mappings["hero-image"] = { 
          src, 
          alt, 
          element: heroImage as HTMLElement 
        }
        
        // Make the image clickable
        const heroWrapper = document.querySelector('[data-image-key="hero-image"]') as HTMLElement
        if (heroWrapper) {
          // Remove outline and highlight
          heroWrapper.classList.add('no-highlight')
          
          heroWrapper.addEventListener("click", (e) => {
            e.preventDefault()
            e.stopPropagation()
            setSelectedKey("hero-image")
            setIsLoading(true)
          })
        }
      }
    }
    
    // Process content images
    if (articleContent) {
      const contentImages = articleContent.querySelectorAll("img")
      
      contentImages.forEach((img, index) => {
        const src = img.getAttribute("src") || ""
        const alt = img.getAttribute("alt") || `Image ${index + 1}`
        
        if (!src) return
        
        const key = `image-${index}`
        mappings[key] = { src, alt, element: img as HTMLElement }
        
        // Make the image clickable
        img.classList.add("cursor-pointer", "no-highlight")
        img.setAttribute("data-image-key", key)
        
        // Add click event listener
        img.addEventListener("click", (e) => {
          e.preventDefault()
          e.stopPropagation()
          setSelectedKey(key)
          setIsLoading(true)
        })
      })
    }
    
    // Run the alt text enhancer
    enhanceImagesWithAltText();
    
    setImageMappings(mappings)
    
    // Clean up event listeners on unmount
    return () => {
      const heroWrapper = document.querySelector('[data-image-key="hero-image"]') as HTMLElement
      if (heroWrapper) {
        heroWrapper.removeEventListener("click", () => {})
      }
      
      Object.values(mappings).forEach(({ element }) => {
        element.removeEventListener("click", () => {})
      })
      
      // Remove the style element when component is unmounted
      document.head.removeChild(style)
    }
  }, [])

  if (typeof window === "undefined") return null

  return (
    <Dialog open={selectedKey !== null} onOpenChange={(open) => !open && setSelectedKey(null)}>
      {selectedKey && imageMappings[selectedKey] && (
        <DialogContent 
          className="p-0 border-none bg-transparent backdrop-blur-sm max-w-[95vw] max-h-[95vh] w-auto h-auto flex items-center justify-center overflow-hidden focus:outline-none focus:ring-0"
          onPointerDownOutside={() => setSelectedKey(null)}
        >
          <DialogTitle className="sr-only">
            {imageMappings[selectedKey].alt}
          </DialogTitle>
          
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-auto h-auto">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-800 dark:border-gray-800 dark:border-t-gray-200" />
                </div>
              )}
              <Image
                src={imageMappings[selectedKey].src}
                alt={imageMappings[selectedKey].alt}
                width={1920}
                height={1080}
                className={`w-auto h-auto max-w-[95vw] max-h-[95vh] object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} focus:outline-none focus:ring-0 no-highlight`}
                priority
                onLoad={() => setIsLoading(false)}
                loading="eager"
              />
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
} 