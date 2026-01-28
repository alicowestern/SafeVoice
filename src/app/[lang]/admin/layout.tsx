import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ShieldCheck, LogOut } from "lucide-react"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any).role !== "ADMIN") {
        redirect("/")
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="bg-[var(--color-primary)] p-1.5 rounded-lg text-white">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-[var(--color-primary)] text-lg">SafeVoice Admin</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">{session.user?.email}</span>
                            <Link href="/api/auth/signout" className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1 font-medium transition-colors">
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    )
}
