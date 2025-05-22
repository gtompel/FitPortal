import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, description, duration, level, categoryId, image_url, calories } = body

    const workout = await prisma.workout.create({
      data: {
        title,
        description,
        duration,
        level,
        categoryId,
        image_url,
        calories,
      },
    })

    return NextResponse.json(workout)
  } catch (error) {
    console.log("[WORKOUTS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const workouts = await prisma.workout.findMany({
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