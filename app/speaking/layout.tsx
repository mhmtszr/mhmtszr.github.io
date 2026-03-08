import {Metadata} from 'next'
import {generateBreadcrumbSchema} from '@/lib/schema'

export const metadata: Metadata = {
    title: 'Public Speaking',
    description: 'Conference talks and public speaking engagements by Mehmet Sezer on distributed systems, microservices, Go, and workflow orchestration.',
    alternates: {
        canonical: 'https://msezer.dev/speaking',
    },
    openGraph: {
        title: 'Public Speaking | Mehmet Sezer',
        description: 'Conference talks and public speaking engagements by Mehmet Sezer on distributed systems, microservices, Go, and workflow orchestration.',
        url: 'https://msezer.dev/speaking',
        type: 'website',
        images: [{
            url: 'https://msezer.dev/opengraph-image.png',
            width: 1200,
            height: 630,
            alt: 'Mehmet Sezer - Public Speaking',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Public Speaking | Mehmet Sezer',
        description: 'Conference talks and public speaking engagements by Mehmet Sezer on distributed systems, microservices, Go, and workflow orchestration.',
        images: ['https://msezer.dev/opengraph-image.png'],
    },
}

export default function SpeakingLayout({children}: { children: React.ReactNode }) {
    const breadcrumbSchema = generateBreadcrumbSchema([
        {label: 'Home', href: 'https://msezer.dev'},
        {label: 'Speaking', href: 'https://msezer.dev/speaking'},
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
