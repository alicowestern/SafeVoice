import { getDictionary } from "@/lib/dictionary"
import { FeedbackForm } from "@/components/feedback-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function SubmitPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang)

    return (
        <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 sm:mb-10 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text tracking-tight">
                        {dict.landing.title}
                    </h1>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/70 max-w-lg mx-auto px-4">
                        {dict.landing.subtitle}
                    </p>
                </div>

                <FeedbackForm lang={lang} dict={dict} />
            </div>
        </div>
    )
}
