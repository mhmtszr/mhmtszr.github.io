import {Metadata} from 'next'
import {generateBreadcrumbSchema, generatePresentationSchema} from '@/lib/schema'

export const metadata: Metadata = {
    title: 'How Elasticsearch Actually Works Under the Hood',
    description: 'A visual deep dive from bytes on disk to search results — Lucene\'s inverted indexes, FST trees, BM25 scoring, segment merging, and how Elasticsearch turns a single-node search library into a fault-tolerant distributed system.',
    alternates: {
        canonical: 'https://msezer.dev/presentations/elasticsearch-internals',
    },
    openGraph: {
        title: 'How Elasticsearch Actually Works Under the Hood | Mehmet Sezer',
        description: 'A visual deep dive from bytes on disk to search results — Lucene\'s inverted indexes, FST trees, BM25 scoring, segment merging, and how Elasticsearch turns a single-node search library into a fault-tolerant distributed system.',
        url: 'https://msezer.dev/presentations/elasticsearch-internals',
        type: 'website',
        images: [{
            url: 'https://msezer.dev/article/elasticsearch-internals/preview.webp',
            width: 1200,
            height: 630,
            alt: 'Elasticsearch Internals - How Elasticsearch Actually Works Under the Hood',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'How Elasticsearch Actually Works Under the Hood | Mehmet Sezer',
        description: 'A visual deep dive from bytes on disk to search results — Lucene\'s inverted indexes, FST trees, BM25 scoring, segment merging, and how Elasticsearch turns a single-node search library into a fault-tolerant distributed system.',
        images: ['https://msezer.dev/article/elasticsearch-internals/preview.webp'],
    },
}

export default function ElasticsearchInternalsLayout({children}: { children: React.ReactNode }) {
    const breadcrumbSchema = generateBreadcrumbSchema([
        {label: 'Home', href: 'https://msezer.dev'},
        {label: 'Presentations', href: 'https://msezer.dev/presentations'},
        {label: 'Elasticsearch Internals', href: 'https://msezer.dev/presentations/elasticsearch-internals'},
    ])

    const presentationSchema = generatePresentationSchema({
        title: 'How Elasticsearch Actually Works Under the Hood',
        description: 'A visual deep dive from bytes on disk to search results — Lucene\'s inverted indexes, FST trees, BM25 scoring, segment merging, and how Elasticsearch turns a single-node search library into a fault-tolerant distributed system.',
        url: 'https://msezer.dev/presentations/elasticsearch-internals',
    })

    return (
        <>
            {children}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema)}}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(presentationSchema)}}
            />
        </>
    )
}
