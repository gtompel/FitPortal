"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface Category {
  id: string
  name: string
}

export default function NewWorkoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      duration: parseInt(formData.get("duration") as string),
      level: formData.get("level"),
      calories: parseInt(formData.get("calories") as string),
      image_url: formData.get("image_url"),
      video_url: formData.get("video_url"),
      categoryId: formData.get("categoryId"),
      isFree: false,
    }

    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create workout")
      }

      toast.success("Тренировка успешно создана")
      router.push("/admin/workouts")
    } catch (error) {
      toast.error("Ошибка при создании тренировки")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Новая тренировка</h2>
        <p className="text-muted-foreground">
          Добавьте новую тренировку
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Название</Label>
          <Input
            id="title"
            name="title"
            required
            placeholder="Введите название тренировки"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Описание</Label>
          <Textarea
            id="description"
            name="description"
            required
            placeholder="Введите описание тренировки"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoryId">Категория</Label>
          <Select name="categoryId" required>
            <SelectTrigger>
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Длительность (минуты)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              required
              min="1"
              placeholder="30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Уровень</Label>
            <Input
              id="level"
              name="level"
              required
              placeholder="Начальный"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="calories">Калории</Label>
          <Input
            id="calories"
            name="calories"
            type="number"
            required
            min="1"
            placeholder="300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_url">URL изображения</Label>
          <Input
            id="image_url"
            name="image_url"
            type="url"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="video_url">URL видео</Label>
          <Input
            id="video_url"
            name="video_url"
            type="url"
            placeholder="https://example.com/video.mp4"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Отмена
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Создание..." : "Создать"}
          </Button>
        </div>
      </form>
    </div>
  )
} 