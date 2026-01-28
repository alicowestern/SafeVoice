import { getDictionary } from "@/lib/dictionary"
import { StatusChecker } from "@/components/status-checker"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function TrackPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang)

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-background)]">
            <div className="max-w-xl mx-auto">
                <div className="mb-10 text-center">
                    <Link
                        href={`/${lang}`}
                        className="inline-flex items-center text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors mb-6 px-4 py-2 rounded-full border border-transparent hover:border-gray-200 bg-transparent hover:bg-white"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {dict.common.appName}
                    </Link>
                    <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">{dict.landing.track}</h1>
                    <p className="text-gray-600">Enter your reference code to check the status of your feedback.</p>
                </div>

                <StatusChecker dict={dict} />
            </div>
        </div>
    )
}
