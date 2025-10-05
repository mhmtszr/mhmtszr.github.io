"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Github } from "lucide-react"
import Link from "next/link"

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
    technologies: ["Go", "Couchbase", "Elasticsearch", "CDC"],
  },
  {
    title: "Pipeline",
    description: "A Go pipeline solution that can be used in many different combinations for chaining pipeline steps.",
    github: "https://github.com/mhmtszr/pipeline",
    technologies: ["Go", "Pipeline"],
  },
  {
    title: "Go DCP Kafka",
    description:
      "Go implementation of the Couchbase Kafka Connector that streams documents from Couchbase via Database Change Protocol (DCP) and publishes each document to a Kafka topic in near real-time.",
    github: "https://github.com/Trendyol/go-dcp-kafka",
    technologies: ["Go", "Couchbase", "Kafka", "CDC"],
  },
  {
    title: "Go DCP SQL",
    description:
      "Streams documents from Couchbase via Database Change Protocol (DCP) and writes each document to a SQL table in near real-time.",
    github: "https://github.com/Trendyol/go-dcp-sql",
    technologies: ["Go", "Couchbase", "SQL", "CDC"],
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
    technologies: ["Java Spring Boot", "Dialogflow", "Neo4j", "MongoDB", "Elasticsearch"],
  },
  {
    title: "Go Assist",
    description:
      "A mobile application developed to prevent vehicles (Tow Trucks, etc.) from turning empty, with backend developed using Node.js and admin panel using React.",
    github: "https://goassist.com.tr",
    technologies: ["Node.js", "Express", "MongoDB", "Firebase", "React"],
  },
  {
    title: "Rememberry",
    description:
      "A Google Assistant Application that reminds various activities to users who have Alzheimer's disease, developed during a hackathon.",
    github: "https://github.com/mhmtszr/rememberry",
    technologies: ["Dialogflow", "Node.js", "Firebase"],
  },
]

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState(6)

  const loadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, projects.length))
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Projects</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full flex flex-col"
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="bg-gray-100">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>View Project</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleProjects < projects.length && (
          <div className="mt-10 text-center">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
