import {Badge} from "@/components/ui/badge"
import {Calendar, ExternalLink} from "lucide-react"
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
    index?: number
}

export function ArticleCard({
                                title,
                                description,
                                date,
                                imageUrl,
                                url,
                                tags,
                                source,
                                isListView = false,
                                index = 0
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
            <div
                className="overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 h-full">
                <Link href={url} target={source === "medium" ? "_blank" : undefined} className="group flex h-full">
                    <div className="relative w-60 shrink-0">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                    <div className="flex flex-col grow p-4">
                        <div className="flex flex-col h-full">
                            <div className="grow">
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="w-3 h-3 text-gray-500 dark:text-gray-400"/>
                                    <time
                                        className="text-xs text-gray-500 dark:text-gray-400 font-sans">{formattedDate}</time>
                                    {source === "medium" && (
                                        <Badge variant="outline" className="ml-auto text-xs py-0 h-5">
                                            Medium <ExternalLink className="w-2 h-2 ml-1"/>
                                        </Badge>
                                    )}
                                </div>
                                <h2 className="text-lg font-semibold mb-1 line-clamp-2">
                                    {title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                                    {description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {displayTags.map((tag) => (
                                    <Badge key={tag} variant="outline"
                                           className="text-xs py-0 h-5 bg-gray-100 dark:bg-gray-700">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <div
            className="overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 h-full">
            <Link href={url} target={source === "medium" ? "_blank" : undefined} className="group flex flex-col h-full">
                <div className="relative h-52 shrink-0">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={index < 4}
                        loading={index < 4 ? "eager" : "lazy"}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                </div>
                <div className="flex flex-col grow p-3">
                    <div className="flex flex-col h-full">
                        <div className="grow">
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar className="w-3 h-3 text-gray-500 dark:text-gray-400"/>
                                <time
                                    className="text-xs text-gray-500 dark:text-gray-400 font-sans">{formattedDate}</time>
                                {source === "medium" && (
                                    <Badge variant="outline" className="ml-auto text-xs py-0 h-5">
                                        Medium <ExternalLink className="w-2 h-2 ml-1"/>
                                    </Badge>
                                )}
                            </div>
                            <h2 className="text-lg font-semibold mb-1 line-clamp-2">
                                {title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                                {description}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                            {displayTags.map((tag) => (
                                <Badge key={tag} variant="outline"
                                       className="text-xs py-0 h-5 bg-gray-100 dark:bg-gray-700">
                                    {tag}
                                </Badge>
                            ))}
                            {tags.length > 3 && !isListView && (
                                <span
                                    className="text-xs text-gray-500 dark:text-gray-400 font-sans">+{tags.length - 3}</span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
} 