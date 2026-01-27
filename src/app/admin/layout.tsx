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

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-6 w-6 text-teal-600" />
                            <span className="font-bold text-slate-800 text-lg">SafeVoice Admin</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-500">{session.user?.email}</span>
                            {/* Note: SignOut in NextAuth client side usually. For now just a link or form if strictly server. 
                  We'll use a client component for SignOut later or just simple link to /api/auth/signout 
               */}
                            <Link href="/api/auth/signout" className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1">
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    )
}
