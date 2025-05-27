import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const postSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  content: z.string().min(1, "Содержание обязательно"),
  image_url: z.string().nullable(),
  isFree: z.boolean()
})

interface BlogRouteProps {
  params: {
    id: string
  }
}

export async function GET(req: Request, { params }: BlogRouteProps) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const post = await db.post.findUnique({
      where: {
        id: params.id
      }
    })

    if (!post) {
      return new NextResponse("Post not found", { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("[BLOG_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: BlogRouteProps) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, content, image_url } = body

    if (!title || !content) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const post = await db.post.update({
      where: {
        id: params.id
      },
      data: {
        title,
        content,
        image_url
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("[BLOG_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: BlogRouteProps) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const post = await db.post.findUnique({
      where: {
        id: params.id
      }
    })

    if (!post) {
      return new NextResponse("Post not found", { status: 404 })
    }

    await db.post.delete({
      where: {
        id: params.id
      }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[BLOG_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 