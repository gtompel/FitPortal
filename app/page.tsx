import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play, Dumbbell, Users, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FeaturedWorkouts from "@/components/featured-workouts"
import LatestArticles from "@/components/latest-articles"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-green-700 dark:text-green-300">
                  Трансформируйте свое тело, изменяйте свою жизнь
                </h1>
                <p className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl">
                  Персонализированные тренировки, экспертные советы и поддержка сообщества для достижения ваших
                  фитнес-целей.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Начать бесплатно
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link
                  href="/workouts"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Наши программы
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Фитнес тренировка"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 h-16 w-16"
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
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-green-700 dark:text-green-300">
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
                  <Dumbbell className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl text-green-700 dark:text-green-300">
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
                  <Book className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl text-green-700 dark:text-green-300">
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
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl text-green-700 dark:text-green-300">
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
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-green-700 dark:text-green-300">
              Популярные тренировки
            </h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Изучите нашу коллекцию лучших трениров��к для всех уровней подготовки.
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
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-green-700 dark:text-green-300">
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
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
            Готовы начать свое фитнес-путешествие?
          </h2>
          <p className="max-w-[600px] text-green-50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Присоединяйтесь к тысячам людей, уже изменивших свою жизнь с помощью нашего портала.
          </p>
          <Button size="lg" className="mt-6 bg-white text-green-600 hover:bg-green-50">
            Зарегистрироваться бесплатно
          </Button>
        </div>
      </section>
    </div>
  )
}
