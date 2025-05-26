import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { BlogForm } from "@/components/admin/blog-form"

export default async function CreateBlogPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Создать статью</h1>
      <BlogForm />
    </div>
  )
} 