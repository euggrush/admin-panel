// app/api/logout/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()

  cookieStore.set({
    name: 'token',
    value: '',
    path: '/',
    httpOnly: true,
    expires: new Date(0), // удалить куку
  })

  return NextResponse.json({ success: true })
}
