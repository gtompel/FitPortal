import { prisma } from "@/lib/prisma"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MaterialList } from "../components/material-list"

export default async function AdminFreePage() {
  const [workouts, plans, posts] = await Promise.all([
    prisma.workout.findMany({
      include: {
        category: true
      }
    }),
    prisma.plan.findMany({
      include: {
        user: true
      }
    }),
    prisma.post.findMany({
      include: {
        user: true
      }
    })
  ])

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Бесплатные материалы</h1>
        <div className="flex gap-4">
          <Link href="/admin/free/workouts/new">
            <Button>Добавить тренировку</Button>
          </Link>
          <Link href="/admin/free/nutrition/new">
            <Button>Добавить план питания</Button>
          </Link>
          <Link href="/admin/free/blog/new">
            <Button>Добавить статью</Button>
          </Link>
        </div>
      </div>
      <Tabs defaultValue="workouts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="workouts">Тренировки</TabsTrigger>
          <TabsTrigger value="nutrition">Питание</TabsTrigger>
          <TabsTrigger value="blog">Блог</TabsTrigger>
        </TabsList>

        <TabsContent value="workouts">
          <MaterialList
            items={workouts}
            type="workouts"
            onDelete={async (id) => {
              "use server"
              await prisma.workout.delete({
                where: { id }
              })
            }}
          />
        </TabsContent>

        <TabsContent value="nutrition">
          <MaterialList
            items={plans}
            type="nutrition"
            onDelete={async (id) => {
              "use server"
              await prisma.plan.delete({
                where: { id }
              })
            }}
          />
        </TabsContent>

        <TabsContent value="blog">
          <MaterialList
            items={posts}
            type="blog"
            onDelete={async (id) => {
              "use server"
              await prisma.post.delete({
                where: { id }
              })
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
} 