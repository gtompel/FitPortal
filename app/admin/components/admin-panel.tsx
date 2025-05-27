"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface AdminPanelProps {
  items: {
    id: string
    title: string
    description?: string
    image_url?: string | null
    isFree?: boolean
    createdAt: Date
    user?: {
      name: string | null
    }
  }[]
  type: "workouts" | "nutrition" | "blog"
  onDelete: (id: string) => Promise<void>
}

export function AdminPanel({ items, type, onDelete }: AdminPanelProps) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id)
      toast.success("Успешно удалено")
      router.refresh()
    } catch (error) {
      toast.error("Что-то пошло не так")
    }
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                {item.description && (
                  <p className="text-sm text-gray-500">{item.description}</p>
                )}
                {item.user?.name && (
                  <p className="text-sm text-gray-500">{item.user.name}</p>
                )}
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                {item.isFree !== undefined && (
                  <p className="text-sm text-gray-500">
                    {item.isFree ? "Бесплатно" : "Платно"}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/free/${type}/${item.id}/edit`}>
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 