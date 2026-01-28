"use client"

import { useFormState, useFormStatus } from "react-dom"
import { submitFeedback } from "@/app/actions"
import { useState } from "react"
import { CheckCircle2, AlertCircle } from "lucide-react"

// Types matching the JSON dictionary structure
type Dictionary = {
    common: any
    landing: any
    form: {
        label_category: string
        label_urgency: string
        label_message: string
        placeholder_message: string
        submit_btn: string
    }
}

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 glow"
        >
            {pending ? "Submitting..." : label}
        </button>
    )
}

export function FeedbackForm({ lang, dict }: { lang: string; dict: Dictionary }) {
    const [state, formAction] = useFormState(submitFeedback, {})

    if (state.success && state.referenceCode) {
        return (
            <div className="glass p-6 sm:p-8 rounded-2xl shadow-2xl text-center animate-in fade-in zoom-in duration-500 max-w-lg mx-auto glow">
                <div className="mx-auto flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mb-4 sm:mb-6 animate-bounce shadow-lg">
                    <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Feedback Received</h2>
                <p className="text-white/70 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed px-2">
                    Thank you for your report. Your safety and feedback are our priority.
                </p>

                <div className="glass border-2 border-white/20 p-4 sm:p-6 rounded-xl mb-4 sm:mb-6 relative group hover:border-indigo-400 transition-colors">
                    <p className="text-xs sm:text-sm text-white/60 mb-2 uppercase tracking-widest font-semibold">Reference Code</p>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-wider select-all break-all">
                        {state.referenceCode}
                    </div>
                </div>

                <p className="text-xs sm:text-sm bg-yellow-500/20 text-yellow-200 p-3 sm:p-4 rounded-lg border border-yellow-400/30">
                    <span className="font-semibold">Important:</span> Save this code now. It is the only way to track your status or communicate securely.
                </p>
            </div>
        )
    }

    return (
        <form action={formAction} className="space-y-6 sm:space-y-8 p-6 sm:p-8 md:p-10 glass rounded-2xl shadow-2xl">
            <input type="hidden" name="language" value={lang} />

            {state.error && (
                <div className="p-4 rounded-lg bg-red-500/20 text-red-200 text-sm flex items-start gap-2 border border-red-400/30">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{state.error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-semibold text-white/90">
                        {dict.form.label_category}
                    </label>
                    <div className="relative">
                        <select
                            id="category"
                            name="category"
                            className="block w-full rounded-xl border-white/10 bg-white/5 py-3 sm:py-3.5 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all cursor-pointer hover:bg-white/10 text-white text-sm sm:text-base"
                        >
                            <option value="Access to Services">Access to Services</option>
                            <option value="Staff Behavior & Conduct">Staff Behavior & Conduct</option>
                            <option value="Protection & Safety Concerns">Protection & Safety Concerns</option>
                            <option value="Program Quality & Delivery">Program Quality & Delivery</option>
                            <option value="Information & Communication">Information & Communication</option>
                            <option value="Suggestions & Improvements">Suggestions & Improvements</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="urgency" className="block text-sm font-semibold text-white/90">
                        {dict.form.label_urgency} (How urgent is this issue?)
                    </label>
                    <div className="relative">
                        <select
                            id="urgency"
                            name="urgency"
                            defaultValue="normal"
                            className="block w-full rounded-xl border-white/10 bg-white/5 py-3 sm:py-3.5 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all cursor-pointer hover:bg-white/10 text-white text-sm sm:text-base"
                        >
                            <option value="low">General feedback</option>
                            <option value="normal">Needs attention</option>
                            <option value="high">Serious concern</option>
                            <option value="critical">Urgent safety concern</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="content" className="block text-sm font-semibold text-white/90">
                    {dict.form.label_message}
                </label>
                <textarea
                    id="content"
                    name="content"
                    rows={6}
                    className="block w-full rounded-xl border-white/10 bg-white/5 py-3 sm:py-4 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all placeholder:text-white/40 resize-none text-white text-sm sm:text-base"
                    placeholder={dict.form.placeholder_message}
                    required
                    minLength={10}
                />
                {state.errors?.content && (
                    <p className="mt-1 text-sm text-red-200 bg-red-500/20 p-2 rounded border border-red-400/30">{state.errors.content[0]}</p>
                )}
            </div>

            <SubmitButton label={dict.form.submit_btn} />
        </form>
    )
}
