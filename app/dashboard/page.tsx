import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, Dumbbell, LineChart, ListChecks, Trophy, User } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export const revalidate = 3600

type FitnessLevel = 'beginner' | 'intermediate' | 'advanced'

const levelMap: Record<FitnessLevel, string> = {
  beginner: "Начальный",
  intermediate: "Средний",
  advanced: "Продвинутый",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email!
    },
    include: {
      workouts: true,
      plans: true
    }
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Личный кабинет</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Тренировки</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.workouts.length}</div>
            <p className="text-xs text-muted-foreground">
              Завершенных тренировок
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Планы</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.plans.length}</div>
            <p className="text-xs text-muted-foreground">
              Активных планов
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="workouts">Тренировки</TabsTrigger>
            <TabsTrigger value="plans">Планы</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Информация о профиле</CardTitle>
                <CardDescription>
                  Управление личными данными
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Имя</h3>
                    <p className="text-sm text-muted-foreground">{user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <Button>Редактировать профиль</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="workouts">
            <Card>
              <CardHeader>
                <CardTitle>История тренировок</CardTitle>
                <CardDescription>
                  Список завершенных тренировок
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user.workouts.length > 0 ? (
                  <div className="space-y-4">
                    {user.workouts.map((workout) => (
                      <div key={workout.id} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{workout.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {workout.duration} мин • {workout.level}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Повторить
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    У вас пока нет завершенных тренировок
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle>Активные планы</CardTitle>
                <CardDescription>
                  Ваши текущие планы тренировок
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user.plans.length > 0 ? (
                  <div className="space-y-4">
                    {user.plans.map((plan) => (
                      <div key={plan.id} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{plan.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Подробнее
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    У вас пока нет активных планов
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
