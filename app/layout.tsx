import type React from "react"
import type {Viewport} from "next"
import './globals.css'
import {Lora, Plus_Jakarta_Sans} from "next/font/google"
import Sidebar from "@/components/sidebar"

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: 'swap',
    preload: true,
    variable: '--font-sans',
})

const lora = Lora({
    subsets: ["latin"],
    display: 'swap',
    preload: true,
    variable: '--font-lora',
})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        {media: '(prefers-color-scheme: light)', color: '#faf9f6'},
        {media: '(prefers-color-scheme: dark)', color: '#17191e'},
    ],
}

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
    authors: [{name: 'Mehmet Sezer', url: 'https://msezer.dev'}],
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
            <link rel="preload" href="/photography/profile.jpg" as="image"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="sitemap" type="application/xml" href="/sitemap.xml"/>
            <script dangerouslySetInnerHTML={{__html: `(function(){try{var d=document.documentElement;var s=localStorage.getItem('theme');if(s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches)){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}requestAnimationFrame(function(){requestAnimationFrame(function(){document.documentElement.classList.add('transitions-ready')})})})();`}} />
            <link rel="alternate" type="application/rss+xml" title="Mehmet Sezer's Blog"
                  href="https://msezer.dev/rss.xml"/>
        </head>
        <body className={`${plusJakarta.variable} ${lora.variable} ${plusJakarta.className}`}>
        <a href="#main-content"
           className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black dark:focus:bg-gray-900 dark:focus:text-white">
            Skip to content
        </a>
            <div className="flex min-h-screen flex-col">
                <Sidebar/>
                <div className="flex-1 md:ml-64 lg:ml-72">
                    <main id="main-content" className="min-h-screen w-full overflow-x-hidden">{children}</main>
                </div>
            </div>
        </body>
        </html>
    )
}
