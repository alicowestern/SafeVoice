import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/header";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

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
      <body className={`${outfit.className} min-h-screen flex flex-col`}>
        <Header lang={lang} />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
