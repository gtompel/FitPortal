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
    <div className="container px-2 sm:px-4 py-8">
      <h1 className="font-bold mb-5" style={{fontSize:'clamp(1.6rem,4.5vw,2.5rem)'}}>Бесплатные материалы</h1>
      <Tabs defaultValue="workouts" className="space-y-4 w-full">
        <TabsList className="w-full flex flex-wrap gap-2 mb-4"/>
        <TabsContent value="workouts">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
            {workouts.map((workout) => (
              <Card key={workout.id} className="min-h-[120px]">
                <CardHeader><CardTitle>{workout.title}</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <p className="text-sm text-gray-500">{workout.category?.name}</p>
                      <p className="text-sm text-gray-500">{workout.level}</p>
                    </div>
                    <Link href={`/workouts/${workout.id}`}><Button variant="outline" className="min-h-[40px]">Подробнее</Button></Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="nutrition">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
            {plans.map((plan) => (
              <Card key={plan.id} className="min-h-[120px]">
                <CardHeader><CardTitle>{plan.title}</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <p className="text-sm text-gray-500">{plan.level}</p>
                      <p className="text-sm text-gray-500">{plan.duration} дней</p>
                    </div>
                    <Link href={`/nutrition/${plan.id}`}><Button variant="outline" className="min-h-[40px]">Подробнее</Button></Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="blog">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
            {posts.map((post) => (
              <Card key={post.id} className="min-h-[120px]">
                <CardHeader><CardTitle>{post.title}</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <p className="text-sm text-gray-500">{post.user.name}</p>
                      <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Link href={`/blog/${post.id}`}><Button variant="outline" className="min-h-[40px]">Подробнее</Button></Link>
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