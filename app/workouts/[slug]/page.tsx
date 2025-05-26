import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, Dumbbell, Flame, Heart, Share2, Star } from "lucide-react"
import { Metadata } from "next"

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

export async function generateStaticParams() {
  const categories = await db.category.findMany({
    select: {
      slug: true
    }
  })

  return categories.map((category) => ({
    slug: category.slug
  }))
}

export async function generateMetadata({ params }: WorkoutPageProps): Promise<Metadata> {
  const category = await db.category.findFirst({
    where: {
      slug: params.slug
    }
  })

  if (!category) {
    return {
      title: 'Тренировка не найдена'
    }
  }

  return {
    title: category.name,
    description: category.description
  }
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const category = await db.category.findFirst({
    where: {
      slug: params.slug
    }
  })

  if (!category) {
    notFound()
  }

  const workouts = await db.workout.findMany({
    where: {
      categoryId: category.id
    },
    include: {
      category: true
    }
  })

  if (!workouts.length) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Link href="/workouts" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к тренировкам
        </Link>
        <h1 className="text-3xl font-bold mt-4">{category.name}</h1>
        <p className="text-gray-600 mt-2">{category.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <Card key={workout.id}>
            {workout.image_url && (
              <div className="relative aspect-video">
                <Image
                  src={workout.image_url}
                  alt={workout.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            )}
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{workout.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{workout.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {workout.duration} мин
                </div>
                <Badge variant="secondary">
                  {levelMap[workout.level] || workout.level}
                </Badge>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href={`/workouts/${workout.id}`}>Начать тренировку</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
