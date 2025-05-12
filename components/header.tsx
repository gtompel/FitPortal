import { createServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Dumbbell } from "lucide-react"
import ClientHeader from "./client-header"

export default async function Header() {
  let session = null

  try {
    const supabase = createServerClient()
    const { data } = await supabase.auth.getSession()
    session = data.session
  } catch (error) {
    console.error("Error fetching session:", error)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-green-600 dark:text-green-400" />
          <span className="font-bold text-xl text-green-700 dark:text-green-300">FitPortal</span>
        </Link>

        <ClientHeader session={session} />
      </div>
    </header>
  )
}
