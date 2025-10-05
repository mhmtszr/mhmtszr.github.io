import { Github, Linkedin, FileText } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Mehmet Sezer
              </h1>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">Senior Software Engineer</p>
            </div>
            <div className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              <p className="mb-4">
                Passionate about building scalable systems and solving complex problems. Specializing in distributed
                systems, and high-performance applications.
              </p>
              <p className="mb-4">
                Graduated from Hacettepe University in Computer Science with a 3.72/4.00 GPA, ranking 3rd highest in
                both the faculty and department.
              </p>
              <p className="mb-4">
                Senior Software Engineer at Trendyol Group, specializing in designing and building scalable,
                high-performance, and fault-tolerant distributed systems. Skilled in addressing complex challenges in
                microservices architecture and database management while ensuring reliability and efficiency. Actively
                contributes to open-source projects and explores emerging technologies.
              </p>
              <p>
                Passionate about playing the piano, exploring diverse cultures through travel, and playing football.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="https://github.com/mhmtszr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/mehmetsezerr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://medium.com/@mehmet.sezer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              >
                <FileText className="h-5 w-5" />
                <span className="sr-only">Medium</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full border-4 border-white shadow-xl md:h-[400px] md:w-[400px]">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Mehmet Sezer"
                className="object-cover"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
