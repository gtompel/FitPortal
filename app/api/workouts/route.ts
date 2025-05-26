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
    const { title, description, duration, level, categoryId, image_url, calories } = body

    if (!title || !duration || !level || !categoryId) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const workout = await db.workout.create({
      data: {
        title,
        description,
        duration,
        level,
        categoryId,
        image_url,
        calories
      }
    })

    return NextResponse.json(workout)
  } catch (error) {
    console.error("[WORKOUTS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const workouts = await db.workout.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(workouts)
  } catch (error) {
    console.log("[WORKOUTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 