import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: Request,
  { params }: { params: { workoutId: string } }
) {
  try {
    const workout = await prisma.workout.delete({
      where: {
        id: params.workoutId,
      },
    })

    return NextResponse.json(workout)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
} 