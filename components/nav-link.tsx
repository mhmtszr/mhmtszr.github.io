"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {cn} from "@/lib/utils"
import type {ReactNode} from "react"

export function NavLink({href, icon, children}: { href: string; icon: ReactNode; children: ReactNode }) {
    const pathname = usePathname()
    const isActive = pathname !== null && (pathname === href || pathname.startsWith(`${href}/`))

    return (
        <li>
            <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    isActive && "bg-blue-50 text-blue-700 border-l-2 border-blue-600 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-400",
                )}
            >
                <span className={cn("h-5 w-5 shrink-0 [&>svg]:h-5 [&>svg]:w-5", isActive && "text-blue-600 dark:text-blue-400")}>
                    {icon}
                </span>
                <span className="truncate">{children}</span>
            </Link>
        </li>
    )
}
