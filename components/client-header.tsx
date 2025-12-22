"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { Menu, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

interface Category {
  id: string
  name: string
  slug: string
}

interface ClientHeaderProps {
  session: any
}

export default function ClientHeader({ session }: ClientHeaderProps) {
  const isMobile = useMobile()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    }
    fetchCategories()
  }, [])

  return (
    <>
      <div className="flex items-center gap-2 md:hidden">
        {/* мобильное меню — только на xs/sm */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Меню</SheetTitle>
            </SheetHeader>
            <SheetDescription className="sr-only">Навигация по разделам сайта</SheetDescription>
            <div className="flex flex-col gap-4 py-4">
                <Link
                  href="/"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Главная
                </Link>
                <Link
                  href="/workouts"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/workouts" || pathname.startsWith("/workouts/")
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  Тренировки
                </Link>
                <Link
                  href="/blog"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/blog" || pathname.startsWith("/blog/")
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  Блог
                </Link>
                <Link
                  href="/nutrition"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/nutrition"
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  Питание
                </Link>
                <Link
                  href="/planner"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/planner" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Планировщик
                </Link>
                <div className="pt-4 space-y-2">
                  {session ? (
                    <>
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        Выйти
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Link href="/login">Войти</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/register">Регистрация</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex items-center gap-4">
        {/* десктоп-меню — только на md+ */}
        <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className="flex items-center gap-1">
                    <span>🏃‍♀️</span>
                    <span>Главная</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={pathname.startsWith("/workouts") ? "text-primary border-b-2 border-primary" : ""}
                >
                  <span className="flex items-center gap-1">
                    <span>🏋️</span>
                    <span>Тренировки</span>
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary to-primary/80 p-6 no-underline outline-none focus:shadow-md"
                          href="/workouts"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Все программы</div>
                          <p className="text-sm leading-tight text-white/90">
                            Полная коллекция тренировок для всех уровней подготовки
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <NavigationMenuLink asChild>
                          <a
                            className="flex select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground items-center gap-2"
                            href={`/workouts/${category.slug}`}
                          >
                            <span>
                              {category.slug === 'cardio' && '🏃'}
                              {category.slug === 'strength' && '💪'}
                              {category.slug === 'flexibility' && '🧘'}
                              {!['cardio', 'strength', 'flexibility'].includes(category.slug) && '🏋️'}
                            </span>
                            <div>
                              <div className="text-sm font-medium leading-none">{category.name}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Тренировки в категории {category.name}
                              </p>
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/blog" className="flex items-center gap-1">
                    <span>📝</span>
                    <span>Блог</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/nutrition" className="flex items-center gap-1">
                    <span>🥗</span>
                    <span>Питание</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/planner" className="flex items-center gap-1">
                    <span>📅</span>
                    <span>Планировщик</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {session?.user?.role === "ADMIN" && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/admin">
                      Админ панель
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            {session ? (
              <>
                <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10">
                  <Link href="/login">Войти</Link>
                </Button>
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/register">Регистрация</Link>
                </Button>
              </>
            )}
          </div>
      </div>
    </>
  )
}
