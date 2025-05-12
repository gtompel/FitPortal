import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, Dumbbell, Flame, Heart, Share2, Star } from "lucide-react"

export default async function WorkoutDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient()

  // Get workout with its category
  const { data: workout, error } = await supabase
    .from("workouts")
    .select(`
      *,
      categories(*)
    `)
    .eq("slug", params.slug)
    .single()

  if (error || !workout) {
    console.error("Error fetching workout:", error)
    return notFound()
  }

  // Map workout levels to Russian
  const levelMap: Record<string, string> = {
    beginner: "Начинающий",
    intermediate: "Средний",
    advanced: "Продвинутый",
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
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <Link
        href="/workouts"
        className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400 hover:underline mb-6"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Назад к тренировкам
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Workout Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-600 hover:bg-green-700">{workout.categories?.name || "Тренировка"}</Badge>
              <Badge variant="outline">{levelMap[workout.level] || workout.level}</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-700 dark:text-green-300">
              {workout.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{workout.duration} мин</span>
              </div>
              <div className="flex items-center">
                <Flame className="h-4 w-4 mr-1" />
                <span>{workout.calories} ккал</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>4.8 (24 отзыва)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700">Начать тренировку</Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Добавить в избранное</span>
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Поделиться</span>
              </Button>
            </div>
          </div>

          {/* Workout Image/Video */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={workout.image_url || "/placeholder.svg?height=600&width=1000"}
              alt={workout.title}
              fill
              className="object-cover"
            />
            {workout.video_url && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 h-16 w-16"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Воспроизвести видео</span>
                </Button>
              </div>
            )}
          </div>

          {/* Workout Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="exercises">Упражнения</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300">{workout.description}</p>
                <h3 className="text-xl font-semibold mt-6 mb-3 text-green-700 dark:text-green-300">
                  Что вам понадобится
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Удобная спортивная одежда</li>
                  <li>Коврик для фитнеса</li>
                  <li>Бутылка воды</li>
                  <li>Гантели (опционально)</li>
                </ul>
                <h3 className="text-xl font-semibold mt-6 mb-3 text-green-700 dark:text-green-300">Преимущества</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Улучшение выносливости</li>
                  <li>Укрепление мышц</li>
                  <li>Сжигание калорий</li>
                  <li>Улучшение настроения</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="exercises" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mr-4">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Разминка</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      5 минут легких упражнений для подготовки тела
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">5 мин</div>
                </div>
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mr-4">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Основной комплекс</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Интенсивные упражнения для всего тела</p>
                  </div>
                  <div className="text-sm text-gray-500">20 мин</div>
                </div>
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mr-4">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Заминка</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Растяжка и восстановление</p>
                  </div>
                  <div className="text-sm text-gray-500">5 мин</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    АИ
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">Анна Иванова</h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Отличная тренировка! Интенсивная, но подходит для моего уровня. Буду заниматься по этой программе
                      регулярно.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 дня назад</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    МС
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">Михаил Смирнов</h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Хорошая тренировка, но хотелось бы больше вариаций упражнений. В целом доволен результатом.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1 неделю назад</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6">
                Показать все отзывы
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trainer Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">Тренер</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Алексей Петров</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Сертифицированный фитнес-тренер с 5-летним опытом. Специализируется на функциональных тренировках и
                HIIT.
              </p>
              <Button variant="outline" className="w-full">
                Посмотреть профиль
              </Button>
            </CardContent>
          </Card>

          {/* Related Workouts */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">Похожие тренировки</h3>
            {relatedWorkouts.map((relatedWorkout) => (
              <Link href={`/workouts/${relatedWorkout.id}`} key={relatedWorkout.id} className="group">
                <div className="flex gap-3 p-3 border rounded-lg hover:border-green-600 transition-colors">
                  <div className="relative w-20 h-20 rounded overflow-hidden">
                    <Image
                      src={relatedWorkout.image || "/placeholder.svg"}
                      alt={relatedWorkout.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium group-hover:text-green-600 transition-colors">{relatedWorkout.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <span>{relatedWorkout.duration} мин</span>
                      <span>{levelMap[relatedWorkout.level] || relatedWorkout.level}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
