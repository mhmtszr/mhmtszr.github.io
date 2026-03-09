import {cn} from "@/lib/utils"

interface TimelineItemProps {
    isLeft: boolean
    children: React.ReactNode
    className?: string
    year?: string
}

export function TimelineItem({isLeft, children, className, year}: TimelineItemProps) {
    return (
        <div className={cn(
            "relative flex items-center justify-center md:justify-normal",
            "py-4",
            year ? "pb-10" : "",
            className
        )}>
            {/* Line */}
            <div className={cn(
                "absolute left-[20px] md:left-1/2 w-[2px] -translate-x-1/2 bg-gray-200 dark:bg-gray-700",
                year ? "h-[calc(100%+16px)] -bottom-4" : "h-full",
                "top-0"
            )}/>

            {/* Content */}
            <div
                className={cn(
                    "relative w-[calc(100%-40px)] md:w-[calc(50%-24px)] p-6 rounded-2xl shadow-md",
                    "ml-[40px] md:mx-0",
                    "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700",
                    isLeft ? "md:mr-auto" : "md:ml-auto",
                    "before:block before:absolute before:top-1/2 before:-translate-y-1/2 before:w-6 before:h-[2px] before:bg-gray-200 dark:before:bg-gray-700",
                    "before:left-[-24px]",
                    isLeft ? "md:before:right-[-24px] md:before:left-auto" : "md:before:left-[-24px]",
                    "after:absolute after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:rounded-full after:bg-gray-300 dark:after:bg-gray-600 after:z-[1]",
                    "after:left-[-26px] md:after:left-auto",
                    isLeft ? "md:after:right-[-30px]" : "md:after:left-[-30px]",
                    isLeft ? "animate-slide-in-left md:animate-slide-in-left" : "animate-slide-in-left md:animate-slide-in-right",
                )}
            >
                <div className={cn(
                    "relative",
                    isLeft ? "md:pr-2" : "md:pl-2"
                )}>
                    {children}
                </div>
            </div>

            {/* Year marker (if it's a new year) */}
            {year && (
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 bottom-1 z-10">
                    <div
                        className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-1 rounded-full text-sm font-medium font-sans">
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

export function Timeline({children, className}: TimelineProps) {
    return (
        <div className={cn("relative", className)}>
            {children}
        </div>
    )
}
