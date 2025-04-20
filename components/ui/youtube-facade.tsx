import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface YouTubeFacadeProps {
  videoUrl: string;
  title: string;
}

export function YouTubeFacade({ videoUrl, title }: YouTubeFacadeProps) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Extract video ID from URL
  const videoId = videoUrl.match(/(?:embed\/|v=|\/)([\w-]{11})(?:\?|&|\/)?/)?.[1];
  
  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  // Construct URLs
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const youtubeWebUrl = `https://www.youtube.com/watch?v=${videoId}`;

  if (isMobile) {
    return (
      <a
        href={youtubeWebUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full aspect-video rounded-lg overflow-hidden bg-gray-900"
      >
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-red-600 rounded-full p-4">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>
      </a>
    );
  }

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden">
      <iframe
        src={videoUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        loading="lazy"
      />
    </div>
  );
} 