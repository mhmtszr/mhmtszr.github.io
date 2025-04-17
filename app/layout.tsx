import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mehmet Sezer - Senior Software Engineer",
  description:
    "Personal portfolio of Mehmet Sezer, a Senior Software Engineer specializing in distributed systems and cloud architecture.",
    generator: 'v0.dev',
    metadataBase: new URL('https://mhmtszr.github.io'),
    openGraph: {
      title: 'Mehmet Sezer - Senior Software Engineer',
      description: 'Personal portfolio of Mehmet Sezer, a Senior Software Engineer specializing in distributed systems and cloud architecture.',
      url: 'https://mhmtszr.github.io',
      siteName: 'Mehmet Sezer Portfolio',
      images: [
        {
          url: '/photography/bloomberg.jpg',
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
      description: 'Personal portfolio of Mehmet Sezer, a Senior Software Engineer specializing in distributed systems and cloud architecture.',
      images: ['/photography/bloomberg.jpg'],
      creator: '@_mehmetsezer'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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
        {/* Add a script to prevent flash of unstyled content */}
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