import * as z from "zod"

export const nutritionFormSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().optional(),
  duration: z.number().min(1, "Продолжительность должна быть больше 0"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  calories: z.number().min(0, "Калории не могут быть отрицательными"),
  protein: z.number().min(0, "Белки не могут быть отрицательными"),
  fat: z.number().min(0, "Жиры не могут быть отрицательными"),
  carbs: z.number().min(0, "Углеводы не могут быть отрицательными"),
  image_url: z.string().url("Некорректный URL").optional(),
  isFree: z.boolean().default(false)
})

export type NutritionFormValues = z.infer<typeof nutritionFormSchema> 