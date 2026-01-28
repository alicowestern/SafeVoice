import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google"; // Multilingual support
import "../globals.css";
import { Header } from "@/components/header";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SafeVoice - Secure Community Feedback",
  description: "Anonymous and secure feedback platform.",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "am" }, { lang: "ti" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className={`${notoSans.className} min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]`}>
        <Header lang={lang} />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
