/**
 * Utility functions for generating Schema.org structured data
 */

// Basic website schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mehmet Sezer - Senior Software Engineer',
    url: 'https://msezer.dev',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://msezer.dev/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
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
export function generateArticleSchema(article: any) {
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
    image: article.meta.image || 'https://msezer.dev/opengraph-image.png',
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

// BreadcrumbList schema
export function generateBreadcrumbSchema(items: Array<{label: string, href: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': item.href
    }))
  };
} 