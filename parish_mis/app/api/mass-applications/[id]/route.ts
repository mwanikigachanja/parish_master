import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

// Define a schema for input validation
const updateApplicationSchema = z.object({
  status: z.enum(["pending", "approved", "denied", "cancelled"]),
  notes: z.string().optional(),
})

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Get the application
    const application = await prisma.massApplication.findUnique({
      where: { id },
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

    if (!application) {
      return NextResponse.json({ error: "Mass application not found" }, { status: 404 })
    }

    // Check if user has permission to view this application
    const isApplicant = application.applicantId === session.user.id
    const isApprover = ["priest", "admin", "catechist"].includes(session.user.role)

    if (!isApplicant && !isApprover) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error fetching mass application:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const id = params.id
    const body = await req.json()
    
    // Validate input
    const result = updateApplicationSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.format() },
        { status: 400 }
      )
    }
    
    const { status, notes } = result.data
    
    // Get the application
    const application = await prisma.massApplication.findUnique({
      where: { id },
    })
    
    if (!application) {
      return NextResponse.json(
        { error: "Mass application not found" },
        { status: 404 }
      )
    }
    
    // Check if user has permission to update this application
    const isApplicant = application.applicantId === session.user.id\
    const isApprover = ["priest\", \"admin

