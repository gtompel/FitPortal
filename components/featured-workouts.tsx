import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Flame, Star } from "lucide-react"
import { db } from "@/lib/db"

// Mock data for workouts when database is not available
const mockWorkouts = [
  {
    id: "1",
    title: "Интенсивная кардио тренировка",
    slug: "intensive-cardio",
    level: "intermediate",
    duration: 30,
    calories: 350,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: { name: "Кардио" },
  },
  {
    id: "2",
    title: "Силовая тренировка верхней части тела",
    slug: "upper-body-strength",
    level: "advanced",
    duration: 45,
    calories: 420,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: { name: "Силовые" },
  },
  {
    id: "3",
    title: "Йога для начинающих",
    slug: "beginner-yoga",
    level: "beginner",
    duration: 20,
    calories: 180,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: { name: "Йога" },
  },
  {
    id: "4",
    title: "HIIT тренировка для всего тела",
    slug: "full-body-hiit",
    level: "advanced",
    duration: 20,
    calories: 300,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: { name: "HIIT" },
  },
]

export default async function FeaturedWorkouts() {
  let workouts = mockWorkouts

  try {
    const data = await db.workout.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
      },
    })

    if (data.length > 0) {
      workouts = data.map(workout => ({
        id: workout.id,
        title: workout.title,
        slug: workout.id || '',
        level: workout.level,
        duration: workout.duration,
        calories: workout.calories,
        imageUrl: workout.image_url || "/placeholder.svg?height=400&width=600",
        category: workout.category ? { name: workout.category.name } : { name: "Тренировка" }
      }))
    }
  } catch (error) {
    console.error("Error fetching workouts:", error)
  }

  // Map workout levels to Russian
  const levelMap: Record<string, string> = {
    beginner: "Начинающий",
    intermediate: "Средний",
    advanced: "Продвинутый",
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {workouts.map((workout) => (
        <Link href={`/workouts/${workout.slug}`} key={workout.id} className="group">
          <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <Image
                src={workout.imageUrl || "/placeholder.svg?height=400&width=600"}
                alt={workout.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
                {workout.category?.name || "Тренировка"}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                {workout.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{workout.duration} мин</span>
                </div>
                <div className="flex items-center">
                  <Flame className="h-4 w-4 mr-1" />
                  <span>{workout.calories} ккал</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="text-xs">
                    {levelMap[workout.level] || workout.level}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white dark:border-gray-900"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white dark:border-gray-900"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-white dark:border-gray-900"></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">12 участников</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
