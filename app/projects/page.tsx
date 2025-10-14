"use client"

import { useState, Suspense } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from 'next/navigation'
import { PageContainer } from "../components/page-container"

const projects = [
  {
    title: "Concurrent Swiss Map",
    description:
      "An open-source Go library that provides a high-performance, thread-safe generic concurrent hash map implementation designed to handle concurrent access efficiently.",
    github: "https://github.com/mhmtszr/concurrent-swiss-map",
    technologies: ["Go"],
  },
  {
    title: "Go DCP Elasticsearch",
    description:
      "Go implementation of the Couchbase Elasticsearch Connector that replicates documents from Couchbase via Database Change Protocol (DCP) and writes each document to an Elasticsearch index in near real-time.",
    github: "https://github.com/Trendyol/go-dcp-elasticsearch",
    technologies: ["Go", "Couchbase", "Elasticsearch"],
  },
  {
    title: "Pipeline",
    description: "A Go pipeline solution that can be used in many different combinations for chaining pipeline steps.",
    github: "https://github.com/mhmtszr/pipeline",
    technologies: ["Go"],
  },
  {
    title: "Go DCP Kafka",
    description:
      "Go implementation of the Couchbase Kafka Connector that streams documents from Couchbase via Database Change Protocol (DCP) and publishes each document to a Kafka topic in near real-time.",
    github: "https://github.com/Trendyol/go-dcp-kafka",
    technologies: ["Go", "Couchbase", "Kafka"],
  },
  {
    title: "Go DCP SQL",
    description:
      "Streams documents from Couchbase via Database Change Protocol (DCP) and writes each document to a SQL table in near real-time.",
    github: "https://github.com/Trendyol/go-dcp-sql",
    technologies: ["Go", "Couchbase", "SQL"],
  },
  {
    title: "Go Practices",
    description: "Go practices, patterns, and solutions for better code quality.",
    github: "https://github.com/mhmtszr/go-practices",
    technologies: ["Go"],
  },
  {
    title: "kediatR",
    description:
      "A library to handle queries and commands via a command bus in Kotlin and Java applications, supporting CQRS and Event Sourcing patterns.",
    github: "https://github.com/Trendyol/kediatR",
    technologies: ["Kotlin", "Java"],
  },
  {
    title: "Konsumer",
    description:
      "Kafka Konsumer provides an easy implementation of Kafka consumer with a built-in retry/exception manager.",
    github: "https://github.com/Trendyol/kafka-konsumer",
    technologies: ["Go", "Kafka"],
  },
  {
    title: "MovieIt",
    description:
      "A mobile application that lists movies to the user according to the semantic content of the text information entered by them.",
    github:
      "https://www.linkedin.com/posts/activity-6809763719413948416-f834?utm_source=share&utm_medium=member_desktop",
    technologies: ["Spring Boot", "Neo4j", "MongoDB", "Elasticsearch"],
  },
  {
    title: "Go Assist",
    description:
      "A mobile application developed to prevent vehicles (Tow Trucks, etc.) from turning empty, with backend developed using Node.js and admin panel using React.",
    github: "https://goassist.com.tr",
    technologies: ["Node.js", "MongoDB"],
  },
  {
    title: "Rememberry",
    description:
      "A Google Assistant Application that reminds various activities to users who have Alzheimer's disease, developed during a hackathon.",
    github: "https://github.com/mhmtszr/rememberry",
    technologies: ["Node.js"],
  },
]

function ProjectsContent() {
  const searchParams = useSearchParams()
  const [filter, setFilter] = useState("All")

  // Get unique technologies for filter options
  const allTechnologies = ["All", ...new Set(projects.flatMap((p) => p.technologies))]

  // Filter projects based on selected technology
  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.technologies.includes(filter))

  return (
    <PageContainer title="Projects">
      {/* Filter buttons */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex gap-2 flex-wrap">
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                filter === tech
                  ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={project.github} target="_blank" rel="noopener noreferrer" className="block h-full">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 h-full flex flex-col transition-all hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-100 dark:bg-gray-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                    {project.github.includes("github.com") ? (
                      <>
                        <Github className="h-4 w-4" />
                        <span>View on GitHub</span>
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-4 w-4" />
                        <span>View Project</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No projects found with the selected technology.</p>
          <button
            onClick={() => setFilter("All")}
            className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
          >
            Show all projects
          </button>
        </div>
      )}
    </PageContainer>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 dark:border-gray-200" />
          <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
        </div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  )
}
