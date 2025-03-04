import { NextResponse } from "next/server"
import { z } from "zod"

// Define a schema for input validation
const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(["parishioner", "priest", "catechist", "leadership", "admin"]).default("parishioner"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate input
    const result = userSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid input", details: result.error.format() }, { status: 400 })
    }

    const { name, email, password, role } = result.data

    // For preview purposes, just return success
    // In a real app, this would create a user in the database
    return NextResponse.json(
      {
        user: {
          id: "preview-user-id",
          name,
          email,
          role,
        },
        message: "User created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error in registration:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

