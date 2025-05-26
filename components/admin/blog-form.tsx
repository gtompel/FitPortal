"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { BlogPost } from "@prisma/client"

interface BlogFormProps {
  initialData?: BlogPost
}

export function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      image_url: formData.get("image_url") || null,
    }

    try {
      const response = await fetch(
        initialData ? `/api/blog/${initialData.id}` : "/api/blog",
        {
          method: initialData ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        throw new Error("Ошибка при сохранении статьи")
      }

      toast.success(
        initialData
          ? "Статья успешно обновлена"
          : "Статья успешно создана"
      )
      router.push("/admin/blog")
      router.refresh()
    } catch (error) {
      toast.error("Произошла ошибка при сохранении статьи")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <Label htmlFor="title">Название</Label>
        <Input
          id="title"
          name="title"
          required
          placeholder="Введите название статьи"
          defaultValue={initialData?.title}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Содержание</Label>
        <Textarea
          id="content"
          name="content"
          required
          placeholder="Введите содержание статьи"
          defaultValue={initialData?.content}
          className="min-h-[200px]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image_url">URL изображения</Label>
        <Input
          id="image_url"
          name="image_url"
          type="url"
          placeholder="Введите URL изображения"
          defaultValue={initialData?.image_url || ""}
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading
            ? initialData
              ? "Сохранение..."
              : "Создание..."
            : initialData
            ? "Сохранить"
            : "Создать"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Отмена
        </Button>
      </div>
    </form>
  )
} 