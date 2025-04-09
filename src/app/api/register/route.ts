import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (!username || !password) {
    return NextResponse.json({ message: 'Имя и пароль обязательны' }, { status: 400 })
  }

  const existingUser = await prisma.user.findUnique({
    where: { username },
  })

  if (existingUser) {
    return NextResponse.json({ message: 'Пользователь уже существует' }, { status: 409 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role: 'user',
    },
  })

  const token = jwt.sign(
    { username: newUser.username, role: newUser.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  )

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
