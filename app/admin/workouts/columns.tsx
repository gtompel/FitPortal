"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export type Workout = {
  id: string
  title: string
  description: string
  duration: number
  level: string
  calories: number
  createdAt: string
  user: {
    name: string
  }
}

export const columns: ColumnDef<Workout>[] = [
  {
    accessorKey: "title",
    header: "Название",
  },
  {
    accessorKey: "duration",
    header: "Длительность (мин)",
  },
  {
    accessorKey: "level",
    header: "Уровень",
  },
  {
    accessorKey: "calories",
    header: "Калории",
  },
  {
    accessorKey: "user.name",
    header: "Автор",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const workout = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/workouts/${workout.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Редактировать
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                if (confirm("Вы уверены, что хотите удалить эту тренировку?")) {
                  try {
                    const response = await fetch(`/api/workouts/${workout.id}`, {
                      method: "DELETE",
                    })
                    if (response.ok) {
                      window.location.reload()
                    }
                  } catch (error) {
                    console.error("Error deleting workout:", error)
                  }
                }
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
] 