import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { BlogForm } from "@/components/admin/blog-form"
import { notFound } from "next/navigation"

interface EditBlogPageProps {
  params: {
    id: string
  }
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const post = await db.post.findUnique({
    where: {
      id: params.id
    }
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Редактировать статью</h1>
      <BlogForm initialData={post} />
    </div>
  )
} 