import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !["admin", "priest", "leadership"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description, date, time, location, type, isPublic } = await req.json()

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        type,
        isPublic,
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Error creating event" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const isPublic = searchParams.get("public") === "true"
    const type = searchParams.get("type") as "mass" | "event" | null

    const events = await prisma.event.findMany({
      where: {
        isPublic: isPublic || undefined,
        type: type || undefined,
      },
      orderBy: {
        date: "asc",
      },
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Error fetching events" }, { status: 500 })
  }
}

