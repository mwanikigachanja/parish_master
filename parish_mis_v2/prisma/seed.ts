import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const password = await hash("adminpassword", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@church.com" },
    update: {},
    create: {
      email: "admin@church.com",
      name: "Admin User",
      password,
      role: "admin",
    },
  })
  console.log({ admin })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

