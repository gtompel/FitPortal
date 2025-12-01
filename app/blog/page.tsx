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
      <div className="container mx-auto px-2 sm:px-4 py-8">
        <h1 className="font-bold mb-5" style={{fontSize:'clamp(1.6rem,4.5vw,2.5rem)'}}>Блог</h1>
        <p>Посты пока не добавлены</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8">
      <h1 className="font-bold mb-5" style={{fontSize:'clamp(1.6rem,4.5vw,2.5rem)'}}>Блог</h1>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id} className="focus:outline-green-600" tabIndex={0}>
            <Card className="h-full hover:shadow-lg transition-shadow min-h-[180px]">
              {post.image_url && (
                <div className="relative aspect-video min-h-[120px]">
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardContent className="p-3 sm:p-4">
                <h2 className="font-semibold mb-1" style={{fontSize:'clamp(1rem,2vw,1.38rem)'}}>{post.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3 leading-snug">{post.content}</p>
              </CardContent>
              <CardFooter className="p-3 pt-0 text-xs sm:text-sm text-gray-500">
                {post.user?.name || 'Аноним'}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
