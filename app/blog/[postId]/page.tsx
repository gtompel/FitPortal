import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface BlogPageProps {
  params: {
    postId: string
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!post) {
    redirect("/blog")
  }

  return (
    <div className="container py-10">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Link>
      </Button>
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-muted-foreground">
            Автор: {post.user.name} • Создано:{" "}
            {format(new Date(post.createdAt), "d MMMM yyyy", {
              locale: ru,
            })}
          </p>
        </div>
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  )
} 