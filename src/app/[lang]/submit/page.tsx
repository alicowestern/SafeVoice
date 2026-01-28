import { getDictionary } from "@/lib/dictionary"
import { FeedbackForm } from "@/components/feedback-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function SubmitPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang)

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-12 text-center relative">
                    <div className="absolute left-0 top-0 hidden sm:block">
                        <Link
                            href={`/${lang}`}
                            className="inline-flex items-center text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors px-4 py-2 rounded-full border border-transparent hover:border-gray-200 bg-transparent hover:bg-white"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Link>
                    </div>
                    {/* Mobile Back Link */}
                    <div className="sm:hidden mb-6 flex justify-start">
                        <Link
                            href={`/${lang}`}
                            className="inline-flex items-center text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors px-4 py-2 rounded-full border border-transparent hover:border-gray-200 bg-transparent hover:bg-white"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Link>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] tracking-tight mb-4">
                        {dict.landing.title}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {dict.landing.subtitle}
                    </p>
                </div>

                <FeedbackForm lang={lang} dict={dict} />
            </div>
        </div>
    )
}
