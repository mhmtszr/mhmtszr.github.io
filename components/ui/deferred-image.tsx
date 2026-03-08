"use client"

import {useEffect, useRef, useState} from "react"
import Image, {type ImageProps} from "next/image"

/**
 * Renders a placeholder during SSR, then loads the actual image only when
 * the element enters the viewport via IntersectionObserver.
 * This ensures text elements become the LCP element instead of large images.
 */
export function DeferredImage(props: ImageProps & { placeholderClassName?: string }) {
    const [visible, setVisible] = useState(false)
    const {placeholderClassName, ...imageProps} = props
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            {rootMargin: "200px"}
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    if (!visible) {
        return (
            <div
                ref={ref}
                className={placeholderClassName || "w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse"}
                aria-hidden="true"
            />
        )
    }

    return <Image {...imageProps} />
}
