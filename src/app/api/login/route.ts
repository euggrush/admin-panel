import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (!username || !password) {
    return NextResponse.json({ message: 'Имя и пароль обязательны' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { username } })

  if (!user) {
    return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 })
  }

  const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET!, {
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
