import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface WorkoutPageProps {
  params: {
    workoutId: string
  }
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const workout = await db.workout.findUnique({
    where: {
      id: params.workoutId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!workout) {
    redirect("/workouts")
  }

  return (
    <div className="container py-10">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/workouts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Link>
      </Button>
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{workout.title}</h1>
          <p className="text-muted-foreground">
            Автор: {workout.user.name} • Создано:{" "}
            {format(new Date(workout.createdAt), "d MMMM yyyy", {
              locale: ru,
            })}
          </p>
        </div>
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: workout.description }} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Длительность</h3>
            <p className="text-muted-foreground">{workout.duration} минут</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Уровень</h3>
            <p className="text-muted-foreground">{workout.level}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 