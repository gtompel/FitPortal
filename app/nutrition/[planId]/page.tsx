import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface NutritionPageProps {
  params: {
    planId: string
  }
}

export default async function NutritionPage({ params }: NutritionPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const plan = await db.plan.findUnique({
    where: {
      id: params.planId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!plan) {
    redirect("/nutrition")
  }

  return (
    <div className="container py-10">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/nutrition">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Link>
      </Button>
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{plan.title}</h1>
          <p className="text-muted-foreground">
            Автор: {plan.user.name} • Создано:{" "}
            {format(new Date(plan.createdAt), "d MMMM yyyy", {
              locale: ru,
            })}
          </p>
        </div>
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: plan.description }} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Длительность</h3>
            <p className="text-muted-foreground">{plan.duration} дней</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Уровень</h3>
            <p className="text-muted-foreground">{plan.level}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 