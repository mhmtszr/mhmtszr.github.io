import {Metadata} from 'next'
import {generateBreadcrumbSchema} from '@/lib/schema'

export const metadata: Metadata = {
    title: 'Photography',
    description: 'Travel photography from around the world by Mehmet Sezer. Photos from Japan, England, Thailand, Cuba, and many more destinations.',
    alternates: {
        canonical: 'https://msezer.dev/photography',
    },
    openGraph: {
        title: 'Photography | Mehmet Sezer',
        description: 'Travel photography from around the world by Mehmet Sezer. Photos from Japan, England, Thailand, Cuba, and many more destinations.',
        url: 'https://msezer.dev/photography',
        type: 'website',
        images: [{
            url: 'https://msezer.dev/opengraph-image.png',
            width: 1200,
            height: 630,
            alt: 'Mehmet Sezer - Photography',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Photography | Mehmet Sezer',
        description: 'Travel photography from around the world by Mehmet Sezer. Photos from Japan, England, Thailand, Cuba, and many more destinations.',
        images: ['https://msezer.dev/opengraph-image.png'],
    },
}

export default function PhotographyLayout({children}: { children: React.ReactNode }) {
    const breadcrumbSchema = generateBreadcrumbSchema([
        {label: 'Home', href: 'https://msezer.dev'},
        {label: 'Photography', href: 'https://msezer.dev/photography'},
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
