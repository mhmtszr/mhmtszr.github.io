"use client"

import {useState} from "react"
import {PhotoDetail} from "@/components/ui/photo-detail"
import {Calendar, FileText} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {DeferredImage} from "@/components/ui/deferred-image"
import {Timeline, TimelineItem} from "../../components/ui/timeline"
import {YouTubeFacade} from "@/components/ui/youtube-facade"
import {PageContainer} from "../components/page-container"

const talks = [
    {
        title: 'Designing Resilient Platforms with Workflow Orchestration',
        event: 'Replay\'25 London',
        date: 'March 2025',
        description: 'In this presentation, we talked about solving the challenges of managing states and orchestrating long-running processes. I shared practical insights on building systems that stay consistent and reliable, even during complex workflows.',
        type: 'image',
        url: '/speaking/replay25.webp',
        slides: 'https://speakerdeck.com/mehmetsezer/designing-resilient-platforms-with-workflow-orchestration'
    },
    {
        title: 'Designing Resilient Platforms with Workflow Orchestration',
        event: 'CSCON\'25 Ankara',
        date: 'March 2025',
        description: 'In this presentation, we talked about solving the challenges of managing states and orchestrating long-running processes. I shared practical insights on building systems that stay consistent and reliable, even during complex workflows.',
        type: 'image',
        url: '/speaking/cscon25.webp',
        slides: 'https://speakerdeck.com/mehmetsezer/designing-resilient-platforms-with-workflow-orchestration'
    },
    {
        title: 'Designing Resilient Platforms with Workflow Orchestration',
        event: 'DevFest\'24 Ankara',
        date: 'Dec 2024',
        description: 'In this presentation, we talked about solving the challenges of managing states and orchestrating long-running processes. I shared practical insights on building systems that stay consistent and reliable, even during complex workflows.',
        type: 'image',
        url: '/speaking/workflow.webp',
        slides: 'https://speakerdeck.com/mehmetsezer/designing-resilient-platforms-with-workflow-orchestration'
    },
    {
        title: 'Domain Driven Design: Tactical Patterns',
        event: 'Trendyol Tech',
        date: 'May 2024',
        description: 'In this presentation, I talked about CQRS, Event Sourcing, and workflow services.',
        type: 'video',
        url: 'https://www.youtube.com/embed/nU7VripqFyc?si=GQAejWDZDuxi5VVt&amp;start=3302'
    },
    {
        title: 'How is it Go\'ing?',
        event: 'Ankara Gophers',
        date: 'Nov 2023',
        description: 'I talked about the new features of Go.',
        type: 'image',
        url: '/speaking/ankaragophers.webp'
    },
    {
        title: 'Trendyol Tech Ankara Go Q&A',
        event: 'Trendyol Group',
        date: 'May 2023',
        description: 'I was the moderator of our Go programming language Q&A event in the Trendyol Group Ankara Office.',
        type: 'image',
        url: '/speaking/trendyol_go.webp'
    },
    {
        title: 'Microservice Architecture',
        event: 'Mamak Füzyon',
        date: 'March 2022',
        description: 'I talked about Microservice Architecture, which is one of the most important topics in the software industry today. I talked about the advantages and disadvantages of microservices, the problems that may arise in microservices, and the solutions to these problems.',
        type: 'image',
        url: '/speaking/microservice.webp'
    },
    {
        title: 'How to handle billion of user requests with scaling?',
        event: 'DevFest\'22 Ankara',
        date: 'Dec 2022',
        description: 'I talked about how to design a system that can efficiently serve users worldwide and work stably under high load, step by step.',
        type: 'image',
        url: '/speaking/devfest22ankara.webp'
    },
    {
        title: 'Career in Software Engineering',
        event: 'Hacettepe University Computer Science Department',
        date: 'Dec 2022',
        description: 'I made a presentation to the department, I shared my experiences as a student and as a software engineer.',
        type: 'image',
        url: '/speaking/careerinsoftwareengineering.webp'
    },
    {
        title: 'Golang Api Graceful Shutdown in Kubernetes',
        event: 'Go Türkiye',
        date: 'Aug 2022',
        description: 'In this presentation, I have shown what graceful shutdown is and how we can gracefully shutdown Go applications running in Kubernetes.',
        type: 'video',
        url: 'https://www.youtube.com/embed/7xq4T-OyUIs'
    },
    {
        title: 'Python Programming Language Course',
        event: 'Koc University IEEE',
        date: '2019',
        description: 'I taught "Python Programming Language" course which had about 15 participants for Koc University IEEE in 2019.',
        type: 'image',
        url: '/speaking/koc.webp'
    },
    {
        title: 'Python Programming Language Course',
        event: 'Hacettepe University ACM',
        date: '2019',
        description: 'I taught "Python Programming Language" course which had about 200 participants for Hacettepe University ACM in 2019.',
        type: 'image',
        url: '/speaking/acmders.webp'
    }
];

