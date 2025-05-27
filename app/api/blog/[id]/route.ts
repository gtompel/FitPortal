import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const postSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  content: z.string().min(1, "Содержание обязательно"),
  image_url: z.string().nullable(),
  isFree: z.boolean()
})

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
    const body = postSchema.parse(json)

    const post = await prisma.post.update({
      where: {
        id: params.id,
        userId: session.user.id
      },
      data: {
        title: body.title,
        content: body.content,
        image_url: body.image_url,
        isFree: body.isFree
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.id
      },
      include: {
        user: true
      }
    })

    if (!post) {
      return new NextResponse("Not found", { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: BlogRouteProps) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const post = await prisma.post.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("[BLOG_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 