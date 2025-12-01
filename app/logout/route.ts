import { signOut } from "next-auth/react"
import { NextResponse } from "next/server"

export async function GET() {
  // Выполняет выход через NextAuth
  await signOut({ redirect: false });
  return NextResponse.redirect("/");
}