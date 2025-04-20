import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { ReactNode } from "react"

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
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent 
        className="p-0 border-none bg-transparent backdrop-blur-xl"
        onPointerDownOutside={(e) => {
          const element = e.target as HTMLElement;
          element.closest('button')?.click();
        }}
      >
        <DialogTitle className="sr-only">
          {title}
        </DialogTitle>
        <div 
          className="h-full flex flex-col items-center justify-center relative"
          onClick={() => onOpenChange(false)}
        >
          {/* Navigation buttons for photography view */}
          {onPrevious && onNext && (
            <>
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all z-50"
                aria-label="Previous photo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all z-50"
                aria-label="Next photo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}

          <div 
            className="relative w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {type === "image" ? (
              <div className="flex items-center justify-center">
                <img
                  src={url}
                  alt={title}
                  className="max-h-[85vh] w-auto object-contain rounded-lg"
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 