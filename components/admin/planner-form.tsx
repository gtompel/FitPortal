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
import { PlannerEvent } from "@prisma/client"

interface PlannerFormProps {
  initialData?: PlannerEvent
}

export function PlannerForm({ initialData }: PlannerFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      title: formData.get("title"),
      description: formData.get("description") || null,
      date: formData.get("date"),
      type: formData.get("type"),
      image_url: formData.get("image_url") || null,
    }

    try {
      const response = await fetch(
        initialData ? `/api/planner/${initialData.id}` : "/api/planner",
        {
          method: initialData ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        throw new Error("Ошибка при сохранении события")
      }

      toast.success(
        initialData
          ? "Событие успешно обновлено"
          : "Событие успешно создано"
      )
      router.push("/admin/planner")
      router.refresh()
    } catch (error) {
      toast.error("Произошла ошибка при сохранении события")
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
          placeholder="Введите название события"
          defaultValue={initialData?.title}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Введите описание события"
          defaultValue={initialData?.description || ""}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Дата</Label>
          <Input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Тип</Label>
          <Select name="type" required defaultValue={initialData?.type}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="workout">Тренировка</SelectItem>
              <SelectItem value="nutrition">Питание</SelectItem>
              <SelectItem value="other">Другое</SelectItem>
            </SelectContent>
          </Select>
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