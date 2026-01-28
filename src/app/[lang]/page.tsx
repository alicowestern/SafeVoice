import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { MessageSquare, Search, MessageCircle } from "lucide-react";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Debug: Log the language parameter
  console.log('Homepage params.lang:', lang);
  console.log('Submit link will be:', `/${lang}/submit`);
  console.log('Status link will be:', `/${lang}/status`);

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center max-w-7xl mx-auto relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full max-w-6xl">

        {/* Left Column: Text & Action */}
        <div className="flex flex-col items-start text-left gap-8 animate-in slide-in-from-left duration-700 fade-in order-2 lg:order-1">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 inline-block">
            <MessageCircle
              size={48}
              className="text-[var(--color-primary)]"
              strokeWidth={1.5}
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-primary)] leading-[1.1]">
              SafeVoice
            </h1>
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-800 leading-tight">
              {dict.landing.title}
            </h2>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
            {dict.landing.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href={`/${lang}/submit`}
              className="flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-[var(--color-primary)] rounded-[var(--radius-lg)] hover:bg-opacity-90 transition-all shadow-md w-full sm:w-auto transform hover:-translate-y-0.5"
            >
              <MessageSquare size={20} />
              <span>{dict.landing.cta}</span>
            </Link>
            <Link
              href={`/${lang}/status`}
              className="flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-[var(--color-primary)] bg-white border border-gray-200 rounded-[var(--radius-lg)] hover:bg-gray-50 transition-all shadow-sm w-full sm:w-auto transform hover:-translate-y-0.5"
            >
              <Search size={20} />
              {dict.landing.track}
            </Link>
          </div>

          {/* Trust Indicators - Minimal & Clean */}
          <div className="pt-4 flex flex-wrap gap-6 text-sm font-medium text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--color-secondary)] rounded-full" />
              <span>Anonymous</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>Multilingual</span>
            </div>
          </div>
        </div>

        {/* Right Column: Abstract Visual Metaphor */}
        <div className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-center animate-in slide-in-from-right duration-700 fade-in delay-200 order-1 lg:order-2">
          {/* Abstract Composition: Shield + Voice */}
          <div className="relative w-full h-full max-w-md mx-auto">
            {/* Soft Background Blobs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-green-100/40 rounded-full blur-3xl animate-pulse delay-700" />

            {/* Main Illustration */}
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
              {/* Shield Shape - Base */}
              <path d="M200 40C140 40 80 60 40 90C40 200 80 320 200 380C320 320 360 200 360 90C320 60 260 40 200 40Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />

              {/* Inner Protective Layer */}
              <path d="M200 60C150 60 100 75 70 100C70 190 100 290 200 340C300 290 330 190 330 100C300 75 250 60 200 60Z" fill="white" />

              {/* Speech Bubbles - Metaphor for Voice */}
              <circle cx="200" cy="180" r="60" fill="url(#grad1)" opacity="0.9" />
              <circle cx="160" cy="220" r="40" fill="url(#grad2)" opacity="0.8" />
              <circle cx="240" cy="220" r="30" fill="url(#grad2)" opacity="0.8" />

              {/* Definitions */}
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#003366" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#003366" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

      </div>
    </main>
  );
}
