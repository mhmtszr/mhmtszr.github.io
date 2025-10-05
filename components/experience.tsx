"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    company: "Trendyol Group",
    position: "Senior Software Engineer",
    period: "Aug 2021 - Present",
    description:
      "Progressed from Associate Developer to Senior Software Engineer, contributing to the Internal Developer Platform Database Team and the Product Team.",
    achievements: [
      "Automated routine database management tasks to enhance productivity.",
      "Collaborated with cross-functional teams to meet database needs and assist in capacity planning.",
      "Unified duplicate products using AI models, significantly improving product quality. Unified over 200 million duplicate products",
      "Led the internationalization process, enabling sellers to reach global markets. One of the milestone of the company.",
    ],
    technologies: ["Go", "Microservice", "Distributed System", "Kotlin", "Couchbase", "PostgreSQL", "Redis"],
  },
  {
    company: "Bayzat",
    position: "Junior Software Engineer",
    period: "Feb 2021 - Aug 2021",
    achievements: [
      "Focused on backend development and mobile development in a multi-national agile team.",
      "Developed backend services using Kotlin and Spring Boot",
      "Wrote integration and unit tests",
      "Worked on mobile development using Flutter",
    ],
    technologies: ["Kotlin", "Spring Boot", "PostgreSQL", "Redis", "AWS", "Flutter"],
  },
  {
    company: "Monday Hero",
    position: "Full Stack Developer",
    period: "May 2020 - Nov 2020",
    achievements: [
      'Developed the backend and admin panel for the "GoAssist" mobile application.',
      "Created application integration plugins using Node.js and TypeScript",
      "Developed core algorithms and API using Swift Vapor",
    ],
    technologies: ["Node.js", "Express", "MongoDB", "Firebase", "React", "Swift Vapor"],
  },
  {
    company: "OPLOG Operational Logistics",
    position: "Artificial Intelligence Engineer Intern",
    period: "Dec 2019 - Mar 2020",
    achievements: [
      "Worked on data anomalies and real-time data analysis.",
      "Analyzed and reported real-time data using Power BI",
    ],
    technologies: ["Power BI"],
  },
  {
    company: "KOMTAS Data & Analytics",
    position: "Software Engineer Intern",
    period: "Jun 2019 - Aug 2019",
    achievements: [
      "Developed a web service with Flask and MySQL to trigger Pentaho Kettle Jobs.",
      "Analyzed data by using Apache Nifi, Pentaho Data Integration.",
    ],
    technologies: ["Flask", "MySQL", "Apache Nifi", "Pentaho Data Integration"],
  },
]

export default function Experience() {
  const [activeExperience, setActiveExperience] = useState(0)

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Professional Journey</h2>

        <div className="grid md:grid-cols-[1fr_3fr] gap-8">
          {/* Timeline navigation */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-4 pb-4 md:pb-0">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveExperience(index)}
                className={`text-left p-4 rounded-lg transition-all duration-300 min-w-[200px] md:min-w-0 ${
                  activeExperience === index
                    ? "bg-white shadow-md border-l-4 border-gray-900"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <h3 className="font-semibold">{exp.company}</h3>
                <p className="text-sm text-gray-500">{exp.period}</p>
              </button>
            ))}
          </div>

          {/* Experience details */}
          <motion.div
            key={activeExperience}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold">{experiences[activeExperience].position}</h3>
              <p className="text-gray-500">
                {experiences[activeExperience].company} | {experiences[activeExperience].period}
              </p>
            </div>

            <p className="mb-4">{experiences[activeExperience].description}</p>

            <h4 className="font-semibold mb-2">Key Achievements:</h4>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              {experiences[activeExperience].achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {experiences[activeExperience].technologies.map((tech, i) => (
                <Badge key={i} variant="outline" className="bg-gray-100">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
