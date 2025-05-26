import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

interface WorkoutRouteProps {
  params: {
    id: string
  }
}

export async function PATCH(req: Request, { params }: WorkoutRouteProps) {
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

    const workout = await db.workout.update({
      where: {
        id: params.id
      },
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
    console.error("[WORKOUT_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: WorkoutRouteProps) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const workout = await db.workout.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json(workout)
  } catch (error) {
    console.error("[WORKOUT_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 