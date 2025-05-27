"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Dumbbell, Utensils, FileText } from "lucide-react"

const routes = [
  {
    label: "Обзор",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500"
  },
  {
    label: "Тренировки",
    icon: Dumbbell,
    href: "/admin/free/workouts",
    color: "text-violet-500"
  },
  {
    label: "Питание",
    icon: Utensils,
    href: "/admin/free/nutrition",
    color: "text-pink-700"
  },
  {
    label: "Блог",
    icon: FileText,
    href: "/admin/free/blog",
    color: "text-orange-700"
  }
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">
          Админ-панель
        </h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === route.href && "bg-secondary"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className={cn("mr-2 h-4 w-4", route.color)} />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
} 