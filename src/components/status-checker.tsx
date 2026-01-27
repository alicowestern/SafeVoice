"use client"

import { useFormState, useFormStatus } from "react-dom"
import { checkStatus } from "@/app/actions"
import { Search, Loader2, Clock, CheckCircle2, MessageSquare } from "lucide-react"

function SearchButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 transition-all flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 glow"
        >
            {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
        </button>
    )
}

export function StatusChecker({ dict }: { dict: any }) {
    // Initial state matching the expected shape, with empty error
    const [state, formAction] = useFormState(checkStatus, { error: "" } as any)

    return (
        <div className="w-full max-w-md mx-auto">
            <form action={formAction} className="relative mb-8 group">
                <input
                    name="code"
                    type="text"
                    placeholder="Enter Reference Code"
                    className="w-full pl-6 pr-16 py-4 rounded-full border-2 border-white/10 glass focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 text-lg uppercase tracking-wider font-mono transition-all shadow-lg group-hover:shadow-xl text-white placeholder:text-white/40"
                    required
                />
                <SearchButton />
            </form>

            {state.error && (
                <div className="text-center p-4 bg-red-500/20 text-red-200 rounded-lg animate-in fade-in slide-in-from-top-2 border border-red-400/30">
                    {state.error}
                </div>
            )}

            {state.success && state.data && (
                <div className="glass rounded-xl shadow-2xl overflow-hidden border border-white/10 animate-in fade-in zoom-in duration-300 glow">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-white/60">Status</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${state.data.status === 'RESOLVED' ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                                    state.data.status === 'IN_REVIEW' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' :
                                        'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                                }`}>
                                {state.data.status.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-white/40 mt-0.5" />
                                <div>
                                    <p className="text-sm text-white/60">Submitted</p>
                                    <p className="font-medium text-white">
                                        {new Date(state.data.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MessageSquare className="h-5 w-5 text-white/40 mt-0.5" />
                                <div>
                                    <p className="text-sm text-white/60">Category</p>
                                    <p className="font-medium text-white">{state.data.category || 'General'}</p>
                                </div>
                            </div>

                            {state.data.adminNotes && (
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <h4 className="text-sm font-medium text-white mb-2">Response</h4>
                                    <p className="text-white/70 glass p-4 rounded-lg text-sm">
                                        {state.data.adminNotes}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
