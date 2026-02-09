import { Metadata } from 'next'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Professional Experience',
  description: 'Professional experience and career journey of Mehmet Sezer, including roles at Trendyol Group, Bayzat, and other companies.',
  alternates: {
    canonical: 'https://msezer.dev/experience',
  },
  openGraph: {
    title: 'Professional Experience | Mehmet Sezer',
    description: 'Professional experience and career journey of Mehmet Sezer.',
    url: 'https://msezer.dev/experience',
  },
}

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: 'Home', href: 'https://msezer.dev' },
    { label: 'Experience', href: 'https://msezer.dev/experience' },
  ])

  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
