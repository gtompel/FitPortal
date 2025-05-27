import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const postSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  content: z.string().min(1, "Содержание обязательно"),
  image_url: z.string().nullable(),
  isFree: z.boolean().default(false)
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const body = postSchema.parse(json)

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        image_url: body.image_url,
        isFree: body.isFree,
        userId: session.user.id
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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const isFree = searchParams.get("isFree") === "true"

    const posts = await prisma.post.findMany({
      where: {
        isFree
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(posts)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
} 