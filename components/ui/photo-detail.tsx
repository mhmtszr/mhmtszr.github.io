import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { ReactNode, useCallback } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

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
        className="p-0 border-none bg-transparent backdrop-blur-xl w-fit"
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
              className={`absolute ${isMobile ? 'left-[-30%]' : 'left-4'} top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all z-50`}
              aria-label="Previous photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext(e);
              }}
              className={`absolute ${isMobile ? 'right-[-30%]' : 'right-4'} top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all z-50`}
              aria-label="Next photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`${isMobile ? 'w-8 h-8' : 'w-6 h-6'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        {type === "image" ? (
          <div className="flex items-center justify-center" onClick={() => onOpenChange(false)}>
            <motion.img
              src={url}
              alt={title}
              className={`${isMobile ? 'w-[200vw] h-auto max-h-[200vh] scale-[1.8]' : 'max-h-[85vh] w-auto'} object-contain transform-gpu`}
              onClick={(e) => e.stopPropagation()}
              drag={isMobile ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              dragMomentum={false}
            />
          </div>
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