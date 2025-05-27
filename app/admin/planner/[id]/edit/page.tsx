import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { PlannerForm } from "@/components/admin/planner-form"
import { use } from "react"

interface EditPlannerPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPlannerPage({ params }: EditPlannerPageProps) {
  const { id } = use(params)
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const event = await db.plannerEvent.findUnique({
    where: {
      id
    }
  })

  if (!event) {
    redirect("/admin/planner")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Редактировать событие</h1>
      <PlannerForm initialData={event} />
    </div>
  )
} 