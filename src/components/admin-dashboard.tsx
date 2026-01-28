"use client"

import { useState, useTransition } from "react"
import { updateStatus_Action } from "@/app/actions"
import { Filter, Inbox, CheckCircle2, Clock, AlertTriangle, MessageSquare, Send } from "lucide-react"
import { useRouter } from "next/navigation"

type Feedback = {
    id: string
    referenceCode: string
    content: string
    language: string
    status: string // Enum
    category: string | null
    urgency: string | null
    adminNotes: string | null
    adminResponse: string | null
    createdAt: Date
}

export function AdminDashboard({ initialFeedbacks }: { initialFeedbacks: Feedback[] }) {
    const [filter, setFilter] = useState("ALL")
    const [feedbacks, setFeedbacks] = useState(initialFeedbacks)
    const router = useRouter()

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
                            <FeedbackItem key={item.id} item={item} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

function FeedbackItem({ item }: { item: Feedback }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [response, setResponse] = useState(item.adminResponse || "")
    const [status, setStatus] = useState(item.status)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleUpdate = () => {
        startTransition(async () => {
            await updateStatus_Action(item.id, status, response)
            setIsExpanded(false)
            router.refresh()
        })
    }

    return (
        <li className="p-6 hover:bg-slate-50 transition-colors">
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

            {item.adminResponse && (
                <div className="mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs font-bold text-blue-800 mb-1">Admin Response:</p>
                    <p className="text-sm text-blue-900">{item.adminResponse}</p>
                </div>
            )}

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                    <span className={`text-xs font-medium flex items-center gap-1 ${item.status === 'NEW' ? 'text-blue-600' : 'text-green-600'}`}>
                        {item.status === 'NEW' ? <Clock className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                        {item.status}
                    </span>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-sm text-slate-500 hover:text-slate-900 font-medium"
                >
                    {isExpanded ? "Cancel" : "Update Status / Reply"}
                </button>
            </div>

            {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full text-sm border-slate-200 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500"
                            >
                                <option value="NEW">New</option>
                                <option value="IN_REVIEW">In Review</option>
                                <option value="RESPONDED">Responded</option>
                                <option value="RESOLVED">Resolved</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Response (Visible to anonymous user)</label>
                            <textarea
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                className="w-full text-sm border-slate-200 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500"
                                rows={3}
                                placeholder="Write a response..."
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleUpdate}
                                disabled={isPending}
                                className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isPending ? "Updating..." : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        Update Feedback
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </li>
    )
}
