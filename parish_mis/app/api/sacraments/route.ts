import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

// Define a schema for input validation
const sacramentSchema = z.object({
  type: z.enum(["baptism", "communion", "confirmation", "marriage", "anointing"]),
  userId: z.string().optional(),
  date: z.string().datetime({ message: "Invalid date format" }),
  location: z.string(),
  minister: z.string(),
  certificate: z.boolean().default(false),
  notes: z.string().optional(),
})

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    // Only allow admins and priests to view other users' sacraments
    if (userId && userId !== session.user.id && !["admin", "priest"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Build query
    const query: any = {}

    if (userId) {
      query.userId = userId
    } else {
      // If no userId specified, return current user's sacraments
      query.userId = session.user.id
    }

    // Get sacraments
    const sacraments = await prisma.sacrament.findMany({
      where: query,
      orderBy: {
        date: "desc",
      },
    })

    return NextResponse.json(sacraments)
  } catch (error) {
    console.error("Error fetching sacraments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session || !["priest", "admin"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    // Validate input
    const result = sacramentSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid input", details: result.error.format() }, { status: 400 })
    }

    const { type, userId, date, location, minister, certificate, notes } = result.data

    // Create sacrament
    const sacrament = await prisma.sacrament.create({
      data: {
        type,
        userId: userId || session.user.id,
        date: new Date(date),
        location,
        minister,
        certificate,
        notes,
      },
    })

    return NextResponse.json({ sacrament, message: "Sacrament recorded successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error recording sacrament:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

