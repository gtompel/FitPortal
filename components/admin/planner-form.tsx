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
import { PlannerEvent } from "@prisma/client"

type User = {
  id: string
  name: string | null
  email: string | null
}

interface PlannerFormProps {
  initialData?: PlannerEvent
}

export function PlannerForm({ initialData }: PlannerFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string>(initialData?.userId || "")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users")
        if (!response.ok) throw new Error("Failed to fetch users")
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      start: formData.get("start"),
      end: formData.get("end"),
      userId: selectedUserId
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
      <div className="space-y-2">
        <Label htmlFor="userId">Пользователь</Label>
        <Select 
          name="userId" 
          required 
          value={selectedUserId}
          onValueChange={setSelectedUserId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите пользователя" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name || user.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start">Дата начала</Label>
          <Input
            id="start"
            name="start"
            type="datetime-local"
            required
            defaultValue={initialData?.start ? new Date(initialData.start).toISOString().slice(0, 16) : ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end">Дата окончания</Label>
          <Input
            id="end"
            name="end"
            type="datetime-local"
            required
            defaultValue={initialData?.end ? new Date(initialData.end).toISOString().slice(0, 16) : ""}
          />
        </div>
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