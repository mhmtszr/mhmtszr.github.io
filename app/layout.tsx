import type React from "react"
import fs from 'fs';
import path from 'path';
// Remove critical.css import here, we will inline it
// import "./critical.css" 
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import Script from "next/script"
import ScrollReset from "@/components/scroll-reset"

// Remove manual loading functions
// const preloadNonCriticalCSS = () => { ... }
// const loadNonCriticalCSS = () => { ... }

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
  preload: true // Ensure font is preloaded
})

// Function to read critical CSS - ensure this runs server-side only
const readCriticalCss = () => {
  try {
    // Adjust the path according to your project structure if needed
    const cssPath = path.join(process.cwd(), 'app', 'critical.css'); 
    return fs.readFileSync(cssPath, 'utf8');
  } catch (error) {
    console.error("Error reading critical CSS:", error);
    return ''; // Return empty string on error
  }
};

const criticalCssContent = readCriticalCss();


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
    icon: 'https://msezer.dev/favicon.png'
  },
  openGraph: {
    title: 'Mehmet Sezer - Senior Software Engineer',
    description: 'Senior Software Engineer at Trendyol specializing in microservice architecture and distributed systems. Building scalable and reliable software solutions.',
    url: 'https://msezer.dev',
    siteName: 'Mehmet Sezer',
    images: [
      {
        url: 'https://msezer.dev/opengraph-image.png',
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
    images: ['https://msezer.dev/opengraph-image.png'],
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
        {/* Add the standard manifest link tag */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Inline Critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: criticalCssContent }} />
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="google-site-verification" content="BJMSpiC_fy4HW6D8l2wxY75vzp2FTfAy4PC3vwb6NnU" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
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
        
        {/* Remove script that loads non-critical CSS */}
        {/* <Script id="load-css" strategy="afterInteractive"> ... </Script> */}
        
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
              ],
              award: [
                '3rd Highest GPA in Computer Science Department at Hacettepe University'
              ]
            })
          }}
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="alternate" type="application/rss+xml" title="Mehmet Sezer's Blog" href="https://msezer.dev/rss.xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">
          <ScrollReset />
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


import './globals.css' // Keep this import for Next.js to handle non-critical CSS