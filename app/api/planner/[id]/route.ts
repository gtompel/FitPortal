import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

interface PlannerRouteProps {
  params: {
    id: string
  }
}

export async function PATCH(req: Request, { params }: PlannerRouteProps) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, description, date, type, image_url } = body

    if (!title || !date || !type) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const event = await db.plannerEvent.update({
      where: {
        id: params.id
      },
      data: {
        title,
        description,
        date: new Date(date),
        type,
        image_url
      }
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error("[PLANNER_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: PlannerRouteProps) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const event = await db.plannerEvent.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error("[PLANNER_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 