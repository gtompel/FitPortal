"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isAdmin = session?.user?.role === "ADMIN"

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Главная
          </Link>
          <Link
            href="/workouts"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/workouts" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Тренировки
          </Link>
          <Link
            href="/blog"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/blog" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Блог
          </Link>
          <Link
            href="/nutrition"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/nutrition" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Питание
          </Link>
          <Link
            href="/planner"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/planner" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Планировщик
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Админ панель
            </Link>
          )}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {session ? (
            <Button variant="outline" asChild>
              <Link href="/dashboard">Личный кабинет</Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/login">Войти</Link>
            </Button>
          )}
          <Button asChild variant="default">
            <Link href="/free">Начать бесплатно</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
} 