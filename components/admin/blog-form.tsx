"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { BlogPost } from "@prisma/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { blogFormSchema } from "@/lib/validations/blog"

interface BlogFormProps {
  initialData?: BlogPost
  isFree?: boolean
}

export function BlogForm({ initialData, isFree = false }: BlogFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      image_url: initialData?.image_url || "",
      isFree: initialData?.isFree || isFree
    }
  })

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      image_url: formData.get("image_url") || null,
      isFree: formData.get("isFree") === "true"
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
          {...form.register("title")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Содержание</Label>
        <Textarea
          id="content"
          name="content"
          required
          placeholder="Введите содержание статьи"
          {...form.register("content")}
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
          {...form.register("image_url")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="isFree">Бесплатное содержание</Label>
        <input
          id="isFree"
          name="isFree"
          type="checkbox"
          {...form.register("isFree")}
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Сохранение..."
            : "Сохранить"}
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