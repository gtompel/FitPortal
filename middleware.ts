import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
  const isAuthRoute = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")

  // Если пользователь не авторизован и пытается зайти на защищенные маршруты
  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Если пользователь авторизован и пытается зайти на страницы авторизации
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Если пользователь не админ и пытается зайти в админ-панель
  if (isAdminRoute && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"]
}
