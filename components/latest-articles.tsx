import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageSquare } from "lucide-react"

// Mock data for articles
const articles = [
  {
    id: 1,
    title: "10 принципов правильного питания для достижения фитнес-целей",
    excerpt:
      "Узнайте основные принципы питания, которые помогут вам достичь желаемых результатов в тренировках и улучшить общее состояние здоровья.",
    category: "Питание",
    date: "15 мая 2023",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Елена Петрова",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Диетолог",
    },
    comments: 24,
  },
  {
    id: 2,
    title: "Как правильно составить программу тренировок для набора мышечной массы",
    excerpt: "Советы по созданию эффективной программы тренировок, направленных на увеличение мышечной массы и силы.",
    category: "Тренировки",
    date: "10 мая 2023",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Алексей Смирнов",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Фитнес-тренер",
    },
    comments: 18,
  },
  {
    id: 3,
    title: "Как избежать плато в тренировках и продолжать прогрессировать",
    excerpt:
      "Практические рекомендации для преодоления застоя в тренировках и постоянного прогресса на пути к своим фитнес-целям.",
    category: "Советы",
    date: "5 мая 2023",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Мария Иванова",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Тренер по фитнесу",
    },
    comments: 32,
  },
]

export default function LatestArticles() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link href={`/blog/${article.id}`} key={article.id} className="group">
          <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">{article.category}</Badge>
            </div>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span>{article.comments}</span>
                </div>
              </div>
              <CardTitle className="text-lg group-hover:text-green-600 transition-colors line-clamp-2">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0 border-t flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                <AvatarFallback>{article.author.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{article.author.name}</span>
                <span className="text-xs text-gray-500">{article.author.role}</span>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
