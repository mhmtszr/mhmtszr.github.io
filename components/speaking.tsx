"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PhotoDetail } from "@/components/ui/photo-detail"
import { FileText, Calendar } from "lucide-react"
import Link from "next/link"

const talks = [
  {
    title: "Designing Resilient Platforms with Workflow Orchestration",
    event: "Replay'25 London",
    date: "March 2025",
    description:
      "In this presentation, we talked about solving the challenges of managing states and orchestrating long-running processes. I shared practical insights on building systems that stay consistent and reliable, even during complex workflows.",
    type: "image",
    url: "/speaking/replay25.jpg",
    slides: "https://speakerdeck.com/mehmetsezer/designing-resilient-platforms-with-workflow-orchestration",
  },
  {
    title: "Designing Resilient Platforms with Workflow Orchestration",
    event: "CSCON'25 Ankara",
    date: "March 2025",
    description:
      "In this presentation, we talked about solving the challenges of managing states and orchestrating long-running processes. I shared practical insights on building systems that stay consistent and reliable, even during complex workflows.",
    type: "image",
    url: "/speaking/cscon25.jpg",
    slides: "https://speakerdeck.com/mehmetsezer/designing-resilient-platforms-with-workflow-orchestration",
  },
  {
    title: "Designing Resilient Platforms with Workflow Orchestration",
    event: "DevFest'24 Ankara",
    date: "Dec 2024",
    description:
      "In this presentation, we talked about solving the challenges of managing states and orchestrating long-running processes. I shared practical insights on building systems that stay consistent and reliable, even during complex workflows.",
    type: "image",
    url: "/speaking/workflow.jpg",
    slides: "https://speakerdeck.com/mehmetsezer/designing-resilient-platforms-with-workflow-orchestration",
  },
  {
    title: "Domain Driven Design: Tactical Patterns",
    event: "Trendyol Tech",
    date: "May 2024",
    description: "In this presentation, I talked about CQRS, Event Sourcing, and workflow services.",
    type: "video",
    url: "https://www.youtube.com/embed/nU7VripqFyc?si=GQAejWDZDuxi5VVt&start=3302",
  },
  {
    title: "How is it Go'ing?",
    event: "Ankara Gophers",
    date: "Nov 2023",
    description: "I talked about the new features of Go.",
    type: "image",
    url: "/speaking/ankaragophers.jpg",
  },
  {
    title: "Trendyol Tech Ankara Go Q&A",
    event: "Trendyol Group",
    date: "May 2023",
    description: "I was the moderator of our Go programming language Q&A event in the Trendyol Group Ankara Office.",
    type: "image",
    url: "/speaking/trendyol_go.jpg",
  },
  {
    title: "Microservice Architecture",
    event: "Mamak Füzyon",
    date: "March 2022",
    description:
      "I talked about Microservice Architecture, which is one of the most important topics in the software industry today. I talked about the advantages and disadvantages of microservices, the problems that may arise in microservices, and the solutions to these problems.",
    type: "image",
    url: "/speaking/microservice.jpg",
  },
  {
    title: "How to handle billion of user requests with scaling?",
    event: "DevFest'22 Ankara",
    date: "Dec 2022",
    description:
      "I talked about how to design a system that can efficiently serve users worldwide and work stably under high load, step by step.",
    type: "image",
    url: "/speaking/devfest22ankara.jpg",
  },
  {
    title: "Career in Software Engineering",
    event: "Hacettepe University Computer Science Department",
    date: "Dec 2022",
    description:
      "I made a presentation to the department, I shared my experiences as a student and as a software engineer.",
    type: "image",
    url: "/speaking/careerinsoftwareengineering.jpg",
  },
  {
    title: "Golang Api Graceful Shutdown in Kubernetes",
    event: "Go Türkiye",
    date: "Aug 2022",
    description:
      "In this presentation, I have shown what graceful shutdown is and how we can gracefully shutdown Go applications running in Kubernetes.",
    type: "video",
    url: "https://www.youtube.com/embed/7xq4T-OyUIs",
  },
  {
    title: "Python Programming Language Course",
    event: "Koc University IEEE",
    date: "2019",
    description:
      'I taught "Python Programming Language" course which had about 15 participants for Koc University IEEE in 2019.',
    type: "image",
    url: "/speaking/koc.jpg",
  },
  {
    title: "Python Programming Language Course",
    event: "Hacettepe University ACM",
    date: "2019",
    description:
      'I taught "Python Programming Language" course which had about 200 participants for Hacettepe University ACM in 2019.',
    type: "image",
    url: "/speaking/acmders.jpg",
  },
]

export default function Speaking() {
  const [selectedTalkIndex, setSelectedTalkIndex] = useState<number | null>(null)

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedTalkIndex === null) return
    setSelectedTalkIndex(
      selectedTalkIndex === 0 ? talks.length - 1 : selectedTalkIndex - 1
    )
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedTalkIndex === null) return
    setSelectedTalkIndex(
      selectedTalkIndex === talks.length - 1 ? 0 : selectedTalkIndex + 1
    )
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      if (selectedTalkIndex !== null) {
        setSelectedTalkIndex(
          selectedTalkIndex === 0 ? talks.length - 1 : selectedTalkIndex - 1
        )
      }
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      if (selectedTalkIndex !== null) {
        setSelectedTalkIndex(
          selectedTalkIndex === talks.length - 1 ? 0 : selectedTalkIndex + 1
        )
      }
    }
  }

  return (
    <section className="py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Speaking</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {talks.map((talk, index) => (
            <PhotoDetail
              key={talk.url}
              isOpen={selectedTalkIndex === index}
              onOpenChange={(open) => {
                if (open) {
                  setSelectedTalkIndex(index)
                  window.addEventListener('keydown', handleKeyDown)
                } else {
                  setSelectedTalkIndex(null)
                  window.removeEventListener('keydown', handleKeyDown)
                }
              }}
              type={(talk.type || "image") as "image" | "video"}
              url={talk.url}
              title={talk.title}
              onNext={handleNext}
              onPrevious={handlePrevious}
              trigger={
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3]"
                >
                  {talk.type === "video" ? (
                    <div className="w-full h-full bg-black flex items-center justify-center">
                      <img
                        src={`https://img.youtube.com/vi/${talk.url.split('embed/')[1]?.split('?')[0]}/maxresdefault.jpg`}
                        alt={talk.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <img
                      src={talk.url}
                      alt={talk.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold">{talk.title}</h3>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>{talk.date} • {talk.event}</span>
                      </div>
                      {talk.description && (
                        <p className="text-sm mt-1">{talk.description}</p>
                      )}
                      {talk.slides && (
                        <Link
                          href={talk.slides}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm mt-1 text-white hover:text-gray-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FileText className="h-4 w-4" />
                          <span>View Slides</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              }
            >
              {talk.title}
            </PhotoDetail>
          ))}
        </div>
      </div>
    </section>
  )
}
