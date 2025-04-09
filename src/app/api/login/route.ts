// app/api/login/route.ts
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const fakeUser = {
  username: 'admin',
  password: '$2a$12$9FqilBsh9GPAAD1kjNbFXeuzd9njg6xcfO10bTmIFQllmiXxM6s66', // password123
  role: 'admin',
}

export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (username !== fakeUser.username) {
    return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 })
  }

  const isValid = await bcrypt.compare(password, fakeUser.password)

  if (!isValid) {
    return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 })
  }

  const token = jwt.sign({ username, role: fakeUser.role }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  })

  const cookieStore = await cookies();
  cookieStore.set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
  })

  return NextResponse.json({ success: true })
}
