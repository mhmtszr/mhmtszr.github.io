import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import Link from "next/link"

// Define custom MDX components
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use custom components
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-8 mb-4" id={children?.toString().toLowerCase().replace(/\s+/g, "-")}>
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>,
    p: ({ children }) => <p className="my-4 text-lg">{children}</p>,
    a: ({ href, children }) => (
      <Link href={href || "#"} className="text-primary hover:underline">
        {children}
      </Link>
    ),
    ul: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
    li: ({ children }) => <li className="text-lg">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    img: ({ src, alt }) => (
      <div className="my-6">
        <Image src={src || ""} alt={alt || ""} width={800} height={500} className="rounded-lg mx-auto" />
      </div>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-6 text-sm">{children}</pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm border-b border-gray-200 dark:border-gray-700">{children}</td>
    ),
    hr: () => <hr className="my-8 border-gray-200 dark:border-gray-800" />,
    // Add custom components
    Callout: ({ children, type = "info" }) => {
      const styles = {
        info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
        warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
        error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
        tip: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      }[type]

      return <div className={`${styles} border-l-4 p-4 my-6 rounded-r-lg`}>{children}</div>
    },
    CodeBlock: ({ children, language }) => (
      <div className="my-6">
        <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-t-lg">
          <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{language}</span>
        </div>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-b-lg overflow-x-auto text-sm">
          <code>{children}</code>
        </pre>
      </div>
    ),
    ...components,
  }
}
