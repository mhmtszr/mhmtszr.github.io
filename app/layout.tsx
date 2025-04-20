import type React from "react"
import "./critical.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import Script from "next/script"

// Preload non-critical CSS with high priority but non-blocking
const preloadNonCriticalCSS = () => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'style'
  link.href = '/globals.css'
  document.head.appendChild(link)
}

// Load non-critical CSS after page load
const loadNonCriticalCSS = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = '/globals.css'
  link.type = 'text/css'
  document.head.appendChild(link)
}

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
  preload: true // Ensure font is preloaded
})

export const metadata = {
  title: {
    default: "Mehmet Sezer - Senior Software Engineer",
    template: "%s | Mehmet Sezer"
  },
  description:
    "Senior Software Engineer at Trendyol. Specializing in microservice architecture and distributed systems. Building scalable and reliable software solutions.",
  generator: 'Next.js',
  applicationName: 'Mehmet Sezer Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Mehmet Sezer',
    'Senior Software Engineer',
    'Software Engineer',
    'Trendyol Group',
    'Software Engineer Trendyol',
    'Distributed Systems',
    'Microservices Architecture',
    'Software Architecture',
    'Hacettepe University Computer Science'
  ],
  authors: [{ name: 'Mehmet Sezer', url: 'https://msezer.dev' }],
  creator: 'Mehmet Sezer',
  publisher: 'Mehmet Sezer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://msezer.dev'),
  alternates: {},
  icons: {
    icon: '/favicon.png'
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Mehmet Sezer - Senior Software Engineer',
    description: 'Senior Software Engineer at Trendyol specializing in microservice architecture and distributed systems. Building scalable and reliable software solutions.',
    url: 'https://msezer.dev',
    siteName: 'Mehmet Sezer',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Mehmet Sezer - Senior Software Engineer'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mehmet Sezer - Senior Software Engineer',
    description: 'Senior Software Engineer at Trendyol specializing in microservice architecture and distributed systems.',
    creator: '@_mehmetsezer',
    creatorId: '_mehmetsezer',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'BJMSpiC_fy4HW6D8l2wxY75vzp2FTfAy4PC3vwb6NnU',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/globals.css"
          as="style"
        />
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {
                console.error('Error applying theme:', e);
              }
            })();
          `}
        </Script>
        <Script id="load-css" strategy="afterInteractive">
          {`
            (${preloadNonCriticalCSS.toString()})();
            window.addEventListener('load', ${loadNonCriticalCSS.toString()});
          `}
        </Script>
        <Script
          id="schema-script"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
                'https://linkedin.com/in/mehmetsezer',
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
                'Cloud Architecture',
                'System Design'
              ],
              award: [
                '3rd Highest GPA in Computer Science Department at Hacettepe University'
              ]
            })
          }}
        />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">
          <div className="flex min-h-screen flex-col">
            <Sidebar />
            <div className="flex-1 md:ml-64">
              <main className="min-h-screen w-full">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'