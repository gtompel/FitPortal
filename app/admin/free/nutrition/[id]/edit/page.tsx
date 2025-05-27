import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import EditNutritionForm from "./edit-form"

export default async function EditNutritionPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/auth/login")
  }

  const plan = await prisma.plan.findUnique({
    where: {
      id: params.id
    }
  })

  if (!plan) {
    redirect("/admin/free")
  }

  return <EditNutritionForm plan={plan} />
} 