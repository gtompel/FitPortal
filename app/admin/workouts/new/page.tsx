"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Category {
  id: string
  name: string
}

export default function NewWorkoutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      duration: formData.get("duration"),
      level: formData.get("level"),
      calories: formData.get("calories"),
      image_url: formData.get("image_url"),
      video_url: formData.get("video_url"),
      categoryId: formData.get("categoryId")
    }

    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error("Failed to create workout")
      }

      router.push("/admin/workouts")
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Новая тренировка</h1>
      <form onSubmit={onSubmit} className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="title">Название</Label>
          <Input id="title" name="title" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Описание</Label>
          <Textarea id="description" name="description" required />
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
        <div className="space-y-2">
          <Label htmlFor="duration">Длительность (минут)</Label>
          <Input id="duration" name="duration" type="number" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="level">Уровень сложности</Label>
          <Input id="level" name="level" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="calories">Калории</Label>
          <Input id="calories" name="calories" type="number" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_url">URL изображения</Label>
          <Input id="image_url" name="image_url" type="url" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="video_url">URL видео</Label>
          <Input id="video_url" name="video_url" type="url" />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Создание..." : "Создать тренировку"}
        </Button>
      </form>
    </div>
  )
} 