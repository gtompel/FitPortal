import { WorkoutForm } from "@/components/admin/workout-form"

export default function NewFreeWorkoutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Создать бесплатную тренировку</h1>
      <WorkoutForm isFree={true} />
    </div>
  )
} 