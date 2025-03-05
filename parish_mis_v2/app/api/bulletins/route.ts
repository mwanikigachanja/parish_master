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

    const { title, content, date, isPublic, pdfUrl } = await req.json()

    const bulletin = await prisma.bulletin.create({
      data: {
        title,
        content,
        date: new Date(date),
        isPublic,
        pdfUrl,
      },
    })

    return NextResponse.json(bulletin)
  } catch (error) {
    console.error("Error creating bulletin:", error)
    return NextResponse.json({ error: "Error creating bulletin" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const isPublic = searchParams.get("public") === "true"

    const bulletins = await prisma.bulletin.findMany({
      where: {
        isPublic: isPublic || undefined,
      },
      orderBy: {
        date: "desc",
      },
    })

    return NextResponse.json(bulletins)
  } catch (error) {
    console.error("Error fetching bulletins:", error)
    return NextResponse.json({ error: "Error fetching bulletins" }, { status: 500 })
  }
}

