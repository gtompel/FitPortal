import Link from "next/link"
import { Dumbbell, Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-2 sm:px-4 md:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 min-h-[44px] min-w-[44px]">
              <Dumbbell className="h-6 w-6 min-h-[24px] min-w-[24px] text-primary" />
              <span className="font-bold text-primary" style={{fontSize:'clamp(1.1rem,1rem+1vw,1.25rem)'}}>FitPortal</span>
            </Link>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
              Ваш персональный фитнес-портал для тренировок, советов по питанию и здорового образа жизни.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="text-muted-foreground hover:text-primary min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">О нас</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  О компании
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Наша команда
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Вакансии
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">Помощь</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Часто задаваемые вопросы
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Связаться с нами
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-muted-foreground hover:text-primary text-sm"
                >
                  Техподдержка
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">Подписка</h3>
            <p className="text-muted-foreground text-sm">
              Будьте в курсе новых тренировок, статей и советов по фитнесу.
            </p>
            <form className="space-y-2">
              <Input type="email" placeholder="Ваш email" className="bg-background" required />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground button-hover">
                Подписаться
              </Button>
            </form>


          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FitPortal. Все права защищены.</p>
        </div>
      </div>
      {/* Чат-бот иконка */}
      {/*<div className="fixed bottom-6 right-6 z-50">
        <Button className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg button-hover">
          <span className="text-xl">💬</span>
          <span className="sr-only">Чат-бот поддержки</span>
        </Button>
      </div>*/}
    </footer>
  )
}
