import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play, Dumbbell, Users, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import FeaturedWorkouts from "@/components/featured-workouts"
import LatestArticles from "@/components/latest-articles"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-green-400 to-emerald-500 dark:from-green-700 dark:to-emerald-800">
        <div className="container px-2 sm:px-4 md:px-6">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <h1 className="font-bold tracking-tighter text-white" style={{fontSize:'clamp(2rem,8vw,4rem)',lineHeight:'1.2'}}>
                  Превратите свою жизнь в историю успеха
                </h1>
                <p className="max-w-[600px] text-white/90 text-base sm:text-lg md:text-xl leading-relaxed">
                  Мы знаем, как сложно начать. Мы помогаем каждому — от новичка до профи
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild className="bg-white text-dark-green hover:bg-white/90 min-h-[44px] button-hover">
                  <Link href="/free">
                    Начать бесплатно
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Link
                  href="/workouts"
                  className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-8 min-h-[44px] text-sm font-medium shadow-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-white button-hover"
                >
                  Наши программы
                </Link>
              </div>
            </div>
            <div className="relative h-[220px] xs:h-[280px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent z-10"></div>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Фитнес изображение"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 h-16 w-16 min-h-[44px] min-w-[44px] border-white/30"
                >
                  <Play className="h-8 w-8 text-white" />
                  <span className="sr-only">Смотреть видео</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-2 sm:px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-dark-green" style={{fontSize:'clamp(2rem,8vw,4rem)',lineHeight:'1.2'}}>
                Все, что нужно для вашего фитнес-путешествия
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Наш портал предлагает комплексный подход к фитнесу, который поможет вам достичь результатов.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                  <Dumbbell className="w-6 h-6 text-dark-green" />
                </div>
                <CardTitle className="text-xl text-dark-green">
                  Персонализированные тренировки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  Индивидуальные планы тренировок, адаптированные к вашим целям, уровню физической подготовки и
                  предпочтениям.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                  <Book className="w-6 h-6 text-dark-green" />
                </div>
                <CardTitle className="text-xl text-dark-green">
                  Экспертные советы по питанию
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  Рекомендации по правильному питанию, рецепты и планы питания для максимальных результатов.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-dark-green" />
                </div>
                <CardTitle className="text-xl text-dark-green">
                  Сообщество единомышленников
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  Присоединяйтесь к нашему сообществу, делитесь достижениями и получайте поддержку на пути к здоровью.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Workouts */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-2 sm:px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-dark-green" style={{fontSize:'clamp(2rem,8vw,4rem)',lineHeight:'1.2'}}>
              Популярные тренировки
            </h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Изучите нашу коллекцию лучших тренировок для всех уровней подготовки.
            </p>
          </div>
          <FeaturedWorkouts />
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
            >
              Смотреть все тренировки
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-2 sm:px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-dark-green" style={{fontSize:'clamp(2rem,8vw,4rem)',lineHeight:'1.2'}}>
              Последние статьи
            </h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Свежие материалы о тренировках, питании и здоровом образе жизни от наших экспертов.
            </p>
          </div>
          <LatestArticles />
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
            >
              Все статьи
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 dark:bg-green-800">
        <div className="container px-2 sm:px-4 md:px-6 flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight" style={{fontSize:'clamp(2rem,8vw,4rem)',lineHeight:'1.2'}}>
            Готовы начать свое фитнес-путешествие?
          </h2>
          <p className="max-w-[600px] text-green-50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Присоединяйтесь к тысячам людей, уже изменивших свою жизнь с помощью нашего портала.
          </p>
      {/* Личный прогресс-бар */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-64 z-40">
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">Ваш прогресс</h3>
              <span className="text-sm font-medium">10%</span>
            </div>
            <Progress value={10} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">Вы уже на 10% пути!</p>
          </CardContent>
        </Card>
      </div>
          <Button asChild size="lg" className="mt-6 bg-white text-dark-green hover:bg-green-50">
            <Link href="/free">Начать бесплатно</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
