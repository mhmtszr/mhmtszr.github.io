import Link from 'next/link'

export default function NotFound() {
    return (
        <section className="w-full py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div
                className="max-w-[1400px] w-full mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    The page you are looking for does not exist.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/articles"
                        className="px-6 py-3 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Read Articles
                    </Link>
                </div>
            </div>
        </section>
    )
}
