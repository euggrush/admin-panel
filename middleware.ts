// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  const protectedPaths = ['/dashboard']

  if (protectedPaths.includes(req.nextUrl.pathname)) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url))

    try {
      jwt.verify(token, process.env.JWT_SECRET!)
      console.log('Token is valid')
    } catch {
      console.log('Token is invalid')
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
