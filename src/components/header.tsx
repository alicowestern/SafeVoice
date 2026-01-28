"use client"

import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { usePathname } from "next/navigation"

export function Header({ lang }: { lang: string }) {
    const pathname = usePathname()

    // Simple way to switch language while keeping path
    // Assumes path starts with /[lang]/...
    const getLangLink = (targetLang: string) => {
        const segments = pathname.split('/')
        if (segments.length > 1) {
            segments[1] = targetLang
            return segments.join('/')
        }
        return `/${targetLang}`
    }

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
                <Link href={`/${lang}`} className="flex items-center gap-3">
                    <div className="bg-[var(--color-primary)] p-2 rounded-lg text-white">
                        <ShieldCheck size={24} strokeWidth={2} />
                    </div>
                    <span className="text-xl font-bold text-[var(--color-primary)]">
                        SafeVoice
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        href={`/${lang}/login`}
                        className="text-gray-500 hover:text-[var(--color-primary)] transition-colors p-2"
                        title="Member/Admin Login"
                    >
                        <ShieldCheck size={20} />
                    </Link>
                    <div className="flex items-center gap-1 bg-[var(--color-background)] rounded-full p-1.5 border border-gray-200">
                        {['en', 'am', 'ti'].map((l) => (
                            <Link
                                key={l}
                                href={getLangLink(l)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${lang === l
                                        ? 'bg-white text-[var(--color-primary)] shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                {l === 'en' ? 'EN' : l === 'am' ? 'አማ' : 'ትግ'}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
}
