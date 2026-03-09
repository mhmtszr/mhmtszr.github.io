import {type ArticleMetadata} from './mdx'

interface ArticleWithSlug {
    meta: Partial<ArticleMetadata> & { title: string; description: string; date: string }
    slug: string
}

// Basic website schema
export function generateWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Mehmet Sezer - Senior Software Engineer',
        url: 'https://msezer.dev',
        description: 'Senior Software Engineer at Trendyol specializing in microservice architecture and distributed systems. Building scalable and reliable software solutions.',
        inLanguage: 'en-US',
        copyrightYear: new Date().getFullYear()
    };
}

// Person schema for the author
export function generatePersonSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Mehmet Sezer',
        jobTitle: 'Senior Software Engineer',
        url: 'https://msezer.dev',
        image: 'https://msezer.dev/photography/profile.jpg',
        alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Hacettepe University',
            department: 'Computer Science'
        },
        description: 'Senior Software Engineer at Trendyol specializing in microservice architecture and distributed systems. Building scalable and reliable software solutions.',
        sameAs: [
            'https://github.com/mhmtszr',
            'https://linkedin.com/in/mehmetsezerr',
            'https://x.com/_mehmetsezer',
            'https://medium.com/@mehmet.sezer'
        ],
        worksFor: {
            '@type': 'Organization',
            name: 'Trendyol',
            url: 'https://trendyol.com',
            description: 'Turkey\'s leading e-commerce platform'
        },
        knowsAbout: [
            'Software Engineering',
            'Microservices',
            'Distributed Systems',
            'Software Architecture',
            'High-Performance Computing',
            'System Design'
        ]
    };
}

// BlogPosting schema for articles
export function generateArticleSchema(article: ArticleWithSlug) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.meta.title,
        description: article.meta.description,
        author: {
            '@type': 'Person',
            name: 'Mehmet Sezer',
            url: 'https://msezer.dev'
        },
        datePublished: article.meta.date,
        dateModified: article.meta.modified || article.meta.date,
        image: article.meta.image?.startsWith('http') ? article.meta.image : `https://msezer.dev${article.meta.image || '/opengraph-image.png'}`,
        url: `https://msezer.dev/articles/${article.slug}`,
        publisher: {
            '@type': 'Person',
            name: 'Mehmet Sezer',
            url: 'https://msezer.dev',
            logo: {
                '@type': 'ImageObject',
                url: 'https://msezer.dev/favicon.png'
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://msezer.dev/articles/${article.slug}`
        },
        keywords: article.meta.tags?.join(', '),
        articleSection: 'Technology',
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        wordCount: article.meta.readingTime ? parseInt(article.meta.readingTime) * 200 : 800
    };
}

// ItemList schema for article listings
export function generateItemListSchema(articles: Array<{ title: string; url: string; image?: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: articles.map((article, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: article.title,
            url: article.url.startsWith('http') ? article.url : `https://msezer.dev${article.url}`,
        }))
    };
}

// ProfilePage schema for the experience page
export function generateProfilePageSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
            '@type': 'Person',
            name: 'Mehmet Sezer',
            jobTitle: 'Senior Software Engineer',
            url: 'https://msezer.dev',
            image: 'https://msezer.dev/photography/profile.jpg',
            worksFor: {
                '@type': 'Organization',
                name: 'Trendyol',
                url: 'https://trendyol.com'
            },
            alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Hacettepe University',
                department: 'Computer Science'
            },
            sameAs: [
                'https://github.com/mhmtszr',
                'https://linkedin.com/in/mehmetsezerr',
                'https://x.com/_mehmetsezer',
                'https://medium.com/@mehmet.sezer'
            ]
        }
    };
}

// BreadcrumbList schema
export function generateBreadcrumbSchema(items: Array<{ label: string, href: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': items.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': item.label,
            'item': item.href.startsWith('http') ? item.href : `https://msezer.dev${item.href}`
        }))
    };
} 