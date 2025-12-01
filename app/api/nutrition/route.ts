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
    const { title, description, duration, level, image_url } = body

    if (!title || !description || !duration || !level) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const plan = await db.plan.create({
      data: {
        title,
        description,
        duration: parseInt(duration),
        level,
        image_url,
        userId: session.user.id
      }
    })

    return NextResponse.json(plan)
  } catch (error) {
    //    console.error("[NUTRITION_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET() {
  try {
    const plans = await db.plan.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    })

    return NextResponse.json(plans)
  } catch (error) {
    //    console.error("[NUTRITION_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 