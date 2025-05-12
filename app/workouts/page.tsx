import { createServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Clock, Filter, Flame, Search, SlidersHorizontal, Star, Zap } from "lucide-react"

export default async function WorkoutsPage() {
  const supabase = createServerClient()

  // Get all categories
  const { data: categories, error: categoriesError } = await supabase.from("categories").select("*").order("name")

  if (categoriesError) {
    console.error("Error fetching categories:", categoriesError)
    return <div>Ошибка загрузки категорий</div>
  }

  // Get all workouts with their categories
  const { data: workouts, error: workoutsError } = await supabase
    .from("workouts")
    .select(`
      *,
      categories(*)
    `)
    .order("created_at", { ascending: false })

  if (workoutsError) {
    console.error("Error fetching workouts:", workoutsError)
    return <div>Ошибка загрузки тренировок</div>
  }

  // Map workout levels to Russian
  const levelMap: Record<string, string> = {
    beginner: "Начинающий",
    intermediate: "Средний",
    advanced: "Продвинутый",
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-700 dark:text-green-300">
          Тренировки
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Откройте для себя разнообразные программы тренировок, созданные профессиональными тренерами для всех уровней
          подготовки.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input type="search" placeholder="Поиск тренировок..." className="pl-8 w-full bg-white dark:bg-gray-800" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Фильтры
        </Button>
        <Button variant="outline" className="w-full md:w-auto">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Сортировка
        </Button>
      </div>

      {/* Tabs for Categories */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="w-full flex flex-wrap justify-start mb-4 h-auto">
          <TabsTrigger value="all" className="m-1">
            Все
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.slug} className="m-1">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {workouts.map((workout) => (
              <Link href={`/workouts/${workout.slug}`} key={workout.id} className="group">
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={workout.image_url || "/placeholder.svg?height=400&width=600"}
                      alt={workout.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
                      {workout.categories?.name || "Тренировка"}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                      {workout.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{workout.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
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
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">4.8</span>
                      <span className="text-xs text-gray-500 ml-1">(24)</span>
                    </div>
                    <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                      <Zap className="h-4 w-4" />
                      <span className="sr-only">Начать тренировку</span>
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        {/* Category tabs */}
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.slug}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {workouts
                .filter((w) => w.categories?.slug === category.slug)
                .map((workout) => (
                  <Link href={`/workouts/${workout.slug}`} key={workout.id} className="group">
                    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow h-full">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={workout.image_url || "/placeholder.svg?height=400&width=600"}
                          alt={workout.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
                          {workout.categories?.name || "Тренировка"}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                          {workout.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {workout.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
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
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">4.8</span>
                          <span className="text-xs text-gray-500 ml-1">(24)</span>
                        </div>
                        <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                          <Zap className="h-4 w-4" />
                          <span className="sr-only">Начать тренировку</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
        >
          Загрузить больше
        </Button>
      </div>
    </div>
  )
}
