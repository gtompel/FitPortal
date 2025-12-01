import Link from "next/link"
import { Dumbbell, Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container px-2 sm:px-4 md:px-6 py-8 sm:py-12">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 min-h-[44px] min-w-[44px]">
              <Dumbbell className="h-6 w-6 min-h-[24px] min-w-[24px] text-green-600 dark:text-green-400" />
              <span className="font-bold" style={{fontSize:'clamp(1.1rem,1rem+1vw,1.25rem)'}}>FitPortal</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
              Ваш персональный фитнес-портал для тренировок, советов по питанию и здорового образа жизни.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
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
                  Планироовщик
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
