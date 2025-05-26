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

export default async function NutritionPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const plans = await db.nutritionPlan.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Питание</h1>
        <Button asChild>
          <Link href="/admin/nutrition/create">Добавить план питания</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Калории</TableHead>
              <TableHead>Создан</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.title}</TableCell>
                <TableCell>{plan.calories}</TableCell>
                <TableCell>
                  {format(plan.createdAt, "d MMMM yyyy", { locale: ru })}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/nutrition/${plan.id}/edit`}>
                        Редактировать
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm" asChild>
                      <Link href={`/admin/nutrition/${plan.id}/delete`}>
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