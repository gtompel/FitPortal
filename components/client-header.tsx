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
import { Menu } from "lucide-react"
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
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
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
                    "text-lg font-medium transition-colors hover:text-green-600 dark:hover:text-green-400",
                    pathname === "/" ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-300",
                  )}
                >
                  Главная
                </Link>
                <Link
                  href="/workouts"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-green-600 dark:hover:text-green-400",
                    pathname === "/workouts" || pathname.startsWith("/workouts/")
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-600 dark:text-gray-300",
                  )}
                >
                  Тренировки
                </Link>
                <Link
                  href="/blog"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-green-600 dark:hover:text-green-400",
                    pathname === "/blog" || pathname.startsWith("/blog/")
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-600 dark:text-gray-300",
                  )}
                >
                  Блог
                </Link>
                <Link
                  href="/nutrition"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-green-600 dark:hover:text-green-400",
                    pathname === "/nutrition"
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-600 dark:text-gray-300",
                  )}
                >
                  Питание
                </Link>
                <Link
                  href="/planner"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-green-600 dark:hover:text-green-400",
                    pathname === "/planner" ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-300",
                  )}
                >
                  Планировщик
                </Link>
                <div className="pt-4 space-y-2">
                  {session ? (
                    <>
                      <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <Link href="/dashboard">Личный кабинет</Link>
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
                      <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
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
      <div className="hidden md:flex items-center gap-6">
        {/* десктоп-меню — только на md+ */}
        <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/">
                    Главная
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={pathname.startsWith("/workouts") ? "text-green-600 dark:text-green-400" : ""}
                >
                  Тренировки
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-500 to-green-700 p-6 no-underline outline-none focus:shadow-md"
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
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href={`/workouts/${category.slug}`}
                          >
                            <div className="text-sm font-medium leading-none">{category.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Тренировки в категории {category.name}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/blog">
                    Блог
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/nutrition">
                    Питание
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/planner">
                    Планировщик
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
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {session ? (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard">Личный кабинет</Link>
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
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Войти</Link>
                </Button>
                <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/register">Регистрация</Link>
                </Button>
              </>
            )}
          </div>
      </div>
    </>
  )
}
