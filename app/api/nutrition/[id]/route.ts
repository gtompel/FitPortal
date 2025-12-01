import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const planSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  duration: z.number().min(1, "Длительность обязательна"),
  level: z.string().min(1, "Уровень обязателен"),
  image_url: z.string().nullable(),
  isFree: z.boolean()
})

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const plan = await prisma.plan.findUnique({
      where: {
        id: params.id
      }
    })

    if (!plan) {
      return new NextResponse("Not found", { status: 404 })
    }

    return NextResponse.json(plan)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const body = planSchema.parse(json)

    const plan = await prisma.plan.update({
      where: {
        id: params.id
      },
      data: {
        title: body.title,
        description: body.description,
        duration: body.duration,
        level: body.level,
        image_url: body.image_url,
        isFree: body.isFree
      }
    })

    return NextResponse.json(plan)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const plan = await prisma.plan.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json(plan)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
} 