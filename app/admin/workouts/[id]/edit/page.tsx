import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { WorkoutForm } from "@/components/admin/workout-form"
import { notFound } from "next/navigation"

interface EditWorkoutPageProps {
  params: {
    id: string
  }
}

export default async function EditWorkoutPage({ params }: EditWorkoutPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const [workout, categories] = await Promise.all([
    db.workout.findUnique({
      where: {
        id: params.id
      }
    }),
    db.category.findMany({
      orderBy: {
        name: "asc"
      }
    })
  ])

  if (!workout) {
    notFound()
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Редактировать тренировку</h1>
      <WorkoutForm categories={categories} initialData={workout} />
    </div>
  )
} 