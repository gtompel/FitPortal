import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ClientHeader from "./client-header"

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 min-h-[56px] px-2 sm:px-4 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 min-h-[44px] min-w-[44px] text-xl font-bold" style={{fontSize:'clamp(1.2rem, 1rem + 1vw, 1.7rem)'}}>
          <span>FitPortal</span>
        </Link>
        <ClientHeader session={session} />
      </div>
    </header>
  )
}
