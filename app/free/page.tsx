import { prisma } from "@/lib/prisma"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function FreePage() {
  const [workouts, plans, posts] = await Promise.all([
    prisma.workout.findMany({
      where: {
        isFree: true
      },
      include: {
        category: true
      }
    }),
    prisma.plan.findMany({
      where: {
        isFree: true
      },
      include: {
        user: true
      }
    }),
    prisma.post.findMany({
      where: {
        isFree: true
      },
      include: {
        user: true
      }
    })
  ])

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Бесплатные материалы</h1>
      <Tabs defaultValue="workouts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="workouts">Тренировки</TabsTrigger>
          <TabsTrigger value="nutrition">Питание</TabsTrigger>
          <TabsTrigger value="blog">Блог</TabsTrigger>
        </TabsList>

        <TabsContent value="workouts">
          <div className="grid gap-4">
            {workouts.map((workout) => (
              <Card key={workout.id}>
                <CardHeader>
                  <CardTitle>{workout.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">{workout.category?.name}</p>
                      <p className="text-sm text-gray-500">{workout.level}</p>
                    </div>
                    <Link href={`/workouts/${workout.id}`}>
                      <Button variant="outline">Подробнее</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nutrition">
          <div className="grid gap-4">
            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">{plan.level}</p>
                      <p className="text-sm text-gray-500">{plan.duration} дней</p>
                    </div>
                    <Link href={`/nutrition/${plan.id}`}>
                      <Button variant="outline">Подробнее</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="blog">
          <div className="grid gap-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">{post.user.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="outline">Подробнее</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 