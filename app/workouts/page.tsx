import { db } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Clock, Filter, Flame, Search, SlidersHorizontal, Star, Zap } from "lucide-react"

const levelMap: Record<string, string> = {
  beginner: "Начинающий",
  intermediate: "Средний",
  advanced: "Продвинутый"
}

export default async function WorkoutsPage() {
  const workouts = await db.workout.findMany({
    include: {
      category: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Тренировки</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <Link href={`/workouts/${workout.category.slug}`} key={workout.id}>
            <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
              {workout.image_url && (
                <div className="relative aspect-video">
                  <Image
                    src={workout.image_url}
                    alt={workout.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-600 hover:bg-green-700">
                    {workout.category.name}
                  </Badge>
                  <Badge variant="outline">{levelMap[workout.level] || workout.level}</Badge>
                </div>
                <h2 className="text-xl font-semibold mb-2">{workout.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{workout.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{workout.duration} мин</span>
                  {workout.calories && <span>{workout.calories} ккал</span>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
