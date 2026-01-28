import { db } from "@/lib/db"
import { AdminDashboard } from "@/components/admin-dashboard"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
    // Fetch initial data
    const feedbacks = await db.feedback.findMany({
        orderBy: { createdAt: "desc" },
        take: 100 // Limit for MVF
    })

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Inbox</h1>
                <p className="text-slate-600">Review and respond to community feedback.</p>
            </div>
            <AdminDashboard initialFeedbacks={feedbacks} />
        </div>
    )
}
