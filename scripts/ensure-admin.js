const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    try {
        console.log("Checking for admin user...")
        const existingAdmin = await prisma.user.findUnique({
            where: { email: "admin@safevoice.org" }
        })

        if (existingAdmin) {
            console.log("Admin user already exists.")
        } else {
            console.log("Creating admin user...")
            const passwordHash = await hash("securepassword", 12)
            await prisma.user.create({
                data: {
                    email: "admin@safevoice.org",
                    passwordHash,
                    role: "ADMIN"
                }
            })
            console.log("Admin user created successfully.")
        }
    } catch (e) {
        console.error("Error in ensure-admin:", e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
