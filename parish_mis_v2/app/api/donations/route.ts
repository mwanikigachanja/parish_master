import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

// Define a schema for input validation
const donationSchema = z.object({
  amount: z.number().positive({ message: "Amount must be positive" }),
  purpose: z.string(),
  date: z.string().datetime({ message: "Invalid date format" }),
  method: z.enum(["cash", "check", "online"]),
  isAnonymous: z.boolean().default(false),
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

    // Only allow admins and leadership to view all donations
    if (!userId && !["admin", "leadership"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Only allow admins and leadership to view other users' donations
    if (userId && userId !== session.user.id && !["admin", "leadership"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Build query
    const query: any = {}

    if (userId) {
      query.userId = userId
    } else if (!["admin", "leadership"].includes(session.user.role)) {
      // If no userId specified and not admin/leadership, return current user's donations
      query.userId = session.user.id
    }

    // Get donations
    const donations = await prisma.donation.findMany({
      where: query,
      orderBy: {
        date: "desc",
      },
      select: {
        id: true,
        amount: true,
        purpose: true,
        date: true,
        method: true,
        isAnonymous: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
        // Only include userId if admin or leadership
        userId: ["admin", "leadership"].includes(session.user.role),
      },
    })

    return NextResponse.json(donations)
  } catch (error) {
    console.error("Error fetching donations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    // Validate input
    const result = donationSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid input", details: result.error.format() }, { status: 400 })
    }

    const { amount, purpose, date, method, isAnonymous, notes } = result.data

    // Create donation
    const donation = await prisma.donation.create({
      data: {
        userId: session.user.id,
        amount,
        purpose,
        date: new Date(date),
        method,
        isAnonymous,
        notes,
      },
    })

    return NextResponse.json({ donation, message: "Donation recorded successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error recording donation:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

