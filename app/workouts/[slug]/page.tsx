import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, Dumbbell, Flame, Heart, Share2, Star } from "lucide-react"

const levelMap: Record<string, string> = {
  beginner: "Начинающий",
  intermediate: "Средний",
  advanced: "Продвинутый"
}

interface WorkoutPageProps {
  params: {
    slug: string
  }
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const workout = await prisma.workout.findFirst({
    where: {
      category: {
        slug: params.slug
      }
    },
    include: {
      category: true
    }
  })

  if (!workout) {
    notFound()
  }

  // Mock related workouts
  const relatedWorkouts = [
    {
      id: 1,
      title: "Кардио для начинающих",
      duration: 20,
      level: "beginner",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Силовая тренировка для всего тела",
      duration: 35,
      level: "intermediate",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Растяжка после тренировки",
      duration: 15,
      level: "beginner",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {workout.image_url && (
            <div className="relative aspect-video mb-4">
              <Image
                src={workout.image_url}
                alt={workout.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold mb-4">{workout.title}</h1>
          <p className="text-gray-600 mb-4">{workout.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Длительность</p>
              <p className="font-medium">{workout.duration} минут</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Уровень</p>
              <p className="font-medium">{levelMap[workout.level] || workout.level}</p>
            </div>
            {workout.calories && (
              <div>
                <p className="text-sm text-gray-500">Калории</p>
                <p className="font-medium">{workout.calories} ккал</p>
              </div>
            )}
          </div>
          <Button asChild>
            <Link href="/dashboard">Начать тренировку</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
