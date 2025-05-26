import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { NutritionForm } from "@/components/admin/nutrition-form"

export default async function CreateNutritionPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Создать план питания</h1>
      <NutritionForm />
    </div>
  )
} 