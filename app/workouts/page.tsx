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
    where: {
      isFree: false
    },
    include: {
      category: true,
      user: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  if (!workouts.length) {
    return (
      <div className="container mx-auto px-2 sm:px-4 py-8">
        <h1 className="font-bold mb-5" style={{fontSize:'clamp(1.6rem,4.5vw,2.5rem)'}}>Тренировки</h1>
        <p>Тренировки пока не добавлены</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <h1 className="font-bold mb-5" style={{fontSize:'clamp(1.6rem,4.5vw,2.5rem)'}}>Тренировки</h1>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <Link href={`/workouts/${workout.id}`} key={workout.id} className="focus:outline-green-600" tabIndex={0}>
            <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm min-h-[180px]">
              {workout.image_url && (
                <div className="relative aspect-video min-h-[120px]">
                  <Image
                    src={workout.image_url}
                    alt={workout.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform group-hover:scale-105 rounded-t-lg"
                  />
                </div>
              )}
              <div className="p-3 sm:p-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge className="bg-green-600 hover:bg-green-700 min-h-[28px] min-w-[28px] text-base px-2 py-1">
                    {workout.category?.name || 'Без категории'}
                  </Badge>
                  <Badge variant="outline" className="text-base px-2 py-1">{levelMap[workout.level] || workout.level}</Badge>
                </div>
                <h2 className="font-semibold mb-1" style={{fontSize:'clamp(1rem,2vw,1.38rem)'}}>{workout.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-snug">{workout.description}</p>
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
