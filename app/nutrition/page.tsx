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
      <div className="container px-2 sm:px-4 py-12">
        <div className="flex flex-col gap-3 mb-8">
          <h1 className="font-bold text-green-700 dark:text-green-300" style={{fontSize:'clamp(1.6rem,4.5vw,2.5rem)'}}>Питание</h1>
          <p className="text-gray-600 dark:text-gray-300">Загрузка планов питания...</p>
        </div>
      </div>
    )
  }
  if (plans.length === 0) {
    return (
      <div className="container px-2 sm:px-4 py-12">
        <div className="flex flex-col gap-3 mb-8">
          <h1 className="font-bold text-green-700 dark:text-green-300" style={{fontSize:'clamp(1.6rem,4.5vw,2.5rem)'}}>Питание</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">Раздел о питании в разработке...</p>
          <div className="pt-4">
            <Button asChild className="bg-green-600 hover:bg-green-700 min-h-[44px] w-full max-w-[300px]">
              <Link href="/">Вернуться на главную</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="container px-2 sm:px-4 py-12">
      <div className="flex flex-col gap-3 mb-8">
        <h1 className="font-bold text-green-700 dark:text-green-300" style={{fontSize:'clamp(1.6rem,4.5vw,2.5rem)'}}>Питание</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">Выберите подходящий план питания для ваших целей</p>
      </div>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className="min-h-[180px]">
            <CardHeader>
              <CardTitle style={{fontSize:'clamp(1.1rem,1vw,1.28rem)'}}>{plan.title}</CardTitle>
              <CardDescription className="leading-snug">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Длительность: {plan.duration} дней</p>
                <p className="text-sm text-muted-foreground">Уровень: {plan.level}</p>
                <p className="text-sm text-muted-foreground">Автор: {plan.user.name}</p>
                <Button asChild className="w-full min-h-[44px] mt-2 bg-green-600 hover:bg-green-700">
                  <Link href={`/nutrition/${plan.id}`}>Подробнее</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
