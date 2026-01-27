"use client"

import { useState } from "react"
import { updateStatus_Action } from "@/app/actions" // Need to implement this
import { Filter, Inbox, CheckCircle2, Clock, AlertTriangle } from "lucide-react"

type Feedback = {
    id: string
    referenceCode: string
    content: string
    language: string
    status: string // Enum
    category: string | null
    urgency: string | null
    adminNotes: string | null
    createdAt: Date
}

export function AdminDashboard({ initialFeedbacks }: { initialFeedbacks: Feedback[] }) {
    const [filter, setFilter] = useState("ALL")
    const [feedbacks, setFeedbacks] = useState(initialFeedbacks)

    const filtered = feedbacks.filter(f => {
        if (filter === "ALL") return true
        if (filter === "NEW") return f.status === "NEW"
        if (filter === "URGENT") return ["high", "critical"].includes(f.urgency || "")
        return true
    })

    return (
        <div>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {["ALL", "NEW", "URGENT"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f
                                ? "bg-slate-900 text-white"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        {f === "ALL" ? "All Feedback" : f === "NEW" ? "New" : "High Priority"}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {filtered.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <Inbox className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                        <p>No feedback found.</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-100">
                        {filtered.map((item) => (
                            <li key={item.id} className="p-6 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${item.urgency === 'critical' ? 'bg-red-100 text-red-700' :
                                                item.urgency === 'high' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-slate-100 text-slate-600'
                                            }`}>
                                            {item.urgency}
                                        </span>
                                        <span className="text-xs font-mono text-slate-400">{item.referenceCode}</span>
                                        <span className="text-xs text-slate-400 uppercase">{item.language}</span>
                                    </div>
                                    <span className="text-xs text-slate-400">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="text-sm font-medium text-slate-900 mb-1">{item.category || "Uncategorized"}</h3>
                                <p className="text-slate-700 leading-relaxed mb-4">{item.content}</p>

                                <div className="flex items-center gap-4">
                                    {/* Status Actions would go here - keeping it simple for MVP */}
                                    <span className={`text-xs font-medium flex items-center gap-1 ${item.status === 'NEW' ? 'text-blue-600' : 'text-green-600'
                                        }`}>
                                        {item.status === 'NEW' ? <Clock className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                                        {item.status}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
