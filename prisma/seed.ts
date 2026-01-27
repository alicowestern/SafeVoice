import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    const passwordHash = await hash("securepassword", 12)

    const admin = await prisma.user.upsert({
        where: { email: "admin@safevoice.org" },
        update: {},
        create: {
            email: "admin@safevoice.org",
            passwordHash,
            role: "ADMIN"
        }
    })

    console.log("Admin created:", admin)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
