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
    generator: 'v0.dev'
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