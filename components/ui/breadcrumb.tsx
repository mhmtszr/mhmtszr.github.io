'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { generateBreadcrumbSchema } from '@/lib/schema'

interface BreadcrumbItem {
  label: string
  href: string
  isCurrent?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const structuredData = generateBreadcrumbSchema(items)

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <ol className="flex items-center flex-wrap">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-2 h-4 w-4" />
              )}
              
              {item.isCurrent ? (
                <span aria-current="page" className="font-medium text-gray-900 dark:text-gray-200">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}
