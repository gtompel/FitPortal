"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"

interface MaterialCardProps {
  id: string
  title: string
  type: "workouts" | "nutrition" | "blog"
  category?: string | null
  level?: string
  user?: {
    name: string | null
  }
  createdAt: Date
  isFree?: boolean
  onDelete: () => Promise<void>
}

export function MaterialCard({
  id,
  title,
  type,
  category,
  level,
  user,
  createdAt,
  isFree,
  onDelete
}: MaterialCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            {category && (
              <p className="text-sm text-gray-500">{category}</p>
            )}
            {level && (
              <p className="text-sm text-gray-500">{level}</p>
            )}
            {user?.name && (
              <p className="text-sm text-gray-500">{user.name}</p>
            )}
            <p className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString()}
            </p>
            {isFree !== undefined && (
              <p className="text-sm text-gray-500">
                {isFree ? "Бесплатно" : "Платно"}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/free/${type}/${id}/edit`}>
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              onClick={onDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 