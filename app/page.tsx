import { Github, Linkedin, FileText, Mail, ExternalLink, Twitter } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { generateWebsiteSchema, generatePersonSchema } from '@/lib/schema'
import { PageContainer } from "./components/page-container"

export default async function AboutPage() {
  // Generate schema data
  const websiteSchema = generateWebsiteSchema()
  const personSchema = generatePersonSchema()
  
  return (
    <PageContainer title="About Me 👋">
      <div className="space-y-6 text-lg">
        <p className="dark:text-[#d1d5db]">
          Passionate about building scalable systems and solving complex problems. Specializing in distributed
          systems, and high-performance applications.
        </p>

        <p className="dark:text-[#d1d5db]">
          Graduated from Hacettepe University in Computer Science with a 3.72/4.00 GPA, ranking 3rd highest in both
          the faculty and department.
        </p>

        <p className="dark:text-[#d1d5db]">
          Senior Software Engineer at <b className="dark:text-[#d1d5db]">Trendyol Group</b>, specializing in designing and building scalable,
          high-performance, and fault-tolerant distributed systems. Skilled in addressing complex challenges in
          microservices architecture and database management while ensuring reliability and efficiency. Actively
          contributes to open-source projects and explores emerging technologies.
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-3">Personal Interests</h2>
          <p className="dark:text-[#d1d5db]">
            I enjoy playing the piano, exploring diverse cultures through travel, and playing football.
          </p>
        </div>

        <div className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
          <Card className="bg-gray-50 dark:bg-gray-800/50 border-0">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Link
                  href="https://github.com/mhmtszr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full flex-shrink-0">
                    <Github className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium">GitHub</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">View my open-source projects</p>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-gray-400 flex-shrink-0" />
                </Link>

                <Link
                  href="https://linkedin.com/in/mehmetsezerr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full flex-shrink-0">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium">LinkedIn</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      Connect with me professionally
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-gray-400 flex-shrink-0" />
                </Link>

                <Link
                  href="https://medium.com/@mehmet.sezer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full flex-shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium">Medium</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Read my articles and thoughts</p>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-gray-400 flex-shrink-0" />
                </Link>

                <Link
                  href="https://twitter.com/_mehmetsezer"
                  target="_blank"
                  className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full flex-shrink-0">
                    <Twitter className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium">Twitter</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">@_mehmetsezer</p>
                  </div>
                  <ExternalLink className="h-4 w-4 ml-auto text-gray-400 flex-shrink-0" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
    </PageContainer>
  )
}
