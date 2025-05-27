import { NutritionForm } from "@/components/admin/nutrition-form"

export default function NewNutritionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Новый бесплатный план питания</h1>
      </div>
      <NutritionForm isFree={true} />
    </div>
  )
} 