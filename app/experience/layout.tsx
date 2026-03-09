import {Metadata} from 'next'
import {generateBreadcrumbSchema, generateProfilePageSchema} from '@/lib/schema'

export const metadata: Metadata = {
    title: 'Professional Experience',
    description: 'Professional experience and career journey of Mehmet Sezer, including roles at Trendyol Group, Bayzat, and other companies.',
    alternates: {
        canonical: 'https://msezer.dev/experience',
    },
    openGraph: {
        title: 'Professional Experience | Mehmet Sezer',
        description: 'Professional experience and career journey of Mehmet Sezer, including roles at Trendyol Group, Bayzat, and other companies.',
        url: 'https://msezer.dev/experience',
        type: 'website',
        images: [{
            url: 'https://msezer.dev/opengraph-image.png',
            width: 1200,
            height: 630,
            alt: 'Mehmet Sezer - Professional Experience',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Professional Experience | Mehmet Sezer',
        description: 'Professional experience and career journey of Mehmet Sezer, including roles at Trendyol Group, Bayzat, and other companies.',
        images: ['https://msezer.dev/opengraph-image.png'],
    },
}

export default function ExperienceLayout({children}: { children: React.ReactNode }) {
    const breadcrumbSchema = generateBreadcrumbSchema([
        {label: 'Home', href: 'https://msezer.dev'},
        {label: 'Experience', href: 'https://msezer.dev/experience'},
    ])
    const profileSchema = generateProfilePageSchema()

    return (
        <>
            {children}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema)}}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(profileSchema)}}
            />
        </>
    )
}
