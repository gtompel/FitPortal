import { db } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default async function BlogPage() {
  const posts = await db.post.findMany({
    where: {
      isFree: false
    },
    include: {
      user: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  if (!posts.length) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Блог</h1>
        <p>Посты пока не добавлены</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Блог</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              {post.image_url && (
                <div className="relative aspect-video">
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 text-sm text-gray-500">
                {post.user?.name || 'Аноним'}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
