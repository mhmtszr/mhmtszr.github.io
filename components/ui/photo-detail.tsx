import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import React, { ReactNode, useCallback } from "react"
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

  const handleDragEnd = useCallback((e: any, info: any) => {
    if (!isMobile) return
    
    const SWIPE_THRESHOLD = 50
    const offset = info.offset.x

    if (offset > SWIPE_THRESHOLD && onPrevious) {
      onPrevious(e)
    } else if (offset < -SWIPE_THRESHOLD && onNext) {
      onNext(e)
    }
  }, [isMobile, onNext, onPrevious])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent 
        className="p-0 border-none bg-transparent backdrop-blur-sm max-w-[95vw] max-h-[95vh] w-auto h-auto flex items-center justify-center"
      >
        <DialogTitle className="sr-only">
          {title}
        </DialogTitle>
        
        {/* Navigation buttons for photography view */}
        {onPrevious && onNext && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious(e);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-50"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-50"
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
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            dragMomentum={false}
            className="relative flex items-center justify-center w-full h-full"
          >
            <Image
              src={url}
              alt={title}
              width={1920}
              height={1080}
              className="w-auto h-auto max-w-[95vw] max-h-[95vh] object-contain mx-auto"
              priority
            />
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