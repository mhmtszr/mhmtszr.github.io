import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "Mehmet Sezer - Senior Software Engineer",
    template: "%s | Mehmet Sezer"
  },
  description:
    "Senior Software Engineer at Trendyol specializing in microservice architecture and distributed systems. Building scalable and reliable software solutions.",
  generator: 'Next.js',
  applicationName: 'Mehmet Sezer Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: ['Mehmet Sezer', 'Software Engineer', 'Senior Developer', 'Microservices', 'Distributed Systems', 'Software Architecture'],
  authors: [{ name: 'Mehmet Sezer', url: 'https://msezer.dev' }],
  creator: 'Mehmet Sezer',
  publisher: 'Mehmet Sezer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://msezer.dev'),
  alternates: {
    canonical: '/',
  },
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
              sameAs: [
                'https://github.com/mhmtszr',
                'https://linkedin.com/in/mehmetsezer',
                'https://x.com/_mehmetsezer',
                'https://medium.com/@mehmet.sezer'
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Trendyol'
              },
              knowsAbout: [
                'Software Engineering',
                'Microservices',
                'Distributed Systems',
                'Software Architecture'
              ]
            })
          }}
        />
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