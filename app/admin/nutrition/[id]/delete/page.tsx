"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { use } from "react"

interface DeleteNutritionPageProps {
  params: Promise<{
    id: string
  }>
}

export default function DeleteNutritionPage({ params }: DeleteNutritionPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onDelete() {
    setLoading(true)

    try {
      const response = await fetch(`/api/nutrition/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Ошибка при удалении плана питания")
      }

      toast.success("План питания успешно удален")
      router.push("/admin/nutrition")
      router.refresh()
    } catch (error) {
      toast.error("Произошла ошибка при удалении плана питания")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Удалить план питания</h1>
      <div className="max-w-2xl">
        <p className="text-muted-foreground mb-6">
          Вы уверены, что хотите удалить этот план питания? Это действие нельзя отменить.
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