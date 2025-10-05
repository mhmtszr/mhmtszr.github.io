import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ArticleCardProps {
  title: string
  description: string
  date: string
  imageUrl: string
  url: string
  tags: string[]
  source: "medium" | "website"
  isListView?: boolean
}

export function ArticleCard({
  title,
  description,
  date,
  imageUrl,
  url,
  tags,
  source,
  isListView = false
}: ArticleCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  // Limit tags to 3 for smaller cards
  const displayTags = tags.length > 3 && !isListView ? tags.slice(0, 3) : tags

  if (isListView) {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
        <Link href={url} target={source === "medium" ? "_blank" : undefined} className="flex h-full">
          <div className="relative w-60 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="flex flex-col flex-grow p-4">
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <time className="text-xs text-muted-foreground">{formattedDate}</time>
                  {source === "medium" && (
                    <Badge variant="outline" className="ml-auto text-xs py-0 h-5">
                      Medium <ExternalLink className="w-2 h-2 ml-1" />
                    </Badge>
                  )}
                </div>
                <h2 className="text-lg font-semibold mb-1 line-clamp-2">
                  {title}
                </h2>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {displayTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs py-0 h-5">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
      <Link href={url} target={source === "medium" ? "_blank" : undefined} className="flex flex-col h-full">
        <div className="relative h-52 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <div className="flex flex-col flex-grow p-3">
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                <time className="text-xs text-muted-foreground">{formattedDate}</time>
                {source === "medium" && (
                  <Badge variant="outline" className="ml-auto text-xs py-0 h-5">
                    Medium <ExternalLink className="w-2 h-2 ml-1" />
                  </Badge>
                )}
              </div>
              <h2 className="text-lg font-semibold mb-1 line-clamp-2">
                {title}
              </h2>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {description}
              </p>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {displayTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs py-0 h-5">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && !isListView && (
                <span className="text-xs text-muted-foreground">+{tags.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
} 