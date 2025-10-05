// "use client"

// import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Timeline, TimelineItem } from "../../components/ui/timeline"
import { getYear } from "date-fns"
import { PageContainer } from "../components/page-container"
// import { Suspense } from 'react'
// import { useSearchParams } from 'next/navigation'

interface Experience {
  company: string
  position: string
  period: string
  description?: string
  achievements: string[]
  technologies: string[]
}

interface ExperienceWithYearMarker extends Experience {
  showYear: boolean
}

const experiences: Experience[] = [
  {
    company: "Trendyol Group",
    position: "Senior Software Engineer",
    period: "Aug 2021 - Present",
    description:
      "Progressed from Associate Developer to Senior Software Engineer, contributing to the SellerAds Team, Internal Developer Platform Database Team and the Product Team.",
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

export default async function ExperiencePage() {
  // Function to get year from period string
  const getStartYear = (period: string) => {
    const parts = period.split(" - ")[0].split(" ")
    return parts[1] // Should be the year
  }

  return (
    <PageContainer title="Professional Experience">
      <Timeline>
        {experiences.map((exp, index) => {
          const currentStartYear = getStartYear(exp.period)
          const nextStartYear = index + 1 < experiences.length 
            ? getStartYear(experiences[index + 1].period)
            : undefined
          const year = currentStartYear !== nextStartYear ? currentStartYear : undefined
          
          return (
            <TimelineItem 
              key={index} 
              isLeft={index % 2 === 0}
              year={year}
            >
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{exp.position}</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {exp.company} | {exp.period}
                  </p>
                </div>

                {exp.description && (
                  <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Key Achievements:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="bg-gray-100 dark:bg-gray-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </TimelineItem>
          )
        })}
      </Timeline>
    </PageContainer>
  )
}
