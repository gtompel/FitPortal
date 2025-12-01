import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, BookOpen, Utensils, Calendar, Plus, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const revalidate = 3600 // Кэшируем на 1 час

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const [workoutsCount, blogPostsCount, nutritionPlansCount, plannerEventsCount, categoriesCount] = await Promise.all([
    db.workout.count(),
    db.post.count(),
    db.plan.count(),
    db.plannerEvent.count(),
    db.category.count()
  ])

  const stats = [
    {
      title: "Тренировки",
      value: workoutsCount,
      icon: Dumbbell,
      href: "/admin/workouts"
    },
    {
      title: "Категории",
      value: categoriesCount,
      icon: Tag,
      href: "/admin/categories"
    },
    {
      title: "Статьи блога",
      value: blogPostsCount,
      icon: BookOpen,
      href: "/admin/blog"
    },
    {
      title: "Планы питания",
      value: nutritionPlansCount,
      icon: Utensils,
      href: "/admin/nutrition"
    },
    {
      title: "События",
      value: plannerEventsCount,
      icon: Calendar,
      href: "/admin/planner"
    }
  ]

  return (
    <div className="px-2 sm:px-4 py-4">
      <h1 className="font-bold mb-6" style={{fontSize:'clamp(1.3rem,4vw,2.2rem)'}}>Обзор</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="min-h-[92px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <Button asChild variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]">
                    <Link href={stat.href}>
                      <Plus className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 