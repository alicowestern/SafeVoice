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
      {/* Animated background orbs */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-10 md:gap-12 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-8 w-full">

        {/* Whisper Icon with glow effect */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-glow" />
          <div className="relative bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-6 sm:p-8 rounded-full glass glow animate-float">
            <MessageCircle
              size={120}
              className="text-indigo-400 drop-shadow-2xl w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Branding */}
        <div className="space-y-4 sm:space-y-6 max-w-4xl px-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1]">
            <span className="gradient-text">SafeVoice</span>
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 leading-tight px-2">
            {dict.landing.title}
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto px-4">
            {dict.landing.subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 max-w-2xl">
          <Link
            href={`/${lang}/submit`}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl hover:from-indigo-500 hover:to-purple-500 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50 glow w-full sm:w-auto overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <MessageSquare size={24} className="group-hover:rotate-12 transition-transform relative z-10 flex-shrink-0" />
            <span className="relative z-10">{dict.landing.cta}</span>
          </Link>

          <Link
            href={`/${lang}/status`}
            className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white glass rounded-2xl hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl w-full sm:w-auto border-2 border-white/20 hover:border-white/40"
          >
            <Search size={24} className="group-hover:scale-110 transition-transform flex-shrink-0" />
            {dict.landing.track}
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-white/50 px-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
            <span>Anonymous & Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse flex-shrink-0" />
            <span>Multilingual Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse flex-shrink-0" />
            <span>24/7 Available</span>
          </div>
        </div>
      </div>
    </main>
  );
}
