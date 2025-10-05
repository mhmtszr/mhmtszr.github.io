import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import React, { ReactNode, useCallback, useState, useRef, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import Image from "next/image"

interface PhotoDetailProps {
  children: ReactNode
  trigger: ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  type: "image" | "video"
  url: string
  title: string
  description?: string
  onNext?: (e: React.MouseEvent) => void
  onPrevious?: (e: React.MouseEvent) => void
  preloadedImage?: ReactNode
}

export function PhotoDetail({
  children,
  trigger,
  isOpen,
  onOpenChange,
  type,
  url,
  title,
  description,
  onNext,
  onPrevious,
  preloadedImage,
}: PhotoDetailProps) {
  const isMobile = useIsMobile()
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [currentImageUrl, setCurrentImageUrl] = useState(url)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleDragEnd = useCallback((e: any, info: any) => {
    if (!isMobile) return
    
    const SWIPE_THRESHOLD = 50
    const offset = info.offset.x
    const offsetY = info.offset.y

    // Handle vertical pull to close
    if (offsetY > SWIPE_THRESHOLD) {
      onOpenChange(false)
      return
    }

    if (offset > SWIPE_THRESHOLD && onPrevious) {
      onPrevious(e)
    } else if (offset < -SWIPE_THRESHOLD && onNext) {
      onNext(e)
    }
  }, [isMobile, onNext, onPrevious, onOpenChange])

  // Handle URL changes smoothly
  useEffect(() => {
    if (url !== currentImageUrl) {
      setIsTransitioning(true)
      setIsImageLoading(true)
      
      // Start transition
      const transitionTimeout = setTimeout(() => {
        setCurrentImageUrl(url)
      }, 100)

      return () => clearTimeout(transitionTimeout)
    }
  }, [url, currentImageUrl])

  // Preload next image
  useEffect(() => {
    if (currentImageUrl) {
      const img = document.createElement('img')
      img.src = currentImageUrl
    }
  }, [currentImageUrl])

  const handleImageLoad = useCallback(() => {
    setIsTransitioning(false)
    setTimeout(() => {
      setIsImageLoading(false)
    }, 100)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent 
        className="p-0 border-none bg-transparent backdrop-blur-sm max-w-[95vw] max-h-[95vh] w-auto h-auto flex items-center justify-center overflow-hidden"
      >
        <DialogTitle className="sr-only">
          {title}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {description || title}
        </DialogDescription>
        
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all z-20"
            aria-label="Close photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Navigation buttons for photography view */}
        {onPrevious && onNext && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious(e);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10 focus:outline-none"
              aria-label="Previous photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext(e);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10 focus:outline-none"
              aria-label="Next photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        {type === "image" ? (
          <motion.div
            onClick={(e) => e.stopPropagation()}
            drag={isMobile ? true : false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            dragMomentum={false}
            className="relative w-full h-full flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentImageUrl}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center justify-center"
              >
                <div className="relative w-auto h-auto">
                  {(isImageLoading || isTransitioning) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-800 dark:border-gray-800 dark:border-t-gray-200" />
                    </div>
                  )}
                  <Image
                    ref={imageRef}
                    key={currentImageUrl}
                    src={currentImageUrl}
                    alt={title}
                    width={1920}
                    height={1080}
                    className={`w-auto h-auto max-w-[95vw] max-h-[95vh] object-contain transition-opacity duration-300 ${(isImageLoading || isTransitioning) ? 'opacity-0' : 'opacity-100'}`}
                    priority
                    onLoad={handleImageLoad}
                    loading="eager"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              src={url}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 