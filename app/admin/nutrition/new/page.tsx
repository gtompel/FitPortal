"use client"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewNutritionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      duration: formData.get("duration"),
      level: formData.get("level"),
      image_url: formData.get("image_url")
    }

    try {
      const response = await fetch("/api/nutrition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error("Failed to create plan")
      }

      router.push("/admin/nutrition")
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Новый план питания</h1>
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
          <Label htmlFor="duration">Длительность (дней)</Label>
          <Input id="duration" name="duration" type="number" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="level">Уровень сложности</Label>
          <Input id="level" name="level" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_url">URL изображения</Label>
          <Input id="image_url" name="image_url" type="url" />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Создание..." : "Создать план"}
        </Button>
      </form>
    </div>
  )
} 