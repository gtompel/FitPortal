"use client"

import { useState } from "react"
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
import { Category, Workout } from "@prisma/client"

interface WorkoutFormProps {
  categories: Category[]
  initialData?: Workout
}

export function WorkoutForm({ categories, initialData }: WorkoutFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      title: formData.get("title"),
      description: formData.get("description") || null,
      duration: parseInt(formData.get("duration") as string),
      level: formData.get("level"),
      categoryId: formData.get("categoryId"),
      image_url: formData.get("image_url") || null,
      calories: formData.get("calories") ? parseInt(formData.get("calories") as string) : null,
    }

    try {
      const response = await fetch(
        initialData ? `/api/workouts/${initialData.id}` : "/api/workouts",
        {
          method: initialData ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        throw new Error("Ошибка при сохранении тренировки")
      }

      toast.success(
        initialData
          ? "Тренировка успешно обновлена"
          : "Тренировка успешно создана"
      )
      router.push("/admin/workouts")
      router.refresh()
    } catch (error) {
      toast.error("Произошла ошибка при сохранении тренировки")
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
          placeholder="Введите название тренировки"
          defaultValue={initialData?.title}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Введите описание тренировки"
          defaultValue={initialData?.description || ""}
        />
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
            defaultValue={initialData?.duration}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="level">Уровень</Label>
          <Select name="level" required defaultValue={initialData?.level}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите уровень" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Начинающий</SelectItem>
              <SelectItem value="intermediate">Средний</SelectItem>
              <SelectItem value="advanced">Продвинутый</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="categoryId">Категория</Label>
        <Select name="categoryId" required defaultValue={initialData?.categoryId}>
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
      <div className="space-y-2">
        <Label htmlFor="calories">Калории</Label>
        <Input
          id="calories"
          name="calories"
          type="number"
          min="0"
          placeholder="Введите количество калорий"
          defaultValue={initialData?.calories || ""}
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