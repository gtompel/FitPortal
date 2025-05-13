import Link from "next/link"
import { Dumbbell } from "lucide-react"
import ClientHeader from "./client-header"
import { createServerClient } from "@/lib/supabase/server"

export default async function Header() {
  let session = null
  let supabaseError = false

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error("Error getting session:", error)
      supabaseError = true
    } else {
      session = data.session
    }
  } catch (error) {
    console.error("Exception getting session:", error)
    supabaseError = true
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-green-600 dark:text-green-400" />
          <span className="font-bold text-xl text-green-700 dark:text-green-300">FitPortal</span>
        </Link>
        <ClientHeader session={session} supabaseError={supabaseError} />
      </div>
    </header>
  )
}
