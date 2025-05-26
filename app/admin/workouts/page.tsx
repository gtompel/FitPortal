import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

export default async function WorkoutsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const workouts = await db.workout.findMany({
    include: {
      category: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Тренировки</h1>
        <Button asChild>
          <Link href="/admin/workouts/create">Добавить тренировку</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Создана</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workouts.map((workout) => (
              <TableRow key={workout.id}>
                <TableCell>{workout.title}</TableCell>
                <TableCell>{workout.category.name}</TableCell>
                <TableCell>
                  {format(workout.createdAt, "d MMMM yyyy", { locale: ru })}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/workouts/${workout.id}/edit`}>
                        Редактировать
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm" asChild>
                      <Link href={`/admin/workouts/${workout.id}/delete`}>
                        Удалить
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 