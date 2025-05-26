"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { NutritionPlan } from "@prisma/client"

interface NutritionFormProps {
  initialData?: NutritionPlan
}

export function NutritionForm({ initialData }: NutritionFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      title: formData.get("title"),
      description: formData.get("description") || null,
      calories: parseInt(formData.get("calories") as string),
      protein: parseInt(formData.get("protein") as string),
      fat: parseInt(formData.get("fat") as string),
      carbs: parseInt(formData.get("carbs") as string),
      image_url: formData.get("image_url") || null,
    }

    try {
      const response = await fetch(
        initialData ? `/api/nutrition/${initialData.id}` : "/api/nutrition",
        {
          method: initialData ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        throw new Error("Ошибка при сохранении плана питания")
      }

      toast.success(
        initialData
          ? "План питания успешно обновлен"
          : "План питания успешно создан"
      )
      router.push("/admin/nutrition")
      router.refresh()
    } catch (error) {
      toast.error("Произошла ошибка при сохранении плана питания")
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
          placeholder="Введите название плана питания"
          defaultValue={initialData?.title}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Введите описание плана питания"
          defaultValue={initialData?.description || ""}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="calories">Калории</Label>
          <Input
            id="calories"
            name="calories"
            type="number"
            required
            min="0"
            placeholder="Введите количество калорий"
            defaultValue={initialData?.calories}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="protein">Белки (г)</Label>
          <Input
            id="protein"
            name="protein"
            type="number"
            required
            min="0"
            placeholder="Введите количество белков"
            defaultValue={initialData?.protein}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fat">Жиры (г)</Label>
          <Input
            id="fat"
            name="fat"
            type="number"
            required
            min="0"
            placeholder="Введите количество жиров"
            defaultValue={initialData?.fat}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="carbs">Углеводы (г)</Label>
          <Input
            id="carbs"
            name="carbs"
            type="number"
            required
            min="0"
            placeholder="Введите количество углеводов"
            defaultValue={initialData?.carbs}
          />
        </div>
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