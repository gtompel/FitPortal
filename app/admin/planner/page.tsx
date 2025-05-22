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

export default async function PlannerPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "admin") {
    redirect("/dashboard")
  }

  const plans = await prisma.plan.findMany({
    include: {
      user: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Управление планами</h1>
        <div className="flex gap-2">
          <Link href="/admin">
            <Button variant="outline">Назад</Button>
          </Link>
          <Link href="/admin/planner/create">
            <Button>Создать план</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Пользователь</TableHead>
              <TableHead>Дата начала</TableHead>
              <TableHead>Дата окончания</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.id}</TableCell>
                <TableCell>{plan.title}</TableCell>
                <TableCell>{plan.user.name}</TableCell>
                <TableCell>{new Date(plan.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(plan.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/admin/planner/${plan.id}/edit`}>
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