import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

export default async function PlannerPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const events = await db.plannerEvent.findMany({
    orderBy: {
      start: "desc"
    },
    include: {
      user: true
    }
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">События</h1>
        <Button asChild>
          <Link href="/admin/planner/new">
            <Plus className="mr-2 h-4 w-4" />
            Добавить событие
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <div className="mt-2 text-sm text-muted-foreground">
                <p>Начало: {format(event.start, "d MMMM yyyy HH:mm", { locale: ru })}</p>
                <p>Конец: {format(event.end, "d MMMM yyyy HH:mm", { locale: ru })}</p>
                <p>Пользователь: {event.user.name || 'Аноним'}</p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/planner/${event.id}/edit`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Редактировать
                  </Link>
                </Button>
                <Button asChild variant="destructive" size="sm">
                  <Link href={`/admin/planner/${event.id}/delete`}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Удалить
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 