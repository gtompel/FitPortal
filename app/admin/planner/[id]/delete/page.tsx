"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface DeletePlannerPageProps {
  params: {
    id: string
  }
}

export default function DeletePlannerPage({ params }: DeletePlannerPageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onDelete() {
    setLoading(true)

    try {
      const response = await fetch(`/api/planner/${params.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Ошибка при удалении события")
      }

      toast.success("Событие успешно удалено")
      router.push("/admin/planner")
      router.refresh()
    } catch (error) {
      toast.error("Произошла ошибка при удалении события")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Удалить событие</h1>
      <div className="max-w-2xl">
        <p className="text-muted-foreground mb-6">
          Вы уверены, что хотите удалить это событие? Это действие нельзя отменить.
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