import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { WorkoutForm } from "@/components/admin/workout-form"

export default async function CreateWorkoutPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Создать тренировку</h1>
      <WorkoutForm categories={categories} />
    </div>
  )
} 