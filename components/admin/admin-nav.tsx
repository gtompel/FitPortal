"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dumbbell,
  BookOpen,
  Utensils,
  Calendar,
  LayoutDashboard,
  LogOut,
  Tag,
  Gift
} from "lucide-react"
import { signOut } from "next-auth/react"

const navItems = [
  {
    title: "Обзор",
    href: "/admin",
    icon: LayoutDashboard
  },
  {
    title: "Тренировки",
    href: "/admin/workouts",
    icon: Dumbbell
  },
  {
    title: "Бесплатные тренировки",
    href: "/admin/workouts/free",
    icon: Gift
  },
  {
    title: "Категории",
    href: "/admin/categories",
    icon: Tag
  },
  {
    title: "Блог",
    href: "/admin/blog",
    icon: BookOpen
  },
  {
    title: "Питание",
    href: "/admin/nutrition",
    icon: Utensils
  },
  {
    title: "Планировщик",
    href: "/admin/planner",
    icon: Calendar
  }
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 border-r bg-background p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold">Админ-панель</h2>
      </div>
      <div className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === item.href && "bg-secondary"
              )}
              asChild
            >
              <Link href={item.href}>
                <Icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          )
        })}
      </div>
      <div className="mt-8">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </Button>
      </div>
    </nav>
  )
} 