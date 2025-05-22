import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)

  try {
    const supabase = createServerClient()
    await supabase.auth.signOut()
  } catch (error) {
    console.error("Error signing out:", error)
  }

  return NextResponse.redirect(`${requestUrl.origin}/`)
}
