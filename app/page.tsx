import type {Metadata} from "next"
import {ArrowRight, Briefcase, Camera, Code, FileText, Github, Linkedin, Presentation, Twitter} from "lucide-react"
import {MediumIcon} from "@/components/icons/medium"
import Link from "next/link"
import Image from "next/image"
import {generatePersonSchema, generateWebsiteSchema} from "@/lib/schema"
import {getAllArticles, getLatestArticles} from "@/lib/mdx"

export const metadata: Metadata = {
    title: {
        absolute: "Mehmet Sezer - Senior Software Engineer",
    },
    description: "Mehmet Sezer - Senior Software Engineer building scalable systems, sharing engineering lessons, and writing about distributed architecture.",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Mehmet Sezer - Senior Software Engineer",
        description: "Building scalable systems, sharing engineering lessons, and writing about distributed architecture.",
        url: "https://msezer.dev",
        siteName: "Mehmet Sezer",
        type: "website",
        images: [
            {
                url: "https://msezer.dev/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Mehmet Sezer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Mehmet Sezer - Senior Software Engineer",
        description: "Building scalable systems, sharing engineering lessons, and writing about distributed architecture.",
        images: ["https://msezer.dev/opengraph-image.png"],
    },
}

export default async function HomePage() {
    const websiteSchema = generateWebsiteSchema()
    const personSchema = generatePersonSchema()

    let latestArticles: {
        meta: { title: string; description: string; date: string; image?: string; tags?: string[] };
        slug: string
    }[] = []
    try {
        const allArticles = await getAllArticles()
        latestArticles = getLatestArticles(allArticles, 4)
    } catch {
        latestArticles = []
    }

    return (
        <section
            className="flex w-full flex-col overflow-x-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-10 xl:px-14">
            <div className="mx-auto w-full max-w-7xl">
                <div>
                    <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
                        <div className="space-y-4 sm:space-y-5">
                            <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                                <span className="hero-gradient">Mehmet Sezer</span>
                            </h1>

                            <p className="animate-fade-in-up animation-delay-100 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl">
                                Senior Software Engineer at{" "}
                                <span className="font-semibold text-gray-900 dark:text-white">Trendyol</span>,{" "}
                                focused on designing resilient{" "}
                                <span
                                    className="font-semibold text-gray-900 dark:text-white">distributed systems</span>{" "}
                                and building scalable{" "}
                                <span
                                    className="font-semibold text-gray-900 dark:text-white">database architectures</span>{" "}
                                that power high-traffic platforms serving millions of requests every day.
                            </p>

                            <div
                                className="animate-fade-in-up animation-delay-200 flex flex-wrap items-center gap-3 sm:gap-4">
                                <Link href="https://github.com/mhmtszr" target="_blank" rel="noopener noreferrer"
                                      className="text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-50">
                                    <Github className="h-5 w-5"/>
                                    <span className="sr-only">GitHub</span>
                                </Link>
                                <Link href="https://linkedin.com/in/mehmetsezerr" target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-50">
                                    <Linkedin className="h-5 w-5"/>
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                                <Link href="https://x.com/_mehmetsezer" target="_blank" rel="noopener noreferrer"
                                      className="text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-50">
                                    <Twitter className="h-5 w-5"/>
                                    <span className="sr-only">Twitter</span>
                                </Link>
                                <Link href="https://medium.com/@mehmet.sezer" target="_blank" rel="noopener noreferrer"
                                      className="text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-50">
                                    <MediumIcon className="h-5 w-5"/>
                                    <span className="sr-only">Medium</span>
                                </Link>
                                <a href="/Mehmet_Sezer_Resume.pdf" target="_blank" rel="noopener noreferrer"
                                   className="text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                   title="Resume">
                                    <FileText className="h-5 w-5"/>
                                    <span className="sr-only">Resume</span>
                                </a>
                            </div>

                            <div className="animate-fade-in-up animation-delay-300 grid grid-cols-2 gap-3 pt-4">
                                <Link href="/experience"
                                      className="group relative flex items-center gap-3.5 overflow-hidden rounded-xl border border-blue-100 p-4 transition-all hover:shadow-md dark:border-blue-900/50 dark:hover:border-blue-800">
                                    <div
                                        className="absolute inset-0 bg-linear-to-br from-blue-50 to-transparent opacity-80 dark:from-blue-950/30 dark:to-transparent"/>
                                    <div
                                        className="relative rounded-lg bg-blue-100 p-2.5 transition-colors group-hover:bg-blue-200 dark:bg-blue-900/50 dark:group-hover:bg-blue-800/50">
                                        <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400"/>
                                    </div>
                                    <div className="relative min-w-0 flex-1 font-sans">
                                        <h3 className="font-medium">Experience</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Career path & impact</p>
                                    </div>
                                    <ArrowRight
                                        className="relative h-4 w-4 shrink-0 text-blue-300 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500 dark:text-blue-700 dark:group-hover:text-blue-400"/>
                                </Link>
                                <Link href="/projects"
                                      className="group relative flex items-center gap-3.5 overflow-hidden rounded-xl border border-emerald-100 p-4 transition-all hover:shadow-md dark:border-emerald-900/50 dark:hover:border-emerald-800">
                                    <div
                                        className="absolute inset-0 bg-linear-to-br from-emerald-50 to-transparent opacity-80 dark:from-emerald-950/30 dark:to-transparent"/>
                                    <div
                                        className="relative rounded-lg bg-emerald-100 p-2.5 transition-colors group-hover:bg-emerald-200 dark:bg-emerald-900/50 dark:group-hover:bg-emerald-800/50">
                                        <Code className="h-5 w-5 text-emerald-600 dark:text-emerald-400"/>
                                    </div>
                                    <div className="relative min-w-0 flex-1 font-sans">
                                        <h3 className="font-medium">Projects</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Open source work</p>
                                    </div>
                                    <ArrowRight
                                        className="relative h-4 w-4 shrink-0 text-emerald-300 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-500 dark:text-emerald-700 dark:group-hover:text-emerald-400"/>
                                </Link>
                                <Link href="/speaking"
                                      className="group relative flex items-center gap-3.5 overflow-hidden rounded-xl border border-amber-100 p-4 transition-all hover:shadow-md dark:border-amber-900/50 dark:hover:border-amber-800">
                                    <div
                                        className="absolute inset-0 bg-linear-to-br from-amber-50 to-transparent opacity-80 dark:from-amber-950/30 dark:to-transparent"/>
                                    <div
                                        className="relative rounded-lg bg-amber-100 p-2.5 transition-colors group-hover:bg-amber-200 dark:bg-amber-900/50 dark:group-hover:bg-amber-800/50">
                                        <Presentation className="h-5 w-5 text-amber-600 dark:text-amber-400"/>
                                    </div>
                                    <div className="relative min-w-0 flex-1 font-sans">
                                        <h3 className="font-medium">Speaking</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Talks & sessions</p>
                                    </div>
                                    <ArrowRight
                                        className="relative h-4 w-4 shrink-0 text-amber-300 transition-transform group-hover:translate-x-0.5 group-hover:text-amber-500 dark:text-amber-700 dark:group-hover:text-amber-400"/>
                                </Link>
                                <Link href="/photography"
                                      className="group relative flex items-center gap-3.5 overflow-hidden rounded-xl border border-rose-100 p-4 transition-all hover:shadow-md dark:border-rose-900/50 dark:hover:border-rose-800">
                                    <div
                                        className="absolute inset-0 bg-linear-to-br from-rose-50 to-transparent opacity-80 dark:from-rose-950/30 dark:to-transparent"/>
                                    <div
                                        className="relative rounded-lg bg-rose-100 p-2.5 transition-colors group-hover:bg-rose-200 dark:bg-rose-900/50 dark:group-hover:bg-rose-800/50">
                                        <Camera className="h-5 w-5 text-rose-600 dark:text-rose-400"/>
                                    </div>
                                    <div className="relative min-w-0 flex-1 font-sans">
                                        <h3 className="font-medium">Photography</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Travel & street</p>
                                    </div>
                                    <ArrowRight
                                        className="relative h-4 w-4 shrink-0 text-rose-300 transition-transform group-hover:translate-x-0.5 group-hover:text-rose-500 dark:text-rose-700 dark:group-hover:text-rose-400"/>
                                </Link>
                            </div>
                        </div>

                        <div className="animate-fade-in-up animation-delay-300 hidden w-[420px] xl:w-[480px] lg:block">
                            <div
                                className="overflow-hidden rounded-xl border border-gray-200 bg-gray-950 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
                                <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-2.5">
                                    <span className="h-3 w-3 rounded-full bg-red-500/80"/>
                                    <span className="h-3 w-3 rounded-full bg-yellow-500/80"/>
                                    <span className="h-3 w-3 rounded-full bg-green-500/80"/>
                                    <span className="ml-2 text-xs text-gray-500">~/about.json</span>
                                </div>
                                <div className="px-4 py-4 font-mono text-[13px] leading-[21px] text-gray-300">
                                    <p><span className="text-green-400">$</span> whoami</p>
                                    <p className="text-gray-400">mehmet.sezer</p>
                                    <p className="mt-1.5"><span className="text-green-400">$</span> cat about.json</p>
                                    <p className="text-purple-400">{"{"}</p>
                                    <p className="pl-4"><span className="text-blue-400">&quot;role&quot;</span>: <span
                                        className="text-amber-300">&quot;Sr. Software Engineer&quot;</span>,</p>
                                    <p className="pl-4"><span
                                        className="text-blue-400">&quot;company&quot;</span>: <span
                                        className="text-amber-300">&quot;Trendyol&quot;</span>,</p>
                                    <p className="pl-4"><span className="text-blue-400">&quot;focus&quot;</span>: [</p>
                                    <p className="pl-8"><span
                                        className="text-amber-300">&quot;Distributed Systems&quot;</span>,</p>
                                    <p className="pl-8"><span
                                        className="text-amber-300">&quot;Database Internals&quot;</span>,</p>
                                    <p className="pl-8"><span
                                        className="text-amber-300">&quot;Microservice Architecture&quot;</span></p>
                                    <p className="pl-4">],</p>
                                    <p className="pl-4"><span className="text-blue-400">&quot;languages&quot;</span>:
                                        [<span className="text-amber-300">&quot;Go&quot;</span>, <span
                                            className="text-amber-300">&quot;Kotlin&quot;</span>, <span
                                            className="text-amber-300">&quot;Java&quot;</span>],</p>
                                    <p className="pl-4"><span className="text-blue-400">&quot;hobbies&quot;</span>:
                                        [<span className="text-amber-300">&quot;Piano&quot;</span>, <span
                                            className="text-amber-300">&quot;Tennis&quot;</span>, <span
                                            className="text-amber-300">&quot;Travel&quot;</span>]</p>
                                    <p className="text-purple-400">{"}"}</p>
                                    <p className="mt-1.5"><span className="text-green-400">$</span> <span
                                        className="animate-pulse">_</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-14 w-full max-w-7xl pb-2 sm:mt-16">
                {latestArticles.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold sm:text-3xl">Recent writing</h2>
                            <Link href="/articles"
                                  className="inline-flex items-center gap-1 text-sm font-sans text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                All articles
                                <ArrowRight className="h-3.5 w-3.5"/>
                            </Link>
                        </div>
                        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                            {latestArticles.map((article) => {
                                const formattedDate = new Date(article.meta.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    timeZone: "UTC",
                                })
                                return (
                                    <Link
                                        key={article.slug}
                                        href={`/articles/${article.slug}`}
                                        className="group overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:hover:border-gray-600"
                                    >
                                        {article.meta.image ? (
                                            <div className="relative h-28 w-full overflow-hidden lg:h-32">
                                                <Image
                                                    src={article.meta.image}
                                                    alt={article.meta.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="h-28 w-full bg-linear-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 lg:h-32"/>
                                        )}
                                        <div className="space-y-1.5 p-3">
                                            <p className="text-xs text-gray-400 dark:text-gray-500 font-sans">{formattedDate}</p>
                                            <h3 className="line-clamp-2 text-sm font-medium leading-snug transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                {article.meta.title}
                                            </h3>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(websiteSchema)}}/>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(personSchema)}}/>
        </section>
    )
}
