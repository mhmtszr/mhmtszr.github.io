import type {Metadata} from "next"
import Link from "next/link"
import Image from "next/image"
import {Calendar, Play} from "lucide-react"
import {PageContainer} from "../components/page-container"

export const metadata: Metadata = {
    title: "Presentations",
    description: "Interactive presentations and visual deep dives into software engineering topics.",
    alternates: {
        canonical: "/presentations",
    },
}

const presentations = [
    {
        title: "How Elasticsearch Actually Works Under the Hood",
        description: "A visual deep dive from bytes on disk to search results — Lucene's inverted indexes, FST trees, BM25 scoring, segment merging, and how Elasticsearch turns a single-node search library into a fault-tolerant distributed system.",
        date: "2026-03-15",
        image: "/article/elasticsearch-internals/preview.webp",
        href: "/presentations/elasticsearch-internals",
        tags: ["elasticsearch", "lucene", "distributed-systems"],
    },
]

export default function PresentationsPage() {
    return (
        <PageContainer title="Presentations">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {presentations.map((p) => (
                    <Link
                        key={p.href}
                        href={p.href}
                        className="group block rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:shadow-lg"
                    >
                        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                            <Image
                                src={p.image}
                                alt={p.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                    <Play className="w-5 h-5 text-gray-900 dark:text-white ml-0.5"/>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h2 className="font-semibold text-lg leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {p.title}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                                {p.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                                <Calendar className="w-3.5 h-3.5"/>
                                <span>{new Date(p.date).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {p.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </PageContainer>
    )
}
