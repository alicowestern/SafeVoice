
"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ShieldAlert, ArrowLeft } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        if (res?.error) {
            setError("Invalid credentials")
            setLoading(false)
        } else {
            router.push("/admin")
            router.refresh()
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors mb-6 px-4 py-2 rounded-full border border-transparent hover:border-gray-200 bg-transparent hover:bg-white"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                <div className="card w-full">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[var(--color-background)] p-4 rounded-full">
                            <ShieldAlert className="h-8 w-8 text-[var(--color-primary)]" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-[var(--color-primary)] mb-2">Responder Login</h2>
                    <p className="text-center text-gray-500 mb-8 text-sm">Access the secure admin dashboard.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center border border-red-100">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[var(--color-primary)] text-white py-3 rounded-[var(--radius-lg)] hover:bg-opacity-90 disabled:opacity-50 transition-all font-semibold shadow-sm"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
