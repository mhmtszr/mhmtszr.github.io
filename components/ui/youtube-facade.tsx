import { useState, useEffect } from "react"
import { Play } from "lucide-react"
import Image from "next/image"

interface YouTubeFacadeProps {
  url: string
  title: string
}

export function YouTubeFacade({ url, title }: YouTubeFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Decode HTML entities and clean up the URL
  const decodedUrl = url.replace(/&amp;/g, '&')

  // Extract video ID and start time from URL
  const videoId = decodedUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1]
  const startTime = decodedUrl.match(/[?&]start=(\d+)/)?.[1]
  
  if (!videoId) return null

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0${startTime ? `&start=${startTime}` : ''}`
  const mobileUrl = `vnd.youtube://${videoId}${startTime ? `?t=${startTime}` : ''}`
  const webUrl = `https://www.youtube.com/watch?v=${videoId}${startTime ? `&t=${startTime}` : ''}`

  const handleMobileClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Open web URL in new tab first
    const webTab = window.open(webUrl, '_blank')
    
    // Try to open YouTube app
    const tryYouTubeApp = () => {
      // Create a hidden anchor for app deep linking
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = mobileUrl
      document.body.appendChild(link)
      link.click()
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link)
      }, 1000)
    }
    
    // Try opening the app after ensuring web fallback is ready
    setTimeout(tryYouTubeApp, 100)
  }

  if (isMobile) {
    return (
      <a 
        href={webUrl}
        onClick={handleMobileClick}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-video w-full block group"
        aria-label={`Play ${title} on YouTube`}
      >
        <div className="relative w-full h-full">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            quality={85}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <Play className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </a>
    )
  }

  if (!isLoaded) {
    return (
      <button 
        onClick={() => setIsLoaded(true)}
        className="relative aspect-video w-full cursor-pointer group"
        aria-label={`Play ${title}`}
      >
        <div className="relative w-full h-full">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            quality={85}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <Play className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </button>
    )
  }

  return (
    <div className="relative aspect-video w-full">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        loading="lazy"
      />
    </div>
  )
} 