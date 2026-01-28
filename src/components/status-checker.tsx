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
            className="absolute right-2 top-2 bottom-2 aspect-square bg-[var(--color-primary)] text-white rounded-full hover:bg-opacity-90 disabled:opacity-50 transition-all flex items-center justify-center shadow-sm"
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
                    className="w-full pl-6 pr-16 py-4 rounded-full border border-gray-300 bg-white focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 text-lg uppercase tracking-wider font-mono transition-all shadow-sm text-gray-900 placeholder:text-gray-400"
                    required
                />
                <SearchButton />
            </form>

            {state.error && (
                <div className="text-center p-4 bg-red-50 text-red-700 rounded-lg animate-in fade-in slide-in-from-top-2 border border-red-100">
                    {state.error}
                </div>
            )}

            {state.success && state.data && (
                <div className="card text-left animate-in fade-in zoom-in duration-300 border border-gray-100">
                    <div className="p-0">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <span className="text-sm font-medium text-gray-500">Status</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${state.data.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                                state.data.status === 'IN_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                                }`}>
                                {state.data.status.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Submitted</p>
                                    <p className="font-medium text-gray-900">
                                        {new Date(state.data.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-500">Category</p>
                                    <p className="font-medium text-gray-900">{state.data.category || 'General'}</p>
                                </div>
                            </div>

                            {state.data.adminNotes && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Response</h4>
                                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg text-sm border border-gray-200">
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
