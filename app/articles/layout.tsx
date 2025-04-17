import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 lg:px-12">
      {children}
    </div>
  )
}
