import { db } from "@/lib/db"
import { WorkoutForm } from "@/components/admin/workout-form"

export default async function NewWorkoutPage() {
  const categories = await db.category.findMany()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Новая бесплатная тренировка</h1>
      </div>
      <WorkoutForm categories={categories} isFree={true} />
    </div>
  )
} 