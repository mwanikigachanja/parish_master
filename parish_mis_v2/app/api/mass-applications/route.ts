import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

// Define a schema for input validation
const massApplicationSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z.string(),
  requestedDate: z.string().datetime({ message: "Invalid date format" }),
  location: z.string(),
  notes: z.string().optional(),
})

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    // Build query
    const query: any = {}

    // Filter by status if provided
    if (status && ["pending", "approved", "denied", "cancelled"].includes(status)) {
      query.status = status
    }

    // Different queries based on user role
    if (["priest", "admin"].includes(session.user.role)) {
      // Priests and admins can see all applications
      // No additional filters
    } else if (session.user.role === "catechist") {
      // Catechists can see applications pending their approval
      // In a real app, we would have a more complex query to determine which applications a catechist can approve
      query.status = "pending"
    } else {
      // Regular users can only see their own applications
      query.applicantId = session.user.id
    }

    // Get mass applications
    const applications = await prisma.massApplication.findMany({
      where: query,
      orderBy: {
        requestedDate: "asc",
      },
      include: {
        applicant: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        approver: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching mass applications:", error)
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
    const result = massApplicationSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid input", details: result.error.format() }, { status: 400 })
    }

    const { title, description, requestedDate, location, notes } = result.data

    // Create mass application
    const application = await prisma.massApplication.create({
      data: {
        title,
        description,
        requestedDate: new Date(requestedDate),
        location,
        notes,
        applicantId: session.user.id,
        status: "pending",
      },
    })

    return NextResponse.json({ application, message: "Mass application submitted successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error submitting mass application:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

