"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Workout } from "@prisma/client"
import { Category } from "@prisma/client"

const formSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  duration: z.string().min(1, "Длительность обязательна"),
  level: z.string().min(1, "Уровень обязателен"),
  image_url: z.string().optional(),
  video_url: z.string().optional(),
  calories: z.string().min(1, "Калории обязательны"),
  isFree: z.boolean().default(false)
})

interface WorkoutFormProps {
  categories: Category[]
  workout?: Workout
  isFree?: boolean
}

export function WorkoutForm({ categories, workout, isFree = false }: WorkoutFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: workout?.title || "",
      description: workout?.description || "",
      duration: workout?.duration?.toString() || "",
      level: workout?.level || "",
      image_url: workout?.image_url || "",
      video_url: workout?.video_url || "",
      calories: workout?.calories?.toString() || "",
      isFree: workout?.isFree || isFree
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    try {
      const response = await fetch(
        workout ? `/api/workouts/${workout.id}` : "/api/workouts",
        {
          method: workout ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            duration: parseInt(values.duration),
            calories: parseInt(values.calories),
            isFree
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Ошибка при сохранении тренировки")
      }

      toast.success(
        workout
          ? "Тренировка успешно обновлена"
          : "Тренировка успешно создана"
      )
      router.push(isFree ? "/admin/free-workouts" : "/admin/workouts")
      router.refresh()
    } catch (error) {
      toast.error("Произошла ошибка при сохранении тренировки")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Введите название" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  disabled={loading}
                  placeholder="Введите описание"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Длительность (минут)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    placeholder="Введите длительность"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Калории</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    placeholder="Введите калории"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Уровень</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Введите уровень" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL изображения</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Введите URL изображения" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="video_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL видео</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Введите URL видео" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading ? "Сохранение..." : workout ? "Обновить" : "Создать"}
        </Button>
      </form>
    </Form>
  )
} 