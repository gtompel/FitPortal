"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface NutritionPlan {
  id: string
  title: string
  description: string
  duration: number
  level: string
  image_url?: string
  user: {
    name: string
  }
}

export default function NutritionPage() {
  const [plans, setPlans] = useState<NutritionPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await fetch("/api/nutrition")
        if (response.ok) {
          const data = await response.json()
          setPlans(data)
        }
      } catch (error) {
        console.error("Error fetching nutrition plans:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  if (loading) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-24">
        <div className="flex flex-col space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-700 dark:text-green-300">Питание</h1>
          <p className="text-gray-600 dark:text-gray-300">Загрузка планов питания...</p>
        </div>
      </div>
    )
  }

  if (plans.length === 0) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-24">
        <div className="flex flex-col space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-700 dark:text-green-300">Питание</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
            Раздел о питании находится в разработке. Скоро здесь появятся рекомендации по правильному питанию, рецепты и
            планы питания.
          </p>
          <div className="pt-4">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/">Вернуться на главную</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-700 dark:text-green-300">Питание</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Выберите подходящий план питания для достижения ваших целей
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Длительность: {plan.duration} дней
                </p>
                <p className="text-sm text-muted-foreground">
                  Уровень: {plan.level}
                </p>
                <p className="text-sm text-muted-foreground">
                  Автор: {plan.user.name}
                </p>
                <Button asChild className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  <Link href={`/nutrition/${plan.id}`}>
                    Подробнее
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