function SpeakingContent() {
    const [filter, setFilter] = useState("All")
    const [openDialog, setOpenDialog] = useState<number | null>(null)

    // Define filter options
    const filterOptions = ["All", "2025", "2024", "2023", "2022", "2019"]

    // Filter talks based on selected year
    const filteredTalks = filter === "All" ? talks : talks.filter((talk) => talk.date.includes(filter))

    // Function to get year from date string
    const getYear = (date: string) => date.split(" ").pop() || ""

    // Function to check if we should show the year marker
    const shouldShowYear = (currentYear: string, prevYear?: string) => {
        return currentYear !== prevYear
    }

    return (
        <PageContainer title="Public Speaking">
            {/* Filter buttons */}
            <div className="mb-8 overflow-x-auto pb-2">
                <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter by year">
                    {filterOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => setFilter(option)}
                            aria-pressed={filter === option}
                            className={`px-3 py-1.5 rounded-full text-sm font-sans whitespace-nowrap transition-colors duration-200 ${
                                filter === option
                                    ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <Timeline>
                {filteredTalks.map((talk, index) => {
                    const currentYear = getYear(talk.date)
                    const prevYear = index < filteredTalks.length - 1 ? getYear(filteredTalks[index + 1].date) : undefined
                    const showYear = shouldShowYear(currentYear, prevYear)

                    return (
                        <TimelineItem
                            key={index}
                            isLeft={index % 2 === 0}
                            year={showYear ? currentYear : undefined}
                        >
                            {talk.type === "video" ? (
                                <div className="space-y-4">
                                    <div className="w-full">
                                        <YouTubeFacade url={talk.url} title={talk.title}/>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold">{talk.event}</h2>
                                        <p className="text-gray-600 dark:text-gray-300 mt-1">{talk.title}</p>
                                        <div
                                            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-2 font-sans text-sm">
                                            <Calendar className="w-4 h-4"/>
                                            <span>{talk.date}</span>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed line-clamp-3">{talk.description}</p>
                                        {talk.slides && (
                                            <Link
                                                href={talk.slides}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mt-2 font-sans text-sm"
                                            >
                                                <FileText className="w-4 h-4"/>
                                                View Slides
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <PhotoDetail
                                    isOpen={openDialog === index}
                                    onOpenChange={(open) => setOpenDialog(open ? index : null)}
                                    type="image"
                                    url={talk.url || ""}
                                    title={talk.title}
                                    description={talk.description}
                                    trigger={
                                        <button type="button" className="space-y-4 cursor-pointer text-left w-full">
                                            <div className="w-full">
                                                <div
                                                    className="relative aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                                                    {index === 0 ? (
                                                        <Image
                                                            src={talk.url || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(talk.title)}`}
                                                            alt={talk.title}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            priority
                                                            fetchPriority="high"
                                                        />
                                                    ) : (
                                                        <DeferredImage
                                                            placeholderClassName="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl"
                                                            src={talk.url || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(talk.title)}`}
                                                            alt={talk.title}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-semibold">{talk.event}</h2>
                                                <p className="text-gray-600 dark:text-gray-300 mt-1">{talk.title}</p>
                                                <div
                                                    className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-2">
                                                    <Calendar className="w-4 h-4"/>
                                                    <span>{talk.date}</span>
                                                </div>
                                                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed line-clamp-3">{talk.description}</p>
                                                {talk.slides && (
                                                    <Link
                                                        href={talk.slides}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mt-2 font-sans text-sm"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <FileText className="w-4 h-4"/>
                                                        View Slides
                                                    </Link>
                                                )}
                                            </div>
                                        </button>
                                    }
                                >
                                    <></>
                                </PhotoDetail>
                            )}
                        </TimelineItem>
                    )
                })}
            </Timeline>
        </PageContainer>
    )
}

export default function SpeakingPage() {
    return <SpeakingContent/>
}
