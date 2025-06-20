import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"

export default async function PlannerPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const events = await db.plannerEvent.findMany({
    where: session.user.role === "ADMIN" 
      ? {} // Для админа показываем все события
      : { userId: session.user.id }, // Для обычных пользователей только их события
    orderBy: {
      start: "asc"
    },
    include: {
      user: true // Включаем информацию о пользователе
    }
  })

  if (!events.length) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Планировщик</h1>
        <p>У вас пока нет запланированных событий</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Планировщик</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Calendar />
        </div>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
              <div className="text-sm text-gray-500 mt-2">
                <p>Начало: {new Date(event.start).toLocaleString()}</p>
                <p>Конец: {new Date(event.end).toLocaleString()}</p>
                {session.user.role === "ADMIN" && (
                  <p>Пользователь: {event.user.name || event.user.email || 'Аноним'}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
