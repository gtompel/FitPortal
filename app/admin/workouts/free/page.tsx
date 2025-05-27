"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function FreeWorkoutsPage() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts/free")
      const data = await response.json()
      setWorkouts(data)
    }
    fetchWorkouts()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Бесплатные тренировки</h2>
        <Button asChild>
          <Link href="/admin/workouts/free/new">
            <Plus className="mr-2 h-4 w-4" />
            Добавить тренировку
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={workouts} />
    </div>
  )
} 