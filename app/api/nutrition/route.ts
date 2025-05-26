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
    const { title, description, calories, protein, fat, carbs, image_url } = body

    if (!title || !calories || !protein || !fat || !carbs) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const plan = await db.nutritionPlan.create({
      data: {
        title,
        description,
        calories,
        protein,
        fat,
        carbs,
        image_url
      }
    })

    return NextResponse.json(plan)
  } catch (error) {
    console.error("[NUTRITION_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 