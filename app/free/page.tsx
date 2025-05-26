import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, BookOpen, Utensils } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function FreePage() {
  const [workouts, posts, plans] = await Promise.all([
    db.workout.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc"
      }
    }),
    db.post.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc"
      }
    }),
    db.plan.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc"
      }
    })
  ])

  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Бесплатный контент</h1>
        <p className="text-muted-foreground mb-8">
          Попробуйте наши бесплатные тренировки, планы питания и статьи
        </p>
        <Button asChild size="lg">
          <Link href="/register">Начать бесплатно</Link>
        </Button>
      </div>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Dumbbell className="h-6 w-6" />
            Тренировки
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {workouts.map((workout) => (
              <Card key={workout.id}>
                <CardHeader>
                  <CardTitle>{workout.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{workout.description}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{workout.duration} мин</span>
                    <span>{workout.level}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Utensils className="h-6 w-6" />
            Планы питания
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{plan.duration} дней</span>
                    <span>{plan.level}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Статьи
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">{post.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
} 