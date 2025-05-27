import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { NutritionForm } from "@/components/admin/nutrition-form"
import { use } from "react"

interface EditNutritionPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditNutritionPage({ params }: EditNutritionPageProps) {
  const { id } = use(params)
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const plan = await db.plan.findUnique({
    where: {
      id
    }
  })

  if (!plan) {
    redirect("/admin/nutrition")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Редактировать план питания</h1>
      <NutritionForm initialData={plan} />
    </div>
  )
} 