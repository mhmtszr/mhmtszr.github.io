import { Github, Linkedin, FileText, Twitter, BookOpenText } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold mb-4">Mehmet Sezer</h3>
            <p className="text-gray-400">
              Senior Software Engineer specializing in distributed systems and database internals.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#experience" className="text-gray-400 hover:text-white transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#speaking" className="text-gray-400 hover:text-white transition-colors">
                  Speaking
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#photography" className="text-gray-400 hover:text-white transition-colors">
                  Photography
                </Link>
              </li>
              <li>
                <Link 
                  href="/Mehmet_Sezer_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  CV
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/mhmtszr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/mehmetsezerr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://x.com/_mehmetsezer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://medium.com/@mehmet.sezer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <BookOpenText className="h-6 w-6" />
                <span className="sr-only">Medium</span>
              </Link>
              <Link
                href="/Mehmet_Sezer_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FileText className="h-6 w-6" />
                <span className="sr-only">CV</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">Feel free to reach out for collaborations or just a chat!</p>
            <Link href="mailto:contact@mehmetsezer.dev" className="inline-block mt-2 text-white hover:underline">
              contact@mehmetsezer.dev
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Mehmet Sezer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
