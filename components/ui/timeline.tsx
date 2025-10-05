"use client"; // Mark as Client Component because it uses framer-motion

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TimelineItemProps {
  isLeft: boolean
  children: React.ReactNode
  className?: string
  year?: string
}

export function TimelineItem({ isLeft, children, className, year }: TimelineItemProps) {
  return (
    <div className={cn(
      "relative flex items-center justify-center md:justify-normal",
      "py-4", // Keep consistent padding
      year ? "pb-10" : "", // Adjusted padding for year marker
      className
    )}>
      {/* Line */}
      <div className={cn(
        "absolute left-[20px] md:left-1/2 w-[2px] -translate-x-1/2 bg-gray-200 dark:bg-gray-700",
        // Extend line to connect with next item
        year ? "h-[calc(100%+16px)] -bottom-4" : "h-full",
        // Position relative to container
        "top-0"
      )} />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative w-[calc(100%-40px)] md:w-[calc(50%-24px)] p-6 rounded-2xl shadow-lg",
          "ml-[40px] md:mx-0",
          "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700",
          isLeft ? "md:mr-auto" : "md:ml-auto",
          // Show connector line on both mobile and desktop
          "before:block before:absolute before:top-1/2 before:-translate-y-1/2 before:w-6 before:h-[2px] before:bg-gray-200 dark:before:bg-gray-700",
          "before:left-[-24px]", // Always keep connector on left in mobile
          isLeft ? "md:before:right-[-24px] md:before:left-auto" : "md:before:left-[-24px]",
          // Add dot
          "after:absolute after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-gray-300 dark:after:bg-gray-600",
          // Keep dot on left in mobile, adjust for desktop
          "after:left-[-32px] md:after:left-auto",
          isLeft ? "md:after:right-[-28px]" : "md:after:left-[-28px]"
        )}
      >
        <div className={cn(
          "relative",
          isLeft ? "md:pr-2" : "md:pl-2"
        )}>
          {children}
        </div>
      </motion.div>

      {/* Year marker (if it's a new year) */}
      {year && (
        <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 bottom-1 z-10">
          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-1 rounded-full text-sm font-medium">
            {year}
          </div>
        </div>
      )}
    </div>
  )
}

interface TimelineProps {
  children: React.ReactNode
  className?: string
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  )
} 