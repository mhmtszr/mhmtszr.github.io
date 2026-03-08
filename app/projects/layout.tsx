import {Metadata} from 'next'
import {generateBreadcrumbSchema} from '@/lib/schema'

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Open-source projects and contributions by Mehmet Sezer. Including concurrent data structures in Go, database change protocol connectors, and more.',
    alternates: {
        canonical: 'https://msezer.dev/projects',
    },
    openGraph: {
        title: 'Projects | Mehmet Sezer',
        description: 'Open-source projects and contributions by Mehmet Sezer.',
        url: 'https://msezer.dev/projects',
    },
}

export default function ProjectsLayout({children}: { children: React.ReactNode }) {
    const breadcrumbSchema = generateBreadcrumbSchema([
        {label: 'Home', href: 'https://msezer.dev'},
        {label: 'Projects', href: 'https://msezer.dev/projects'},
    ])

    return (
        <>
            {children}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema)}}
            />
        </>
    )
}
