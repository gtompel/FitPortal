import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const workouts = await prisma.workout.findMany({
      where: {
        isFree: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(workouts)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
} 