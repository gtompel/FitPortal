"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowUpDown, Pencil } from "lucide-react"

export type Material = {
  id: string
  title: string
  type: "WORKOUT" | "BLOG" | "NUTRITION"
  category?: {
    name: string
  } | null
  user?: {
    name: string
  } | null
  createdAt: Date
  description?: string
  level?: string
  duration?: number
  image_url?: string | null
}

export const columns: ColumnDef<Material>[] = [
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
    accessorKey: "type",
    header: "Тип",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <div className="capitalize">
          {type === "WORKOUT" && "Тренировка"}
          {type === "BLOG" && "Статья"}
          {type === "NUTRITION" && "План питания"}
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Категория",
    cell: ({ row }) => {
      const category = row.original.category
      return category?.name || "-"
    },
  },
  {
    accessorKey: "user",
    header: "Автор",
    cell: ({ row }) => {
      const user = row.original.user
      return user?.name || "-"
    },
  },
  {
    accessorKey: "createdAt",
    header: "Дата создания",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const material = row.original
      const type = material.type.toLowerCase()
      return (
        <Button variant="ghost" asChild>
          <Link href={`/admin/free/${type}/${material.id}`}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
      )
    },
  },
] 