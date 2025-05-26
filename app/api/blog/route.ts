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
    const { title, content, image_url } = body

    if (!title || !content) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const post = await db.post.create({
      data: {
        title,
        content,
        image_url,
        authorId: session.user.id
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("[BLOG_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 