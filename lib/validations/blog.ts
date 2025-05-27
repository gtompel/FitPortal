import * as z from "zod"

export const blogFormSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  content: z.string().min(1, "Содержание обязательно"),
  image_url: z.string().url("Некорректный URL").optional(),
  isFree: z.boolean().default(false)
})

export type BlogFormValues = z.infer<typeof blogFormSchema> 