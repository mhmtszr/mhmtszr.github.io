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
        description: 'Travel photography from around the world by Mehmet Sezer.',
        url: 'https://msezer.dev/photography',
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
