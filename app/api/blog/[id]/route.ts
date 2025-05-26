import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

interface BlogRouteProps {
  params: {
    id: string
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

    const post = await db.post.delete({
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