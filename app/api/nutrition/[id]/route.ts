import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

interface NutritionRouteProps {
  params: {
    id: string
  }
}

export async function PATCH(req: Request, { params }: NutritionRouteProps) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, description, duration, level, image_url } = body

    if (!title || !description || !duration || !level) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const plan = await db.plan.update({
      where: {
        id: params.id
      },
      data: {
        title,
        description,
        duration: parseInt(duration),
        level,
        image_url
      }
    })

    return NextResponse.json(plan)
  } catch (error) {
    console.error("[NUTRITION_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: NutritionRouteProps) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const plan = await db.plan.findUnique({
      where: {
        id: params.id
      }
    })

    if (!plan) {
      return new NextResponse("Plan not found", { status: 404 })
    }

    await db.plan.delete({
      where: {
        id: params.id
      }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[NUTRITION_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 