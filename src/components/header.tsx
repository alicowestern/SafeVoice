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
        <header className="glass sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
                <Link href={`/${lang}`} className="flex items-center gap-2 sm:gap-3 group">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-lg text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <ShieldCheck size={20} className="sm:w-6 sm:h-6" strokeWidth={2} />
                    </div>
                    <span className="text-lg sm:text-xl font-bold gradient-text">
                        SafeVoice
                    </span>
                </Link>

                <div className="flex items-center gap-3 sm:gap-4 text-sm font-medium">
                    <div className="flex items-center gap-1 glass rounded-full p-1">
                        <Link
                            href={getLangLink('en')}
                            className={`px-2 sm:px-3 py-1 rounded-full transition-all text-xs sm:text-sm ${lang === 'en' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
                        >
                            EN
                        </Link>
                        <Link
                            href={getLangLink('am')}
                            className={`px-2 sm:px-3 py-1 rounded-full transition-all text-xs sm:text-sm ${lang === 'am' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
                        >
                            አማ
                        </Link>
                        <Link
                            href={getLangLink('ti')}
                            className={`px-2 sm:px-3 py-1 rounded-full transition-all text-xs sm:text-sm ${lang === 'ti' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
                        >
                            ትግ
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
