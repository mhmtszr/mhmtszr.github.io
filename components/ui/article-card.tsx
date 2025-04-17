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

  const cardContent = (
    <>
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <time className="text-sm text-muted-foreground">{formattedDate}</time>
        {source === "medium" && (
          <Badge variant="outline" className="ml-auto">
            Medium <ExternalLink className="w-3 h-3 ml-1" />
          </Badge>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-2 line-clamp-2">
        {title}
      </h2>
      <p className="text-muted-foreground line-clamp-3 mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </>
  )

  if (isListView) {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
        <Link href={url} target={source === "medium" ? "_blank" : undefined} className="flex h-full">
          <div className="relative w-48 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="flex flex-col flex-grow p-6">
            {cardContent}
          </div>
        </Link>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
      <Link href={url} target={source === "medium" ? "_blank" : undefined} className="flex flex-col h-full">
        <div className="relative h-48 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="flex flex-col flex-grow p-6">
          {cardContent}
        </div>
      </Link>
    </Card>
  )
} 