import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await request.json()

    const workout = await db.workout.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    })

    return NextResponse.json(workout)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const isFree = searchParams.get("isFree")

    const workouts = await db.workout.findMany({
      where: {
        isFree: isFree === "true" ? true : isFree === "false" ? false : undefined
      },
      include: {
        category: true,
        user: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(workouts)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
} 