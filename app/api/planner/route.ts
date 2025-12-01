import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, description, start, end, userId } = body

    if (!title || !description || !start || !end || !userId) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const event = await db.plannerEvent.create({
      data: {
        title,
        description,
        start: new Date(start),
        end: new Date(end),
        userId: userId
      }
    })

    return NextResponse.json(event)
  } catch (error) {
    //    console.error("[PLANNER_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 