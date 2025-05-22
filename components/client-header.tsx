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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { Menu } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

interface ClientHeaderProps {
  session: any
}

export default function ClientHeader({ session }: ClientHeaderProps) {
  const isMobile = useMobile()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {isMobile ? (
        <div className="flex items-center gap-2">
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
      ) : (
        <div className="flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/" ? "text-green-600 dark:text-green-400" : "",
                    )}
                  >
                    Главная
                  </NavigationMenuLink>
                </Link>
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
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/workouts/cardio"
                        >
                          <div className="text-sm font-medium leading-none">Кардио</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Кардиотренировки для похудения и выносливости
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/workouts/strength"
                        >
                          <div className="text-sm font-medium leading-none">Силовые</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Тренировки для набора мышечной массы
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/workouts/flexibility"
                        >
                          <div className="text-sm font-medium leading-none">Растяжка</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Упражнения для развития гибкости
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/blog" ? "text-green-600 dark:text-green-400" : "",
                    )}
                  >
                    Блог
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/nutrition" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/nutrition" ? "text-green-600 dark:text-green-400" : "",
                    )}
                  >
                    Питание
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/planner" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/planner" ? "text-green-600 dark:text-green-400" : "",
                    )}
                  >
                    Планировщик
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
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
      )}
    </>
  )
}
