"use client"

import { useEffect, useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const response = await fetch("/api/workouts?isFree=false")
        if (response.ok) {
          const data = await response.json()
          setWorkouts(data)
        }
      } catch (error) {
        console.error("Error fetching workouts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Тренировки</h2>
          <p className="text-muted-foreground">
            Управление тренировками
          </p>
        </div>
        <Link href="/admin/workouts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Добавить тренировку
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={workouts} loading={loading} />
    </div>
  )
} 