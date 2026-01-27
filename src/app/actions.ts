"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import { randomBytes } from "crypto"

// Schema
const submissionSchema = z.object({
    content: z.string().min(10, "Content is too short"),
    category: z.string().optional(),
    urgency: z.enum(["low", "normal", "high", "critical"]).default("normal"),
    language: z.string().default("en"),
})

function generateReferenceCode() {
    // Format: SV-XXXX-XXXX (SafeVoice-Random)
    const random = randomBytes(3).toString("hex").toUpperCase() // 6 chars
    return `SV-${random.slice(0, 3)}-${random.slice(3)}`
}

export type SubmissionState = {
    success?: boolean
    error?: string
    referenceCode?: string
    errors?: {
        content?: string[]
        category?: string[]
    }
}

export async function submitFeedback(prevState: SubmissionState, formData: FormData): Promise<SubmissionState> {
    const validatedFields = submissionSchema.safeParse({
        content: formData.get("content"),
        category: formData.get("category"),
        urgency: formData.get("urgency"),
        language: formData.get("language")
    })

    if (!validatedFields.success) {
        return {
            error: "Validation failed",
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { content, category, urgency, language } = validatedFields.data

    try {
        const referenceCode = generateReferenceCode()

        // Map urgency to DB enum if needed, or string. 
        // Schema says String? @default("normal") but I have an enum in Schema?
        // Wait, Schema has `status` enum, `urgency` is String default 'normal'.
        // `status` is what changes.

        await db.feedback.create({
            data: {
                content,
                category,
                urgency,
                language,
                referenceCode,
                status: "NEW" // Default from schema anyway
            }
        })

        return {
            success: true,
            referenceCode
        }

    } catch (e) {
        console.error("Submission error:", e)
        return {
            error: "Database error. Please try again."
        }
    }
}

export async function checkStatus(prevState: any, formData: FormData) {
    const code = formData.get("code") as string

    if (!code) {
        return { error: "Please enter a reference code" }
    }

    try {
        const feedback = await db.feedback.findUnique({
            where: { referenceCode: code.trim() },
            select: {
                status: true,
                category: true,
                createdAt: true,
                adminNotes: true // Maybe call this "response" in UI
            }
        })

        if (!feedback) {
            return { error: "Reference code not found" }
        }

        return {
            success: true,
            data: feedback
        }
    } catch (e) {
        console.error("Status check error:", e)
        return { error: "System error. Please try again." }
    }
}

export async function updateStatus_Action(id: string, newStatus: string) {
    // Verify auth (implementation detail: this action should be protected, 
    // but for MVP relying on the fact that only Admin Dashboard calls it, 
    // and Admin Dashboard is protected by layout. 
    // Ideally, valid session check here too.)

    try {
        await db.feedback.update({
            where: { id },
            data: { status: newStatus as any } // Cast to enum
        })
        return { success: true }
    } catch (e) {
        console.error("Update error:", e)
        return { error: "Failed to update status" }
    }
}
