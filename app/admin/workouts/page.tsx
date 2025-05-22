import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
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

export default async function WorkoutsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "admin") {
    redirect("/dashboard")
  }

  const workouts = await prisma.workout.findMany({
    include: {
      category: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Управление тренировками</h1>
        <div className="flex gap-2">
          <Link href="/admin">
            <Button variant="outline">Назад</Button>
          </Link>
          <Link href="/admin/workouts/create">
            <Button>Добавить тренировку</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Длительность</TableHead>
              <TableHead>Уровень</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workouts.map((workout) => (
              <TableRow key={workout.id}>
                <TableCell>{workout.id}</TableCell>
                <TableCell>{workout.title}</TableCell>
                <TableCell>{workout.category.name}</TableCell>
                <TableCell>{workout.duration} мин</TableCell>
                <TableCell>{workout.level}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/admin/workouts/${workout.id}/edit`}>
                      <Button variant="outline" size="sm">Редактировать</Button>
                    </Link>
                    <Button variant="destructive" size="sm">Удалить</Button>
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