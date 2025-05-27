"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Workout } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

export const columns: ColumnDef<Workout>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Название
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "duration",
    header: "Длительность",
    cell: ({ row }) => {
      return <div>{row.original.duration} мин</div>
    },
  },
  {
    accessorKey: "level",
    header: "Уровень",
  },
  {
    accessorKey: "calories",
    header: "Калории",
    cell: ({ row }) => {
      return <div>{row.original.calories} ккал</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: "Дата создания",
    cell: ({ row }) => {
      return (
        <div>
          {format(new Date(row.original.createdAt), "d MMMM yyyy", {
            locale: ru,
          })}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/free-workouts/${row.original.id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="destructive" size="sm">
            <Link href={`/admin/free-workouts/${row.original.id}/delete`}>
              <Trash2 className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )
    },
  },
] 