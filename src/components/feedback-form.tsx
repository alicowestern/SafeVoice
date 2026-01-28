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
            className="w-full flex justify-center py-4 px-6 rounded-[var(--radius-lg)] shadow-sm text-lg font-bold text-white bg-[var(--color-primary)] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
            {pending ? "Submitting..." : label}
        </button>
    )
}

export function FeedbackForm({ lang, dict }: { lang: string; dict: Dictionary }) {
    const [state, formAction] = useFormState(submitFeedback, {})

    if (state.success && state.referenceCode) {
        return (
            <div className="card text-center animate-in fade-in zoom-in duration-500 max-w-lg mx-auto border border-gray-100">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-50 mb-6">
                    <CheckCircle2 className="h-10 w-10 text-[var(--color-secondary)]" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">Feedback Received</h2>
                <p className="text-gray-600 mb-8 text-base leading-relaxed px-2">
                    Thank you for your report. Your safety and feedback are our priority.
                </p>

                <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl mb-6 relative">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-semibold">Reference Code</p>
                    <div className="font-mono text-3xl font-bold text-[var(--color-primary)] tracking-wider select-all">
                        {state.referenceCode}
                    </div>
                </div>

                <p className="text-sm bg-blue-50 text-blue-800 p-4 rounded-lg border border-blue-100">
                    <span className="font-semibold">Important:</span> Save this code now. It is the only way to track your status.
                </p>
            </div>
        )
    }

    return (
        <form action={formAction} className="space-y-8 card border border-gray-100 shadow-sm">
            <input type="hidden" name="language" value={lang} />

            {state.error && (
                <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm flex items-start gap-2 border border-red-100">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{state.error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                        {dict.form.label_category}
                    </label>
                    <div className="relative">
                        <select
                            id="category"
                            name="category"
                            className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] transition-all cursor-pointer text-gray-900 text-base"
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
                    <label htmlFor="urgency" className="block text-sm font-semibold text-gray-700">
                        {dict.form.label_urgency}
                    </label>
                    <div className="relative">
                        <select
                            id="urgency"
                            name="urgency"
                            defaultValue="normal"
                            className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] transition-all cursor-pointer text-gray-900 text-base"
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
                <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
                    {dict.form.label_message}
                </label>
                <textarea
                    id="content"
                    name="content"
                    rows={6}
                    className="block w-full rounded-lg border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] transition-all placeholder:text-gray-400 resize-none text-gray-900 text-base"
                    placeholder={dict.form.placeholder_message}
                    required
                    minLength={10}
                />
                {state.errors?.content && (
                    <p className="mt-1 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-100">{state.errors.content[0]}</p>
                )}
            </div>

            <SubmitButton label={dict.form.submit_btn} />
        </form>
    )
}
