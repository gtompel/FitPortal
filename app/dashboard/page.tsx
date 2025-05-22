import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, Dumbbell, LineChart, ListChecks, Trophy, User } from "lucide-react"

export const dynamic = 'force-dynamic'
export const revalidate = 0

type FitnessLevel = 'beginner' | 'intermediate' | 'advanced'

const levelMap: Record<FitnessLevel, string> = {
  beginner: "Начальный",
  intermediate: "Средний",
  advanced: "Продвинутый",
}

export default async function DashboardPage() {
  const user = await prisma.user.findFirst({
    where: {
      email: "test@test.ru" // Временно для теста
    }
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-700 dark:text-green-300">
          Личный кабинет
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Добро пожаловать, {user.name}! Здесь вы можете отслеживать свой прогресс и
          управлять тренировками.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Тренировок завершено</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Dumbbell className="h-5 w-5 text-green-600 mr-2" />
              <div className="text-2xl font-bold">0</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Активных дней</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-green-600 mr-2" />
              <div className="text-2xl font-bold">0</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Сожжено калорий</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <LineChart className="h-5 w-5 text-green-600 mr-2" />
              <div className="text-2xl font-bold">0</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Достижения</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-green-600 mr-2" />
              <div className="text-2xl font-bold">0</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="progress" className="w-full mb-8">
        <TabsList className="w-full grid grid-cols-3 mb-8">
          <TabsTrigger value="progress">Прогресс</TabsTrigger>
          <TabsTrigger value="plans">Мои планы</TabsTrigger>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
        </TabsList>
        <TabsContent value="progress">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Активность</CardTitle>
                <CardDescription>Ваша тренировочная активность за последние 30 дней</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border rounded-md bg-gray-50 dark:bg-gray-900">
                  <p className="text-gray-500">Нет данных для отображения</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Последние тренировки</CardTitle>
                <CardDescription>Ваши недавно завершенные тренировки</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center h-[200px] border rounded-md bg-gray-50 dark:bg-gray-900">
                    <p className="text-gray-500">Нет завершенных тренировок</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Link href="/workouts">Найти тренировку</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle>Мои планы тренировок</CardTitle>
              <CardDescription>Управляйте своими планами тренировок</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[300px] border rounded-md bg-gray-50 dark:bg-gray-900 mb-4">
                <ListChecks className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-2">У вас пока нет планов тренировок</p>
                <p className="text-gray-500 text-sm mb-4">Создайте свой первый план тренировок</p>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Link href="/planner">Создать план</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Личная информация</CardTitle>
                <CardDescription>Управляйте своими личными данными</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{user.name || "Пользователь"}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Редактировать профиль
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Настройки аккаунта</CardTitle>
                <CardDescription>Управляйте настройками вашего аккаунта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-1">Уровень подготовки</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    {user.fitnessLevel && levelMap[user.fitnessLevel as FitnessLevel] || "Не указан"}
                  </p>
                  <Button variant="outline" size="sm">
                    Изменить
                  </Button>
                </div>
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-1">Пароль</h4>
                  <p className="text-sm text-gray-500 mb-2">••••••••</p>
                  <Button variant="outline" size="sm">
                    Изменить пароль
                  </Button>
                </div>
                <Button variant="destructive" className="w-full">
                  Выйти из аккаунта
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
              Готовы начать новую тренировку?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Выберите из нашей коллекции тренировок или создайте свой план.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-green-600 hover:bg-green-700">
              <Link href="/workouts">Найти тренировку</Link>
            </Button>
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
            >
              <Link href="/planner" className="flex items-center">
                Создать план
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
