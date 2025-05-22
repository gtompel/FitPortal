import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-700 dark:text-green-300">Блог</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Страница блога находится в разработке. Скоро здесь появятся полезные статьи о фитнесе, питании и здоровом
          образе жизни.
        </p>
        <div className="pt-4">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/">Вернуться на главную</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
