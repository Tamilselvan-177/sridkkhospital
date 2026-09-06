import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isAuthRoute = nextUrl.pathname.startsWith('/login')
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')
  const isDoctorRoute = nextUrl.pathname.startsWith('/doctor-portal')
  const isDashboardRoute = isAdminRoute || isDoctorRoute

  if (isAuthRoute) {
    if (isLoggedIn) {
      if ((req.auth?.user as any)?.role === 'ADMIN') return NextResponse.redirect(new URL('/admin', nextUrl))
      if ((req.auth?.user as any)?.role === 'DOCTOR') return NextResponse.redirect(new URL('/doctor', nextUrl))
      return NextResponse.redirect(new URL('/', nextUrl))
    }
    return null
  }

  if (!isLoggedIn && isDashboardRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) callbackUrl += nextUrl.search
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }

  if (isLoggedIn) {
    if (isAdminRoute && (req.auth?.user as any)?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', nextUrl))
    }
    if (isDoctorRoute && (req.auth?.user as any)?.role !== 'DOCTOR') {
      return NextResponse.redirect(new URL('/', nextUrl))
    }
  }

  return null
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
