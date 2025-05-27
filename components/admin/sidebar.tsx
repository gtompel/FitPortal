"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  BookOpen,
  Calendar,
  Users,
  Settings,
  Gift,
} from "lucide-react"

const routes = [
  {
    label: "Обзор",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Тренировки",
    icon: Dumbbell,
    href: "/admin/workouts",
    color: "text-violet-500",
  },
  {
    label: "Бесплатные тренировки",
    icon: Gift,
    href: "/admin/free-workouts",
    color: "text-green-500",
  },
  {
    label: "Планы питания",
    icon: Utensils,
    href: "/admin/plans",
    color: "text-pink-700",
  },
  {
    label: "Статьи",
    icon: BookOpen,
    href: "/admin/posts",
    color: "text-orange-700",
  },
  {
    label: "Планировщик",
    icon: Calendar,
    href: "/admin/planner",
    color: "text-emerald-500",
  },
  {
    label: "Пользователи",
    icon: Users,
    href: "/admin/users",
    color: "text-blue-700",
  },
  {
    label: "Настройки",
    icon: Settings,
    href: "/admin/settings",
    color: "text-gray-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">Админ-панель</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
} 