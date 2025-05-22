import Link from "next/link"
import { Dumbbell, Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-green-600 dark:text-green-400" />
              <span className="font-bold text-xl text-green-700 dark:text-green-300">FitPortal</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ваш персональный фитнес-портал для тренировок, советов по питанию и здорового образа жизни.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Разделы</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 text-sm"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  href="/workouts"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 text-sm"
                >
                  Тренировки
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 text-sm"
                >
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  href="/nutrition"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 text-sm"
                >
                  Питание
                </Link>
              </li>
              <li>
                <Link
                  href="/planner"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 text-sm"
                >
                  Плани��овщик
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Поддержка</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 text-sm"
                >
                  Часто задаваемые вопросы
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 text-sm"
                >
                  Связаться с нами
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 text-sm"
                >
                  Условия использования
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 text-sm"
                >
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Подписка на новости</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Будьте в курсе новых тренировок, статей и советов по фитнесу.
            </p>
            <form className="space-y-2">
              <Input type="email" placeholder="Ваш email" className="bg-white dark:bg-gray-800" required />
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                Подписаться
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} FitPortal. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
