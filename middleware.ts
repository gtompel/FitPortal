import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { NextRequestWithAuth } from "next-auth/middleware"

export default async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request })
  const isAuth = !!token
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || 
                    request.nextUrl.pathname.startsWith("/register")
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin")
  const isUserPage = request.nextUrl.pathname.startsWith("/dashboard")

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return null
  }

  if (!isAuth) {
    let from = request.nextUrl.pathname
    if (request.nextUrl.search) {
      from += request.nextUrl.search
    }

    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, request.url)
    )
  }

  if (isAdminPage && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"]
}
