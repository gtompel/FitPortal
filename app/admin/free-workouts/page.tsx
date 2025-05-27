import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { columns } from "./columns"

export default async function FreeWorkoutsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const workouts = await db.workout.findMany({
    where: {
      isFree: true
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      user: {
        select: {
          name: true
        }
      }
    }
  })

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Бесплатные тренировки</h1>
        <Button asChild>
          <Link href="/admin/free-workouts/new">
            <Plus className="mr-2 h-4 w-4" />
            Добавить
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={workouts} />
    </div>
  )
} 