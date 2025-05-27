"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { use } from "react"

interface DeleteBlogPageProps {
  params: Promise<{
    id: string
  }>
}

export default function DeleteBlogPage({ params }: DeleteBlogPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onDelete() {
    setLoading(true)

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Ошибка при удалении статьи")
      }

      toast.success("Статья успешно удалена")
      router.push("/admin/blog")
      router.refresh()
    } catch (error) {
      toast.error("Произошла ошибка при удалении статьи")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Удалить статью</h1>
      <div className="max-w-2xl">
        <p className="text-muted-foreground mb-6">
          Вы уверены, что хотите удалить эту статью? Это действие нельзя отменить.
        </p>
        <div className="flex gap-4">
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={loading}
          >
            {loading ? "Удаление..." : "Удалить"}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            Отмена
          </Button>
        </div>
      </div>
    </div>
  )
} 