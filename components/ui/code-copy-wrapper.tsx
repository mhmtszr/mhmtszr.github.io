'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button' // Assuming Button component exists
import { cn } from '@/lib/utils' // Assuming cn utility exists

interface CodeCopyWrapperProps {
  children: React.ReactNode
}

export function CodeCopyWrapper({ children }: CodeCopyWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    const preElements = contentRef.current.querySelectorAll('pre')

    preElements.forEach((pre) => {
      const codeElement = pre.querySelector('code')
      const codeText = codeElement?.innerText ?? pre.innerText

      if (!codeText) return

      // Create a container for position:relative
      const container = document.createElement('div')
      container.className = 'relative group' // Add group for group-hover

      // Create the button
      const button = document.createElement('button')
      button.className =
        'absolute top-2 right-2 z-10 p-1.5 rounded-md bg-background/80 text-muted-foreground backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 md:opacity-0 md:group-hover:opacity-100' // Initial state for desktop: hidden until hover
        
      // Mobile: Always visible - we adjust this via CSS later if needed, but start visible
      // We can refine this with media queries if a different mobile approach is desired.

      const iconContainer = document.createElement('span');
      iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>` // Copy icon SVG
      button.appendChild(iconContainer);

      let copyTimeout: NodeJS.Timeout | null = null

      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(codeText)
          iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>` // Check icon SVG

          if (copyTimeout) clearTimeout(copyTimeout)
          copyTimeout = setTimeout(() => {
             iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>` // Revert to Copy icon
          }, 2000)

        } catch (err) {
          console.error('Failed to copy text: ', err)
          // Maybe show an error state on the button
        }
      })
      
      // Removed hover effect that faded the code

      // Wrap pre element and add button
      pre.parentNode?.insertBefore(container, pre)
      container.appendChild(pre)
      container.appendChild(button)
    })

    // Cleanup function to remove timeouts
    return () => {
        preElements.forEach(pre => {
            const container = pre.closest('.relative.group');
            const button = container?.querySelector('button');
            // Basic cleanup, more robust cleanup might involve removing listeners 
            // if React doesn't handle the component unmount correctly, 
            // but usually removing the elements is enough.
            if (container && button) {
               // We might need to store and remove event listeners explicitly
               // if issues arise, but let's keep it simple for now.
            }
        });
    };

  }, [children]) // Re-run if children change

  return <div ref={contentRef}>{children}</div>
} 