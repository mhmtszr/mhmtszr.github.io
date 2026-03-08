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
        description: 'Open-source projects and contributions by Mehmet Sezer. Including concurrent data structures in Go, database change protocol connectors, and more.',
        url: 'https://msezer.dev/projects',
        type: 'website',
        images: [{
            url: 'https://msezer.dev/opengraph-image.png',
            width: 1200,
            height: 630,
            alt: 'Mehmet Sezer - Projects',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects | Mehmet Sezer',
        description: 'Open-source projects and contributions by Mehmet Sezer. Including concurrent data structures in Go, database change protocol connectors, and more.',
        images: ['https://msezer.dev/opengraph-image.png'],
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
